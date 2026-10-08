let bank=500,sel={skin:'plain',pri:'repeater',side:'pistol',tools:[{k:'tonic',n:2},null],bag:[]},boss='gorrath',mode='menu',walls=[],blds=[],trees=[],M=[],bul=[],eb=[],bombs=[],parts=[],clues=[],items=[],exts=[],P,cam={x:0,y:0},ground,blood,bx,keys={},mouse={x:320,y:180,l:0,r:0},msg='',msgT=0,shake=0,T=0,last=0,found=0,banished=0,corpse=null,bty=null,bn=null,mpHB=null,mpKB=null;
const st=w=>w?`$${w.c} \u00b7 Dmg ${w.d} \u00b7 Rng ${w.r}s`:'';
const pit=q=>q.t=='f'?FAMS[q.k]:q.t=='w'?(SID[q.k]||PRI[q.k]||TOOL[q.k]):SKINS[q.k];
let pname='';const cleanName=v=>String(v==null?'':v).replace(/[^\w .'\-]/g,'').replace(/\s+/g,' ').trim().slice(0,14);
let LS={},AL=null,shopScr='shop',traps=[],own=['hunter','plain'],curFam='hunter',note='',pend=null,stash=[],invOpen=0;
const ISZ={rifle:[4,2],shotgun:[4,2],repeater:[3,2],crossbow:[3,2],pistol:[2,2],revolver:[2,2],tonic:[1,1],bomb:[2,1],pepperbox:[3,2],musket:[4,2],flamer:[3,2],handcannon:[2,2],whisper:[2,2],flask:[1,1],flare:[1,1],ward:[1,1],tripwire:[1,1]},SC=20,SR=8,MAXST=3,isz=k=>ISZ[k]||[1,1];
const fitsIn=(arr,C,R_,x,y,w,h,ex)=>x>=0&&y>=0&&x+w<=C&&y+h<=R_&&!arr.some(o=>{if(o===ex)return 0;const z=isz(o.k);return x<o.x+z[0]&&x+w>o.x&&y<o.y+z[1]&&y+h>o.y});
const spotIn=(arr,C,R_,k,ex)=>{const[w,h]=isz(k);for(let y=0;y<=R_-h;y++)for(let x=0;x<=C-w;x++)if(fitsIn(arr,C,R_,x,y,w,h,ex))return[x,y];return null};
const addTo=(arr,C,R_,k,n)=>{if(TOOL[k]){const t=arr.find(o=>o.k==k&&o.n<MAXST);if(t){t.n=Math.min(MAXST,t.n+(n||1));return 1}}const f=spotIn(arr,C,R_,k);if(!f)return 0;arr.push({k,x:f[0],y:f[1],n:n||(TOOL[k]?1:0)});return 1};
const fits=(x,y,w,h,ex)=>fitsIn(stash,SC,SR,x,y,w,h,ex),freeSpot=k=>spotIn(stash,SC,SR,k),addItem=(k,n)=>addTo(stash,SC,SR,k,n);
const accepts=(id,k)=>id=='p'?!!(PRI[k]&&k!='none'):id=='s'?!!(SID[k]&&k!='none'):!!TOOL[k];
const slotGet=id=>id=='p'?(sel.pri!='none'?{k:sel.pri}:null):id=='s'?(sel.side!='none'?{k:sel.side}:null):sel.tools[+id[1]]||null;
const slotSet=(id,it)=>{if(id=='p')sel.pri=it?it.k:'none';else if(id=='s')sel.side=it?it.k:'none';else sel.tools[+id[1]]=it?{k:it.k,n:it.n||1}:null};
const dsc=k=>TOOL[k]?TOOL[k].d:st(SID[k]||PRI[k]);
const SPX={rifle:[21,6.5,6],shotgun:[20,5,6],repeater:[19,5.5,7],crossbow:[19,5.5,17],pistol:[10,3,6],revolver:[17,6,7],tonic:[9,4.5,5],bomb:[12,6,5],pepperbox:[15,6,7],musket:[24,7,6],flamer:[21,6.5,7],handcannon:[16,5.5,7],whisper:[15,6,6],flask:[11,5.5,5],flare:[13,6,4],ward:[10,4,8]};
function itemCv(k,W,H){const c=document.createElement('canvas');c.width=W;c.height=H;c.style.cssText='width:100%;height:100%;image-rendering:pixelated;pointer-events:none';const[l,cx,h]=SPX[k]||[10,5,5],sc=Math.min(W*.86/l,H*.8/h),o=ctx;ctx=c.getContext('2d');try{drawWpn(k,W/2-cx*sc,H/2-.5*sc,0,sc)}finally{ctx=o}return c}
const SAVE=run=>{try{localStorage.setItem('bh_save',JSON.stringify({nm:pname,bank,own,led:LS,al:AL,skin:sel.skin,stash,pri:sel.pri,side:sel.side,bag:sel.bag,tools:sel.tools,run:run?1:0}))}catch(e){}};
try{const d=JSON.parse((localStorage.getItem('bh_save')||'null').replace(/"smg"/g,'"pepperbox"'));if(d&&Array.isArray(d.own)){own=[...new Set(['hunter','plain',...d.own.filter(k=>FAMS[k]||SKINS[k])])];bank=Math.max(120,d.bank|0);if(d.led)LS=d.led;AL=d.al||null;sel.skin=SKINS[d.skin]&&own.includes(d.skin)?d.skin:'plain';pname=cleanName(d.nm);
const ok=k=>k&&k!='none'&&(PRI[k]||SID[k]);stash=[];(d.stash||[]).forEach(o=>{const k=typeof o=='string'?o:o&&o.k;if(!(ok(k)||TOOL[k]))return;const z=isz(k);if(typeof o=='object'&&Number.isInteger(o.x)&&Number.isInteger(o.y)&&fits(o.x,o.y,z[0],z[1]))stash.push({k,x:o.x,y:o.y,n:o.n||(TOOL[k]?2:0)});else addItem(k,o&&o.n)});
if(d.run){sel.pri='none';sel.side='none';sel.bag=[];sel.tools=[null,null]}else{if(PRI[d.pri])sel.pri=d.pri;if(SID[d.side])sel.side=d.side;sel.bag=[];(Array.isArray(d.bag)?d.bag:d.bag?[d.bag]:[]).forEach(o=>{const k=typeof o=='string'?o:o&&o.k;if(!(ok(k)||TOOL[k]))return;const z=isz(k);if(typeof o=='object'&&Number.isInteger(o.x)&&Number.isInteger(o.y)&&fitsIn(sel.bag,4,4,o.x,o.y,z[0],z[1]))sel.bag.push({k,x:o.x,y:o.y,n:o.n||(TOOL[k]?1:0)});else addTo(sel.bag,4,4,k,o&&o.n)});if(Array.isArray(d.tools))sel.tools=[0,1].map(i=>{const t=d.tools[i];if(!t)return null;const k=typeof t=='string'?t:t.k;return TOOL[k]?{k,n:t.n||2}:null})}}}catch(e){}

const WKEYS=['rifle','shotgun','repeater','crossbow','pistol','revolver','pepperbox','musket','flamer','handcannon','whisper','melee','bomb'];
const wph=k=>k=='melee'?'melee attacks':k=='bomb'?'blessed charges':'the '+(PRI[k]||SID[k]).n;
const mtxt=m=>m.t=='kills'?`Kill ${m.n} imps`:m.t=='wkills'?`Kill ${m.n} imps with ${wph(m.w)}`:m.t=='bdmg'?`Deal ${m.n} damage to the demon with ${wph(m.w)}`:`Land the killing blow on the demon with ${wph(m.w)}`;
const MT={kills:'Purge the Horde',wkills:'Trick Shots',bdmg:'Wound the Demon',bfin:'Final Blow'};
let offers=[],mi=0,mis={t:'boss',n:0,p:0,done:0,bo:0};
function genMissions(){const ty=['kills','wkills','bdmg','bfin'].sort(()=>Math.random()-.5).slice(0,3);mi=0;
offers=ty.map(t=>{const w=WKEYS[R(0,WKEYS.length)|0],lo=w=='melee'||w=='bomb';
if(t=='kills'){const n=R(8,15)|0;return{t,n,bo:200+n*20}}
if(t=='wkills'){const n=(lo?R(4,7):R(6,11))|0;return{t,w,n,bo:180+n*30}}
if(t=='bdmg'){const n=Math.round((lo?R(150,260):R(220,360))/10)*10;return{t,w,n,bo:150+Math.round(n*.8)}}
return{t,w,n:0,bo:250}})}
genMissions();

function prog(m,dd,src,dead){if(mis.done||mis.fail)return;
if(m.boss){if(mis.t=='bdmg'&&(!mis.w||src==mis.w))mis.p=Math.min(mis.n,mis.p+dd);if(mis.t=='bfin'&&dead){if(!mis.w||src==mis.w)done();else mis.fail=1}}
else if(dead&&(mis.t=='kills'||(mis.t=='wkills'&&src==mis.w)))mis.p++;
if(['kills','wkills','bdmg'].includes(mis.t)&&mis.b+mis.p>=mis.n)done()}
function done(){if(mis.done)return;mis.done=1;say('Ledger task complete! Extract alive to claim it.',5)}
const hudm=()=>{const g=mis.b+mis.p,w=mis.w?wph(mis.w).replace('the ',''):'';return mis.t=='kills'?`Imps ${g}/${mis.n}`:mis.t=='wkills'?`Imps (${w}) ${g}/${mis.n}`:mis.t=='bdmg'?`Demon dmg${w?' ('+w+')':''} ${g}/${mis.n}`:mis.t=='bfin'?`Finish the demon${w?': '+w:''}`:mis.t=='esc'?`Extract alive ${mis.b}/${mis.n}`:'Banish the demon, then extract'};
LEDGERS.forEach(L=>{FAMS[L.skin].led=1;SKINS[L.skin].led=1});
FAMS.reaper={n:'The Reaper',d:SKINS.reaper.d,c:0,def:'reaper',led:1,mys:1,ep:1};
const EPT=' <b style="color:#c070ff;text-shadow:0 0 6px #8a30ff">[EPIC]</b>';
const lst=id=>LS[id]||(LS[id]={i:0,p:0});
function curL(){let L=LEDGERS.find(l=>l.id==AL);if(!L||lst(L.id).i>=L.tasks.length){L=LEDGERS.find(l=>lst(l.id).i<l.tasks.length);AL=L?L.id:null}return L||null}
const ledSub=()=>{const L=curL();return L?L.t+' \u2014 task '+(lst(L.id).i+1)+'/'+L.tasks.length:'All Ledgers complete'},ledFoot=()=>{const L=curL();return L?L.t:'all complete'};
const tText=T=>T.t=='kills'?`Kill ${T.n} imps`:T.t=='wkills'?`Kill ${T.n} imps with ${wph(T.w)}`:T.t=='bdmg'?`Deal ${T.n} damage to the archdemon${T.w?' with '+wph(T.w):''}`:T.t=='bfin'?`Land the killing blow on the archdemon${T.w?' with '+wph(T.w):''}`:T.t=='esc'?`Escape the breach alive${T.n>1?' '+T.n+' times':''}`:'Banish the archdemon\'s corpse, then reach an exit';
function ledgerTask(){const L=curL();if(!L)return{t:'none',n:0,p:0,b:0,done:0,fail:0,bo:0};const s=lst(L.id);return Object.assign({},L.tasks[s.i],{p:0,b:s.p,done:0,fail:0})}
function ledgerCommit(){const L=curL();if(!L||mis.t=='none')return'';const s=lst(L.id),T=L.tasks[s.i];if(!T||mis.t!=T.t)return'';let ok=0;
if(T.t=='esc'){s.p++;ok=s.p>=T.n}else if(T.t=='ban')ok=!!banished;else if(T.t=='bfin')ok=!!mis.done;else{s.p+=mis.p;ok=s.p>=T.n}
if(!ok)return'';bank+=T.bo;let m='Ledger task complete: '+T.h+' (+$'+T.bo+'). ';s.i++;s.p=0;
if(s.i>=L.tasks.length){own.push(L.skin);m+='LEDGER COMPLETE! You unlocked the '+SKINS[L.skin].n+' skin. '}return m}
const ledList=()=>LEDGERS.map((L,k)=>{const s=lst(L.id),dn=s.i>=L.tasks.length;return `<div class="paper ${mi==k?'on':''}" data-m=${k}>\u2620 ${L.t}<br><small>${dn?'Complete \u2014 skin unlocked':'Task '+(s.i+1)+' of '+L.tasks.length+(AL==L.id?' \u2014 ACTIVE':'')}</small><br>Reward: ${SKINS[L.skin].n} skin</div>`}).join('');
function ledStory(){const L=LEDGERS[mi]||LEDGERS[0],s=lst(L.id),k=L.tasks.length;
return `<div class=chalk>${L.t}<small>${L.h}</small></div><div class=chalk>How it works<small>Tap a Ledger to make it active. Progress is banked when you extract alive; dying loses that run's progress.</small></div>`+L.tasks.map((T,i)=>{const dn=i<s.i,cur=i==s.i,pr=cur&&['kills','wkills','bdmg','esc'].includes(T.t)?` (${s.p}/${T.n})`:'';
return `<div class="paper ${cur?'on':''}" style="cursor:default">${dn?'\u2714':cur?'\u25B6':'\u25CB'} ${dn||cur?T.h:'???'}${i==k-1?' \u2014 skin: '+SKINS[L.skin].n:''}<br><small>${dn||cur?tText(T)+pr+'<br>'+T.s:'Locked'}</small><br>Reward $${T.bo}${i==k-1?' + the skin':''}</div>`}).join('')}
let showMap=0,camp={x:60,y:WH-60};
const edgePt=()=>{const m=60,w=WW-2*m,h=WH-2*m;let t=R(0,2*(w+h));if(t<w)return{x:m+t,y:m};t-=w;if(t<h)return{x:WW-m,y:m+t};t-=h;if(t<w)return{x:WW-m-t,y:WH-m};t-=w;return{x:m,y:WH-m-t}};
const say=(s,t)=>{msg=s;msgT=t};
