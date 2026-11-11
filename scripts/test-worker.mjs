
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const source=await fs.readFile('dist/server/index.js','utf8');
const mod=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.equal(typeof mod.default.fetch,'function');assert(!/sk-[a-z0-9]{24,}/i.test(source),'No API key in source bundle');
const env={AI_OWNER_EMAIL:'owner@test.invalid',DEEPSEEK_API_KEY:'test-secret'},origin='https://study.test';let calls=[];
const feedback={summary:{zh:'基本正确',en:'Mostly correct'},criteria:['解释弱点及影响','角色与利益对应','区分系统与项目相关者'].map(criterion=>({criterion,status:'met',feedback:{zh:'已覆盖',en:'Covered'}})),strengths:[{zh:'清晰',en:'Clear'}],improvements:[],revised_answer:{zh:'参考',en:'Example'},next_step:{zh:'继续练习',en:'Keep practising'},confidence:'medium'};
const mock=async(url,opts)=>{calls.push({url,opts});if(url.endsWith('/models'))return Response.json({data:[{id:'deepseek-flash',name:'Flash',max_output_tokens:32768,effort:{supported_levels:['low','high','max'],default_level:'high'}},{id:'deepseek-chat'}]});return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(feedback)}}]})};
const handler=mod.createHandler(mock,()=>1000000);
const post=(body,headers={})=>new Request(origin+'/api/grade',{method:'POST',headers:{'oai-authenticated-user-email':'owner@test.invalid','Content-Type':'application/json',Origin:origin,...headers},body:typeof body==='string'?body:JSON.stringify(body)});
const valid={taskId:'lesson1',answer:'Waterfall makes late changes expensive. Students book rooms; staff use schedules; sponsors fund delivery.',model:'deepseek-flash'};
let res=await handler(new Request(origin+'/api/models'),env);assert.equal(res.status,200);assert.equal((await res.json()).models.length,2);
res=await handler(post(valid),env);assert.equal(res.status,200);const got=await res.json();assert.equal(got.feedback.criteria.length,3);assert(!JSON.stringify(got).includes('test-secret'));
assert.equal(calls.filter(x=>x.url.endsWith('/models')).length,1,'Model list cached');
let sent=JSON.parse(calls.at(-1).opts.body);assert.equal(sent.model,'deepseek-flash');assert.equal(sent.messages.length,2);assert(sent.messages[1].content.includes('student_answer'));assert(!sent.messages[1].content.includes('test-secret'));assert.equal(sent.thinking.type,'disabled');assert.equal(calls.at(-1).opts.headers.Authorization,'Bearer test-secret');
assert.equal((await handler(post({...valid,model:'attacker-model'}),env)).status,400);
assert.equal((await handler(post({...valid,taskId:'missing'}),env)).status,400);
assert.equal((await handler(post({...valid,answer:'x'}),env)).status,400);
assert.equal((await handler(post(valid,{Origin:'https://other.test'}),env)).status,403);
assert.equal((await handler(post('{bad'),env)).status,400);
assert.equal((await handler(post({...valid,answer:'a'.repeat(50000)}),env)).status,413);
assert.equal((await handler(new Request(origin+'/api/grade'),env)).status,405);
assert.equal((await mod.createHandler(mock)(new Request(origin+'/api/models'),{})).status,503);
for(const upstream of [401,402,429]){const h=mod.createHandler(async()=>new Response('do not leak error text',{status:upstream}));const r=await h(new Request(origin+'/api/models'),env);assert.equal(r.status,upstream===429?429:503);assert(!(await r.text()).includes('do not leak'))}
const bad=mod.createHandler(async url=>url.endsWith('/models')?mock(url,{}):Response.json({choices:[{finish_reason:'stop',message:{content:'not-json'}}]}));
assert.equal((await bad(post(valid),env)).status,502);
const short=mod.createHandler(async url=>url.endsWith('/models')?mock(url,{}):Response.json({choices:[{finish_reason:'length',message:{content:'{}'}}]}));
assert.equal((await short(post(valid),env)).status,502);
let count=0;for(let i=0;i<11;i++){const r=await handler(post(valid),env);assert.equal(r.status,200);count++}assert.equal((await handler(post(valid),env)).status,429);
const staticRes=await handler(new Request(origin+'/'),env);assert.equal(staticRes.status,200);const html=await staticRes.text();assert(html.includes('src="ai.js"'));assert(!html.includes('test-secret'));assert(staticRes.headers.get('Content-Security-Policy').includes("connect-src 'self'"));
assert.equal((await handler(new Request(origin+'/worker/index.js'),env)).status,404);
const aiRes=await handler(new Request(origin+'/ai.js'),env);assert.equal(aiRes.status,200);new Function(await aiRes.text());

assert.equal((await handler(post({...valid,taskId:'constructor'}),env)).status,400);
const enhanced=mod.createHandler(mock,()=>1000000);
res=await enhanced(new Request(origin+'/api/models'),env);const metadata=await res.json();assert.deepEqual(metadata.models[0].efforts,['none','low','high','max']);assert.deepEqual(metadata.models[1].efforts,['none']);
for(const effort of ['low','high','max']){res=await enhanced(post({...valid,effort}),env);assert.equal(res.status,200);const request=JSON.parse(calls.at(-1).opts.body);assert.equal(request.reasoning_effort,effort);assert.equal(request.thinking.type,'enabled');assert(request.max_tokens>=12288);assert(request.messages[1].content.includes('official_evidence'));assert(request.messages[1].content.includes('not an official answer key'))}
assert.equal((await enhanced(post({...valid,effort:'ultra'}),env)).status,400);
assert.equal((await enhanced(post({...valid,model:'deepseek-chat',effort:'high'}),env)).status,400);
const askPost=(body,headers={})=>new Request(origin+'/api/ask',{method:'POST',headers:{'oai-authenticated-user-email':'owner@test.invalid','Content-Type':'application/json',Origin:origin,...headers},body:JSON.stringify(body)});
const answer={basis:'course_notes',answer:{zh:'本课程 T 指 Traceable。[W5]',en:'T means Traceable in this course. [W5]'},source_ids:['W5'],follow_up:{zh:'试写一个可追溯示例。',en:'Try a traceability example.'}};
let chatReply=answer,chatCalls=[];
const chat=mod.createHandler(async(url,opts)=>{chatCalls.push({url,opts});return url.endsWith('/models')?mock(url,opts):Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(chatReply)}}]})},()=>1000000);
const question={question:'本课程 SMART 的 T 是什么？',model:'deepseek-flash',effort:'high',context:'#learn/5',history:[{question:'What is SMART?',answer:'A requirements checklist.'}]};
res=await chat(askPost(question),env);assert.equal(res.status,200);let aq=await res.json();assert.equal(aq.sources[0].id,'W5');assert(aq.sources[0].url.startsWith('https://learn.adelaide.edu.au/'));assert(aq.evidenceNotice.en.includes('not a complete'));assert.equal(aq.effort,'high');
let chatPayload=JSON.parse(chatCalls.at(-1).opts.body);assert.equal(chatPayload.reasoning_effort,'high');assert(chatPayload.messages[0].content.includes('Use ONLY'));assert(chatPayload.messages[1].content.includes('Traceable'));assert(chatPayload.messages[1].content.includes('conversation_for_reference_only'));assert(!JSON.stringify(aq).includes('test-secret'));
chatReply={...answer,source_ids:['invented']};assert.equal((await chat(askPost(question),env)).status,502);
chatReply={...answer,source_ids:[]};assert.equal((await chat(askPost(question),env)).status,502);
chatReply={...answer,basis:'insufficient_evidence',source_ids:[]};res=await chat(askPost(question),env);assert.equal(res.status,200);assert.equal((await res.json()).sources.length,0);
assert.equal((await chat(askPost({...question,question:'x'}),env)).status,400);
assert.equal((await chat(askPost({...question,history:new Array(5).fill({question:'a',answer:'b'})}),env)).status,400);
assert.equal((await chat(askPost(question,{Origin:'https://other.test'}),env)).status,403);
assert.equal((await chat(new Request(origin+'/api/ask'),env)).status,405);

console.log(JSON.stringify({passed:true,checks:['model discovery and caching','effort metadata and forwarding','course-only Q&A context','citation validation and missing evidence','server-owned task context','grade schema','no secret leakage','validation and size bounds','CSRF origin','provider error mapping','malformed/truncated feedback','bounded request rate','static assets and client syntax']}));
