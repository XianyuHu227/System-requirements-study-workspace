'use strict';
const CLOUD_META_KEY='sr-cloud-meta-v1';
let cloudApplying=false,cloudObserved=null,cloudTimer=null,cloudViewPending=false,cloudDrawing=false,cloudComposing=false;
let cloudStatus={phase:'syncing'},cloudEngine;
function cloudStoreState(){try{localStorage.setItem('sr-study-v1',JSON.stringify(state))}catch{}}
function cloudSchedule(){clearTimeout(cloudTimer);cloudTimer=setTimeout(()=>cloudEngine.sync(),1000)}
function cloudBeforeSave(){
if(cloudApplying||!cloudObserved)return;
try{const disk=JSON.parse(localStorage.getItem('sr-study-v1')||'null');if(disk&&!SRSyncCore.equal(SRSyncCore.normalize(disk),cloudObserved)){const merged=SRSyncCore.merge(cloudObserved,state,disk);Object.assign(state,merged.state)}}catch{}
}
function cloudChanged(){if(cloudApplying||!cloudEngine)return;cloudObserved=SRSyncCore.normalize(state);cloudEngine.mark()}
function cloudEditable(){const a=document.activeElement;return a&&(a.matches('textarea,input,select')||a.isContentEditable)}
function cloudRefreshView(){
if(cloudDrawing||cloudComposing||cloudEditable()||typeof aiBusy!=='undefined'&&aiBusy){cloudViewPending=true;return}
// Keep a running timer and an unsubmitted quiz selection intact.
const page=location.hash.slice(1).split('/')[0];if(typeof timerInterval!=='undefined'&&timerInterval||page==='quiz'){cloudViewPending=true;updateProgress();return}
cloudApplying=true;globalThis.srApplyingCloud=true;
try{render(false);if(typeof aiRenderChat==='function')aiRenderChat();cloudViewPending=false}finally{cloudApplying=false;globalThis.srApplyingCloud=false}
}
function cloudApply(next){
const changed=!SRSyncCore.equal(SRSyncCore.normalize(state),next);
cloudApplying=true;try{Object.assign(state,next);cloudObserved=SRSyncCore.clone(next);cloudStoreState();updateProgress()}finally{cloudApplying=false}
if(changed)cloudRefreshView();cloudRenderStatus();
}
function cloudRenderStatus(){
const button=document.getElementById('cloud-status');if(!button)return;
const messages={pending:['本机已保存 · 待同步','Saved locally · sync pending'],syncing:['正在同步…','Syncing…'],synced:['已云端同步','Cloud synced'],offline:['离线 · 本机已保存','Offline · saved locally'],error:['同步暂未完成','Sync incomplete'],login:['登录后同步','Sign in to sync'],account:['账号不一致 · 同步已暂停','Different account · sync paused']};
const text=messages[cloudStatus.phase]||messages.error;
button.dataset.phase=cloudStatus.phase;button.innerHTML=both(text[0],text[1]);button.title=(cloudStatus.message||text.join(' / '))+(cloudStatus.updatedAt?' · '+new Date(cloudStatus.updatedAt).toLocaleString():'');
const panel=document.getElementById('cloud-panel');if(!panel)return;
panel.querySelector('.cloud-message').textContent=cloudStatus.message||text.join(' / ');
panel.querySelector('.cloud-login').hidden=cloudStatus.phase!=='login';
panel.querySelector('.cloud-updated').textContent=cloudEngine?.meta?.updatedAt?'最近云端保存 / Last cloud save: '+new Date(cloudEngine.meta.updatedAt).toLocaleString():'尚无云端保存时间 / No cloud save yet';
panel.querySelector('.cloud-retry').disabled=!cloudEngine||cloudStatus.phase==='syncing'||cloudStatus.phase==='account';
panel.querySelector('.cloud-account').hidden=cloudStatus.phase!=='account';
const list=panel.querySelector('.cloud-conflicts');
list.replaceChildren();
for(const [id,c]of Object.entries(state.syncConflicts||{}).sort((a,b)=>b[1].savedAt.localeCompare(a[1].savedAt))){
const item=document.createElement('details'),summary=document.createElement('summary'),pre=document.createElement('pre'),restore=document.createElement('button'),discard=document.createElement('button');
summary.textContent=c.key+' · '+new Date(c.savedAt).toLocaleString();pre.textContent=c.deleted?'另一设备删除了此项 / Deleted on another device':typeof c.value==='string'?c.value:JSON.stringify(c.value,null,2);restore.type=discard.type='button';restore.className='btn small';discard.className='btn small secondary';restore.textContent='恢复此版本 / Restore version';discard.textContent='移除备份 / Dismiss';
restore.onclick=()=>{try{Object.assign(state,SRSyncCore.restore(state,id));save();cloudRefreshView();cloudRenderStatus()}catch{toast('无法恢复此版本，请保留导出备份 / Could not restore; keep an export.')}};
discard.onclick=()=>{delete state.syncConflicts[id];save();cloudRenderStatus()};
item.append(summary,pre,restore,discard);list.append(item);
}
if(!list.children.length){const p=document.createElement('p');p.textContent='没有待处理的冲突备份 / No conflict backups to review.';list.append(p)}
}
function cloudInitUI(){
const button=document.createElement('button');button.id='cloud-status';button.className='cloud-status';button.type='button';button.setAttribute('aria-controls','cloud-panel');button.setAttribute('aria-expanded','false');document.querySelector('.topbar').after(button);
const panel=document.createElement('section');panel.id='cloud-panel';panel.className='cloud-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','云端同步 / Cloud sync');
panel.innerHTML='<div class="row"><h2>'+both('账号云端同步','Account cloud sync')+'</h2><button type="button" class="btn secondary cloud-close" aria-label="关闭 / Close">×</button></div><p class="cloud-message" role="status" aria-live="polite"></p><p class="caption cloud-updated"></p><p>'+both('在不同设备使用同一个 ChatGPT 账号打开这个网址，即可自动继续。答案、笔记、自测、画板和 DeepSeek 对话会同步。断网时保存在本机，联网后重试。','Open this URL with the same ChatGPT account on each device to continue automatically. Answers, notes, quizzes, drawings and DeepSeek chats sync. Offline changes stay on the device and retry when connected.')+'</p><p class="caption">'+both('输入后约 1 秒开始同步；其他已打开的设备约 15 秒检查一次，回到网页时也会检查。换设备前请确认显示“已云端同步”。学习语言和模型选择仍按设备保存。','Sync starts about 1 second after editing. Other open devices check about every 15 seconds and when returning to the page. Check for Cloud synced before changing devices. Language and model preferences remain device-local.')+'</p><a class="btn cloud-login" href="/signin-with-chatgpt?return_to=%2F" target="_top" hidden>登录 ChatGPT / Sign in</a><p class="cloud-account" hidden>'+both('本机记录关联了另一个账号。为避免混入其他账号的数据，已暂停同步；请登录原账号。','This browser’s records belong to a different account. Sync is paused to prevent mixing account data; sign in with the original account.')+'</p><button type="button" class="btn cloud-retry">立即同步 / Sync now</button><h3>'+both('同一题修改冲突的备份','Backups of conflicting edits')+'</h3><p class="caption">'+both('不同题目自动合并。同一答案或画板冲突时保留当前设备版本，并备份另一版本；最多保留 40 项。恢复会成为一次新修改并同步。JSON 导出仍可用于额外备份。','Different fields merge automatically. When the same answer or drawing conflicts, this device’s version stays and the other is backed up (up to 40 items). Restoring makes a new synced edit. JSON export remains available as an extra backup.')+'</p><div class="cloud-conflicts"></div>';
document.body.append(panel);button.onclick=()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));cloudRenderStatus()};panel.querySelector('.cloud-close').onclick=()=>{panel.hidden=true;button.setAttribute('aria-expanded','false');button.focus()};panel.addEventListener('keydown',e=>{if(e.key==='Escape')panel.querySelector('.cloud-close').click()});panel.querySelector('.cloud-retry').onclick=()=>cloudEngine.sync();
}
function cloudStart(){
let meta=null;try{const m=JSON.parse(localStorage.getItem(CLOUD_META_KEY)||'null');if(m?.version===1&&typeof m.userId==='string'&&Number.isSafeInteger(m.revision)&&m.revision>=0){m.base=SRSyncCore.normalize(m.base);meta=m}}catch{}
try{cloudObserved=SRSyncCore.normalize(state)}catch{cloudStatus={phase:'error',message:'本机记录格式无法同步，请先导出备份 / Local record format cannot sync; export a backup.'};cloudInitUI();cloudRenderStatus();return}
cloudEngine=new SRCloudEngine({read:()=>state,apply:cloudApply,meta,persistMeta:m=>{try{localStorage.setItem(CLOUD_META_KEY,JSON.stringify(m))}catch{}},status:s=>{cloudStatus=s;cloudRenderStatus()},canSync:()=>!cloudDrawing&&!cloudComposing,pending:cloudSchedule,request:(method,body)=>fetch('/api/progress',{method,credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)})});
cloudInitUI();cloudEngine.sync();
window.addEventListener('online',()=>cloudEngine.sync());window.addEventListener('offline',()=>{cloudStatus={phase:'offline'};cloudRenderStatus()});window.addEventListener('focus',()=>cloudEngine.sync());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')cloudEngine.sync();else cloudEngine.sync()});
document.addEventListener('pointerdown',e=>{if(e.target.id==='drawing')cloudDrawing=true});
for(const type of ['pointerup','pointercancel'])document.addEventListener(type,()=>{if(cloudDrawing){cloudDrawing=false;cloudSchedule()}});
document.addEventListener('compositionstart',()=>{cloudComposing=true});document.addEventListener('compositionend',()=>{cloudComposing=false;cloudSchedule()});
document.addEventListener('focusout',()=>setTimeout(()=>{if(cloudViewPending)cloudRefreshView()},100));
window.addEventListener('storage',e=>{if(e.key!=='sr-study-v1'||!e.newValue)return;try{const next=SRSyncCore.normalize(JSON.parse(e.newValue)),merged=SRSyncCore.merge(cloudObserved,state,next);cloudApply(merged.state);cloudEngine.mark()}catch{}});
setInterval(()=>{if(document.visibilityState==='visible'){cloudEngine.sync();if(cloudViewPending)cloudRefreshView()}},15000);
}
cloudStart();
