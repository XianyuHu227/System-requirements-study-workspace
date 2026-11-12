
'use strict';
let aiModelPromise=null,aiModelList=[],aiBusy=false,aiModelWarnings=[];
state.aiChecks=state.aiChecks&&typeof state.aiChecks==='object'?state.aiChecks:{};
async function aiModels(force=false){if(force){aiModelPromise=null;aiModelList=[]}if(!aiModelPromise)aiModelPromise=(async()=>{const res=await fetch('/api/models',{credentials:'same-origin',signal:AbortSignal.timeout(45000)});let data;try{data=await res.json()}catch{throw Error('请登录后在线打开网站，再试一次。 / Open the online site and sign in.')}if(!res.ok)throw Error((data.error?.zh||'模型列表加载失败')+' / '+(data.error?.en||'Model list unavailable'));if(!Array.isArray(data.models)||!data.models.length)throw Error('没有可用模型 / No models available');aiModelWarnings=Array.isArray(data.warnings)?data.warnings:[];aiModelList=data.models;return data.models})().catch(e=>{aiModelPromise=null;throw e});return aiModelPromise}
function aiPair(p){return both(typeof p?.zh==='string'?p.zh:'',typeof p?.en==='string'?p.en:'')}
function aiTutorAction(key,kind,index,label){return key?'<button type="button" class="ai-feedback-ask" data-tutor-task="'+esc(key)+'" data-tutor-kind="'+kind+'" data-tutor-index="'+index+'">'+label+'</button>':''}
function aiResultHTML(record,current,key=''){if(!record?.feedback)return '';const f=record.feedback;const list=(a)=>Array.isArray(a)?a.map(x=>'<li>'+aiPair(x)+'</li>').join(''):'';return '<div class="ai-result">'+(record.answer!==current?'<div class="notice">'+both('这是修改前答案的反馈；修改后请重新检查。','This feedback is for an earlier draft. Check again after revising.')+'</div>':'')+'<div class="caption">'+esc(record.model)+' · '+esc(record.effort||'none')+' · '+esc(record.checkedAt)+'</div><h3>'+both('批改小结','Feedback summary')+'</h3><p>'+aiPair(f.summary)+'</p><div class="ai-criteria">'+(Array.isArray(f.criteria)?f.criteria.map((c,i)=>'<div class="ai-criterion"><span class="ai-status '+esc(c.status)+'">'+({met:'已满足 / Met',partial:'部分满足 / Partial',not_met:'未满足 / Not met'}[c.status]||'待复核 / Review')+'</span><strong>'+dual(c.criterion||'')+'</strong>'+(c.comparison?'<div class="notice">'+both('本项判断发生变化，请核对前后理由；这次结果并非确定评分。','This judgment changed. Compare the reasons; this is not a definitive mark.')+'<p>'+both('上轮判断：','Previous status: ')+esc(c.comparison.previous_status)+'</p><p>'+aiPair(c.comparison.previous_feedback)+'</p></div>':'')+'<p>'+aiPair(c.feedback)+'</p>'+aiTutorAction(key,'criterion',i,both('解释这一项','Explain this criterion'))+'</div>').join(''):'')+'</div><h3>'+both('做得好的地方','Strengths')+'</h3><ul>'+list(f.strengths)+'</ul><h3>'+both('需要改进的地方','Improvements')+'</h3><ul>'+(Array.isArray(f.improvements)?f.improvements.map((x,i)=>'<li>'+aiPair(x)+aiTutorAction(key,'improvement',i,both('追问这条建议','Discuss this improvement'))+'</li>').join(''):'')+'</ul><details><summary>'+both('参考改写（不会替换你的答案）','Suggested revision (does not replace your answer)')+'</summary><div><p>'+aiPair(f.revised_answer)+'</p></div></details><p><b>'+both('下一步','Next step')+'</b>'+aiPair(f.next_step)+'</p>'+aiSourceHTML(record.sources)+'<p class="caption">'+both('AI 反馈仅供复习，不是官方评分。画板图像未发送。','AI feedback is for practice, not an official grade. Drawing pixels were not sent.')+'</p></div>'}

const AI_EFFORT_LABELS={thinking:'开启思考 / Thinking on',none:'快速 · 不思考 / Fast · no thinking',low:'轻度思考 / Low',high:'深度思考 / High',max:'最高强度 / Max'};
function aiSettingsMarkup(){return '<a class="source-link" href="/signin-with-chatgpt?return_to=%2F" target="_top">登录后使用 AI / Sign in for AI</a>'+ '<label>'+both('模型','Model')+'<select class="ai-model" aria-label="AI 模型 / Model"></select></label><label>'+both('思考强度','Thinking effort')+'<select class="ai-effort" aria-label="思考强度 / Thinking effort"></select><span class="caption ai-effort-note"></span></label>'}
function aiSourceHTML(sources){if(!Array.isArray(sources))return '';return '<ul class="ai-sources">'+sources.filter(s=>s&&typeof s.url==='string'&&s.url.startsWith('https://learn.adelaide.edu.au/courses/30725/')).slice(0,15).map(s=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">['+esc(s.id)+'] '+esc(s.title)+'</a><span class="caption"> · '+esc(s.checked||'')+'</span></li>').join('')+'</ul>'}
function aiPreference(key,value){try{if(value!==undefined)localStorage.setItem(key,value);return localStorage.getItem(key)}catch{return null}}
function aiInitSettings(box,button,status){
const model=box.querySelector('.ai-model'),effort=box.querySelector('.ai-effort'),refresh=box.querySelector('.ai-refresh');
function levels(){const m=aiModelList.find(m=>m.id===model.value),list=m?.efforts||['none'];effort.replaceChildren(...list.map(e=>new Option(AI_EFFORT_LABELS[e]||e,e)));const saved=aiPreference('sr-deepseek-effort');effort.value=list.includes(saved)?saved:(m?.defaultEffort||list[0]);if(!list.includes(effort.value))effort.selectedIndex=0;effort.title=m?.effortNote||'';const note=box.querySelector('.ai-effort-note');if(note)note.textContent=effort.title;}
async function populate(force=false){button.disabled=true;refresh.disabled=true;try{const list=await aiModels(force);model.replaceChildren(...list.map(m=>new Option(m.name+' ('+m.id+')',m.id)));const saved=aiPreference('sr-deepseek-model');model.value=list.some(m=>m.id===saved)?saved:list[0].id;levels();button.disabled=false;status.textContent=aiModelWarnings.map(w=>w.zh+' / '+w.en).join(' · ')}catch(e){model.replaceChildren(new Option('模型不可用 / Unavailable',''));effort.replaceChildren(new Option('—',''));status.textContent=e.message}finally{refresh.disabled=false}}
model.onchange=()=>{aiPreference('sr-deepseek-model',model.value);levels()};
effort.onchange=()=>aiPreference('sr-deepseek-effort',effort.value);
refresh.onclick=()=>populate(true);populate();
return {model,effort,refresh,lock(value){model.disabled=value;effort.disabled=value;refresh.disabled=value;button.disabled=value}};
}

function bindAI(){
aiInitChat();
document.querySelectorAll('textarea[data-draft]').forEach(area=>{
const key=area.dataset.draft;if(!/^(lesson\d+(?:q[2-5])?|case\d+task\d+|sample\d+)$/.test(key)||area.parentElement.querySelector('[data-ai-for="'+key+'"]'))return;
const box=document.createElement('section');box.className='ai-panel';box.dataset.aiFor=key;
box.innerHTML='<div class="row wrap"><h3>'+both('AI 答案检查 · DeepSeek / Kimi','AI answer check · DeepSeek / Kimi')+'</h3><span class="tag suggested">AI · '+both('复习辅助','Practice aid')+'</span></div><p class="caption">'+both('点击后发送本题、当前文本答案和课程检查项到所选 AI 服务；消耗对应 API 余额，不发送整份学习记录。','Clicking sends this task, current text answer and course criteria to the selected AI provider, using its API balance. Your full study record is not sent.')+'</p><div class="ai-controls">'+aiSettingsMarkup()+'<button class="btn secondary ai-refresh" type="button">刷新模型 / Refresh</button><button class="btn ai-submit" type="button" disabled>AI 检查答案 / Check answer</button><button class="btn secondary ai-discuss" type="button">讨论本题 / Discuss this task</button></div><div class="ai-message" role="status" aria-live="polite"></div><div class="ai-output"></div>';
area.nextElementSibling?.classList.contains('save-hint')?area.nextElementSibling.after(box):area.after(box);
const select=box.querySelector('.ai-model'),button=box.querySelector('.ai-submit'),refresh=box.querySelector('.ai-refresh'),status=box.querySelector('.ai-message'),output=box.querySelector('.ai-output');
function display(){output.innerHTML=aiResultHTML(state.aiChecks[key],area.value,key)}
const settings=aiInitSettings(box,button,status);
box.querySelector('.ai-discuss').onclick=()=>aiOpenTask(key);
output.onclick=e=>{const target=e.target.closest('[data-tutor-task]');if(target)aiOpenTask(target.dataset.tutorTask,{kind:target.dataset.tutorKind,index:Number(target.dataset.tutorIndex)})};
area.addEventListener('focus',()=>{aiLastTaskId=key;aiRefreshLinkedContext()});
area.addEventListener('input',()=>{display();aiRefreshLinkedContext()});
button.onclick=async()=>{
if(aiBusy){status.textContent='请等待当前批改完成 / Wait for the current check.';return}
const answer=area.value;if(answer.trim().length<5||answer.length>8000){status.textContent='请输入 5–8000 字符的答案 / Enter 5–8000 characters.';return}
aiBusy=true;settings.lock(true);status.textContent='正在批改，请稍候；请勿重复提交 / Checking your answer; please do not resubmit.';
try{const res=await fetch('/api/grade',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({taskId:key,model:select.value,effort:settings.effort.value,answer}),signal:AbortSignal.timeout(195000)});let data;try{data=await res.json()}catch{throw Error('服务器响应无效，请确认已登录 / Invalid response; check sign-in.')}if(!res.ok)throw Error((data.error?.zh||'批改失败')+' / '+(data.error?.en||'Check failed'));state.aiChecks[key]={feedback:data.feedback,model:data.model,effort:data.effort,sources:data.sources,checkedAt:data.checkedAt,answer};save();display();status.textContent=data.reused?'答案、模型和强度未变，已复用上次反馈 / Same answer and settings: previous feedback reused.':'反馈已保存；变更项会显示上轮理由，请对照核实 / Feedback saved. Changed judgments show the previous reasons for comparison.'}
catch(e){status.textContent=e.name==='TimeoutError'||e.name==='AbortError'?'等待超时，原答案仍在；可稍后重试 / Timed out. Your draft remains saved.':e.message}
finally{aiBusy=false;settings.lock(false);aiRefreshLinkedContext()}
};
display();
});
aiRefreshLinkedContext();
}

function aiInitChat(){
if(document.getElementById('ai-chat-panel')){aiPopulateTaskPicker();aiRenderChat();return}
const button=document.createElement('button');button.id='ai-chat-launch';button.type='button';button.className='btn ai-chat-launch';button.setAttribute('aria-controls','ai-chat-panel');button.setAttribute('aria-expanded','false');button.innerHTML=both('问 AI · DeepSeek / Kimi','Ask AI · DeepSeek / Kimi');
const panel=document.createElement('section');panel.id='ai-chat-panel';panel.className='ai-chat-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','AI 课程问答 / Course Q&A');
panel.innerHTML='<header class="ai-chat-heading"><div><span class="eyebrow">CANVAS · COURSE TUTOR</span><h2>'+both('随时提问','Ask as you study')+'</h2></div><button type="button" class="btn secondary ai-chat-close" aria-label="关闭 / Close">×</button></header><div class="ai-chat-content"><p class="caption">'+both('根据已核对的 Canvas 资料摘要回答，核对日期：2026-11-10。不是完整官方答案册；资料不足会说明。每次提问消耗 API 余额。','Answers use curated Canvas notes checked 10 Nov 2026, not a complete official answer key. Missing evidence is identified. Each question uses your API balance.')+'</p>'+aiContextMarkup()+'<div class="ai-controls">'+aiSettingsMarkup()+'<button type="button" class="btn secondary ai-refresh">刷新 / Refresh</button></div><p class="caption">'+both('快速适合查定义；轻度适合简短解释；深度适合比较与应用；最高适合复杂情境。强度越高通常越慢、用量越多。','Fast for definitions; Low for short explanations; High for comparison/application; Max for complex scenarios. More effort usually takes longer and uses more tokens.')+'</p><div id="ai-chat-log" class="ai-chat-log" aria-live="polite"></div></div><form class="ai-chat-form"><label for="ai-chat-question">'+both('你的问题（可以继续追问）','Your question (follow-ups welcome)')+'</label><textarea id="ai-chat-question" maxlength="3000" rows="3" placeholder="例如：为什么这个需求不满足 SMART？ / Why does this requirement fail SMART?"></textarea><div class="row wrap"><button type="submit" class="btn ai-chat-send" disabled>'+both('发送问题','Send question')+'</button><button type="button" class="btn secondary ai-chat-clear">'+both('清空当前对话','Clear current thread')+'</button></div><div class="ai-message" role="status" aria-live="polite"></div></form>';
document.body.append(button,panel);
aiInitContextControls(panel);
const input=panel.querySelector('textarea'),send=panel.querySelector('.ai-chat-send'),status=panel.querySelector('.ai-message'),settings=aiInitSettings(panel,send,status),clear=panel.querySelector('.ai-chat-clear');
function close(){panel.hidden=true;button.setAttribute('aria-expanded','false');button.focus()}
button.onclick=()=>{if(!panel.hidden){close();return}panel.hidden=false;button.setAttribute('aria-expanded','true');aiPopulateTaskPicker();aiRenderChat();input.focus()};
panel.querySelector('.ai-chat-close').onclick=close;
panel.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();panel.querySelector('form').requestSubmit()}});
clear.onclick=()=>{if(aiBusy)return;const scope=aiSelectedTask();state.aiChat=aiChatRecords().filter(r=>(r.linkedTask?.id||'')!==scope);save();aiRenderChat();status.textContent='';input.focus()};
panel.querySelector('form').onsubmit=async e=>{
e.preventDefault();if(aiBusy){status.textContent='请等待当前请求完成 / Wait for the current request.';return}
const question=input.value.trim();if(question.length<2||question.length>3000){status.textContent='请输入 2–3000 字符的问题 / Enter 2–3000 characters.';return}
const taskId=aiSelectedTask(),history=aiContextHistory(taskId);
const context=location.hash.slice(0,80);
aiBusy=true;settings.lock(true);clear.disabled=true;aiLockContext(panel,true);status.textContent='正在核对课程依据并回答，深度模式可能需要几分钟… / Checking course evidence; deeper effort may take a few minutes…';
try{const linkedWork=aiBuildLinkedWork(taskId);const res=await fetch('/api/ask',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,history,context,linkedWork,model:settings.model.value,effort:settings.effort.value}),signal:AbortSignal.timeout(195000)});let data;try{data=await res.json()}catch{throw Error('响应无效，请确认已登录 / Invalid response; check sign-in.')}if(!res.ok)throw Error((data.error?.zh||'回答失败')+' / '+(data.error?.en||'Request failed'));state.aiChat=[...aiChatRecords(),{question,...data}].slice(-20);save();input.value='';aiRenderChat();status.textContent='回答已保存在本机，可随学习记录导出 / Answer saved locally and included in study-record exports.'}
catch(e){status.textContent=e.name==='TimeoutError'||e.name==='AbortError'?'等待超时，请保留问题后重试 / Timed out. Your question remains here for retry.':e.message}
finally{aiBusy=false;settings.lock(false);clear.disabled=false;aiLockContext(panel,false)}
};
aiRenderChat();
}
function aiChatRecords(){return Array.isArray(state.aiChat)?state.aiChat.filter(r=>r&&typeof r.question==='string'&&r.answer&&typeof r.answer.zh==='string'&&typeof r.answer.en==='string').slice(-20):[]}
function aiRenderChat(){const log=document.getElementById('ai-chat-log');if(!log)return;const records=aiScopedChatRecords();log.innerHTML=records.length?records.map(r=>'<article class="ai-chat-entry"><div class="ai-chat-question"><b>'+both('你','You')+'</b>'+(r.linkedTask?'<p class="caption">'+esc(r.linkedTask.title)+'</p>':'')+'<p>'+esc(r.question)+'</p></div><div class="ai-chat-answer"><span class="ai-basis">'+({course_notes:both('课程概念解释 · 非官方逐字答案','Course explanation · not a verbatim answer key'),practice_application:both('基于课程的练习推导','Practice application based on the course'),insufficient_evidence:both('官方资料依据不足','Insufficient official evidence')}[r.basis]||both('请复核依据','Verify the evidence'))+'</span><div class="ai-answer-text">'+aiPair(r.answer)+'</div>'+aiSourceHTML(r.sources)+(r.follow_up?'<p class="caption">'+aiPair(r.follow_up)+'</p>':'')+'<p class="caption">'+esc(r.model||'')+' · '+esc(r.effort||'none')+' · '+esc(r.checkedAt||'')+'</p></div></article>').join(''):'<div class="ai-chat-empty">'+(aiSelectedTask()?both('本题还没有对话。可以直接问“我的答案哪里需要修改？”或点击上面的快捷问题。','No conversation for this task yet. Ask what needs revision or use a quick question.'):'')+both('可以问：SMART 的 T 是什么？Validation 和 Verification 有什么区别？也可以粘贴你的需求，要求逐项解释。','Try: What does T mean in this course’s SMART? How do validation and verification differ? Or paste a requirement and ask for a criterion-by-criterion explanation.')+'</div>';const scroller=log.closest('.ai-chat-content');if(scroller)scroller.scrollTop=scroller.scrollHeight}

bindAI();
