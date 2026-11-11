import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
export function previewDatabase(filename=':memory:'){
const sql=new DatabaseSync(filename);if(!sql.prepare("SELECT name FROM sqlite_master WHERE name='study_progress'").get())sql.exec(fs.readFileSync('drizzle/0000_study_progress.sql','utf8'));
class Statement{constructor(query,values=[]){this.query=query;this.values=values}bind(...v){return new Statement(this.query,v)}async first(){return sql.prepare(this.query).get(...this.values)||null}run(){const x=sql.prepare(this.query).run(...this.values);return {success:true,meta:{changes:Number(x.changes)}}}}
return {prepare:q=>new Statement(q),batch:async items=>{sql.exec('BEGIN');try{const r=items.map(s=>s.run());sql.exec('COMMIT');return r}catch(e){sql.exec('ROLLBACK');throw e}}};
}
