import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const bundle=await fs.readFile('dist/server/index.js','utf8');
const {createHandler}=await import('data:text/javascript;base64,'+Buffer.from(bundle).toString('base64'));
const env={AI_OWNER_EMAIL:'owner@test.invalid',DEEPSEEK_API_KEY:'deepseek-secret',KIMI_API_KEY:'kimi-secret'};
const origin='https://study.test';
const answer={basis:'course_notes',answer:{zh:'两条泳道',en:'Two swimlanes'},source_ids:['W5']};
const models={deepseek:[{id:'deepseek-flash'},{id:'deepseek-chat'}],kimi:[{id:'kimi-k3'},{id:'kimi-k2.6'},{id:'moonshot-v1-8k-vision-preview'},{id:'moonshot-v1-8k'}]};
let calls=[];
const upstream=async(url,opts)=>{if(url.endsWith('/models'))return Response.json({data:models[url.includes('moonshot')?'kimi':'deepseek']});calls.push({url,opts});return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(answer)}}]})};
const handler=createHandler(upstream,()=>1000000);
const post=(body)=>handler(new Request(origin+'/api/ask',{method:'POST',headers:{'oai-authenticated-user-email':'owner@test.invalid','Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)}),env);

let r=await handler(new Request(origin+'/api/models'),env);assert.equal(r.status,200);const list=(await r.json()).models;
assert.equal(list.find(m=>m.id==='deepseek-flash').vision,true,'DeepSeek Flash is vision-capable');
assert.equal(list.find(m=>m.id==='deepseek-chat').vision,false,'Legacy DeepSeek chat is text-only');
assert.equal(list.find(m=>m.id==='kimi:kimi-k3').vision,true,'Kimi K3 is vision-capable');
assert.equal(list.find(m=>m.id==='kimi:moonshot-v1-8k-vision-preview').vision,true,'Vision-preview model is recognised');
assert.equal(list.find(m=>m.id==='kimi:moonshot-v1-8k').vision,false,'Text moonshot-v1 model stays text-only');

const img='data:image/png;base64,'+'A'.repeat(200);
r=await post({question:'请分析我的活动图',model:'deepseek-flash',image:img});assert.equal(r.status,200);
let sent=JSON.parse(calls.at(-1).opts.body);
assert(Array.isArray(sent.messages[1].content),'Vision request content must be a parts array');
assert.equal(sent.messages[1].content[0].type,'text');
assert.equal(sent.messages[1].content[1].type,'image_url');
assert.equal(sent.messages[1].content[1].image_url.url,img);
assert(sent.messages[0].content.includes('image is attached'),'System prompt must carry image-analysis rules');

r=await post({question:'分析',model:'deepseek-chat',image:img});assert.equal(r.status,400,'Text-only model must reject an image');

r=await post({question:'分析我的图',model:'kimi:kimi-k3',effort:'low',image:img});assert.equal(r.status,200);
sent=JSON.parse(calls.at(-1).opts.body);assert(Array.isArray(sent.messages[1].content));assert.equal(calls.at(-1).opts.headers.Authorization,'Bearer kimi-secret');

assert.equal((await post({question:'分析',model:'deepseek-flash',image:'data:image/svg+xml;base64,'+'A'.repeat(10)})).status,400);
assert.equal((await post({question:'分析',model:'deepseek-flash',image:'not-an-image'})).status,400);
assert.equal((await post({question:'分析',model:'deepseek-flash',image:'data:image/png;base64,'+'A'.repeat(3500000)})).status,413,'Oversized image must be rejected');

r=await post({question:'什么是 SMART',model:'deepseek-flash'});assert.equal(r.status,200);
sent=JSON.parse(calls.at(-1).opts.body);assert.equal(typeof sent.messages[1].content,'string','Text-only request stays backward compatible');

console.log(JSON.stringify({passed:true,checks:['vision model discovery','multimodal message construction','non-vision model rejection','provider key routing','image format and size validation','text-only backward compatibility']}));
