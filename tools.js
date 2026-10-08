// ---------- ANNOUNCEMENTS: boss slain, boss banished, bounty tracking ----------
function btyTake(f){if(f===mp.me||mp.out[f]||bty&&bty.h===mp.me)return;if(bty&&bty.h===f)return;const first=!bty;bty={h:f};
 if(first)banner(BOSS[boss].n+' is banished!',hn(f)+' claimed the $'+BOSS[boss].bo+' bounty - track them on the map [M]','#e0b040');
 else say(hn(f)+' picked up the bounty!',5)}
{const _h9=hurt;hurt=function(m,d,a,s){if(m.boss&&!mpFx&&!mpCli())m.lh=mpHB!=null?mpHB:mp.me;_h9(m,d,a,s)}}
{const _k9=kill;kill=function(m){const first=m.boss&&!m.ann;_k9(m);if(!first)return;m.ann=1;const w=!mp.on?null:mpCli()?mpKB:m.lh,who=w==null?'':w===mp.me?'You':hn(w);
 banner(BOSS[boss].n+' is slain!',(who?who+' landed the killing blow. ':'')+'Banish the corpse (hold E) for the $'+BOSS[boss].bo+' bounty.','#ff6a3a')}}
{const _u9=update;update=function(dt){const pb=banished,pc=P.carry,dropped=bty&&bty.h==null;_u9(dt);if(mode!='play')return;
 if(banished&&!pb){bty={h:mp.me};if(mp.on)mpSend({t:'bn'});banner(BOSS[boss].n+' is banished!','You claimed the $'+BOSS[boss].bo+' bounty - reach an exit alive!','#e0b040')}
 else if(dropped&&bty&&bty.h==null&&P.carry>pc&&D(P.x,P.y,bty.x,bty.y)<45){bty={h:mp.me};say('You picked up the bounty! Reach an exit!',5)}}}
// ---------- NEW TOOLS: Hellfire Flask, Signal Flare, Saint's Ward ----------
function lob(k){const a=Math.atan2(mouse.y+cam.y-P.y,mouse.x+cam.x-P.x),d=Math.min(160,D(P.x,P.y,mouse.x+cam.x,mouse.y+cam.y));lobs.push({k,x:P.x,y:P.y,vx:Math.cos(a)*d/.4,vy:Math.sin(a)*d/.4,m:.4})}
function useXT(k){if(!k||(P.xt[k]||0)<=0)return;
 if(k=='ward'){if(P.wd>0)return say("Saint's Ward is already active",1.5);P.xt.ward--;P.wd=10;burst(P.x,P.y,18,70,'#f0d070',0);say("Saint's Ward: damage reduced for 10s",2.5);try{sfx.heal()}catch(e){}}
 else if(k=='tripwire'){P.xt[k]--;traps.push({x:P.x+Math.cos(P.face)*10,y:P.y+Math.sin(P.face)*10,t:60,ar:.8,a:P.face});say('Tripwire set',1.5);try{sfx.thr()}catch(e){}}else{P.xt[k]--;lob(k);try{sfx.thr()}catch(e){}}
 fixSlot()}
function lobLand(b){
 if(b.k=='flask'){fires.push({x:b.x,y:b.y,r:28,t:5.5,tk:.2,s:Math.random()*6});burst(b.x,b.y,18,90,'#ff7a1a',0);shake=Math.max(shake,3);if(mp.on)mpSend({t:'ff',x:+b.x.toFixed(1),y:+b.y.toFixed(1)})}
 else{if(fgOn())say('The fog smothers the flare.',3);flares.push({x:b.x,y:b.y,t:14,tk:0,dec:1,id:-1,hp:1});burst(b.x,b.y,14,80,'#ffd070',0);if(mp.on)mpSend({t:'fl',x:+b.x.toFixed(1),y:+b.y.toFixed(1)})}}
// imps (not bosses) near a flare go for the flare instead of the hunter, and cannot hurt it
{const _tg=mpTgt;mpTgt=function(m){const r=_tg(m);if(m.boss||m.ty=='vine'||!flares.length||fgOn())return r;let b=null,bd=260;for(const f of flares){const d=D(m.x,m.y,f.x,f.y);if(d<bd){bd=d;b=f}}return b&&bd<D(m.x,m.y,r.x,r.y)+60?b:r}}
{const _ht=hurtTG;hurtTG=function(d){if(TG&&TG.dec)return;_ht(d)}}
{const _u8=update;update=function(dt){_u8(dt);if(mode!='play')return;
 for(const tr of traps){tr.t-=dt;if(tr.ar>0){tr.ar-=dt;continue}if(M.some(m=>m.hp>0&&D(m.x,m.y,tr.x,tr.y)<(m.boss?16:12))||(P.hp>0&&D(P.x,P.y,tr.x,tr.y)<10)||(mp.on&&Object.values(mp.rp).some(q=>q.hp>0&&D(q.x,q.y,tr.x,tr.y)<10))){tr.t=0;burst(tr.x,tr.y,28,150,'#ff9a30',0);burst(tr.x,tr.y,10,90,'#6a0a10',1);shake=Math.max(shake,4);noise(tr.x,tr.y,260);M.forEach(m=>{if(m.hp>0&&D(m.x,m.y,tr.x,tr.y)<46)hurt(m,55,Math.atan2(m.y-tr.y,m.x-tr.x),'tripwire')});if(P.hp>0&&D(P.x,P.y,tr.x,tr.y)<46)hurtP(55,{s:'tripwire'});if(mp.on)for(const q of Object.values(mp.rp))if(q.hp>0&&D(q.x,q.y,tr.x,tr.y)<46)mpSend({t:'hit',to:q.id,d:55,k:'mob'})}}traps=traps.filter(t=>t.t>0);
 for(const b of lobs){b.m-=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(hit(b.x,b.y,2)){b.x-=b.vx*dt;b.y-=b.vy*dt;b.m=0}if(b.m<=0){b.dead=1;lobLand(b)}}lobs=lobs.filter(b=>!b.dead);
 for(const f of fires){f.t-=dt;f.tk-=dt;if(f.tk<=0){f.tk=.5;M.forEach(m=>{if(m.hp>0&&D(m.x,m.y,f.x,f.y)<f.r+(m.boss?8:0))hurt(m,12,Math.atan2(m.y-f.y,m.x-f.x),'fire')});if(D(P.x,P.y,f.x,f.y)<f.r)hurtP(f.pd||5);burst(f.x+R(-f.r,f.r)*.7,f.y+R(-f.r,f.r)*.4,2,30,'#ff8a20',0)}}fires=fires.filter(f=>f.t>0);
 for(const f of flares){f.t-=dt;f.tk-=dt;if(f.tk<=0){f.tk=2.5;if(!fgOn())noise(f.x,f.y,300)}if(!fgOn()&&Math.random()<dt*18)burst(f.x,f.y,1,40,'#ffd070',0)}flares=flares.filter(f=>f.t>0)}}
