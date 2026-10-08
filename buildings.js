// ---------- RAVAGED BUILDINGS & ESCAPE ROUTES ----------
const fR=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)},fD=(g,x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()},fL=(g,a,b,c,d,k,w)=>{g.strokeStyle=k;g.lineWidth=w||1;g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.stroke()},
fG=(g,x,y,r,c)=>{const q=g.createRadialGradient(x,y,1,x,y,r);q.addColorStop(0,c);q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)},
fS=(g,x,y,s)=>{fD(g,x,y,4*s,'#d8d0b4');fR(g,x-2*s,y+2*s,4*s,2.5*s,'#d8d0b4');fR(g,x-2.5*s,y-s,2*s,2*s,'#120a0c');fR(g,x+.5*s,y-s,2*s,2*s,'#120a0c');fR(g,x-.6*s,y+3*s,1.2*s,1.4*s,'#120a0c')},
fB=(g,x,y,a,s)=>{const u=Math.cos(a)*4*s,v=Math.sin(a)*4*s;fL(g,x-u,y-v,x+u,y+v,'#cfc6a8',1.6*s);fD(g,x-u,y-v,1.3*s,'#cfc6a8');fD(g,x+u,y+v,1.3*s,'#cfc6a8')},
fP=(g,x,y,r)=>{for(let i=0;i<5;i++){g.fillStyle=i%2?'rgba(110,8,16,.8)':'rgba(70,4,10,.8)';g.beginPath();g.ellipse(x+R(-r/2,r/2),y+R(-r/3,r/3),R(r/3,r),R(r/4,r/2),R(0,3),0,7);g.fill()}},
fE=(g,b,x,y,r,c,a)=>{fG(g,x,y,r,c);b.gl.push({x,y,r:r*.8,a:a||.5,p:R(0,6)})};
const BP=[['#3a3638','#4b4648','#8e8680'],['#2e2624','#3a2c28','#8a5a3a'],['#1e1626','#2a1c32','#7a4a8a'],['#4a3824','#5a4026','#a07a4a'],['#2c363e','#34404a','#7a8e9a'],['#4a4446','#5a5254','#b0a49c'],['#5a5040','#5a4a3a','#b09a6a']];
function tiles(g,r,s,a,b,gr,ck){fR(g,r.x,r.y,r.w,r.h,gr);for(let y=r.y,j=0;y<r.y+r.h;y+=s,j++)for(let x=r.x,i=0;x<r.x+r.w;x+=s,i++)if(Math.random()>.05)fR(g,x+1,y+1,s-1,s-1,(ck?(i+j)%2:Math.random()<.35)?b:a)}
function planks(g,r){fR(g,r.x,r.y,r.w,r.h,'#3c2d1c');for(let y=r.y;y<r.y+r.h;y+=8){fR(g,r.x,y,r.w,7,'#4a3824');for(let x=r.x+R(0,40);x<r.x+r.w;x+=R(40,90))fR(g,x,y,1,7,'#20160c')}for(let i=0;i<5;i++){const x=R(r.x+14,r.x+r.w-40),y=R(r.y+14,r.y+r.h-26);fR(g,x,y,R(14,26),R(8,14),'#0a0608');fL(g,x-2,y,x+R(6,12),y-4,'#6a4a2a',1.5)}}
const FL=[(g,b,r)=>tiles(g,r,18,'#3a3638','#443f41','#1a1618'),(g,b,r)=>tiles(g,r,24,'#2e2624','#382e2b','#120d0c'),(g,b,r)=>tiles(g,r,30,'#1e1626','#2a1c34','#0c0810'),(g,b,r)=>planks(g,r),(g,b,r)=>tiles(g,r,22,'#2c363e','#36424c','#10161a'),(g,b,r)=>tiles(g,r,20,'#4a4446','#26211f','#161214',1),(g,b,r)=>tiles(g,r,14,'#5a5040','#6a604c','#2a2218')];
// themed set dressing, one per building type: chapel, foundry, blood altar, mill, crypt, church, charnel house
const PR=[
(g,b,r,L)=>{const cy=r.y+r.h/2,X=(u,w)=>L?r.x+u:r.x+r.w-u-(w||0);
 fR(g,r.x,cy-12,r.w,24,'#5a1620');fR(g,r.x,cy-12,r.w,2,'#8a6a2a');fR(g,r.x,cy+10,r.w,2,'#8a6a2a');for(let i=0;i<14;i++)fR(g,R(r.x,r.x+r.w-14),cy-12+R(0,20),R(4,14),R(3,7),'#3a3638');
 const ph=cy-16-r.y-10;for(let u=60;u<r.w-30;u+=24)for(const sd of[0,1]){if(Math.random()<.18)continue;g.save();g.translate(X(u,8)+4,(sd?cy+16:r.y+10)+ph/2);g.rotate(Math.random()<.25?R(-.6,.6):0);fR(g,-4,-ph/2,8,ph,'#4a3020');fR(g,-4,-ph/2,2,ph,'#6a4a30');if(Math.random()<.3)fR(g,-5,R(-ph/4,ph/4),10,3,'#1a0e08');g.restore()}
 fR(g,X(12,16),cy-22,16,44,'#6a625c');fR(g,X(14,12),cy-20,12,40,'#7a1018');fL(g,X(20,0),cy-14,X(20,0),cy+12,'#d8c890',2);fL(g,X(16,0),cy+6,X(24,0),cy+6,'#d8c890',2);fP(g,X(34,0),cy,14);
 [-18,18].forEach(o=>{fD(g,X(8,0),cy+o,2,'#eee');fE(g,b,X(8,0),cy+o,26,'rgba(255,200,90,.45)')})},
(g,b,r,L)=>{const cy=r.y+r.h/2,X=(u,w)=>L?r.x+u:r.x+r.w-u-(w||0),len=r.w*.5,lo=X(44,len);
 fR(g,X(8,36),cy-30,36,60,'#1a1210');fR(g,X(8,36),cy-30,36,4,'#5a3a28');fR(g,X(L?8:38,6),cy-18,6,36,'#ff7a1a');fE(g,b,X(14,0),cy,60,'rgba(255,110,20,.55)',.6);
 fR(g,lo,cy-4,len,8,'#0e0806');fR(g,lo,cy-2,len,4,'#ff8a20');fR(g,lo,cy-.5,len,1,'#ffe080');for(let u=0;u<len;u+=40)fE(g,b,lo+u,cy,30,'rgba(255,110,20,.4)',.45);
 for(let i=0;i<3;i++){const x=R(r.x+60,r.x+r.w-30),y=cy+(i%2?1:-1)*R(34,r.h/2-18);fD(g,x,y,10,'#2a2220');if(i<2){fD(g,x,y,7,'#ff7a1a');fE(g,b,x,y,24,'rgba(255,120,30,.4)',.4)}else{fD(g,x,y,7,'#1a100c');fS(g,x,y,.8)}}
 for(let i=0;i<3;i++){g.save();g.translate(R(r.x+60,r.x+r.w-30),cy+(Math.random()<.5?-1:1)*R(30,r.h/2-16));g.rotate(R(0,6));fR(g,-7,-4,14,8,'#5a5a60');fR(g,-10,-2,4,4,'#4a4a50');g.restore()}
 for(let i=0;i<2;i++){const x=R(r.x+40,r.x+r.w-40),y=R(r.y+20,r.y+r.h-20);for(let k=0;k<8;k++)fR(g,x+Math.cos(k*.785)*10-2,y+Math.sin(k*.785)*10-2,4,4,'#4a3a30');fD(g,x,y,8,'#4a3a30');fD(g,x,y,3,'#12100e')}},
(g,b,r)=>{const cx=r.x+r.w/2,cy=r.y+r.h/2,q=Math.min(r.h/2-12,70),pt=k=>[cx+Math.cos(-1.5708+k*2.5133)*q,cy+Math.sin(-1.5708+k*2.5133)*q];
 for(const[w,c]of[[7,'rgba(255,40,30,.15)'],[2,'#8a0c18']]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.arc(cx,cy,q,0,7);g.moveTo(cx+q-8,cy);g.arc(cx,cy,q-8,0,7);g.stroke();g.beginPath();for(let k=0;k<=5;k++){const p=pt(k);k?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])}g.stroke()}
 for(let k=0;k<24;k++){const a=k*.2618;fL(g,cx+Math.cos(a)*(q+3),cy+Math.sin(a)*(q+3),cx+Math.cos(a)*(q+8),cy+Math.sin(a)*(q+8),'#8a0c18',1.5)}
 for(let k=0;k<6;k++){let x=cx,y=cy,a=k*1.047;g.strokeStyle='rgba(100,6,14,.8)';g.lineWidth=2;g.beginPath();g.moveTo(x,y);for(let j=0;j<6;j++){a+=R(-.4,.4);x+=Math.cos(a)*q/6;y+=Math.sin(a)*q/6;g.lineTo(x,y)}g.stroke()}
 fR(g,cx-18,cy-8,36,16,'#2c2430');fR(g,cx-16,cy-6,32,12,'#5a0a14');fE(g,b,cx,cy,36,'rgba(255,40,30,.35)',.4);
 for(let k=0;k<5;k++){const p=pt(k);fD(g,p[0],p[1],2,'#eee');fE(g,b,p[0],p[1],20,'rgba(255,180,90,.45)')}
 for(let k=0;k<6;k++){const a=k*1.047+.5,x=cx+Math.cos(a)*(q+16),y=cy+Math.sin(a)*(q+16);if(x>r.x+8&&x<r.x+r.w-8&&y>r.y+8&&y<r.y+r.h-8){g.save();g.translate(x,y);g.rotate(a);fR(g,-7,-5,14,10,'#4a0c14');g.restore();fS(g,x,y,.8)}}},
(g,b,r)=>{const cx=r.x+r.w*.4,cy=r.y+r.h/2;
 fD(g,cx,cy,34,'#7a7468');fD(g,cx,cy,30,'#8a8478');for(let k=0;k<16;k++)fL(g,cx,cy,cx+Math.cos(k*.39)*30,cy+Math.sin(k*.39)*30,'#5a564c');fD(g,cx,cy,5,'#1a1410');fL(g,cx-30,cy-8,cx+12,cy+30,'#ff7a1a',1.5);fE(g,b,cx-8,cy+10,22,'rgba(255,110,20,.35)',.35);fP(g,cx+10,cy+6,16);
 g.fillStyle='#6a665c';g.beginPath();g.arc(r.x+r.w*.72,cy-28,18,0,3.14);g.fill();
 for(let i=0;i<9;i++){const x=R(r.x+14,r.x+r.w-26),y=R(r.y+14,r.y+r.h-22);fR(g,x,y,12,9,'#a89868');fR(g,x+4,y-1,4,2,'#6a5a30');if(Math.random()<.5){for(let j=0;j<6;j++)fD(g,x+R(-6,18),y+R(-4,13),R(1,2),'#e8e0c0');fP(g,x+6,y+5,6)}}
 for(let i=0;i<3;i++){const x=R(r.x+20,r.x+r.w-20),y=R(r.y+20,r.y+r.h-20);fD(g,x,y,6,'#5a3a1e');fD(g,x,y,4,'#2a1a0c')}
 for(let i=0;i<3;i++){g.save();g.translate(R(r.x+30,r.x+r.w-30),R(r.y+20,r.y+r.h-20));g.rotate(R(0,3.14));fR(g,-30,-3,60,6,'#3a2412');fR(g,-30,-3,60,1,'#5a3a1e');g.restore()}},
(g,b,r)=>{const cx=r.x+r.w/2,cy=r.y+r.h/2;
 for(let i=0;i<8;i++){g.fillStyle='rgba(60,110,70,.22)';g.beginPath();g.ellipse(R(r.x,r.x+r.w),R(r.y,r.y+r.h),R(8,22),R(5,12),R(0,3),0,7);g.fill()}
 for(let x=r.x+24;x<r.x+r.w-70;x+=62)for(const sy of[r.y+16,r.y+r.h-36]){const t=Math.random();fR(g,x,sy,44,20,'#5a666e');fR(g,x+2,sy+2,40,16,'#46525a');
  if(t<.35){fR(g,x+4,sy+4,36,12,'#06090c');fB(g,x+14,sy+10,R(0,3),1);fS(g,x+30,sy+10,.7);fE(g,b,x+22,sy+10,26,'rgba(80,255,140,.2)',.25)}
  else if(t<.6){fR(g,x+12,sy+4,36,14,'#06090c');fR(g,x+16,sy+2,34,16,'#5a666e');fR(g,x+18,sy+4,30,12,'#46525a')}
  else{fL(g,x+22,sy+4,x+22,sy+16,'#2a343a',1.5);fL(g,x+17,sy+8,x+27,sy+8,'#2a343a',1.5)}}
 fD(g,cx,cy,18,'#0a0e10');for(let k=0;k<10;k++)fS(g,cx+Math.cos(k*.628)*22,cy+Math.sin(k*.628)*22,.8);fE(g,b,cx,cy,40,'rgba(80,255,140,.25)',.35);
 [[r.x,r.y,1,1],[r.x+r.w,r.y,-1,1],[r.x,r.y+r.h,1,-1],[r.x+r.w,r.y+r.h,-1,-1]].forEach(([x,y,a,c])=>{for(let k=0;k<=5;k++)fL(g,x,y,x+a*26*Math.cos(k*.314),y+c*26*Math.sin(k*.314),'rgba(220,230,240,.28)')})},
(g,b,r,L)=>{const cx=r.x+r.w/2,cy=r.y+r.h/2,X=(u,w)=>L?r.x+u:r.x+r.w-u-(w||0);
 fR(g,X(0,34),r.y+6,34,r.h-12,'#2a2426');for(let k=0;k<3;k++)fR(g,X(34+k*3,2),r.y+6,2,r.h-12,'#1a1416');
 for(let k=0;k<9;k++){const y=r.y+16+k*(r.h-32)/8;if(Math.random()<.3){g.save();g.translate(X(14,0),y);g.rotate(R(0,3));fR(g,-14,-2,28,4,'#9a8a6a');g.restore()}else fD(g,X(10,0),y,3+k%3,'#9a8a6a')}
 g.save();g.translate(X(60,0),cy-6);g.rotate(R(-.3,.3));fR(g,-22,-8,38,16,'#8a8478');fR(g,-12,-12,8,24,'#8a8478');fD(g,22,R(-8,8),5,'#9a948a');g.restore();
 for(let u=90;u<r.w-30;u+=22)for(const sd of[0,1]){if(Math.random()<.25)continue;const y=sd?cy+22:r.y+12,ph=r.h/2-34;g.save();g.translate(X(u,8)+4,y+ph/2);g.rotate(Math.random()<.5?R(-.8,.8):0);fR(g,-4,-ph/2,8,ph,'#4a3020');fR(g,-4,-ph/2,2,ph,'#6a4a30');g.restore()}
 g.strokeStyle='#5a4a30';g.lineWidth=3;g.beginPath();g.arc(cx,cy,20,0,7);g.stroke();for(let k=0;k<8;k++){const x=cx+Math.cos(k*.785)*20,y=cy+Math.sin(k*.785)*20;fD(g,x,y,2,'#e8e0c0');if(k%3==0)fE(g,b,x,y,22,'rgba(255,200,90,.4)')}
 ['192,32,48','48,80,192','208,160,48','48,160,96'].forEach(c=>{for(let j=0;j<4;j++){const x=R(r.x+30,r.x+r.w-30),y=R(r.y+20,r.y+r.h-20);fG(g,x,y,18,`rgba(${c},.3)`);g.fillStyle=`rgb(${c})`;g.beginPath();g.moveTo(x,y);g.lineTo(x+R(3,8),y+R(-2,5));g.lineTo(x+R(-4,3),y+R(3,9));g.fill()}});
 fD(g,cx+60,cy+22,14,'#6a4a20');fD(g,cx+60,cy+22,9,'#1a1008');fD(g,r.x+r.w-20,r.y+20,10,'#6a665c');fD(g,r.x+r.w-20,r.y+20,7,'#7a0c14')},
(g,b,r)=>{const cx=r.x+r.w/2,cy=r.y+r.h/2;
 for(let i=0;i<6;i++)fP(g,R(r.x+20,r.x+r.w-20),R(r.y+20,r.y+r.h-20),R(14,26));
 for(let i=0;i<9;i++)fL(g,R(r.x+10,r.x+r.w-10),R(r.y+10,r.y+r.h-10),cx,cy,'rgba(90,8,14,.7)',2);
 fD(g,cx,cy,10,'#2a2a2c');for(let k=-1;k<2;k++)fL(g,cx+k*4,cy-9,cx+k*4,cy+9,'#6a6a6e');fL(g,cx-9,cy,cx+9,cy,'#6a6a6e');
 [[.22,.28],[.22,.72],[.78,.28],[.78,.72]].forEach(([u,v])=>{const x=r.x+r.w*u,y=r.y+r.h*v;fR(g,x-26,y-9,52,18,'#5a4a3a');fR(g,x-24,y-7,48,14,'#8a8070');fP(g,x,y,10);fD(g,x-8,y,4,'#c8a898');fD(g,x+8,y+1,3,'#9a1a24');fR(g,x+14,y-4,8,2,'#aaa')});
 fR(g,r.x+10,cy-1,r.w-20,2,'#2a2220');for(let i=0;i<6;i++){const x=r.x+24+i*(r.w-48)/5;fD(g,x,cy,2,'#8a8a8e');g.fillStyle='#7a1a24';g.beginPath();g.ellipse(x,cy+8,4,7,0,0,7);g.fill();fL(g,x,cy+13,x,cy+R(16,22),'rgba(110,8,16,.8)',1.5)}
 for(let i=0;i<3;i++){const x=R(r.x+30,r.x+r.w-30),y=R(r.y+24,r.y+r.h-24);for(let j=0;j<10;j++)fB(g,x+R(-12,12),y+R(-8,8),R(0,3),1);fS(g,x,y,1)}
 const kx=r.x+r.w-44,ky=r.y+r.h-38;g.strokeStyle='#4a4a50';g.lineWidth=1.5;g.strokeRect(kx,ky,28,22);for(let k=1;k<5;k++)fL(g,kx+k*5.6,ky,kx+k*5.6,ky+22,'#4a4a50');fB(g,kx+10,ky+11,.5,1);fS(g,kx+20,ky+11,.6)}];
// what the demons did: scorch, rubble, claw gouges, dragged blood, bones, hellfire cracks
function ravage(g,b,r,k){const A=r.w*r.h/10000*k,pt=m=>[R(r.x+m,r.x+r.w-m),R(r.y+m,r.y+r.h-m)];
 for(let i=0;i<A*3;i++){const[x,y]=pt(12);fG(g,x,y,R(10,24),'rgba(0,0,0,.55)')}
 for(let i=0;i<A*1.5;i++){const[x,y]=pt(14),a=R(0,6.28);fL(g,x,y,x+Math.cos(a)*R(20,45),y+Math.sin(a)*R(20,45),'rgba(80,6,12,.6)',R(2,4))}
 for(let i=0;i<A*2.5;i++){const[x,y]=pt(10);for(let j=0;j<5;j++)fR(g,x+R(-8,8),y+R(-8,8),R(2,6),R(2,5),['#5a5654','#3e3a3a','#6a6258'][j%3])}
 for(let i=0;i<A*1.5;i++){const[x,y]=pt(14),a=R(0,6.28);for(let j=-1;j<2;j++)fL(g,x+j*3,y,x+j*3+Math.cos(a)*14,y+Math.sin(a)*14,'rgba(10,4,6,.7)')}
 for(let i=0;i<A*1.5;i++){const[x,y]=pt(12);fP(g,x,y,R(6,14))}
 for(let i=0;i<A*2;i++){const[x,y]=pt(10);fB(g,x,y,R(0,3),1)}
 for(let i=0;i<A*.5;i++){const[x,y]=pt(12);fS(g,x,y,.8)}
 for(let i=0;i<A*1.2;i++){let[x,y]=pt(14),a=R(0,6.28);const p=[[x,y]];for(let j=0;j<5;j++){a+=R(-.9,.9);x+=Math.cos(a)*R(8,16);y+=Math.sin(a)*R(8,16);p.push([x,y])}
  for(const[w,c]of[[5,'rgba(255,70,10,.15)'],[2,'rgba(255,110,20,.45)'],[.8,'rgba(255,200,90,.9)']]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();p.forEach((q,j)=>j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()}
  if(Math.random()<.4)b.gl.push({x:p[2][0],y:p[2][1],r:20,a:.3,p:R(0,6)})}}
// the archdemon's breach: hell grafted onto the building - flesh, tendrils, watching eyes, a bone mound
function graft(g,b,r){const cx=r.x+r.w/2,cy=r.y+r.h/2;
 for(let i=0;i<50;i++){g.fillStyle=`rgba(${70+R(0,40)|0},8,20,.5)`;g.beginPath();g.ellipse(R(r.x,r.x+r.w),R(r.y,r.y+r.h),R(8,26),R(6,18),R(0,3),0,7);g.fill()}
 for(let i=0;i<16;i++){let x=R(r.x,r.x+r.w),y=Math.random()<.5?r.y:r.y+r.h,a=Math.atan2(cy-y,cx-x);const p=[[x,y]];for(let j=0;j<8;j++){a+=R(-.5,.5);x+=Math.cos(a)*R(10,18);y+=Math.sin(a)*R(10,18);p.push([x,y])}
  for(const[w,c]of[[5,'#3a0610'],[2.5,'#7a1420'],[.8,'#c04050']]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();p.forEach((q,j)=>j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()}}
 for(let i=0;i<7;i++){const x=R(r.x+14,r.x+r.w-14),y=R(r.y+14,r.y+r.h-14);fE(g,b,x,y,22,'rgba(255,200,40,.3)',.4);g.fillStyle='#e8c040';g.beginPath();g.ellipse(x,y,5,3,0,0,7);g.fill();fR(g,x-.6,y-3,1.2,6,'#200')}
 fD(g,cx,cy,26,'#2a0a10');for(let k=0;k<8;k++){fS(g,cx+Math.cos(k*.785)*24,cy+Math.sin(k*.785)*24,1);fB(g,cx+Math.cos(k*.785+.4)*14,cy+Math.sin(k*.785+.4)*14,k,1.2)}fE(g,b,cx,cy,70,'rgba(255,40,40,.35)',.55)}
function door(g,b,d){const o=d.wg?b.wg:b,hz=d.q<2,x=hz?o.x+d.of:d.q?o.x+o.w-6:o.x,y=hz?(d.q?o.y+o.h-6:o.y):o.y+d.of,w=hz?d.ln:6,h=hz?6:d.ln;
 g.save();g.translate(x+w/2,y+h/2);g.rotate(hz?0:1.57);fR(g,-d.ln/2,-3,d.ln*.4,5,'#4a3020');g.rotate(R(-.5,.5));fR(g,-3,-2,d.ln*.5,4,'#3a2412');g.restore();
 for(let i=0;i<8;i++)fR(g,x+R(-4,w+4),y+R(-4,h+4),R(2,6),1,'#6a4a2a');fP(g,x+w/2,y+h/2,8)}
function genBuildings(bb){const g=ground.getContext('2d');
 blds.forEach(b=>{b.gl=[];const L=Math.random()<.5;[[b,1],[b.wg,0]].forEach(([r,m])=>{if(!r)return;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();FL[b.ty](g,b,r);if(m)PR[b.ty](g,b,r,L);ravage(g,b,r,m?1:1.3);if(b===bb)graft(g,b,r);g.restore()});(b.dr||[]).forEach(d=>door(g,b,d))});
 wl=mk(WW,WH);const w2=wl.getContext('2d');
 walls.forEach(w=>{if(w.t)return;const p=BP[w.k]||BP[0],hz=w.w>w.h,L=hz?w.w:w.h;
  fR(w2,w.x,w.y+w.h,w.w,5,'#1e1015');fR(w2,w.x,w.y,w.w,w.h,p[1]);fR(w2,w.x,w.y,w.w,1,p[2]);
  for(let u=R(2,8);u<L;u+=R(7,14))hz?fR(w2,w.x+u,w.y+1,1,w.h-1,'rgba(0,0,0,.35)'):fR(w2,w.x+1,w.y+u,w.w-1,1,'rgba(0,0,0,.35)');
  for(let j=0;j<L/30;j++){const u=R(0,L),q=Math.random();
   if(q<.35)hz?fR(w2,w.x+u,w.y+1,1,R(2,5),'#6a0a12'):fR(w2,w.x+1,w.y+u,R(2,5),1,'#6a0a12');
   else if(q<.6)hz?fR(w2,w.x+u,w.y,R(2,6),1,'#1a1012'):fR(w2,w.x,w.y+u,1,R(2,6),'#1a1012');
   else if(q<.75)hz?fR(w2,w.x+u,w.y+2,R(3,7),1,'#ff7a1a'):fR(w2,w.x+2,w.y+u,1,R(3,7),'#ff7a1a');
   else hz?fR(w2,w.x+u,w.y+w.h+R(0,6),R(2,4),R(1,3),'#4a4646'):fR(w2,w.x+w.w+R(0,3),w.y+u,R(2,4),R(1,3),'#4a4646')}})}
// escape routes: an Order wagon and a ferryman's boat, each inside a ward-ring
function genExits(){const g=ground.getContext('2d');exts.forEach((e,k)=>{e.k=k;e.n=k?"Ferryman's Boat":'Order Wagon';const ny=e.y<=61?-1:e.y>=WH-61?1:0,nx=ny?0:e.x<=61?-1:1,hz=!!ny,vx=e.x+nx*40,vy=e.y+ny*40;
 fG(g,e.x,e.y,40,'rgba(255,230,160,.18)');g.strokeStyle='rgba(240,230,200,.55)';g.lineWidth=1.5;g.beginPath();g.arc(e.x,e.y,24,0,7);g.stroke();for(let i=0;i<12;i++){const a=i*.5236;fL(g,e.x+Math.cos(a)*19,e.y+Math.sin(a)*19,e.x+Math.cos(a)*24,e.y+Math.sin(a)*24,'rgba(240,230,200,.7)',1.5)}
 g.save();g.translate(vx,vy);g.rotate(hz?0:1.57);
 if(!k){for(const[x,y]of[[-20,-17],[10,-17],[-20,13],[10,13]])fR(g,x,y,10,4,'#1a1210');fR(g,-26,-12,52,24,'#6a5a44');for(let i=-22;i<26;i+=8)fL(g,i,-12,i,12,'#3a2e22');fR(g,-3,-9,6,18,'#d8d0b4');fR(g,-9,-3,18,6,'#d8d0b4');fR(g,8,-9,10,8,'#12100c');fL(g,-20,-10,-10,6,'#1a1210',1.5);fR(g,26,-8,8,16,'#3a2412');fR(g,34,-1,10,2,'#3a2412');fD(g,34,0,2.5,'#ffd060')}
 else{g.fillStyle='#06121a';g.beginPath();g.ellipse(0,0,56,32,0,0,7);g.fill();for(let i=0;i<5;i++){g.strokeStyle='rgba(120,170,200,.25)';g.beginPath();g.ellipse(R(-30,30),R(-14,14),R(6,14),R(2,4),0,0,7);g.stroke()}fR(g,-56,-6,36,12,'#4a3020');for(let i=-54;i<-20;i+=6)fL(g,i,-6,i,6,'#2a1a0c');g.fillStyle='#5a3a1e';g.beginPath();g.ellipse(2,0,22,9,0,0,7);g.fill();g.fillStyle='#2a1a0c';g.beginPath();g.ellipse(2,0,17,5,0,0,7);g.fill();fL(g,-4,-8,-12,-18,'#3a2412',1.5);fL(g,-4,8,-12,18,'#3a2412',1.5);fD(g,22,0,2.5,'#ffd060')}
 g.restore();e.lx=vx+(hz?(k?22:34):0);e.ly=vy+(hz?0:(k?22:34));if(!hz){e.lx=vx;e.ly=vy+(k?22:34)}else{e.lx=vx+(k?22:34);e.ly=vy}
 fG(g,e.lx,e.ly,30,'rgba(255,200,90,.35)')})}
