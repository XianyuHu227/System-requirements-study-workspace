// Local-only preview. The hosted Worker uses Sites identity and its D1 binding instead.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {previewDatabase} from './sqlite-preview.mjs';
const source=await fs.readFile('dist/server/index.js','utf8');
const {createHandler}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const handle=createHandler(),DB=previewDatabase('.openai/preview-progress.sqlite');
const args=process.argv.slice(2),port=Number(args[args.indexOf('--port')+1]||process.env.PORT||5173),host=args.includes('--host')?args[args.indexOf('--host')+1]:'0.0.0.0',root=path.resolve('public');
http.createServer(async(req,res)=>{try{
const url=new URL(req.url,'http://'+req.headers.host);let response;
if(!url.pathname.startsWith('/api/')){const filename=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':url.pathname));if(!filename.startsWith(root+path.sep))throw Error('Invalid path');const text=await fs.readFile(filename);response=new Response(text,{headers:{'Content-Type':filename.endsWith('.html')?'text/html; charset=utf-8':filename.endsWith('.js')?'text/javascript; charset=utf-8':'text/css; charset=utf-8','Cache-Control':'no-store'}})}
else{let chunks=[];for await(const c of req)chunks.push(c);const headers=new Headers(req.headers);headers.set('oai-authenticated-user-id','local-preview-owner');response=await handle(new Request(url,{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)}),{DB})}
res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
}catch{res.writeHead(500);res.end('Preview failed')}}).listen(port,host,()=>console.log('http://'+host+':'+port));
