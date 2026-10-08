// ---------- RENDER ----------
function shadow(x,y,r){ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(x,y+3,r,r*.45,0,0,7);ctx.fill()}
function human(x,y,a,body,hat,fl,wk,gun){shadow(x,y,6);const b=Math.sin(wk)*1.5;ctx.fillStyle='#1d1a24';ctx.fillRect(x-3,y+2+b,2,4);ctx.fillRect(x+1,y+2-b,2,4);
 ctx.fillStyle=fl?'#fff':body;ctx.fillRect(x-4,y-6,8,9);ctx.fillStyle='#000';ctx.fillRect(x-4,y,8,1);ctx.fillStyle=fl?'#fff':'#d8b898';ctx.fillRect(x-2,y-10,4,4);
 if(hat){ctx.fillStyle=hat;ctx.fillRect(x-5,y-11,10,2);ctx.fillRect(x-3,y-14,6,3)}else{ctx.fillStyle='#c01020';ctx.fillRect(x-2,y-9,1,1);ctx.fillRect(x+1,y-9,1,1)}
 ctx.strokeStyle=gun||'#7a8a5c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-2);ctx.lineTo(x+Math.cos(a)*(gun?11:7),y-2+Math.sin(a)*(gun?11:7));ctx.stroke()}
function drawWpn(k,hx,hy,a,sc){const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};ctx.save();ctx.translate(hx,hy);ctx.rotate(a);if(Math.cos(a)<0)ctx.scale(1,-1);const q=sc||1;ctx.scale(q,q);
 if(k=='rifle'){r(-4,-1,6,2.2,'#6a4326');r(-4,-1,6,.6,'#8a5a32');r(2,-1.3,5,2.4,'#2c2c34');r(7,-.7,9,1.4,'#aab0bc');r(7,-.7,9,.5,'#e0e4ec');r(5,-3.2,5,1.5,'#1a1a20');r(9.2,-3,.8,1.1,'#ff5a3c');r(15.5,-1.3,1.5,2.6,'#e8c860')}
 else if(k=='shotgun'){r(-5,-1.3,7,2.6,'#7a4a28');r(-5,-1.3,7,.7,'#9a6438');r(2,-1.6,3,3.2,'#3a3a42');r(5,-1.8,10,1.4,'#4a4a52');r(5,.4,10,1.4,'#4a4a52');r(8,-1.5,1,.7,'#ff6a1a');r(11,.7,1,.7,'#ff6a1a');r(14.5,-2,1,4,'#222');r(4,-.4,2,.8,'#8a1c1c')}
 else if(k=='repeater'){r(-4,-1,5,2.2,'#8a5a32');r(1,-1.5,5,3,'#c8a050');r(1,-1.5,5,.8,'#e8c878');r(6,-.9,9,1.3,'#6a6a72');r(6,.6,8,1.1,'#9a9aa2');r(2,1.6,3.5,.8,'#c8a050');r(2,1.6,.8,2,'#c8a050');r(14,-1.8,.8,.9,'#222')}
 else if(k=='crossbow'){r(-4,-1.1,12,2.2,'#5a3a22');r(-4,-1.1,12,.6,'#7a5232');ctx.strokeStyle='#cfd4e0';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(6,-8);ctx.quadraticCurveTo(12,0,6,8);ctx.stroke();ctx.strokeStyle='#e8e0c0';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(6,-8);ctx.lineTo(2,0);ctx.lineTo(6,8);ctx.stroke();r(0,-.4,12,.9,'#d8d8e0');ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(12,-1.4);ctx.lineTo(15,0);ctx.lineTo(12,1.4);ctx.fill();r(6,-.3,2,.6,'#60b0ff')}
 else if(k=='pistol'){r(-1.5,.4,2.6,4,'#5a3a22');r(-1.5,.4,.8,4,'#7a5232');r(-1.5,-1.4,9,2.2,'#4a4a56');r(-1.5,-1.4,9,.6,'#8a8a98');r(1.5,.8,2,1.2,'#2a2a30');r(7,-1,1,.7,'#222')}
 else if(k=='revolver'){r(-2.5,.4,3,4.2,'#e8e0c8');r(-2.5,.4,.8,4.2,'#fff6dc');r(0,-1.6,4,3,'#8a8a96');ctx.fillStyle='#c8c8d4';ctx.beginPath();ctx.arc(3,-.2,2.6,0,7);ctx.fill();ctx.fillStyle='#4a4a56';for(let i=0;i<4;i++)ctx.fillRect(3+Math.cos(i*1.57)*1.4-.4,-.2+Math.sin(i*1.57)*1.4-.4,.8,.8);r(5,-1,9,1.6,'#b8b8c4');r(9,-1.2,1,2,'#e8c860');r(13,-.7,.9,.9,'#60b0ff')}
 else if(k=='tonic'){r(0,-2.4,5,4.8,'#5aa0e0');r(.6,-2.4,1.2,4.8,'#9ad0ff');r(5,-1,2.4,2,'#cfe8ff');r(7.4,-1.1,1.6,2.2,'#8a5a32');r(1.8,-.5,2.4,1,'#fff');r(2.5,-1.4,.9,2.8,'#fff')}
 else if(k=='bomb'){r(0,-1.8,8,3.6,'#b02020');r(0,-1.8,8,.8,'#d84040');r(3.4,-2,1.2,4,'#e8c860');r(8,-.3,2.4,.7,'#6a5a3a');if(Math.sin(performance.now()/60)>-.3)r(10.4,-1,1.8,2,'#ffa030');r(5.4,-.4,1.4,.8,'#e8c860')}
 else if(k=='pepperbox'){r(-4,-.6,5,2.2,'#6a4326');r(-4,-.6,5,.6,'#8a5a32');r(-1.5,-2.6,1.6,1.4,'#4a4a56');r(.5,-1.8,4,3.4,'#8a8a96');r(.5,-1.8,4,.7,'#b8b8c4');r(2.5,1.6,2.4,4.4,'#6a4326');r(2.5,1.6,.7,4.4,'#8a5a32');r(4.5,-2.6,9,5.2,'#4a4a56');r(4.5,-2.6,9,.7,'#8a8a98');r(4.5,-.3,9,.6,'#2a2a30');r(4.5,1.7,9,.7,'#2a2a30');r(8.5,-2.8,.8,5.6,'#c8a050');r(12.8,-2.8,1,5.6,'#9a9aa8');r(13.6,-1.9,.6,.8,'#e8c860');r(13.6,.6,.6,.8,'#e8c860')}
 else if(k=='musket'){r(-5,-1,8,2.4,'#6a4326');r(-5,-1,8,.6,'#8a5a32');r(3,-1.2,3,2.4,'#b8b8c4');r(3.4,-2,1,1,'#8a8a98');r(6,-.8,13,1.4,'#6a6a74');r(6,-.8,13,.5,'#aab0bc');r(8,-3,6,1.2,'#1a1a20');r(14,-3.2,.8,1.6,'#60b0ff');r(10,-.9,.8,1.6,'#e8c860');r(16,-.9,.8,1.6,'#e8c860');r(18.5,-1.1,1,2.2,'#e8c860')}
 else if(k=='flamer'){r(-4,-1.2,6,2.4,'#5a3a22');r(-1,1.2,6,3.6,'#b03020');r(-1,1.2,6,.8,'#e05040');r(1,.6,2,.7,'#e8c860');r(2,-1.5,5,3,'#3a3a42');r(7,-1,7,2,'#4a4a52');r(7,-1,7,.6,'#8a8a96');r(13.5,-1.5,1.5,3,'#222');if(Math.sin(performance.now()/70)>-.4){r(15,-1,2.4,2,'#ffa030');r(15,-.5,1.4,1,'#ffe070')}}
 else if(k=='handcannon'){r(-2.5,.4,3,4.4,'#3a2a22');r(-1,-1.8,5,3.2,'#5a5a66');r(4,-1.5,9,2.4,'#7a7a88');r(4,-1.5,9,.6,'#b0b0c0');r(12.5,-1.8,1,3,'#222');r(.5,-2.4,3,1,'#4a4a56');r(8,-1.6,.8,2.6,'#e8c860');r(-1.5,-2.4,1.4,1.2,'#2a2a30')}
 else if(k=='whisper'){r(-1.5,.4,2.6,4,'#2a2a30');r(-1.5,-1.4,8,2.2,'#3a3a46');r(-1.5,-1.4,8,.6,'#6a6a78');r(6.5,-1.2,7,2,'#1e1e24');r(6.5,-1.2,7,.5,'#4a4a56');r(9,-1.3,.7,2.2,'#6a6a78');r(11.5,-1.3,.7,2.2,'#6a6a78')}
 else if(k=='flask'){r(0,-2.4,5,4.8,'#c0481c');r(.6,-2.4,1.2,4.8,'#ff9a50');r(5,-1,2.4,2,'#e8c8a0');r(7.4,-1.1,1.6,2.2,'#e8e0c8');r(1.8,-.4,2.4,.9,'#ffe070');r(2.5,-1.3,.9,2.6,'#ffe070');if(Math.sin(performance.now()/60)>-.3)r(9,-1.2,1.8,2.4,'#ffa030')}
 else if(k=='flare'){r(0,-1.2,9,2.4,'#c02828');r(0,-1.2,9,.7,'#e86060');r(9,-1.4,1.6,2.8,'#e8e0c8');r(3,-1.3,1.2,2.6,'#e8c860');r(5.6,-1.3,.8,2.6,'#e8c860');if(Math.sin(performance.now()/50)>-.5){r(10.6,-1.4,2.2,2.8,'#ffe070');r(11.4,-.7,1.4,1.4,'#fff')}}
 else if(k=='tripwire'){r(-9,-3,2,6,'#7a6a58');r(7,-3,2,6,'#7a6a58');r(-7,-.4,14,.8,'#d05050');r(-2,-2.5,4,4,'#4a4640');r(-.5,-3.5,1,1.2,'#ff5a3a')}
 else if(k=='ward'){r(-2,-.3,2.4,.6,'#cfc8b8');r(8,-.3,2.2,.6,'#cfc8b8');ctx.fillStyle='#e8c860';ctx.beginPath();ctx.arc(4,0,3.8,0,7);ctx.fill();ctx.fillStyle='#8a6a20';ctx.beginPath();ctx.arc(4,0,2.6,0,7);ctx.fill();r(3.6,-1.9,.8,3.8,'#fff6dc');r(2.1,-.4,3.8,.8,'#fff6dc')}
 ctx.restore()}
const BC={pepperbox:['#ffd860',1.5,.022],musket:['#fff6c0',1.8,.04],flamer:['#ff8a20',3,.025],handcannon:['#ffd860',2,.022],whisper:['#c8d0e0',1,.02],rifle:['#fff6c0',1.6,.03],shotgun:['#ff9a40',1.2,.012],repeater:['#ffe070',1.2,.018],crossbow:['#e8ecff',1.4,.045],pistol:['#ffe9a0',1.2,.014],revolver:['#ffd860',1.8,.02]};
const SKB={
knight(x,y,a,fl,wk,hurt,b,t,ca,sa,K){const Z=(c,X,Y,w,h)=>{ctx.fillStyle=fl?'#fff':c;ctx.fillRect(X,Y,w,h)},H=c=>hurt?'#8a2a2a':c;
 Z('#3a3d46',x-3.5,y+3+b,3,4);Z('#3a3d46',x+.5,y+3-b,3,4);Z(K.coat2,x-3.5,y+3+b,3,1.3);Z(K.coat2,x+.5,y+3-b,3,1.3);
 Z(H(K.rune),x-3.5,y-3,7,9);Z(K.band,x-.5,y-2,1,6);Z(K.band,x-2.2,y-.5,4.4,1);
 Z(H(K.coat),x-6,y-7,12,5);Z(K.coat2,x-6,y-7,12,1.3);Z(K.coat2,x-8,y-8,4,4.5);Z(K.coat2,x+4,y-8,4,4.5);Z(K.band,x-7.5,y-8,3,1);Z(K.band,x+4.5,y-8,3,1);
 Z('#2a1c10',x-4.5,y+.8,9,1.3);Z(K.band,x-1,y+.8,2,1.3);
 if(!fl){ctx.fillStyle=K.rune;ctx.beginPath();ctx.moveTo(x-ca*1.5,y-15);ctx.quadraticCurveTo(x-ca*8,y-21+Math.sin(t*4),x-ca*9,y-14+Math.sin(t*3));ctx.lineTo(x-ca,y-12.5);ctx.fill()}
 Z(K.hood,x-4,y-14.5,8,8);Z(K.hood,x-3,y-16,6,2);Z(K.coat2,x-4,y-14.5,1,8);Z(K.coat2,x-.5,y-16,1,3.5);
 Z('#0a0a10',x-3.5,y-11,7,1.8);if(!fl){ctx.globalAlpha=.35;ctx.fillStyle=K.eyeg;ctx.fillRect(x-4+ca*.8,y-12,8,3.6);ctx.globalAlpha=1;ctx.fillStyle=K.eye;ctx.fillRect(x-3+ca*.8,y-10.6,2,1);ctx.fillRect(x+1+ca*.8,y-10.6,2,1)}
 Z(K.coat,x-3.5,y-8.5,7,1.5)},
gun(x,y,a,fl,wk,hurt,b,t,ca,sa,K){const Z=(c,X,Y,w,h)=>{ctx.fillStyle=fl?'#fff':c;ctx.fillRect(X,Y,w,h)},H=c=>hurt?'#8a2a2a':c;
 Z('#2a1c10',x-3.5,y+3+b,3,4);Z('#2a1c10',x+.5,y+3-b,3,4);Z(K.band,x-3.8,y+6.2+b,1,1);Z(K.band,x+2.8,y+6.2-b,1,1);
 ctx.fillStyle=fl?'#fff':H(K.coat);ctx.beginPath();ctx.moveTo(x-5,y-6);ctx.lineTo(x+5,y-6);ctx.lineTo(x+7.5,y+5.5+Math.sin(wk)*.5);ctx.lineTo(x-7.5,y+5.5-Math.sin(wk)*.5);ctx.closePath();ctx.fill();
 Z('#14101a',x-.4,y-4,.8,9.5);Z(K.coat2,x-7.5,y+4.2,15,1.3);Z('#2a1c10',x-5,y-.8,10,1.4);Z(K.band,x-1,y-.8,2,1.4);
 if(!fl){ctx.fillStyle='#d8b050';for(let i=0;i<4;i++)ctx.fillRect(x-4.5+i*2.4,y-.6,1,1)}
 Z(H(K.coat2),x-7,y-7.5,14,3.2);
 Z(K.mask,x-3,y-12.2,6,5.8);Z(K.rune,x-3,y-9.2,6,3.3);Z(K.rune,x-ca*3.8-1,y-8.5,2,2.2);
 Z('#1a120a',x-3,y-12,6,.9);Z(K.eye,x-2+ca*.7,y-10.8,1.5,1.2);Z(K.eye,x+.7+ca*.7,y-10.8,1.5,1.2);
 if(!fl){ctx.fillStyle='#14101a';ctx.fillRect(x-1.5+ca,y-10.6,.7,.8);ctx.fillRect(x+1.2+ca,y-10.6,.7,.8)}
 Z(K.hood,x-8.5,y-13,17,1.8);Z(K.hood,x-4,y-18,8,5.4);Z(K.band,x-4,y-14.3,8,1.1)},
bones(x,y,a,fl,wk,hurt,b,t,ca,sa,K){const Z=(c,X,Y,w,h)=>{ctx.fillStyle=fl?'#fff':c;ctx.fillRect(X,Y,w,h)},H=c=>hurt?'#8a2a2a':c,ex=ca*.7;
 Z(K.coat,x-2.7,y+2+b,1,5);Z(K.coat,x+1.7,y+2-b,1,5);Z(K.coat,x-3.5,y+6.4+b,2.6,1);Z(K.coat,x+1,y+6.4-b,2.6,1);Z(K.coat2,x-3.2,y+4.2+b,1.7,.8);Z(K.coat2,x+1.4,y+4.2-b,1.7,.8);
 Z(K.coat,x-3.2,y+.8,6.4,2);Z(K.hood,x-4,y-6.8,8,7);Z(K.coat,x-.5,y-7,1,8);
 for(let i=0;i<4;i++){const w=8-i;Z(H(K.coat),x-w/2,y-6.2+i*1.6,w,.8)}
 ctx.fillStyle=fl?'#fff':H(K.rune);ctx.beginPath();ctx.moveTo(x-6,y-7.5);ctx.lineTo(x+6,y-7.5);ctx.lineTo(x+5,y-3);ctx.lineTo(x+3,y-4.5);ctx.lineTo(x+1,y-1.5);ctx.lineTo(x-1,y-4.5);ctx.lineTo(x-3,y-2);ctx.lineTo(x-5,y-4);ctx.closePath();ctx.fill();
 Z(K.mask,x-3.5,y-14.5,7,6.5);Z(K.mask,x-2.5,y-8.2,5,2);Z('#14101a',x-1.5,y-7.5,.6,1.3);Z('#14101a',x+.9,y-7.5,.6,1.3);
 Z('#14101a',x-2.8+ex,y-12.5,2.3,2.5);Z('#14101a',x+.5+ex,y-12.5,2.3,2.5);Z('#14101a',x-.4+ex,y-10,.8,1.2);
 if(!fl){ctx.globalAlpha=.4+.3*Math.sin(t*5);ctx.fillStyle=K.eyeg;ctx.fillRect(x-3.2+ex,y-12.9,3.1,3.3);ctx.fillRect(x+.1+ex,y-12.9,3.1,3.3);ctx.globalAlpha=1;ctx.fillStyle=K.eye;ctx.fillRect(x-2.1+ex,y-11.8,1,1);ctx.fillRect(x+1.2+ex,y-11.8,1,1)}},
witch(x,y,a,fl,wk,hurt,b,t,ca,sa,K){const Z=(c,X,Y,w,h)=>{ctx.fillStyle=fl?'#fff':c;ctx.fillRect(X,Y,w,h)},H=c=>hurt?'#8a2a2a':c,ex=ca*.7,sw=Math.sin(wk)*.8;
 ctx.fillStyle=fl?'#fff':H(K.coat);ctx.beginPath();ctx.moveTo(x-4,y-6);ctx.lineTo(x+4,y-6);ctx.lineTo(x+8,y+6.5);ctx.lineTo(x+4,y+5.2+sw);ctx.lineTo(x,y+6.6);ctx.lineTo(x-4,y+5.2-sw);ctx.lineTo(x-8,y+6.5);ctx.closePath();ctx.fill();
 Z(K.coat2,x-5,y-6,2,5);Z(K.coat2,x+3,y-6,2,5);Z(K.band,x-4,y-1.5,8,1.3);Z(K.rune,x+3,y-.3,2,2.5);Z(K.coat2,x-7,y+5,14,1);
 Z('#d8d8e8',x-4.2,y-12,1.6,7);Z('#d8d8e8',x+2.6,y-12,1.6,7);
 Z(K.mask,x-3,y-11.5,6,5.5);
 ctx.fillStyle=fl?'#fff':'#7aa05a';ctx.beginPath();ctx.moveTo(x,y-9.8);ctx.lineTo(x+ca*5,y-8.3+sa*2.5);ctx.lineTo(x+.8,y-7.8);ctx.closePath();ctx.fill();
 Z(K.eye,x-2+ex,y-10.4,1.4,1.2);Z(K.eye,x+.8+ex,y-10.4,1.4,1.2);
 if(!fl){ctx.globalAlpha=.3;ctx.fillStyle=K.eyeg;ctx.fillRect(x-3+ex,y-11.4,3,3);ctx.fillRect(x+ex,y-11.4,3,3);ctx.globalAlpha=1}
 Z(K.hood,x-7.5,y-12.8,15,1.6);
 ctx.fillStyle=fl?'#fff':K.hood;ctx.beginPath();ctx.moveTo(x-4.5,y-12.6);ctx.lineTo(x+Math.sin(t*2)*1.2,y-23);ctx.lineTo(x+4.5,y-12.6);ctx.closePath();ctx.fill();
 Z(K.band,x-4.4,y-14.6,8.8,1.3)},
reaper(x,y,a,fl,wk,hurt,b,t,ca,sa,K){const Z=(c,X,Y,w,h)=>{ctx.fillStyle=fl?'#fff':c;ctx.fillRect(X,Y,w,h)},H=c=>hurt?'#8a2a2a':c,ex=ca*.7,f=Math.sin(t*3.4),pu=.5+.5*Math.sin(t*5);
 for(const sd of[-1,1]){const sh=[x+sd*3,y-6],el=[x+sd*11,y-17-f*2],tp=[x+sd*18,y-9-f*3],fg=[[x+sd*19,y-1-f*2],[x+sd*16,y+4-f],[x+sd*11,y+6],[x+sd*6,y+3]];
  ctx.fillStyle=fl?'#fff':hurt?'#6a1c1c':'#4a1020';ctx.beginPath();ctx.moveTo(sh[0],sh[1]);ctx.lineTo(el[0],el[1]);ctx.lineTo(tp[0],tp[1]);for(const q of fg)ctx.lineTo(q[0],q[1]);ctx.lineTo(x+sd*3,y+1);ctx.closePath();ctx.fill();
  if(!fl){ctx.strokeStyle='#14040a';ctx.lineWidth=.7;for(const q of fg){ctx.beginPath();ctx.moveTo(tp[0],tp[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()}ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(sh[0],sh[1]);ctx.lineTo(el[0],el[1]);ctx.lineTo(tp[0],tp[1]);ctx.stroke()}
  ctx.fillStyle=fl?'#fff':K.mask;ctx.beginPath();ctx.moveTo(el[0]-sd*.8,el[1]);ctx.lineTo(el[0]+sd*1.6,el[1]-4);ctx.lineTo(el[0]+sd*1,el[1]+1);ctx.fill();ctx.beginPath();ctx.moveTo(tp[0]-sd*.6,tp[1]-.5);ctx.lineTo(tp[0]+sd*2.2,tp[1]-3.4);ctx.lineTo(tp[0]+sd*1.2,tp[1]+1);ctx.fill()}
 Z('#1c070e',x-3,y+3+b,2.6,4);Z('#1c070e',x+.4,y+3-b,2.6,4);Z(K.mask,x-3.2,y+6.2+b,3,1);Z(K.mask,x+.2,y+6.2-b,3,1);
 ctx.fillStyle=fl?'#fff':H(K.coat);ctx.beginPath();ctx.moveTo(x-6,y-6.5);ctx.quadraticCurveTo(x,y-9,x+6,y-6.5);ctx.lineTo(x+4,y+1);ctx.quadraticCurveTo(x,y+5,x-4,y+1);ctx.closePath();ctx.fill();
 Z(H(K.hood),x-3,y-.5,6,4);
 if(!fl){ctx.strokeStyle=K.coat2;ctx.lineWidth=.5;for(let i=0;i<3;i++){const yy=y-5+i*2.2,w=4.6-i*.5;ctx.beginPath();ctx.moveTo(x-w,yy);ctx.quadraticCurveTo(x,yy+1.3,x+w,yy);ctx.stroke()}
  const cg=ctx.createRadialGradient(x,y-2.5,.3,x,y-2.5,5);cg.addColorStop(0,'rgba(255,'+((130+pu*80)|0)+',30,.95)');cg.addColorStop(1,'rgba(255,60,10,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(x,y-2.5,5,0,7);ctx.fill()}
 Z(H(K.coat2),x-8,y-8,4,3.6);Z(H(K.coat2),x+4,y-8,4,3.6);Z(K.mask,x-7.4,y-9,.9,1.4);Z(K.mask,x+6.5,y-9,.9,1.4);
 for(const sd of[-1,1]){ctx.fillStyle=fl?'#fff':K.mask;ctx.beginPath();ctx.moveTo(x+sd*2.6,y-14);ctx.quadraticCurveTo(x+sd*7.5,y-15,x+sd*6.6,y-22.5);ctx.quadraticCurveTo(x+sd*5,y-16.5,x+sd*1.8,y-12.5);ctx.closePath();ctx.fill()}
 const jw=.5+pu*.6;
 Z(H(K.hood),x-4.2,y-15,8.4,8.6);
 Z(K.mask,x-4.2,y-15,4.6,3.4);Z(K.mask,x-1.6,y-15.4,3.4,1.8);Z('#b8ac88',x-4.2,y-12,1.2,1.2);
 Z(H('#8a1020'),x+1,y-14.4,3.2,3.6);Z('#5a0a14',x+1.9,y-13.2,1.3,1.5);Z('#c01828',x+3.2,y-11.6,1,.8);
 if(!fl){ctx.strokeStyle='#14040a';ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(x-1.2,y-15.2);ctx.lineTo(x-2,y-13.8);ctx.lineTo(x-1,y-12.8);ctx.lineTo(x-1.7,y-11.8);ctx.stroke();ctx.beginPath();ctx.moveTo(x+.6,y-15.2);ctx.lineTo(x+1.2,y-14.2);ctx.stroke()}
 for(const sd of[-1,1]){ctx.fillStyle=fl?'#fff':'#05030a';ctx.beginPath();ctx.moveTo(x+sd*.5+ex,y-12.9);ctx.lineTo(x+sd*4+ex,y-14);ctx.lineTo(x+sd*3.6+ex,y-10.6);ctx.lineTo(x+sd*1.3+ex,y-10);ctx.closePath();ctx.fill();
  if(!fl){ctx.globalAlpha=.18+.2*pu;ctx.fillStyle=K.eyeg;ctx.beginPath();ctx.arc(x+sd*2.4+ex,y-12.1,1.5,0,7);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle=K.eye;ctx.fillRect(x+sd*2.4+ex-.5,y-12.6,1,1.3);
   ctx.fillStyle='#b01020';const ln=2.4+1.6*Math.sin(t*2+sd*2);ctx.fillRect(x+sd*2.9+ex-.3,y-10.6,.6,ln);ctx.fillRect(x+sd*2.9+ex-.5,y-10.6+ln,1,.8)}
  ctx.strokeStyle=fl?'#fff':'#14040a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+sd*.2,y-13.2);ctx.lineTo(x+sd*4.4,y-14.9);ctx.stroke()}
 Z('#05030a',x-1.2,y-10,.9,1.5);Z('#05030a',x+.3,y-10,.9,1.5);
 ctx.fillStyle=fl?'#fff':'#14040a';ctx.beginPath();ctx.moveTo(x-4.7,y-9.5);ctx.lineTo(x+4.7,y-9.5);ctx.lineTo(x+3.7,y-7+jw);ctx.lineTo(x-3.7,y-7+jw);ctx.closePath();ctx.fill();
 if(!fl){ctx.globalAlpha=.55;ctx.fillStyle='#c01418';ctx.fillRect(x-3,y-8.8,6,1+jw*.6);ctx.globalAlpha=1;ctx.fillStyle=K.mask;
  for(let i=-4;i<=4;i++){const h=1.3+(i&1?.9:0);ctx.beginPath();ctx.moveTo(x+i*1.04-.5,y-9.5);ctx.lineTo(x+i*1.04+.5,y-9.5);ctx.lineTo(x+i*1.04+(i%3?.1:-.1),y-9.5+h);ctx.fill()}
  for(let i=-3;i<=3;i++){const h=1.2+(i&1?0:.9);ctx.beginPath();ctx.moveTo(x+i*1.04-.5,y-7+jw);ctx.lineTo(x+i*1.04+.5,y-7+jw);ctx.lineTo(x+i*1.04,y-7+jw-h);ctx.fill()}
  ctx.strokeStyle='#d8cca8';ctx.lineWidth=.35;for(const sd of[-1,1])for(let j=0;j<3;j++){const sx=x+sd*(3.2+j*.55);ctx.beginPath();ctx.moveTo(sx,y-10.3);ctx.lineTo(sx+sd*.2,y-8.2+jw*.5);ctx.stroke()}
  ctx.fillStyle='#b01020';ctx.fillRect(x-2,y-7+jw,.6,1.4+Math.sin(t*3)*.8);ctx.fillRect(x+1.6,y-7+jw,.6,1.2+Math.sin(t*3+2)*.8);ctx.fillRect(x-.2,y-7+jw,.5,.9+Math.sin(t*3+4)*.5);ctx.fillStyle='rgba(120,8,18,.6)';ctx.fillRect(x-4.2,y-10.8,.8,2.4)}
 Z(H('#2e0e18'),x-3,y-6.9+jw,6,1)}
,
wolf(x,y,a,fl,wk,hurt,b,t,ca,sa,K){const Z=(c,X,Y,w,h)=>{ctx.fillStyle=fl?'#fff':c;ctx.fillRect(X,Y,w,h)},H=c=>hurt?'#8a2a2a':c,ex=ca*.7;
 ctx.fillStyle=fl?'#fff':K.coat;ctx.beginPath();ctx.moveTo(x-ca*3,y+1);ctx.quadraticCurveTo(x-ca*8,y+Math.sin(t*5)*1.5,x-ca*11,y+4+Math.sin(t*5+1)*1.5);ctx.quadraticCurveTo(x-ca*7,y+5,x-ca*3,y+3);ctx.fill();
 Z(K.band,x-3,y+3+b,2.5,4);Z(K.band,x+.5,y+3-b,2.5,4);Z(K.coat2,x-3.3,y+3+b,3.1,1.6);Z(K.coat2,x+.2,y+3-b,3.1,1.6);
 Z(H(K.mask),x-4,y-6,8,7);Z(K.rune,x-2.5,y-5,.9,3.5);Z(K.rune,x+1.6,y-4.5,.9,3);
 Z(K.band,x-4.5,y+.4,9,3.2);for(let i=0;i<5;i++)Z(K.coat,x-4.5+i*1.9,y+3,1.4,1.6);
 for(let i=0;i<4;i++)Z('#f0ecd8',x-2.4+i*1.6,y-6.2+(i%2?.7:0),.8,1.6);
 Z(H(K.coat),x-7.5,y-8,15,4);for(let i=0;i<6;i++)Z(K.coat2,x-7.5+i*2.6,y-8.8+(i%2)*.9,2.2,1.4);
 Z(K.mask,x-3,y-12.5,6,6);Z(K.hood,x-4.5,y-15,9,3.6);Z(K.hood,x-4.5,y-15,1.6,7.5);Z(K.hood,x+2.9,y-15,1.6,7.5);
 for(const s of[-1,1]){ctx.fillStyle=fl?'#fff':K.hood;ctx.beginPath();ctx.moveTo(x+s*4.6,y-14.5);ctx.lineTo(x+s*3.6,y-19.5);ctx.lineTo(x+s*1.4,y-14.5);ctx.closePath();ctx.fill();Z('#d8a0a0',x+s*2.8-.5,y-17,1,2)}
 Z(K.rune,x-3,y-10.8,6,1.1);Z(K.rune,x-2.6,y-8.6,.8,1.6);Z(K.rune,x+1.8,y-8.6,.8,1.6);
 Z(K.eye,x-2+ex,y-10.6,1.5,.9);Z(K.eye,x+.8+ex,y-10.6,1.5,.9);Z('#2a1c10',x-.5+ex,y-8.2,1,.9)}
};
function warden(x,y,a,fl,wk,gun,hurt,hol,pun){shadow(x,y,6);const K=SKINS[sel.skin]||SKINS.warden,b=Math.sin(wk)*1.5,t=performance.now()/1000,ca=Math.cos(a),sa=Math.sin(a),
  coat=fl?'#fff':hurt?'#8a2a2a':K.coat,coat2=fl?'#fff':hurt?'#6a1c1c':K.coat2,dark=fl?'#fff':'#14101a',bone=fl?'#fff':K.mask;
 if(K.v)SKB[K.v](x,y,a,fl,wk,hurt,b,t,ca,sa,K);else{
 // boots
 ctx.fillStyle=dark;ctx.fillRect(x-3,y+3+b,2,4);ctx.fillRect(x+1,y+3-b,2,4);ctx.fillStyle=fl?'#fff':'#3a2a22';ctx.fillRect(x-3,y+3+b,2,1);ctx.fillRect(x+1,y+3-b,2,1);
 // tattered coat tails
 ctx.fillStyle=coat;ctx.beginPath();ctx.moveTo(x-5,y);ctx.lineTo(x+5,y);ctx.lineTo(x+5,y+4);ctx.lineTo(x+3.5,y+6);ctx.lineTo(x+2,y+4.5);ctx.lineTo(x+.5,y+6.5);ctx.lineTo(x-1,y+4.5);ctx.lineTo(x-2.5,y+6);ctx.lineTo(x-4,y+4.5);ctx.lineTo(x-5,y+5.5);ctx.closePath();ctx.fill();
 // torso
 ctx.fillStyle=coat;ctx.fillRect(x-5,y-6,10,7);ctx.fillStyle=coat2;ctx.fillRect(x-5,y-6,2,7);ctx.fillRect(x+3,y-6,2,7);
 ctx.fillStyle=dark;ctx.fillRect(x,y-5,1,6);
 // belt, buckle, hanging ward-skull
 ctx.fillStyle=dark;ctx.fillRect(x-5,y-1,10,1.5);ctx.fillStyle=fl?'#fff':'#c8a050';ctx.fillRect(x-1,y-1,2,1.5);
 if(!K.pl){ctx.fillStyle=bone;ctx.fillRect(x+3,y+.5,2,2);ctx.fillStyle=dark;ctx.fillRect(x+3,y+1,.8,.8);ctx.fillRect(x+4.2,y+1,.8,.8)}
 // bandolier with shells
 if(!K.pl){ctx.strokeStyle=fl?'#fff':K.band;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x-5,y-6);ctx.lineTo(x+5,y-1);ctx.stroke();
 ctx.fillStyle=fl?'#fff':'#d8b050';for(let i=0;i<4;i++)ctx.fillRect(x-3.5+i*2.4,y-5.5+i*1.2,1,1.6)}
 // glowing rune on the chest
 if(!fl&&!K.pl){ctx.globalAlpha=.55+.4*Math.sin(t*3);ctx.fillStyle=K.rune;ctx.fillRect(x-3,y-4.5,1,1);ctx.fillRect(x-4,y-3.5,3,1);ctx.fillRect(x-3,y-2.5,1,1);ctx.globalAlpha=1}
 // hood
 ctx.fillStyle=fl?'#fff':K.hood;ctx.beginPath();ctx.moveTo(x-6,y-5);ctx.lineTo(x-5,y-12);ctx.lineTo(x-2,y-15.5);ctx.lineTo(x+2,y-15.5);ctx.lineTo(x+5,y-12);ctx.lineTo(x+6,y-5);ctx.closePath();ctx.fill();
 ctx.fillStyle=coat2;ctx.fillRect(x-6,y-6,2,1.5);ctx.fillRect(x+4,y-6,2,1.5);
 // cracked bone mask with a beak that follows the aim
 ctx.fillStyle=bone;ctx.fillRect(x-3,y-12.5,6,6);
 if(!K.pl&&!K.nb){ctx.beginPath();ctx.moveTo(x-2,y-9.5);ctx.lineTo(x+ca*6,y-8+sa*4);ctx.lineTo(x+2,y-7);ctx.closePath();ctx.fillStyle=fl?'#fff':K.beak;ctx.fill()}
 if(!fl&&!K.pl){ctx.fillStyle='#8a8070';ctx.fillRect(x-1,y-12.5,1,3);ctx.fillRect(x,y-9.5,1,1);ctx.fillStyle='#7a0c14';ctx.fillRect(x-2.5,y-7,1,2);ctx.fillRect(x+1.5,y-7,.8,1.2)}
 if(K.hat){ctx.fillStyle=fl?'#fff':K.hat;ctx.fillRect(x-8,y-13.6,16,1.6);ctx.fillRect(x-4,y-18,8,4.6);ctx.fillStyle=fl?'#fff':K.hatb;ctx.fillRect(x-4,y-14.6,8,1)}
 // glowing eye slits
 if(!fl&&K.pl){ctx.fillStyle='#2a1c14';ctx.fillRect(x-2+ca*.7,y-10.5,1,1);ctx.fillRect(x+1+ca*.7,y-10.5,1,1)}if(!fl&&!K.pl){const ex=ca*.7;ctx.globalAlpha=.3;ctx.fillStyle=K.eyeg;ctx.fillRect(x-3.5+ex,y-11.5,3,3);ctx.fillRect(x+.5+ex,y-11.5,3,3);ctx.globalAlpha=1;ctx.fillStyle=K.eye;ctx.fillRect(x-2.5+ex,y-10.5,1.5,1);ctx.fillRect(x+1+ex,y-10.5,1.5,1)}
}
 // holstered sidearm on the hip
 if(hol&&!fl){ctx.fillStyle='#2a1c10';ctx.fillRect(x-6.5,y,3,3.5);drawWpn(hol,x-5,y+.5,1.57,.6)}
 // arm and weapon
 const pe=gun=='fists'?(pun||0)*7:0,hx=x+ca*(5+pe),hy=y-3+sa*(5+pe);ctx.strokeStyle=coat;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y-3);ctx.lineTo(hx,hy);ctx.stroke();
 if(gun&&!fl)drawWpn(gun,hx,hy,a,PRI[gun]?.75:gun=='fists'?1.2:1);
 ctx.fillStyle=dark;ctx.beginPath();ctx.arc(hx,hy,1.6+(pe?.7:0),0,7);ctx.fill()}
function drawImp(x,y,a,fl,wk,c1,c2){c1=c1||'#8a1c1c';c2=c2||'#4a0c0c';shadow(x,y,5);const b=Math.sin(wk)*1.2;
 ctx.strokeStyle=fl?'#fff':c2;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-Math.cos(a)*4,y-Math.sin(a)*3);ctx.lineTo(x-Math.cos(a)*9,y-Math.sin(a)*5+b);ctx.stroke();
 ctx.fillStyle=fl?'#fff':c2;ctx.fillRect(x-3,y+2+b,2,3);ctx.fillRect(x+1,y+2-b,2,3);
 ctx.fillStyle=fl?'#fff':c1;ctx.fillRect(x-4,y-5,8,8);ctx.fillRect(x-3,y-10,6,5);
 ctx.fillStyle=fl?'#fff':'#e8d8b0';ctx.fillRect(x-4,y-13,1,3);ctx.fillRect(x+3,y-13,1,3);
 ctx.fillStyle='#ffd23a';ctx.fillRect(x-2,y-8,1,1);ctx.fillRect(x+1,y-8,1,1);
 ctx.strokeStyle=fl?'#fff':c1;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-2);ctx.lineTo(x+Math.cos(a)*7,y-2+Math.sin(a)*7);ctx.stroke()}
function drawM(m,cx,cy){const x=m.x-cx,y=m.y-cy;if(x<-30||x>VW+30||y<-30||y>VH+30)return;const f=m.fl>0;
 if(m.boss&&m.bh=='charge'){ctx.save();ctx.translate(x,y);ctx.scale(2,2);drawImp(0,0,m.a,f,m.wk,'#5a1818','#2a0606');ctx.fillStyle=f?'#fff':'#ff6a1a';ctx.fillRect(-1,-3,2,2);ctx.restore()}
 else if(m.boss&&m.bh=='ranged'){const bob=Math.sin(T*3)*2;shadow(x,y+6,10);
  ctx.fillStyle=f?'#fff':'#3a1228';ctx.beginPath();ctx.moveTo(x-8,y+4+bob);ctx.lineTo(x,y-10+bob);ctx.lineTo(x+8,y+4+bob);ctx.closePath();ctx.fill();
  ctx.fillStyle=f?'#fff':'#c0603a';ctx.beginPath();ctx.arc(x,y-11+bob,4,0,7);ctx.fill();
  for(let i=0;i<5;i++){ctx.fillStyle=i%2?'#ff9a2a':'#ff4a1a';ctx.beginPath();ctx.arc(x-6+i*3,y-16+bob-Math.abs(Math.sin(T*8+i))*3,2,0,7);ctx.fill()}
  ctx.fillStyle='#ffe060';ctx.fillRect(x-2,y-12+bob,1,1);ctx.fillRect(x+1,y-12+bob,1,1);
  ctx.fillStyle='#ff7a1a';ctx.beginPath();ctx.arc(x+Math.cos(m.a)*9,y-4+Math.sin(m.a)*5+bob,2.5,0,7);ctx.fill()}
 else if(m.boss){shadow(x,y,11);
  ctx.fillStyle=f?'#fff':'#1c0a1e';ctx.beginPath();ctx.moveTo(x-10,y+5);ctx.lineTo(x-5,y-12);ctx.lineTo(x+5,y-12);ctx.lineTo(x+10,y+5);ctx.closePath();ctx.fill();
  ctx.fillStyle=f?'#fff':'#d8d0c0';ctx.beginPath();ctx.arc(x,y-14,4.5,0,7);ctx.fill();
  ctx.strokeStyle='#e8d8b0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-3,y-17);ctx.quadraticCurveTo(x-8,y-22,x-5,y-26);ctx.moveTo(x+3,y-17);ctx.quadraticCurveTo(x+8,y-22,x+5,y-26);ctx.stroke();
  ctx.fillStyle='#c040ff';ctx.fillRect(x-3,y-15,1,1);ctx.fillRect(x+2,y-15,1,1);ctx.fillRect(x-1,y-13,1,1);
  for(let i=0;i<3;i++){const t=T*2+i*2.1;ctx.fillStyle='#b030ff';ctx.beginPath();ctx.arc(x+Math.cos(t)*14,y-4+Math.sin(t)*6,2,0,7);ctx.fill()}}
 else drawMob(m,x,y,f);
 if(m.boss&&m.st=='chase'){ctx.fillStyle='#000a';ctx.fillRect(x-16,y-30,32,4);ctx.fillStyle='#b01c1c';ctx.fillRect(x-15,y-29,30*m.hp/m.mh,2)}}
function light(x,y,r,al){const g=dx.createRadialGradient(x,y,2,x,y,r);g.addColorStop(0,`rgba(0,0,0,${al})`);g.addColorStop(1,'rgba(0,0,0,0)');dx.fillStyle=g;dx.beginPath();dx.arc(x,y,r,0,7);dx.fill()}
// distance along a ray to the first blocker (building walls, tree trunks), capped at rg
function rayD(x,y,ux,uy,rg){let best=rg;
 for(const w of walls){if(w.t||w.x>x+rg||w.x+w.w<x-rg||w.y>y+rg||w.y+w.h<y-rg)continue;let t0=0,t1=best;
  if(ux){let a=(w.x-x)/ux,b=(w.x+w.w-x)/ux;if(a>b){const q=a;a=b;b=q}t0=Math.max(t0,a);t1=Math.min(t1,b)}else if(x<w.x||x>w.x+w.w)continue;
  if(uy){let a=(w.y-y)/uy,b=(w.y+w.h-y)/uy;if(a>b){const q=a;a=b;b=q}t0=Math.max(t0,a);t1=Math.min(t1,b)}else if(y<w.y||y>w.y+w.h)continue;
  if(t0<=t1&&t0<best)best=t0}
 for(const t of trees){const ox=t.x-x,oy=t.y-3-y;if(Math.abs(ox)>rg+6||Math.abs(oy)>rg+6)continue;const pr=ox*ux+oy*uy;if(pr<=0)continue;const d2=ox*ox+oy*oy-pr*pr;if(d2<25){const h=pr-Math.sqrt(25-d2);if(h>0&&h<best)best=h}}
 return best}
// light cast from the player that stops at walls and trees
function visLight(sx,sy,a0,a1,rg,n,al){const wx=P.x,wy=P.y;dx.save();dx.beginPath();dx.moveTo(sx,sy);
 for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n,ux=Math.cos(a),uy=Math.sin(a),d=rayD(wx,wy,ux,uy,rg);dx.lineTo(sx+ux*d,sy+uy*d)}
 dx.closePath();dx.clip();light(sx,sy,rg,al);dx.restore()}
function tx(s,x,y,c,al){ctx.fillStyle='#000';ctx.textAlign=al||'left';ctx.fillText(s,x+1,y+1);ctx.fillStyle=c||'#e8e6d8';ctx.fillText(s,x,y)}
function render(){
 const sh=shake?R(-shake,shake):0;const CT=P.dead?{x:P.sx,y:P.sy}:P;cam.x=cl(CT.x-VW/2+(mouse.x-VW/2)*.2+sh,0,WW-VW)|0;cam.y=cl(CT.y-VH/2+(mouse.y-VH/2)*.2+sh,0,WH-VH)|0;const cx=cam.x,cy=cam.y,px=P.x-cx,py=P.y-cy,lx=CT.x-cx,ly=CT.y-cy,fa=P.dead?(P.sa2||0):P.face;
 ctx.drawImage(ground,cx,cy,VW,VH,0,0,VW,VH);

 ctx.drawImage(blood,cx,cy,VW,VH,0,0,VW,VH);
 exts.forEach(e=>{if(e.sealed)return;const x=e.x-cx,y=e.y-cy,near=D(P.x,P.y,e.x,e.y)<26;ctx.strokeStyle=`rgba(255,240,180,${.5+.3*Math.sin(T*3+e.k)})`;ctx.lineWidth=1.5;ctx.setLineDash([4,4]);ctx.lineDashOffset=-T*10;ctx.beginPath();ctx.arc(x,y,17,0,7);ctx.stroke();ctx.setLineDash([]);if(P.ep>0&&near){ctx.strokeStyle='#8fe0a0';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,24,-1.5708,-1.5708+6.2832*P.ep/3);ctx.stroke()}if(D(P.x,P.y,e.x,e.y)<170)tx(e.n+(P.ep>0?'':' - stand in the ring'),x,y-32,'#e8e0b0','center')});
 clues.forEach(c=>{if(c.got)return;const x=c.x-cx,y=c.y-cy;ctx.strokeStyle='rgba(255,70,40,'+(.6+.3*Math.sin(T*4))+')';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,6,0,7);ctx.moveTo(x-6,y);ctx.lineTo(x+6,y);ctx.moveTo(x,y-6);ctx.lineTo(x,y+6);ctx.stroke()});
 items.forEach(it=>{const x=it.x-cx|0,y=it.y-cy|0;if(x<-10||x>VW+10||y<-10||y>VH+10)return;shadow(x,y,4);
  if(it.t=='wpn'){drawWpn(it.k,x-6,y,-.3,.8)}
  else if(it.t=='ammo'){ctx.fillStyle='#6a5030';ctx.fillRect(x-4,y-3,8,6);ctx.fillStyle='#e0b040';ctx.fillRect(x-3,y-2,2,3);ctx.fillRect(x,y-2,2,3)}
  else if(it.t=='cash'){ctx.fillStyle='#e0b040';ctx.fillRect(x-4,y-3,8,6);ctx.fillStyle='#8a6a20';ctx.fillRect(x-2,y-1,4,2)}
  else if(it.t=='tonic'){drawWpn('tonic',x-3,y,-1.57,.9)}
  else if(it.t=='tool'){drawWpn(it.k,x-4,y,-.2,.8)}else{drawWpn('bomb',x-4,y,-.2,.8)}});
 if((found>=3||bossOpen)&&M[0].hp>0){const x=M[0].hx-cx,y=M[0].hy-cy;ctx.strokeStyle=`rgba(200,30,40,${.5+.4*Math.sin(T*4)})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-10,y-10);ctx.lineTo(x+10,y+10);ctx.moveTo(x+10,y-10);ctx.lineTo(x-10,y+10);ctx.stroke()}
 M.forEach(m=>{if(m.hp<=0){const x=m.x-cx,y=m.y-cy;ctx.fillStyle='rgba(20,5,8,.8)';ctx.beginPath();ctx.ellipse(x,y,m.boss?16:8,m.boss?9:4,0,0,7);ctx.fill();ctx.fillStyle='#7a0c14';ctx.fillRect(x-3,y-1,6,2);if(m.boss&&!banished){ctx.strokeStyle='#d8c890';ctx.beginPath();ctx.arc(x,y,24,0,6.28*P.bp/5);ctx.stroke()}}});
 ctx.drawImage(wl,cx,cy,VW,VH,0,0,VW,VH);
 drawSeals(cx,cy);
 const L=[];M.forEach(m=>{if(m.hp>0)L.push([m.y,()=>drawM(m,cx,cy)])});gibs.forEach(g=>L.push([g.y,()=>drawGib(g,cx,cy)]));rpDraw(L,cx,cy);
 if(!(RD&&RD.t>=TB))L.push([P.y,()=>{warden(px,py,P.face,0,P.wk,P.cur<2?(P.w[P.cur]?P.w[P.cur].k:'fists'):P.cur==2?'tonic':P.cur==3?'bomb':XT[P.cur-4],P.hf>0,P.cur!=1&&P.w[1]?P.w[1].k:null,P.sa>0?P.sa/.18:0);if(P.sa>0){ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,16,P.face-1,P.face+1);ctx.stroke()}}]);
 trees.forEach(t=>L.push([t.y,()=>{shadow(t.x-cx,t.y-cy,7);ctx.fillStyle='#1c0e10';ctx.fillRect(t.x-cx-2,t.y-cy-6,4,8)}]));
 bombs.forEach(b=>L.push([b.y,()=>drawWpn('bomb',b.x-cx,b.y-cy-2,T*9,.7)]));
 lobs.forEach(b=>L.push([b.y,()=>drawWpn(b.k,b.x-cx,b.y-cy-2,T*11,.7)]));
 traps.forEach(tr=>L.push([tr.y,()=>{const x=tr.x-cx,y=tr.y-cy,dx=-Math.sin(tr.a)*9,dy=Math.cos(tr.a)*9,on=tr.ar<=0;ctx.strokeStyle=on?'rgba(230,90,90,.9)':'rgba(180,170,150,.5)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x-dx,y-dy);ctx.lineTo(x+dx,y+dy);ctx.stroke();ctx.fillStyle='#3a342c';ctx.fillRect(x-dx-1.2,y-dy-1.2,2.4,2.4);ctx.fillRect(x+dx-1.2,y+dy-1.2,2.4,2.4);if(on&&Math.sin(T*8)>0){ctx.fillStyle='#ff5a3a';ctx.fillRect(x-.6,y-.6,1.2,1.2)}}]));flares.forEach(f=>L.push([f.y,()=>{drawWpn('flare',f.x-cx,f.y-cy,-1.2,.7);if(!fgOn()){ctx.fillStyle=`rgba(255,200,90,${.1+.05*Math.sin(T*10)})`;ctx.beginPath();ctx.arc(f.x-cx,f.y-cy,28+3*Math.sin(T*9),0,7);ctx.fill()}}]));
 fires.forEach(f=>L.push([f.y,()=>{const x=f.x-cx,y=f.y-cy,fa=Math.min(1,f.t/1.2);ctx.fillStyle=`rgba(255,110,20,${.22*fa})`;ctx.beginPath();ctx.ellipse(x,y,f.r,f.r*.6,0,0,7);ctx.fill();for(let i=0;i<10;i++){const a=i*2.4+f.s,rr=f.r*.8*((i%4)+1)/4,qx=x+Math.cos(a)*rr,qy=y+Math.sin(a)*rr*.6,h=3+3*Math.abs(Math.sin(T*9+i*1.7)),w=2+Math.abs(Math.sin(T*7+i))*1.5;ctx.fillStyle=`rgba(255,${120+((i*37)%90)},30,${.85*fa})`;ctx.fillRect(qx-w/2,qy-h,w,h);ctx.fillStyle=`rgba(255,230,120,${.8*fa})`;ctx.fillRect(qx-w/4,qy-h*.5,w/2,h*.5)}}]));
 if(P.wd>0)L.push([P.y+1,()=>{ctx.strokeStyle=`rgba(240,208,112,${.45+.3*Math.sin(T*8)})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(px,py-3,15+Math.sin(T*6),0,7);ctx.stroke();ctx.fillStyle='rgba(240,208,112,.1)';ctx.fill()}]);
 L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());
 bul.concat(mpb).forEach(b=>{const c=BC[b.wk]||BC.pistol;ctx.strokeStyle=c[0];ctx.lineWidth=c[1];ctx.beginPath();ctx.moveTo(b.x-cx,b.y-cy);ctx.lineTo(b.x-cx-b.vx*c[2],b.y-cy-b.vy*c[2]);ctx.stroke()});
 eb.forEach(b=>{ctx.fillStyle='#ff5a10';ctx.beginPath();ctx.arc(b.x-cx,b.y-cy,3.5,0,7);ctx.fill();ctx.fillStyle='#ffe060';ctx.beginPath();ctx.arc(b.x-cx,b.y-cy,1.5,0,7);ctx.fill()});
 parts.forEach(p=>{ctx.fillStyle=p.c;ctx.fillRect(p.x-cx|0,p.y-cy|0,2,2)});drops.forEach(d=>{ctx.fillStyle=d.gr?'#8ad03a':'#b01820';ctx.fillRect(d.x-cx|0,(d.y-cy-d.z)|0,2,2)});
 trees.forEach(t=>{const x=t.x-cx,y=t.y-cy-14;if(x<-30||x>VW+30||y<-30||y>VH+30)return;ctx.fillStyle='rgba(22,10,14,.9)';ctx.beginPath();ctx.moveTo(x,y-18);ctx.lineTo(x-10,y+8);ctx.lineTo(x+10,y+8);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(150,36,20,.75)';ctx.beginPath();ctx.moveTo(x,y-18);ctx.lineTo(x-3,y-4);ctx.lineTo(x+3,y-4);ctx.closePath();ctx.fill()});
 // darkness
 dx.globalCompositeOperation='source-over';dx.clearRect(0,0,VW,VH);dx.fillStyle='rgba(2,1,6,.985)';dx.fillRect(0,0,VW,VH);dx.globalCompositeOperation='destination-out';
 visLight(lx,ly,0,6.2832,38*bmv(.6)*fgv(.3),72,.95);visLight(lx,ly,fa-.4*bmv(.7),fa+.4*bmv(.7),300*bmv(.38)*fgv(.1),90,.92);
 clues.forEach(c=>{if(!c.got)light(c.x-cx,c.y-cy,26+3*Math.sin(T*6),.6)});items.forEach(it=>light(it.x-cx,it.y-cy,16,.5));bombs.forEach(b=>light(b.x-cx,b.y-cy,40,.7));fires.forEach(f=>light(f.x-cx,f.y-cy,40,.65));if(!fgOn())flares.forEach(f=>light(f.x-cx,f.y-cy,150+6*Math.sin(T*9),.92));if(P.wd>0)light(P.x-cx,P.y-cy,38,.35);Object.values(mp.rp).forEach(r=>light(r.x-cx,r.y-cy,40,.6));exts.forEach(e=>{light(e.x-cx,e.y-cy,60,.55);light(e.lx-cx,e.ly-cy,55+5*Math.sin(T*9+e.k),.7)});blds.forEach(b=>b.gl.forEach(q=>{const x=q.x-cx,y=q.y-cy;if(x>-90&&x<VW+90&&y>-90&&y<VH+90)light(x,y,q.r*(1+.08*Math.sin(T*5+q.p)),q.a)}));if(P.lf>0)visLight(px,py,0,6.2832,150*fgv(.3),72,.7);
 parts.forEach(p=>{if(!p.s&&p.c!='#aaa')light(p.x-cx,p.y-cy,14,.5)});
 rdLight();ctx.drawImage(dk,0,0);bmDraw();rdDraw();
 if(keys.KeyQ){M.forEach(m=>{if(m.hp>0&&D(m.x,m.y,P.x,P.y)<300){ctx.fillStyle='#ff2a3a';ctx.fillRect(m.x-cx-3,m.y-cy-9,2,2);ctx.fillRect(m.x-cx+1,m.y-cy-9,2,2)}});
  clues.forEach(c=>{if(!c.got){const a=Math.atan2(c.y-P.y,c.x-P.x);ctx.fillStyle='#d8c890';ctx.beginPath();ctx.arc(px+Math.cos(a)*36,py+Math.sin(a)*36,2.5,0,7);ctx.fill()}})}
 if((found>=3||bossOpen)&&M[0].hp>0){const a=Math.atan2(M[0].hy-P.y,M[0].hx-P.x);const ax=px+Math.cos(a)*26,ay=py+Math.sin(a)*26;ctx.fillStyle='#d03040';ctx.beginPath();ctx.moveTo(ax+Math.cos(a)*5,ay+Math.sin(a)*5);ctx.lineTo(ax+Math.cos(a+2.5)*4,ay+Math.sin(a+2.5)*4);ctx.lineTo(ax+Math.cos(a-2.5)*4,ay+Math.sin(a-2.5)*4);ctx.closePath();ctx.fill()}
 if(P.hp<45){const g=ctx.createRadialGradient(VW/2,VH/2,120,VW/2,VH/2,380);g.addColorStop(0,'rgba(120,0,0,0)');g.addColorStop(1,`rgba(140,0,10,${.55+.15*Math.sin(T*6)})`);ctx.fillStyle=g;ctx.fillRect(0,0,VW,VH)}
 // HUD
 ctx.font='bold 10px monospace';ctx.fillStyle='#000a';ctx.fillRect(8,VH-24,104,8);ctx.fillStyle='#b01c1c';ctx.fillRect(9,VH-23,102*Math.max(0,P.hp)/100,6);ctx.fillStyle='#000a';ctx.fillRect(8,VH-14,104,4);ctx.fillStyle=P.exh?'#886':'#6a9a4a';ctx.fillRect(9,VH-13,102*P.st/100,2);
 const w=P.w[P.cur];tx(P.cur<2&&w?`${w.n}  ${P.mag[P.cur]}/${P.res[P.cur]}${P.rl>0?' (reload)':''}`:'',VW-8,VH-24,'#e8e6d8','right');
 ctx.font='bold 8px monospace';for(let i=0;i<8;i++){const x=VW/2-180+i*45,y=VH-22;ctx.fillStyle=i==P.cur?'#7a2a2ab0':'#000a';ctx.fillRect(x,y,41,16);if(i==P.cur){ctx.strokeStyle='#e8e6d8';ctx.lineWidth=1;ctx.strokeRect(x+.5,y+.5,40,15)}
  const lb=i<2?(P.w[i]?P.w[i].n.slice(0,7):i==P.cur?'Fists':''):i==2?(P.tn>0?'Water '+P.tn:''):i==3?(P.bm>0?'Charge '+P.bm:''):((P.xt[XT[i-4]]||0)>0?XL[i-4]+' '+P.xt[XT[i-4]]:'');if(lb)tx((i+1)+' '+lb,x+3,y+11,'#e8e6d8')}ctx.font='bold 10px monospace';
 tx(banished?'Reach extraction!':bty?(bty.h===mp.me?'Reach extraction!':bty.h==null?'Grab the dropped bounty! (see map)':hn(bty.h)+' holds the bounty (see map)'):corpse?'Banish the corpse (hold E)':(found>=3||bossOpen)?`Hunt ${BOSS[boss].n} (red X)`:`Sigils ${found}/3 (E to burn) - the lair is sealed`,8,14,'#d8c890');tx(mis.t=='none'?'':mis.done?'Ledger task done - extract to claim':mis.fail?'Ledger task failed this run':'Ledger: '+hudm(),8,26,mis.done?'#8fe0a0':mis.fail?'#a06a60':'#c0a070');if(P.carry)tx('Bounty: $'+P.carry,8,38,'#e0b040');if(P.wd>0)tx("Saint's Ward "+Math.ceil(P.wd)+'s',8,50,'#f0d070');tx('[M] Map',VW-8,14,'#d8c890','right');if(mp.on)tx('Hunters alive: '+(1+Object.keys(mp.rp).length),VW-8,26,'#d89090','right');
 rdHud();if(P.ep>0)tx('Escaping in '+Math.ceil(3-P.ep)+'...',VW/2,VH/2+34,'#8fe0a0','center');
 if(P.pk)tx('[E] take '+(P.pk.s?SID:PRI)[P.pk.k].n,VW/2,VH/2+48,'#ffd27a','center');if(msgT>0)tx(msg,VW/2,48,'#fff','center');drawDead()}
