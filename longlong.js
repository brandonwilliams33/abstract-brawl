/* Private, fictional football-fan character; loaded only by fight.html. */
(()=>{
 const id=64, sheet='longlong', path='raster/longlong-atlas.webp';
 const frames=rects=>rects.map(([x,y,w,h],i)=>({x,y,w,h,pivotX:w/2,pivotY:h-4,referenceHeight:i===4?285:i===7?285:h-4,sheet}));
 const entry=rects=>{
  const f=frames(rects);
  // Fixed world-scale prevents jumping and KO poses from ballooning in size.
  for(const r of f)r.referenceHeight=285;
  const clip=(...indices)=>indices.map(i=>f[i]);
  return {name:'龙龙',key:null,sheets:{[sheet]:path},referenceHeight:285,targetHeight:177,koFrame:0,
   clips:{idle:clip(0,1),run:clip(2,3),jump:clip(4,4,4),block:clip(0,1),hurt:clip(6,6),down:clip(7,7),
    light:clip(0,8,0),heavy:clip(0,9,0),skill1:clip(0,10,0),skill2:clip(0,10,0),skill3:clip(0,10,0),super:clip(0,11,11)},
   impact:{light:1,heavy:1,skill1:1,skill2:1,skill3:1,super:1}};
 };
 ANIMATIONS[id]=entry(LONGLONG_ATLAS.blue);
 MEME_ART.sheets[sheet]=path;
 MEME_ART.forms||={};MEME_ART.forms.longlong_arsenal=entry(LONGLONG_ATLAS.red);
 const keys=['longlong_trophy','longlong_lawyer','longlong_114','longlong_oil','longlong_ball','longlong_cannon'];
 LONGLONG_ATLAS.props.forEach(([x,y,w,h],i)=>{MEME_ART.clips[keys[i]]=[{x,y,w,h,sheet,referenceWidth:w,referenceHeight:h,pivotX:w/2}];});
 const skill=(index,name,type,extra)=>({key:['J','K','U','I','O','L'][index],name,type,super:index===5,...extra});
 const c={id,name:'龙龙',file:'assets/longlong.png',width:185,height:294,group:'足球看台',title:'顺风蓝月，逆风枪手',
  quote:'球衣可以换，冠军不能少。',color:'#83d3f5',trait:'counter',style:'技巧 / 看台反击',glyph:'冠',pinyinInitial:'l',
  hp:1030,speed:225,power:1,guardFx:'longlong_trophy',passive:['冠军底蕴','格挡成功额外获得 4 气；低于 40% 生命释放紧急避险时回复 60 生命并后撤'],
  skills:[
   skill(0,'蓝月点赞拳','light',{damage:26,range:98,start:.08,duration:.27,cd:.24,physical:true,desc:'点赞变直拳，近身快击，可接轻重连段'}),
   skill(1,'榜首体验卡','heavy',{damage:53,range:126,start:.2,duration:.55,cd:.52,physical:true,desc:'高抬腿重踢：榜首先让我体验一下'}),
   skill(2,'我的律师马上到','counter',{damage:34,range:145,start:.16,duration:.56,cd:7.2,reflect:true,fx:'longlong_lawyer',phrase:'先别判，我律师在路上！',desc:'律师出庭，两秒内反击正面近身攻击并弹回飞行道具；抓投与必杀可反制'}),
   skill(3,'114项指控·分期送达','throw',{damage:19,range:900,start:.3,duration:.9,cd:5.5,count:3,interval:.14,speed:410,size:74,life:1.8,fx:'longlong_114',phrase:'别急，材料还没交齐！',desc:'三叠“114”文件沿抛物线依次投出；可格挡或跳过，总基础伤害 57'}),
   skill(4,'石油也是水','projectile',{damage:40,range:900,start:.32,duration:.69,cd:6.2,speed:350,life:1.8,size:92,offset:34,slow:1.25,fx:'longlong_oil',phrase:'这叫流动资金！',desc:'踢出低位油桶，命中减速 1.25 秒；前摇明显，可跳过'}),
   skill(5,'紧急避险','transform',{damage:0,range:220,start:.38,duration:1.05,cd:0,form:'longlong_arsenal',formTime:8,attackBoost:1.08,speedBoost:1.06,fx:'longlong_cannon',openingFx:'longlong_cannon',openingDamage:105,openingRange:220,longlongEscape:true,desc:'消耗 100 气，换上阿森纳球衣八秒；近处礼炮冲击，伤害提高 8%、移速提高 6%。低于 40% 血量时回 60 血并后撤；换装不重置技能冷却'})
  ]};
 ROSTER.push(c);ROSTER.sort((a,b)=>(a.pinyinInitial||'z').localeCompare(b.pinyinInitial||'z')||a.name.localeCompare(b.name,'zh-Hans-CN-u-co-pinyin'));
 ROSTER_BY_ID.set(id,c);
 // Let the existing mimic character borrow the new moves through normal rules.
 if(window.MIMIC_POOLS)for(let i=0;i<6;i++)for(const n of (i<2?[i]:i===5?[5]:[2,3,4]))MIMIC_POOLS[i].push({characterId:id,characterName:c.name,index:n,skill:c.skills[n]});
 const emit=MemeCombat.emit;
 MemeCombat.emit=function(g,f,a){
  const escape=a.skill.longlongEscape,emergency=escape&&f.hp<f.data.hp*.4;
  const handled=emit(g,f,a);
  if(escape){
   if(emergency){f.hp=Math.min(f.data.hp,f.hp+60);f.x=Math.max(45,Math.min(915,f.x-f.facing*110));g.text('+60 · 风向变了',f.x,f.y-165,'#b8ff83',1,22);}
   g.text(emergency?'逆风？那我从小就是枪迷！':'蓝月的事，问我枪手干嘛？',f.x,f.y-220,'#ff8a8a',1.5,20);
  }
  return handled;
 };
})();
