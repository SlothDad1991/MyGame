// ---------- WORLD ----------
let WK=-1,wl;const W=(x,y,w,h,t)=>walls.push({x,y,w,h,t,k:WK});
function hw(x,y,w,g){if(!g)return W(x,y,w,6);const a=w/2-18+R(-40,40)|0;W(x,y,a,6);W(x+a+36,y,w-a-36,6)}
function vw(x,y,h,g){if(!g)return W(x,y,6,h);const a=h/2-18+R(-30,30)|0;W(x,y,6,a);W(x,y+a+36,6,h-a-36)}
const hit=(x,y,r)=>{for(const w of walls)if(x+r>w.x&&x-r<w.x+w.w&&y+r>w.y&&y-r<w.y+w.h)return true;return false};
function mv(e,a,b,r){if(!hit(e.x+a,e.y,r))e.x+=a;if(!hit(e.x,e.y+b,r))e.y+=b;e.x=cl(e.x,r,WW-r);e.y=cl(e.y,r,WH-r)}
function los(a,b,c,d){const n=Math.ceil(D(a,b,c,d)/6);for(let i=1;i<n;i++)if(hit(a+(c-a)*i/n,b+(d-b)*i/n,.5))return false;return true}
function genGround(){ground=mk(WW,WH);const g=ground.getContext('2d');g.fillStyle='#2a1b1d';g.fillRect(0,0,WW,WH);
 for(let i=0;i<9000;i++){g.fillStyle=['#1f1214','#3b2024','#2f2a30','#170c0e'][i%4];g.fillRect(R(0,WW),R(0,WH),R(1,3),1)}
 g.fillStyle='rgba(110,30,14,.3)';for(let i=0;i<40;i++){g.beginPath();g.ellipse(R(0,WW),R(0,WH),R(20,60),R(10,30),0,0,7);g.fill()}
 g.fillStyle='rgba(0,0,0,.05)';for(let y=0;y<WH;y+=16)for(let x=0;x<WW;x+=16)if((x+y)/16%2==0)g.fillRect(x,y,16,16);
 for(let i=0;i<90;i++){let x=R(0,WW),y=R(0,WH),a=R(0,6.28);const pts=[[x,y]];for(let k=0;k<7;k++){a+=R(-.9,.9);x+=Math.cos(a)*R(14,34);y+=Math.sin(a)*R(14,34);pts.push([x,y])}
  for(const [w,c] of [[6,'rgba(255,70,10,.12)'],[2.5,'rgba(255,100,20,.35)'],[1,'rgba(255,190,80,.8)']]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();pts.forEach((p,k)=>k?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke()}}
 blood=mk(WW,WH);bx=blood.getContext('2d')}
function splat(x,y,n,r,g){for(let i=0;i<n;i++){bx.fillStyle=g?`rgba(${60+R(0,40)|0},${140+R(0,70)|0},${20+R(0,30)|0},${R(.4,.8)})`:`rgba(${40+R(0,40)|0},6,${30+R(0,40)|0},${R(.4,.8)})`;bx.beginPath();bx.ellipse(x+R(-r,r),y+R(-r,r),R(1,r/3+1),R(1,r/4+1),R(0,3),0,7);bx.fill()}}
function burst(x,y,n,sp,col,s,a){for(let i=0;i<n;i++){const t=a!=null?a+R(-.8,.8):R(0,6.28),v=R(.3,1)*sp;parts.push({x,y,vx:Math.cos(t)*v,vy:Math.sin(t)*v,l:R(.3,.8),c:col,s})}}
const bExt=b=>{const g=b.wg;if(!g)return b;const x=Math.min(b.x,g.x),y=Math.min(b.y,g.y);return{x,y,w:Math.max(b.x+b.w,g.x+g.w)-x,h:Math.max(b.y+b.h,g.y+g.h)-y}};
const inHouse=(b,x,y,m)=>(x>b.x+m&&x<b.x+b.w-m&&y>b.y+m&&y<b.y+b.h-m)||!!(b.wg&&x>b.wg.x+m&&x<b.wg.x+b.wg.w-m&&y>b.wg.y+m&&y<b.wg.y+b.wg.h-m);
function planWing(b){b.wg=null;if(Math.random()>.75)return;const s=R(0,4)|0,L=s<2?b.w:b.h,gl=R(80,Math.min(150,L-50))|0,go=R(20,L-gl-20)|0,dp=R(60,100)|0;b.ws=s;b.wo=go;b.wl=gl;b.wg=[{x:b.x+go,y:b.y-dp+6,w:gl,h:dp},{x:b.x+go,y:b.y+b.h-6,w:gl,h:dp},{x:b.x-dp+6,y:b.y+go,w:dp,h:gl},{x:b.x+b.w-6,y:b.y+go,w:dp,h:gl}][s]}
function wLine(x,y,len,hz,gs){let p=0;for(const[g,l]of gs.sort((a,b)=>a[0]-b[0])){if(g>p)hz?W(x+p,y,g-p,6):W(x,y+p,6,g-p);p=g+l}if(len>p)hz?W(x+p,y,len-p,6):W(x,y+p,6,len-p)}
function buildWalls(b){const g=[[],[],[],[]],ds=[R(0,4)|0];if(Math.random()<.5)ds.push((ds[0]+1+(R(0,3)|0))%4);
 ds.forEach(q=>g[q].push([R(30,(q<2?b.w:b.h)-66)|0,36]));const o=b.wg;if(o)g[b.ws]=[[b.wo+6,b.wl-12]];b.dr=[];g.forEach((a,q)=>{if(!(o&&q==b.ws))a.forEach(d=>b.dr.push({q,of:d[0],ln:d[1]}))});
 wLine(b.x,b.y,b.w,1,g[0]);wLine(b.x,b.y+b.h-6,b.w,1,g[1]);wLine(b.x,b.y,b.h,0,g[2]);wLine(b.x+b.w-6,b.y,b.h,0,g[3]);
 if(o){const om=[1,0,3,2][b.ws],h=[[],[],[],[]],c=[0,1,2,3].filter(i=>i!=om)[R(0,3)|0];h[c].push([((c<2?o.w:o.h)-36)/2|0,36]);b.dr.push({q:c,of:((c<2?o.w:o.h)-36)/2|0,ln:36,wg:1});
  if(om!=0)wLine(o.x,o.y,o.w,1,h[0]);if(om!=1)wLine(o.x,o.y+o.h-6,o.w,1,h[1]);if(om!=2)wLine(o.x,o.y,o.h,0,h[2]);if(om!=3)wLine(o.x+o.w-6,o.y,o.h,0,h[3])}
 if(Math.random()<.6){const f=.5+(Math.random()<.5?1:-1)*R(.1,.2);Math.random()<.5?wLine(b.x+6,b.y+b.h*f,b.w-12,1,[[R(20,b.w-68)|0,36]]):wLine(b.x+b.w*f,b.y+6,b.h-12,0,[[R(20,b.h-68)|0,36]])}}
// ---------- MOB TYPES (w = spawn weight: easy ones common, hard ones rare) ----------
const MOBS={imp:{hp:45,sp:52,dm:10,cd:.9,w:44},skitter:{hp:22,sp:90,dm:6,cd:.6,w:26},bloat:{hp:60,sp:34,w:12},vine:{hp:55,sp:30,w:12},brute:{hp:130,sp:38,dm:24,cd:1.1,sc:1.5,w:6}};
const pickMob=()=>{let r=Math.random()*Object.values(MOBS).reduce((a,o)=>a+o.w,0);for(const[k,o]of Object.entries(MOBS)){if((r-=o.w)<0)return k}return'imp'};
const mkMob=(x,y,st,ty)=>{ty=ty||pickMob();const o=MOBS[ty];return{x,y,hp:o.hp,mh:o.hp,st:st||'idle',wt:0,cd:0,fl:0,wk:0,ty}};
function boom(m){splat(m.x,m.y,10,20,1);burst(m.x,m.y,26,120,'#7ad04a',0);burst(m.x,m.y,10,90,'#4a7a20',1);noise(m.x,m.y,300);shake=Math.max(shake,5);if(D(P.x,P.y,m.x,m.y)<42)hurtP(30,{m,s:'bloat'});M.forEach(q=>{if(q!==m&&q.hp>0&&!q.boss&&D(q.x,q.y,m.x,m.y)<42)hurt(q,40,0,'bloat')})}
let TG;
function mobAI(m,a,d,v,dt){const o=MOBS[m.ty||'imp'];
 if(m.ty=='vine'){if(m.fi){if(T>=m.lw){m.fi=0;m.lf=T+.2;const dx=TG.x-m.x,dy=TG.y-m.y,pr=dx*Math.cos(m.la)+dy*Math.sin(m.la),pp=Math.abs(-dx*Math.sin(m.la)+dy*Math.cos(m.la));if(pr>0&&pr<135&&pp<9&&los(m.x,m.y,TG.x,TG.y))hurtTG(18);burst(m.x+Math.cos(m.la)*70,m.y+Math.sin(m.la)*70,6,60,'#8a0f18',0)}return}
  const s=d<65?-40:d>105?o.sp:0;mv(m,Math.cos(a)*s*dt,Math.sin(a)*s*dt,5);m.wk+=dt*6;if(m.cd<=0&&v&&d<125&&d>20){m.fi=1;m.lw=T+.7;m.la=a;m.cd=2.4}return}
 mv(m,Math.cos(a)*o.sp*dt,Math.sin(a)*o.sp*dt,5);m.wk+=dt*(m.ty=='skitter'?12:8);
 if(m.ty=='bloat'){if(d<18)kill(m);return}
 if(d<13*(o.sc||1)&&m.cd<=0){m.cd=o.cd;hurtTG(o.dm)}}
// ---- gore: rolling heads, limbs, guts, blood spray ----
let gibs=[],drops=[],spurts=[];
function spray(x,y,z,a,n,sp,g){if(drops.length>650)drops.splice(0,120);for(let i=0;i<n;i++){const t=a==null?R(0,6.28):a+R(-.9,.9),v=R(.2,1)*sp;drops.push({x,y,z,vx:Math.cos(t)*v,vy:Math.sin(t)*v,vz:R(30,130),gr:g})}}
function pool(x,y,r,n,g){for(let i=0;i<n;i++){bx.fillStyle=g?`rgba(${50+R(0,30)|0},${120+R(0,60)|0},${20+R(0,20)|0},${R(.3,.55)})`:`rgba(${70+R(0,35)|0},5,${12+R(0,20)|0},${R(.28,.5)})`;bx.beginPath();bx.ellipse(x+R(-r,r)*.6,y+R(-r,r)*.45,R(r*.4,r),R(r*.3,r*.7),R(0,3),0,7);bx.fill()}}
function paintGib(c,g,x,y){c.save();c.translate(x,y);c.rotate(g.r);
 if(g.t=='head'&&g.hm){const s=g.s;c.scale(s,s);c.fillStyle=g.c;c.fillRect(-3.5,-3.5,7,7);c.fillStyle=g.c2||'#d8d0c0';c.fillRect(-2.5,-2.2,5,4.4);if(g.bk){c.fillStyle=g.bk;c.fillRect(2,-.6,3.5,1.6)}c.fillStyle='#14101a';c.fillRect(-1.5,-1.2,1,1);c.fillRect(.6,-1.2,1,1);c.fillStyle='#b01820';c.fillRect(-2.5,3,5,1.4);c.fillStyle='#e8a0a0';c.fillRect(-1,3.2,2,.8)}
 else if(g.t=='head'){const s=g.s;c.scale(s,s);c.fillStyle=g.c;c.fillRect(-3,-3,6,6);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-3,1.5,6,1.5);c.fillStyle='#e8d8b0';c.fillRect(-4,-5,1,3);c.fillRect(3,-5,1,3);c.fillStyle='#ffd23a';c.fillRect(-2,-1.5,1,1);c.fillRect(1,-1.5,1,1);c.fillStyle='#2a0406';c.fillRect(-1.5,1,3,.8);c.fillStyle='#b01820';c.fillRect(-2.5,3,5,1.4);c.fillStyle='#e8a0a0';c.fillRect(-1,3.2,2,.8)}
 else if(g.t=='body'){const s=g.s;c.scale(s,s);c.fillStyle=g.c2||'#4a0c0c';c.fillRect(-3,1.5,2,4.5);c.fillRect(1,1.5,2,4.5);c.fillStyle=g.c;c.fillRect(-4,-5,8,7.5);c.fillRect(-5.8,-4.2,1.8,5);c.fillRect(4,-4.2,1.8,5);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-4,1,8,1.5);c.fillStyle='#b01820';c.fillRect(-2.4,-6,4.8,1.6);c.fillStyle='#e8a0a0';c.fillRect(-.9,-5.8,1.8,.8)}
 else if(g.t=='limb'){c.fillStyle=g.c;c.fillRect(-3.5,-1,7,2);c.fillStyle='#b01820';c.fillRect(-3.5,-1,1.2,2);c.fillStyle='#e8d8b0';c.fillRect(3,-1.2,1,.6);c.fillRect(3,.6,1,.6)}
 else if(g.t=='gut'){c.strokeStyle='#8a2a44';c.lineWidth=2.4;c.beginPath();c.moveTo(-4,0);c.quadraticCurveTo(-1,-2.5,1,0);c.quadraticCurveTo(3,2,5,-.5);c.stroke();c.strokeStyle='#d0607e';c.lineWidth=1.2;c.stroke()}
 else if(g.t=='bone'){c.fillStyle='#e8d8b0';c.fillRect(-2.5,-.5,5,1);c.fillStyle='#fff6dc';c.fillRect(-2.5,-.5,1,1);c.fillRect(1.5,-.5,1,1)}
 else{c.fillStyle=g.c;c.fillRect(-1.4,-1.2,2.8,2.4);c.fillStyle='rgba(255,255,255,.25)';c.fillRect(-1.4,-1.2,1.2,.8)}
 if(g.bolt){c.strokeStyle='#d8d8e0';c.lineWidth=.8;c.beginPath();c.moveTo(-9,0);c.lineTo(6,0);c.stroke();c.fillStyle='#e8ecff';c.fillRect(-10.5,-1.3,2.5,2.6)}
 c.restore()}
function drawGib(g,cx,cy){const x=g.x-cx,y=g.y-cy;if(x<-20||x>VW+20||y<-20||y>VH+20)return;const k=Math.max(.3,1-g.z/40);ctx.fillStyle=`rgba(0,0,0,${.35*k})`;ctx.beginPath();ctx.ellipse(x,y+1,(g.t=='body'?5:3)*g.s*k,(g.t=='body'?2.2:1.4)*g.s*k,0,0,7);ctx.fill();paintGib(ctx,g,x,y-g.z-(g.fall?4*g.s*Math.cos(g.r):0))}
const GS={
 melee:{h:'fly',hv:1.1,b:'fall',st:.5,g:7,l:2,k:2,sp:1.2,slash:1},
 pistol:{h:'fly',hv:.65,b:'fall',st:.3,g:3,l:0,k:0,sp:.7},
 revolver:{h:'fly',hv:1.25,b:'fall',st:.45,g:12,l:2,k:3,sp:1.35,shk:3},
 whisper:{h:'fly',hv:.4,hz:.4,b:'fall',st:.85,cr:2.2,g:3,l:0,k:0,sp:.45,q:1},
 repeater:{h:'fly',hv:1,b:'fall',st:.4,g:6,l:1,k:1,sp:1},
 pepperbox:{h:'mush',b:'fall',st:.3,g:9,l:1,k:3,sp:1.2},
 rifle:{h:'pop',b:'fall',st:.55,g:5,l:0,k:3,sp:1.2},
 handcannon:{h:'vap',b:'throw',spin:1.2,g:4,l:0,k:1,sp:1.5,shk:6},
 musket:{h:'vap',b:'throw',spin:2,g:6,l:1,k:2,sp:2,shk:14},
 shotgun:{h:'none',b:'none',g:22,l:3,k:6,sp:2,all:1,shk:7},
 crossbow:{h:'bolt',hv:2.1,b:'fall',st:.4,g:4,l:0,k:1,sp:.8},
 flamer:{h:'char',b:'burn',st:.9,g:3,l:1,k:2,sp:.15,fire:1,ch:1},
 fire:{h:'char',b:'burn',st:.9,g:3,l:1,k:2,sp:.15,fire:1,ch:1},
 bomb:{h:'fly',hv:2.2,b:'none',g:20,l:4,k:8,sp:2,all:1,fire:1,blast:1,hi:1.7,shk:10},
 tripwire:{h:'fly',hv:2.2,b:'none',g:20,l:4,k:8,sp:2,all:1,fire:1,blast:1,hi:1.7,shk:10},
 bloat:{h:'none',b:'none',g:22,l:0,k:0,sp:1.4,all:1,acid:1}};
function scorch(x,y,r){for(let i=0;i<5;i++){bx.fillStyle=`rgba(6,4,4,${R(.28,.5)})`;bx.beginPath();bx.ellipse(x+R(-r,r)*.4,y+R(-r,r)*.3,R(r*.45,r),R(r*.3,r*.7),R(0,3),0,7);bx.fill()}}
function gore(m,a,d,src,pal){
 if(a==null||isNaN(a))a=null;d=d||20;const boss=!!m.boss,ty=m.ty||'imp',sc=boss?2.2:ty=='brute'?1.5:ty=='skitter'?.75:1;
 const heady=!(ty=='vine'||ty=='bloat'),blast0=['bomb','tripwire','bloat','flask'].includes(src),big=blast0||d>=45||['shotgun','musket','handcannon'].includes(src)||boss;
 let S=GS[src];if(!S)S={h:'fly',b:'fall',st:.42,g:big?15:8,l:big?3:1,k:big?6:2,sp:big?1.5:1,all:big&&blast0};
 S=Object.assign({hv:1,st:.4,g:6,l:1,k:2,sp:1,shk:0},S);const bs=boss?1.8:1,ch=!!S.ch,ac=!!S.acid||ty=='bloat';
 const col=ch?'#1c1410':pal?pal.c:ty=='bloat'||ty=='vine'?'#6a8a30':boss?'#5a1818':'#8a1c1c',fl=ch?['#241812','#1a100c','#2e2018','#120c0a']:ac?['#7ac838','#5a9a28','#9ad84a','#4a8420']:pal?pal.l:['#8a1c1c','#6a1218','#a02a30','#7a1a22'];
 const dir=()=>a==null?R(0,6.28):a+R(-1.1,1.1),sp=v=>v*S.sp*R(.6,1.1);
 const mk=(t,o)=>{if(gibs.length>260){const q=gibs.shift();q.rest=1;paintGib(bx,q,q.x,q.y)}const th=o.th!=null?o.th:dir(),v=o.v;gibs.push({t,x:m.x,y:m.y,z:o.z!=null?o.z:6,vx:Math.cos(th)*v,vy:Math.sin(th)*v,vz:o.vz||0,r:o.r!=null?o.r:R(0,6.28),vr:o.vr!=null?o.vr:R(-14,14),c:o.c||col,s:o.s||1,age:0,bn:0,bl:o.bl||0,hm:o.hm,c2:o.c2,bk:o.bk,fire:o.fire,bolt:o.bolt,fall:o.fall,st:o.st,tr:o.tr,sp:o.sp,cr:o.cr,burn:o.burn})};
 const hm=pal&&pal.hm,hp={hm:hm,c2:pal&&pal.c2,bk:pal&&pal.bk},fire=S.fire?1:0,fz=()=>S.blast?(Math.random()<.55?1:0):fire;
 // head
 if(heady){const hz=9*sc;
  if(S.h=='fly')mk('head',{v:sp(110)*S.hv,vz:R(120,210)*(S.sp>1.3?1.2:1)*(S.hz||1),z:hz,s:sc,c:col,bl:1.6,...hp,fire});
  else if(S.h=='bolt'){const tb=a==null?null:a+R(-.12,.12);mk('head',{v:sp(150)*S.hv,vz:R(30,90),z:hz,s:sc,c:col,bl:1.2,bolt:1,th:tb,r:tb,vr:R(-2,2),...hp})}
  else if(S.h=='char')mk('head',{v:sp(70),vz:R(60,110),z:hz,s:sc,c:col,bl:0,fire:1,...hp});
  else if(S.h=='pop'||S.h=='mush'||S.h=='vap'){const vp=S.h=='vap',mu=S.h=='mush',n=vp?0:mu?24:6;for(let i=0;i<n;i++)mk('chunk',{v:sp(R(80,190)),vz:R(80,230),z:hz,c:i%2?'#e8d8b0':'#c0405e',s:sc*(mu?.75:1.2),bl:.4});if(!mu&&!vp){mk('bone',{v:sp(120),vz:R(120,200),z:hz});mk('bone',{v:sp(120),vz:R(120,200),z:hz})}
   burst(m.x,m.y-6,vp?60:S.h=='pop'?38:30,150,'#e8909a',0,a);burst(m.x,m.y-6,vp?30:16,110,'#8a1018',0,a);if(vp)burst(m.x,m.y-6,18,70,'#fff0e8',0);spray(m.x,m.y,hz+2,a,vp?70:S.h=='pop'?55:40,210);shake=Math.max(shake,vp?5:S.h=='pop'?4:3)}}
 // body
 if(heady&&S.b!='none'){const th=a==null?R(0,6.28):a,bn=S.b=='burn',bc=ch&&!bn?'#1c1410':pal?pal.l[0]:bn?(boss?'#5a1818':'#8a1c1c'):col,bc2=ch&&!bn?'#120c0a':pal?'#1d1a24':boss?'#2a0606':'#4a0c0c',tr=(Math.random()<.5?1:-1)*1.57;
  if(S.b=='throw')mk('body',{th,v:sp(150),vz:R(110,170),z:6,s:sc,c:bc,c2:bc2,vr:(Math.random()<.5?1:-1)*R(10,16)*(S.spin||1),bl:1,sp:1});
  else mk('body',{th,v:R(14,30)*S.sp,vz:0,z:0,s:sc,c:bc,c2:bc2,fall:1,st:S.st,tr,r:0,vr:0,sp:S.b=='fall'&&S.h!='char'?1:0,fire,cr:S.cr,burn:bn})}
 // limbs, guts, bones
 const nl=ty=='skitter'?Math.min(S.l,1):S.l;for(let i=0;i<nl;i++)mk('limb',{v:sp(130),vz:R(80,170)*(S.hi||1),c:fl[i%4],s:sc,bl:ch||ac?0:.8,fire:fz()});
 const ng=Math.round(S.g*bs),gc=ch?['#2a1a14','#1a100c','#34241c','#120c0a']:ac?['#9ad84a','#6aa82a','#b8e868','#4a8a1e']:['#c0405e','#8a1c2c','#a02a30','#d0607e'];for(let i=0;i<ng;i++)mk(i%3||ac?'chunk':'gut',{v:sp(R(60,170)),vz:R(50,190)*(S.hi||1),c:gc[i%4],s:sc*(ac?1.3:1),bl:ch||ac?0:.5,th:S.all?R(0,6.28):null,fire:fz()});
 const nb=Math.round(S.k*bs);for(let i=0;i<nb;i++)mk('bone',{v:sp(R(80,200)),vz:R(80,200)*(S.hi||1),s:1,th:R(0,6.28),fire:fz()});
 // stump spurt for styles with no animated body
 if(heady&&S.h!='none'&&S.h!='char'&&S.b!='fall'&&S.b!='throw'&&!S.blast)spurts.push({x:m.x,y:m.y,z:8*sc,t:boss?1.6:1,a,sc});
 // blood / scorch / effects
 const n0=Math.round((14+S.sp*14)*bs*(ch?.15:1)*(S.q?.5:1));if(n0>0)spray(m.x,m.y,6*sc,a,n0,150,ac);
 const pr=(boss?22:S.sp>1.3?15:9)*sc*.8+4;
 if(ch){scorch(m.x,m.y,pr*1.1);burst(m.x,m.y,18,60,'#ff8a20',0);burst(m.x,m.y,10,40,'#3a3a3a',0)}
 else{pool(m.x,m.y,pr,boss?10:S.sp>1.3?7:4,ac);splat(m.x,m.y,Math.round((boss?70:S.sp>1.3?46:26)*(S.q?.5:1)),boss?40:S.sp>1.3?24:14,ac)}
 if(S.blast){scorch(m.x,m.y,30);scorch(m.x,m.y,42);burst(m.x,m.y,34,210,'#ffe070',0);burst(m.x,m.y,30,150,'#ff9a30',0);burst(m.x,m.y,14,90,'#3a3a3a',0)}
 if(S.slash){spray(m.x,m.y,10,a==null?null:a+1.2,10,180);spray(m.x,m.y,10,a==null?null:a-1.2,10,180);if(a!=null){bx.strokeStyle='rgba(110,6,14,.55)';bx.lineWidth=2.5;bx.beginPath();bx.moveTo(m.x-Math.cos(a)*10,m.y-Math.sin(a)*10);bx.lineTo(m.x+Math.cos(a)*34,m.y+Math.sin(a)*34);bx.stroke()}}
 if(S.shk)shake=Math.max(shake,S.shk)}
function bodyUpd(g,dt){g.x+=g.vx*dt;g.y+=g.vy*dt;g.vx*=1-3*dt;g.vy*=1-3*dt;if(hit(g.x,g.y,3)){g.vx=g.vy=0}
 if(g.burn&&g.age<g.st){g.vx+=R(-60,60)*dt;g.vy+=R(-60,60)*dt}if(g.age<g.st)g.r=g.burn?Math.sin(g.age*13)*.32:Math.sin(g.age*20)*.14;else g.r+=(g.tr-g.r)*Math.min(1,dt*(g.cr||6));if(g.burn&&g.age>=g.st&&!g.chd){g.chd=1;g.c='#1c1410';g.c2='#120c0a'}
 if(g.sp&&g.age<g.st+.6&&Math.random()<dt*45&&drops.length<700)drops.push({x:g.x,y:g.y,z:(9-6*Math.min(1,Math.abs(g.r)/1.4))*g.s,vx:R(-14,14),vy:R(-14,14),vz:R(60,140)});
 if(g.fire&&g.age<2.4&&Math.random()<dt*40)parts.push({x:g.x+R(-3,3),y:g.y-R(0,9)*g.s,vx:R(-8,8),vy:-R(20,50),l:R(.3,.6),c:Math.random()<.5?'#ff8a20':'#ffd060',s:0});
 if(g.age>g.st+(g.cr&&g.cr<4?1.7:g.burn?1.6:.8)){g.r=g.tr;g.rest=1}}
function gibUpd(dt){
 for(const e of spurts){e.t-=dt;const n=e.t>.5?3:1;for(let i=0;i<n;i++){const t=R(0,6.28),v=R(10,45);if(drops.length<700)drops.push({x:e.x,y:e.y,z:e.z,vx:Math.cos(t)*v,vy:Math.sin(t)*v,vz:R(80,170)*(e.t>.5?1:.6)})}}
 spurts=spurts.filter(e=>e.t>0);
 for(const d of drops){d.vz-=520*dt;d.z+=d.vz*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;if(d.z<=0){d.dead=1;const v=Math.hypot(d.vx,d.vy);bx.fillStyle=d.gr?`rgba(${80+R(0,40)|0},${170+R(0,60)|0},30,${R(.55,.85)})`:`rgba(${95+R(0,35)|0},6,${12+R(0,16)|0},${R(.55,.85)})`;bx.beginPath();bx.ellipse(d.x,d.y,R(.8,1.6)+v*.01,R(.5,1.1),Math.atan2(d.vy,d.vx),0,7);bx.fill()}else if(hit(d.x,d.y,1))d.dead=1}
 drops=drops.filter(d=>!d.dead);
 let cut=0;for(const g of gibs){g.age+=dt;if(g.fall){bodyUpd(g,dt);if(g.rest){g.fire?scorch(g.x,g.y,7*g.s):pool(g.x,g.y,7*g.s,3);paintGib(bx,g,g.x,g.y);cut=1}continue}g.vz-=520*dt;g.z+=g.vz*dt;const ox=g.x,oy=g.y;g.x+=g.vx*dt;g.y+=g.vy*dt;g.r+=g.vr*dt;if(g.fire&&g.age<2.2&&Math.random()<dt*26)parts.push({x:g.x+R(-2,2),y:g.y-g.z-R(0,3),vx:R(-10,10),vy:-R(15,45),l:R(.25,.5),c:Math.random()<.5?'#ff8a20':'#ffd060',s:0});
  if(hit(g.x,g.y,2)){g.x=ox;g.y=oy;g.vx*=-.4;g.vy*=-.4}
  if(g.z>0){if(g.bl>0&&Math.random()<dt*28){g.bl-=dt;if(drops.length<700)drops.push({x:g.x,y:g.y,z:g.z,vx:R(-12,12),vy:R(-12,12),vz:R(0,25)})}}
  else{g.z=0;const bounce=Math.abs(g.vz)>45&&g.bn<3;if(bounce){g.vz=-g.vz*.45;g.vx*=.65;g.vy*=.65;g.vr*=.65;g.bn++;pool(g.x,g.y,g.t=='head'?4*g.s:2.5,1);spray(g.x,g.y,1,null,g.t=='head'?6:2,50)}else{g.vz=0;const f=Math.exp(-(g.t=='head'?2.6:4.2)*dt);g.vx*=f;g.vy*=f;const v=Math.hypot(g.vx,g.vy);g.vr=g.t=='head'?v*.28*(g.vr<0?-1:1):g.vr*f;
   if(g.bl>0&&v>6){g.bl-=dt*.5;bx.fillStyle='rgba(96,6,14,.5)';bx.beginPath();bx.ellipse(g.x,g.y,2*g.s,1.3*g.s,Math.atan2(g.vy,g.vx),0,7);bx.fill()}
   if(v<7)g.rest=1}}
  if(g.rest){if(g.t=='head'||g.t=='body')g.fire?scorch(g.x,g.y,5*g.s):pool(g.x,g.y,5*g.s,2);paintGib(bx,g,g.x,g.y);cut=1}}
 if(cut)gibs=gibs.filter(g=>!g.rest)}
// ---- player death: gibs + spectate whoever killed you ----
let lastK=null;
function palFor(sk){const K=SKINS[sk]||SKINS.warden||{};return{c:K.hood||'#2b2433',c2:K.mask||'#d8d0c0',bk:K.beak||'',hm:1,l:[K.coat||'#4a4640',K.coat2||'#5a564e',K.hood||'#3a3732','#8a1c1c']}}
function die(){if(P.dead)return;const k=lastK;lastK=null;P.dead=1;P.cx=P.x;P.cy=P.y;
 try{const kp=k&&k.m?k.m:k&&k.p!=null&&mp.on?mp.rp[k.p]:null,ka=kp?Math.atan2(P.y-kp.y,P.x-kp.x):null;gore({x:P.x,y:P.y,ty:'imp'},ka,70,k&&k.s?k.s:'melee',palFor(sel.skin));pool(P.x,P.y,18,8);splat(P.x,P.y,50,26);shake=Math.max(shake,9)}catch(e){}
 if(mp.on&&!P.dsent){P.dsent=1;P.dsending=1;try{mpDie()}finally{P.dsending=0}}
 P.spt=k&&k.m&&k.m.hp>0?{m:k.m}:k&&k.p!=null?{p:k.p}:null;P.sx=P.cx;P.sy=P.cy;P.sa2=0;P.x=P.y=-5000;
 say('You died. Spectating your killer \u2014 press Leave the Breach when ready.',8)}
function specGet(){const s=P.spt;if(s){if(s.m&&s.m.hp>0)return s.m;if(s.p!=null&&mp.on){const r=mp.rp[s.p];if(r&&r.hp>0)return r}}
 let t=null,bd=700;const c=o=>{const d=D(o.x,o.y,P.sx,P.sy);if(d<bd){bd=d;t=o}};M.forEach(m=>{if(m.hp>0)c(m)});if(mp.on)for(const[id,r]of Object.entries(mp.rp))if(r.hp>0)c(r);
 if(t){const id=Object.entries(mp.rp||{}).find(([i,r])=>r===t);P.spt=id?{p:+id[0]}:{m:t}}return t}
function specTick(dt){const t=specGet();if(t){const k=Math.min(1,dt*4);P.sx+=(t.x-P.sx)*k;P.sy+=(t.y-P.sy)*k;P.sa2=t.a||0}}
function specName(){const t=specGet();if(!t)return 'nothing left alive';if(t.boss)return BOSS[boss].n;if(t.ty)return t.ty[0].toUpperCase()+t.ty.slice(1);return t.h!==undefined&&t.sk?(t.nm||'a rival hunter'):'a hunter'}
function drawDead(){if(!P.dead)return;ctx.save();ctx.fillStyle='rgba(30,0,4,.35)';ctx.fillRect(0,0,VW,VH);ctx.font='bold 26px monospace';tx('YOU DIED',VW/2,VH/2-70,'#c01824','center');ctx.font='bold 10px monospace';const t=specGet();tx(t?'Spectating your killer: '+specName():'Nothing left to watch',VW/2,VH/2-50,'#e8c8c8','center');
 const bx0=VW/2-62,by0=VH-64,hov=mouse.x>bx0&&mouse.x<bx0+124&&mouse.y>by0&&mouse.y<by0+22;ctx.fillStyle=hov?'#8a1c1c':'#4a0e12';ctx.fillRect(bx0,by0,124,22);ctx.strokeStyle='#e8e6d8';ctx.lineWidth=1;ctx.strokeRect(bx0+.5,by0+.5,124,22);ctx.font='bold 10px monospace';tx('Leave the Breach',VW/2,by0+15,'#fff','center');tx('(or press Enter)',VW/2,by0+36,'#a88','center');ctx.restore()}
function drawMob(m,x,y,f){const t=m.ty||'imp',sc=t=='skitter'?.75:t=='brute'?1.5:1;
 if(t=='bloat'){shadow(x,y,6);const pz=Math.sin(T*4+m.wk)*.8;ctx.fillStyle=f?'#fff':'#6a8a30';ctx.beginPath();ctx.ellipse(x,y-3,6+pz,5.5-pz*.5,0,0,7);ctx.fill();ctx.fillStyle=f?'#fff':'#9aba50';ctx.fillRect(x-3,y-6,2,2);ctx.fillRect(x+1,y-1,2,2);ctx.fillStyle='#ffd23a';ctx.fillRect(x-2,y-4,1,1);ctx.fillRect(x+1,y-4,1,1);ctx.fillStyle=f?'#fff':'#4a6020';ctx.fillRect(x-2,y+1,4,1);return}
 if(t=='vine'&&m.fi&&T<m.lw){ctx.strokeStyle='rgba(255,40,50,'+(.25+.5*(1-(m.lw-T)/.7))+')';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(x,y-2);ctx.lineTo(x+Math.cos(m.la)*135,y-2+Math.sin(m.la)*135);ctx.stroke();ctx.setLineDash([])}
 if(t=='vine'&&T<(m.lf||0)){ctx.strokeStyle='#c01828';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y-2);ctx.quadraticCurveTo(x+Math.cos(m.la)*70+Math.sin(m.la)*6,y-2+Math.sin(m.la)*70-Math.cos(m.la)*6,x+Math.cos(m.la)*135,y-2+Math.sin(m.la)*135);ctx.stroke();ctx.strokeStyle='#ff6a6a';ctx.lineWidth=1;ctx.stroke()}
 ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);
 if(t=='skitter')drawImp(0,0,m.a||0,f,m.wk,'#b8a070','#6a5a38');else if(t=='brute')drawImp(0,0,m.a||0,f,m.wk,'#4a2a30','#1a0c10');else if(t=='vine')drawImp(0,0,m.a||0,f,m.wk,'#5a1a30','#2a0a18');else drawImp(0,0,m.a||0,f,m.wk);
 if(t=='vine'&&!f){ctx.strokeStyle='#a01828';ctx.lineWidth=1.2;for(let i=-1;i<2;i++){ctx.beginPath();ctx.moveTo(i*3,3);ctx.quadraticCurveTo(i*7+Math.sin(T*3+i)*3,-3,i*9+Math.sin(T*4+i)*2,8);ctx.stroke()}}
 if(t=='brute'&&!f){ctx.fillStyle='#e8d8b0';ctx.fillRect(-5,-6,1,3);ctx.fillRect(4,-6,1,3)}
 ctx.restore()}
const CT={s:{a:()=>stash,c:SC,r:SR,e:'#sg'},b:{a:()=>sel.bag,c:4,r:4,e:'#bg'}};
function stashBody(){const sl=(id,lab,w,h)=>{const it=slotGet(id);return `<div class=slot data-sl=${id} style="width:calc(var(--cs)*${w});height:calc(var(--cs)*${h})"><span>${lab}</span>${it?`<div class=it data-sl=${id} data-ik=${it.k}></div>`:''}</div>`};
 const grid=(arr,ct)=>arr.map((o,i)=>{const[w,h]=isz(o.k);return `<div class=it data-ct=${ct} data-g=${i} data-ik=${o.k} style="left:calc(var(--cs)*${o.x});top:calc(var(--cs)*${o.y});width:calc(var(--cs)*${w});height:calc(var(--cs)*${h})"></div>`}).join('');
 return `<div class=stw><div class=eq><h2>Gear</h2>${sl('p','Primary',4,2)}<div class=eqt>${sl('s','Sidearm',2,2)}${sl('t0','Tool',2,2)}${sl('t1','Tool',2,2)}</div><h2>Backpack <small>(16 squares)</small></h2><div class=sgrid id=bg style="--gc:4;--gr:4">${grid(sel.bag,'b')}</div></div><div><h2>Stash</h2><div class=sgrid id=sg style="--gc:20;--gr:8">${grid(stash,'s')}</div></div></div><div class=foot><span>Cash: $${bank}</span><span style="opacity:.6">Shift-drag or right-click a stack to split it</span><button data-so=1>Auto-sort</button><button data-v=shop>Gunsmith</button>${back}</div>`}
function stashInit(){$('#menu').querySelectorAll('.it').forEach(el=>{const k=el.dataset.ik,sid=el.dataset.sl,ct=el.dataset.ct,o=sid?slotGet(sid):CT[ct].a()[+el.dataset.g];el.appendChild(itemCv(k,el.offsetWidth*2,el.offsetHeight*2));if(TOOL[k]){const b=document.createElement('b');b.textContent='x'+(o.n||1);el.appendChild(b)}el.onpointerdown=e=>{if(e.button)return;startDrag(e,el,k,sid,ct,el.dataset.g,o)};if(!sid&&TOOL[k])el.oncontextmenu=e=>{e.preventDefault();splitOne(ct,o)}})}
function splitOne(ct,o){if(!o||!TOOL[o.k]||(o.n||1)<2)return;for(const c of [ct,ct=='b'?'s':'b']){const C=CT[c],a=C.a(),f=spotIn(a,C.c,C.r,o.k);if(f){o.n--;a.push({k:o.k,x:f[0],y:f[1],n:1});SAVE();menu();return}}note='No room to split that stack.';menu()}
let drg=null;
const gRect=id=>{const g=$(id),r=g.getBoundingClientRect();return{l:r.left+g.clientLeft,t:r.top+g.clientTop,w:g.clientWidth,h:g.clientHeight}};
function startDrag(e,el,k,sid,ct,gi,o){e.preventDefault();const[w,h]=isz(k),cs=$('#sg').clientWidth/SC,gh=document.createElement('div');gh.className='ghost';gh.style.width=w*cs+'px';gh.style.height=h*cs+'px';gh.appendChild(itemCv(k,w*64,h*64));document.body.appendChild(gh);
 const hl=document.createElement('div');hl.className='hl';hl.style.display='none';document.body.appendChild(hl);const sp=!!(e.shiftKey&&!sid&&TOOL[k]&&(o.n||1)>1);if(sp){const o1={k,x:-9,y:-9,n:1};drg={k,sid,ct,gi,o:o1,split:o,w,h,cs,gh,hl,t:null}}else{el.style.opacity=.25;drg={k,sid,ct,gi,o,w,h,cs,gh,hl,t:null}}dragMove(e);
 addEventListener('pointermove',dragMove);addEventListener('pointerup',dragEnd,{once:true});addEventListener('pointercancel',dragEnd,{once:true})}
function dragMove(e){const d=drg;if(!d)return;const cs=d.cs;d.gh.style.left=e.clientX-d.w*cs/2+'px';d.gh.style.top=e.clientY-d.h*cs/2+'px';
 document.querySelectorAll('.slot').forEach(x=>x.classList.remove('ok','no'));d.hl.style.display='none';d.t=null;
 for(const c of ['s','b']){const C=CT[c],G=gRect(C.e);if(e.clientX>G.l&&e.clientX<G.l+G.w&&e.clientY>G.t&&e.clientY<G.t+G.h){
   const arr=C.a(),gx=Math.round((e.clientX-d.w*cs/2-G.l)/cs),gy=Math.round((e.clientY-d.h*cs/2-G.t)/cs),px=Math.floor((e.clientX-G.l)/cs),py=Math.floor((e.clientY-G.t)/cs),src=!d.sid&&!d.split&&d.ct==c?arr[+d.gi]:null;
   const mg=TOOL[d.k]?arr.find(o=>o!==src&&o.k==d.k&&o.n<MAXST&&px>=o.x&&px<o.x+isz(o.k)[0]&&py>=o.y&&py<o.y+isz(o.k)[1]):null;
   let ok2,x=gx,y=gy,w=d.w,h=d.h;if(mg){ok2=1;x=mg.x;y=mg.y;[w,h]=isz(mg.k)}else ok2=fitsIn(arr,C.c,C.r,gx,gy,d.w,d.h,src);
   d.t={c,x:gx,y:gy,ok:ok2,mg};Object.assign(d.hl.style,{display:'block',left:G.l+x*cs+'px',top:G.t+y*cs+'px',width:w*cs+'px',height:h*cs+'px'});d.hl.className='hl'+(ok2?'':' no');return}}
 const sl=document.elementsFromPoint(e.clientX,e.clientY).map(x=>x.closest&&x.closest('.slot')).find(Boolean);
 if(sl){const id=sl.dataset.sl,old=slotGet(id),okk=accepts(id,d.k)&&id!=d.sid&&!(old&&old.k==d.k&&old.n>=MAXST);d.t={s:id,ok:okk};sl.classList.add(okk?'ok':'no')}}
function take(d){if(d.split){d.split.n--;return}if(d.sid)slotSet(d.sid,null);else{const a=CT[d.ct].a(),i=a.indexOf(d.o);if(i>=0)a.splice(i,1)}}
function dragEnd(){const d=drg;if(!d)return;drg=null;removeEventListener('pointermove',dragMove);d.gh.remove();d.hl.remove();const t=d.t,o=d.o;let ch=0;
 const mergeInto=tt=>{const mv=Math.min(MAXST-tt.n,o.n||1);tt.n+=mv;const rest=(o.n||1)-mv;if(rest>0)o.n=rest;else take(d);ch=1};
 if(t&&t.ok){
  if(t.c){const arr=CT[t.c].a();
   if(t.mg)mergeInto(t.mg);
   else if(!d.sid&&!d.split&&d.ct==t.c){o.x=t.x;o.y=t.y;ch=1}
   else{take(d);arr.push({k:d.k,x:t.x,y:t.y,n:o.n||(TOOL[d.k]?1:0)});ch=1}}
  else{const id=t.s,old=slotGet(id);
   if(old&&old.k==d.k&&TOOL[d.k])mergeInto(old);
   else if(d.split){if(!old){slotSet(id,{k:d.k,n:1});take(d);ch=1}}
   else if(d.sid){if(!old||accepts(d.sid,old.k)){slotSet(d.sid,old);slotSet(id,{k:d.k,n:o.n});ch=1}}
   else{const C=CT[d.ct],a=C.a(),i=a.indexOf(o);a.splice(i,1);
    if(old){const z=isz(old.k),q=fitsIn(a,C.c,C.r,o.x,o.y,z[0],z[1])?[o.x,o.y]:spotIn(a,C.c,C.r,old.k);if(!q)a.splice(i,0,o);else{a.push({k:old.k,x:q[0],y:q[1],n:old.n||(TOOL[old.k]?1:0)});slotSet(id,{k:d.k,n:o.n});ch=1}}
    else{slotSet(id,{k:d.k,n:o.n});ch=1}}}}
 if(ch)SAVE();menu()}
function newGame(){
 boss=Object.keys(BOSS)[Math.random()*Object.keys(BOSS).length|0];showMap=0;genGround();walls=[];blds=[];
 camp=edgePt();exts=[];for(let t=0;exts.length<2&&t<500;t++){const p=edgePt();if(D(p.x,p.y,camp.x,camp.y)>1000&&exts.every(e=>D(p.x,p.y,e.x,e.y)>800))exts.push(p)}
mis=ledgerTask();trees=[];M=[];bul=[];eb=[];bombs=[];lobs=[];fires=[];flares=[];parts=[];traps=[];gibs=[];drops=[];spurts=[];found=0;bossOpen=0;seals=[];banished=0;corpse=null;bty=null;bn=null;
 for(let t=0;blds.length<7&&t<2500;t++){const w=R(210,300)|0,h=R(150,210)|0,x=R(120,WW-w-120)|0,y=R(120,WH-h-120)|0,b={x,y,w,h};planWing(b);const e=bExt(b);
  if(blds.some(o=>{const q=bExt(o);return e.x<q.x+q.w+50&&e.x+e.w+50>q.x&&e.y<q.y+q.h+50&&e.y+e.h+50>q.y})||D(cl(camp.x,e.x,e.x+e.w),cl(camp.y,e.y,e.y+e.h),camp.x,camp.y)<220)continue;blds.push(b)}
 blds.forEach((b,i)=>{b.ty=i%7;b.cx=b.x+b.w/2;b.cy=b.y+b.h/2;WK=b.ty;buildWalls(b);WK=-1});
 const sp=camp,far=[...blds].sort((a,b)=>D(b.cx,b.cy,sp.x,sp.y)-D(a.cx,a.cy,sp.x,sp.y)),bb=far[0],oth=far.slice(1).sort(()=>Math.random()-.5);
 clues=oth.slice(0,3).map(b=>({x:b.cx+R(-30,30),y:b.cy+R(-20,20),got:0}));
 for(let i=0;i<100;i++){const x=R(30,WW-30),y=R(30,WH-30);if(blds.some(b=>{const e=bExt(b);return x>e.x-25&&x<e.x+e.w+25&&y>e.y-25&&y<e.y+e.h+25})||D(x,y,sp.x,sp.y)<120||exts.some(e=>D(x,y,e.x,e.y)<60))continue;trees.push({x,y});W(x-2,y-3,4,4,1)}
 genBuildings(bb);genExits();sealBoss(bb);
 const B=BOSS[boss];M.push({boss:1,bb:bb,bh:B.bh,x:bb.cx,y:bb.cy,hx:bb.cx,hy:bb.cy,hp:B.hp,mh:B.hp,st:'idle',wt:0,cd:2,fl:0,dash:0,wk:0});
 for(let i=0;i<32;i++){let x,y,t=0;do{const b=i<16?blds[i%blds.length]:null;x=b?b.cx+R(-b.w/3,b.w/3):R(60,WW-60);y=b?b.cy+R(-b.h/3,b.h/3):R(60,WH-60)}while((hit(x,y,6)||D(x,y,sp.x,sp.y)<350)&&t++<30);M.push(mkMob(x,y,'idle'))}
 items=[];const pk=(x,y)=>{const q=Math.random();let it;if(q<.26)it={t:'ammo'};else if(q<.42)it={t:'tonic'};else if(q<.55)it={t:'bomb'};else if(q<.68)it={t:'tool',k:XT[R(0,XT.length)|0]};else{const s=Math.random()<.55?0:1,ks=Object.keys(s?SID:PRI).filter(k=>k!='none');it={t:'wpn',s,k:ks[R(0,ks.length)|0]}}it.x=x;it.y=y;items.push(it)};
 blds.forEach(b=>{for(let i=0;i<3;i++)pk(b.x+R(25,b.w-25),b.y+R(25,b.h-25))});for(let i=0;i<16;i++){const x=R(60,WW-60),y=R(60,WH-60);if(!hit(x,y,8))pk(x,y)}
 const pw=[sel.pri!='none'?PRI[sel.pri]:null,sel.side!='none'?SID[sel.side]:null];
 P={x:sp.x,y:sp.y,hp:100,st:100,w:pw,bag:(sel.bag||[]).map(o=>({...o})),cur:pw[0]?0:1,mag:pw.map(w=>w?w.m:0),res:pw.map((w,i)=>w?w.m*3+(w.d?(xa[i]|0)*w.m:0):0),rl:0,cd:0,mc:0,tn:(sel.tools.find(t=>t&&t.k=='tonic')||{n:0}).n,bm:(sel.tools.find(t=>t&&t.k=='bomb')||{n:0}).n,xt:Object.fromEntries(XT.map(k=>[k,(sel.tools.find(t=>t&&t.k==k)||{n:0}).n])),wd:0,hf:0,wk:0,sl:0,carry:0,bp:0,ep:0,face:0,sa:0,nz:0,lf:0};
 xa=[0,0];invOpen=0;mode='play';$('#menu').style.display='none';say('Burn 3 sigils to unseal the demon\'s door, then hunt it.'+(mis.t=='none'?'':' Ledger: '+tText(mis)+'.'),6)}
