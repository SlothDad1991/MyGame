// ---------- MAP ----------
const NAMES=['Defiled Chapel','Bone Foundry','Blood Altar','Ruined Mill','Screaming Crypt','Hollow Church','Charnel House'];
const hs=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
function cline(x1,y1,x2,y2,s,j){const n=Math.max(2,Math.ceil(Math.hypot(x2-x1,y2-y1)/6));ctx.beginPath();ctx.moveTo(x1+(hs(s)-.5)*j,y1+(hs(s+1)-.5)*j);for(let i=1;i<=n;i++){const t=i/n;ctx.lineTo(x1+(x2-x1)*t+(hs(s+i*3)-.5)*j,y1+(y2-y1)*t+(hs(s+i*5+2)-.5)*j)}ctx.stroke()}
function crect(x,y,w,h,s,j){cline(x,y,x+w,y,s,j);cline(x+w,y,x+w,y+h,s+40,j);cline(x+w,y+h,x,y+h,s+80,j);cline(x,y+h,x,y,s+120,j)}
function skull(x,y,c){ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,5,0,7);ctx.fill();ctx.fillRect(x-3,y+3,6,4);ctx.fillStyle='#120a0c';ctx.fillRect(x-3,y-1,2,3);ctx.fillRect(x+1,y-1,2,3);ctx.fillRect(x-1,y+4,1,3);ctx.fillRect(x+1,y+4,1,3)}
function drawMap(){
 const s=.195,mw=WW*s,mh=WH*s,ox=(VW-mw)/2-20|0,oy=34,X=x=>ox+x*s,Y=y=>oy+y*s,tt=performance.now()/1000,pulse=.5+.5*Math.sin(tt*4),B=BOSS[boss],bs=M[0],CH='rgba(232,230,216,.9)';
 ctx.save();ctx.setLineDash([]);
 // dim the world, then the wooden-framed board
 ctx.fillStyle='rgba(4,2,6,.88)';ctx.fillRect(0,0,VW,VH);
 ctx.fillStyle='#2a1a10';ctx.fillRect(3,1,634,358);ctx.fillStyle='#4a3020';ctx.fillRect(6,4,628,352);
 ctx.fillStyle='rgba(0,0,0,.25)';for(let i=0;i<40;i++)ctx.fillRect(6,4+i*9+hs(i)*5|0,628,1);
 const g=ctx.createRadialGradient(VW*.3,VH*.2,20,VW/2,VH/2,420);g.addColorStop(0,'#4a1c1c');g.addColorStop(1,'#1c0b0d');ctx.fillStyle=g;ctx.fillRect(14,12,612,336);
 ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.strokeRect(14,12,612,336);
 ctx.fillStyle='rgba(232,230,216,.04)';for(let i=0;i<14;i++){ctx.beginPath();ctx.ellipse(30+hs(i)*580,20+hs(i+50)*320,30+hs(i+9)*40,6+hs(i+3)*8,hs(i+7)*3,0,7);ctx.fill()}
 // blood drips from the top rail + a pool in the corner
 ctx.fillStyle='#7a0c14';for(let i=0;i<9;i++){const x=40+hs(i+20)*540|0,l=6+hs(i)*24|0;ctx.fillRect(x,12,2,l);ctx.beginPath();ctx.arc(x+1,12+l,2.2,0,7);ctx.fill()}
 ctx.fillStyle='rgba(90,8,14,.75)';ctx.beginPath();ctx.ellipse(34,338,22,6,.1,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(48,341,10,3,0,0,7);ctx.fill();
 // title
 ctx.font="700 22px Caveat,'Comic Sans MS',cursive";tx('\u2620 The Breach, Scrawled in Blood \u2620',VW/2,28,'#e8e6d8','center');
 // map area
 ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(ox,oy,mw,mh);
 ctx.strokeStyle='rgba(232,230,216,.7)';ctx.lineWidth=1.5;ctx.setLineDash([6,3]);crect(ox,oy,mw,mh,900,1.2);ctx.setLineDash([]);
 ctx.fillStyle='rgba(170,70,50,.4)';trees.forEach(t=>ctx.fillRect(X(t.x)|0,Y(t.y)|0,1.5,1.5));
 // compass + scrawl on the left
 ctx.strokeStyle=CH;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(48,76,10,0,7);ctx.stroke();cline(48,60,48,92,7,1);cline(32,76,64,76,9,1);ctx.font="700 14px Caveat,cursive";tx('N',48,56,CH,'center');
 ctx.save();ctx.translate(20,236);ctx.rotate(-.22);ctx.font="700 15px Caveat,cursive";tx('the veil',0,0,'#b03030');tx('is torn',4,15,'#b03030');tx('open...',8,30,'#b03030');ctx.restore();
 // buildings
 ctx.font="700 10px Caveat,cursive";
 blds.forEach((b,i)=>{const lair=(found>=3||bossOpen)&&bs.bb===b&&bs.hp>0,x=X(b.x),y=Y(b.y),w=b.w*s,h=b.h*s;
  ctx.fillStyle=lair?'rgba(160,28,36,.2)':'rgba(232,230,216,.07)';ctx.fillRect(x,y,w,h);if(b.wg)ctx.fillRect(X(b.wg.x),Y(b.wg.y),b.wg.w*s,b.wg.h*s);
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.strokeStyle=lair?'rgba(210,60,70,.4)':'rgba(232,230,216,.2)';ctx.lineWidth=1;ctx.beginPath();for(let k=-h;k<w;k+=5){ctx.moveTo(x+k,y+h);ctx.lineTo(x+k+h,y)}ctx.stroke();ctx.restore();
  ctx.strokeStyle=lair?'#e0505a':CH;ctx.lineWidth=1.6;crect(x,y,w,h,i*17+3,1.4);
  tx(lair?'The Breach':NAMES[i%NAMES.length],x+w/2,y+h/2+3,lair?'#ff8a8a':'#e8e6d8','center')});
 // camp
 const cx0=X(camp.x),cy0=Y(camp.y);ctx.strokeStyle=CH;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(cx0-6,cy0+4);ctx.lineTo(cx0,cy0-6);ctx.lineTo(cx0+6,cy0+4);ctx.closePath();ctx.stroke();tx('Camp',cx0+9,cy0+3,'#e8e6d8');
 // extraction points
 exts.forEach(e=>{if(e.sealed){const x=X(e.x),y=Y(e.y);ctx.strokeStyle='rgba(224,80,90,'+(.6+.4*pulse)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.moveTo(x-6,y-6);ctx.lineTo(x+6,y+6);ctx.moveTo(x+6,y-6);ctx.lineTo(x-6,y+6);ctx.stroke();tx(CLM[e.k]||'It burned.',x,y+(y<60?20:-12),'#ff7a6a','center');return}const x=X(e.x),y=Y(e.y);ctx.strokeStyle=`rgba(143,224,160,${.5+.4*pulse})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,8+2*pulse,0,7);ctx.stroke();ctx.strokeStyle='#8fe0a0';ctx.lineWidth=1.2;ctx.beginPath();if(e.k){ctx.moveTo(x-5,y);ctx.quadraticCurveTo(x,y+5,x+5,y);ctx.moveTo(x,y);ctx.lineTo(x,y-5)}else{ctx.rect(x-5,y-3,10,5);ctx.moveTo(x-1,y+4.5);ctx.arc(x-3,y+4.5,2,0,7);ctx.moveTo(x+5,y+4.5);ctx.arc(x+3,y+4.5,2,0,7)}ctx.stroke();tx(e.n,x,y+(y<60?20:-12),'#8fe0a0','center')});
 // red string through the clues (and on to the lair once revealed)
 ctx.strokeStyle='rgba(176,36,36,.85)';ctx.lineWidth=1;ctx.beginPath();clues.forEach((c,i)=>i?ctx.lineTo(X(c.x),Y(c.y)):ctx.moveTo(X(c.x),Y(c.y)));if((found>=3||bossOpen)&&bs.hp>0)ctx.lineTo(X(bs.hx),Y(bs.hy));ctx.stroke();
 clues.forEach(c=>{const x=X(c.x),y=Y(c.y);
  if(c.got){ctx.strokeStyle='rgba(232,230,216,.45)';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(x-3,y-3);ctx.lineTo(x+3,y+3);ctx.moveTo(x+3,y-3);ctx.lineTo(x-3,y+3);ctx.stroke();return}
  ctx.strokeStyle=`rgba(255,90,60,${.6+.4*pulse})`;ctx.lineWidth=1.3;ctx.beginPath();ctx.arc(x,y,5,0,7);ctx.moveTo(x-5,y);ctx.lineTo(x+5,y);ctx.moveTo(x,y-5);ctx.lineTo(x,y+5);ctx.stroke();tx('?',x+8,y+3,'#ff8a7a')});
 // the demon
 if(bs.hp>0&&(found>=3||bossOpen)){const x=X(bs.hx),y=Y(bs.hy);
  ctx.fillStyle=`rgba(200,30,40,${.12+.12*pulse})`;ctx.beginPath();ctx.arc(x,y,16+4*pulse,0,7);ctx.fill();
  ctx.strokeStyle=`rgba(224,50,64,${.65+.35*pulse})`;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x-8,y-8);ctx.lineTo(x+8,y+8);ctx.moveTo(x+8,y-8);ctx.lineTo(x-8,y+8);ctx.stroke();
  skull(x,y-17,'#e8e6d8');ctx.font="700 13px Caveat,cursive";tx(B.n,x,y+20,'#ff6a6a','center');ctx.font="700 10px Caveat,cursive"}
 else if(corpse&&!banished&&!bty){const x=X(corpse.x),y=Y(corpse.y);ctx.strokeStyle='rgba(216,200,144,.9)';ctx.lineWidth=1.3;ctx.beginPath();ctx.arc(x,y,6+pulse*2,0,7);ctx.stroke();skull(x,y,'#9a968a');tx('Banish (hold E)',x,y+16,'#d8c890','center')}
 // the bounty (carrier, or the cash where a carrier fell)
 if(bty){let wx=null,wy=null,lb='';if(bty.h===mp.me){wx=P.x;wy=P.y;lb='Bounty (you)'}else if(bty.h==null){const c=items.find(i=>i.t=='cash'&&D(i.x,i.y,bty.x,bty.y)<40);wx=c?c.x:bty.x;wy=c?c.y:bty.y;lb='Bounty (dropped)'}else{const r=mp.rp[bty.h];if(r){wx=r.x;wy=r.y;lb='Bounty - '+hn(bty.h)}}
  if(wx!=null){const x=X(wx),y=Y(wy);ctx.fillStyle=`rgba(224,176,64,${.14+.12*pulse})`;ctx.beginPath();ctx.arc(x,y,15+4*pulse,0,7);ctx.fill();ctx.strokeStyle=`rgba(224,176,64,${.7+.3*pulse})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,8+2*pulse,0,7);ctx.stroke();ctx.fillStyle='#e0b040';ctx.beginPath();ctx.arc(x,y,4.5,0,7);ctx.fill();ctx.fillStyle='#4a3020';ctx.fillRect(x-.6,y-2.8,1.2,5.6);ctx.font="700 12px Caveat,cursive";tx(lb,x,y+(bty.h===mp.me?24:21),'#f0c850','center');ctx.font="700 10px Caveat,cursive"}}
 // you
 const px=X(P.x),py=Y(P.y),f=P.face;ctx.strokeStyle=`rgba(255,255,255,${.35+.4*pulse})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(px,py,6+3*pulse,0,7);ctx.stroke();
 ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(px+Math.cos(f)*6,py+Math.sin(f)*6);ctx.lineTo(px+Math.cos(f+2.5)*4.5,py+Math.sin(f+2.5)*4.5);ctx.lineTo(px+Math.cos(f-2.5)*4.5,py+Math.sin(f-2.5)*4.5);ctx.closePath();ctx.fill();
 ctx.font="700 11px Caveat,cursive";tx('YOU',px,py-10,'#fff','center');
 // legend
 const lx=526;ctx.font="700 16px Caveat,cursive";tx('Key',lx,48,'#e8e6d8');ctx.strokeStyle='rgba(232,230,216,.5)';ctx.lineWidth=1;ctx.setLineDash([3,2]);cline(lx,53,lx+92,53,5,1);ctx.setLineDash([]);
 ctx.font="700 13px Caveat,cursive";const row=i=>76+i*20;
 ctx.strokeStyle=CH;ctx.lineWidth=1.3;crect(lx,row(0)-8,11,8,70,1);tx('Building',lx+18,row(0),'#e8e6d8');
 ctx.strokeStyle='#ff5a3c';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(lx+5.5,row(1)-4,4,0,7);ctx.moveTo(lx+1.5,row(1)-4);ctx.lineTo(lx+9.5,row(1)-4);ctx.moveTo(lx+5.5,row(1)-8);ctx.lineTo(lx+5.5,row(1));ctx.stroke();tx(`Sigil (${found}/3)`,lx+18,row(1),'#e8e6d8');
 ctx.strokeStyle='#8fe0a0';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(lx+5.5,row(2)-4,4,0,7);ctx.stroke();tx('Escape route',lx+18,row(2),'#8fe0a0');
 ctx.strokeStyle=CH;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(lx,row(3));ctx.lineTo(lx+5.5,row(3)-9);ctx.lineTo(lx+11,row(3));ctx.closePath();ctx.stroke();tx('Camp',lx+18,row(3),'#e8e6d8');
 ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(lx+12,row(4)-4);ctx.lineTo(lx+2,row(4)-8);ctx.lineTo(lx+2,row(4));ctx.closePath();ctx.fill();tx('You',lx+18,row(4),'#e8e6d8');
 const known=(found>=3||bossOpen);ctx.strokeStyle=known?'#e0505a':'rgba(224,80,90,.4)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(lx+1,row(5)-9);ctx.lineTo(lx+10,row(5));ctx.moveTo(lx+10,row(5)-9);ctx.lineTo(lx+1,row(5));ctx.stroke();tx(known?B.n:'???',lx+18,row(5),known?'#ff6a6a':'#8a6a6a');
ctx.fillStyle='#e0b040';ctx.beginPath();ctx.arc(lx+5.5,row(6)-4,4.5,0,7);ctx.fill();tx('Bounty',lx+18,row(6),'#e0b040');
const note=banished?['Demon banished.','Run to the exit!']:bty?(bty.h===mp.me?['You hold the','bounty. Run!']:['The bounty is','marked in gold.']):bs.hp<=0?['It is dead.','Banish the corpse.']:(found>=3||bossOpen)?['The breach is','marked in red.']:['Burn all 3 sigils','to reveal the breach.'];
 ctx.font="700 14px Caveat,cursive";note.forEach((l,i)=>tx(l,lx,row(7)+14+i*15,'#d06a5a'));
 ctx.font="700 13px Caveat,cursive";tx('[M] or [Esc] to close',VW/2-20,342,'#d8c890','center');
 ctx.restore()}
function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(mode=='play'){if(!showMap&&!invOpen)update(dt);else if(mp.on)mpPause(dt);if(mode=='play'){render();if(showMap)drawMap();if(invOpen)drawInv();drawBanner()}}else if(mode=='menu')drawHero();requestAnimationFrame(loop)}
