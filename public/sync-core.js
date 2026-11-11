'use strict';
// Shared by the browser and Worker: independent fields merge without replacing a whole device's work.
var SRSyncCore=(()=>{
const MAPS=['ratings','steps','drafts','checks','quiz','days','aiChecks','syncConflicts'];
const FIELDS=['date','last','draw','aiChat',...MAPS];
const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const clone=v=>JSON.parse(JSON.stringify(v));
const canonical=v=>JSON.stringify(v,(_,x)=>plain(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,x[k]])):x);
const equal=(a,b)=>canonical(a)===canonical(b);
const defaults=()=>({date:'2026-11-17',last:1,draw:[],aiChat:[],...Object.fromEntries(MAPS.map(k=>[k,{}]))});
const task=/^(lesson(?:[1-9]|10)|case[567]task[0-2]|sample[0-5])$/;
const draft=/^(lesson(?:[1-9]|10)|note(?:[1-9]|10)|case[567]task[0-2]|sample[0-5]|sheet[0-3])$/;
function check(ok){if(!ok)throw Error('Invalid study record')}
function validJSON(v,depth=0,count={n:0}){check(depth<24&&++count.n<400000);if(v===null||typeof v==='boolean')return;if(typeof v==='string'){check(v.length<=200000);return}if(typeof v==='number'){check(Number.isFinite(v));return}check(Array.isArray(v)||plain(v));for(const [k,x] of Object.entries(v)){check(!['__proto__','prototype','constructor'].includes(k));validJSON(x,depth+1,count)}}
function normalize(input){
check(plain(input));validJSON(input);const s=defaults();
for(const k of FIELDS)if(own(input,k))s[k]=clone(input[k]);
check(typeof s.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.date)&&Number.isFinite(Date.parse(s.date)));
check(Number.isInteger(s.last)&&s.last>=1&&s.last<=10);
for(const k of MAPS)check(plain(s[k])&&Object.keys(s[k]).length<600);
for(const k of ['ratings','steps'])for(const [id,v]of Object.entries(s[k]))check(/^(?:[1-9]|10)$/.test(id)&&Number.isInteger(v)&&v>=0&&v<=(k==='ratings'?2:3));
for(const [id,v]of Object.entries(s.drafts))check(draft.test(id)&&typeof v==='string'&&v.length<=100000);
for(const [id,v]of Object.entries(s.checks))check(/^(lesson(?:[1-9]|10)|case[567]task[0-2])-\d{1,2}$/.test(id)&&typeof v==='boolean');
for(const [id,v]of Object.entries(s.days))check(/^[0-6]$/.test(id)&&typeof v==='boolean');
for(const [id,v]of Object.entries(s.quiz))check(/^(?:[1-9]|[12]\d|30)$/.test(id)&&plain(v)&&Number.isInteger(v.choice)&&v.choice>=0&&v.choice<4&&(v.date===undefined||typeof v.date==='string'));
check(Array.isArray(s.draw)&&s.draw.length<=5000);let points=0;
for(const stroke of s.draw){check(plain(stroke)&&['pen','eraser'].includes(stroke.tool)&&Array.isArray(stroke.points));points+=stroke.points.length;check(points<=150000);for(const p of stroke.points)check(Array.isArray(p)&&p.length===2&&p.every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<100000))}
for(const [id,v]of Object.entries(s.aiChecks))check(task.test(id)&&plain(v)&&plain(v.feedback));
check(Array.isArray(s.aiChat)&&s.aiChat.length<=20);for(const r of s.aiChat)check(plain(r)&&typeof r.question==='string'&&plain(r.answer)&&typeof r.answer.zh==='string'&&typeof r.answer.en==='string');
check(Object.keys(s.syncConflicts).length<=40);for(const [id,c]of Object.entries(s.syncConflicts))check(/^c[a-f0-9]{16}$/.test(id)&&plain(c)&&typeof c.key==='string'&&(c.key==='draw'||c.key==='aiChat'||c.key.startsWith('drafts/')||c.key.startsWith('aiChecks/'))&&typeof c.savedAt==='string'&&typeof c.deleted==='boolean');
return s;
}
function flatten(s){const m=new Map();for(const k of FIELDS)if(MAPS.includes(k)){for(const [id,v]of Object.entries(s[k]||{}))m.set(k+'/'+id,v)}else m.set(k,s[k]);return m}
function inflate(m){const s=defaults();for(const [path,v]of m){const at=path.indexOf('/');if(at<0)s[path]=clone(v);else s[path.slice(0,at)][path.slice(at+1)]=clone(v)}return s}
function hash(text){let a=2166136261,b=2246822507;for(let i=0;i<text.length;i++){a=Math.imul(a^text.charCodeAt(i),16777619);b=Math.imul(b^text.charCodeAt(i),3266489909)}return (a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0')}
function merge(base,local,remote,{bootstrap=false,now=new Date().toISOString()}={}){
const b=flatten(normalize(base)),l=flatten(normalize(local)),r=flatten(normalize(remote)),out=new Map(),backups=[];
if(bootstrap){const d=flatten(defaults());for(const [k,v]of d){if(equal(l.get(k),v))l.delete(k);if(equal(b.get(k),v))b.delete(k);if(equal(r.get(k),v))r.delete(k)}}
for(const k of new Set([...b.keys(),...l.keys(),...r.keys()])){
const bv=b.get(k),lv=l.get(k),rv=r.get(k),lc=!equal(lv,bv),rc=!equal(rv,bv);
let value=lc?lv:rv;
if(lc&&rc&&!equal(lv,rv)){
if(k==='aiChat'&&Array.isArray(lv)&&lv.length&&Array.isArray(rv)&&rv.length){const chats=new Map([...lv,...rv].map(x=>[hash(canonical(x)),x]));value=[...chats.values()].sort((a,b)=>String(a.checkedAt||'').localeCompare(String(b.checkedAt||''))).slice(-20)}
else if(k==='draw'||k==='aiChat'||k.startsWith('drafts/')||k.startsWith('aiChecks/'))backups.push({id:'c'+hash(k+'|'+canonical(bv)+'|'+canonical(rv)+'|'+canonical(lv)),key:k,value:rv===undefined?null:clone(rv),deleted:rv===undefined,savedAt:now});
}
if(value!==undefined)out.set(k,value);
}
const merged=inflate(out);for(const c of backups){const {id,...record}=c;merged.syncConflicts[id]=record}
merged.syncConflicts=Object.fromEntries(Object.entries(merged.syncConflicts).sort((a,b)=>String(b[1].savedAt).localeCompare(String(a[1].savedAt))).slice(0,40));
return {state:normalize(merged),conflicts:backups.length};
}
function restore(s,id){const next=normalize(s),c=next.syncConflicts[id];check(c);const at=c.key.indexOf('/');if(at<0)next[c.key]=c.deleted?(c.key==='draw'||c.key==='aiChat'?[]:null):clone(c.value);else{const group=c.key.slice(0,at),key=c.key.slice(at+1);check(group==='drafts'||group==='aiChecks');if(c.deleted)delete next[group][key];else next[group][key]=clone(c.value)}delete next.syncConflicts[id];return normalize(next)}
return {defaults,normalize,merge,restore,canonical,equal,clone};
})();
