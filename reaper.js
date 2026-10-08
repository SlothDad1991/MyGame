// ---------- THE REAPER: a 60s timer. At zero a colossal winged demon takes you, one of 10 ways ----------
// Test helpers: add ?timer=5 to shorten the clock, ?death=0..9 to force a specific death.
const RQ=new URLSearchParams(location.search),RT0=+RQ.get('timer')||450,RFD=RQ.get('death');
const RM=['crushed in its fist','bitten in half','dropped from the heavens','torn in two','burned to ash','impaled on a claw','swallowed whole','slammed into the earth','beheaded','dragged into the pit'];
const TA=1.6,TB=2.4,CH0=105,SCR=.9,RDUR=[2.6,3.4,3.8,3.0,3.8,3.4,3.4,3.0,3.8,3.2],OUTD=2.4;
let RD=null,RWD='';
const sg=(p,a,b)=>cl((p-a)/(b-a),0,1),lp=(a,b,t)=>a+(b-a)*t,eo=t=>1-(1-t)*(1-t),ei=t=>t*t;
const rdB=(x,y)=>{try{sfx.bomb({x,y,t:0})}catch(e){}},rdH=(x,y)=>{try{sfx.hit({x,y},'melee')}catch(e){}},rdV=(k)=>{try{sfx.mob({boss:1,x:RD?RD.x:P.x,y:RD?RD.y:P.y,hp:1},k)}catch(e){}};
// gore at a point in the air: gibs and blood drops get a height so they rain down; falling bodies are dropped unless kept
function goreAt(x,y,lift,src,a,d,keep){const g0=gibs.length,d0=drops.length;gore({x,y,ty:'imp'},a,d||70,src,palFor(sel.skin));
 const nw=gibs.slice(g0);for(let i=gibs.length-1;i>=g0;i--){const g=gibs[i];if(g.fall&&!keep)gibs.splice(i,1);else if(!g.fall)g.z+=lift}
 for(let i=d0;i<drops.length;i++)drops[i].z+=lift;return nw}
function rdStart(){const f=RFD!=null&&RFD!==''&&RM[+RFD]?+RFD:Math.random()*10|0;
 RD={P,t:0,k:f,x:P.x,y:P.y,O:null,fm:{x:P.x,y:P.y,hp:1,ty:'reaper',a:0}};P.bp=0;P.ep=0;
 banner('THE REAPER HAS COME','Time is up. Nothing escapes it.','#c01824');rdV('alert')}
function rdKill(hide){const Q=RD;if(!Q||Q.dead)return;Q.dead=1;Q.gone=hide==null?1:hide;Q.fl=Q.t;
 const g0=gore,p0=pool,s0=splat;gore=()=>{};pool=()=>{};splat=()=>{};
 try{die()}finally{gore=g0;pool=p0;splat=s0}
 P.sx=Q.x;P.sy=Q.y;P.spt={m:Q.fm};{const g=!own.includes('reaper')&&(RQ.get('rskin')=='1'||Math.random()<.1);if(g){own.push('reaper');RWD=' EPIC skin unlocked: The Reaper!';try{SAVE(1)}catch(e){}}say('Taken by the Reaper: '+RM[Q.k]+'.'+(g?' EPIC skin unlocked: The Reaper!':''),8)}rdV('die')}
// ---- pose: everything the demon, its hands and the victim do, per death and per moment ----
function rdPose(Q,no){const t=Q.t,k=Q.k,O={ch:CH0,L:0,hL:null,vx:0,vr:0,vs:1,hs:18,cl:1,jaw:0,fire:0,vis:0,vb:0,fa:1,gulp:0,sp:0,half:0,sink:0,pit:0,hurt:0,phase:'A',lh:null,rh:null,p:0,hd:0},rest=ch=>[[-125*SCR,-ch+70*SCR],[125*SCR,-ch+70*SCR]];
 if(t<TA){O.ch=lp(780,CH0,eo(t/TA));O.cl=0;O.jaw=sg(t,.35,.7)*(1-sg(t,1.2,1.55));const r=rest(O.ch);O.lh=r[0];O.rh=r[1];return O}
 if(t<TB){const u=eo(sg(t,TA,TB)),r=rest(CH0);O.phase='B';O.cl=sg(t,TA+.5,TB);O.lh=[lp(r[0][0],-18,u),lp(r[0][1],-8,u)];O.rh=[lp(r[1][0],18,u),lp(r[1][1],-8,u)];return O}
 const p=(t-TB)/RDUR[k];O.p=p;
 if(p>1&&!no){const T1=TB+RDUR[k],O1=rdPose({t:T1,k,hd:0},1),u=sg(t,T1,T1+OUTD),b=eo(sg(u,0,.3)),r=rest(0),ch=O1.ch+eo(sg(u,.15,1))*760;
  const rel=(h,i)=>[lp(h[0],r[i][0],b),lp(h[1]+O1.ch,r[i][1],b)-ch];
  O1.phase='O';O1.vis=0;O1.p=p;O1.lh=rel(O1.lh,0);O1.rh=rel(O1.rh,1);O1.ch=ch;O1.cl=lp(1,0,b);O1.jaw=sg(u,.05,.25)*(1-sg(u,.55,.9));O1.fire=0;O1.hd=0;O1.pit=0;O1.sp=0;O1.gulp=0;return O1}
 O.phase='C';O.vis=1;
 switch(k){
 case 0:O.L=26*eo(sg(p,0,.35));O.hs=lp(18,5,sg(p,.25,.6));O.vs=lp(1,.5,sg(p,.25,.6));O.hurt=p>.3?1:0;break;
 case 1:{const a=eo(sg(p,0,.4));O.L=156*a;O.hs=lp(18,34,a);O.jaw=sg(p,.25,.42)*(1-sg(p,.48,.55));O.vb=O.L>110?1:0;break}
 case 2:{const RR=520;if(p<.42){O.ch=CH0+RR*eo(sg(p,0,.4));O.L=O.ch-CH0;O.vr=Math.sin(p*40)*.15}else{const tf=(p-.42)*RDUR[2];O.ch=CH0+RR+tf*260;O.L=Math.max(0,RR-1500*tf*tf);O.cl=0;O.vr=tf*14;O.lh=[-26,-O.ch+100];O.rh=[26,-O.ch+100]}O.hs=18;break}
 case 3:O.L=30*eo(sg(p,0,.2));O.hs=lp(14,86,sg(p,.2,.56));O.half=sg(p,.2,.56);O.hurt=p>.3?1:0;break;
 case 4:O.L=p<.22?34*eo(sg(p,0,.2)):lp(34,0,eo(sg(p,.22,.36)));O.cl=lp(1,0,sg(p,.2,.32));O.hs=lp(18,34,sg(p,.2,.4));O.jaw=sg(p,.22,.36)*(1-sg(p,.88,.97));O.fire=sg(p,.3,.4)*(1-sg(p,.85,.93));O.hurt=O.fire>0?1:0;O.vr=O.fire>0?Math.sin(p*70)*.22:0;break;
 case 5:O.L=64*eo(sg(p,0,.3));O.hs=30;O.sp=sg(p,.3,.4)*(1-sg(p,.86,.95));O.vr=p>.4?lp(0,-1.45,eo(sg(p,.4,.55)))+(p<.8?Math.sin(p*35)*.06:0):0;O.hurt=p>.4?1:0;break;
 case 6:{const a=eo(sg(p,0,.4));O.hL=158*a;O.L=p>.4?lp(158,176,eo(sg(p,.45,.58))):158*a;O.hs=lp(18,38,a);O.jaw=sg(p,.25,.42)*(1-sg(p,.56,.64));O.vb=O.L>100?1:0;O.vs=lp(1,.55,sg(p,.45,.58));O.cl=lp(1,0,sg(p,.4,.5));O.gulp=sg(p,.6,.95);break}
 case 7:O.L=p<.4?150*eo(sg(p,0,.35)):lp(150,0,ei(sg(p,.4,.5)));O.ch=CH0+.6*O.L;O.vr=O.L>2?Math.sin(p*50)*.14:0;break;
 case 8:{O.L=22*eo(sg(p,0,.2));const h1=eo(sg(p,.25,.4)),h2=eo(sg(p,.46,.75));if(p>=.25){let ry=lp(-O.L-8,-O.L-24,h1);if(p>=.46)ry=lp(-O.L-24,-150,h2);O.rh=[lp(18,0,h1),ry]}O.jaw=sg(p,.68,.78)*(1-sg(p,.82,.87));O.hd=Q.hd?1:0;break}
 case 9:O.pit=lp(0,40,eo(sg(p,.05,.3)))*(1-sg(p,.86,1));O.sink=eo(sg(p,.3,.58));O.hL=-O.sink*22;break;
 }
 if(!O.lh){const h=O.hL!=null?O.hL:O.L;O.lh=[O.vx-O.hs,-h-8]}
 if(!O.rh){const h=O.hL!=null?O.hL:O.L;O.rh=[O.vx+O.hs,-h-8]}
 return O}
// ---- events: the moment of each death ----
function rdEv(Q,O){const k=Q.k,p=O.p,X=Q.x+O.vx,Y=Q.y,ev=(n,c,f)=>{if(c&&!Q['e'+n]){Q['e'+n]=1;f()}};
 if(Q.t>=TB&&!Q.eG){Q.eG=1;shake=Math.max(shake,10);burst(Q.x,Q.y,10,70,'#a01018',1);try{sfx.pain()}catch(e){}rdV('snarl')}
 if(O.phase!='C')return;
 switch(k){
 case 0:ev(1,p>=.6,()=>{goreAt(X,Y,O.L,'shotgun',null,90);spray(X,Y,O.L,null,60,230);shake=14;rdB(X,Y);rdKill()});if(Q.e1&&Math.random()<.25)spray(X,Y,O.L,null,2,40);break;
 case 1:ev(1,p>=.54,()=>{goreAt(X,Y,O.L,'rifle',null,80);spray(X,Y,O.L+10,null,50,200);shake=9;rdH(X,Y);rdKill()});break;
 case 2:ev(1,p>.45&&O.L<=0,()=>{goreAt(X,Y,0,'handcannon',null,90);Q.ring=Q.t;scorch(X,Y,26);shake=18;rdB(X,Y);rdKill()});break;
 case 3:ev(1,p>=.56,()=>{goreAt(X,Y,O.L,'shotgun',null,90);const pl=palFor(sel.skin);for(const sd of[-1,1])gibs.push({t:'body',x:X+sd*O.hs*.5,y:Y,z:O.L+4,vx:sd*70,vy:R(-20,20),vz:90,r:R(0,6),vr:sd*8,c:pl.l[0],c2:'#1d1a24',s:1,age:0,bn:0,bl:1.5});spray(X,Y,O.L,null,60,220);shake=11;rdH(X,Y);rdKill()});break;
 case 4:ev(1,p>=.8,()=>{goreAt(X,Y,0,'flamer',null,50,true);fires.push({x:X,y:Y,r:18,t:3,tk:99,s:Math.random()*6});burst(X,Y,26,90,'#ff8a20',0);rdKill()});break;
 case 5:ev(1,p>=.4,()=>{spray(X,Y,O.L,0,30,190);shake=6;rdH(X,Y)});ev(2,p>=.82,()=>{goreAt(X,Y,O.L,'revolver',-.6,80);spray(X,Y,O.L,null,40,200);shake=8;rdKill()});break;
 case 6:ev(1,p>=.6,()=>{spray(X,Y,40,null,10,60);rdH(X,Y);rdKill()});break;
 case 7:ev(1,p>.45&&O.L<=.5,()=>{goreAt(X,Y,0,'musket',-1.57,90);Q.ring=Q.t;scorch(X,Y,34);shake=20;rdB(X,Y);rdKill()});break;
 case 8:ev(1,p>=.46,()=>{const nw=goreAt(X,Y,0,'melee',-1.57,70,true),h=nw.find(g=>g.t=='head');if(h){gibs.splice(gibs.indexOf(h),1);Q.hd=h}spray(X,Y,24,-1.57,40,180);shake=7;rdH(X,Y);rdKill()});
  ev(2,p>=.86,()=>{if(Q.hd){Q.hd=null;goreAt(X,Y,150,'rifle',null,60);shake=6;rdH(X,Y)}});break;
 case 9:ev(1,p>=.58,()=>{pool(X,Y,22,10);splat(X,Y,40,18);shake=8;rdH(X,Y);rdKill()});ev(2,p>=.92,()=>scorch(X,Y,24));break;
 }
 if(p>=.99&&!Q.dead)rdKill()}
// ---- art ----
function demon(cx0,cy0,sc,o){
 const f=Math.sin(T*3.4)*o.fa,J=o.jaw*34,pu=.5+.5*Math.sin(T*5);
 ctx.save();ctx.translate(cx0,cy0);ctx.scale(sc,sc);ctx.lineJoin='round';ctx.lineCap='round';
 // wings
 for(const sd of[-1,1]){
  const sh=[sd*42,-40],el=[sd*168,-188-f*40],tp=[sd*318-sd*Math.abs(f)*30,-100-f*100],fg=[[sd*340,-8-f*60],[sd*282,88-f*45],[sd*196,146-f*25],[sd*98,118-f*8]];
  const g=ctx.createLinearGradient(sd*30,0,sd*330,0);g.addColorStop(0,'#2a0610');g.addColorStop(1,'#6e1630');
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(sh[0],sh[1]);ctx.lineTo(el[0],el[1]);ctx.lineTo(tp[0],tp[1]);
  let pv=tp;for(const q of fg){const mx=(pv[0]+q[0])/2,my=(pv[1]+q[1])/2;ctx.quadraticCurveTo(mx+(tp[0]-mx)*.32,my+(tp[1]-my)*.32,q[0],q[1]);pv=q}
  ctx.lineTo(sd*30,52);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#14040a';ctx.lineWidth=5;for(const q of fg){ctx.beginPath();ctx.moveTo(tp[0],tp[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()}
  ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(sh[0],sh[1]);ctx.lineTo(el[0],el[1]);ctx.lineTo(tp[0],tp[1]);ctx.stroke();
  ctx.strokeStyle='#4a1626';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(sh[0],sh[1]);ctx.lineTo(el[0],el[1]);ctx.lineTo(tp[0],tp[1]);ctx.stroke();
  ctx.fillStyle='#d8cca8';ctx.beginPath();ctx.moveTo(el[0]-sd*6,el[1]-4);ctx.lineTo(el[0]+sd*14,el[1]-30);ctx.lineTo(el[0]+sd*8,el[1]+6);ctx.fill();
  ctx.beginPath();ctx.moveTo(tp[0]-sd*4,tp[1]-4);ctx.lineTo(tp[0]+sd*20,tp[1]-26);ctx.lineTo(tp[0]+sd*10,tp[1]+8);ctx.fill()}
 // torso, waist, glowing core
 ctx.fillStyle='#2a0b14';ctx.beginPath();ctx.moveTo(-64,-54);ctx.quadraticCurveTo(0,-76,64,-54);ctx.lineTo(46,38);ctx.quadraticCurveTo(0,66,-46,38);ctx.closePath();ctx.fill();
 ctx.fillStyle='#1a060c';ctx.beginPath();ctx.moveTo(-46,34);ctx.quadraticCurveTo(-22,100+Math.sin(T*3)*6,0,150);ctx.quadraticCurveTo(22,100+Math.sin(T*3+1)*6,46,34);ctx.closePath();ctx.fill();
 ctx.strokeStyle='#4a1626';ctx.lineWidth=3;for(let i=0;i<4;i++){const y=-34+i*17,w=44-i*4;ctx.beginPath();ctx.moveTo(-w,y);ctx.quadraticCurveTo(0,y+12,w,y);ctx.stroke()}
 ctx.beginPath();ctx.moveTo(0,-56);ctx.lineTo(0,36);ctx.stroke();
 const cg=ctx.createRadialGradient(0,-8,2,0,-8,34);cg.addColorStop(0,'rgba(255,'+((120+pu*80)|0)+',30,.95)');cg.addColorStop(1,'rgba(255,60,10,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,-8,34,0,7);ctx.fill();
 ctx.strokeStyle='#ff7a1a';ctx.lineWidth=1.6;for(const c of[[-38,-40,-26,-18],[34,-44,24,-14],[-30,10,-16,30],[28,8,18,28]]){ctx.beginPath();ctx.moveTo(c[0],c[1]);ctx.lineTo(c[2],c[3]);ctx.stroke()}
 if(o.gulp>0&&o.gulp<1){const gy=lp(-50,40,o.gulp);ctx.fillStyle='#5a1a2a';ctx.beginPath();ctx.arc(0,gy,15,0,7);ctx.fill();ctx.fillStyle='rgba(255,120,60,.35)';ctx.beginPath();ctx.arc(-3,gy-3,7,0,7);ctx.fill()}
 // horns + head
 for(const sd of[-1,1]){ctx.fillStyle='#d8cca8';ctx.beginPath();ctx.moveTo(sd*20,-118);ctx.quadraticCurveTo(sd*92,-136,sd*80,-218);ctx.quadraticCurveTo(sd*54,-150,sd*32,-100);ctx.closePath();ctx.fill();ctx.strokeStyle='#7a6a4a';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.moveTo(sd*30,-108);ctx.quadraticCurveTo(sd*60,-112,sd*70,-150);ctx.quadraticCurveTo(sd*50,-122,sd*34,-96);ctx.closePath();ctx.fill()}
 ctx.fillStyle='#3c131e';ctx.beginPath();ctx.ellipse(0,-92,36,40,0,0,7);ctx.fill();
 ctx.fillStyle='#220a12';ctx.beginPath();ctx.moveTo(-36,-96);ctx.lineTo(-10,-86);ctx.lineTo(0,-98);ctx.lineTo(10,-86);ctx.lineTo(36,-96);ctx.lineTo(30,-124);ctx.lineTo(-30,-124);ctx.closePath();ctx.fill();
 for(const sd of[-1,1]){const eg=ctx.createRadialGradient(sd*16,-96,1,sd*16,-96,22);eg.addColorStop(0,'rgba(255,210,60,.7)');eg.addColorStop(1,'rgba(255,120,20,0)');ctx.fillStyle=eg;ctx.beginPath();ctx.arc(sd*16,-96,22,0,7);ctx.fill();
  ctx.fillStyle='#ffe060';ctx.beginPath();ctx.moveTo(sd*5,-98);ctx.lineTo(sd*26,-104);ctx.lineTo(sd*23,-93);ctx.lineTo(sd*7,-92);ctx.closePath();ctx.fill();ctx.fillStyle='#200';ctx.fillRect(sd*15-1,-100,2,7);
  ctx.fillStyle='#120408';ctx.fillRect(sd*4-1,-84,2,4)}
 // mouth
 const mg=ctx.createLinearGradient(0,-72,0,-60+J);mg.addColorStop(0,'#2a0408');mg.addColorStop(1,'rgb(255,'+((50+pu*50)|0)+',20)');
 ctx.fillStyle=J>4?mg:'#2a0408';ctx.beginPath();ctx.moveTo(-26,-72);ctx.lineTo(26,-72);ctx.lineTo(22,-62+J);ctx.lineTo(-22,-62+J);ctx.closePath();ctx.fill();
 ctx.fillStyle='#efe6cc';for(let i=-3;i<=3;i++){const x=i*7;ctx.beginPath();ctx.moveTo(x-3.5,-72);ctx.lineTo(x+3.5,-72);ctx.lineTo(x,-63);ctx.fill()}
 if(o.vb&&o.vic)o.vic();
 ctx.fillStyle='#2e0e18';ctx.beginPath();ctx.moveTo(-28,-62+J);ctx.lineTo(28,-62+J);ctx.lineTo(20,-38+J);ctx.lineTo(0,-30+J);ctx.lineTo(-20,-38+J);ctx.closePath();ctx.fill();
 ctx.fillStyle='#efe6cc';for(let i=-3;i<=3;i++){const x=i*7;ctx.beginPath();ctx.moveTo(x-3.5,-62+J);ctx.lineTo(x+3.5,-62+J);ctx.lineTo(x,-72+J);ctx.fill()}
 // arms + palms
 const arm=(sd,h)=>{const s=[sd*60,-44],m=[(s[0]+h[0])/2+sd*40,(s[1]+h[1])/2-6];
  ctx.strokeStyle='#1c070e';ctx.lineWidth=32;ctx.beginPath();ctx.moveTo(s[0],s[1]);ctx.quadraticCurveTo(m[0],m[1],h[0],h[1]);ctx.stroke();
  ctx.strokeStyle='#3a1420';ctx.lineWidth=22;ctx.stroke();
  ctx.strokeStyle='#5a2434';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(s[0]-sd*4,s[1]-5);ctx.quadraticCurveTo(m[0]-sd*5,m[1]-5,h[0]-sd*4,h[1]-6);ctx.stroke();
  ctx.fillStyle='#240b14';ctx.beginPath();ctx.arc(s[0],s[1],26,0,7);ctx.fill();
  ctx.fillStyle='#d8cca8';for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(s[0]+sd*(i*9-6),s[1]-18);ctx.lineTo(s[0]+sd*(i*9-1),s[1]-38-i*4);ctx.lineTo(s[0]+sd*(i*9+5),s[1]-18);ctx.fill()}
  ctx.fillStyle='#2e0c16';ctx.beginPath();ctx.arc(h[0],h[1],21,0,7);ctx.fill();ctx.fillStyle='#4a1626';ctx.beginPath();ctx.arc(h[0]-3,h[1]-4,12,0,7);ctx.fill()};
 arm(-1,o.lh);arm(1,o.rh);
 if(!o.vb&&o.vic)o.vic();
 // claws (in front of the victim)
 const claws=(h,sd)=>{for(let i=0;i<4;i++){const a=Math.PI/2+(i-1.5)*.55*(1-.72*o.cl)+sd*.08,L=44*(1-.3*o.cl),bx=h[0]+Math.cos(a)*14,by=h[1]+Math.sin(a)*14,ex=h[0]+Math.cos(a)*(14+L),ey=h[1]+Math.sin(a)*(14+L),cx=(bx+ex)/2-sd*5*o.cl,cy=(by+ey)/2-3;
  ctx.strokeStyle='#6a5a3c';ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(cx,cy,ex,ey);ctx.stroke();ctx.strokeStyle='#e8dcc0';ctx.lineWidth=5.5;ctx.stroke()}};
 claws(o.lh,-1);claws(o.rh,1);
 if(o.hd){const g=o.hd;ctx.save();ctx.translate(o.rh[0],o.rh[1]+6);ctx.scale(2.6,2.6);paintGib(ctx,Object.assign({},g,{r:Math.sin(T*8)*.25,s:1}),0,0);ctx.restore()}
 if(o.spike){const s=o.spike,dx=s[2]-s[0],dy=s[3]-s[1],l=Math.hypot(dx,dy)||1,nx=-dy/l*7,ny=dx/l*7;ctx.fillStyle='#e8dcc0';ctx.strokeStyle='#6a5a3c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(s[0]+nx,s[1]+ny);ctx.lineTo(s[2],s[3]);ctx.lineTo(s[0]-nx,s[1]-ny);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#a01820';ctx.beginPath();ctx.arc(lp(s[0],s[2],.6),lp(s[1],s[3],.6),3.5,0,7);ctx.fill()}
 // fire breath
 if(o.fire>0&&o.tgt){const M0=[0,-64+J*.4];ctx.globalCompositeOperation='lighter';for(let i=0;i<24;i++){const u=i/23,x=lp(M0[0],o.tgt[0],u)+Math.sin(T*18+i*1.7)*(4+u*14),y=lp(M0[1],o.tgt[1],u)+Math.cos(T*15+i)*3,r=(5+u*22)*o.fire;ctx.fillStyle='rgba(255,'+((150-u*90)|0)+','+((40-u*30)|0)+','+(.33*o.fire).toFixed(3)+')';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}ctx.globalCompositeOperation='source-over'}
 ctx.restore()}
function rdLight(){if(!RD||!RD.O)return;const O=RD.O,a=sg(RD.t,0,1),px=RD.x-cam.x,py=RD.y-cam.y;light(px,py,150,.85*a);light(px,py-O.ch,230,.75*a)}
function rdDraw(){const Q=RD;if(!Q||!Q.O)return;const O=Q.O,t=Q.t,sc=SCR,px=Q.x-cam.x,py=Q.y-cam.y,cy0=py-O.ch,T1=TB+RDUR[Q.k],out=sg(t,T1+.9,T1+OUTD);
 ctx.save();
 ctx.fillStyle='rgba(50,0,8,'+(.5*sg(t,0,1.3)*(1-out)).toFixed(3)+')';ctx.fillRect(0,0,VW,VH);
 const kk=cl(1-(O.ch-90)/800,0,1),rx=40+190*kk;ctx.fillStyle='rgba(0,0,0,'+(.5*kk*(1-out)).toFixed(3)+')';ctx.beginPath();ctx.ellipse(px,py+6,rx,rx*.42,0,0,7);ctx.fill();
 if(O.vis&&O.L>6){const s=cl(1-O.L/300,.25,1);ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(px+O.vx,py+4,7*s*O.vs,3*s*O.vs,0,0,7);ctx.fill()}
 if(O.pit>.5){const r=O.pit;ctx.save();ctx.translate(px,py+3);ctx.scale(1,.5);const g=ctx.createRadialGradient(0,0,1,0,0,r*1.25);g.addColorStop(0,'#000');g.addColorStop(.6,'#2a0208');g.addColorStop(.85,'#a01418');g.addColorStop(1,'rgba(255,90,20,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r*1.25,0,7);ctx.fill();ctx.restore()}
 if(Q.ring!=null){const a=t-Q.ring;if(a<.8){ctx.strokeStyle='rgba(255,170,90,'+(.8*(1-a/.8)).toFixed(3)+')';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(px+O.vx,py,a*300,a*130,0,0,7);ctx.stroke()}}
 const lx=O.vx/sc,ly=(O.ch-O.L-6)/sc,H=h=>[h[0]/sc,(h[1]+O.ch)/sc],lh=H(O.lh),rh=H(O.rh);
 const vic=()=>{if(!O.vis)return;const pw=()=>warden(0,0,1.57,0,T*14,null,O.hurt?1:0);
  if(O.half>0){for(const s of[-1,1]){ctx.save();ctx.beginPath();if(s<0)ctx.rect(lx-80,ly-80,160,80);else ctx.rect(lx-80,ly,160,80);ctx.clip();ctx.translate(lx+s*O.half*22,ly+s*O.half*8);ctx.rotate(s*O.half*.5);pw();ctx.fillStyle='#b01820';ctx.fillRect(-7,s<0?-2:0,14,2);ctx.restore()}}
  else if(O.sink>0){ctx.save();ctx.beginPath();ctx.rect(lx-80,ly-140,160,O.ch/sc-(ly-140)+1);ctx.clip();ctx.translate(lx,ly+O.sink*34/sc);ctx.rotate(O.vr);ctx.scale(O.vs,O.vs);pw();ctx.restore()}
  else{ctx.save();ctx.translate(lx,ly);ctx.rotate(O.vr);ctx.scale(O.vs,O.vs);pw();ctx.restore()}};
 demon(px,cy0,sc,{fa:O.fa,jaw:O.jaw,fire:O.fire,gulp:O.gulp,lh,rh,cl:O.cl,vb:O.vb,vic,tgt:[lx,ly],hd:O.hd&&Q.hd?Q.hd:null,spike:O.sp>0?[rh[0],rh[1],rh[0]+(lx-rh[0])*2*O.sp,rh[1]+(ly-rh[1])*2*O.sp]:null});
 if(O.pit>.5&&O.vis){ctx.strokeStyle='#14040a';ctx.lineCap='round';for(const sd of[-1,0,1]){const bx=px+sd*O.pit*.55,sw=Math.sin(T*5+sd)*3;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(bx,py+4);ctx.quadraticCurveTo(bx+sd*8+sw,py-8,px+sd*7,py-14-O.sink*6);ctx.stroke();ctx.strokeStyle='#e8dcc0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px+sd*7,py-14-O.sink*6);ctx.lineTo(px+sd*4,py-22-O.sink*6);ctx.stroke();ctx.strokeStyle='#14040a'}}
 if(Q.fl!=null){const a=.55-(t-Q.fl)*2;if(a>0){ctx.fillStyle='rgba(255,230,200,'+a.toFixed(3)+')';ctx.fillRect(0,0,VW,VH)}}
 ctx.restore()}
function rdHud(){if(P.dead)return;const tm=P.tm===undefined?RT0:P.tm,s=Math.ceil(tm),pl=.5+.5*Math.sin(T*(tm<=10?10:5)),col=RD?'#ff2a2a':tm<=10?'rgb(255,'+((60+pl*60)|0)+','+((60+pl*40)|0)+')':tm<=30?'#ffb040':'#e8e6d8';
 ctx.font='bold 8px monospace';tx(RD?'THE REAPER':'THE REAPER COMES IN',VW/2,12,'#a05050','center');ctx.font='bold 17px monospace';tx(RD?'TIME IS UP':Math.floor(s/60)+':'+String(s%60).padStart(2,'0'),VW/2,29,col,'center');if(EVN){ctx.font='bold 9px monospace';tx('BLOOD MOON  '+Math.ceil(EVN.dur-EVN.t)+'s',VW/2,40,'rgb(255,'+((50+pl*50)|0)+',60)','center')}ctx.font='bold 10px monospace'}
