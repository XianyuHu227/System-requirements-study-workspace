// Capability mapping follows Moonshot's official Chat Completions specification.
// Unknown Kimi generations are not advertised until their parameter contract is verified.
function kimiModel(m){
const id=m.id;if(!/^(kimi-k(?:3(?:\.1)?(?:-pro)?(?:-highspeed)?|2\.(?:5|6)|2\.7-code|2-thinking(?:-turbo)?)|moonshot-v1-(?:8k|32k|128k)(?:-vision-preview)?)$/.test(id))return null;
const k3=/^kimi-k3/.test(id),toggle=/^kimi-k2\.(5|6)$/.test(id),fixed=id.includes('thinking')||id==='kimi-k2.7-code',vision=/^kimi-k3/.test(id)||/^kimi-k2\.(5|6)$/.test(id)||/^kimi-k2\.7-code$/.test(id)||/vision/.test(id);
return {id:'kimi:'+id,apiModel:id,name:'Kimi · '+id,provider:'kimi',efforts:k3?['low','high','max']:toggle?['none','thinking']:fixed?['thinking']:['none'],defaultEffort:k3?'low':fixed?'thinking':'none',maxOutput:Number.isInteger(m.max_output_tokens)?m.max_output_tokens:32768,vision,effortNote:k3?'K3 支持真实推理强度 / K3 supports reasoning effort':toggle?'此模型支持思考开关，不支持分级强度 / Thinking on/off only':fixed?'此模型始终开启思考 / Thinking is always enabled':'此模型无思考强度设置 / No thinking-effort control'};
}
function kimiOptions(model,effort){
if(!model.efforts.includes(effort))throw new ApiError(400,'所选 Kimi 模型不支持该思考设置。','This Kimi model does not support that thinking setting.');
if(/^kimi-k3/.test(model.apiModel))return {reasoning_effort:effort,max_completion_tokens:Math.min(effort==='low'?12288:effort==='high'?24576:32768,model.maxOutput)};
if(model.efforts.includes('thinking'))return {thinking:{type:effort==='none'?'disabled':'enabled'},max_tokens:Math.min(effort==='none'?6144:24576,model.maxOutput)};
return {max_tokens:Math.min(6144,model.maxOutput)};
}
