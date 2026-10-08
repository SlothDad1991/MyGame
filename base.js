// Functions that other files wrap/patch while loading.
// They must be defined before the rest of the game scripts run.
function shoot(){if(P.cur>1){if(P.cd<=0){P.cd=.5;mouse.l=0;P.cur==2?useTonic():P.cur==3?throwBomb():useXT(XT[P.cur-4])}return}const w=P.w[P.cur];if(!w&&P.cur<2){if(P.cd<=0&&P.mc<=0){P.cd=.5;melee()}return}if(!w||!w.d||P.rl>0||P.cd>0)return;if(P.mag[P.cur]<=0)return reload();
 P.mag[P.cur]--;P.cd=w.r;const a=P.face,mzx=P.x+Math.cos(a)*8,mzy=P.y+Math.sin(a)*8;let mzb=0;for(let k=1;k<=4;k++)if(hit(P.x+(mzx-P.x)*k/4,P.y+(mzy-P.y)*k/4,.5)){mzb=1;break}if(mzb)burst(P.x+Math.cos(a)*4,P.y+Math.sin(a)*4,4,50,'#aaa',0);else for(let i=0;i<w.p;i++){const t=a+R(-w.s,w.s);bul.push({x:mzx,y:mzy,vx:Math.cos(t)*w.sp,vy:Math.sin(t)*w.sp,d:w.d,wk:w.k,l:w.l||.7})}
 noise(P.x,P.y,w.nz);P.lf=.06;shake=Math.max(shake,w.p>1?3:2);burst(P.x+Math.cos(a)*10,P.y+Math.sin(a)*10,4,90,'#ffd27a',0,a)}
function end(w){mode='menu';scr='hub';const lm=w?ledgerCommit():'';if(w){bank+=P.carry;sel.pri=P.w[0]?P.w[0].k:'none';sel.side=P.w[1]?P.w[1].k:'none';sel.bag=P.bag;{const a=TKS.map(k=>TC(k)>0&&{k,n:TC(k)}).filter(Boolean);sel.tools=[a[0]||null,a[1]||null];a.slice(2).forEach(o=>addItem(o.k,o.n))}}else{sel.pri='none';sel.side='none';sel.bag=[];sel.tools=[null,null]}invOpen=0;genMissions();{const c=curL();mi=Math.max(0,LEDGERS.findIndex(l=>c&&l.id==c.id))}bank=Math.max(bank,120);SAVE();menu(w?(lm+(P.carry?`Escaped with the bounty! +$${P.carry}`:'You escaped... empty-handed.')):'You died. Everything your character carried is lost. Your stash is safe.'+(()=>{const r=RWD;RWD='';return r})())}
function update(dt){
 if(P.dead){keys={};mouse.l=mouse.r=0;specTick(dt)}
 T+=dt;P.wd=Math.max(0,(P.wd||0)-dt);msgT-=dt;shake=Math.max(0,shake-dt*20);P.face=Math.atan2(mouse.y+cam.y-P.y,mouse.x+cam.x-P.x);
 const mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),my=(keys.KeyS?1:0)-(keys.KeyW?1:0),mm=Math.hypot(mx,my),spr=keys.ShiftLeft&&P.st>0&&mm&&!P.exh;
 if(mm){const s=(spr?118:68)*dt/mm;mv(P,mx*s,my*s,4);P.wk+=dt*(spr?14:9);if(spr&&(P.sl-=dt)<=0){P.sl=.5;noise(P.x,P.y,100)}}
 P.st=cl(P.st+(spr?-30:20)*dt,0,100);if(P.st<=0)P.exh=1;if(P.st>30)P.exh=0;
 P.cd-=dt;P.mc-=dt;P.hf-=dt;P.sa-=dt;P.lf-=dt;
 if(P.rl>0){P.rl-=dt;if(P.rl<=0){const w=P.w[P.cur],n=Math.min(w.m-P.mag[P.cur],P.res[P.cur]);P.mag[P.cur]+=n;P.res[P.cur]-=n}}
 if(mouse.l)shoot();if(mouse.r&&P.mc<=0)melee();
 if(keys.KeyE)clues.forEach(c=>{if(!c.got&&D(P.x,P.y,c.x,c.y)<20){c.got=1;found++;say(found<3?`Sigil ${found}/3 burned.`:`The sigil is complete - ${BOSS[boss].n}'s breach is open!`,5);burst(c.x,c.y,12,60,'#d8c890',0);if(found>=3)bossUnseal(1)}});
 if(corpse&&!banished&&!bty&&keys.KeyE&&D(P.x,P.y,corpse.x,corpse.y)<30){P.bp+=dt;if((P.nz-=dt)<=0){P.nz=1;noise(P.x,P.y,320)}if(P.bp>=5){banished=1;const bn=BOSS[boss].bo;P.carry+=bn;say('Banished! Bounty $'+bn+'. Reach an extraction point!',6)}}else P.bp=Math.max(0,P.bp-dt*2);
 P.pk=null;for(const it of items){if(D(P.x,P.y,it.x,it.y)>12)continue;
  if(it.t=='wpn'){P.pk=it;if(keys.KeyE)takeW(it);continue}
  if(it.t=='cash'){P.carry+=it.v;say('+$'+it.v+' from the fallen',3);it.got=1;continue}
  if(it.t=='ammo'){const ss=[0,1].filter(i=>P.w[i]);if(!ss.length)continue;const i=ss[R(0,ss.length)|0];P.res[i]+=Math.ceil(P.w[i].m*1.5);say('+ammo ('+P.w[i].n+')',2)}
  else if(it.t=='tool'){if(TC(it.k)>=MAXST){say(TOOL[it.k].n+' is maxed (3)',1.5);continue}TS(it.k,TC(it.k)+1);say('+'+TOOL[it.k].n,2)}
  else if(it.t=='tonic'){if(P.tn>=MAXST){say('Holy Water is maxed (3)',1.5);continue}P.tn++;say('+Holy Water',2)}else{if(P.bm>=MAXST){say('Blessed Charges are maxed (3)',1.5);continue}P.bm++;say('+Blessed Charge',2)}it.got=1}
 items=items.filter(i=>!i.got);
 const ex=exts.find(e=>!e.sealed&&D(P.x,P.y,e.x,e.y)<26);if(ex){if(P.ep<=0)say(ex.n+': hold your ground!',2.5);P.ep+=dt}else P.ep=Math.max(0,P.ep-dt*2);if(P.ep>=3)return end(1);
 const CLI=mpCli();for(const m of M){if(m.hp<=0||CLI)continue;TG=mpTgt(m);const sx0=m.x,sy0=m.y;m.ig=(m.ig||0)-dt;m.fl-=dt;m.cd-=dt;const d=D(m.x,m.y,TG.x,TG.y),a=Math.atan2(TG.y-m.y,TG.x-m.x),v=los(m.x,m.y,TG.x,TG.y);m.a=a;if(m.boss)m.st=inHouse(m.bb,TG.x,TG.y,0)?'chase':'idle';
  if(m.st=='idle'){m.wt-=dt;if(m.wt<=0){m.wa=R(0,6.28);m.wt=R(1,4);m.go=Math.random()<.6}if(m.go&&!m.boss){mv(m,Math.cos(m.wa)*20*dt,Math.sin(m.wa)*20*dt,5);m.wk+=dt*5}
   if(m.boss){m.al=(m.al||0)-dt;const sp=m.al>0?62:34,h=m.al>0?a+Math.PI+Math.sin(T*3)*.5:m.wa,qx=m.x,qy=m.y;mv(m,Math.cos(h)*sp*dt,Math.sin(h)*sp*dt,9);m.wk+=dt*5;if(Math.hypot(m.x-qx,m.y-qy)<.3*sp*dt)m.wt=0}if(!m.boss&&((d<75&&v)||d<22)&&(m.ig||0)<=0){m.st='chase';m.lt=0}}
  else{m.lt=v?Math.max(0,(m.lt||0)-dt*2):(m.lt||0)+dt;if(m.boss?0:(d>240||(m.lt>3&&d>110)||m.lt>6)){m.st='idle';m.lt=0;m.ig=2;m.wt=0}
   if(m.boss&&m.bh=='charge'){if(m.dash>0){m.dash-=dt;mv(m,Math.cos(m.da)*230*dt,Math.sin(m.da)*230*dt,9);if(!m.dh&&d<18){m.dh=1;hurtTG(35)}}
    else if(d>50&&d<200&&m.cd<=0&&v){m.dash=.55;m.da=a;m.dh=0;m.cd=3}
    else{mv(m,Math.cos(a)*62*dt,Math.sin(a)*62*dt,9);m.wk+=dt*7;if(d<20&&m.mc!==undefined&&m.mc<=0||d<20&&m.mc===undefined){m.mc=1;hurtTG(20)}}m.mc-=dt}
   else if(m.boss){const s=d<110?-70:d>150?70:0;mv(m,Math.cos(a)*s*dt,Math.sin(a)*s*dt,8);m.wk+=dt*8;
    if(m.cd<=0&&v&&d<320){m.cd=m.bh=='summon'?2:1.3;eb.push({x:m.x,y:m.y,vx:Math.cos(a)*140,vy:Math.sin(a)*140,l:3,o:m})}
    if(m.bh=='summon'&&(m.sc=(m.sc===undefined?3:m.sc)-dt)<=0){m.sc=7;if(M.filter(q=>q.hp>0&&!q.boss).length<45){for(let i=0;i<3;i++){const nx=m.x+R(-24,24),ny=m.y+R(-24,24);if(!hit(nx,ny,6)){M.push(mkMob(nx,ny,'chase',Math.random()<.7?'imp':'skitter'));burst(nx,ny,8,60,'#ff7a1a',0)}}say(BOSS[boss].n+' calls the horde!',2)}}
    if(d<16&&(m.mc=(m.mc||0)-dt)<=0){m.mc=1;hurtTG(18)}}
   else mobAI(m,a,d,v,dt)}if(m.boss){if(m.st=='chase'&&D(m.x,m.y,sx0,sy0)<.2*dt*55&&d>26){m.sg=m.sg||1;if((m.sk=(m.sk||0)-dt)<=0){m.sk=1.2;m.sg=-m.sg}mv(m,Math.cos(a+1.57*m.sg)*70*dt,Math.sin(a+1.57*m.sg)*70*dt,9)}if(!inHouse(m.bb,m.x,m.y,0)){m.x=sx0;m.y=sy0}}}
 for(const b of bul){const n=Math.ceil(Math.hypot(b.vx,b.vy)*dt/4);b.l-=dt;for(let i=0;i<n&&b.l>0;i++){b.x+=b.vx*dt/n;b.y+=b.vy*dt/n;
  if(hit(b.x,b.y,.5)){b.l=0;burst(b.x,b.y,4,50,'#aaa',0);break}
  for(const m of M)if(m.hp>0&&D(m.x,m.y,b.x,b.y)<(m.boss?11:m.ty=='brute'?9:6)){hurt(m,b.d,Math.atan2(b.vy,b.vx),b.wk);b.l=0;break}if(b.l<=0)break}}
 bul=bul.filter(b=>b.l>0);
 for(const b of eb){b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;if(hit(b.x,b.y,1))b.l=0;if(!CLI&&D(b.x,b.y,P.x,P.y)<6){b.l=0;hurtP(14,{m:b.o,s:'fire'})}if(!CLI&&mp.on&&b.l>0)for(const q of Object.values(mp.rp))if(q.hp>0&&D(b.x,b.y,q.x,q.y)<6){b.l=0;mpSend({t:'hit',to:q.id,d:14,k:'mob'});break}}eb=eb.filter(b=>b.l>0);
 for(const b of bombs){b.t-=dt;if(b.m>0){b.m-=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(hit(b.x,b.y,2)){b.x-=b.vx*dt;b.y-=b.vy*dt;b.m=0}}
  if(b.t<=0){b.dead=1;shake=10;splat(b.x,b.y,16,28);bx.fillStyle='rgba(0,0,0,.6)';bx.beginPath();bx.arc(b.x,b.y,22,0,7);bx.fill();burst(b.x,b.y,40,170,'#ff9a30',0);burst(b.x,b.y,20,130,'#6a0a10',1);noise(b.x,b.y,500);
   M.forEach(m=>{if(m.hp>0&&D(m.x,m.y,b.x,b.y)<55)hurt(m,130,Math.atan2(m.y-b.y,m.x-b.x),'bomb')});if(D(P.x,P.y,b.x,b.y)<55)hurtP(60,{s:'bomb'})}}bombs=bombs.filter(b=>!b.dead);
 gibUpd(dt);for(const p of parts){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=1-4*dt;p.vy*=1-4*dt;p.l-=dt;if(p.l<=0&&p.s){bx.fillStyle='rgba(100,8,12,.7)';bx.fillRect(p.x|0,p.y|0,2,2)}}parts=parts.filter(p=>p.l>0)}
