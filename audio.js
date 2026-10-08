// ---------- AUDIO (procedural WebAudio, no files) ----------
const sfx=(()=>{
let ac,mst,verb,nb,amb=null,vc=0,ambT=8,lt={};
let ambOn=true;try{ambOn=localStorage.getItem('bh_amb')!='0'}catch(e){}
const MAXV=30,dcs={};
const dc=k=>dcs[k]||(dcs[k]=(()=>{const n=1024,c=new Float32Array(n);for(let i=0;i<n;i++)c[i]=Math.tanh((i*2/n-1)*k);return c})());
const ready=()=>ac&&ac.state=='running'&&vc<MAXV;
const gate=(k,g)=>{const t=ac.currentTime;if((lt[k]===undefined?-9:lt[k])>t-g)return 0;lt[k]=t;return 1};
function init(){
 if(ac){if(ac.state!='running')ac.resume();return}
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
 try{ac=new AC()}catch(e){ac=null;return}
 const cp=ac.createDynamicsCompressor();cp.threshold.value=-16;cp.knee.value=10;cp.ratio.value=8;cp.attack.value=.002;cp.release.value=.25;
 mst=ac.createGain();mst.gain.value=.85;mst.connect(cp);cp.connect(ac.destination);
 nb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const L=ac.sampleRate*1.8|0,ib=ac.createBuffer(2,L,ac.sampleRate);
 for(let c=0;c<2;c++){const q=ib.getChannelData(c);for(let i=0;i<L;i++)q[i]=(Math.random()*2-1)*Math.pow(1-i/L,3)}
 verb=ac.createConvolver();verb.buffer=ib;const vl=ac.createBiquadFilter();vl.type='lowpass';vl.frequency.value=3000;const vg=ac.createGain();vg.gain.value=.55;
 verb.connect(vl);vl.connect(vg);vg.connect(mst);
 if(ac.state!='running')ac.resume()}
// output bus: volume, reverb send, optional spatial {g,pan,oc}
function bus(vol,wet,sp){const g=ac.createGain();g.gain.value=vol*(sp?sp.g:1);let o=g;
 if(sp&&sp.oc){const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=650;o.connect(f);o=f}
 if(sp&&ac.createStereoPanner){const p=ac.createStereoPanner();p.pan.value=sp.pan||0;o.connect(p);o=p}
 o.connect(mst);if(wet){const w=ac.createGain();w.gain.value=wet;o.connect(w);w.connect(verb)}
 return g}
// filtered noise burst
function N(out,t,dur,p){p=p||{};const f=p.f||1000,g=p.g===undefined?1:p.g,a=p.a||.002;
 const s=ac.createBufferSource();s.buffer=nb;s.loop=dur>1.7;
 const off=s.loop?Math.random()*1.5:Math.random()*Math.max(0,nb.duration-dur-.06);
 const fl=ac.createBiquadFilter();fl.type=p.type||'lowpass';fl.frequency.setValueAtTime(f,t);
 if(p.f2)fl.frequency.exponentialRampToValueAtTime(Math.max(20,p.f2),t+dur);fl.Q.value=p.q||1;
 const e=ac.createGain();e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+a);e.gain.exponentialRampToValueAtTime(.0001,t+dur);
 s.connect(fl);fl.connect(e);e.connect(out);s.start(t,off);s.stop(t+dur+.03);vc++;s.onended=()=>vc--}
// oscillator tone (optional FM + distortion)
function O(out,t,dur,p){p=p||{};const g=p.g===undefined?1:p.g,a=p.a||.004;
 const o=ac.createOscillator();o.type=p.type||'sine';o.frequency.setValueAtTime(p.f||200,t);
 if(p.f2)o.frequency.exponentialRampToValueAtTime(Math.max(10,p.f2),t+dur);
 const e=ac.createGain();e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+a);e.gain.exponentialRampToValueAtTime(.0001,t+dur);
 if(p.fm){const m=ac.createOscillator(),mg=ac.createGain();m.frequency.value=p.fmf||20;mg.gain.value=p.fm;m.connect(mg);mg.connect(o.frequency);m.start(t);m.stop(t+dur+.03)}
 if(p.dist){const w=ac.createWaveShaper();w.curve=dc(p.dist);w.oversample='2x';o.connect(w);w.connect(e)}else o.connect(e);
 e.connect(out);o.start(t);o.stop(t+dur+.03);vc++;o.onended=()=>vc--}
// throaty growl: detuned saw+square, rough tremolo, distortion, formant filters
function growl(out,t,dur,f0,f1,p){p=p||{};const g=p.g===undefined?.5:p.g,form=p.form||[700,1200];
 const o=ac.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
 const o2=ac.createOscillator();o2.type='square';o2.frequency.setValueAtTime(f0*1.012,t);o2.frequency.exponentialRampToValueAtTime(Math.max(20,f1*1.012),t+dur);
 const tr=ac.createGain();tr.gain.value=.5;const lf=ac.createOscillator();lf.frequency.value=p.rough||60;const lg=ac.createGain();lg.gain.value=.5;lf.connect(lg);lg.connect(tr.gain);
 const sh=ac.createWaveShaper();sh.curve=dc(p.dist||6);o.connect(tr);o2.connect(tr);tr.connect(sh);
 const e=ac.createGain();e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+Math.min(.06,dur*.2));e.gain.setValueAtTime(g,t+dur*.55);e.gain.exponentialRampToValueAtTime(.0001,t+dur);
 form.forEach((ff,i)=>{const b=ac.createBiquadFilter();b.type='bandpass';b.frequency.value=ff;b.Q.value=4;const gg=ac.createGain();gg.gain.value=i?.6:1;sh.connect(b);b.connect(gg);gg.connect(e)});
 e.connect(out);[o,o2,lf].forEach(x=>{x.start(t);x.stop(t+dur+.03)});vc+=2;o.onended=()=>vc-=2}
// dissonant choir / drone pad
function pad(out,t,dur,fr,g,lp,a){const e=ac.createGain();e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+a);e.gain.exponentialRampToValueAtTime(.0001,t+dur);
 const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;f.Q.value=2;f.connect(e);e.connect(out);
 fr.forEach(q=>{const s=ac.createOscillator();s.type='sawtooth';s.frequency.value=q*(1+R(-.004,.004));s.connect(f);s.start(t);s.stop(t+dur+.05)});
 vc++;setTimeout(()=>vc--,dur*1000)}
const choir=(o,t,dur,g)=>pad(o,t,dur,[110,116.5,164.8,174.6,246.9],g,850,dur*.4);
function clk(out,t,f,g){N(out,t,.03,{type:'bandpass',f:f,q:5,g:g,a:.0005});O(out,t,.025,{type:'square',f:f*.6,f2:f*.3,g:g*.25,a:.0005})}
const chit=(o,t,n)=>{for(let i=0;i<n;i++)N(o,t+i*.045,.025,{type:'bandpass',f:3200+R(-700,700),q:4,g:.45,a:.0005})};
const hiss=(o,t)=>{N(o,t,.6,{type:'bandpass',f:5200,f2:2400,q:1.2,g:.28,a:.2});for(let i=0;i<6;i++)N(o,t+i*.07,.02,{type:'highpass',f:4000,g:.2,a:.0005})};
const gur=(o,t,r,d)=>{O(o,t,d,{f:78*r,f2:48,g:.45,a:.12,fm:22,fmf:10});for(let i=0;i<4;i++)O(o,t+R(0,d*.7),.08,{f:R(160,380),f2:R(450,900),g:.15,a:.004});N(o,t,d,{type:'lowpass',f:450,q:2,g:.12,a:.12})};
const roarB=(o,t,r,L)=>{growl(o,t,.9*L,85*r,48*r,{rough:27,form:[210,430],g:.7,dist:6});O(o,t,.9*L,{f:58,f2:36,g:.7});N(o,t,.7*L,{type:'lowpass',f:650,f2:150,g:.22,a:.05})};
const cackle=(o,t,n)=>{for(let i=0;i<n;i++){O(o,t+i*.16,.14,{type:'sawtooth',f:520+i*35,f2:960+i*25,g:.22,a:.01,fm:50,fmf:24,dist:3});N(o,t+i*.16,.1,{type:'bandpass',f:1800,q:2,g:.12,a:.01})}};
// ---- monster voices ----
const V={
 imp:{
  alert(o,t,r){O(o,t,.4,{type:'sawtooth',f:620*r,f2:1500*r,g:.16,a:.02,fm:110,fmf:34,dist:4});growl(o,t,.36,300*r,160*r,{rough:90,form:[800,2200],g:.4,dist:9})},
  snarl(o,t,r){growl(o,t,.6,150*r,80*r,{rough:62,form:[550,1500],g:.5,dist:7});N(o,t,.45,{type:'bandpass',f:2600,q:1.5,g:.1,a:.06})},
  idle(o,t,r){growl(o,t,.8,95*r,65*r,{rough:30,form:[400,900],g:.3,dist:4})},
  die(o,t,r){growl(o,t,.65,280*r,55*r,{rough:55,form:[700,1500],g:.5,dist:8});N(o,t,.3,{type:'lowpass',f:1600,f2:200,g:.45,a:.002});O(o,t,.22,{f:100,f2:38,g:.5})}},
 skitter:{
  alert(o,t,r){chit(o,t,7);O(o,t,.3,{type:'square',f:2800*r,f2:1800,g:.05,a:.01,fm:260,fmf:55,dist:3})},
  snarl(o,t){chit(o,t,4)},idle(o,t){chit(o,t,2)},
  die(o,t,r){O(o,t,.25,{type:'sawtooth',f:3200*r,f2:600,g:.15,a:.003,dist:3});N(o,t,.2,{type:'lowpass',f:1400,f2:200,g:.4,a:.002})}},
 bloat:{
  alert(o,t,r){gur(o,t,r,.7)},snarl(o,t,r){gur(o,t,r,.9)},idle(o,t,r){gur(o,t,r,.6)},
  die(o,t){N(o,t,.4,{type:'lowpass',f:1800,f2:150,g:.9,a:.002});O(o,t,.35,{f:90,f2:28,g:.8});for(let i=0;i<7;i++)O(o,t+R(0,.35),.09,{f:R(150,350),f2:R(400,800),g:.2,a:.004});N(o,t,.5,{type:'bandpass',f:600,q:.7,g:.5,a:.01})}},
 vine:{
  alert(o,t){hiss(o,t)},snarl(o,t){hiss(o,t)},idle(o,t){N(o,t,.8,{type:'bandpass',f:1800,q:2,g:.08,a:.3})},
  die(o,t,r){O(o,t,.55,{type:'sawtooth',f:1000*r,f2:180,g:.15,a:.01,fm:50,fmf:28,dist:3});N(o,t,.5,{type:'bandpass',f:900,f2:300,q:1,g:.4,a:.01})}},
 brute:{
  alert(o,t,r){roarB(o,t,r,1)},snarl(o,t,r){roarB(o,t,r,.8)},idle(o,t,r){growl(o,t,.9,70*r,50*r,{rough:20,form:[200,400],g:.35,dist:4})},
  die(o,t,r){roarB(o,t,r*.85,1.3);O(o,t+.3,.3,{f:70,f2:25,g:.8})}},
 gorrath:{
  alert(o,t,r){growl(o,t,1.5,62*r,32*r,{rough:18,form:[180,380],g:.95,dist:6});growl(o,t,1.2,140*r,70*r,{rough:40,form:[420,950],g:.4,dist:8});O(o,t,1.5,{f:42,f2:24,g:.9});N(o,t,1.3,{type:'lowpass',f:700,f2:120,g:.3,a:.05})},
  snarl(o,t,r){growl(o,t,.9,70*r,38*r,{rough:20,form:[200,420],g:.8,dist:6});O(o,t,.9,{f:45,f2:28,g:.7})},
  idle(o,t){growl(o,t,1.2,50,38,{rough:14,form:[160,300],g:.5,dist:4})},
  die(o,t,r){growl(o,t,2.4,70*r,20,{rough:15,form:[150,320],g:1,dist:6});O(o,t,2.2,{f:50,f2:15,g:1});N(o,t,2,{type:'lowpass',f:800,f2:60,g:.6,a:.01});N(o,t,.06,{type:'highpass',f:1200,g:.8,a:.0005})}},
 nyxara:{
  alert(o,t){cackle(o,t,6);N(o,t,.8,{type:'bandpass',f:1200,f2:500,q:.8,g:.25,a:.15})},
  snarl(o,t){cackle(o,t,3)},
  idle(o,t){N(o,t,1.1,{type:'bandpass',f:1600,f2:900,q:3,g:.1,a:.4});O(o,t,1.1,{type:'sawtooth',f:300,f2:220,g:.05,a:.4,fm:20,fmf:5})},
  die(o,t,r){O(o,t,1.3,{type:'sawtooth',f:1400*r,f2:260,g:.3,a:.02,fm:90,fmf:18,dist:3});cackle(o,t+.1,4);N(o,t,1.2,{type:'lowpass',f:2000,f2:150,g:.5,a:.02});O(o,t,1.2,{f:80,f2:25,g:.7})}},
 mordrek:{
  alert(o,t,r){choir(o,t,2.4,.14);growl(o,t,1.1,75*r,42*r,{rough:22,form:[220,520],g:.7,dist:6})},
  snarl(o,t,r){choir(o,t,1.6,.09);growl(o,t,.7,85*r,55*r,{rough:25,form:[260,600],g:.5,dist:5})},
  idle(o,t){choir(o,t,2.2,.05)},
  die(o,t,r){choir(o,t,3,.2);growl(o,t,2.2,80*r,22,{rough:16,form:[170,360],g:.9,dist:6});O(o,t,2,{f:55,f2:16,g:1});N(o,t,1.8,{type:'lowpass',f:900,f2:60,g:.5,a:.01})}}
};
const spat=(x,y,rg)=>{const d=Math.hypot(P.x-x,P.y-y);if(d>rg)return null;return{g:Math.max(.04,Math.pow(1-d/rg,1.3)),pan:cl((x-P.x)/240,-.85,.85),oc:!los(P.x,P.y,x,y)}};
function mob(m,kind){
 if(!ready())return;
 const ty=m.boss?boss:(m.ty||'imp'),tb=V[ty];if(!tb)return;const fn=tb[kind]||tb.snarl;if(!fn)return;
 if(!gate('v'+kind+(m.boss?'b':''),m.boss?.5:kind=='die'?.04:.12))return;
 const sp=spat(m.x,m.y,m.boss?900:kind=='idle'?300:460);if(!sp)return;
 fn(bus(m.boss?1:.9,m.boss?.55:.3,sp),ac.currentTime+.01,R(.9,1.12))}
// ---- weapons ----
const GN={
 rifle:{cf:1500,cd:.05,cg:1,bf:1200,bf2:120,bd:.35,bg:1,td:.3,tf:100,tf2:28,tg:1,tl:1.2,tgn:.22,wet:.5,mech:[[.55,1800],[.7,1300]]},
 shotgun:{cf:900,cd:.07,cg:1,bf:900,bf2:80,bd:.5,bg:1.25,td:.45,tf:75,tf2:22,tg:1.2,tl:1.4,tgn:.28,wet:.55,mech:[[.5,1100],[.63,1500]]},
 repeater:{cf:1700,cd:.04,cg:.9,bf:1500,bf2:160,bd:.24,bg:.85,td:.18,tf:120,tf2:40,tg:.75,tl:.8,tgn:.18,wet:.4,mech:[[.17,2000],[.27,1400]]},
 pistol:{cf:2200,cd:.03,cg:.9,bf:1800,bf2:220,bd:.16,bg:.7,td:.1,tf:170,tf2:60,tg:.55,tl:.55,tgn:.12,wet:.3,mech:[]},
 revolver:{cf:1900,cd:.04,cg:1,bf:1300,bf2:150,bd:.28,bg:.95,td:.2,tf:125,tf2:38,tg:.9,tl:1,tgn:.2,wet:.45,mech:[[.35,2400]]},
 pepperbox:{cf:1700,cd:.045,cg:1,bf:1300,bf2:140,bd:.3,bg:.9,td:.2,tf:115,tf2:36,tg:.85,tl:.9,tgn:.2,wet:.45,mech:[[.4,2200]]},
 musket:{cf:1300,cd:.07,cg:1.1,bf:1000,bf2:90,bd:.55,bg:1.3,td:.4,tf:80,tf2:24,tg:1.2,tl:1.8,tgn:.3,wet:.6,mech:[[.6,1700],[.8,1200]]},
 flamer:{cf:900,cd:.06,cg:.4,bf:700,bf2:300,bd:.18,bg:.9,td:.08,tf:90,tf2:50,tg:.4,tl:.4,tgn:.15,wet:.3,mech:[]},
 handcannon:{cf:1600,cd:.06,cg:1.1,bf:1100,bf2:100,bd:.45,bg:1.2,td:.35,tf:90,tf2:28,tg:1.15,tl:1.5,tgn:.26,wet:.55,mech:[[.4,2100]]},
 whisper:{cf:2600,cd:.02,cg:.35,bf:900,bf2:200,bd:.07,bg:.25,td:.05,tf:200,tf2:100,tg:.2,tl:.2,tgn:.04,wet:.1,mech:[[.12,2300]]}};
function bow(){const o=bus(.7,.3),t=ac.currentTime+.003,pf=R(.93,1.08);
 O(o,t,.4,{type:'triangle',f:260*pf,f2:130,g:.5,a:.001,fm:25,fmf:55});O(o,t,.25,{type:'sawtooth',f:520,f2:260,g:.12,a:.001});
 N(o,t,.1,{type:'bandpass',f:2800,q:1.2,g:.6,a:.001});N(o,t+.03,.3,{type:'bandpass',f:1500,f2:600,q:1,g:.25,a:.02});O(o,t,.12,{f:90,f2:50,g:.5})}
function gun(k){
 if(!ready())return;if(k=='crossbow')return bow();
 const G=GN[k];if(!G)return;const t=ac.currentTime+.003,v=R(.9,1.1),pf=R(.93,1.08),o=bus(.8,G.wet);
 N(o,t,G.cd,{type:'highpass',f:G.cf*pf,q:.7,g:G.cg*v,a:.0006});                       // supersonic crack
 N(o,t,G.bd,{type:'lowpass',f:G.bf*pf,f2:G.bf2,q:.8,g:G.bg*v,a:.001});                 // muzzle blast
 N(o,t,G.bd*.6,{type:'bandpass',f:520*pf,q:.6,g:G.bg*.55*v,a:.001});                  // mid punch
 O(o,t,G.td,{f:G.tf*pf,f2:G.tf2,g:G.tg*v,a:.002});                                    // chest thump
 N(o,t+.02,G.tl,{type:'lowpass',f:2200,f2:180,q:.5,g:G.tgn,a:.02});                   // rolling echo
 const mo=bus(.45,.1);G.mech.forEach(m=>clk(mo,t+m[0],m[1],.5))}                      // action cycling
function dry(){if(!ready()||!gate('dry',.3))return;const o=bus(.6,.05),t=ac.currentTime;clk(o,t,1800,.6);O(o,t,.04,{f:240,f2:120,g:.3})}
function reload(w){if(!ready()||!w)return;const o=bus(.7,.15),t=ac.currentTime,L=w.rl,k=w.k;
 clk(o,t+.05,1500,.5);N(o,t+L*.15,.15,{type:'bandpass',f:900,f2:500,q:1,g:.3,a:.02});
 if(k=='shotgun'||k=='repeater'){for(let i=0;i<3;i++){clk(o,t+L*(.3+i*.17),1200+i*150,.45);O(o,t+L*(.3+i*.17),.07,{f:170,f2:80,g:.35})}}
 else if(k=='crossbow'){for(let i=0;i<7;i++)clk(o,t+L*(.15+i*.08),900+i*60,.4)}
 else{clk(o,t+L*.45,2200,.55);clk(o,t+L*.55,1200,.5);O(o,t+L*.55,.08,{f:180,f2:90,g:.5})}
 clk(o,t+L*.85,1700,.55);clk(o,t+L*.92,1100,.7)}
function melee(){if(!ready())return;N(bus(.7,.1),ac.currentTime,.18,{type:'bandpass',f:500,f2:1800,q:.9,g:.35,a:.06})}
function hit(m,src){if(!ready()||!gate('hit',.04))return;const sp=spat(m.x,m.y,360);if(!sp)return;const o=bus(.8,.15,sp),t=ac.currentTime;
 N(o,t,.1,{type:'lowpass',f:1100,f2:300,g:.5,a:.001});O(o,t,.09,{f:150,f2:60,g:.5,a:.002});
 if(src=='melee'){O(o,t,.16,{f:95,f2:40,g:.8,a:.002});N(o,t,.15,{type:'bandpass',f:700,q:.8,g:.6,a:.002})}
 if(m.boss)N(o,t,.12,{type:'bandpass',f:300,q:1,g:.4,a:.002})}
// ---- player / world ----
function pain(){if(!ready()||!gate('pain',.15))return;const o=bus(.8,.2),t=ac.currentTime;
 growl(o,t,.3,190,95,{rough:38,form:[500,1100],g:.5,dist:4});O(o,t,.18,{f:95,f2:42,g:.7});N(o,t,.12,{type:'lowpass',f:700,g:.5})}
function death(){if(!ac||ac.state!='running')return;const o=bus(1,.8),t=ac.currentTime+.05;
 O(o,t,1.8,{f:70,f2:18,g:.9});growl(o,t,1.5,120,35,{rough:25,form:[300,600],g:.5,dist:5});N(o,t,1.4,{type:'lowpass',f:600,f2:60,g:.4,a:.01});
 O(o,t+.2,3,{f:98,g:.3,a:.02});O(o,t+.2,2,{f:235,g:.1,a:.02})}
function escape(){if(!ac||ac.state!='running')return;const o=bus(.7,.9),t=ac.currentTime+.05;[392,494,587,784].forEach((f,i)=>O(o,t+i*.12,1.5,{type:'triangle',f:f,g:.15,a:.02}))}
function beat(){if(!ready())return;const o=bus(.5,0),t=ac.currentTime;O(o,t,.14,{f:62,f2:38,g:.8,a:.005});O(o,t+.17,.12,{f:58,f2:36,g:.55,a:.005})}
function heal(){if(!ready())return;const o=bus(.7,.3),t=ac.currentTime;for(let i=0;i<3;i++)O(o,t+i*.07,.2,{f:420+i*160,f2:720+i*200,g:.15,a:.01});N(o,t,.4,{type:'bandpass',f:1200,q:1,g:.15,a:.05})}
function thr(){if(!ready())return;const o=bus(.7,.1),t=ac.currentTime;N(o,t,.3,{type:'bandpass',f:300,f2:900,q:.8,g:.3,a:.08});N(o,t,.5,{type:'highpass',f:4000,g:.1,a:.05})}
function bomb(b){if(!ready())return;const sp=spat(b.x,b.y,700);if(!sp)return;sp.g=Math.max(sp.g,.25);const o=bus(1.1,.9,sp),t=ac.currentTime+.005;
 N(o,t,.05,{type:'highpass',f:1200,g:1,a:.0005});N(o,t,1.1,{type:'lowpass',f:1400,f2:70,q:.7,g:1.2,a:.002});O(o,t,.9,{f:85,f2:18,g:1.2,a:.002});
 N(o,t+.04,.5,{type:'bandpass',f:400,q:.5,g:.7,a:.01});N(o,t+.1,1.7,{type:'lowpass',f:900,f2:90,g:.3,a:.05});
 for(let i=0;i<8;i++)N(o,t+.1+R(0,.8),.04,{type:'bandpass',f:R(800,3000),q:3,g:.2,a:.001})}
function equip(){if(!ready()||!gate('eq',.1))return;const o=bus(.5,.05),t=ac.currentTime;clk(o,t,1500,.5);O(o,t,.05,{f:140,f2:70,g:.3})}
function pick(){if(!ready()||!gate('pk',.1))return;O(bus(.6,.2),ac.currentTime,.15,{type:'triangle',f:520,f2:780,g:.14})}
function sigil(n){if(!ready())return;const o=bus(.9,.9),t=ac.currentTime;
 O(o,t,1.6,{f:230,f2:460,g:.2,a:.4,fm:3,fmf:5});O(o,t,1.6,{f:244,f2:490,g:.16,a:.4});O(o,t,1.6,{f:55,f2:70,g:.5,a:.3});N(o,t,1.2,{type:'bandpass',f:3000,f2:6000,q:3,g:.1,a:.5});
 if(n>=3){growl(o,t+.2,1.6,70,45,{rough:15,form:[200,400],g:.6,dist:5});O(o,t+.2,2,{f:50,f2:22,g:.9});choir(o,t+.1,2.4,.1)}}
function chant(){if(!ready())return;pad(bus(.8,.8),ac.currentTime,1.1,[73.4,77.8,110],.1,500,.4)}
function banish(){if(!ready())return;const o=bus(1,.9),t=ac.currentTime;O(o,t,2,{f:70,f2:15,g:1});N(o,t,1.6,{type:'lowpass',f:1000,f2:80,g:.7,a:.005});choir(o,t,3,.14);O(o,t+.1,1.6,{type:'triangle',f:880,g:.1,a:.02});O(o,t+.2,1.6,{type:'triangle',f:1318,g:.08,a:.02})}
function bonus(){if(!ready())return;const o=bus(.7,.5),t=ac.currentTime;O(o,t,.4,{type:'triangle',f:660,g:.18,a:.01});O(o,t+.12,.5,{type:'triangle',f:990,g:.18,a:.01})}
function ext(p){if(!ready()||!gate('ext',.4))return;O(bus(.6,.3),ac.currentTime,.28,{f:360+p*260,f2:380+p*260,g:.08,a:.02})}
function fire(m){if(!ready()||!gate('fire',.3))return;const sp=spat(m.x,m.y,700);if(!sp)return;const o=bus(.9,.4,sp),t=ac.currentTime;
 if(m.bh=='summon'){O(o,t,.5,{f:200,f2:60,g:.5});growl(o,t,.5,110,60,{rough:30,form:[260,520],g:.4,dist:5})}
 else{O(o,t,.45,{type:'sawtooth',f:380,f2:120,g:.25,dist:3});N(o,t,.5,{type:'bandpass',f:1400,f2:400,q:.8,g:.35,a:.08});N(o,t,.3,{type:'highpass',f:3500,g:.12,a:.02})}}
function dash(m){if(!ready()||!gate('dash',.5))return;const sp=spat(m.x,m.y,700);if(!sp)return;const o=bus(.9,.4,sp),t=ac.currentTime;
 growl(o,t,.5,95,60,{rough:30,form:[220,450],g:.6,dist:6});N(o,t,.45,{type:'bandpass',f:300,f2:900,q:.8,g:.4,a:.15})}
function summon(m){if(!ready()||!gate('sum',1))return;const sp=spat(m.x,m.y,900);if(!sp)return;const o=bus(.9,.7,sp),t=ac.currentTime;
 choir(o,t,1.6,.14);growl(o,t,.9,80,45,{rough:20,form:[220,500],g:.6,dist:5})}
function vine(m,w){if(!ready())return;const sp=spat(m.x,m.y,420);if(!sp)return;const o=bus(.9,.2,sp),t=ac.currentTime;
 if(!w)hiss(o,t);else{N(o,t,.08,{type:'highpass',f:2500,g:1,a:.0005});O(o,t,.12,{f:3000,f2:200,g:.5,a:.001});N(o,t,.1,{type:'lowpass',f:400,g:.5,a:.001})}}
// ---- ambience: kept very quiet and sparse ----
function ambStart(){if(!ac||amb||!ambOn)return;const t=ac.currentTime;
 const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=140;lp.Q.value=.7;
 const lf=ac.createOscillator();lf.frequency.value=.07;const lg=ac.createGain();lg.gain.value=60;lf.connect(lg);lg.connect(lp.frequency);
 const g=ac.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+4);s.connect(lp);lp.connect(g);g.connect(mst);
 const o=ac.createOscillator(),o2=ac.createOscillator();o.frequency.value=48;o2.frequency.value=48.6;const og=ac.createGain();og.gain.setValueAtTime(0,t);og.gain.linearRampToValueAtTime(.02,t+6);o.connect(og);o2.connect(og);og.connect(mst);
 [s,lf,o,o2].forEach(n=>n.start(t));amb={nodes:[s,lf,o,o2],g,og};ambT=R(10,22)}
function ambStop(){if(!amb||!ac)return;const a=amb;amb=null;const t=ac.currentTime;
 [a.g,a.og].forEach(x=>{x.gain.cancelScheduledValues(t);x.gain.setValueAtTime(x.gain.value,t);x.gain.linearRampToValueAtTime(0,t+.6)});
 a.nodes.forEach(n=>{try{n.stop(t+.7)}catch(e){}})}
function ambTick(dt){if(!amb||!ready())return;ambT-=dt;if(ambT>0)return;ambT=R(16,36);const t=ac.currentTime;
 if(Math.random()<.6)N(bus(.6,.5,{g:1,pan:R(-.6,.6)}),t,4,{type:'bandpass',f:220,f2:430,q:.6,g:.04,a:1.8});
 else growl(bus(.5,.95,{g:.5,pan:R(-.8,.8),oc:1}),t,2.4,95,58,{rough:8,form:[300,600],g:.4,dist:3})}
function toggle(){ambOn=!ambOn;try{localStorage.setItem('bh_amb',ambOn?'1':'0')}catch(e){}ambOn?ambStart():ambStop();return ambOn}
return{init,gun,dry,reload,melee,hit,mob,pain,death,escape,beat,heal,thr,bomb,equip,pick,sigil,chant,banish,bonus,ext,fire,dash,summon,vine,amb:ambStart,stop:ambStop,tick:ambTick,toggle}})();

// ---- hook the sounds into the game ----
{
const _shoot=shoot;shoot=function(){const k=P.cur,w=P.w[k],m0=P.mag[k],ok=P.cd<=0&&P.rl<=0;_shoot();if(k<2&&w&&w.d){if(P.mag[k]<m0)sfx.gun(w.k);else if(m0<=0&&ok)sfx.dry()}};
const _rl=reload;reload=function(){const b=P.rl;_rl();if(b<=0&&P.rl>0)sfx.reload(P.w[P.cur])};
const _mel=melee;melee=function(){_mel();sfx.melee()};
const _hurt=hurt;hurt=function(m,d,a,s){const al=m.hp>0;_hurt(m,d,a,s);if(al)sfx.hit(m,s)};
const _kill=kill;kill=function(m){if(m._dead)return;m._dead=1;_kill(m);sfx.mob(m,'die')};
const _hp=hurtP;hurtP=function(d,k){_hp(d,k);if(P.hp>0)sfx.pain()};
const _tb=throwBomb;throwBomb=function(){const b=P.bm;_tb();if(P.bm<b)sfx.thr()};
const _ut=useTonic;useTonic=function(){const n=P.tn;_ut();if(P.tn<n)sfx.heal()};
const _tw=takeW;takeW=function(it){_tw(it);sfx.equip()};
const _ng=newGame;newGame=function(){_ng();sfx.init();sfx.amb()};
const _end=end;end=function(w){const r=_end(w);sfx.stop();w?sfx.escape():sfx.death();return r};
let cpT=0,exT=0,hbT=0;
const _upd=update;
update=function(dt){
 const pi=items.length,pf=found,pb=banished,pd=!!mis.done,pm=M.length,pc=P.cur,bo=!!(M[0]&&M[0].dash>0),bz=bombs.map(b=>({x:b.x,y:b.y,t:b.t}));
 _upd(dt);
 bz.forEach(b=>{if(b.t-dt<=0)sfx.bomb(b)});
 if(mode!='play')return;
 sfx.tick(dt);
 if(P.cur!==pc)sfx.equip();
 if(items.length<pi)sfx.pick();
 if(found>pf)sfx.sigil(found);
 if(banished&&!pb)sfx.banish();
 if(mis.done&&!pd)sfx.bonus();
 if(P.bp>.05&&P.bp<5&&keys.KeyE){cpT-=dt;if(cpT<=0){cpT=1;sfx.chant()}}else cpT=0;
 if(P.ep>.05&&P.ep<3){exT-=dt;if(exT<=0){exT=.45;sfx.ext(P.ep/3)}}else exT=0;
 if(P.hp<45&&P.hp>0){hbT-=dt;if(hbT<=0){hbT=.5+P.hp/45*.6;sfx.beat()}}else hbT=0;
 const B=M[0];
 if(B&&B.hp>0){if(B.dash>0&&!bo)sfx.dash(B);if(B.bh=='summon'&&M.length>=pm+2)sfx.summon(B);if(eb.some(b=>b.l>3-dt*1.5))sfx.fire(B)}
 for(const m of M){if(m.hp<=0)continue;
  if(m.ty=='vine'){if(m.fi&&!m._fi)sfx.vine(m,0);if(m.lf&&m.lf!==m._lf)sfx.vine(m,1);m._fi=m.fi;m._lf=m.lf}
  const d=D(m.x,m.y,P.x,P.y);if(d>(m.boss?900:460)){m._p=m.st;continue}
  if(m.st=='chase'&&m._p!='chase'){if(T-(m._at||-9)>(m.boss?8:3)){m._at=T;m.vt=R(2,4);sfx.mob(m,'alert')}}
  else{m.vt=(m.vt===undefined?R(1,4):m.vt)-dt;
   if(m.vt<=0){if(m.st=='chase'){m.vt=m.boss?R(5,9):R(2.5,5);sfx.mob(m,'snarl')}else{m.vt=m.boss?R(8,14):R(6,14);if(Math.random()<.6)sfx.mob(m,'idle')}}}
  m._p=m.st}
};
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>sfx.init(),{passive:true}));
addEventListener('keydown',e=>{if(e.code=='KeyN'&&!e.repeat&&mode=='play')say(sfx.toggle()?'Ambient sound on':'Ambient sound off',1.5)});
}
