// ---------- ACTIONS ----------
function noise(x,y,r){M.forEach(m=>{if(m.hp>0&&D(m.x,m.y,x,y)<r&&(!m.boss||D(m.x,m.y,x,y)<160)){m.st='chase';m.lt=0}})}

function reload(){const w=P.w[P.cur];if(w&&w.d&&P.rl<=0&&P.mag[P.cur]<w.m&&P.res[P.cur]>0){P.rl=w.rl;say('Reloading...',w.rl)}}
function melee(){P.mc=.6;P.sa=.18;const a=P.face;let h=0;M.forEach(m=>{if(m.hp>0&&D(m.x,m.y,P.x,P.y)<30){let d=Math.abs(Math.atan2(m.y-P.y,m.x-P.x)-a);d=Math.min(d,6.28-d);if(d<1){hurt(m,30,a,'melee');mv(m,Math.cos(a)*6,Math.sin(a)*6,6);h=1}}});if(h)shake=3}
function hurt(m,d,a,src){const dd=Math.min(d,Math.max(m.hp,0));m.hp-=d;prog(m,dd,src,m.hp<=0);m.fl=.1;burst(m.x,m.y,10,90,m.ty=='bloat'?'#7ad04a':'#8a0f18',1,a);spray(m.x,m.y,6,a,4+Math.min(16,d/3|0),120,m.ty=='bloat');if(Math.random()<.5&&src!='fire'&&src!='flamer')splat(m.x,m.y,2,6,m.ty=='bloat');m.st='chase';if(m.boss)m.al=2.5;m.ga=a;m.gd=d;m.gs=src;if(m.hp<=0)kill(m)}
function kill(m){const fr=['flamer','fire','bomb','tripwire','flask'].includes(m.gs),ac=m.ty=='bloat';gore(m,m.ga,m.gd,m.gs);if(!fr)splat(m.x,m.y,m.boss?30:14,m.boss?30:14,ac);burst(m.x,m.y,m.boss?30:14,110,ac?'#7ad04a':'#ff6a1a',1);m.hp=-1;if(m.ty=='bloat')boom(m);if(m.boss){corpse={x:m.x,y:m.y};say('The demon falls! Hold E on the corpse to banish it for the bounty.'+(mis.fail?' Ledger task failed.':''),6)}}
function hurtP(d,k){if(P.dead)return;if(k)lastK=k;if(P.wd>0)d*=.4;P.hp-=d;P.hf=.25;shake=5;burst(P.x,P.y,8,80,'#a01018',1);spray(P.x,P.y,6,null,10+Math.min(14,d/3|0),110);splat(P.x,P.y,3,6);if(P.hp<=0)die()}

addEventListener('keydown',e=>{if(e.code=='Tab'&&mode=='play')e.preventDefault();if(e.repeat)return;keys[e.code]=1;if(mode!='play')return;const c=e.code;if(P.dead){if(c=='Enter'||c=='KeyL')end(0);return}
 if(c=='KeyM'){showMap=!showMap;mouse.l=mouse.r=0}if(c=='KeyI'||c=='Tab'){ivd=null;invOpen=!invOpen;showMap=0;mouse.l=mouse.r=0;refocus()}if(c=='Escape')showMap=0;
 if(c=='KeyR')reload();if(c>='Digit1'&&c<='Digit8')setSlot(+c[5]-1);
 if(c=='KeyH')useTonic();
 if(c=='KeyG')throwBomb();if(c=='KeyZ')useXT('flask');if(c=='KeyX')useXT('flare');if(c=='KeyC')useXT('ward');if(c=='KeyV')useXT('tripwire');
 if(['Space','Tab'].includes(c))e.preventDefault()});
addEventListener('keyup',e=>keys[e.code]=0);
const TC=k=>k=='tonic'?P.tn:k=='bomb'?P.bm:(P.xt[k]||0),TS=(k,n)=>{if(k=='tonic')P.tn=n;else if(k=='bomb')P.bm=n;else P.xt[k]=n};
const has=i=>i<2?(i==1||!!P.w[i]):i==2?P.tn>0:i==3?P.bm>0:(P.xt[XT[i-4]]||0)>0;
function stow(i){const w=P.w[i];if(!w)return;if(!addTo(P.bag,4,4,w.k))return say('Backpack is full',2);P.w[i]=null;P.mag[i]=0;P.res[i]=0;fixSlot()}
function stowT(k){if(TC(k)<=0)return;if(!addTo(P.bag,4,4,k,1))return say('Backpack is full',2);TS(k,TC(k)-1);fixSlot()}
function unbag(it){const i=P.bag.indexOf(it);if(i<0)return;const k=it.k;
 if(TOOL[k]){if(TC(k)>=MAXST)return say('Already carrying the max (3)',2);TS(k,TC(k)+1);it.n--;if(it.n<=0)P.bag.splice(i,1);return}
 const s=SID[k]?1:0,w=(s?SID:PRI)[k],o=P.w[s];P.bag.splice(i,1);
 if(o&&!addTo(P.bag,4,4,o.k)){P.bag.splice(i,0,it);return say('No room to swap',2)}
 P.w[s]=w;P.mag[s]=w.m;P.res[s]=w.m*2;P.rl=0;P.cur=s}
const IBX=125,IBY=68,GX=256,GY=146,GC=32,IVX=110,IVY=40,IVW=420,IVH=300;let ivd=null;
function invClick(sh){for(let j=0;j<7;j++){const x=IBX+j*57;if(mouse.x>x&&mouse.x<x+53&&mouse.y>IBY&&mouse.y<IBY+50){j<2?stow(j):stowT(TKS[j-2]);return}}
 const o=invHit();if(o)ivd={o,sp:!!(sh&&TOOL[o.k]&&(o.n||1)>1),sx:mouse.x,sy:mouse.y,dx:mouse.x-(GX+o.x*GC),dy:mouse.y-(GY+o.y*GC),mv:0}}
function invHit(){for(const o of P.bag){const z=isz(o.k);if(mouse.x>GX+o.x*GC&&mouse.x<GX+(o.x+z[0])*GC&&mouse.y>GY+o.y*GC&&mouse.y<GY+(o.y+z[1])*GC)return o}return null}
const invOut=()=>mouse.x<IVX||mouse.x>IVX+IVW||mouse.y<IVY||mouse.y>IVY+IVH;
function bagDrop(o){const i=P.bag.indexOf(o);if(i<0)return;P.bag.splice(i,1);const c=TOOL[o.k]?Math.max(1,o.n||1):1;for(let j=0;j<c;j++)ttToss(ttGround(o.k));say('Dropped '+ttName(o.k)+(c>1?' x'+c:''),2)}
function invMove(){if(ivd&&!ivd.mv&&Math.hypot(mouse.x-ivd.sx,mouse.y-ivd.sy)>4)ivd.mv=1}
function invTgt(d){const o=d.o,z=isz(o.k);if(invOut())return{out:1};const gx=Math.round((mouse.x-d.dx-GX)/GC),gy=Math.round((mouse.y-d.dy-GY)/GC),px=Math.floor((mouse.x-GX)/GC),py=Math.floor((mouse.y-GY)/GC);
 const mg=TOOL[o.k]?P.bag.find(q=>q!==o&&q.k==o.k&&(q.n||1)<MAXST&&px>=q.x&&px<q.x+isz(q.k)[0]&&py>=q.y&&py<q.y+isz(q.k)[1]):null;if(mg)return{mg,gx:mg.x,gy:mg.y,ok:1,w:isz(mg.k)[0],h:isz(mg.k)[1]};
 return{gx,gy,w:z[0],h:z[1],ok:fitsIn(P.bag,4,4,gx,gy,z[0],z[1],d.sp?null:o),inb:gx>=0&&gy>=0&&gx+z[0]<=4&&gy+z[1]<=4}}
function invRelease(){const d=ivd;ivd=null;if(!d||!invOpen||!P.bag.includes(d.o))return;const o=d.o;if(!d.mv){unbag(o);return}
 const t=invTgt(d);
 if(t.out){if(d.sp){o.n--;ttToss(ttGround(o.k));say('Dropped '+ttName(o.k),2)}else bagDrop(o);return}
 if(t.mg){const mv=d.sp?1:Math.min(MAXST-t.mg.n,o.n||1);t.mg.n+=mv;o.n-=mv;if(o.n<=0)P.bag.splice(P.bag.indexOf(o),1);return}
 if(!t.ok)return;if(d.sp){o.n--;P.bag.push({k:o.k,x:t.gx,y:t.gy,n:1})}else{o.x=t.gx;o.y=t.gy}}
function invItem(k,x,y,W,H){const[l,cx,h]=SPX[k]||[10,5,5],sc=Math.min(W*.86/l,H*.8/h);drawWpn(k,x+W/2-cx*sc,y+H/2-.5*sc,0,sc)}
function drawInv(){ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,0,VW,VH);ctx.fillStyle='#1c1418';ctx.fillRect(IVX,IVY,IVW,IVH);ctx.strokeStyle='#e8e6d8';ctx.lineWidth=1;ctx.strokeRect(IVX+.5,IVY+.5,IVW,IVH);ctx.font='bold 10px monospace';
 tx('INVENTORY',320,58,'#e8e6d8','center');const L=['Primary','Sidearm','Water','Charge','Flask','Flare','Ward'],ks=[P.w[0]&&P.w[0].k,P.w[1]&&P.w[1].k,...TKS.map(k=>TC(k)>0?k:null)],ns=[0,0,...TKS.map(TC)];
 for(let j=0;j<7;j++){const x=IBX+j*57,k=ks[j];ctx.fillStyle='#241c24';ctx.fillRect(x,IBY,53,50);ctx.strokeStyle='#666';ctx.strokeRect(x+.5,IBY+.5,53,50);tx(L[j],x+3,IBY+10,'#aaa');
  if(k){invItem(k,x+3,IBY+12,47,36);if(ns[j])tx('x'+ns[j],x+50,IBY+46,'#fff','right')}else tx(j<2?'fists':'none',x+4,IBY+34,'#777')}
 tx('BACKPACK (16 squares)',320,138,'#c8a050','center');ctx.fillStyle='#14080a';ctx.fillRect(GX,GY,4*GC,4*GC);ctx.strokeStyle='#555';for(let i=0;i<=4;i++){ctx.beginPath();ctx.moveTo(GX+i*GC+.5,GY);ctx.lineTo(GX+i*GC+.5,GY+4*GC);ctx.stroke()}for(let i=0;i<=4;i++){ctx.beginPath();ctx.moveTo(GX,GY+i*GC+.5);ctx.lineTo(GX+4*GC,GY+i*GC+.5);ctx.stroke()}
 for(const o of P.bag){if(ivd&&ivd.o===o&&ivd.mv&&!ivd.sp)continue;const z=isz(o.k),x=GX+o.x*GC,y=GY+o.y*GC;ctx.fillStyle='#7a1c1c88';ctx.fillRect(x+1,y+1,z[0]*GC-2,z[1]*GC-2);invItem(o.k,x,y,z[0]*GC,z[1]*GC);if(TOOL[o.k])tx('x'+o.n,x+z[0]*GC-3,y+z[1]*GC-3,'#fff','right')}
 if(ivd&&ivd.mv){const o=ivd.o,z=isz(o.k),t=invTgt(ivd),out=t.out;
  if(!out&&(t.mg||t.inb)){ctx.fillStyle=t.ok?'#40c06055':'#c0302055';ctx.fillRect(GX+t.gx*GC,GY+t.gy*GC,t.w*GC,t.h*GC)}
  const x=mouse.x-ivd.dx,y=mouse.y-ivd.dy;ctx.globalAlpha=.85;ctx.fillStyle='#7a1c1c';ctx.fillRect(x+1,y+1,z[0]*GC-2,z[1]*GC-2);invItem(o.k,x,y,z[0]*GC,z[1]*GC);if(TOOL[o.k])tx('x'+(ivd.sp?1:o.n),x+z[0]*GC-3,y+z[1]*GC-3,'#fff','right');ctx.globalAlpha=1;
  if(out)tx('Release to drop',mouse.x,mouse.y-8,'#ff8a70','center')}
 tx('Click equipped gear or tools to stow them. Click a backpack item to equip or use it.',320,292,'#bbb','center');tx('Drag items to rearrange. Drag outside the window or right-click to drop.',320,305,'#bbb','center');tx('Shift-drag a stack to split it. Drop a stack onto another to merge.',320,318,'#bbb','center');tx('The backpack comes home if you escape.  Tab: close',320,331,'#bbb','center')}
function refocus(){try{window.focus();cv.focus({preventScroll:true})}catch(e){}}
cv.tabIndex=0;cv.style.outline='none';addEventListener('blur',()=>{keys={}});
function setSlot(i){if(!has(i))return say('Slot empty',1.5);P.cur=i;P.rl=0}
function fixSlot(){if(!has(P.cur)){const f=[0,1,2,3,4,5,6,7].find(has);P.cur=f===undefined?0:f}}
function useTonic(){if(P.tn<=0)return;if(P.hp>=100)return say('Already healthy',1.5);P.tn--;P.hp=Math.min(100,P.hp+50);burst(P.x,P.y,10,40,'#c03040',0);fixSlot()}
function throwBomb(){if(P.bm<=0)return;P.bm--;const a=Math.atan2(mouse.y+cam.y-P.y,mouse.x+cam.x-P.x),d=Math.min(170,D(P.x,P.y,mouse.x+cam.x,mouse.y+cam.y));bombs.push({x:P.x,y:P.y,vx:Math.cos(a)*d/.4,vy:Math.sin(a)*d/.4,t:1.5,m:.4});fixSlot()}
function takeW(it){const s=it.s,w=(s?SID:PRI)[it.k];if(P.w[s]===w){P.res[s]+=w.m*2;say('+ammo ('+w.n+')',2)}else{if(P.w[s])items.push({t:'wpn',s,k:P.w[s].k,x:P.x+R(-6,6),y:P.y+R(-6,6)});keys.KeyE=0;P.w[s]=w;P.mag[s]=w.m;P.res[s]=w.m*2;P.rl=0;P.cur=s;say('Picked up '+w.n,3)}it.got=1}
addEventListener('wheel',e=>{if(mode!='play')return;const d=e.deltaY>0?1:7;for(let k=1;k<=8;k++){const n=(P.cur+d*k)%8;if(has(n)){P.cur=n;P.rl=0;break}}e.preventDefault()},{passive:false});
addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect(),s=Math.min(r.width/VW,r.height/VH);mouse.x=(e.clientX-r.left-(r.width-VW*s)/2)/s;mouse.y=(e.clientY-r.top-(r.height-VH*s)/2)/s;if(ivd)invMove()});
cv.addEventListener('mousedown',e=>{if(P&&P.dead&&mode=='play'){if(e.button==0&&mouse.x>VW/2-62&&mouse.x<VW/2+62&&mouse.y>VH-64&&mouse.y<VH-42)end(0);return}if(invOpen){if(e.button==0)invClick(e.shiftKey);else if(e.button==2){const o=invHit();if(o)bagDrop(o)}return}if(e.button==0)mouse.l=1;if(e.button==2)mouse.r=1});addEventListener('mouseup',e=>{if(e.button==0&&ivd){invMove();invRelease()}if(e.button==0)mouse.l=0;if(e.button==2)mouse.r=0});cv.addEventListener('contextmenu',e=>e.preventDefault());
// ---------- UPDATE ----------
