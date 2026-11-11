'use strict';
// Transport and persistence are injected so two independent devices can be tested against real SQLite.
var SRCloudEngine=class {
constructor({read,apply,request,meta=null,persistMeta=()=>{},status=()=>{},canSync=()=>true,pending=()=>{}}){Object.assign(this,{read,apply,request,meta,persistMeta,status,canSync,pending});this.busy=false;this.again=false}
mark(){this.again=true;this.status({phase:'pending'});this.pending()}
async call(method,body){const res=await this.request(method,body);let data;try{data=await res.json()}catch{throw Object.assign(Error('云端响应无效，请稍后重试 / Invalid cloud response; try later.'),{status:res.headers?.get('Content-Type')?.includes('text/html')?401:res.status})}if(!res.ok&&res.status!==409)throw Object.assign(Error((data.error?.zh||'同步失败')+' / '+(data.error?.en||'Sync failed')),{status:res.status});return {code:res.status,data}}
setMeta(data,document){this.meta={version:1,userId:data.userId,revision:data.revision,base:SRSyncCore.clone(document),updatedAt:data.updatedAt};this.persistMeta(this.meta)}
async sync(){
if(this.busy){this.again=true;return}if(!this.canSync()){this.mark();return}
this.busy=true;this.again=false;this.status({phase:'syncing'});
try{
for(let attempt=0;attempt<3;attempt++){
const {data:cloud}=await this.call('GET');
if(typeof cloud.userId!=='string'||!Number.isSafeInteger(cloud.revision))throw Error('云端身份或版本无效 / Invalid cloud identity or version.');
if(this.meta&&this.meta.userId!==cloud.userId){this.status({phase:'account'});return}
if(!this.canSync()){this.mark();return}
const remote=SRSyncCore.normalize(cloud.document),local=SRSyncCore.normalize(this.read());
const merged=SRSyncCore.merge(this.meta?.base||SRSyncCore.defaults(),local,remote,{bootstrap:!this.meta});
this.setMeta(cloud,remote);this.apply(merged.state);
if(SRSyncCore.equal(merged.state,remote)){this.status({phase:'synced',updatedAt:cloud.updatedAt,conflicts:Object.keys(merged.state.syncConflicts).length});return}
const sent=SRSyncCore.clone(merged.state),response=await this.call('PUT',{revision:cloud.revision,document:sent});
if(response.code===409)continue;
if(response.data.userId!==cloud.userId||response.data.revision!==cloud.revision+1)throw Error('云端保存未确认 / Cloud save was not confirmed.');
this.setMeta(response.data,sent);
const dirty=!SRSyncCore.equal(SRSyncCore.normalize(this.read()),sent);
this.status({phase:dirty?'pending':'synced',updatedAt:response.data.updatedAt,conflicts:Object.keys(this.read().syncConflicts||{}).length});
if(dirty)this.again=true;return;
}
this.again=true;this.status({phase:'pending'});
}catch(e){this.status({phase:e.status===401?'login':typeof navigator!=='undefined'&&navigator.onLine===false?'offline':'error',message:e.message})}
finally{this.busy=false;if(this.again)this.pending()}
}
};
