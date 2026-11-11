import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
const ctx=vm.createContext({console,Date,Map,Set,JSON,Object,Array,Number,String,Error});
for(const file of ['sync-core.js','sync-engine.js'])vm.runInContext(await fs.readFile('public/'+file,'utf8'),ctx);
const C=ctx.SRSyncCore,Engine=ctx.SRCloudEngine;
const bundle=await fs.readFile('dist/server/index.js','utf8');
const {createHandler}=await import('data:text/javascript;base64,'+Buffer.from(bundle).toString('base64'));
const sql=new DatabaseSync(':memory:');sql.exec(await fs.readFile('drizzle/0000_study_progress.sql','utf8'));
class Statement{constructor(query,values=[]){this.query=query;this.values=values}bind(...v){return new Statement(this.query,v)}async first(){return sql.prepare(this.query).get(...this.values)||null}run(){const x=sql.prepare(this.query).run(...this.values);return {success:true,meta:{changes:Number(x.changes)}}}}
const DB={prepare:q=>new Statement(q),batch:async statements=>{sql.exec('BEGIN');try{const out=statements.map(s=>s.run());sql.exec('COMMIT');return out}catch(e){sql.exec('ROLLBACK');throw e}}};
const handler=createHandler(async()=>{throw Error('Sync must not call DeepSeek')});
const origin='https://study.test';
const request=(user,method='GET',body,extra={})=>handler(new Request(origin+'/api/progress',{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),...(body?{'Content-Type':'application/json',Origin:origin}:{}),...extra},body:body?JSON.stringify(body):undefined}),{DB});
function device(user,initial=C.defaults(),cached=null){let state=C.clone(initial),meta=cached,status=[],pending=0;const engine=new Engine({read:()=>state,apply:s=>state=C.clone(s),meta,persistMeta:m=>meta=C.clone(m),request:(method,body)=>request(user,method,body),status:s=>status.push(s),pending:()=>pending++});return {engine,get state(){return state},set state(v){state=v},get meta(){return meta},status,get pending(){return pending}}}
const a=device('owner');a.state.drafts.lesson5='First answer on laptop';a.state.ratings[5]=2;await a.engine.sync();assert.equal(a.meta.revision,1);
const b=device('owner');await b.engine.sync();assert.equal(b.state.drafts.lesson5,'First answer on laptop');assert.equal(b.state.ratings[5],2);assert.equal(b.meta.revision,1);
a.state.drafts.note1='Laptop note';b.state.drafts.note2='Tablet note';await Promise.all([a.engine.sync(),b.engine.sync()]);await a.engine.sync();await b.engine.sync();for(const d of [a,b]){assert.equal(d.state.drafts.note1,'Laptop note');assert.equal(d.state.drafts.note2,'Tablet note')}
a.state.drafts.lesson5='Laptop revision';b.state.drafts.lesson5='Tablet revision';await b.engine.sync();await a.engine.sync();await b.engine.sync();assert.equal(b.state.drafts.lesson5,'Laptop revision');const conflict=Object.entries(a.state.syncConflicts).find(([,v])=>v.key==='drafts/lesson5');assert(conflict);assert.equal(conflict[1].value,'Tablet revision');
a.state=C.restore(a.state,conflict[0]);await a.engine.sync();await b.engine.sync();assert.equal(b.state.drafts.lesson5,'Tablet revision');assert(!b.state.syncConflicts[conflict[0]]);
delete b.state.drafts.note1;await b.engine.sync();await a.engine.sync();assert(!Object.hasOwn(a.state.drafts,'note1'),'Explicit deletion propagates');
// Re-open a device after editing offline: its cached base enables a three-way merge.
const offlineState=C.clone(a.state),offlineMeta=C.clone(a.meta);offlineState.drafts.note3='Offline work';b.state.drafts.note4='Online work';await b.engine.sync();const reopened=device('owner',offlineState,offlineMeta);await reopened.engine.sync();assert.equal(reopened.state.drafts.note3,'Offline work');assert.equal(reopened.state.drafts.note4,'Online work');
// A fresh legacy device merges populated fields but does not clear remote work with empty defaults.
const legacy=C.defaults();legacy.drafts.lesson1='Existing local answer';const migrated=device('owner',legacy);await migrated.engine.sync();assert.equal(migrated.state.drafts.lesson1,'Existing local answer');assert.equal(migrated.state.drafts.note3,'Offline work');
const stroke={tool:'pen',points:[[10,20],[30,40]]};a.state.draw=[stroke];await a.engine.sync();await b.engine.sync();assert.deepEqual(b.state.draw,[stroke]);b.state.draw=[];await b.engine.sync();await a.engine.sync();assert.equal(a.state.draw.length,0);
const chat=(question,time)=>({question,answer:{zh:'解释',en:'Explanation'},model:'deepseek-flash',checkedAt:time});a.state.aiChat=[chat('A','2026-11-10T10:00:00Z')];b.state.aiChat=[chat('B','2026-11-10T10:00:01Z')];await a.engine.sync();await b.engine.sync();await a.engine.sync();assert.equal(a.state.aiChat.length,2);assert.equal(b.state.aiChat.length,2);
const outsider=device('other-user');await outsider.engine.sync();assert.equal(Object.keys(outsider.state.drafts).length,0);outsider.state.drafts.note1='Other account';await outsider.engine.sync();await a.engine.sync();assert.notEqual(a.state.drafts.note1,'Other account');
const wrongAccount=device('other-user',a.state,a.meta);await wrongAccount.engine.sync();assert.equal(wrongAccount.status.at(-1).phase,'account');
let r=await request(null);assert.equal(r.status,401);r=await request(null,'PUT',{revision:0,document:C.defaults()});assert.equal(r.status,401);
r=await request('owner','PUT',{revision:0,document:C.defaults()});assert.equal(r.status,409);
const before=await (await request('owner')).json();r=await request('owner','PUT',{revision:before.revision,document:{...C.defaults(),ratings:{1:99}}});assert.equal(r.status,400);
r=await request('owner','PUT',{revision:before.revision,document:C.defaults()},{Origin:'https://evil.test'});assert.equal(r.status,403);
r=await request('owner','DELETE');assert.equal(r.status,405);
r=await request('owner','PUT',{revision:before.revision,document:{...C.defaults(),drafts:{note1:'x'.repeat(2600000)}}});assert.equal(r.status,413);
// Typing during an upload must remain dirty rather than being replaced by the older acknowledgement.
const racing=device('owner');await racing.engine.sync();const baseRequest=racing.engine.request;racing.engine.request=async(method,body)=>{const response=await baseRequest(method,body);if(method==='PUT')racing.state.drafts.note6='Typed during upload';return response};racing.state.drafts.note5='Sent first';await racing.engine.sync();assert.equal(racing.state.drafts.note6,'Typed during upload');assert.equal(racing.status.at(-1).phase,'pending');racing.engine.request=baseRequest;await racing.engine.sync();assert.equal((await (await request('owner')).json()).document.drafts.note6,'Typed during upload');
// A lost response after the database commit is recovered by the next GET without erasing edits.
const lost=device('owner');await lost.engine.sync();lost.state.drafts.note7='Commit survived';const lostRequest=lost.engine.request;lost.engine.request=async(method,body)=>{const response=await lostRequest(method,body);if(method==='PUT')throw Error('Connection lost after commit');return response};await lost.engine.sync();assert.equal(lost.status.at(-1).phase,'error');lost.engine.request=lostRequest;await lost.engine.sync();assert.equal(lost.state.drafts.note7,'Commit survived');assert.equal(lost.status.at(-1).phase,'synced');
for(let i=0;i<12;i++){lost.state.drafts.note8='History '+i;await lost.engine.sync()}
assert.equal(Number(sql.prepare('SELECT count(*) AS n FROM study_progress_history WHERE user_id = ?').get('owner').n),10);
assert.equal(Number(sql.prepare('SELECT count(*) AS n FROM study_progress_history WHERE user_id = ?').get('other-user').n),1);
assert(C.normalize({drafts:{lesson1:'old'}}).aiChat.length===0,'Legacy missing optional fields accepted');
sql.close();console.log(JSON.stringify({passed:true,checks:['two-device sync with actual SQLite','concurrent writes and CAS retry','field-level merge','conflicting answer backup and restore','deletions and drawing clear','chat union','offline reload and first migration','user isolation and account mismatch','authentication and CSRF','invalid/oversized snapshots','typing during upload','lost response recovery','ten cloud history versions']}));
