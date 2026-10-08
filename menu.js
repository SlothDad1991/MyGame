// ---------- MENU ----------
// extra reserve magazines bought at the Ammo Depot before the breach (xa[0]=primary, xa[1]=sidearm)
const XAMAX=5,PQMAX=10;let xa=[0,0],pq=1;
const xaW=i=>{const w=i?SID[sel.side]:PRI[sel.pri];return w&&w.d?w:null},xaP=w=>2*Math.max(5,Math.round(w.c*.1)),xaN=i=>xaW(i)?xa[i]:0;
const cost=()=>[0,1].reduce((a,i)=>a+(xaW(i)?xaN(i)*xaP(xaW(i)):0),0);
const st=w=>w.d?`${w.d}${w.p>1?'x'+w.p:''} dmg · ${w.m} rounds`:'melee only';
let scr='title';
const LORE=[
 {t:'World Lore',sub:'What is left of the parish, pinned up by the last Wardens',e:[
  ['The Night the Sky Bled',"There was no moon. The sky split like a wound and the veils between the worlds tore open. The church bells rang by themselves until the ropes burned through. By dawn nobody was counting the dead."],
  ['The Breaches',"Wherever the veil was thinnest, the wound never closed. A breach is hell's own architecture grafted onto a ruined building, and an archdemon sits inside it like a nail in a plank."],
  ['The Parish',"Seven buildings still stand out of a whole parish: chapels, mills, a foundry, a crypt. Every one of them is defiled. The doors hang open and nothing inside is the way it was."],
  ['The Ash-Fields',"Between the ruins the ground is grey ash, cracked open and glowing like a forge. The only things growing are tall black thorns that look like they are waiting for something."],
  ['The Dark',"Daylight stopped being reliable. A thick unnatural dark crawls between the buildings. A lantern shows you a few paces, and the hellfire in the cracks shows you nothing worth seeing."],
  ['The Tithe',"When the bell tolls, the Breach wants its due. Stand inside the chalk ward-ring and hold your nerve for ten breaths, or it takes something from your pack, or half the bounty you carry."],
  ['Collapse',"The old exits do not last. Fire, rot or rubble can take a waystation while you are deep in the parish, and no bell warns you. Only the map keeps count of what is left."],
  ['Hellfire Rain',"Sometimes the sky itself spits. A red ring blooms on the ground and a breath later a meteor lands in it. The craters burn for a long while, and they love doorways."],
  ['The Fog',"Some nights the ash settles into a wet grey wall. You cannot see your own boots. A flare is a candle in a flooded room, and the horde, which never needed eyes, does not care."],
  ['The Old Waystations',"The Order's wards still hold at a few waystations. Stand in the ring and keep your nerve for three long breaths, and the way home opens. They are never where you remember them."],
  ['Unfinished',"Whatever tore the veil open is not finished. The cracks are still getting wider. Burn what you can and do not trust the quiet."]]},
 {t:'Horde Lore',sub:'Field notes on the pit\'s lesser servants',e:[
  ['The Horde',"Hell's rank and file. Weak alone, endless together. They come for gunfire, for sprinting boots and for the smell of the living."],
  ['Imps',"Bone-horned, thin and hateful. They claw first and think never. They die easily, which is exactly why the pit keeps sending more."],
  ['Skitters',"Half the size and twice the speed, built for the chase rather than the fight. Running only makes them faster. Turn and shoot."],
  ['Bloats',"Swollen wet things that drag themselves toward you and burst. The blast hurts anything nearby, demons included. Pop them while they are far away, or while they are in a crowd."],
  ['Thorn-Vines',"They keep their distance and lash out with a bleeding whip in a straight line. A red warning marks the line before it strikes. Step sideways and it misses."],
  ['Brutes',"Huge, slow, horned and heavy-handed. They take a lot of lead and hit like a cart. Keep moving, keep firing, and never let one corner you."],
  ['Every Shot Is a Dinner Bell',"Gunfire, sprinting and banishing rites all carry across the ash. The louder the gun, the farther it carries. The silver crossbow barely whispers."]]},
 {t:'Archdemon Lore',sub:'Three lords, three breaches, three bounties',e:[
  ['The Archdemons',"Great lords of hell, each anchored to a breach in the parish. Each carries a bounty from the Order. Kill one and it is still not gone."],
  ['Gorrath the Maw',"A charging brute of the pit. He lowers his head, the ground shakes, and he is on you. Sidestep the charge and punish the recovery. Bounty: $450."],
  ['Nyxara, Cinder Witch',"She hurls hellfire from a distance and cackles while she does it. Never stand still in her sight. Break the line of sight, or close the gap. Bounty: $400."],
  ['Mordrek the Choir-Eater',"He sings and the pit answers. Every few moments more of the horde appear at his side. End him quickly before the choir swells. Bounty: $500."],
  ['Where They Lair',"An archdemon never leaves its breach. The breach is always the building farthest from camp, and three burned sigils will mark it in red on your map."],
  ['Banishing',"A slain archdemon crawls back unless it is banished. Hold the rite over the corpse for five long seconds. The whole parish will hear you doing it."],
  ['The Bounty',"The Order pays on extraction, not on the kill. A banished demon is worth nothing to a dead Warden."],
  ['The Way Out',"Two escape routes wait at the parish edge: the Order's plague wagon and the ferryman's boat. Step into the ward-ring and hold your ground. Three heartbeats and you are carried off, no prayer required."]]},
 {t:'Hunter Lore',sub:'The Wardens\' own notes. Read them, or end up in them',e:[
  ['The Wardens',"The last of an old order. Hooded plague doctors in bone masks, armed with whatever the pit has not yet taken."],
  ['The Mask',"The beak once held herbs against plague. Now it holds wards, and the runes on the chest burn when something unholy is close. Some Wardens swore their own vows: the Penitent, the Ashen Doctor, the Gravedigger and the Bone Saint."],
  ['Sigils',"Red crosses scratched into the stone of the defiled buildings. Burn all three and the archdemon's breach is revealed. You have to stand close and stay put to do it."],
  ['Holy Water',"Blessed and bottled. It closes wounds and clears the head. Carry three if you can. Drink one before it is too late, not after."],
  ['Hellfire Flask',"Pitch, lamp oil and a rag in the neck. It bursts into a pool of fire that burns for five seconds. Anything standing in it burns. That includes you."],
  ['Signal Flare',"Burns hot and bright for fourteen seconds. The dark pulls back around it, and the horde cannot help but go to it. Throw it away from yourself."],
  ["Saint's Ward",'A reliquary charm on a chain. Hold it tight and the hits land softer for ten seconds. It does not make you a saint.'],
  ['Blessed Charges',"A hand-thrown blessing that goes off with a bang. It drops anything small and lights up the whole dark. It also lights up you."],
  ['Darksight',"Hold the old Warden's gaze and the dark thins. You will see the red eyes of the horde, and where the sigils are hiding."],
  ['The Ledger',"What your character carries dies with them. The stash is safe, and the backpack survives a clean escape. Spend the bounty before it spends you."],
  ['The Rule of the Hunt',"Burn the sigils. Kill the demon. Banish the corpse. Run for an exit and stand in its ring until it carries you off. Never stand still in the dark, except there."]]}
];
let lorTab=0;
// ---------- LORE DISCOVERY: notes stay "???" until the hunter meets them in the breach ----------
let LKS=new Set,lkQ=0;try{LKS=new Set(JSON.parse(localStorage.getItem('bh_lore')||'[]'))}catch(e){}
const lkHas=(t,i)=>LKS.has(t+'.'+i);
function lk(t,i,quiet){const k=t+'.'+i;if(LKS.has(k))return;LKS.add(k);if(!quiet)lkQ++;try{localStorage.setItem('bh_lore',JSON.stringify([...LKS]))}catch(e){}}
function loreTick(){
 if(!P||mode!='play')return;
 [[0,0],[0,3],[0,4],[3,0],[3,1]].forEach(a=>lk(a[0],a[1],1));
 if(P.dead)return;
 const px=P.x,py=P.y;
 if(blds.some(b=>inHouse(b,px,py,0)))lk(0,2);
 if(bossOpen||seals.some(z=>px>z.x-70&&px<z.x+z.w+70&&py>z.y-70&&py<z.y+z.h+70))lk(0,1);
 if(TTH&&TTH.P===P)lk(0,5);
 if(exts.some(e=>e.sealed))lk(0,6);
 if(HFR)lk(0,7);
 if(fgOn())lk(0,8);
 for(const e of exts){if(e.sealed)continue;const d=D(px,py,e.x,e.y);if(d<90)lk(0,9);if(d<26)lk(2,7)}
 const bi={gorrath:1,nyxara:2,mordrek:3}[boss],MK={imp:1,skitter:2,bloat:3,vine:4,brute:5};
 for(const m of M){if(m.hp<=0)continue;const d=D(m.x,m.y,px,py);
  if(m.boss){if(d<260){lk(2,0);if(bi)lk(2,bi)}}else if(d<190){lk(1,0);if(MK[m.ty])lk(1,MK[m.ty])}}
 if(corpse){lk(2,0);if(bi)lk(2,bi);lk(2,5)}
 if(banished||bty)lk(2,6);
 if(found>=1){lk(3,2);lk(2,4)}
 if(clues.some(c=>!c.got&&D(px,py,c.x,c.y)<60))lk(3,2);
 if(P.tn>0)lk(3,3);
 if(P.xt){if(P.xt.flask>0)lk(3,4);if(P.xt.flare>0)lk(3,5);if(P.xt.ward>0)lk(3,6)}
 if(P.bm>0)lk(3,7);
 if(keys.KeyQ)lk(3,8);
 if(lkQ){say(lkQ>1?lkQ+' new lore notes discovered (main menu > Lore)':'New lore note discovered (main menu > Lore)',4);lkQ=0}}
{const _ul=update;update=function(dt){_ul(dt);loreTick()}}
{const _sl=shoot;shoot=function(){const c=P&&P.cur,m0=c<2?P.mag[c]:0;_sl();if(P&&c<2&&P.mag[c]<m0)lk(1,6)}}
{const _el=end;end=function(w){if(P){lk(0,10,1);lk(3,9,1);if(w)lk(3,10,1)}lkQ=0;return _el(w)}}
function loreStr(){const sl=document.querySelector('.slate');if(!sl)return;const pins=[...sl.querySelectorAll('.nt')];if(pins.length<2)return;
 const old=sl.querySelector('svg.lstr');if(old)old.remove();const r=sl.getBoundingClientRect(),ox=r.left+sl.clientLeft,oy=r.top+sl.clientTop;
 const pts=pins.map(p=>{const q=p.getBoundingClientRect();return[q.left+q.width/2-ox,q.top-oy+2]});
 const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','lstr');sv.setAttribute('width',sl.clientWidth);sv.setAttribute('height',sl.clientHeight);
 let d='M'+pts[0][0]+' '+pts[0][1];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];d+=' Q'+((a[0]+b[0])/2)+' '+((a[1]+b[1])/2+10)+' '+b[0]+' '+b[1]}
 sv.innerHTML='<path d="'+d+'" fill="none" stroke="#a02424" stroke-width="1.8" opacity=".9"/>';sl.insertBefore(sv,sl.firstChild)}
addEventListener('resize',()=>{if(mode=='menu'&&scr=='lore')loreStr()});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(mode=='menu'&&scr=='lore')loreStr()});
const HELP='WASD move · Shift sprint · Mouse aim/fire · RMB melee · R reload · Wheel or 1-8 switch weapons/tools · LMB uses tools · Loot weapons, ammo & tools in the buildings · Q darksight · Tab inventory (the backpack survives your escape) · M map · E interact (sigils, banish, loot) · stand in an exit ring to escape · N toggle ambient sound';
const back='<button data-v=hub>\u2190 Back</button>',backTo=v=>`<button data-v=${v}>\u2190 Back</button>`;
function menu(m){const c=cost(),ok=c<=bank,tl=sel.tools.filter(Boolean).map(t=>TOOL[t.k].n.replace(' x2','')+' x'+t.n).join(', ')||'no tools';
 const col=(h,r)=>`<div class=col><h2>${h}</h2>${r}</div>`;let body;
 const stage=()=>`<div class=stage><canvas id=pc width=256 height=288></canvas><div class=cap>${SKINS[sel.skin].n} \u00b7 ${PRI[sel.pri].n} \u00b7 ${SID[sel.side].n} \u00b7 ${tl}</div></div>`,fo=b=>`<div class=foot><span>Cash: $${bank} &nbsp;|&nbsp; Loadout: $${c}</span>${b}</div>`,pg=(h,list,b)=>`<div class=hub>${stage()}<div class="opts list"><h2>${h}</h2>${list}</div></div>${fo(b)}`;
 if(scr=='load')body=`<div class=hub>${stage()}<div class=opts><div class=chalk data-v=l_skin>Player Skin<small>${SKINS[sel.skin].n}</small></div></div></div>${fo(back)}`;
 else if(scr=='name')body=`<div class=hub>${stage()}<div class="opts list"><h2>Name Your Hunter</h2><p>Other hunters in the breach will see this above your head. Up to 14 characters.</p><input id=pn type=text maxlength=14 autocomplete=off spellcheck=false placeholder="Hunter" value="${pname}"><button data-v=hub>Save</button></div></div>${fo(back)}`;
 else if(scr=='ammo'){const row=(i,lb)=>{const w=xaW(i);if(!w)return `<div class=chalk style="cursor:default;opacity:.5">${lb}<small>${i?(sel.side=='none'?'No sidearm equipped':'Melee only'):(sel.pri=='none'?'No primary equipped':'Melee only')}</small></div>`;const k=i?'s':'p',pr=xaP(w),res=w.m*3+xa[i]*w.m;return `<div class=chalk style="cursor:default">${lb}: ${w.n}<small>Magazine of ${w.m} \u2014 $${pr} each \u2014 starting reserve ${res} rounds (+${xa[i]*w.m} bought)</small><br><button data-xa=${k}- ${xa[i]<=0?'disabled':''}>\u2212</button> <b>${xa[i]} / ${XAMAX} extra mags \u2014 $${xa[i]*pr}</b> <button data-xa=${k}+ ${xa[i]>=XAMAX||c+pr>bank?'disabled':''}>+</button></div>`};
 body=pg('Ammo Depot',`<p>Buy extra reserve magazines before you enter the breach. They are paid for when you enter, and unused ammo is not refunded.</p>${row(0,'Primary')}${row(1,'Sidearm')}`,backTo('shop'))}
 else if(scr=='stash')body=stashBody();
 else if(scr=='shop')body=pg('Gunsmith',`<div class=chalk data-v=shop_p>Primary Weapons<small>Rifles, shotguns, muskets and more \u2014 ${Object.keys(PRI).length-1} on the rack</small></div><div class=chalk data-v=shop_s>Secondary Weapons<small>Sidearms for close work \u2014 ${Object.keys(SID).length-1} on the rack</small></div><div class=chalk data-v=shop_t>Tools<small>Holy water, charges, flasks, flares, wards and tripwires \u2014 ${Object.keys(TOOL).length} on the rack</small></div><div class=chalk data-v=ammo>Ammo Depot<small>${xa[0]+xa[1]?'+'+(xa[0]+xa[1])+' extra mags \u2014 $'+c:'Buy extra magazines before the breach'}</small></div>`,backTo('stash'));
 else if(scr.startsWith('shop_')){const src=scr=='shop_p'?PRI:scr=='shop_s'?SID:TOOL,ti=scr=='shop_p'?'Primary Weapons':scr=='shop_s'?'Secondary Weapons':'Tools';body=pg('Gunsmith \u2014 '+ti,Object.entries(src).filter(([k])=>k!='none').map(([k,w])=>`<div class=chalk data-w=${k}><canvas class=ic data-ic=${k} width=34 height=18></canvas>${w.n} \u2014 $${w.c}<small>${dsc(k)}</small></div>`).join(''),backTo('shop'))}
 else if(scr=='buy'){const q=pend,it=pit(q),qn=q.t=='w'?pq:1,tot=it.c*qn,ok2=bank>=tot;body=`<div class=hub><div class=stage><canvas id=pc width=256 height=288></canvas><div class=cap>${it.n}</div></div><div class="opts list"><h2>${it.led?it.n:'Buy '+it.n+'?'}</h2><p>${q.t=='w'?dsc(q.k):it.d}</p>${it.mys?`<p>${EPT} \u2014 Unlock: ???<br>How this skin is earned is a secret.</p>`:it.led?`<p>Ledger reward \u2014 this skin cannot be bought. Complete "${(LEDGERS.find(L=>FAMS[L.skin]===it||SKINS[L.skin]===it)||{}).t}" to unlock it.</p>`:`<p>Price: $${it.c}${q.t=='w'?' each':''} \u2014 Cash: $${bank}</p>${q.t=='w'?`<p>Quantity: <button data-bq=- ${pq<=1?'disabled':''}>\u2212</button> <b>${pq}</b> <button data-bq=+ ${pq>=PQMAX||it.c*(pq+1)>bank?'disabled':''}>+</button> &nbsp;Total: $${tot}</p>`:''}${ok2?'':'<p class=msg>Not enough cash.</p>'}<button data-y=1 ${ok2?'':'disabled'}>Buy${qn>1?' '+qn:''} for $${tot}</button>`} <button data-n=1>${it.led?'Back':'Cancel'}</button></div></div>`}
 else if(scr=='l_skin')body=pg('Skins',Object.entries(FAMS).map(([k,f])=>`<div class="chalk ${SKINS[sel.skin].f==k?'on':''}" data-f=${k}>${f.n}${f.ep?EPT:''}${own.includes(k)?'':f.mys?' \u2014 Unlock: ??? \u{1F512}':f.led?' \u2014 Ledger reward \u{1F512}':' \u2014 $'+f.c+' \u{1F512}'}<small>${f.d}</small></div>`).join(''),backTo('hub'));
 else if(scr=='l_var')body=pg(FAMS[curFam].n+' \u2014 Variations',Object.entries(SKINS).filter(([k,v])=>v.f==curFam).map(([k,v])=>`<div class="chalk ${sel.skin==k?'on':''}" data-k=${k}>${v.n}${own.includes(k)?'':' \u2014 $'+v.c+' \u{1F512}'}<small>${v.d}</small></div>`).join(''),backTo('l_skin'));
 else if(scr=='l_pri')body=pg('Primary Weapon',Object.entries(PRI).map(([k,w])=>`<div class="chalk ${sel.pri==k?'on':''}" data-p=${k}><canvas class=ic data-ic=${k} width=34 height=18></canvas>${w.n} \u2014 $${w.c}<small>${st(w)}</small></div>`).join(''),backTo('load'));
 else if(scr=='l_side')body=pg('Sidearm',Object.entries(SID).map(([k,w])=>`<div class="chalk ${sel.side==k?'on':''}" data-s=${k}>${k=='none'?'':`<canvas class=ic data-ic=${k} width=34 height=18></canvas>`}${w.n} \u2014 $${w.c}<small>${st(w)}</small></div>`).join(''),backTo('load'));
 else if(scr=='l_tools')body=pg('Tools (max 2)',Object.entries(TOOL).map(([k,t])=>`<div class="chalk ${sel.tools.includes(k)?'on':''}" data-t=${k}><canvas class=ic data-ic=${k} width=34 height=18></canvas>${t.n} \u2014 $${t.c}<small>${t.d}</small></div>`).join(''),backTo('load'));
 else if(scr=='missions')body=`<div class=cols>${col('Ledgers',ledList())}${col((LEDGERS[mi]||LEDGERS[0]).t,ledStory())}</div><div class=foot><span>Active: ${ledFoot()}</span>${back}</div>`;
 else if(scr=='lore'){const S=LORE[lorTab]||LORE[0];body=`<div class=slate><div class=tabs>${LORE.map((s,i)=>`<div class="tb ${i==lorTab?'on':''}" data-l=${i}>${s.t.replace(' Lore','')}</div>`).join('')}</div><h2 class=lt>${S.t}</h2><p class=sub>${S.sub}</p><div class=notes>${S.e.map((n0,i)=>{const kn=lkHas(lorTab,i),n=kn?n0:['???','Undiscovered. Meet it in the breach.'];return `<div class="nt ${i%2?'ch':'pp'}${kn?'':' lk'}" style="--r:${(((i*37)%7)-3)*.55}deg">${n[2]?`<div class=pol>${n[2]}</div>`:''}<h3>${n[0]}</h3><p>${n[1]}</p></div>`}).join('')}</div></div><div class=foot><span>${S.e.filter((q,i)=>lkHas(lorTab,i)).length} of ${S.e.length} notes found</span>${back}</div>`} else if(scr=='help')body=`<div class=lore><h2>Controls</h2><ul>${HELP.split(' \u00b7 ').map(l=>`<li>${l}</li>`).join('')}</ul></div><div class=foot><span></span>${back}</div>`;
 else body=`<div class=hub><div class=stage><canvas id=pc width=256 height=288></canvas><div class=cap>${pname?pname+' \u2014 ':''}${PRI[sel.pri].n} \u00b7 ${SID[sel.side].n} \u00b7 ${tl}</div></div><div class=opts><button id=go ${ok?'':'disabled'}>Enter the Breach</button>${ok?'':'<p class=msg style="font-size:20px">Can\'t afford this loadout.</p>'}<div class=chalk data-v=name>Hunter Name<small>${pname||'Unnamed \u2014 tap to set'}</small></div><div class=chalk data-v=l_skin>Skins<small>${SKINS[sel.skin].n}</small></div><div class=chalk data-v=stash>Stash & Armory<small>${stash.length} items stored</small></div><div class=chalk data-v=missions>Ledgers<small>${ledSub()}</small></div><div class=chalk data-v=lore>Lore</div><div class=chalk data-v=help>Controls</div><div class=chalk data-v=title>Main Menu</div></div></div><div class=foot><span>Cash: $${bank} &nbsp;|&nbsp; Loadout: $${c}</span><span>Ledger: ${ledFoot()}</span></div>`;
;const drawIcons=()=>document.querySelectorAll('canvas[data-ic]').forEach(c=>{const o=ctx;ctx=c.getContext('2d');try{ctx.clearRect(0,0,34,18);drawWpn(c.dataset.ic,5,9,0,1)}finally{ctx=o}});
 $('#menu').style.display='block';$('#menu').innerHTML=`<div class=board><svg class=str viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="18,14 50,22 82,12 66,60 30,70" fill="none" stroke="#a02424" stroke-width=".5" opacity=".8"/></svg><h1>\u2620 The Hellbreach Ledger \u2620</h1>${m?`<p class=msg>${m}</p>`:''}${body}</div>`;drawIcons();if(scr=='name'){const pn=$('#pn');if(pn){const sv=()=>{pname=cleanName(pn.value);SAVE()};pn.oninput=sv;['keydown','keyup','keypress'].forEach(ev=>pn.addEventListener(ev,e=>e.stopPropagation()));pn.addEventListener('keydown',e=>{if(e.key=='Enter'){sv();scr='hub';menu('')}});pn.focus();pn.setSelectionRange(pn.value.length,pn.value.length)}}if(scr=='stash')stashInit();if(scr=='lore'){loreStr();setTimeout(loreStr,120)}}
$('#menu').onclick=e=>{const t=e.target.closest('[data-so],[data-l],[data-v],[data-xa],[data-bq],[data-m],[data-f],[data-y],[data-n],[data-w],[data-u],[data-q],[data-r],[data-k],[data-p],[data-s],[data-t],#go');if(!t)return;const d=t.dataset;
 if(d.bq){pq=Math.max(1,Math.min(PQMAX,pq+(d.bq=='+'?1:-1)))}else if(d.xa){const i=d.xa[0]=='s'?1:0,w=xaW(i);if(w){const n=xa[i]+(d.xa[1]=='+'?1:-1);if(n<0||n>XAMAX)return;if(d.xa[1]=='+'&&cost()+xaP(w)>bank){note='Not enough cash.'}else xa[i]=n}}else if(d.so!==undefined)note=sortStash();else if(d.l!==undefined)lorTab=+d.l;else if(d.v){scr=d.v;if(/^shop_/.test(d.v))shopScr=d.v}else if(d.m){mi=+d.m;const Lx=LEDGERS[mi];if(Lx&&lst(Lx.id).i<Lx.tasks.length){AL=Lx.id;SAVE()}}else if(d.f){curFam=d.f;const f=FAMS[d.f];if(own.includes(d.f)){if(Object.values(SKINS).filter(v=>v.f==d.f).length>1)scr='l_var';else{sel.skin=f.def;SAVE()}}else{pend={t:'f',k:d.f};scr='buy'}}
 else if(d.k){const v=SKINS[d.k];if(own.includes(d.k)){sel.skin=d.k;SAVE()}else{pend={t:'k',k:d.k};scr='buy'}}
 else if(d.y){const q=pend,it=pit(q);if(q.t=='w'){let got=0;while(got<pq&&bank>=it.c&&addItem(q.k)){bank-=it.c;got++}if(got){SAVE();note='Bought '+(got>1?got+'x ':'')+it.n+' \u2014 '+(got>1?'they are':'it is')+' in your stash.'+(got<pq?' Ran out of '+(bank<it.c?'cash':'stash room')+' after '+got+'.':'')}else note=bank<it.c?'Not enough cash.':'Not enough room in the stash.';scr=shopScr;pend=null;pq=1}else{if(bank>=it.c&&!it.led){bank-=it.c;if(q.t=='f'){own.push(q.k,it.def);sel.skin=it.def}else{own.push(q.k);sel.skin=q.k}SAVE();note='Unlocked '+it.n+'!'}scr=q.t=='f'?'l_skin':'l_var';pend=null}}
 else if(d.n){scr=pend.t=='f'?'l_skin':pend.t=='w'?shopScr:'l_var';pend=null}
 else if(d.w){pend={t:'w',k:d.w};pq=1;scr='buy'}
 else if(d.u){const k=d.u=='p'?sel.pri:d.u=='s'?sel.side:sel.bag;if(k&&k!='none'){if(stash.length>=12)note='Stash is full.';else{stash.push(k);if(d.u=='p')sel.pri='none';else if(d.u=='s')sel.side='none';else sel.bag=null;SAVE()}}}
 else if(d.r!==undefined){const i=+d.r,k=stash[i],o=sel.bag;stash.splice(i,1);if(o)stash.push(o);sel.bag=k;SAVE()}
 else if(d.q!==undefined){const i=+d.q,k=stash[i],sd=SID[k]?1:0,o=sd?sel.side:sel.pri;stash.splice(i,1);if(o!='none')stash.push(o);if(sd)sel.side=k;else sel.pri=k;SAVE()}else if(d.p)sel.pri=d.p;else if(d.s)sel.side=d.s;else if(d.t){const i=sel.tools.indexOf(d.t);i>=0?sel.tools.splice(i,1):sel.tools.length<2&&sel.tools.push(d.t)}else if(t.id=='go'&&cost()<=bank){bank-=cost();SAVE(1);newGame();return}
 menu(note);note=''};
// the hero standing at camp on the hub screen
function drawHero(){const c=$('#pc');if(!c)return;const x=c.getContext('2d'),t=performance.now()/1000,o=ctx,sk=sel.skin;ctx=x;if(scr=='buy'&&pend&&pend.t!='w')sel.skin=pend.t=='f'?FAMS[pend.k].def:pend.k;
 try{x.clearRect(0,0,c.width,c.height);const g=x.createRadialGradient(128,226,4,128,226,170);g.addColorStop(0,'rgba(255,190,90,.30)');g.addColorStop(1,'rgba(255,190,90,0)');x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(128,228,84,16,0,0,7);x.fill();
  for(let i=0;i<7;i++){const fx=(hs(i)*256+Math.sin(t*.7+i*2)*14+256)%256,fy=40+hs(i+9)*190+Math.cos(t*.9+i)*10;x.fillStyle=`rgba(255,140,50,${.35+.35*Math.sin(t*3+i*5)})`;x.fillRect(fx|0,fy|0,3,3)}
  x.save();x.scale(8,8);const hold=scr=='buy'&&pend&&pend.t=='w'?pend.k:scr=='l_side'?(sel.side=='none'?'fists':sel.side):scr=='l_tools'&&sel.tools.length?sel.tools[0]:sel.pri;warden(16,25+(Math.sin(t*2)>0?0:.125),.35,0,0,hold,0,sel.side!='none'&&hold!=sel.side?sel.side:null);x.restore()}finally{ctx=o;sel.skin=sk}}
