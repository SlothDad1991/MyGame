const PRI={rifle:{n:'Exorcist Rifle',c:150,d:75,r:1.2,m:5,p:1,s:.015,nz:420,sp:520,rl:2.2},shotgun:{n:'Hellbane Shotgun',c:130,d:15,r:1,m:2,p:7,s:.16,nz:380,sp:400,rl:2.4},repeater:{n:'Repeater',c:100,d:30,r:.38,m:8,p:1,s:.05,nz:340,sp:480,rl:2},crossbow:{n:'Silver Crossbow',c:60,d:55,r:1.4,m:1,p:1,s:.02,nz:60,sp:360,rl:1.8},pepperbox:{n:'Litany Pepperbox',c:140,d:21,r:.16,m:6,p:1,s:.09,nz:380,sp:480,rl:2.8},musket:{n:'Judgement Musket',c:200,d:140,r:1.9,m:2,p:1,s:.004,nz:520,sp:760,l:1,rl:3},flamer:{n:'Pyre Thrower',c:180,d:5,r:.1,m:40,p:2,s:.22,nz:130,sp:210,l:.38,rl:3.2},none:{n:'Fists & Faith',c:0}};
const SID={pistol:{n:'Pistol',c:50,d:24,r:.5,m:6,p:1,s:.06,nz:280,sp:460,rl:1.4},revolver:{n:"Saint's Revolver",c:85,d:40,r:.7,m:6,p:1,s:.04,nz:320,sp:480,rl:2},handcannon:{n:"Martyr's Cannon",c:130,d:75,r:1.1,m:3,p:1,s:.05,nz:430,sp:520,rl:2.2},whisper:{n:'Whisper Pistol',c:110,d:21,r:.45,m:8,p:1,s:.04,nz:45,sp:480,rl:1.5},none:{n:'Fists & Faith',c:0}};
Object.entries(PRI).forEach(([k,w])=>w.k=k);Object.entries(SID).forEach(([k,w])=>w.k=k);
const SKINS={plain:{f:'hunter',c:0,pl:1,n:'Plain Hunter',d:'Drab coat, bare face. Everyone starts somewhere.',coat:'#4a4640',coat2:'#5a564e',hood:'#3a3732',mask:'#c9a888',beak:'',eye:'',eyeg:'',rune:'',band:'#3a2e22'},
warden:{f:'warden',c:0,n:'The Warden',d:'Hooded plague doctor. The order\'s standard.',coat:'#2b2433',coat2:'#3d3347',hood:'#1c1622',mask:'#d8d0c0',beak:'#c8bfa8',eye:'#ffd060',eyeg:'#ffb030',rune:'#ff3a2a',band:'#6a4a2a'},
penitent:{f:'warden',c:450,n:'Crimson Penitent',d:'Robed in the blood of the fallen.',coat:'#5a1620',coat2:'#7a2230',hood:'#3a0c14',mask:'#e8e0d4',beak:'#d8cfc0',eye:'#ffffff',eyeg:'#ff7a7a',rune:'#ffd23a',band:'#2a1a1a'},
ashen:{f:'warden',c:450,n:'Ashen Doctor',d:'Grey as the ash-fields. Eyes like marsh fire.',coat:'#3a3d40',coat2:'#505458',hood:'#26292b',mask:'#bfc4b8',beak:'#a9afa2',eye:'#a8ff70',eyeg:'#70e040',rune:'#70ff90',band:'#4a4a3a'},
gravedigger:{f:'warden',c:550,n:'The Gravedigger',d:'Mud, rust and a long night of shovel work.',coat:'#4a3622',coat2:'#654a2e',hood:'#2e2012',mask:'#b89a78',beak:'#a4875f',eye:'#ffa040',eyeg:'#ff8a20',rune:'#ff8a20',band:'#2a1c10'},
saint:{f:'warden',c:800,n:'Bone Saint',d:'Pale vestments. Heaven has not forgotten you.',coat:'#cfc8b8',coat2:'#e8e2d2',hood:'#a89f8a',mask:'#fff6dc',beak:'#efe4c4',eye:'#70c0ff',eyeg:'#4a9aff',rune:'#60b0ff',band:'#b89a50'},
knight:{f:'knight',v:'knight',c:900,n:'Iron Crusader',d:'Plate, plume and a visor slit. Walks like a wall.',coat:'#8a8f9a',coat2:'#b4bac6',hood:'#5a5f6c',mask:'#000',beak:'',eye:'#ff5030',eyeg:'#ff3010',rune:'#7a1c24',band:'#d8b050'},
gun:{f:'gun',v:'gun',c:700,n:'Dusk Gunslinger',d:'Duster, bandana and a hat that has seen worse nights.',coat:'#7a5a38',coat2:'#98704a',hood:'#3a2a1c',mask:'#d9b894',beak:'',eye:'#ffffff',eyeg:'#ffffff',rune:'#b02a2a',band:'#c8a050'},
bones:{f:'bones',v:'bones',c:650,n:'Rattlebones',d:'Died once. Disliked it. Came back to hunt.',coat:'#e8e4d0',coat2:'#b8b4a0',hood:'#14101a',mask:'#f0ecd8',beak:'',eye:'#70ffd0',eyeg:'#30ffa0',rune:'#3a2a4a',band:'#6a5a8a'},
witch:{f:'witch',v:'witch',c:750,n:'Bog Witch',d:'Tall hat, sharp nose, and a bottle of something awful.',coat:'#3a1a5a',coat2:'#5a2a82',hood:'#1c0e2e',mask:'#9ac47a',beak:'',eye:'#ffe040',eyeg:'#ffcc00',rune:'#ff5ad8',band:'#e0b040'},
wolf:{f:'wolf',v:'wolf',c:800,n:'Wolfhide Stalker',d:'Pelt, paint and fangs. The wild hunts the breach.',coat:'#6a5a4a',coat2:'#9a8a74',hood:'#4a3e32',mask:'#d8b890',beak:'',eye:'#ffd040',eyeg:'#ffb000',rune:'#c02020',band:'#3a2a1c'},
reaper:{f:'reaper',v:'reaper',c:0,led:1,mys:1,ep:1,n:'The Reaper',d:'Flayed, horned and split open around a heart of living coal. It wears its victims on its belt and its grin never closes. How it is earned is not written anywhere.',coat:'#2a0b14',coat2:'#4a1626',hood:'#3c131e',mask:'#d8cca8',beak:'',eye:'#ffe060',eyeg:'#ffa020',rune:'#ff7a1a',band:'#6e1630'}};
const TOOL={tonic:{n:'Holy Water',c:20,d:'+50 HP (H) \u00b7 stacks to 3'},bomb:{n:'Blessed Charge',c:25,d:'big boom (G) \u00b7 stacks to 3'},flask:{n:'Hellfire Flask',c:35,d:'burning pool, 5s (Z) \u00b7 stacks to 3'},flare:{n:'Signal Flare',c:20,d:'lights the dark, lures imps (X) \u00b7 stacks to 3'},ward:{n:"Saint's Ward",c:40,d:'-60% damage for 10s (C) \u00b7 stacks to 3'}};
const XT=['flask','flare','ward','tripwire'],XL=['Flask','Flare','Ward','Wire'],TKS=['tonic','bomb',...XT];
TOOL.tripwire={n:'Tripwire',c:30,d:'plant a wire; anything that trips it \u2014 imps, rivals, even you \u2014 takes a blast (V) \u00b7 stacks to 3'};
const BOSS={gorrath:{n:'Gorrath the Maw',i:'\u{1F525}',d:'Charging brute of the pit.',bh:'charge',hp:900,bo:450},nyxara:{n:'Nyxara, Cinder Witch',i:'\u{1F608}',d:'Hurls hellfire from afar.',bh:'ranged',hp:650,bo:400},mordrek:{n:'Mordrek the Choir-Eater',i:'\u{1F47F}',d:'Calls the horde to his side.',bh:'summon',hp:750,bo:500}};
const FAMS={hunter:{n:'The Hunter',d:'The plain issue kit. Always yours.',c:0,def:'plain'},warden:{n:'The Warden',d:'Hooded plague doctor. 5 variations.',c:1000,def:'warden'},
knight:{n:'Iron Crusader',d:'Plate, plume and a visor slit. Walks like a wall.',c:900,def:'knight'},
gun:{n:'Dusk Gunslinger',d:'Duster, bandana and a hat that has seen worse nights.',c:700,def:'gun'},
bones:{n:'Rattlebones',d:'Died once. Disliked it. Came back to hunt.',c:650,def:'bones'},
witch:{n:'Bog Witch',d:'Tall hat, sharp nose, and a bottle of something awful.',c:750,def:'witch'},
wolf:{n:'Wolfhide Stalker',d:'Pelt, paint and fangs. The wild hunts the breach.',c:800,def:'wolf'}};
const LEDGERS=[
{id:'crusade',t:'The Last Crusade',skin:'knight',h:"Sir Aldric Vane led one hundred knights into the Hellbreach to seal it. Only his armor walked back out, empty, still marching. Finish the crusade he could not.",tasks:[
{t:'kills',n:10,bo:150,h:'Clear the Gatehouse',s:"Aldric's banner still hangs in the gatehouse ash. The imps nest beneath it. Burn them out."},
{t:'wkills',w:'melee',n:6,bo:250,h:'Steel Before Powder',s:"The crusade swore never to fire on the damned, only to cut them down. Honor the vow with melee attacks."},
{t:'bdmg',n:300,bo:350,h:'Break the Archdemon',s:"A squire scratched a warning into a dented shield: the archdemon fears nothing but its own blood. Make it bleed."},
{t:'ban',n:1,bo:600,h:'Lay the Knight to Rest',s:"Banish the archdemon's corpse and carry Aldric's banner out. The empty armor will finally stand down."}]},
{id:'draw',t:"Dead Man's Draw",skin:'gun',h:"Marshal Cole Haddan owed the Breach one last duel and lost it at high noon. His hat still hangs on a hitching post beside the sigils, waiting for a new owner.",tasks:[
{t:'wkills',w:'pistol',n:6,bo:150,h:'Warm Up the Hand',s:"Cole never trusted a rifle. Six imps with the plain Pistol will show you how he thought."},
{t:'esc',n:2,bo:250,h:'Ride Out Twice',s:"Haddan's rule: a gunslinger is only as good as his exits. Leave the Breach alive, twice."},
{t:'bfin',n:1,bo:350,h:'The Killing Shot',s:"His last duel ended on a single bullet that missed. Land the killing blow on the archdemon yourself."},
{t:'kills',n:20,bo:600,h:'High Noon',s:"Twenty imps, one long afternoon. Finish what the marshal started, and the hat is yours."}]},
{id:'choir',t:'The Bone Choir',skin:'bones',h:"Cantor Ossian sang the damned to sleep for forty years. When the Breach swallowed his choir he kept singing, long after his voice was gone. The song still needs a singer.",tasks:[
{t:'kills',n:15,bo:150,h:'Quiet the Verses',s:"The first verse is a chorus of imps. Silence fifteen of them."},
{t:'wkills',w:'bomb',n:5,bo:250,h:'Percussion',s:"Every hymn needs a drum. Kill five imps with blessed charges."},
{t:'esc',n:3,bo:350,h:'Three Silent Exits',s:"The choir fell silent one by one. Leave the Breach alive three times, and be heard by none."},
{t:'bfin',n:1,bo:600,h:'The Last Verse',s:"Land the killing blow on the archdemon. Ossian finally gets his rest, and you get his bones."}]},
{id:'bargain',t:"The Bog Witch's Bargain",skin:'witch',h:"Old Marrow brews cures from hellfire and wants a fresh supply. She pays in coin first, and in something worse later. The cauldron is always hungry.",tasks:[
{t:'kills',n:12,bo:150,h:'Fresh Ingredients',s:"Marrow wants imp horns, twelve of them, still warm."},
{t:'wkills',w:'crossbow',n:6,bo:250,h:'Silver for the Pot',s:"Silver bolts leave the meat clean. Six imps with the Silver Crossbow."},
{t:'bdmg',n:350,bo:350,h:'A Pinch of Archdemon',s:"The recipe calls for a pinch of the archdemon itself. Take it with a few hundred damage."},
{t:'esc',n:3,bo:600,h:'Never Tip the Witch',s:"Marrow does not tip, and does not wait. Bring your wares out alive, three times, and the hat and broth are yours."}]},
{id:'pack',t:'The Pack Under the Hill',skin:'wolf',h:"The Skarn wolf-clan hunted the Breach for a hundred winters. Now the pack is gone and only Ulf, the last stalker, still howls from the hill. Answer him.",tasks:[
{t:'esc',n:2,bo:150,h:'Run With the Wind',s:"A wolf survives by knowing when to leave. Escape the Breach alive twice."},
{t:'kills',n:14,bo:250,h:'Thin the Herd',s:"Imps follow the scent of the dead. Cull fourteen of them before they track the clan's cubs."},
{t:'bdmg',w:'melee',n:150,bo:350,h:'Tooth and Claw',s:"The Skarn never killed from afar. Deal damage to the archdemon with melee attacks."},
{t:'ban',n:1,bo:600,h:'Avenge the Pack',s:"Banish the archdemon's corpse and carry its pelt home. Ulf will lay down the howl."}]}];
