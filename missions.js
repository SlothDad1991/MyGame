// ---------- MISSIONS ----------
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
// ---------- LEDGERS: story arcs with tasks; progress is banked on a clean extraction; the last task unlocks a skin that cannot be bought ----------
const LEDGERS=[
{id:'crusade',t:'The Last Crusade',skin:'knight',h:"Sir Aldric Vane led one hundred knights into the Hellbreach to seal it. Only his armor walked back out, empty, still marching. Finish the crusade he could not.",tasks:[
 {t:'kills',n:10,bo:150,h:'Clear the Gatehouse',s:"Aldric's banner still hangs in the gatehouse ash. The imps nest beneath it. Burn them out."},
 {t:'wkills',w:'melee',n:6,bo:250,h:'Steel Before Powder',s:"The crusade swore never to fire on the damned, only to cut them down. Honor the vow with melee attacks."},
 {t:'bdmg',n:300,bo:350,h:'Break the Archdemon',s:"A squire scratched a warning into a dented shield: the archdemon fears nothing but its own blood. Make it bleed."},
 {t:'ban',n:1,bo:600,h:'Lay the Knight to Rest',s:"Banish the archdemon's corpse and carry Aldric's banner out. The empty armor will finally stand down."}]},
{id:'draw',t:"Dead Man's Draw",skin:'gun',h:"Marshal Cole Haddan owed the Breach one last duel and lost it at high noon. His hat still hangs on a hitching post beside the sigils, waiting for a new owner.",tasks:[
 {t:'wkills',w:'pistol',n:6,bo:150,h:'Warm Up the Hand',s:"Cole never trusted a rifle. Six imps with the plain Pistol will show you how he thought."},
 {t:'esc',n:2,bo:250,h:'Ride Out Twice',s:"Haddan's rule: a gunslinger is only as good as his exits. Leave the Breach alive, twice."},
 {t:'bfin',n:1,bo:350,h:'The Killing Shot',s:"His last duel ended on a single bullet that missed. Land the killing blow on the archdemon yourself."},
 {t:'kills',n:20,bo:600,h:'High Noon',s:"Twenty imps, one long afternoon. Finish what the marshal started, and the hat is yours."}]},
{id:'choir',t:'The Bone Choir',skin:'bones',h:"Cantor Ossian sang the damned to sleep for forty years. When the Breach swallowed his choir he kept singing, long after his voice was gone. The song still needs a singer.",tasks:[
 {t:'kills',n:15,bo:150,h:'Quiet the Verses',s:"The first verse is a chorus of imps. Silence fifteen of them."},
 {t:'wkills',w:'bomb',n:5,bo:250,h:'Percussion',s:"Every hymn needs a drum. Kill five imps with blessed charges."},
 {t:'esc',n:3,bo:350,h:'Three Silent Exits',s:"The choir fell silent one by one. Leave the Breach alive three times, and be heard by none."},
 {t:'bfin',n:1,bo:600,h:'The Last Verse',s:"Land the killing blow on the archdemon. Ossian finally gets his rest, and you get his bones."}]},
{id:'bargain',t:"The Bog Witch's Bargain",skin:'witch',h:"Old Marrow brews cures from hellfire and wants a fresh supply. She pays in coin first, and in something worse later. The cauldron is always hungry.",tasks:[
 {t:'kills',n:12,bo:150,h:'Fresh Ingredients',s:"Marrow wants imp horns, twelve of them, still warm."},
 {t:'wkills',w:'crossbow',n:6,bo:250,h:'Silver for the Pot',s:"Silver bolts leave the meat clean. Six imps with the Silver Crossbow."},
 {t:'bdmg',n:350,bo:350,h:'A Pinch of Archdemon',s:"The recipe calls for a pinch of the archdemon itself. Take it with a few hundred damage."},
 {t:'esc',n:3,bo:600,h:'Never Tip the Witch',s:"Marrow does not tip, and does not wait. Bring your wares out alive, three times, and the hat and broth are yours."}]},
{id:'pack',t:'The Pack Under the Hill',skin:'wolf',h:"The Skarn wolf-clan hunted the Breach for a hundred winters. Now the pack is gone and only Ulf, the last stalker, still howls from the hill. Answer him.",tasks:[
 {t:'esc',n:2,bo:150,h:'Run With the Wind',s:"A wolf survives by knowing when to leave. Escape the Breach alive twice."},
 {t:'kills',n:14,bo:250,h:'Thin the Herd',s:"Imps follow the scent of the dead. Cull fourteen of them before they track the clan's cubs."},
 {t:'bdmg',w:'melee',n:150,bo:350,h:'Tooth and Claw',s:"The Skarn never killed from afar. Deal damage to the archdemon with melee attacks."},
 {t:'ban',n:1,bo:600,h:'Avenge the Pack',s:"Banish the archdemon's corpse and carry its pelt home. Ulf will lay down the howl."}]}];
LEDGERS.forEach(L=>{FAMS[L.skin].led=1;SKINS[L.skin].led=1});
// secret EPIC skin: not buyable, not in any ledger; its unlock rule is deliberately hidden from the UI
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
const say=(s,t)=>{msg=s;msgT=t||3};
let bossOpen=0,seals=[];
function sealBoss(bb){seals=[];(bb.dr||[]).forEach(d=>{const o=d.wg?bb.wg:bb,hz=d.q<2,x=hz?o.x+d.of:d.q?o.x+o.w-6:o.x,y=hz?(d.q?o.y+o.h-6:o.y):o.y+d.of,w=hz?d.ln:6,h=hz?6:d.ln,z={x,y,w,h,t:1,k:-1,seal:1};walls.push(z);seals.push(z)})}
function bossUnseal(local,who){if(bossOpen)return;bossOpen=1;walls=walls.filter(w=>!w.seal);try{sfx.sigil(3)}catch(e){}
 if(local){banner('THE BREACH DOOR OPENS','All 3 sigils are burned - '+BOSS[boss].n+"'s lair is unsealed for every hunter.",'#ff6a3a');if(mp.on)mpSend({t:'unseal'})}
 else banner('THE BREACH DOOR OPENS',hn(who)+' burned all 3 sigils - '+BOSS[boss].n+"'s lair is unsealed. Check your map [M].",'#ff6a3a')}
function drawSeals(cx,cy){if(bossOpen)return;const p=.5+.5*Math.sin(performance.now()/1000*4);seals.forEach(z=>{const x=z.x-cx-2,y=z.y-cy-2,w=z.w+4,h=z.h+4;if(x>VW||y>VH||x+w<0||y+h<0)return;
 ctx.save();ctx.shadowColor='rgba(255,40,30,.9)';ctx.shadowBlur=8+6*p;ctx.fillStyle='rgba(110,8,16,'+(.55+.25*p)+')';ctx.fillRect(x,y,w,h);ctx.shadowBlur=0;
 ctx.strokeStyle='rgba(255,120,90,'+(.55+.4*p)+')';ctx.lineWidth=1;ctx.strokeRect(x+.5,y+.5,w-1,h-1);ctx.beginPath();
 if(w>h){for(let i=x+4;i<x+w;i+=6){ctx.moveTo(i,y);ctx.lineTo(i,y+h)}}else{for(let i=y+4;i<y+h;i+=6){ctx.moveTo(x,i);ctx.lineTo(x+w,i)}}ctx.stroke();
 const mx=x+w/2,my=y+h/2;ctx.strokeStyle='rgba(255,200,150,'+(.6+.4*p)+')';ctx.beginPath();ctx.arc(mx,my,4,0,7);ctx.moveTo(mx-6,my);ctx.lineTo(mx+6,my);ctx.moveTo(mx,my-6);ctx.lineTo(mx,my+6);ctx.stroke();ctx.restore()})}
function banner(a,b,c){const n=performance.now();bn={a,b,c:c||'#ff6a3a',s:n,u:n+7000}}
function drawBanner(){if(!bn)return;const n=performance.now(),k=bn.u-n;if(k<=0){bn=null;return}const al=Math.min(1,k/600,(n-bn.s)/200);ctx.save();ctx.globalAlpha=al;ctx.fillStyle='rgba(8,2,4,.82)';ctx.fillRect(0,62,VW,42);ctx.fillStyle=bn.c;ctx.fillRect(0,62,VW,1);ctx.fillRect(0,103,VW,1);ctx.textBaseline='alphabetic';ctx.font='bold 16px monospace';tx(bn.a,VW/2,81,bn.c,'center');ctx.font='bold 10px monospace';tx(bn.b,VW/2,96,'#e8e6d8','center');ctx.restore()}
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
