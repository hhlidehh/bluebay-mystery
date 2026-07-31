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

// 关键深度 → 里网页
const depthToPage={
  "9":["9号展缸_深层"],
  "99":["9号展缸_深层"],
  "999":["9号展缸_深层"],
  "2008":["蓝湾水族馆_深层"],
  "2010":["DSLOP项目报告_深层"],
  "2011":["分区详情_深层"],
  "2012":["未开放档案_深层"]
};

function sendSonarEmail(){
  let inv=accounts.investigator;
  if(inv.mails.some(m=>m.title.includes("深海声呐"))) return;
  inv.mails.push({
    title:"📡 新工具授权：深海声呐系统 (DAS)",
    from:"NEXUS深海监测部 <deep@nexus.gov>",
    body:`
<h2>深海声呐系统授权通知</h2>

<p>调查员林默：</p>

<p>我们审阅了你提交的报告。水族馆地下的<b>声学异常</b>——海浪声、敲击声、模仿声——需要更精确的分析工具。</p>

<p>现开放 <b>NEXUS深海声呐系统（DAS）</b>。通过声波反射成像探测不同深度的地质结构。</p>

<p>某些深度可能会<b>揭开现有档案的隐藏层面</b>。</p>

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
    result.innerHTML="<p class='sonarWarning'>请先打开浏览器窗口并访问有海浪声的网页，再使用声呐。</p>";
    return;
  }

  let input=document.getElementById("depthInput");
  let activePage = getCurrentBrowserPageId();
  if(!wavePages.includes(activePage) && !(activePage.includes("9号展缸"))){
    result.innerHTML="<p class='sonarWarning'>当前页面没有检测到海浪声。请先打开带海浪声的网页。</p>";
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

  let key="depth_"+d;
  if(sonarScans[key]){ result.innerHTML = sonarScans[key]; return; }

  let html = `<p class='sonarHint'>深度 ${d}m 扫描中…</p>`;
  if(d<=100){
    html += `<div class="deepCard"><b>🔵 ${d}m</b><br><span>正常海底沉积层。未检出异常。</span></div>`;
    setTimeout(stopWave,2000);
  }else if(d<=300){
    html += `<div class="deepCard"><b>🟡 ${d}m</b><br><span>⚠ 异常空腔结构。超出建筑地基范围。空腔向下延伸。</span></div>`;
    setTimeout(stopWave,4000);
  }else if(d<=600){
    html += `<div class="deepCard"><b>🟠 ${d}m</b><br><span>⚠ 空腔延伸。反射呈现规律性间隔。非天然结构。</span></div>`;
  }else if(d<=900){
    html += `<div class="deepCard"><b>🔴 ${d}m</b><br><span>⚠ 主动声波回应。扫描脉冲被原样返回。</span></div>`;
  }else if(d<=1500){
    html += `<div class="deepCard"><b>⭕ ${d}m</b><br><span>⚠ 信号被干扰。声源来自底部。<br>回波转译——<b>像是呼吸。</b></span></div>`;
  }else{
    html += `<div class="deepCard"><b>⭕ ${d}m</b><br><span>超出范围。仍收到微弱回波。</span></div>`;
  }

  if(depthToPage[d]){
    depthToPage[d].forEach(id=>{
      if(!deepUnlocked[id]){
        deepUnlocked[id]=true;
        html += `<div class="deepCard deepUnlock"><b>📄 已解锁隐藏档案</b><br><span>对应页面出现了新的内容。</span></div>`;
        addClue("声呐探测解锁了隐藏档案","声呐扫描发现深层真相");
      }
    });
  }

  let deepKey = activePage + "_深层";
  if(deepUnlocked[deepKey]){
    html += renderDeepPageInSonar(deepKey);
  }

  sonarScans[key]=html;
  result.innerHTML=html;
  if(d>=600) addClue("深海声呐探测到B区地下空腔延伸数百米并存在主动声波回应","声呐扫描异常");
}

function deriveDepthFromPage(activePage){
  let body=document.getElementById('browserBody');
  if(!body) return null;
  let text = body.innerText || '';
  let explicit = text.match(/(\d{1,4})\s*(m|米)/i);
  if(explicit) return parseInt(explicit[1],10);
  let digits = text.match(/\b\d{1,4}\b/g);
  if(digits && digits.length){
    return parseInt(digits[0],10);
  }
  if(activePage.includes("9号展缸")) return 9;
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
