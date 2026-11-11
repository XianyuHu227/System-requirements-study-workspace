// User IDs come only from Sites' authenticated dispatch, never from a request body.
const PROGRESS_LIMIT=2500000;
async function readProgress(db,userId){const row=await db.prepare('SELECT revision, document, updated_at FROM study_progress WHERE user_id = ?').bind(userId).first();return row?{revision:row.revision,document:JSON.parse(row.document),updatedAt:row.updated_at}:{revision:0,document:SRSyncCore.defaults(),updatedAt:null}}
async function progressAPI(req,env,url){
if(!['GET','PUT'].includes(req.method))return json({error:{zh:'仅支持读取与保存。',en:'GET or PUT required.'}},405);
const userId=req.headers.get('oai-authenticated-user-id');
if(!userId)return json({error:{zh:'请登录同一个 ChatGPT 账号后同步。',en:'Sign in with the same ChatGPT account to sync.'},signIn:'/signin-with-chatgpt?return_to=%2F'},401);
if(!env.DB)throw new ApiError(503,'云端存储尚未就绪；本机记录仍保留。','Cloud storage is unavailable; your local records are preserved.');
if(req.method==='GET')return json({userId,...await readProgress(env.DB,userId)});
const origin=req.headers.get('Origin');if((origin&&origin!==url.origin)||req.headers.get('Sec-Fetch-Site')==='cross-site')throw new ApiError(403,'只能从本网站同步。','Sync from this site only.');
if(!(req.headers.get('Content-Type')||'').toLowerCase().startsWith('application/json'))throw new ApiError(415,'需要 JSON 请求。','JSON content required.');
let body;try{body=JSON.parse(await readLimited(req,PROGRESS_LIMIT))}catch(e){if(e instanceof ApiError)throw e;throw new ApiError(400,'同步请求格式无效。','Invalid sync request.');}
if(!Number.isSafeInteger(body?.revision)||body.revision<0)throw new ApiError(400,'同步版本无效。','Invalid sync revision.');
let document;try{document=SRSyncCore.normalize(body.document)}catch{throw new ApiError(400,'学习记录格式无效；请保留本机备份。','Invalid study record; keep your local backup.');}
const text=JSON.stringify(document);if(new TextEncoder().encode(text).length>PROGRESS_LIMIT-1000)throw new ApiError(413,'记录过大，暂未上传；请导出备份并减少画板内容。','Record too large; export a backup and reduce drawing content.');
const at=new Date().toISOString(),db=env.DB;
const write=body.revision===0?db.prepare('INSERT INTO study_progress (user_id, revision, document, updated_at) VALUES (?, 1, ?, ?) ON CONFLICT(user_id) DO NOTHING').bind(userId,text,at):db.prepare('UPDATE study_progress SET revision = revision + 1, document = ?, updated_at = ? WHERE user_id = ? AND revision = ?').bind(text,at,userId,body.revision);
const result=await db.batch([write,db.prepare('INSERT OR IGNORE INTO study_progress_history (user_id, revision, document, updated_at) SELECT user_id, revision, document, updated_at FROM study_progress WHERE user_id = ?').bind(userId),db.prepare('DELETE FROM study_progress_history WHERE user_id = ? AND revision NOT IN (SELECT revision FROM study_progress_history WHERE user_id = ? ORDER BY revision DESC LIMIT 10)').bind(userId,userId)]);
if(result[0].meta.changes!==1)return json({userId,...await readProgress(db,userId),conflict:true},409);
return json({userId,revision:body.revision+1,updatedAt:at});
}
