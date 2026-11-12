import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const bundle=await fs.readFile('dist/server/index.js','utf8');
const {createHandler}=await import('data:text/javascript;base64,'+Buffer.from(bundle).toString('base64'));
const origin='https://study.test',env={AI_OWNER_EMAIL:'owner@test.invalid',DEEPSEEK_API_KEY:'deepseek-fixture',KIMI_API_KEY:'kimi-fixture'};
const pair=(zh,en=zh)=>({zh,en});
const feedback={summary:pair('请补充相关者','Add stakeholder detail'),criteria:[1,2,3].map(i=>({criterion_id:'c'+i,status:i===1?'met':'partial',feedback:pair('检查 '+i,'Criterion '+i)})),strengths:[pair('变化成本清楚','Clear change cost')],improvements:[pair('解释项目发起人的利益','Explain the sponsor’s interest')],revised_answer:pair('示范答案','Example answer'),next_step:pair('补充后复查','Revise and review'),confidence:'medium'};
const answer={basis:'practice_application',answer:pair('需要说明谁承担变更成本。[W1]','Explain who bears change costs. [W1]'),source_ids:['W1']};
const linked={taskId:'lesson1',draft:'Waterfall makes late changes expensive.',review:{taskId:'lesson1',answer:'Waterfall makes late changes expensive.',feedback,model:'deepseek-flash',checkedAt:'2026-11-12T00:00:00Z'},focus:{kind:'improvement',index:0}};
let requests=[];
const upstream=async(url,opts)=>{if(url.endsWith('/models'))return Response.json({data:[{id:url.includes('moonshot')?'kimi-k3':'deepseek-flash'}]});requests.push({url,headers:opts.headers,payload:JSON.parse(opts.body)});return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(answer)}}]})};
const post=async(extra={},model='deepseek-flash')=>createHandler(upstream)(new Request(origin+'/api/ask',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','oai-authenticated-user-email':'owner@test.invalid'},body:JSON.stringify({question:'Why is this improvement necessary?',model,effort:model.startsWith('kimi:')?'low':'none',...extra})}),env);

for(const model of ['deepseek-flash','kimi:kimi-k3']){
 const res=await post({linkedWork:{...linked,task:{question:'fake canonical question'}},history:[{taskId:'lesson1',question:'Prior same task',answer:'Prior reply'}]},model);
 assert.equal(res.status,200);const data=await res.json(),sent=requests.at(-1),work=JSON.parse(sent.payload.messages[1].content).linked_work;
 assert.equal(work.task_id,'lesson1');assert.equal(work.current_draft,linked.draft);assert.equal(work.saved_review.graded_answer,linked.review.answer);
 assert.equal(work.saved_review.feedback.improvements[0].en,feedback.improvements[0].en);assert.deepEqual(work.focus,linked.focus);assert.equal(work.feedback_matches_current_draft,true);
 assert.notEqual(work.task.question,'fake canonical question');assert.equal(work.task.checks.length,3);assert(work.task.reference);assert(work.saved_review.provenance.includes('untrusted'));
 assert(sent.payload.messages[0].content.includes('correct earlier mistakes'));assert(sent.payload.messages[0].content.includes('untrusted data'));
 assert.equal(data.linkedTask.id,'lesson1');assert.equal(data.linkedTask.feedbackStale,false);assert(!JSON.stringify(data).includes('deepseek-fixture'));assert(!JSON.stringify(data).includes('current_draft'));
 assert.equal(sent.headers.Authorization,model.startsWith('kimi:')?'Bearer kimi-fixture':'Bearer deepseek-fixture');
}
let res=await post({linkedWork:{...linked,draft:'Changed answer with sponsor detail.'}});assert.equal((await res.json()).linkedTask.feedbackStale,true);assert.equal(JSON.parse(requests.at(-1).payload.messages[1].content).linked_work.feedback_matches_current_draft,false);
res=await post({linkedWork:{taskId:'lesson1q2',draft:'',review:null,focus:null}});assert.equal(res.status,200);assert.equal((await res.json()).linkedTask.hasFeedback,false);
res=await post({history:[{question:'Old general question',answer:'Old general reply'}]});assert.equal(res.status,200);assert.equal((await res.json()).linkedTask,null);
for(const work of [{taskId:'constructor',draft:''},{...linked,taskId:'missing'},{...linked,draft:'x'.repeat(8001)},{...linked,review:{...linked.review,taskId:'lesson2'}},{...linked,review:{...linked.review,feedback:{}}},{...linked,focus:{kind:'improvement',index:8}},{...linked,focus:{kind:'system'}}])assert.equal((await post({linkedWork:work})).status,400);
assert.equal((await post({linkedWork:linked,history:[{taskId:'lesson2',question:'wrong task',answer:'wrong reply'}]})).status,400);
assert.equal((await post({history:[{taskId:'lesson1',question:'linked task',answer:'linked reply'}]})).status,400);

const handler=createHandler(upstream);res=await handler(new Request(origin+'/tutor-tasks.js'),env);assert.equal(res.status,200);
const metadataContext=vm.createContext({});vm.runInContext(await res.text(),metadataContext);const tasks=JSON.parse(JSON.stringify(metadataContext.SR_TUTOR_TASKS));assert.equal(tasks.length,64);assert.equal(new Set(tasks.map(t=>t.id)).size,64);
for(const task of tasks){assert(task.title.zh&&task.title.en&&task.prompt.zh&&task.prompt.en);assert.deepEqual(Object.keys(task).sort(),['id','prompt','title']);}

// Exercise browser helpers independently from DOM rendering and network calls.
const controls={checked:true},visibleDraft={value:linked.draft},panel={querySelector:()=>controls};
const state={drafts:{lesson1:linked.draft,lesson1q2:'Second task draft'},aiChecks:{lesson1:{answer:linked.review.answer,feedback,model:'deepseek-flash'}}};
const chat=[{question:'General',answer:pair('general')},{question:'First task',answer:pair('one'),linkedTask:{id:'lesson1'}},{question:'Second task',answer:pair('two'),linkedTask:{id:'lesson1q2'}}];
const context=vm.createContext({SR_TUTOR_TASKS:tasks,state,aiChatRecords:()=>chat,document:{getElementById:()=>panel,querySelector:selector=>selector.includes('lesson1"')?visibleDraft:null,querySelectorAll:()=>[{dataset:{draft:'lesson1'}}],body:{dataset:{language:'en'}}}});
vm.runInContext(await fs.readFile('public/ai-context.js','utf8'),context);
const evaluate=expression=>JSON.parse(JSON.stringify(vm.runInContext(expression,context)));
assert.equal(evaluate('aiSelectedTask()'),'lesson1');assert.equal(evaluate('aiBuildLinkedWork("lesson1")').draft,linked.draft);
visibleDraft.value='Live, unsaved edit';assert.equal(evaluate('aiBuildLinkedWork("lesson1")').draft,'Live, unsaved edit');assert.equal(evaluate('aiBuildLinkedWork("lesson1")').review.answer,linked.review.answer);
assert.equal(evaluate('aiContextHistory("lesson1")').length,1);assert.equal(evaluate('aiContextHistory("lesson1")')[0].question,'First task');assert.equal(evaluate('aiContextHistory("")')[0].question,'General');
assert.equal(evaluate('aiBuildLinkedWork("lesson1q2")').review,null);assert.equal(evaluate('aiBuildLinkedWork("lesson1q2")').draft,'Second task draft');
controls.checked=false;assert.equal(evaluate('aiBuildLinkedWork("lesson1")').draft,'');assert.equal(evaluate('aiBuildLinkedWork("lesson1")').review,null);assert.equal(evaluate('aiBuildLinkedWork("lesson1")').focus,null);
controls.checked=true;visibleDraft.value='x'.repeat(8001);assert.throws(()=>evaluate('aiBuildLinkedWork("lesson1")'),/8000/);
const core=vm.createContext({});vm.runInContext(await fs.readFile('public/sync-core.js','utf8'),core);const snapshot=core.SRSyncCore.normalize({...core.SRSyncCore.defaults(),aiChat:[{question:'Discuss item',answer:pair('Reply'),linkedTask:{id:'lesson1',focus:{kind:'improvement',index:0}}}]});assert.equal(snapshot.aiChat[0].linkedTask.id,'lesson1');
console.log(JSON.stringify({passed:true,tasks:tasks.length,checks:['DeepSeek and Kimi linked context','canonical task lookup','fresh versus graded drafts','targeted improvement','cross-task history rejection','attachment opt-out','live draft capture','sync compatibility','input bounds and no secrets']}));
