
import fs from 'node:fs/promises';import path from 'node:path';import vm from 'node:vm';
const base=path.resolve('.'),web=path.join(base,'public'),out=path.join(base,'dist');
const data=await fs.readFile(path.join(web,'data.js'),'utf8');const context=vm.createContext({});vm.runInContext(data,context);
const {lessons,cases}=vm.runInContext('({lessons:LESSONS,cases:CASES})',context);
const catalog={};for(const l of lessons)catalog['lesson'+l.id]={title:l.title,question:l.task,reference:l.answer,checks:l.checks,lessonIds:[l.id],context:l.sections};
for(const c of cases)for(const [i,t]of c.tasks.entries())catalog['case'+c.id+'task'+i]={title:t.title,scenario:c.scenario,question:t.prompt,reference:t.answer,checks:t.checks,lessonIds:c.topics,context:c.topics.map(i=>lessons[i-1].sections),drawing:t.draw?'Text notes only. The actual drawing is not provided.':undefined};
const samples=[
['SMART absolute availability','Assess an unqualified 100% availability target using SMART.','Discuss attainability and distinguish a numeric target from a feasible guarantee.',['Identify the relevant SMART limitation','Explain why a numerical target does not prove attainability']],
['SMART usability','Explain why “easy to use” fails SMART.','Discuss specific tasks, users, metrics and test conditions.',['Explain Specific','Explain Measurable']],
['FURPS+ classification','Classify 99.9% availability and support for content in several languages; justify.','Availability concerns reliability. Language capability may be functionality with usability benefit; accept justified interpretation.',['Classify availability','Justify language-support classification']],
['Waterfall and requirements stages','Explain a Waterfall weakness and distinguish requirements, analysis and specification.','Late changes can be expensive. Needs, clarification/reconciliation and precise documentation are distinct.',['Explain weakness and impact','Distinguish the three concepts']],
['Interview questions','Explain leading questions and the use of open questions early in elicitation.','Leading wording presupposes a view; open questions uncover experiences and unexpected needs.',['Explain leading wording','Explain open-question purpose']],
['Rewrite vague requirements','Identify defects in “fast and user-friendly” and write measurable requirements.','Split performance and usability, define test conditions and label invented targets as proposed.',['Identify ambiguity and bundled goals','Separate atomic requirements','Define measures and conditions','Label assumptions']]
];samples.forEach((s,i)=>catalog['sample'+i]={title:s[0],question:s[1],reference:s[2],checks:s[3],lessonIds:[1,2,5],context:lessons.filter(l=>[1,2,5].includes(l.id)).map(l=>l.sections)});
const official=JSON.parse(await fs.readFile(path.join(base,'knowledge/official-course.json'),'utf8'));
const assets={};for(const f of await fs.readdir(web)){if(!/\.(html|css|js)$/.test(f))continue;let text=await fs.readFile(path.join(web,f),'utf8');if(/sk-[a-z0-9_-]{20,}/i.test(text))throw Error('Credential-like value in browser source');assets['/'+f]={text,type:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8'}}
await fs.mkdir(path.join(out,'server'),{recursive:true});await fs.mkdir(path.join(out,'.openai'),{recursive:true});
const core=await fs.readFile(path.join(web,'sync-core.js'),'utf8');
const progress=await fs.readFile(path.join(base,'worker/progress.js'),'utf8');
const kimi=await fs.readFile(path.join(base,'worker/kimi.js'),'utf8');
const runtime=await fs.readFile(path.join(base,'worker/index.js'),'utf8');const manifest=await fs.readFile(path.join(base,'.openai/hosting.json'),'utf8');if(JSON.parse(manifest).static)throw Error('Worker manifest must omit static');
await fs.writeFile(path.join(out,'server/index.js'),'const ASSETS='+JSON.stringify(assets)+';\nconst CATALOG='+JSON.stringify(catalog)+';\nconst OFFICIAL='+JSON.stringify(official)+';\n'+core+'\n'+progress+'\n'+kimi+'\n'+runtime);
await fs.writeFile(path.join(out,'.openai/hosting.json'),manifest);
console.log(JSON.stringify({built:true,assets:Object.keys(assets).length,gradableTasks:Object.keys(catalog).length}));
