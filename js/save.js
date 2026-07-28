// ==========================================
// 本地存档系统
// ==========================================

function saveGame(){
  let data={
    clues,timeline,
    loggedInAccounts,currentAccount,
    archiveUnlocked,zonesUnlocked,restrictedUnlocked,
    browserTabs,activeBrowserTab,
    accts:{},_v:3
  };
  for(let k in accounts) data.accts[k]={loggedIn:accounts[k].loggedIn};
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
    browserTabs = Array.isArray(d.browserTabs)?d.browserTabs:[];
    activeBrowserTab = typeof d.activeBrowserTab === 'number'? d.activeBrowserTab : 0;
    if(browserTabs.length===0){
      browserTabs=[];
      activeBrowserTab=0;
    } else if(activeBrowserTab<0||activeBrowserTab>=browserTabs.length){
      activeBrowserTab=0;
    }
    if(d.accts) for(let k in d.accts) if(accounts[k]) accounts[k].loggedIn=d.accts[k].loggedIn;
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
