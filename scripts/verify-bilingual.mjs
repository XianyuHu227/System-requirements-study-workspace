
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import path from 'node:path';
const root=path.resolve('public'), nodes=new Map(),storage=new Map();
function el(){return {value:'',dataset:{},classList:{add(){},remove(){},toggle(){}},style:{},addEventListener(){},getContext(){return {clearRect(){},save(){},restore(){},beginPath(){},moveTo(){},lineTo(){},stroke(){}}},getBoundingClientRect(){return {left:0,top:0,width:1000,height:650}},setPointerCapture(){},click(){}}}
const fixed=['main','breadcrumb','side-count','side-progress','toast','export','import','study-language'];fixed.forEach(k=>nodes.set(k,el()));
let html='';Object.defineProperty(nodes.get('main'),'innerHTML',{get(){return html},set(s){html=s;for(const k of nodes.keys())if(!fixed.includes(k))nodes.delete(k);for(const m of s.matchAll(/id="([^"]+)"/g))nodes.set(m[1],el())}});
const old={date:'2026-11-17',ratings:{5:2},steps:{5:2},drafts:{lesson5:'My previous answer'},checks:{},quiz:{1:{choice:1}},days:{},draw:[],last:5};
storage.set('sr-study-v1',JSON.stringify(old));
const ctx=vm.createContext({document:{querySelector:s=>nodes.get(s.slice(1))||null,querySelectorAll:()=>[],body:{dataset:{}},createElement:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},location:{hash:'#home'},window:{scrollTo(){},addEventListener(){}},setTimeout:()=>0,clearInterval(){},setInterval:()=>0,Date,Intl,Blob,URL,console});
for(const f of ['data.js','i18n.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const run=s=>vm.runInContext(s,ctx);
run("if(state.drafts.lesson5!=='My previous answer'||state.ratings[5]!==2)throw Error('old state lost')");
let units=run("LESSONS.flatMap(l=>[l.title,l.task,l.answer,...l.checks,...l.sections.flat()]).concat(QUIZ.flatMap(q=>[q.q,...q.options,q.explanation]),CASES.flatMap(c=>[c.title,c.scenario,...c.tasks.flatMap(t=>[t.title,t.prompt,t.answer,...t.checks])]))");
for(const s of units){const p=run('BI.get('+JSON.stringify(s)+')');assert(p&&typeof p.zh==='string'&&typeof p.en==='string'&&p.zh.length&&p.en.length,'Missing translation: '+s)}
let rendered=0;
for(let id=1;id<=10;id++)for(let step=0;step<4;step++){run("state.steps["+id+"]="+step+";location.hash='#learn/"+id+"';render();");assert(html.includes('lang="zh-CN"')&&html.includes('lang="en"'));assert(!html.includes('>undefined<'));rendered++}
for(const page of ['home','guide','learn','practice','practice/5','practice/6','practice/7','quiz','sample','review','sheet','sources']){run("location.hash="+JSON.stringify('#'+page)+";render();");assert(html.length>100);assert(!html.includes('>undefined<'));rendered++}
for(let i=0;i<30;i++){run("location.hash='#quiz';startQuiz('all');qi="+i+";render();");assert(html.includes('lang="zh-CN"')&&html.includes('lang="en"'));rendered++}
run("location.hash='#quiz';startQuiz('all');render();chosen=0;document.querySelector('#quiz-submit').onclick();startQuiz('wrong');render();if(!quizIds.includes(1))throw Error('wrong filter');chosen=1;document.querySelector('#quiz-submit').onclick();startQuiz('wrong');if(quizIds.includes(1))throw Error('correction');");
for(const lang of ['en','zh','both']){nodes.get('study-language').value=lang;nodes.get('study-language').onchange();assert.equal(run('document.body.dataset.language'),lang);assert.equal(storage.get('sr-study-language'),lang)}
assert.equal(JSON.parse(storage.get('sr-study-v1')).drafts.lesson5,'My previous answer');
assert(run("guide().includes('导入会用文件记录替换')"));
console.log(JSON.stringify({passed:true,translatedUnits:units.length,renderedViews:rendered,checks:['bilingual coverage','language switching/persistence','legacy progress preserved','wrong-answer correction','guide replacement warning']}));
