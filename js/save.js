// ==========================================
// 本地存档系统
// ==========================================

function saveGame(){
  let data={
    clues,timeline,
    loggedInAccounts,currentAccount,
    archiveUnlocked,zonesUnlocked,restrictedUnlocked,
    sonarUnlocked,sonarScans,deepUnlocked,
    browserTabs,activeBrowserTab,browserTabCounter,
    accts:{},mailReadState:{},_v:3
  };
  for(let k in accounts){
    let accountState=accounts[k]||{};
    let readCount = accountState._read instanceof Set ? accountState._read.size : 0;
    let unreadCount = Math.max(0, (Array.isArray(accountState.mails)?accountState.mails.length:0) - readCount);
    accountState.unread = unreadCount;
    data.accts[k]={
      loggedIn:!!accountState.loggedIn,
      name:accountState.name,
      mail:accountState.mail,
      password:accountState.password,
      unread:accountState.unread,
      mails:Array.isArray(accountState.mails)?accountState.mails.map(m=>({...m})):[],
      _read: accountState._read ? Array.from(accountState._read) : []
    };
    data.mailReadState[k]= accountState._read ? Array.from(accountState._read) : [];
  }
  localStorage.setItem('aquarium_save',JSON.stringify(data));
  let dot=document.getElementById('saveDot');
  if(dot){dot.style.opacity=1;setTimeout(()=>dot.style.opacity=0,1200);}
}

function loadGame(){
  let raw=localStorage.getItem('aquarium_save');
  if(!raw) return false;
  try{
    let d=JSON.parse(raw);
    if(!d._v||d._v<2) return false; // 旧版本存档忽略
    clues=d.clues||[]; timeline=d.timeline||[];
    loggedInAccounts=d.loggedInAccounts||['investigator'];
    currentAccount=d.currentAccount||'investigator';
    archiveUnlocked=d.archiveUnlocked||false;
    zonesUnlocked=d.zonesUnlocked||false;
    restrictedUnlocked=d.restrictedUnlocked||false;
    sonarUnlocked=d.sonarUnlocked||false;
    sonarScans=d.sonarScans||{};
    deepUnlocked=d.deepUnlocked||{};
    if(sonarUnlocked){ document.getElementById("sonarIcon").style.display="inline-flex"; }
    browserTabs = Array.isArray(d.browserTabs)?d.browserTabs:[];
    activeBrowserTab = typeof d.activeBrowserTab === 'number'? d.activeBrowserTab : 0;
    browserTabCounter = typeof d.browserTabCounter === 'number'? d.browserTabCounter : 0;
    // 若存档缺少 counter，从现有标签 id 恢复
    if(!browserTabCounter && browserTabs.length){
      browserTabs.forEach(t=>{ let n=parseInt(String(t.id||'').replace('tab-',''))||0; if(n>browserTabCounter) browserTabCounter=n; });
    }
    if(browserTabs.length===0){
      browserTabs=[];
      activeBrowserTab=0;
    } else if(activeBrowserTab<0||activeBrowserTab>=browserTabs.length){
      activeBrowserTab=0;
    }
    if(d.accts) for(let k in d.accts) if(accounts[k]){
      let saved = d.accts[k] || {};
      accounts[k].loggedIn = !!saved.loggedIn;
      if(saved.name) accounts[k].name = saved.name;
      if(saved.mail) accounts[k].mail = saved.mail;
      if(saved.password) accounts[k].password = saved.password;
      if(saved.unread != null) accounts[k].unread = saved.unread;
      if(Array.isArray(saved.mails)) accounts[k].mails = saved.mails.map(m=>({...m}));
      accounts[k]._read = new Set(Array.isArray(saved._read) ? saved._read : []);
    }
    if(d.mailReadState) for(let k in d.mailReadState) if(accounts[k]){
      accounts[k]._read = new Set(Array.isArray(d.mailReadState[k]) ? d.mailReadState[k] : []);
    }
    // 重建线索UI
    document.getElementById('clueBox').innerHTML=clues.map(n=>`<div class="clue"><span class="tag">证据：</span>${n}</div>`).join('');
    document.getElementById('timelineBox').innerHTML=timeline.join('<br>');
    checkEndings();
    return true;
  }catch(e){return false;}
}

function resetGameProgress(){
  let firstConfirm=window.confirm('⚠️ 确定要重置档案吗？这会清除当前所有调查进度，并恢复为初始状态。');
  if(!firstConfirm) return;

  let secondConfirm=window.confirm('⚠️ 这是最后一次确认。重置后当前进度将无法恢复，是否继续？');
  if(!secondConfirm) return;

  localStorage.removeItem('aquarium_save');
  window.location.reload();
}
