// Reviews are isolated by authenticated owner and canonical rubric/evidence.
const GRADE_TABLE=`CREATE TABLE IF NOT EXISTS grading_reviews (owner_id TEXT NOT NULL, task_id TEXT NOT NULL, rubric_id TEXT NOT NULL, answer_hash TEXT NOT NULL, model TEXT NOT NULL, effort TEXT NOT NULL, answer TEXT NOT NULL, response TEXT NOT NULL, checked_at TEXT NOT NULL, PRIMARY KEY(owner_id,task_id,rubric_id,answer_hash,model,effort))`;
function evidenceForGrade(task){return supportFor(task)}
async function reviewHash(value){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('')}
async function gradingContext(db,owner,taskId,task,answer,model,effort,evidence){
 if(!db)return null;
 await db.prepare(GRADE_TABLE).run();
 const rubric=await reviewHash(JSON.stringify({version:2,task,evidence,prompt:PROMPT+GRADING_RULES})),hash=await reviewHash(answer);
 const args=[owner,taskId,rubric];
 const exact=await db.prepare('SELECT response FROM grading_reviews WHERE owner_id=? AND task_id=? AND rubric_id=? AND answer_hash=? AND model=? AND effort=?').bind(...args,hash,model,effort).first();
 if(exact)return {cached:JSON.parse(exact.response)};
 const previous=await db.prepare('SELECT answer,response FROM grading_reviews WHERE owner_id=? AND task_id=? AND rubric_id=? ORDER BY checked_at DESC, rowid DESC LIMIT 1').bind(...args).first();
 return {owner,taskId,rubric,hash,model,effort,previous:previous?{answer:previous.answer,response:JSON.parse(previous.response)}:null};
}
function attachReviewComparison(feedback,previous){
 if(!previous)return;
 feedback.criteria.forEach((c,i)=>{const old=previous.response.feedback.criteria[i];if(!old||old.criterion!==c.criterion||old.status===c.status)return;c.comparison={previous_status:old.status,previous_feedback:old.feedback,review_required:true};});
}
async function saveGradingReview(db,review,answer,response){
 if(!db||!review)return;
 await db.batch([
 db.prepare('INSERT OR IGNORE INTO grading_reviews (owner_id,task_id,rubric_id,answer_hash,model,effort,answer,response,checked_at) VALUES (?,?,?,?,?,?,?,?,?)').bind(review.owner,review.taskId,review.rubric,review.hash,review.model,review.effort,answer,JSON.stringify(response),response.checkedAt),
 db.prepare('DELETE FROM grading_reviews WHERE owner_id=? AND task_id=? AND rowid NOT IN (SELECT rowid FROM grading_reviews WHERE owner_id=? AND task_id=? ORDER BY checked_at DESC,rowid DESC LIMIT 10)').bind(review.owner,review.taskId,review.owner,review.taskId)
 ]);
 const canonical=await db.prepare('SELECT response FROM grading_reviews WHERE owner_id=? AND task_id=? AND rubric_id=? AND answer_hash=? AND model=? AND effort=?').bind(review.owner,review.taskId,review.rubric,review.hash,review.model,review.effort).first();return canonical?JSON.parse(canonical.response):response;
}
