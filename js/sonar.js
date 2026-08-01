// ==========================================
// 海浪音效管理
// ==========================================
let waveAudio=new Audio("assets/waves.mp3");
waveAudio.loop=true;
waveAudio.volume=0.3;

function playWave(){ waveAudio.currentTime=0; waveAudio.play().catch(()=>{}); }
function stopWave(){ waveAudio.pause(); waveAudio.currentTime=0; }

// 触发海浪音效的页面
let wavePages=["蓝湾水族馆","深海生命计划","DSLOP项目报告","DSLOP公开说明","9号展缸","分区详情","未开放档案"];

function maybePlayWave(id,source){
  if(wavePages.includes(id)||(source==="hidden"&&id.includes("9号展缸"))||id.includes("_深层")){
    playWave();
  }
}

// ==========================================
// 深海声呐系统 (DAS)
// ==========================================
let sonarUnlocked=false;
let sonarScans={};
// 声呐解锁的深层页面
let deepUnlocked={};

// 关键深度 → 里网页（一一对应：须在对应表网页扫描该深度才能解锁）
const pageDepthUnlock={
  "蓝湾水族馆":{2008:"蓝湾水族馆_深层"},
  "DSLOP项目报告":{2010:"DSLOP项目报告_深层"},
  "分区详情":{2011:"分区详情_深层"},
  "9号展缸":{999:"9号展缸_深层"},
  "未开放档案":{2012:"未开放档案_深层"}
};
// 全部关键深度集合（用于提示"深度与当前网页不匹配"）
const keyDepths=new Set();
Object.values(pageDepthUnlock).forEach(m=>Object.keys(m).forEach(k=>keyDepths.add(parseInt(k,10))));

function sendSonarEmail(){
  let inv=accounts.investigator;
  if(inv.mails.some(m=>m.title.includes("深海声呐"))) return;
  inv.mails.push({
    title:"📡 新工具授权：深海声呐系统 (DAS)",
    from:"NEXUS深海监测部 <deep@nexus.gov>",
    body:`
<h2>深海声呐系统授权通知</h2>

<p>调查员林默：</p>

<p>我们审阅了你提交的报告。并且注意到了部分网页出现的<b>声学异常</b>——海浪声——需要给你提供更深层的分析工具。</p>

<p>现开放 <b>NEXUS深海声呐系统（DAS）</b>。通过勘测具有声学异常的网页的特殊深度你可以获取新的信息。</p>

<p><b>通过这种方式,你将获取更多线索</b>。</p>

<p style="color:#788;">—— NEXUS深海监测部</p>
`
  });
  addClue("获得NEXUS深海声呐系统授权","调查总部授予声呐探测权限");
}

function unlockSonar(){
  sonarUnlocked=true;
  document.getElementById("sonarIcon").style.display="inline-flex";
  saveGame();
}

function scanDepth(){
  let browserWin = document.getElementById('browser');
  let result=document.getElementById("sonarResult");
  if(!browserWin || browserWin.style.display === 'none'){
    result.innerHTML="<p class='sonarWarning'>请先打开浏览器窗口并访问存在声学异常的网页，再使用声呐。</p>";
    return;
  }

  let input=document.getElementById("depthInput");
  let activePage = getCurrentBrowserPageId();
  if(!wavePages.includes(activePage) && !(activePage.includes("9号展缸"))){
    result.innerHTML="<p class='sonarWarning'>当前页面没有检测到声学异常。请先打开带有声学异常的网页。</p>";
    return;
  }

  let d=parseInt(input.value);
  if(!d||d<0){
    let derived = deriveDepthFromPage(activePage);
    if(derived){
      d = derived;
      input.value = derived;
      result.innerHTML = `<p class='sonarHint'>已从当前网页提取深度：${derived}m。</p>`;
    } else {
      result.innerHTML="<p class='sonarWarning'>请输入有效的深度值。</p>";
      return;
    }
  }

  playWave();
  let wave=document.getElementById("sonarWave");
  wave.style.height="2px";
  setTimeout(()=>wave.style.height=Math.min(60,Math.max(4,d/25))+"px",100);

  let key="depth_"+activePage+"_"+d;
  if(sonarScans[key]){ result.innerHTML = sonarScans[key]; return; }

  let html = `<p class='sonarHint'>深度 ${d}m 扫描中…</p>`;
  
  let unlockId = pageDepthUnlock[activePage] ? pageDepthUnlock[activePage][d] : undefined;
  if(unlockId){
    if(!deepUnlocked[unlockId]){
      deepUnlocked[unlockId]=true;
      html += `<div class="deepCard deepUnlock"><b>📄 已解锁隐藏档案</b><br><span>当前页面的深层档案已解锁。</span></div>`;
      addClue("声呐探测解锁了隐藏档案","声呐扫描发现深层真相");
    }
  }else if(keyDepths.has(d)){
    html += `<div class="deepCard"><b>⚠ 无关联回波</b><br><span>该深度与当前网页没有声学关联。请尝试在对应的网页中扫描。</span></div>`;
  }else{
	html += `<div class="deepCard"><b>⚠ 无回波</b><br><span>该深度没有检测到任何异常。</span></div>`;
  }

  let deepKey = activePage + "_深层";
  if(unlockId && deepUnlocked[deepKey]){
    html += renderDeepPageInSonar(deepKey);
  }

  sonarScans[key]=html;
  result.innerHTML=html;
  if(d>=600) addClue("深海声呐探测到B区地下空腔延伸数百米并存在主动声波回应","声呐扫描异常");
}

function deriveDepthFromPage(activePage){
  // 从 pageDepthUnlock 反查当前页面对应的关键深度（单一数据源）
  let map = pageDepthUnlock[activePage];
  if(map){
    let keys = Object.keys(map);
    if(keys.length) return parseInt(keys[0],10);
  }
  let body=document.getElementById('browserBody');
  if(!body) return null;
  let text = body.innerText || '';
  let explicit = text.match(/(\d{1,4})\s*(m|米)/i);
  if(explicit) return parseInt(explicit[1],10);
  let digits = text.match(/\b\d{1,4}\b/g);
  if(digits && digits.length){
    return parseInt(digits[0],10);
  }
  return null;
}

function getCurrentBrowserPageId(){
  let tab=getCurrentTab();
  if(!tab || tab.historyPos<0) return "";
  let state = tab.history[tab.historyPos];
  return state && state.id ? state.id : "";
}

function renderDeepPageInSonar(pageKey){
  let deepPage = deepPages[pageKey];
  if(!deepPage) return '';
  return `
    <div class="sonarDeepPage">
      <div class="sonarDeepPageHeader">🔓 深层档案：${deepPage.title}</div>
      ${deepPage.content}
    </div>`;
}
