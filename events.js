// ---------- RANDOM EVENTS (first one: the Blood Moon) ----------
// ?event=bloodmoon starts it 3s into a run. Otherwise it strikes once at a random (but lobby-synced) moment.
const inBl=(x,y,m)=>blds.some(b=>{const e=bExt(b);return x>e.x-m&&x<e.x+e.w+m&&y>e.y-m&&y<e.y+e.h+m});
// events must never land inside a building or near its doors: extra-wide margin around every building (wings included)
const EVM=44,noEv=(x,y,m)=>inBl(x,y,Math.max(m||0,EVM));
const SAFEZ=95;let EVN=null;
const bmf=()=>EVN?sg(EVN.t,0,2.5)*(1-sg(EVN.t,EVN.dur-2.5,EVN.dur)):0,bmv=m=>lp(1,m,bmf()),inSafe=o=>exts.some(e=>!e.sealed&&D(o.x,o.y,e.x,e.y)<SAFEZ);
function evSpawn(n){let c=0,al=M.filter(m=>m.hp>0&&!m.boss).length;for(let i=0;i<n*14&&c<n&&al<80;i++){const a=R(0,6.28),r=R(230,560),x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;
 if(x<40||y<40||x>WW-40||y>WH-40||hit(x,y,6)||noEv(x,y,10)||exts.some(e=>D(x,y,e.x,e.y)<170))continue;const m=mkMob(x,y,'chase');m.bm=1;M.push(m);burst(x,y,6,60,'#ff2a1a',0);c++;al++}}
function evTick(dt){const el=RT0-P.tm;
 if(!EVN&&P.evp.length&&el>=P.evp[0][1]){const id=P.evp.shift()[0],al=M.filter(m=>m.hp>0&&!m.boss).length;EVN={P,id,t:0,dur:60,rt:.6,tg:al*2};shake=Math.max(shake,8);
  if(!mpCli())evSpawn(Math.min(al,80-al));banner('THE BLOOD MOON RISES','Every monster sprints and the hordes double. Only the extraction rings are safe.','#d02030');try{sfx.sigil(3)}catch(e){}}
 if(!EVN)return;EVN.t+=dt;
 if(!mpCli()){EVN.rt-=dt;if(EVN.rt<=0){EVN.rt=.6;if(M.filter(m=>m.hp>0&&!m.boss).length<EVN.tg)evSpawn(2)}
  for(const m of M)if(m.hp>0&&!m.boss&&m.st=='idle'&&D(m.x,m.y,P.x,P.y)<230){m.st='chase';m.lt=0}}
 if(EVN.t>=EVN.dur){EVN=null;say('The blood moon sets.',4)}}
function bmDraw(){const a=bmf();if(a<=.01)return;ctx.save();
 ctx.globalCompositeOperation='multiply';ctx.fillStyle='rgb(255,'+((255-150*a)|0)+','+((255-165*a)|0)+')';ctx.fillRect(0,0,VW,VH);
 ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(140,0,12,'+(.2*a).toFixed(3)+')';ctx.fillRect(0,0,VW,VH);
 const g=ctx.createRadialGradient(VW/2,VH/2,90,VW/2,VH/2,400);g.addColorStop(0,'rgba(90,0,8,0)');g.addColorStop(1,'rgba(90,0,8,'+((.55+.12*Math.sin(T*4))*a).toFixed(3)+')');ctx.fillStyle=g;ctx.fillRect(0,0,VW,VH);
 ctx.font='bold 9px monospace';
 for(const e of exts){if(e.sealed)continue;const x=e.x-cam.x,y=e.y-cam.y;if(x<-SAFEZ||x>VW+SAFEZ||y<-SAFEZ||y>VH+SAFEZ)continue;ctx.fillStyle='rgba(80,255,140,'+(.08*a).toFixed(3)+')';ctx.beginPath();ctx.arc(x,y,SAFEZ,0,7);ctx.fill();
  ctx.strokeStyle='rgba(120,255,160,'+(.6*a).toFixed(3)+')';ctx.lineWidth=1.5;ctx.setLineDash([6,5]);ctx.lineDashOffset=-T*8;ctx.beginPath();ctx.arc(x,y,SAFEZ,0,7);ctx.stroke();ctx.setLineDash([]);tx('SAFE ZONE',x,y-SAFEZ-4,'#8fe0a0','center')}
 if(!P.dead){let b=null,bd=1e9;for(const e of exts){if(e.sealed)continue;const d=D(P.x,P.y,e.x,e.y);if(d<bd){bd=d;b=e}}
  if(b&&bd>SAFEZ){const an=Math.atan2(b.y-P.y,b.x-P.x),px=P.x-cam.x,py=P.y-cam.y,ax=px+Math.cos(an)*46,ay=py+Math.sin(an)*46;ctx.fillStyle='rgba(143,224,160,'+(.9*a).toFixed(3)+')';ctx.beginPath();ctx.moveTo(ax+Math.cos(an)*7,ay+Math.sin(an)*7);ctx.lineTo(ax+Math.cos(an+2.5)*6,ay+Math.sin(an+2.5)*6);ctx.lineTo(ax+Math.cos(an-2.5)*6,ay+Math.sin(an-2.5)*6);ctx.closePath();ctx.fill();tx(Math.round(bd/10)+'m',ax+Math.cos(an)*18,ay+Math.sin(an)*18+3,'#8fe0a0','center')}}
 ctx.font='bold 10px monospace';ctx.restore()}
// blood moon rules: monsters sprint, are repelled by extraction rings, and cannot hurt anyone standing in one
{const _mv=mv;mv=function(e,a,b,r){if(EVN&&e!==P&&e.mh){a*=1.9;b*=1.9;
  for(const x of exts){if(x.sealed)continue;const d0=D(e.x,e.y,x.x,x.y),d1=D(e.x+a,e.y+b,x.x,x.y);if(d0<SAFEZ){const an=Math.atan2(e.y-x.y,e.x-x.x),s=Math.hypot(a,b)+1.2;a=Math.cos(an)*s;b=Math.sin(an)*s;break}else if(d1<SAFEZ&&d1<d0){a=b=0;break}}}
 return _mv(e,a,b,r)}}
{const _hp2=hurtP;hurtP=function(d,k){if(EVN&&k&&k.p==null&&k.s!='bomb'&&k.s!='tripwire'&&inSafe(P))return;_hp2(d,k)}}
// ---- hooks ----
{const _hp=hurtP;hurtP=function(d,k){if(RD&&RD.P===P)return;_hp(d,k)}}
addEventListener('keydown',e=>{if(RD&&mode=='play'&&(e.code=='KeyM'||e.code=='KeyI'||e.code=='Tab')){showMap=0;invOpen=0}});
{const _ur=update;update=function(dt){
 if(mode!='play')return _ur(dt);
 if(RD&&RD.P!==P)RD=null;
 if(P.tm===undefined){P.tm=RT0;banner('THE REAPER IS COMING','You have '+(RT0>=60?Math.floor(RT0/60)+' min'+(RT0%60?' '+RT0%60+' sec':''):RT0+' sec')+'. Extract before the timer runs out.','#c01824')}
 if(!P.dead&&!RD&&P.tm>0){const s0=Math.ceil(P.tm);P.tm=Math.max(0,P.tm-dt);if(P.tm<=10&&Math.ceil(P.tm)<s0)try{sfx.beat()}catch(e){}if(P.tm<=0)rdStart()}
 if(EVN&&EVN.P!==P)EVN=null;
 if(!P.evp)P.evp=[['bloodmoon',/^(tithe|collapse|rain|fog)$/.test(RQ.get('event')||'')?1e9:RQ.get('event')?3:lp(90,Math.max(120,RT0-180),hs(blds[0]?blds[0].x*.37+blds[0].y:1))]];
 if(!P.dead)evTick(dt);
 let fr=0;
 if(RD){const Q=RD;Q.t+=dt;if(Q.t>TB+RDUR[Q.k]+OUTD){Q.fm.hp=0;RD=null}else{const O=rdPose(Q);Q.O=O;rdEv(Q,O);if(Q.gone)O.vis=0;if(Q.t<TB)shake=Math.max(shake,1+5*sg(Q.t,0,TA));fr=!P.dead;if(fr)P.ep=0}}
 const k=keys,l=mouse.l,r=mouse.r;if(fr){keys={};mouse.l=mouse.r=0}
 try{return _ur(dt)}finally{if(fr){keys=k;mouse.l=l;mouse.r=r}}}}

// ---------- THE TITHE: the Breach demands payment ----------
// A bell tolls and a ward ring is chalked into the ground nearby. Hold it for 10s before the window closes,
// or pay: drop one random item, or lose half your carried bounty. ?event=tithe tolls it 4s into a run.
const TT_HOLD=10,TT_WIN=32,TT_R=30;let TTH=null,ttAC=null;
function ttBell(v,f){try{if(!ttAC){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ttAC=new AC()}if(ttAC.state!='running')ttAC.resume();
 const t=ttAC.currentTime,g0=ttAC.createGain();g0.gain.value=v;g0.connect(ttAC.destination);
 [1,2.76,5.4,8.93].forEach((m,i)=>{const s=ttAC.createOscillator(),g=ttAC.createGain();s.type='sine';s.frequency.value=f*m;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5/(i+1),t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+2.6/(1+i*.6));s.connect(g);g.connect(g0);s.start(t);s.stop(t+2.7)})}catch(e){}}
function ttSpot(){for(let i=0;i<80;i++){const a=R(0,6.283),r=R(140,280),x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;
 if(x<TT_R+20||y<TT_R+20||x>WW-TT_R-20||y>WH-TT_R-20||hit(x,y,TT_R)||noEv(x,y,TT_R+8)||(i<60&&!los(P.x,P.y,x,y)))continue;
 let ok=1;for(let k=0;k<8;k++)if(hit(x+Math.cos(k*.785)*TT_R,y+Math.sin(k*.785)*TT_R,3)){ok=0;break}
 if(ok)return{x,y}}return null}
const ttName=k=>(PRI[k]||SID[k]||TOOL[k]||{}).n||k,ttGround=k=>PRI[k]||SID[k]?{t:'wpn',s:SID[k]?1:0,k}:k=='tonic'?{t:'tonic'}:k=='bomb'?{t:'bomb'}:{t:'tool',k};
function ttToss(it){for(let i=0;i<30;i++){const a=R(0,6.283),r=R(34,85),x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;
 if(x<20||y<20||x>WW-20||y>WH-20||hit(x,y,6)||(i<20&&!los(P.x,P.y,x,y)))continue;it.x=x;it.y=y;items.push(it);burst(x,y,8,60,'#d8c890',0);return}
 it.x=P.x+30;it.y=P.y;items.push(it)}
function ttPay(){const c=[];for(let s=0;s<2;s++)if(P.w[s])c.push({t:'w',s,n:P.w[s].n});
 for(const k of TKS)if(TC(k)>0)c.push({t:'t',k,n:ttName(k)});P.bag.forEach(o=>c.push({t:'b',o,n:ttName(o.k)}));
 const cash=P.carry>0,pick=cash&&c.length?(Math.random()<.5?'cash':'item'):cash?'cash':c.length?'item':'none';shake=Math.max(shake,10);
 if(pick=='cash'){const l=Math.max(1,Math.floor(P.carry/2));P.carry-=l;burst(P.x,P.y,26,120,'#e0b040',0);banner('THE BREACH TAKES ITS TITHE','Half your bounty is gone: -$'+l+'.','#e0b040')}
 else if(pick=='item'){const o=c[R(0,c.length)|0];let k;
  if(o.t=='w'){k=P.w[o.s].k;P.w[o.s]=null;P.mag[o.s]=0;P.res[o.s]=0}
  else if(o.t=='t'){k=o.k;TS(k,TC(k)-1)}
  else{k=o.o.k;if(o.o.n>1)o.o.n--;else P.bag.splice(P.bag.indexOf(o.o),1)}
  P.rl=0;ttToss(ttGround(k));fixSlot();burst(P.x,P.y,16,90,'#a01018',1);banner('THE BREACH TAKES ITS TITHE','You dropped: '+o.n+'. It lies nearby, if you dare.','#d02030')}
 else banner('THE BREACH FINDS NOTHING','You carry nothing it wants. This time.','#a09080')}
function ttTick(dt){if(!P||P.dead||RD){TTH=null;return}if(TTH&&TTH.P!==P)TTH=null;
 P.tt=(P.tt||0)+dt;if(P.ttn===undefined)P.ttn=RQ.get('event')=='tithe'?4:RQ.get('event')?1e9:R(55,85);
 if(!TTH){if(P.tt<P.ttn)return;if(P.tm<30){P.ttn=1e9;return}if(EVN||HFR||FOG)return;
  const s=ttSpot();if(!s){P.ttn=P.tt+8;return}TTH={P,x:s.x,y:s.y,t:0,h:0,w:0};shake=Math.max(shake,7);ttBell(.5,150);
  banner('THE BELL TOLLS','Hold the ward ring for 10s, or the Breach takes an item or half your bounty.','#d8c070');return}
 const T0=TTH;T0.t+=dt;const inn=D(P.x,P.y,T0.x,T0.y)<TT_R;T0.h=inn?T0.h+dt:Math.max(0,T0.h-dt*2);const left=TT_WIN-T0.t;
 if(inn&&Math.floor(T0.h)>Math.floor(T0.h-dt)&&T0.h<TT_HOLD)ttBell(.1,260);
 if(left<=8&&!T0.w){T0.w=1;ttBell(.3,170)}
 if(T0.h>=TT_HOLD){TTH=null;P.ttn=P.tt+R(100,140);ttBell(.3,330);burst(T0.x,T0.y,24,80,'#8fe0a0',0);banner('THE BREACH IS SATISFIED','The bell falls silent. You owe nothing.','#8fe0a0')}
 else if(left<=0){TTH=null;P.ttn=P.tt+R(100,140);ttBell(.55,110);ttPay()}}
function ttDraw(){if(!TTH||TTH.P!==P||P.dead)return;const x=TTH.x-cam.x,y=TTH.y-cam.y,h=TTH.h/TT_HOLD,left=Math.max(0,TT_WIN-TTH.t),pl=.5+.5*Math.sin(T*(left<=8?10:4));
 ctx.save();if(x>-60&&x<VW+60&&y>-60&&y<VH+60){
  const g=ctx.createRadialGradient(x,y,4,x,y,TT_R+16);g.addColorStop(0,'rgba(240,200,90,'+(.1+.08*pl).toFixed(3)+')');g.addColorStop(1,'rgba(240,200,90,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,TT_R+16,0,7);ctx.fill();
  ctx.strokeStyle='rgba(255,220,120,'+(.55+.35*pl).toFixed(3)+')';ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.lineDashOffset=-T*12;ctx.beginPath();ctx.arc(x,y,TT_R,0,7);ctx.stroke();ctx.setLineDash([]);
  ctx.lineWidth=1.5;ctx.beginPath();for(let i=0;i<12;i++){const a=i*.5236;ctx.moveTo(x+Math.cos(a)*(TT_R-6),y+Math.sin(a)*(TT_R-6));ctx.lineTo(x+Math.cos(a)*TT_R,y+Math.sin(a)*TT_R)}ctx.stroke();
  if(h>0){ctx.strokeStyle='#8fe0a0';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,TT_R+5,-1.5708,-1.5708+6.2832*h);ctx.stroke()}
  ctx.font='bold 9px monospace';tx('WARD RING',x,y-TT_R-10,'#f0d070','center')}
 const d=D(P.x,P.y,TTH.x,TTH.y);if(d>TT_R+30){const an=Math.atan2(TTH.y-P.y,TTH.x-P.x),px=P.x-cam.x,py=P.y-cam.y,ax=px+Math.cos(an)*58,ay=py+Math.sin(an)*58;
  ctx.fillStyle='rgba(240,208,112,'+(.6+.35*pl).toFixed(3)+')';ctx.beginPath();ctx.moveTo(ax+Math.cos(an)*7,ay+Math.sin(an)*7);ctx.lineTo(ax+Math.cos(an+2.5)*6,ay+Math.sin(an+2.5)*6);ctx.lineTo(ax+Math.cos(an-2.5)*6,ay+Math.sin(an-2.5)*6);ctx.closePath();ctx.fill();
  ctx.font='bold 9px monospace';tx(Math.round(d/10)+'m',ax+Math.cos(an)*18,ay+Math.sin(an)*18+3,'#f0d070','center')}
 ctx.restore();ctx.font='bold 10px monospace'}
{const _bd=bmDraw;bmDraw=function(){_bd();ttDraw()};
 const _rh=rdHud;rdHud=function(){_rh();if(!TTH||TTH.P!==P||P.dead)return;const left=Math.max(0,TT_WIN-TTH.t),y=EVN?52:40,pl=.5+.5*Math.sin(T*(left<=8?10:4)),inn=D(P.x,P.y,TTH.x,TTH.y)<TT_R,w=120,bx=VW/2-w/2,by=y+4;
  ctx.font='bold 9px monospace';tx('THE TITHE  '+Math.ceil(left)+'s',VW/2,y,left<=8?'rgb(255,'+((90+pl*60)|0)+',70)':'#f0d070','center');
  ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(bx,by,w,6);ctx.fillStyle='#8fe0a0';ctx.fillRect(bx+1,by+1,(w-2)*TTH.h/TT_HOLD,4);ctx.strokeStyle='#e8e6d8';ctx.lineWidth=1;ctx.strokeRect(bx+.5,by+.5,w-1,6);
  tx(inn?'Hold your ground: '+TTH.h.toFixed(1)+' / '+TT_HOLD+'s':'Reach the ward ring',VW/2,by+17,inn?'#8fe0a0':'#e8e6d8','center');ctx.font='bold 10px monospace'}
 const _ut=update;update=function(dt){_ut(dt);if(mode!='play')TTH=null;else ttTick(dt)}}

// ---------- STASH AUTO-SORT ----------
function sortStash(){const tl={},its=[];stash.forEach(o=>{if(TOOL[o.k])tl[o.k]=(tl[o.k]||0)+(o.n||1);else its.push({k:o.k,n:o.n||0})});
 for(const k in tl){let n=tl[k];while(n>0){const c=Math.min(MAXST,n);its.push({k,n:c});n-=c}}
 const gp=k=>PRI[k]&&k!='none'?0:SID[k]?1:2,ar=k=>{const z=isz(k);return z[0]*z[1]};
 its.sort((a,b)=>gp(a.k)-gp(b.k)||ar(b.k)-ar(a.k)||(a.k<b.k?-1:a.k>b.k?1:0)||b.n-a.n);
 const out=[];for(const it of its){const f=spotIn(out,SC,SR,it.k);if(!f)return'Could not fit everything - stash left as it was.';out.push({k:it.k,x:f[0],y:f[1],n:it.n})}
 stash.length=0;out.forEach(o=>stash.push(o));SAVE();return'Stash sorted.'}

// ---------- RANDOM EVENT: COLLAPSE ----------
// One extraction point is sealed for the rest of the run. No banner, no sound: the only warning is the map [M]. ?event=collapse = 3s in.
const CLM=['The wagon burned.','The boat burned.'];
function clSeal(e){e.sealed=1;P.ep=0;const ny=e.y<=61?-1:e.y>=WH-61?1:0,nx=ny?0:e.x<=61?-1:1,vx=e.x+nx*40,vy=e.y+ny*40,hz=!!ny,g=ground.getContext('2d');
 g.save();g.fillStyle='rgba(8,4,4,.9)';g.beginPath();g.arc(e.x,e.y,31,0,7);g.fill();g.beginPath();g.ellipse(vx,vy,hz?36:22,hz?22:36,0,0,7);g.fill();
 g.fillStyle='rgba(60,14,8,.7)';g.beginPath();g.ellipse(vx,vy,hz?24:14,hz?14:24,0,0,7);g.fill();
 for(let i=0;i<14;i++){g.strokeStyle='#2a1a12';g.lineWidth=2;g.beginPath();const x=vx+R(-24,24),y=vy+R(-18,18),a=R(0,6.28);g.moveTo(x,y);g.lineTo(x+Math.cos(a)*R(4,10),y+Math.sin(a)*R(4,10));g.stroke()}
 for(let i=0;i<10;i++){g.fillStyle='rgba(255,'+((90+R(0,80))|0)+',30,.8)';g.fillRect(vx+R(-22,22),vy+R(-16,16),2,2)}
 g.restore();fires.push({x:vx,y:vy,r:24,t:1e9,tk:1e9,s:R(0,6)})}
function clTick(){if(!P||P.dead||RD||P.tm===undefined)return;const el=RT0-P.tm;
 if(P.clT===undefined){const sd=blds[0]?blds[0].x*.53+blds[0].y:1;P.clT=RQ.get('event')=='collapse'?3:lp(110,Math.max(160,RT0-170),hs(sd+3.1));P.clI=hs(sd+9.7)<.5?0:1}
 if(P.clD||el<P.clT)return;const e=exts[P.clI]||exts[0];if(!e||exts.filter(x=>!x.sealed).length<2){P.clD=1;return}
 if(D(P.x,P.y,e.x,e.y)<70||P.ep>0){P.clT=el+4;return}P.clD=1;clSeal(e)}
function clDraw(){if(P.dead)return;ctx.save();ctx.font='bold 9px monospace';for(const e of exts){if(!e.sealed)continue;const x=e.x-cam.x,y=e.y-cam.y;if(D(P.x,P.y,e.x,e.y)<190&&x>-60&&x<VW+60&&y>-60&&y<VH+60)tx(CLM[e.k]||'It burned.',x,y-34,'#ff8a6a','center')}ctx.restore();ctx.font='bold 10px monospace'}

// ---------- RANDOM EVENT: HELLFIRE RAIN ----------
// Meteors are telegraphed by a red circle for 1.5s, then crater the ground and leave burning pools, aimed at doorways and corridors.
let HFR=null,mets=[];const MET_T=1.5,MET_R=24;
function hfTarget(){const q=Math.random();
 if(q<.67)for(let i=0;i<40;i++){const a=R(0,6.28),r=R(60,340),x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;if(x<30||y<30||x>WW-30||y>WH-30||hit(x,y,6)||noEv(x,y,MET_R+8))continue;
  if((hit(x-24,y,3)&&hit(x+24,y,3))||(hit(x,y-24,3)&&hit(x,y+24,3)))return{x,y}}
 for(let i=0;i<30;i++){const a=R(0,6.28),r=R(50,330),x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;if(x<30||y<30||x>WW-30||y>WH-30||hit(x,y,8)||noEv(x,y,MET_R+8))continue;return{x,y}}return null}
function hfImpact(m){const near=D(P.x,P.y,m.x,m.y);shake=Math.max(shake,near<220?6:2);burst(m.x,m.y,30,150,'#ff9a30',0);burst(m.x,m.y,12,110,'#ffe080',0);noise(m.x,m.y,200);
 bx.fillStyle='rgba(0,0,0,.55)';bx.beginPath();bx.ellipse(m.x,m.y,20,14,0,0,7);bx.fill();bx.fillStyle='rgba(90,12,6,.6)';bx.beginPath();bx.ellipse(m.x,m.y,12,8,0,0,7);bx.fill();
 M.forEach(o=>{if(o.hp>0&&D(o.x,o.y,m.x,m.y)<MET_R+2)hurt(o,90,Math.atan2(o.y-m.y,o.x-m.x),'fire')});
 if(!P.dead&&near<MET_R)hurtP(40,{s:'bomb'});
 if(fires.filter(f=>f.mt).length<30)fires.push({x:m.x,y:m.y,r:26,t:22,tk:.3,s:R(0,6),pd:9,mt:1})}
function hfTick(dt){if(!P||P.dead||RD||P.tm===undefined){HFR=null;mets=[];return}if(HFR&&HFR.P!==P){HFR=null;mets=[]}
 const el=RT0-P.tm;
 if(P.hfT===undefined){const sd=blds[0]?blds[0].x*.53+blds[0].y:1;P.hfT=RQ.get('event')=='rain'?3:lp(120,Math.max(180,RT0-150),hs(sd+11.3))}
 if(!HFR&&!P.hfD&&el>=P.hfT){if(P.tm<45)P.hfD=1;else if(!EVN&&!TTH&&!FOG){P.hfD=1;HFR={P,t:0,dur:45,rt:.4};shake=Math.max(shake,6);banner('HELLFIRE RAIN','Red circles mark where the sky falls. Craters burn, and the fires choke corridors and doorways.','#ff6a2a');try{sfx.sigil(3)}catch(e){}}}
 if(HFR){HFR.t+=dt;if(HFR.t<HFR.dur){HFR.rt-=dt;if(HFR.rt<=0){HFR.rt=R(.35,.75);if(mets.length<10){const t=hfTarget();if(t&&!noEv(t.x,t.y,MET_R+8))mets.push({x:t.x,y:t.y,t:MET_T})}}}else if(!mets.length){HFR=null;say('The rain of fire passes.',4)}}
 for(const m of mets){m.t-=dt;if(m.t<=0)hfImpact(m)}mets=mets.filter(m=>m.t>0)}
function hfDraw(){if(!mets.length||P.dead)return;ctx.save();for(const m of mets){const x=m.x-cam.x,y=m.y-cam.y;if(x<-60||x>VW+60||y<-260||y>VH+60)continue;const p=1-m.t/MET_T,pl=.5+.5*Math.sin(T*14);
 ctx.fillStyle='rgba(255,30,20,'+(.08+.2*p).toFixed(3)+')';ctx.beginPath();ctx.arc(x,y,MET_R,0,7);ctx.fill();
 ctx.fillStyle='rgba(255,60,30,'+(.15+.3*p).toFixed(3)+')';ctx.beginPath();ctx.arc(x,y,MET_R*p,0,7);ctx.fill();
 ctx.strokeStyle='rgba(255,70,50,'+(.6+.4*pl).toFixed(3)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,MET_R,0,7);ctx.stroke();
 if(m.t<.4){const k=m.t/.4,mx=x+70*k,my=y-210*k;ctx.strokeStyle='rgba(255,170,60,.9)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(mx+16,my-48);ctx.lineTo(mx,my);ctx.stroke();ctx.fillStyle='#ff8a20';ctx.beginPath();ctx.arc(mx,my,5,0,7);ctx.fill();ctx.fillStyle='#ffe080';ctx.beginPath();ctx.arc(mx,my,2.5,0,7);ctx.fill()}}
 ctx.restore()}
{const _b2=bmDraw;bmDraw=function(){_b2();hfDraw();clDraw()};
 const _uh=update;update=function(dt){_uh(dt);if(mode!='play'){HFR=null;mets=[];return}clTick();hfTick(dt)}}

// ---------- RANDOM EVENT: THE FOG ROLLS IN ----------
// Your sight collapses to a few paces and flares are dead (no light, no lure, no noise). Monsters keep their normal senses. ?event=fog = 3s in.
let FOG=null;
const fgOn=()=>!!FOG&&FOG.P===P,fgf=()=>fgOn()?sg(FOG.t,0,3)*(1-sg(FOG.t,FOG.dur-3,FOG.dur)):0,fgv=m=>lp(1,m,fgf());
function fgTick(dt){if(!P||P.dead||RD||P.tm===undefined){FOG=null;return}if(FOG&&FOG.P!==P)FOG=null;const el=RT0-P.tm;
 if(P.fgT===undefined){const sd=blds[0]?blds[0].x*.53+blds[0].y:1;P.fgT=RQ.get('event')=='fog'?3:lp(130,Math.max(200,RT0-140),hs(sd+17.9))}
 if(!FOG&&!P.fgD&&el>=P.fgT){if(P.tm<50)P.fgD=1;else if(!EVN&&!TTH&&!HFR){P.fgD=1;FOG={P,t:0,dur:45};shake=Math.max(shake,4);
  banner('THE FOG ROLLS IN','You can barely see your own hands and flares die in it. The horde still senses you.','#b8c4cc');try{sfx.sigil(1)}catch(e){}}}
 if(FOG){FOG.t+=dt;if(FOG.t>=FOG.dur){FOG=null;say('The fog lifts.',4)}}}
function fgDraw(){const a=fgf();if(a<=.01||P.dead)return;ctx.save();const px=P.x-cam.x,py=P.y-cam.y,g=ctx.createRadialGradient(px,py,2,px,py,46);
 g.addColorStop(0,'rgba(170,185,195,'+(.22*a).toFixed(3)+')');g.addColorStop(1,'rgba(170,185,195,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,46,0,7);ctx.fill();
 for(let i=0;i<7;i++){const an=T*(.25+i*.05)+i*1.9,r=14+((i*13)%30)+4*Math.sin(T*.8+i);ctx.fillStyle='rgba(185,198,208,'+(.07*a).toFixed(3)+')';ctx.beginPath();ctx.ellipse(px+Math.cos(an)*r,py+Math.sin(an)*r*.6,18,8,an*.5,0,7);ctx.fill()}
 ctx.restore();ctx.font='bold 10px monospace'}
{const _b3=bmDraw;bmDraw=function(){_b3();fgDraw()};
 const _rh2=rdHud;rdHud=function(){_rh2();if(!fgOn()||P.dead)return;ctx.font='bold 9px monospace';tx('THE FOG  '+Math.ceil(FOG.dur-FOG.t)+'s',VW/2,EVN?52:40,'#b8c4cc','center');ctx.font='bold 10px monospace'};
 const _uf=update;update=function(dt){_uf(dt);if(mode!='play'){FOG=null;return}fgTick(dt)}}
