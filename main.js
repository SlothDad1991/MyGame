// ---------- MAIN MENU: animated title artwork + Play / Tutorial ----------
const TT_ITEMS=[{l:'Play',v:'hub'},{l:'Tutorial',v:'tut'}]; // add more main-menu entries here
const kc=k=>`<span class=kc>${k}</span>`;
const TUT=[
 {t:'The Hunt',sub:'Every raid has one goal: kill the demon and walk out alive',e:[
  ['1. Gear up',"At camp, pick your skin, loadout and stash, then press <b>Enter the Breach</b>. A loadout costs cash up front, so choose what you can afford.",'loot'],
  ['2. Burn the sigils',"Find and burn <b>3 sigils</b> hidden around the ruined parish. Walk up to one and press "+kc('E')+". Loot the buildings as you search.",'flare'],
  ['3. Kill the demon',"Then hunt the archdemon that sits in the Breach. Its minions will swarm you, so keep moving and keep shooting.",'moon'],
  ['4. Banish & escape',"Hold "+kc('E')+" on the corpse for 5 seconds to banish it and claim the bounty. It is noisy work. Then reach a glowing <b>exit ring</b>. The bounty only pays if you extract alive.",'reaper']]},
 {t:'Move & Fight',sub:'Aim with the mouse, keep your distance, never stop moving',e:[
  ['Move',kc('W')+kc('A')+kc('S')+kc('D')+" to move. Hold "+kc('Shift')+" to sprint, but sprinting costs stamina.",'walk'],
  ['Shoot',"Aim with the <b>mouse</b>, hold <b>left click</b> to fire, and press "+kc('R')+" to reload. Watch your magazine. Shotguns hit hard up close.",'shoot'],
  ['Melee',"<b>Right click</b> swings in close quarters. It saves ammo when an imp gets inside your guard.",'melee'],
  ['Switch weapons',"Scroll the <b>mouse wheel</b> or press "+kc('1')+" to "+kc('8')+" to swap between weapons and tools.",'shotgun,tonic']]},
 {t:'Tools',sub:'Stack up to 3 of each. Pick one with 1-8 or the mouse wheel, then left click',e:[
  ['Holy Water',"Heals <b>50 HP</b>. It does nothing at full health, so save it for when it hurts.",'tonic'],
  ['Blessed Charge',"A big explosion. Great for clearing a doorway full of imps, bad for standing next to.",'bomb'],
  ['Hellfire Flask',"Throws a burning pool that lasts 5 seconds. Block a corridor and let them run through it.",'flask'],
  ['Flare & Ward',"The flare lights the dark and <b>lures imps</b>. Saint's Ward cuts damage by 60% for 10 seconds. The tripwire plants a blast trap, and "+kc('Q')+" is darksight.",'flare,ward']]},
 {t:'Survive',sub:'The Breach is not fair. Know its tricks',e:[
  ['Loot everything',"Weapons, ammo and tools sit in the buildings. Press "+kc('E')+" to loot. "+kc('Tab')+" opens your inventory and the backpack survives your escape.",'loot'],
  ['Read the map',kc('M')+" opens the map. Exit rings are the only safe ground, so learn where they are before you need them.",'map'],
  ['Random events',"The <b>Blood Moon</b> sends monsters sprinting, the <b>Fog</b> blinds you, <b>Hellfire Rain</b> falls where red circles mark, and the <b>Bell</b> demands a toll.",'moon'],
  ['Time runs out',"Wait too long and <b>the Reaper</b> comes and nothing escapes it. Press "+kc('N')+" to toggle ambient sound.",'reaper']]}
];
let tutP=0,TART=null;
function icoSpecial(k){const c=document.createElement('canvas');c.width=c.height=48;c.style.cssText='width:48px;height:48px;image-rendering:pixelated;display:block';
 const x=c.getContext('2d'),o=ctx,sk=sel.skin;ctx=x;sel.skin='warden';
 try{if(k=='walk'||k=='shoot'||k=='melee'){x.save();x.translate(k=='walk'?24:18,32);x.scale(1.6,1.6);warden(0,0,.15,0,k=='walk'?1.3:0,k=='shoot'?'shotgun':k=='melee'?'fists':null,0,null,k=='melee'?1:0);x.restore()}
  else if(k=='loot'){x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.ellipse(24,41,16,4,0,0,7);x.fill();fR(x,8,16,32,24,'#6a4326');fR(x,8,16,32,3,'#8a5a32');fR(x,8,28,32,2,'#3a2512');fR(x,8,16,3,24,'#4a2e18');fR(x,37,16,3,24,'#4a2e18');fR(x,22,22,4,6,'#c8a050');fR(x,23,24,2,2,'#2a1c10')}
  else if(k=='map'){fR(x,0,0,48,48,'#120d12');for(const b of [[4,4,16,12],[26,6,18,14],[6,28,14,14],[28,30,16,12]]){fR(x,b[0],b[1],b[2],b[3],'#241a20');x.strokeStyle='rgba(232,230,216,.3)';x.strokeRect(b[0]+.5,b[1]+.5,b[2]-1,b[3]-1)}
   x.strokeStyle='rgba(176,36,36,.9)';x.lineWidth=1;x.beginPath();x.moveTo(12,10);x.lineTo(34,13);x.lineTo(13,35);x.lineTo(36,36);x.stroke();x.strokeStyle='#e05a5a';x.lineWidth=2;x.beginPath();x.moveTo(31,33);x.lineTo(41,43);x.moveTo(41,33);x.lineTo(31,43);x.stroke()}
  else if(k=='moon'){const g=x.createRadialGradient(24,24,6,24,24,24);g.addColorStop(0,'rgba(255,80,30,.55)');g.addColorStop(1,'rgba(255,80,30,0)');x.fillStyle=g;x.fillRect(0,0,48,48);x.fillStyle='#c0392b';x.beginPath();x.arc(24,24,14,0,7);x.fill();x.fillStyle='#e8643a';x.beginPath();x.arc(20,19,9,0,7);x.fill();x.fillStyle='rgba(70,6,8,.45)';for(const q of [[18,26,4],[29,20,3],[27,31,3]]){x.beginPath();x.arc(q[0],q[1],q[2],0,7);x.fill()}}
  else if(k=='reaper'){x.fillStyle='#14101a';x.beginPath();x.moveTo(24,3);x.lineTo(7,45);x.lineTo(41,45);x.closePath();x.fill();x.strokeStyle='#3a2a44';x.lineWidth=1;x.stroke();fS(x,24,25,2.2)}}
 finally{ctx=o;sel.skin=sk}return c}
function tutIcons(root){root.querySelectorAll('.ico').forEach(el=>{const ks=(el.dataset.ic||'').split(',').filter(Boolean);
 if(ks.length==1&&['walk','shoot','melee','loot','map','moon','reaper'].includes(ks[0]))el.appendChild(icoSpecial(ks[0]));
 else ks.forEach(k=>{const d=document.createElement('div');d.style.cssText='width:48px;height:'+(ks.length>1?24:48)+'px';d.appendChild(itemCv(k,48,ks.length>1?24:48));el.appendChild(d)})})}
// ---- The Hunt: six animated panels, drawn with the same sprites the raids use
const SBS=[
 ['Load in','Gear up at camp, then step into the breach. Your loadout is paid for up front.'],
 ['Burn 3 sigils','Find the glowing red sigils hidden in the ruins. Walk up and press E to burn each one.'],
 ['Find the archdemon','The demon\'s lair is sealed until the third sigil is burned. Then its door opens and the lair shows as a red X on your map. Press M to open it.'],
 ['Kill it','Keep moving and keep shooting. Its minions will swarm you while you work.'],
 ['Banish the corpse','Hold E on the body for 5 seconds. It is loud, so expect company.'],
 ['Extract alive','Stand in a glowing exit ring until it carries you off. The bounty only pays if you live.']];
const sbHTML=()=>`<div class=sbd>${SBS.map((s,i)=>`<div class=sbc><canvas class=sbv></canvas><h3><span class=sbn>${i+1}</span>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div>`;
function tutArt(root){
 const cs=[...root.querySelectorAll('canvas.sbv')],W=224,H=126,TAU=Math.PI*2,DUR=[7.4,7.8,7.4,7.4,7.6,7.6],BO=BOSS.mordrek.bo,BN=BOSS.mordrek.n;
 const xs=cs.map(k=>{k.width=W;k.height=H;const x=k.getContext('2d');x.imageSmoothingEnabled=false;return x});
 const mkc=()=>{const o=document.createElement('canvas');o.width=W;o.height=H;return o};
 const gnd=mkc(),vg=mkc();
 {const q=gnd.getContext('2d');fR(q,0,0,W,H,'#2a1b1d');for(let i=0;i<W*H/60;i++)fR(q,R(0,W)|0,R(0,H)|0,R(1,3)|0,1,['#1f1214','#3b2024','#2f2a30','#170c0e'][i%4]);
  q.fillStyle='rgba(0,0,0,.05)';for(let y=0;y<H;y+=16)for(let x=0;x<W;x+=16)if((x+y)/16%2==0)q.fillRect(x,y,16,16);
  for(let i=0;i<4;i++){let x=R(0,W),y=R(0,H),a=R(0,6.28);const p=[[x,y]];for(let k=0;k<6;k++){a+=R(-.9,.9);x+=Math.cos(a)*R(12,28);y+=Math.sin(a)*R(12,28);p.push([x,y])}
   for(const [w,c] of [[5,'rgba(255,70,10,.08)'],[2,'rgba(255,100,20,.2)'],[1,'rgba(255,190,80,.5)']]){q.strokeStyle=c;q.lineWidth=w;q.beginPath();p.forEach((v,k)=>k?q.lineTo(v[0],v[1]):q.moveTo(v[0],v[1]));q.stroke()}}
  const v=vg.getContext('2d'),rg=v.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.62);rg.addColorStop(0,'rgba(2,0,4,0)');rg.addColorStop(1,'rgba(2,0,4,.6)');v.fillStyle=rg;v.fillRect(0,0,W,H)}
 const lp=(a,b,u)=>a+(b-a)*cl(u,0,1),es=u=>{u=cl(u,0,1);return u*u*(3-2*u)};
 const HS=1.5,hunter=(x,y,a,wk)=>{ctx.save();ctx.translate(x,y);ctx.scale(HS,HS);warden(0,0,a,0,wk,'shotgun',0,null,0);ctx.restore()};
 const hud=s=>{ctx.font='bold 8px monospace';tx(s,6,12,'#d8c890')};
 const pts=(x,y,t,n,sp,col,seed,life,gv)=>{if(t<0||t>life)return;ctx.globalAlpha=1-t/life;ctx.fillStyle=col;for(let i=0;i<n;i++){const a=hs(i*3.1+seed)*TAU,v=(.3+hs(i+seed*7)*.7)*sp;ctx.fillRect((x+Math.cos(a)*v*t)|0,(y+Math.sin(a)*v*t+(gv||0)*t*t)|0,2,2)}ctx.globalAlpha=1};
 const key=(x,y,on)=>{ctx.fillStyle='#2b1d12';ctx.fillRect(x-6,y-6,12,13);ctx.fillStyle=on?'#ffd9d0':'#e8dcc0';ctx.fillRect(x-5,y-5,10,on?10:9);ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillStyle='#2b1d12';ctx.fillText('E',x,y+3)};
 const glow=(x,y,r,col)=>{ctx.save();ctx.globalCompositeOperation='lighter';const gg=ctx.createRadialGradient(x,y,1,x,y,r);gg.addColorStop(0,col);gg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gg;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore()};
 const sig=(x,y)=>{ctx.strokeStyle='rgba(255,70,40,'+(.6+.3*Math.sin(T*4))+')';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,6,0,7);ctx.moveTo(x-6,y);ctx.lineTo(x+6,y);ctx.moveTo(x,y-6);ctx.lineTo(x,y+6);ctx.stroke();glow(x,y,24,'rgba(255,60,30,.4)')};
 const corpse=(x,y,s)=>{ctx.fillStyle='rgba(20,5,8,.8)';ctx.beginPath();ctx.ellipse(x,y,16*s,9*s,0,0,7);ctx.fill();ctx.fillStyle='#7a0c14';ctx.fillRect(x-3*s,y-s,6*s,2*s)};
 const bossAt=(x,y,s,o)=>{ctx.save();ctx.translate(x,y);ctx.scale(s,s);drawM(Object.assign({x:0,y:0,boss:1,bh:'summon',fl:0,st:'idle',a:Math.PI,wk:0,hp:1,mh:1},o),0,0);ctx.restore()};
 const flash=(x,y,a,f)=>{ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.globalAlpha=Math.min(1,f*1.4);ctx.fillStyle='#ff8a20';ctx.beginPath();ctx.moveTo(-1,0);ctx.lineTo(7*f+3,-4);ctx.lineTo(14*f+5,0);ctx.lineTo(7*f+3,4);ctx.closePath();ctx.fill();ctx.fillStyle='#ffe9a0';ctx.fillRect(0,-1.5,8*f+3,3);ctx.restore();glow(x+10,y,40,'rgba(255,170,70,'+(.5*f)+')')};
 const S=[];
 // 1. load in
 S[0]=t=>{const rx=178,ry=68;glow(rx,ry,50,'rgba(255,60,30,.45)');ctx.lineWidth=2;ctx.strokeStyle='rgba(255,110,50,.9)';ctx.setLineDash([5,4]);ctx.lineDashOffset=-t*14;ctx.beginPath();ctx.arc(rx,ry,22,0,7);ctx.stroke();ctx.setLineDash([]);
  ctx.lineWidth=1;ctx.strokeStyle='rgba(255,190,110,.7)';ctx.beginPath();ctx.arc(rx,ry,14+Math.sin(t*4)*1.5,0,7);ctx.stroke();
  ['shotgun','revolver','bomb'].forEach((k,i)=>{const x=8+i*24;ctx.fillStyle='#241c24';ctx.fillRect(x,22,20,20);ctx.strokeStyle='#666';ctx.lineWidth=1;ctx.strokeRect(x+.5,22.5,19,19);drawWpn(k,x+5,34,0,.85)});
  const run=t<4.3,hx=run?lp(-8,150,t/4.2):lp(150,172,(t-4.3)/1.1);
  if(t<5.5){ctx.globalAlpha=run?1:cl(1-(t-4.3)/1.1,0,1);hunter(hx,76,0,run?t*10:0);ctx.globalAlpha=1}
  if(t>4.3)pts(rx,ry,t-4.3,10,40,'#ffb060',2,1.2,0);
  hud(t<5.5?'Gear up, then enter the breach':'Sigils 0/3 (E to burn)')};
 // 2. burn sigils
 const SG=[[56,46],[118,96],[178,52]],ST=[14,100],T0=.3,SP=2.2,TR=1.1,BU=1.2;
 S[1]=t=>{const k=cl(Math.floor((t-T0)/SP),0,2),lc=t-T0-k*SP,pv=k==0?ST:[SG[k-1][0]-9,SG[k-1][1]+7],tg=[SG[k][0]-9,SG[k][1]+7];
  let hx,hy,walk=0;if(t<T0){hx=ST[0];hy=ST[1]}else if(lc<TR){const u=es(lc/TR);hx=lp(pv[0],tg[0],u);hy=lp(pv[1],tg[1],u);walk=1}else{hx=tg[0];hy=tg[1]}
  let n=0;SG.forEach((s,i)=>{const b=T0+i*SP+BU;if(t<b)sig(s[0],s[1]);else{n++;ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(s[0],s[1],7,4,0,0,7);ctx.fill();pts(s[0],s[1],t-b,14,50,'#d8c890',i+1,.8,50)}});
  const fa=Math.atan2(SG[k][1]-hy,SG[k][0]-hx),kb=T0+k*SP+BU;hunter(hx,hy,fa,walk?t*10:0);
  if(t>=T0+k*SP+TR&&t<kb+.35)key(hx,hy-36,t>=kb-.1);
  hud('Sigils '+n+'/3 (E to burn)')};
 // 3. the map
 const MB=[[18,18,50,34],[88,12,46,30],[150,18,56,36],[28,74,38,34],[100,76,48,34],[168,80,46,30]],MP=[[42,34],[46,90],[112,28]],LAIR=[190,98];
 S[2]=t=>{fR(ctx,0,0,W,H,'#120d12');ctx.strokeStyle='rgba(232,230,216,.05)';ctx.lineWidth=1;for(let x=0;x<W;x+=16){ctx.beginPath();ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,H);ctx.stroke()}for(let y=0;y<H;y+=16){ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5);ctx.stroke()}
  MB.forEach(b=>{ctx.fillStyle='#241a20';ctx.fillRect(b[0],b[1],b[2],b[3]);ctx.strokeStyle='rgba(232,230,216,.28)';ctx.strokeRect(b[0]+.5,b[1]+.5,b[2],b[3])});
  const shown=cl(Math.floor((t-.5)/.8)+1,0,3),pl=[...MP.slice(0,shown)];
  if(t>2.9){const u=es((t-2.9)/.8);pl.push([lp(MP[2][0],LAIR[0],u),lp(MP[2][1],LAIR[1],u)])}
  ctx.strokeStyle='rgba(176,36,36,.85)';ctx.lineWidth=1;ctx.beginPath();pl.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
  MP.slice(0,shown).forEach(p=>{ctx.strokeStyle='rgba(255,90,60,.9)';ctx.beginPath();ctx.arc(p[0],p[1],4,0,7);ctx.moveTo(p[0]-4,p[1]);ctx.lineTo(p[0]+4,p[1]);ctx.moveTo(p[0],p[1]-4);ctx.lineTo(p[0],p[1]+4);ctx.stroke()});
  const pu=.5+.5*Math.sin(t*5);
  if(t>3.7){const x=LAIR[0],y=LAIR[1];ctx.strokeStyle='rgba(224,80,90,'+(.6+.4*pu)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,9+pu*2,0,7);ctx.moveTo(x-6,y-6);ctx.lineTo(x+6,y+6);ctx.moveTo(x+6,y-6);ctx.lineTo(x-6,y+6);ctx.stroke();ctx.font='bold 8px monospace';tx('Archdemon lair',x-8,y-16,'#ff7a6a','center')}
  if(t>4.2){const u=es((t-4.2)/2.6),a=[ [14,112],MP[0],MP[1],MP[2],LAIR ],seg=u*4,i=Math.min(3,Math.floor(seg)),f=seg-i,x=lp(a[i][0],a[i+1][0],f),y=lp(a[i][1],a[i+1][1],f);
   ctx.strokeStyle='rgba(232,230,216,'+(.7-.4*pu)+')';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,4+pu*3,0,7);ctx.stroke();ctx.fillStyle='#e8e6d8';ctx.beginPath();ctx.arc(x,y,2.5,0,7);ctx.fill()}
  hud(t<3.7?'Sigils '+shown+'/3 (E to burn)':'Hunt '+BN+' (red X)');ctx.font='bold 8px monospace';tx('MAP  [M]',6,H-6,'#8a8478','left')};
 // 4. the kill
 const HT=[.9,1.65,2.4,3.15,3.9,4.65];
 S[3]=t=>{const hit=HT.filter(h=>h<=t),n=hit.length,dead=n==6,since=n?t-hit[n-1]:9,rc=Math.max(0,1-since*5),bx=lp(178,150,t/4.6),by=68,hx=52-rc*1.5,hy=76;
  hunter(hx,hy,0.02,0);
  if(!dead)bossAt(bx,by,1.6,{st:'chase',hp:100-n*100/6,mh:100,fl:since<.08?1:0,wk:t*4});else{corpse(bx,by,1.6)}
  HT.forEach((h,i)=>{if(t>=h&&t<h+.12){const mz=[hx+16.6*HS,hy-3*HS];ctx.strokeStyle='#ff9a40';ctx.lineWidth=1.2;for(let j=0;j<3;j++){ctx.beginPath();ctx.moveTo(mz[0],mz[1]);ctx.lineTo(bx-6+hs(i*5+j)*6,by-12+hs(i*7+j)*14);ctx.stroke()}flash(mz[0],mz[1],0,1-(t-h)/.12)}
   pts(bx,by-14,t-h,i==5?18:7,i==5?110:60,'#b01820',i+2,i==5?1:.5,i==5?160:0)});
  if(dead)tx('It falls!',bx,by-34,'#ff6a3a','center');
  hud(dead?'Banish the corpse (hold E)':'Hunt '+BN+' (red X)')};
 // 5. banish
 S[4]=t=>{const cx=118,cy=78,hx=88,hy=84,p=cl((t-.8)/5,0,1),done=t>=5.8;
  if(!done){corpse(cx,cy,1.6);ctx.strokeStyle='#d8c890';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,24,0,6.28*p);ctx.stroke();
   if(t>.8)for(let k=0;k<3;k++){const ph=((t-.8)*.6+k/3)%1;ctx.globalAlpha=(1-ph)*.3;ctx.strokeStyle='#d8c890';ctx.beginPath();ctx.arc(cx,cy,ph*90,0,7);ctx.stroke();ctx.globalAlpha=1}}
  else{pts(cx,cy-6,t-5.8,24,70,'#e0b040',4,1,40);ctx.font='bold 8px monospace';ctx.globalAlpha=cl(1.6-(t-5.8)/1.2,0,1);tx('Banished! +$'+BO,cx,cy-30-(t-5.8)*6,'#e0b040','center');ctx.globalAlpha=1}
  [[232,64,3.4],[236,98,4.1]].forEach(([x0,y0,st])=>{if(t<st)return;const u=Math.min(1,(t-st)/3.2),x=lp(x0,168,u),y=lp(y0,y0<80?72:92,u);ctx.save();ctx.translate(x,y);ctx.scale(1.4,1.4);drawMob({ty:'imp',a:Math.PI,wk:t*9,fl:0},0,0,false);ctx.restore()});
  hunter(hx,hy,0,0);if(t>.4&&t<5.9)key(hx,hy-40,t>.8);
  if(!done&&t>.8){ctx.font='bold 8px monospace';tx(Math.ceil(5-5*p)+'s',cx,cy+22,'#d8c890','center')}
  hud(done?'Reach extraction!':'Banish the corpse (hold E)')};
 // 6. extract
 S[5]=t=>{const ex=176,ey=66,run=t<3.2,x=run?lp(-8,ex-4,t/3.2):ex-4,p=cl((t-3.4)/3,0,1),gone=t>6.4;
  ctx.strokeStyle='rgba(255,240,180,'+(.5+.3*Math.sin(t*3))+')';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);ctx.lineDashOffset=-t*10;ctx.beginPath();ctx.arc(ex,ey,17,0,7);ctx.stroke();ctx.setLineDash([]);glow(ex,ey,34,'rgba(255,230,150,.25)');
  if(t>3.4&&!gone){ctx.strokeStyle='#8fe0a0';ctx.lineWidth=3;ctx.beginPath();ctx.arc(ex,ey,24,-1.5708,-1.5708+6.2832*p);ctx.stroke()}
  ctx.font='bold 8px monospace';tx('Order Wagon',ex,ey-32,'#e8e0b0','center');
  if(!gone){ctx.globalAlpha=1;hunter(x,ey+8,0,run?t*10:0);tx('$'+BO,x,ey-14,'#e0b040','center')}
  else{pts(ex,ey,t-6.4,16,50,'#8fe0a0',6,1,0);ctx.globalAlpha=cl((t-6.4)*3,0,1);tx('Extracted! Bounty paid.',W/2,34,'#8fe0a0','center');ctx.globalAlpha=1}
  hud(gone?'You made it out alive':'Reach extraction!')};
 let alive=1,t0=performance.now();
 function frame(now){if(!alive||!root.isConnected)return;requestAnimationFrame(frame);if(document.hidden)return;
  const o=ctx,oT=T,sk=sel.skin;sel.skin='warden';
  try{cs.forEach((k,i)=>{const t=((now-t0)/1000)%DUR[i];ctx=xs[i];T=t;ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.setLineDash([]);ctx.textAlign='left';
   if(i!=2)ctx.drawImage(gnd,0,0);S[i](t);ctx.globalAlpha=1;ctx.drawImage(vg,0,0)})}
  finally{ctx=o;T=oT;sel.skin=sk}}
 requestAnimationFrame(frame);
 return{stop(){alive=0}}}
function tutShow(){
 const S=TUT[tutP],M=$('#menu');
 if(TART){TART.stop();TART=null}
 M.classList.remove('ttl');M.style.display='block';
 M.innerHTML=`<div class=board><h1>\u2620 Tutorial \u2620</h1><div class="slate tut"><div class=tabs>${TUT.map((s,i)=>`<div class="tb ${i==tutP?'on':''}" data-tp=${i}>${s.t}</div>`).join('')}</div><h2 class=lt>${S.t}</h2><p class=sub>${S.sub}</p><div class=notes>${S.e.map((n,i)=>`<div class="nt ${i%2?'ch':'pp'}" style="--r:${(((i*37)%7)-3)*.55}deg"><div class="pol sp"><div class=ico data-ic="${n[2]}"></div></div><h3>${n[0]}</h3><p>${n[1]}</p></div>`).join('')}</div></div><div class=foot><button data-v=title>\u2190 Main Menu</button><span class=hint style="margin:0">Page ${tutP+1} of ${TUT.length}</span><span><button data-tp=${tutP-1} ${tutP==0?'disabled':''}>\u2190 Prev</button> <button data-tp=${tutP+1>=TUT.length?'play':tutP+1}>${tutP+1>=TUT.length?'Play':'Next \u2192'}</button></span></div></div>`;
 tutIcons(M);
 if(tutP==0){const nb=M.querySelector('.notes');if(nb){nb.outerHTML=sbHTML();TART=tutArt(M)}}
 M.scrollTop=0}
function titleShow(){
 const M=$('#menu');M.classList.add('ttl');M.style.display='block';
 M.innerHTML=`<canvas id=ta></canvas><div class=ttv></div><div class=tt-wrap><div class=tt-logo><div class=tt-eye>The Hellbreach Ledger</div><h1 class=tt-name>Hellbreach</h1><p class=tt-tag>Burn the sigils. Banish the demon. Walk out alive.</p></div><div class=tt-btns>${TT_ITEMS.map(i=>`<button class=tt-btn data-v=${i.v}>${i.l}</button>`).join('')}</div></div>`;
 if(TART)TART.stop();TART=titleArt($('#ta'))}
{const _m=menu;menu=function(m){if(scr=='title'){titleShow();return}if(scr=='tut'){tutShow();return}
  $('#menu').classList.remove('ttl');if(TART){TART.stop();TART=null}_m(m)}}
$('#menu').addEventListener('click',e=>{const t=e.target.closest('[data-tp]');if(!t||t.disabled)return;e.stopImmediatePropagation();
 if(t.dataset.tp=='play'){scr='hub';tutP=0}else tutP=+t.dataset.tp;menu()},true);
addEventListener('keydown',e=>{if(mode!='menu'||scr!='title')return;const bs=[...document.querySelectorAll('.tt-btn')];if(!bs.length)return;
 const i=bs.indexOf(document.activeElement);
 if(e.code=='ArrowDown'||e.code=='KeyS'){bs[(i+1)%bs.length].focus();e.preventDefault()}
 else if(e.code=='ArrowUp'||e.code=='KeyW'){bs[(i<0?0:i-1+bs.length)%bs.length].focus();e.preventDefault()}
 else if((e.code=='Enter'||e.code=='Space')&&i<0){bs[0].click();e.preventDefault()}});

// the artwork: the game's own pixel sprites. A Warden blasts a shotgun at the imps Mordrek summons from his circle.
// Everything is drawn at game resolution with the same warden()/drawMob()/drawM() code the raids use, then scaled up crisp.
function titleArt(cv){
 const c=cv.getContext('2d'),TAU=Math.PI*2,RANGE=108,STOP=34;
 const mkc=(w,h)=>{const o=document.createElement('canvas');o.width=w;o.height=h;return o};
 let g=4,LW=0,LH=0,alive=1,last=0,TT=0,rec=0,fl=0,cd=1,circ=0,cast=0,shk=0,spT=.2,kills=0,aim=0,port=false;
 let hp={x:0,y:0},bp={x:0,y:0},cc={x:0,y:0},Rc=36,gr=null,crk=null,bl=null,blx=null,dkc=mkc(2,2),dkx=dkc.getContext('2d'),vg=null;
 let mins=[],pt=[],bits=[],puffs=[],trs=[],shells=[],sps=[],emb=[],tree=[],fires=[],spurts=[];
 const lp0=(a,b,u)=>a+(b-a)*u,ang=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x),wrap=a=>{while(a>Math.PI)a-=TAU;while(a<-Math.PI)a+=TAU;return a};
 // ---- ground, ruins and lava veins (same recipe as the raid map)
 const wall=(q,x,y,w,h,p)=>{const hz=w>h,L=hz?w:h;fR(q,x,y+h,w,5,'#1e1015');fR(q,x,y,w,h,p[1]);fR(q,x,y,w,1,p[2]);
  for(let u=R(2,8);u<L;u+=R(7,14))hz?fR(q,x+u,y+1,1,h-1,'rgba(0,0,0,.35)'):fR(q,x+1,y+u,w-1,1,'rgba(0,0,0,.35)');
  for(let j=0;j<L/30;j++){const u=R(0,L),r=Math.random();
   if(r<.35)hz?fR(q,x+u,y+1,1,R(2,5),'#6a0a12'):fR(q,x+1,y+u,R(2,5),1,'#6a0a12');
   else if(r<.6)hz?fR(q,x+u,y,R(2,6),1,'#1a1012'):fR(q,x,y+u,1,R(2,6),'#1a1012');
   else if(r<.75)hz?fR(q,x+u,y+2,R(3,7),1,'#ff7a1a'):fR(q,x+2,y+u,1,R(3,7),'#ff7a1a')}};
 const hwall=(q,x,y,w,p,gap)=>{if(!gap)return wall(q,x,y,w,6,p);const a=gap[0]-x,b=x+w-(gap[0]+gap[1]);if(a>0)wall(q,x,y,a,6,p);if(b>0)wall(q,gap[0]+gap[1],y,b,6,p)};
 const vwall=(q,x,y,h,p,gap)=>{if(!gap)return wall(q,x,y,6,h,p);const a=gap[0]-y,b=y+h-(gap[0]+gap[1]);if(a>0)wall(q,x,y,6,a,p);if(b>0)wall(q,x,gap[0]+gap[1],6,b,p)};
 function bld(q,r,pi,dg,gp){q.save();q.beginPath();q.rect(r.x,r.y,r.w,r.h);q.clip();
  try{FL[pi](q,null,r)}catch(e){fR(q,r.x,r.y,r.w,r.h,'#2e2624')}
  for(let i=0;i<r.w*r.h/700;i++)fR(q,R(r.x,r.x+r.w),R(r.y,r.y+r.h),R(1,4),R(1,3),['#1a1012','#4a4646','#5a0a10'][i%3]);
  for(let i=0;i<3;i++)fP(q,R(r.x+10,r.x+r.w-10),R(r.y+10,r.y+r.h-10),R(5,9));
  q.restore();const p=BP[pi];
  hwall(q,r.x,r.y,r.w,p,null);hwall(q,r.x,r.y+r.h-6,r.w,p,dg);vwall(q,r.x,r.y,r.h,p,gp);vwall(q,r.x+r.w-6,r.y,r.h,p,null)}
 function paintGround(){
  gr=mkc(LW,LH);const q=gr.getContext('2d');fR(q,0,0,LW,LH,'#2a1b1d');
  for(let i=0;i<LW*LH/330;i++)fR(q,R(0,LW)|0,R(0,LH)|0,R(1,3)|0,1,['#1f1214','#3b2024','#2f2a30','#170c0e'][i%4]);
  q.fillStyle='rgba(110,30,14,.3)';for(let i=0;i<LW*LH/12000;i++){q.beginPath();q.ellipse(R(0,LW),R(0,LH),R(20,60),R(10,30),0,0,7);q.fill()}
  q.fillStyle='rgba(0,0,0,.05)';for(let y=0;y<LH;y+=16)for(let x=0;x<LW;x+=16)if((x+y)/16%2==0)q.fillRect(x,y,16,16);
  const A=port?{x:LW*.04,y:-30,w:LW*.62,h:30+LH*.13}:{x:LW*.3,y:-30,w:LW*.34,h:30+LH*.19};
  const B=port?{x:LW*.42,y:LH*.9,w:LW*.75,h:LH*.3}:{x:LW*.6,y:LH*.86,w:LW*.55,h:LH*.3};
  bld(q,A,3,[A.x+A.w*.55,34],null);bld(q,B,1,[B.x+B.w*.2,30],[B.y+8,26]);
  // lava veins on their own layer so they can glow in the dark
  crk=mkc(LW,LH);const k=crk.getContext('2d');
  for(let i=0;i<LW*LH/9000;i++){let x=R(0,LW),y=R(0,LH),a=R(0,6.28);const pts=[[x,y]];for(let j=0;j<7;j++){a+=R(-.9,.9);x+=Math.cos(a)*R(14,34);y+=Math.sin(a)*R(14,34);pts.push([x,y])}
   for(const [w,col] of [[6,'rgba(255,70,10,.12)'],[2.5,'rgba(255,100,20,.35)'],[1,'rgba(255,190,80,.8)']]){k.strokeStyle=col;k.lineWidth=w;k.beginPath();pts.forEach((p,j)=>j?k.lineTo(p[0],p[1]):k.moveTo(p[0],p[1]));k.stroke()}}
  for(const r of [A,B])k.clearRect(r.x-2,r.y-2,r.w+4,r.h+10);
  bl=mkc(LW,LH);blx=bl.getContext('2d');
  vg=mkc(LW,LH);const v=vg.getContext('2d'),m=Math.max(LW,LH),rg=v.createRadialGradient(LW*.55,LH*.52,m*.22,LW*.55,LH*.52,m*.8);rg.addColorStop(0,'rgba(2,0,4,0)');rg.addColorStop(1,'rgba(2,0,4,.7)');v.fillStyle=rg;v.fillRect(0,0,LW,LH);
  dkc.width=LW;dkc.height=LH}
 function resize(){
  const W=Math.max(1,cv.parentNode.clientWidth||innerWidth),H=Math.max(1,cv.parentNode.clientHeight||innerHeight);port=W/H<1.2;
  g=port?Math.max(2,Math.min(4,Math.round(W/140))):Math.max(3,Math.min(Math.round(H/185),Math.round(W/230)));
  LW=Math.ceil(W/g);LH=Math.ceil(H/g);cv.width=LW;cv.height=LH;cv.style.width=LW*g+'px';cv.style.height=LH*g+'px';c.imageSmoothingEnabled=false;
  if(port){hp={x:LW*.3,y:LH*.72};bp={x:LW*.7,y:LH*.42};Rc=28}else{hp={x:LW*.4,y:LH*.64};bp={x:LW*.83,y:LH*.5};Rc=36}
  cc={x:bp.x-(port?6:16),y:bp.y+(port?30:34)};
  tree=[[.06,.9],[.95,.2],[.22,.12],[.52,.93]].map(([a,b])=>({x:LW*a,y:LH*b}));
  fires=[{x:LW*(port?.28:.58),y:LH*(port?.5:.78),r:15,s:1.3},{x:LW*(port?.62:.3),y:LH*(port?.8:.43),r:12,s:4.1}];
  mins=[];pt=[];bits=[];puffs=[];trs=[];shells=[];sps=[];spurts=[];
  emb=[];for(let i=0;i<Math.ceil(LW*LH/700);i++)emb.push({x:R(0,LW),y:R(0,LH),vx:R(2,12),vy:-R(6,18),p:R(0,9)});
  aim=ang(hp,bp);paintGround();
  for(let i=0;i<(port?9:16);i++){const t=Math.random(),x=lp0(hp.x+30,cc.x-Rc,t)+R(-26,26),y=lp0(hp.y,cc.y,t)+R(-34,34);remains(x,y,MC[['imp','skitter','brute'][i%3]],i%4==0)}
  for(let i=0;i<6;i++)remains(hp.x+R(10,60),hp.y+R(-20,24),MC.imp,false);
  for(let i=0;i<5;i++){const x=R(0,LW),y=R(0,LH);remains(x,y,MC.imp,false)}
  pool(hp.x-6,hp.y+6,10)}
 // ---- gore, in the raid's own style (2px blood, body chunks, ground splats)
 const MC={imp:['#8a1c1c','#4a0c0c'],skitter:['#b8a070','#6a5a38'],brute:['#4a2a30','#1a0c10'],bloat:['#6a8a30','#9aba50']};
 function splat(x,y,n,r){for(let i=0;i<n;i++){blx.fillStyle=`rgba(${40+R(0,40)|0},6,${30+R(0,40)|0},${R(.4,.8)})`;blx.beginPath();blx.ellipse(x+R(-r,r),y+R(-r,r),R(1,r/3+1),R(1,r/4+1),R(0,3),0,7);blx.fill()}}
 function spray(x,y,dx,dy,n,sp){for(let i=0;i<n;i++){const t=Math.atan2(dy,dx)+R(-.9,.9),v=R(.25,1)*sp;pt.push({x,y,z:R(2,9),vx:Math.cos(t)*v,vy:Math.sin(t)*v,vz:R(30,110),l:2,c:Math.random()<.6?'#b01820':'#7a0c14'})}}
 function pool(x,y,r){for(let i=0;i<5;i++){blx.fillStyle=i%2?'rgba(110,8,16,.75)':'rgba(66,4,10,.8)';blx.beginPath();blx.ellipse(x+R(-r/2,r/2),y+R(-r/3,r/3),R(r/3,r),R(r/4,r/2),R(0,3),0,7);blx.fill()}blx.fillStyle='rgba(190,30,40,.35)';blx.beginPath();blx.ellipse(x-r*.15,y-r*.1,r*.3,r*.15,0,0,7);blx.fill()}
 function remains(x,y,cl2,big){pool(x,y,big?13:8);
  for(let i=0;i<(big?7:4);i++){const bx2=x+R(-9,9),by2=y+R(-5,5),w=R(2,5),h=R(2,4);blx.fillStyle=['#a01820','#6a0c14','#c0506a',cl2[i%2]][i%4];blx.fillRect(bx2|0,by2|0,w|0,h|0);blx.fillStyle='rgba(0,0,0,.35)';blx.fillRect(bx2|0,(by2+h)|0,w|0,1)}
  blx.strokeStyle='#e8d8b0';blx.lineWidth=1;for(let i=0;i<3;i++){const rx=x+R(-6,6),ry=y+R(-4,4);blx.beginPath();blx.moveTo(rx,ry);blx.quadraticCurveTo(rx+R(-3,3),ry-3,rx+R(2,6),ry+R(-1,2));blx.stroke()}
  if(Math.random()<(big?.7:.35)){blx.fillStyle='#e8d8b0';blx.fillRect((x+R(-5,5))|0,(y+R(-3,3))|0,1,3);blx.fillRect((x+R(-5,5))|0,(y+R(-3,3))|0,3,1)}
  if(Math.random()<.3)fS(blx,x+R(-6,6),y+R(-3,3),.7)}
 function gib(m){const sc=m.ty=='brute'?1.5:m.ty=='skitter'?.75:1,x=m.x,y=m.y-4*sc,d=Math.atan2(m.y-hp.y,m.x-hp.x),dx=Math.cos(d),dy=Math.sin(d),cl2=MC[m.ty||'imp'],bl2=m.ty=='bloat';
  spray(x,y,dx,dy,34,170);spray(x,y,dx,dy,14,70);spray(x,y,0,0,10,90);splat(x,m.y,24,12*sc);pool(x+dx*8,m.y+dy*4,9*sc);remains(m.x,m.y,cl2,m.ty=='brute');
  const meat=bl2?['#6a8a30','#9aba50','#4a6020']:['#a01820','#6a0c14','#c0506a'];
  for(let i=0;i<16;i++){const t=d+R(-1.1,1.1),v=R(30,150);bits.push({x:x+R(-3,3),y:y+R(-3,3),z:R(2,9),vx:Math.cos(t)*v,vy:Math.sin(t)*v,vz:R(50,170),s:2+(Math.random()*3|0),c:i<3&&!bl2?'#e8d8b0':i<8?cl2[i%2]:meat[i%3],tr:i%3==0})}
  spurts.push({x,y,dx,dy,l:.6,m:.6});
  for(let i=0;i<12;i++)sps.push({x,y,vx:dx*R(40,220)+R(-70,70),vy:dy*R(40,220)+R(-90,30),l:R(.2,.55),m:.55});
  if(bl2)for(let i=0;i<5;i++)puffs.push({x:x+R(-4,4),y:y+R(-4,4),vx:R(-8,8),vy:R(-14,0),r:R(4,8),l:R(.6,1),m:1,c:'110,150,50'});
  for(let i=0;i<3;i++)puffs.push({x:x+R(-3,3),y:y+R(-3,3),vx:R(-10,10),vy:R(-12,0),r:R(3,6),l:R(.5,.9),m:.9,c:'150,12,16'});
  if(++kills%30==0){blx.globalCompositeOperation='destination-out';blx.fillStyle='rgba(0,0,0,.16)';blx.fillRect(0,0,LW,LH);blx.globalCompositeOperation='source-over'}}
 const hunterPos=()=>{const ca=Math.cos(aim),sa=Math.sin(aim);return{x:hp.x-ca*rec*1.6,y:hp.y-sa*rec*1.6,ca,sa}};
 const muzzle=()=>{const h=hunterPos();return{x:h.x+h.ca*(5+11.6),y:h.y-3+h.sa*(5+11.6)}};
 function fire(ar){const mz=muzzle(),a0=aim;fl=1;rec=1;shk=2;cd=R(.95,1.5);
  for(let i=0;i<6;i++)puffs.push({x:mz.x+R(-1,2),y:mz.y+R(-2,2),vx:R(8,34)*Math.cos(a0)+R(-6,6),vy:R(-8,8),r:R(2,4),l:R(.8,1.5),m:1.5,c:'120,100,100'});
  for(let i=0;i<6;i++)sps.push({x:mz.x,y:mz.y,vx:Math.cos(a0+R(-.3,.3))*R(80,240),vy:Math.sin(a0+R(-.3,.3))*R(80,240),l:R(.1,.3),m:.3});
  const h=hunterPos();shells.push({x:h.x+4,y:h.y-3,z:7,vx:R(14,34)*(Math.cos(a0)>=0?-1:1),vy:R(-14,14),vz:R(50,90),l:3});
  const tg=[ar[0]];for(const m of ar.slice(1))if(tg.length<4&&Math.abs(wrap(ang(hp,m)-ang(hp,ar[0])))<.24)tg.push(m);
  for(const m of tg){for(let i=0;i<3;i++)trs.push({x0:mz.x,y0:mz.y,x1:m.x+R(-3,3),y1:m.y-5+R(-4,4),l:.1,m:.1});
   const dir=ang(hp,m);m.fl=.07;
   if(--m.hp<=0)m.dead=1;else{m.kx=Math.cos(dir)*110;m.ky=Math.sin(dir)*110;m.kb=.25;spray(m.x,m.y-5,Math.cos(dir),Math.sin(dir),20,140);splat(m.x,m.y,8,6)}}
  for(let i=0;i<3;i++)trs.push({x0:mz.x,y0:mz.y,x1:mz.x+Math.cos(a0+R(-.2,.2))*R(120,220),y1:mz.y+Math.sin(a0+R(-.2,.2))*R(120,220),l:.1,m:.1})}
 function spawn(){const r=Math.random(),ty=r<.58?'imp':r<.78?'skitter':r<.88?'brute':'bloat',an=R(0,TAU),rr=Math.sqrt(Math.random())*Rc*.7;
  const sp={imp:R(40,52),skitter:R(78,95),brute:R(26,32),bloat:R(20,26)}[ty];
  mins.push({x:cc.x+Math.cos(an)*rr,y:cc.y+Math.sin(an)*rr,ty,a:Math.PI,wk:R(0,6),fl:0,t:0,st:'rise',ph:R(0,6),dead:0,hp:ty=='brute'?2:1,sp,kx:0,ky:0,kb:0});
  circ=1;cast=1;for(let i=0;i<6;i++)sps.push({x:cc.x+R(-Rc,Rc)*.7,y:cc.y+R(-Rc,Rc)*.7,vx:R(-10,10),vy:-R(20,60),l:R(.4,.8),m:.8})}
 // ---- simulation
 function step(dt){TT+=dt;rec=Math.max(0,rec-dt*4.5);fl=Math.max(0,fl-dt*8);circ=Math.max(0,circ-dt*2);cast=Math.max(0,cast-dt*2.5);shk=Math.max(0,shk-dt*14);
  spT-=dt;if(spT<=0){if(mins.filter(m=>!m.dead).length<9)spawn();spT=R(.45,.9)}
  for(let i=mins.length-1;i>=0;i--){const m=mins[i];m.t+=dt;if(m.fl>0)m.fl-=dt;
   if(m.dead){if(m.fl<=0){gib(m);mins.splice(i,1)}continue}
   if(m.st=='rise'){if(m.t>.7)m.st='run';continue}
   const dx=hp.x-m.x,dy=hp.y-m.y,d=Math.hypot(dx,dy)||1;m.a=Math.atan2(dy,dx);
   if(m.kb>0){m.kb-=dt;m.x+=m.kx*dt*m.kb*4;m.y+=m.ky*dt*m.kb*4}
   else if(d>STOP){const w=Math.sin(TT*3+m.ph)*8;m.x+=(dx/d*m.sp-dy/d*w)*dt;m.y+=(dy/d*m.sp+dx/d*w)*dt;m.wk+=dt*m.sp*.28}}
  const live=mins.filter(m=>m.st=='run'&&!m.dead).sort((a,b)=>D(a.x,a.y,hp.x,hp.y)-D(b.x,b.y,hp.x,hp.y));
  const des=live.length?ang(hp,live[0]):ang(hp,bp);aim+=wrap(des-aim)*Math.min(1,dt*9);
  cd-=dt;if(cd<=0){const ar=live.filter(m=>D(m.x,m.y,hp.x,hp.y)<RANGE);if(ar.length)fire(ar);else cd=.1}
  const phys=(a,gv)=>{for(let i=a.length-1;i>=0;i--){const p=a[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vz-=gv*dt;p.z+=p.vz*dt;p.vx*=1-1.5*dt;p.vy*=1-1.5*dt;
    if(p.z<=0){if(a==pt){blx.fillStyle='rgba(100,8,12,.7)';const z2=Math.random()<.25?3:2;blx.fillRect(p.x|0,p.y|0,z2,z2)}else if(a==bits){blx.fillStyle='rgba(90,6,12,.55)';blx.fillRect((p.x-1)|0,(p.y-1)|0,p.s+2,p.s+2);blx.fillStyle=p.c;blx.fillRect(p.x|0,p.y|0,p.s,p.s);if(p.tr){blx.strokeStyle='rgba(100,8,12,.6)';blx.lineWidth=1;blx.beginPath();blx.moveTo(p.x,p.y);blx.lineTo(p.x-p.vx*.12,p.y-p.vy*.12);blx.stroke()}}else{blx.fillStyle='#c8a040';blx.fillRect(p.x|0,p.y|0,2,1)}a.splice(i,1)}}};
  for(let i=spurts.length-1;i>=0;i--){const q=spurts[i];q.l-=dt;if(q.l<=0){spurts.splice(i,1);continue}for(let k=0;k<3;k++){const t=Math.atan2(q.dy,q.dx)+R(-1.2,1.2)+(Math.random()<.5?Math.PI:0),v=R(20,90)*(q.l/q.m+.3);pt.push({x:q.x,y:q.y,z:R(2,7),vx:Math.cos(t)*v,vy:Math.sin(t)*v,vz:R(40,120),l:2,c:Math.random()<.6?'#b01820':'#7a0c14'})}}
  phys(pt,520);phys(bits,520);phys(shells,420);
  for(const a of [puffs,sps,trs]){for(let i=a.length-1;i>=0;i--){const p=a[i];p.l-=dt;if(p.l<=0){a.splice(i,1);continue}if(a!=trs){p.x+=p.vx*dt;p.y+=p.vy*dt;if(a==puffs){p.vx*=.97;p.vy-=3*dt}else p.vy+=120*dt}}}
  for(const e of emb){e.x+=(e.vx+Math.sin(TT+e.p)*6)*dt;e.y+=e.vy*dt;if(e.y<-4||e.x>LW+4){e.x=R(0,LW);e.y=LH+R(0,10)}}}
 // ---- drawing
 function drawFire(f){const x=f.x,y=f.y;ctx.fillStyle='rgba(255,110,20,.22)';ctx.beginPath();ctx.ellipse(x,y,f.r,f.r*.6,0,0,7);ctx.fill();
  for(let i=0;i<10;i++){const a=i*2.4+f.s,rr=f.r*.8*((i%4)+1)/4,qx=x+Math.cos(a)*rr,qy=y+Math.sin(a)*rr*.6,h=3+3*Math.abs(Math.sin(T*9+i*1.7)),w=2+Math.abs(Math.sin(T*7+i))*1.5;
   ctx.fillStyle=`rgba(255,${120+((i*37)%90)},30,.85)`;ctx.fillRect(qx-w/2,qy-h,w,h);ctx.fillStyle='rgba(255,230,120,.8)';ctx.fillRect(qx-w/4,qy-h*.5,w/2,h*.5)}}
 function ring(al,add){const r=Rc,pu=.65+.35*Math.sin(TT*3)+circ*.6;ctx.save();ctx.translate(cc.x,cc.y);
  if(add)ctx.globalCompositeOperation='lighter';else{ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.arc(0,0,r*1.08,0,7);ctx.fill()}
  const gg=ctx.createRadialGradient(0,0,r*.2,0,0,r*1.45);gg.addColorStop(0,`rgba(255,70,30,${(add?.16:.3)+circ*.2})`);gg.addColorStop(1,'rgba(255,40,10,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(0,0,r*1.45,0,7);ctx.fill();
  ctx.strokeStyle=`rgba(255,120,60,${al*pu})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.stroke();ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,r*.84,0,7);ctx.stroke();
  ctx.save();ctx.rotate(TT*.45);ctx.strokeStyle=`rgba(255,190,110,${al})`;ctx.beginPath();for(let i=0;i<28;i++){const a=i*TAU/28,l=i%2?2:4;ctx.moveTo(Math.cos(a)*r*1.02,Math.sin(a)*r*1.02);ctx.lineTo(Math.cos(a)*(r*1.02+l),Math.sin(a)*(r*1.02+l))}ctx.stroke();ctx.restore();
  ctx.save();ctx.rotate(-TT*.3);ctx.strokeStyle=`rgba(255,150,80,${al})`;ctx.beginPath();for(let i=0;i<=5;i++){const a=-Math.PI/2+i*TAU*2/5;i?ctx.lineTo(Math.cos(a)*r*.78,Math.sin(a)*r*.78):ctx.moveTo(Math.cos(a)*r*.78,Math.sin(a)*r*.78)}ctx.stroke();ctx.restore();ctx.restore()}
 function drawMin(m){const p=m.st=='rise'?Math.min(1,m.t/.7):1;ctx.save();ctx.globalAlpha=p;drawMob(m,m.x,m.y+(1-p)*6,m.fl>0);ctx.restore()}
 function drawHunter(){const h=hunterPos();warden(h.x,h.y+(Math.sin(TT*2)>0?0:.125),aim,0,0,'shotgun',0,'revolver',0)}
 function drawBoss(){ctx.save();ctx.translate(bp.x,bp.y-cast*1.5);ctx.scale(2.4,2.4);drawM({x:0,y:0,boss:1,bh:'summon',fl:0,st:'idle',a:Math.PI,wk:0,hp:1,mh:1},0,0);ctx.restore()}
 function darkness(){const q=dkx;q.globalCompositeOperation='source-over';q.clearRect(0,0,LW,LH);q.fillStyle='rgba(3,1,7,.82)';q.fillRect(0,0,LW,LH);q.globalCompositeOperation='destination-out';
  const Lt=(x,y,r,a)=>{const gg=q.createRadialGradient(x,y,2,x,y,r);gg.addColorStop(0,`rgba(0,0,0,${a})`);gg.addColorStop(1,'rgba(0,0,0,0)');q.fillStyle=gg;q.beginPath();q.arc(x,y,r,0,7);q.fill()};
  const ca=Math.cos(aim),sa=Math.sin(aim);Lt(hp.x,hp.y-4,72,.95);Lt(hp.x+ca*54,hp.y+sa*54-4,86,.62);Lt(cc.x,cc.y,Rc*3,.95);Lt(bp.x,bp.y-16,60,.75);
  mins.forEach(m=>Lt(m.x,m.y-4,24,.6));fires.forEach(f=>Lt(f.x,f.y-3,f.r*3.6,.95));
  if(fl>0){const mz=muzzle();Lt(mz.x+ca*24,mz.y+sa*24,150,.85*fl);Lt(mz.x,mz.y,56,fl)}q.globalCompositeOperation='source-over'}
 function frame(){const o=ctx,oT=T,sk=sel.skin;ctx=c;T=TT;sel.skin='warden';
  try{c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';fR(c,0,0,LW,LH,'#2a1b1d');
   c.save();if(shk>0.2)c.translate(R(-shk,shk)|0,R(-shk,shk)|0);
   c.drawImage(gr,0,0);c.drawImage(bl,0,0);ring(.8,false);
   const L=[];mins.forEach(m=>L.push([m.y,()=>drawMin(m)]));L.push([hp.y,drawHunter]);L.push([bp.y,drawBoss]);
   tree.forEach(t=>L.push([t.y,()=>{shadow(t.x,t.y,7);ctx.fillStyle='#1c0e10';ctx.fillRect(t.x-2,t.y-6,4,8)}]));fires.forEach(f=>L.push([f.y,()=>drawFire(f)]));
   L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());
   pt.forEach(p=>{c.fillStyle=p.c;c.fillRect(p.x|0,(p.y-p.z)|0,2,2)});bits.forEach(p=>{c.fillStyle=p.c;c.fillRect(p.x|0,(p.y-p.z)|0,p.s,p.s)});
   shells.forEach(p=>{c.fillStyle='#c8a040';c.fillRect(p.x|0,(p.y-p.z)|0,2,1)});
   for(const p of puffs){const a=p.l/p.m,r=p.r*(1+(1-a)*1.8);c.fillStyle='rgba('+p.c+','+(.3*a).toFixed(3)+')';c.beginPath();c.arc(p.x,p.y,r,0,7);c.fill()}
   tree.forEach(t=>{const x=t.x,y=t.y-14;c.fillStyle='rgba(22,10,14,.9)';c.beginPath();c.moveTo(x,y-18);c.lineTo(x-10,y+8);c.lineTo(x+10,y+8);c.closePath();c.fill();c.fillStyle='rgba(150,36,20,.75)';c.beginPath();c.moveTo(x,y-18);c.lineTo(x-3,y-4);c.lineTo(x+3,y-4);c.closePath();c.fill()});
   darkness();c.drawImage(dkc,0,0);
   // things that glow through the dark
   c.globalAlpha=.24+.1*Math.sin(TT*1.7)+circ*.12;c.drawImage(crk,0,0);c.globalAlpha=1;ring(.3,true);
   c.globalCompositeOperation='lighter';
   for(const t of trs){const a=t.l/t.m;c.strokeStyle='rgba(255,154,64,'+a+')';c.lineWidth=1.2;c.beginPath();c.moveTo(t.x0,t.y0);c.lineTo(t.x0+(t.x1-t.x0)*(1-a*.3),t.y0+(t.y1-t.y0)*(1-a*.3));c.stroke()}
   for(const s of sps){const a=s.l/s.m;c.fillStyle='rgba(255,'+(120+a*100|0)+',50,'+a+')';c.fillRect(s.x|0,s.y|0,1,1)}
   for(const e of emb){const f=.5+.5*Math.sin(TT*4+e.p);c.fillStyle='rgba(255,'+(110+f*90|0)+',50,'+(.3+.5*f)+')';c.fillRect(e.x|0,e.y|0,1,1)}
   c.globalCompositeOperation='source-over';
   if(fl>0){const mz=muzzle();c.save();c.translate(mz.x,mz.y);c.rotate(aim);c.globalAlpha=Math.min(1,fl*1.4);
    c.fillStyle='#ff8a20';c.beginPath();c.moveTo(-1,0);c.lineTo(7*fl+3,-4);c.lineTo(14*fl+5,0);c.lineTo(7*fl+3,4);c.closePath();c.fill();
    c.fillStyle='#ffe9a0';c.fillRect(0,-1.5,8*fl+3,3);c.fillStyle='#fff';c.fillRect(0,-.7,4*fl+2,1.4);c.restore()}
   c.restore();c.drawImage(vg,0,0)}
  finally{ctx=o;T=oT;sel.skin=sk}}
 const onR=()=>{resize();frame()};addEventListener('resize',onR);
 resize();for(let i=0;i<150;i++)step(1/30);cd=Math.min(cd,.4);
 function loop(ts){if(!alive||!cv.isConnected){removeEventListener('resize',onR);return}const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(!document.hidden){step(dt);frame()}requestAnimationFrame(loop)}
 requestAnimationFrame(ts=>{last=ts;loop(ts)});
 return{stop(){alive=0;removeEventListener('resize',onR)},step(n,dt){for(let i=0;i<n;i++)step(dt||1/60);frame()}}}

menu();requestAnimationFrame(loop);
