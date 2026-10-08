// ---------- MULTIPLAYER: PeerJS matchmaking (lobby hosts claim fixed peer ids), star topology, victim-authoritative PvP ----------
// ---------- MULTIPLAYER: public MQTT-over-WebSocket relays (no WebRTC), leaderless lobby, room topic for the match ----------
const MQ=['wss://mqtt.eclipseprojects.io:443/mqtt','wss://broker.emqx.io:8084/mqtt','wss://broker.hivemq.com:8884/mqtt','wss://test.mosquitto.org:8081'];
const MPMAX=6,MPWAIT=60,mp={on:0,me:0,n:1,rp:{},ic:0,cl:[],room:null,subs:[],seen:{},sc:0,uc:0,onS:null,id:Math.random().toString(36).slice(2,10)};let mpb=[],mpBy=null,mpST=0,mpOv=null,mpTimer=null,mpBusy=0;
const mpMB=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
function mpPub(topic,o){const s=JSON.stringify(o);mp.cl.forEach(c=>c.connected&&c.publish(topic,s))}
function mpSend(o){if(!mp.on||!mp.room)return;if(P&&P.dead&&!P.dsending)return;o.f=mp.me;o.v=3;o.u=mp.id+(mp.uc++);mpPub('hb1/room/'+mp.room,o)}
function mpMsg(topic,buf){let o;try{o=JSON.parse(buf.toString())}catch(e){return}
 if(o.u){if(mp.seen[o.u])return;mp.seen[o.u]=1;if(++mp.sc>4000){const ks=Object.keys(mp.seen);for(let i=0;i<2000;i++)delete mp.seen[ks[i]];mp.sc=2000}}
 if(topic=='hb1/search'){if(mp.onS)mp.onS(o)}else if(mp.on&&o.f!==mp.me)mpRecv(o)}
function mpRecv(o){if(o.to!=null&&o.to!=mp.me)return;mpHandle(o)}
function mpConnect(){mp.cl=MQ.map(u=>{const c=mqtt.connect(u,{clientId:'hb_'+mp.id+'_'+(Math.random()*1e5|0),reconnectPeriod:3000,connectTimeout:8000,clean:true});c.on('connect',()=>c.subscribe(mp.subs));c.on('message',mpMsg);c.on('error',()=>{});return c})}
const hn=id=>{const r=mp.rp&&mp.rp[id];return(r&&r.nm)||'Hunter '+(+id+1)};
function mpHandle(o){const r=mp.rp,f=o.f,nm=hn(f);mp.ls[f]=Date.now();if(o.v!==3&&!mp.old[f]){mp.old[f]=1;say(nm+' is running an OLDER Hellbreach.html - everyone must reload the new file or monsters will not sync.',10)}
 if(o.t=='p'){const q=r[f]||(r[f]={x:o.x,y:o.y});Object.assign(q,{id:f,tx:o.x,ty:o.y,a:o.a,hp:o.hp,g:o.g,h:o.h,wk:o.wk,sk:o.sk,sa:o.sa,hf:o.hf,nm:cleanName(o.nm),ts:Date.now()});if(o.bt)btyTake(f)}
 else if(o.t=='unseal')bossUnseal(0,f);
 else if(o.t=='sh')o.b.forEach(b=>mpb.push({x:b[0],y:b[1],vx:b[2],vy:b[3],l:b[4],d:b[5],wk:b[6],by:f}));
 else if(o.t=='hit'){if(o.k=='mob'&&o.i!=null){const mm=M.find(q=>q.id===o.i);if(!mm||mm.hp<=0||D(mm.x,mm.y,P.x,P.y)>170)return}if(mode=='play'&&P.hp>0){mpBy=o.k=='mob'?null:f;shake=3;hurtP(o.d,o.k=='mob'?{m:M.find(q=>q.id===o.i),s:'melee'}:{p:f,s:o.k});mpBy=null}}
 else if(o.t=='bx'){burst(o.x,o.y,40,170,'#ff9a30',0);shake=Math.max(shake,5);if(mode=='play'&&P.hp>0&&D(P.x,P.y,o.x,o.y)<55){mpBy=f;hurtP(60);mpBy=null}}
 else if(o.t=='ms')mpGetSnap(o);
 else if(o.t=='mh'){if(!mpCli()){const m=M.find(q=>q.id===o.i);if(m&&m.hp>0){mpNP=1;mpHB=f;try{hurt(m,o.d,o.a,o.s)}finally{mpNP=0;mpHB=null}}}}
 else if(o.t=='ns'){if(!mpCli())noise(o.x,o.y,o.r)}
 else if(o.t=='dr')items.push(o.it);
 else if(o.t=='pk')items=items.filter(i=>!o.ids.includes(i.id));
 else if(o.t=='bn')btyTake(f);
 else if(o.t=='ff')fires.push({x:o.x,y:o.y,r:28,t:5.5,tk:99,s:Math.random()*6});
 else if(o.t=='fl')flares.push({x:o.x,y:o.y,t:14,tk:99,dec:1,id:-1,hp:1});
 else if(o.t=='dead'){const q0=r[f];if(q0)try{gore({x:q0.x,y:q0.y,ty:'imp'},null,70,o.by!=null&&o.ws?o.ws:'melee',palFor(q0.sk));pool(q0.x,q0.y,18,8);splat(q0.x,q0.y,50,26)}catch(e){}const dr=bty&&bty.h===f;if(dr)bty={h:null,x:q0?q0.x:bty.x,y:q0?q0.y:bty.y};delete r[f];mp.out[f]=1;say(nm+' was slain'+(o.by!=null?' by '+(o.by==mp.me?'you':hn(o.by)):'')+'!'+(dr?' The bounty has dropped!':''),dr?6:4)}
 else if(o.t=='left'){const hb=bty&&bty.h===f;if(hb)bty=null;delete r[f];mp.out[f]=1;say(nm+' escaped'+(hb?' with the bounty!':'.'),hb?6:3)}}
function mpStop(){mp.on=0;mp.room=null;mp.rp={};mp.onS=null;mpb=[];clearInterval(mpTimer);mp.cl.forEach(c=>{try{c.end(true)}catch(e){}});mp.cl=[]}
function mpOverlay(txt){if(!mpOv){mpOv=document.createElement('div');mpOv.style.cssText='position:fixed;inset:0;z-index:99;background:rgba(6,2,4,.93);color:#e8e6d8;font:22px Caveat,monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center';document.body.appendChild(mpOv)}mpOv.innerHTML='<div style="font-size:34px;color:#d06a5a">Entering the breach...</div><div>'+txt+'</div>'+(mp.cancel?'<button id="mpCancel" style="margin-top:10px;padding:8px 26px;font:22px Caveat,monospace;color:#e8e6d8;background:#3a1418;border:2px solid #d06a5a;border-radius:6px;cursor:pointer">Stop searching</button>':'');const cb=mpOv.querySelector('#mpCancel');if(cb)cb.onclick=()=>{if(mp.cancel)mp.cancel()}}
function mpSearch(go){if(mpBusy)return;mpBusy=1;mpStop();let done=0;const rs=()=>Math.random()*4294967296>>>0,t0=Date.now(),seen={};
 const fin=(n,idx,seed)=>{if(done)return;done=1;mpBusy=0;mp.cancel=null;clearInterval(mpTimer);clearTimeout(kill);if(mpOv){mpOv.remove();mpOv=null}if(n>1){mp.on=1;mp.me=idx;mp.n=n}else mpStop();go(seed,n)};
 const kill=setTimeout(()=>fin(1,0,rs()),90000);
 const show=(n,rem)=>mpOverlay('Searching for hunters... '+n+'/'+MPMAX+'<br><small>The descent begins in '+Math.max(0,Math.ceil(rem))+'s, or when six hunters are gathered.</small><br><small style="opacity:.5">relays connected: '+mp.cl.filter(c=>c.connected).length+'/'+MQ.length+'</small>');
 if(!window.mqtt){return fin(1,0,rs())}
 const begin=o=>{if(done)return;if(o.bk&&BOSS[o.bk])boss=o.bk;const idx=o.m.indexOf(mp.id);if(o.m.length>1){mp.room=o.room;mp.subs.push('hb1/room/'+o.room);mp.cl.forEach(c=>c.connected&&c.subscribe('hb1/room/'+o.room))}mp.me=idx;fin(o.m.length,idx,o.seed)};
 mp.cancel=()=>{if(done)return;done=1;mpBusy=0;mp.cancel=null;clearInterval(mpTimer);clearTimeout(kill);if(mpOv){mpOv.remove();mpOv=null}mpStop()};
 mp.subs=['hb1/search'];mpConnect();show(1,MPWAIT);
 mp.onS=o=>{if(done||o.id===mp.id)return;if(o.t=='start'){if(o.m.includes(mp.id))begin(o);else o.m.forEach(i=>delete seen[i]);return}const x=seen[o.id];seen[o.id]={st:x?x.st:Date.now()-o.age*1000,last:Date.now()}};
 mpTimer=setInterval(()=>{if(done)return;const now=Date.now();mpPub('hb1/search',{id:mp.id,age:(now-t0)/1000});for(const i in seen)if(now-seen[i].last>6000)delete seen[i];
  const all=[{id:mp.id,st:t0},...Object.entries(seen).map(([id,v])=>({id,st:v.st}))].sort((a,b)=>Math.abs(a.st-b.st)<1500?(a.id<b.id?-1:1):a.st-b.st),grp=all.slice(0,MPMAX),lead=grp[0],rem=MPWAIT-(now-lead.st)/1000;
  show(grp.length,rem);
  if(lead.id===mp.id&&(grp.length>=MPMAX||rem<=0)){const o={t:'start',m:grp.map(g=>g.id),room:rs().toString(36),seed:rs(),bk:boss};mpPub('hb1/search',o);begin(o)}},1000)}
function rpDraw(L,cx,cy){Object.entries(mp.rp).forEach(([id,r])=>{if(r.hp<=0)return;L.push([r.y,()=>{const o=sel.skin;sel.skin=SKINS[r.sk]?r.sk:'warden';try{warden(r.x-cx,r.y-cy,r.a,0,r.wk,r.g,r.hf>0,r.h,r.sa)}finally{sel.skin=o}tx(hn(id),r.x-cx,r.y-cy-14,'#d89090','center')}])})}
// ---------- SHARED MONSTERS ----------
// One hunter (mp.host) runs every monster and every monster attack. The others only mirror it:
// the host streams snapshots, and everyone else sends their damage / noise to the host.
// If the host dies, leaves or goes silent the next hunter takes over (mp.ep = takeover counter).
{const el=document.createElement('div');el.style.cssText='position:fixed;left:6px;bottom:6px;z-index:98;font:11px monospace;color:#9f9;background:#000a;padding:3px 6px;pointer-events:none;white-space:pre;display:none';document.body.appendChild(el);
 let on=1;addEventListener('keydown',e=>{if(e.code=='F3'){e.preventDefault();on=!on}});
 setInterval(()=>{if(!mp.on||mode!='play'||!on){el.style.display='none';return}el.style.display='block';const me=mp.host==mp.me,age=(Date.now()-mp.hs)/1000,bad=!me&&age>2,old=Object.keys(mp.old).length;
  el.style.color=bad||old?'#f66':'#9f9';el.textContent='MONSTER SYNC | you: '+(pname||'Hunter '+(mp.me+1))+' | monster host: '+(me?'YOU':hn(mp.host)+' (last update '+age.toFixed(1)+'s ago)')+' | monsters alive: '+M.filter(m=>m.hp>0).length+(old?' | OLDER VERSION IN LOBBY':'')+'  [F3 hides]'},300)}
const MKS=Object.keys(MOBS);let mpFx=0,mpNP=0;
const mpCli=()=>mp.on&&mp.host!=mp.me;
function mpTgt(m){if(!mp.on)return P;let pl=mp.pool||[P];if(m.boss){const i=pl.filter(q=>inHouse(m.bb,q.x,q.y,0));if(i.length)pl=i}
 let b=pl[0],bd=1e9;for(const q of pl){const d=D(m.x,m.y,q.x,q.y);if(d<bd){bd=d;b=q}}return b}
let MCUR=null;{const _t0=mpTgt;mpTgt=function(m){MCUR=m;return _t0(m)}}
function hurtTG(d){if(TG===P||!mp.on)hurtP(d,{m:MCUR,s:'melee'});else mpSend({t:'hit',to:TG.id,d,k:'mob',i:MCUR?MCUR.id:undefined})}
function mpHostCheck(){if(mp.host==mp.me)return;const now=Date.now();if(!mp.out[mp.host]&&now-mp.hs<3000)return;
 const alive=i=>i==mp.me||(!mp.out[i]&&now-(mp.ls[i]||mp.t0)<6000);let c=-1;for(let i=0;i<mp.n;i++)if(alive(i)){c=i;break}
 if(c==mp.me){mp.host=mp.me;mp.ep++;mp.hs=now}else if(c>=0){mp.host=c;mp.hs=now}}
function mpPre(dt){mpHostCheck();
 if(mpCli()){const k=Math.min(1,dt*12);for(const m of M){m.fl-=dt;if(m.hp<=0||m.gx===undefined)continue;const dx=m.gx-m.x,dy=m.gy-m.y;if(Math.abs(dx)+Math.abs(dy)>.4)m.wk+=dt*(m.ty=='skitter'?12:8);m.x+=dx*k;m.y+=dy*k}}
 else mp.pool=[P,...Object.values(mp.rp).filter(q=>q.hp>0)]}
function mpPost(dt){if(!mpCli()&&(mp.mt-=dt)<=0){mp.mt=.1;mpSendSnap()}}
function mpPause(dt){const k=keys,l=mouse.l,r=mouse.r;keys={};mouse.l=mouse.r=0;try{update(dt)}finally{keys=k;mouse.l=l;mouse.r=r}}
function mpSendSnap(){const full=(++mp.fc)%8==0,pl=[P,...Object.values(mp.rp)].filter(q=>q.hp>0),m=[],k=[];
 for(const x of M){if(x.id===undefined)x.id=++mp.mid;if(x.hp<=0){k.push(x.id);continue}
  if(!full&&!x.boss&&x.st!='chase'&&!pl.some(q=>D(q.x,q.y,x.x,x.y)<450))continue;
  const e=[x.id,+x.x.toFixed(1),+x.y.toFixed(1),Math.ceil(x.hp),+(x.a||0).toFixed(2),+(x.wk||0).toFixed(1),x.st=='chase'?1:0,x.fl>0?1:0,x.boss?-1:MKS.indexOf(x.ty||'imp')];
  if(x.boss)e.push([x.dash>0?1:0]);else if(x.ty=='vine')e.push([x.fi?1:0,+Math.max(0,(x.lw||0)-T).toFixed(2),+(x.la||0).toFixed(2),+Math.max(0,(x.lf||0)-T).toFixed(2)]);
  m.push(e)}
 mpSend({t:'ms',ep:mp.ep,q:++mp.sq,m,k,kb:(()=>{const b=M.find(x=>x.boss);return b&&b.hp<=0&&b.lh!=null?b.lh:undefined})(),e:eb.map(b=>[+b.x.toFixed(1),+b.y.toFixed(1),+b.vx.toFixed(0),+b.vy.toFixed(0),+b.l.toFixed(2)])})}
function mpGetSnap(o){const f=o.f;if(!(o.ep>mp.ep||(o.ep==mp.ep&&f<=mp.host)))return;if(o.ep==mp.ep&&f==mp.host&&o.q<=mp.sq)return;
 mp.ep=o.ep;mp.host=f;mp.sq=o.q;mp.hs=Date.now();if(o.kb!=null)mpKB=o.kb;
 const by=new Map(M.map(m=>[m.id,m]));
 for(const e of o.m){let m=by.get(e[0]);if(e[0]>mp.mid)mp.mid=e[0];
  if(!m){if(e[8]<0)continue;m=mkMob(e[1],e[2],'chase',MKS[e[8]]);m.id=e[0];M.push(m);by.set(m.id,m)}
  if(m.hp<=0)continue;
  if(m.gx===undefined||Math.hypot(e[1]-m.x,e[2]-m.y)>80){m.x=e[1];m.y=e[2]}
  m.gx=e[1];m.gy=e[2];m.hp=e[3];if(e[3]>.5)m._pd=0;m.a=e[4];m.st=e[6]?'chase':'idle';if(e[7])m.fl=.1;
  const x=e[9];if(x){if(m.boss)m.dash=x[0];else{m.fi=x[0];m.lw=T+x[1];m.la=x[2];if(x[3]>0){if(!(m.lf>T))m.lf=T+x[3]}else m.lf=0}}}
 for(const id of o.k){const m=by.get(id);if(m&&m.hp>0){mpFx=1;try{kill(m)}finally{mpFx=0}}}
 eb=o.e.map(b=>({x:b[0],y:b[1],vx:b[2],vy:b[3],l:b[4]}))}
// a non-host hunter hurting a monster: show it at once, let the host decide the result
function mpCHurt(m,d,a,s){if(m.hp<=0||m._pd)return;const dd=Math.min(d,m.hp),dead=m.hp-d<=0;prog(m,dd,s,dead);
 m.fl=.1;burst(m.x,m.y,6,70,'#8a0f18',1,a);m.st='chase';if(m.boss)m.al=2.5;try{sfx.hit(m,s)}catch(e){}
 if(dead){m.hp=.01;m._pd=1}else m.hp-=d;mpSend({t:'mh',i:m.id,d,a:a||0,s})}
{const _h=hurt;hurt=function(m,d,a,s){if(mpFx)return;if(mpCli()){mpCHurt(m,d,a,s);return}_h(m,d,a,s)}}
{const _hp=hurtP;hurtP=function(d,k){if(mpFx)return;_hp(d,k)}}
{const _pr=prog;prog=function(...x){if(mpNP)return;return _pr(...x)}}
{const _n=noise;noise=function(x,y,r){if(mpFx)return;if(mpCli()){const t=Date.now();if(r>=300||t-mp.nt>100){mp.nt=t;mpSend({t:'ns',x:+x.toFixed(0),y:+y.toFixed(0),r})}return}_n(x,y,r)}}
{const _b=boom;boom=function(m){_b(m);if(mp.on&&!mpCli()&&!mpFx)for(const q of Object.values(mp.rp))if(q.hp>0&&D(q.x,q.y,m.x,m.y)<42)mpSend({t:'hit',to:q.id,d:30,k:'mob'})}}

{const _sh=shoot;shoot=function(){const n0=bul.length;_sh();if(mp.on&&bul.length>n0)mpSend({t:'sh',b:bul.slice(n0).map(b=>[+b.x.toFixed(1),+b.y.toFixed(1),+b.vx.toFixed(1),+b.vy.toFixed(1),b.l,b.d,b.wk])})};
const _ml=melee;melee=function(){_ml();if(!mp.on)return;for(const[id,q]of Object.entries(mp.rp)){if(D(q.x,q.y,P.x,P.y)<30){let d=Math.abs(Math.atan2(q.y-P.y,q.x-P.x)-P.face);d=Math.min(d,6.28-d);if(d<1){mpSend({t:'hit',to:+id,d:30,k:'melee'});burst(q.x,q.y,6,70,'#8a0f18',1)}}}};
function mpDie(){const it=[],at=(t,o)=>it.push({t,x:P.x+R(-14,14),y:P.y+R(-14,14),...o});
  P.w.forEach((x,s)=>x&&at('wpn',{s,k:x.k}));P.bag.forEach(o=>{if(TOOL[o.k]){for(let i=0;i<(o.n||1);i++)at(o.k=='tonic'||o.k=='bomb'?o.k:'tool',{k:o.k})}else at('wpn',{s:SID[o.k]?1:0,k:o.k})});
  for(let i=0;i<P.tn;i++)at('tonic');for(let i=0;i<P.bm;i++)at('bomb');XT.forEach(k=>{for(let i=0;i<(P.xt[k]||0);i++)at('tool',{k})});if(P.res.some(n=>n>0)){at('ammo');at('ammo')}if(P.carry>0)at('cash',{v:P.carry});
  it.forEach(i=>{i.id='d'+mp.me+'_'+mp.ic++;mpSend({t:'dr',it:i})});mpSend({t:'dead',by:mpBy})}
const _e3=end;end=function(w){if(mp.on){if(w)mpSend({t:'left'});else if(!P.dsent)mpDie();setTimeout(mpStop,500)}return _e3(w)};
const _u3=update;update=function(dt){if(!mp.on)return _u3(dt);
 const ids=items.map(i=>i.id),bz=bombs.map(b=>({x:b.x,y:b.y,t:b.t}));
 for(const[id,q]of Object.entries(mp.rp)){if(Date.now()-q.ts>5000){const nn=hn(id);delete mp.rp[id];say(nn+' fled the breach.',3);if(bty&&bty.h===+id)bty=null;continue}const k=Math.min(1,dt*14);q.x+=(q.tx-q.x)*k;q.y+=(q.ty-q.y)*k}
 mpPre(dt);_u3(dt);if(mode!='play'||!mp.on)return;mpPost(dt);
 for(const b of mpb){const n=Math.ceil(Math.hypot(b.vx,b.vy)*dt/4);b.l-=dt;for(let i=0;i<n&&b.l>0;i++){b.x+=b.vx*dt/n;b.y+=b.vy*dt/n;if(hit(b.x,b.y,.5)){b.l=0;burst(b.x,b.y,4,50,'#aaa',0);break}if(P.hp>0&&D(b.x,b.y,P.x,P.y)<6){b.l=0;mpBy=b.by;hurtP(b.d,{p:b.by,s:b.wk});mpBy=null;break}}}mpb=mpb.filter(b=>b.l>0);
 for(const b of bul)for(const q of Object.values(mp.rp))if(b.l>0&&D(b.x,b.y,q.x,q.y)<6){b.l=0;burst(q.x,q.y,6,70,'#8a0f18',1)}
 bz.forEach(b=>{if(b.t-dt<=0)mpSend({t:'bx',x:b.x,y:b.y})});
 items.filter(i=>!i.id).forEach(i=>{i.id='d'+mp.me+'_'+mp.ic++;mpSend({t:'dr',it:{...i}})});
 const have=new Set(items.map(i=>i.id)),gone=ids.filter(id=>id&&!have.has(id));if(gone.length)mpSend({t:'pk',ids:gone});
 if((mpST-=dt)<=0){mpST=.1;mpSend({t:'p',x:+P.x.toFixed(1),y:+P.y.toFixed(1),a:+P.face.toFixed(2),hp:P.hp,g:P.cur<2?(P.w[P.cur]?P.w[P.cur].k:'fists'):P.cur==2?'tonic':P.cur==3?'bomb':XT[P.cur-4],h:P.cur!=1&&P.w[1]?P.w[1].k:null,wk:P.wk,sk:sel.skin,nm:pname,sa:P.sa>0?P.sa/.18:0,hf:P.hf,bt:bty&&bty.h===mp.me?1:0})}};
const _real=newGame;newGame=function(){mpSearch((seed,n)=>{const o=Math.random;Math.random=mpMB(seed);try{_real()}finally{Math.random=o}
 if(n>1){M.forEach((m,i)=>m.id=i);Object.assign(mp,{host:0,ep:0,sq:0,mid:1000,mt:0,fc:0,nt:0,t0:Date.now(),hs:Date.now()+3000,ls:{},out:{},old:{},pool:null});items.forEach((it,i)=>it.id='i'+i);mp.rp={};mpb=[];const rg=mpMB(seed^0x9e3779b9),ed=()=>{const m=60,w=WW-2*m,h=WH-2*m;let t=rg()*2*(w+h);if(t<w)return{x:m+t,y:m};t-=w;if(t<h)return{x:WW-m,y:m+t};t-=h;if(t<w)return{x:WW-m-t,y:WH-m};t-=w;return{x:m,y:WH-m-t}},pts=[{x:camp.x,y:camp.y}];
 while(pts.length<n){let best=null,bs=-1;for(let i=0;i<150;i++){const c=ed();if(exts.some(e=>D(c.x,c.y,e.x,e.y)<200))continue;const d=Math.min(...pts.map(q=>D(c.x,c.y,q.x,q.y)));if(d>bs){bs=d;best=c}}if(!best)break;pts.push(best)}
 const sp=pts[mp.me]||pts[0];P.x=sp.x;P.y=sp.y;camp={x:sp.x,y:sp.y};M=M.filter(m=>m.boss||pts.every(q=>D(m.x,m.y,q.x,q.y)>200));say('Hunters in the breach: '+n+'. Everyone is prey.',6)}})}}
