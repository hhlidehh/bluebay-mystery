// ==========================================
// 窗口控制
// ==========================================

let openWindowStack = [];
let windowState = {};
let launchedApps = [];
let activeWindowId = null;
let windowZIndexCounter = 100;

function updateDock(){
  let dock=document.getElementById('dock');
  if(!dock) return;
  dock.innerHTML='';
  let apps=[
    {id:'mail',icon:'📧',label:'委托邮箱'},
    {id:'browser',icon:'🌐',label:'NEXUS搜索'},
    {id:'case',icon:'📁',label:'案件档案'},
    {id:'report',icon:'📝',label:'调查报告'}
  ];

  apps.filter(app=>launchedApps.includes(app.id)).forEach(app=>{
    let item=document.createElement('div');
    item.className='dockItem'+(isWindowOpen(app.id)?' active':'');
    item.title=app.label;
    item.innerHTML=app.icon;
    item.onclick=()=>openWindow(app.id);
    dock.appendChild(item);
  });
}

function isWindowOpen(id){
  let win=document.getElementById(id);
  if(!win) return false;
  return windowState[id] === 'open' || win.classList.contains('activeWindow');
}

function activateWindow(id){
  let win=document.getElementById(id);
  if(!win) return;
  document.querySelectorAll('.window').forEach(w=>w.classList.remove('activeWindow'));
  win.classList.add('activeWindow');
  win.style.display='block';
  win.style.zIndex = ++windowZIndexCounter;
  windowState[id] = 'open';
  activeWindowId = id;
  if(!openWindowStack.includes(id)) openWindowStack.push(id);
  openWindowStack = openWindowStack.filter(w=>document.getElementById(w));
  updateDock();
}

function focusWindow(id){
  let win=document.getElementById(id);
  if(!win) return;
  if(win.style.display === 'none') return;
  activateWindow(id);
}

function clearActiveWindow(){
  document.querySelectorAll('.window').forEach(w=>w.classList.remove('activeWindow'));
  activeWindowId = null;
  updateDock();
}

function openWindow(id){
  let win=document.getElementById(id);
  if(!win) return;
  if(!launchedApps.includes(id)) launchedApps.push(id);
  activateWindow(id);

  if(id==='mail') renderMail();
  if(id==='report') checkEndings();
  if(id==='browser') initBrowser();
}

function closeWindow(id){
  let win=document.getElementById(id);
  if(!win) return;
  win.classList.remove('activeWindow');
  win.style.display='none';
  windowState[id] = 'closed';
  openWindowStack=openWindowStack.filter(w=>w!==id);
  launchedApps = launchedApps.filter(appId => appId !== id);
  if(activeWindowId===id){
    activeWindowId = openWindowStack[openWindowStack.length-1] || null;
    if(activeWindowId) activateWindow(activeWindowId);
  }
  updateDock();
}

function minimizeWindow(id){
  let win=document.getElementById(id);
  if(!win) return;
  win.classList.remove('activeWindow');
  win.style.display='none';
  windowState[id] = 'minimized';
  openWindowStack=openWindowStack.filter(w=>w!==id);
  if(activeWindowId===id){
    activeWindowId = openWindowStack[openWindowStack.length-1] || null;
    if(activeWindowId) activateWindow(activeWindowId);
  }
  updateDock();
}

function initWindowInteractions(){
  document.querySelectorAll('.window').forEach(win=>{
    if(win.dataset.windowReady === '1') return;
    win.dataset.windowReady = '1';

    let titleBar = win.querySelector('.windowTitleBar');
    let resizeHandle = document.createElement('div');
    resizeHandle.className = 'windowResizeHandle';
    win.appendChild(resizeHandle);

    win.addEventListener('mousedown', function(){
      focusWindow(win.id);
    });

    titleBar.addEventListener('mousedown', function(e){
      if(e.button !== 0) return;
      if(e.target.closest('.windowControls')) return;
      let targetWin = win;
      if(!targetWin.classList.contains('activeWindow')) activateWindow(targetWin.id);
      let rect = targetWin.getBoundingClientRect();
      let dragState = {type:'move', startX:e.clientX, startY:e.clientY, startLeft:rect.left, startTop:rect.top};
      function onMove(ev){
        let nextLeft = Math.min(Math.max(dragState.startLeft + (ev.clientX - dragState.startX), 8), window.innerWidth - targetWin.offsetWidth - 8);
        let nextTop = Math.min(Math.max(dragState.startTop + (ev.clientY - dragState.startY), 60), window.innerHeight - targetWin.offsetHeight - 8);
        targetWin.style.left = nextLeft + 'px';
        targetWin.style.top = nextTop + 'px';
      }
      function stopMove(){
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', stopMove);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', stopMove);
      e.preventDefault();
    });

    resizeHandle.addEventListener('mousedown', function(e){
      if(e.button !== 0) return;
      let targetWin = win;
      if(!targetWin.classList.contains('activeWindow')) activateWindow(targetWin.id);
      let startWidth = targetWin.offsetWidth;
      let startHeight = targetWin.offsetHeight;
      let startX = e.clientX;
      let startY = e.clientY;
      function onResize(ev){
        let nextWidth = Math.max(320, startWidth + (ev.clientX - startX));
        let nextHeight = Math.max(240, startHeight + (ev.clientY - startY));
        nextWidth = Math.min(nextWidth, window.innerWidth - 20);
        nextHeight = Math.min(nextHeight, window.innerHeight - 80);
        targetWin.style.width = nextWidth + 'px';
        targetWin.style.height = nextHeight + 'px';
      }
      function stopResize(){
        document.removeEventListener('mousemove', onResize);
        document.removeEventListener('mouseup', stopResize);
      }
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', stopResize);
      e.preventDefault();
    });
  });

  let desktop=document.getElementById('desktop');
  if(desktop && !desktop.dataset.desktopReady){
    desktop.dataset.desktopReady='1';
    desktop.addEventListener('mousedown', function(e){
      if(e.target.closest('.icon')) return;
      clearActiveWindow();
    });
  }

  document.addEventListener('mousedown', function(e){
    if(e.target.closest('.window')) return;
    if(e.target.closest('.icon')) return;
    clearActiveWindow();
  });
}

// ==========================================
// 线索系统
// ==========================================

function addClue(name,time){
  if(clues.includes(name)){
    if(event&&event.target&&event.target.tagName==='BUTTON') event.target.style.display='none';
    return;
  }
  clues.push(name);
  document.getElementById("clueBox").innerHTML += `
    <div class="clue">
      <span class="tag">证据：</span>${name}
    </div>`;
  timeline.push(time);
  document.getElementById("timelineBox").innerHTML=timeline.join("<br>");
  if(event&&event.target&&event.target.tagName==='BUTTON') event.target.style.display='none';
  checkEndings();
  saveGame();
}

// 页面渲染后先隐藏线索按钮，只有玩家点击页面内容后才显示
function hideSavedButtons(){
  let body=document.getElementById("browserBody");
  if(!body) return;

  let btns=body.querySelectorAll("button");
  btns.forEach(btn=>{
    let oc=btn.getAttribute("onclick")||"";
    if(oc.includes("addClue('")){
      let m=oc.match(/addClue\('([^']+)'/);
      if(m && clues.includes(m[1])){
        btn.style.display="none";
      } else {
        btn.style.display="none";
      }
    }
  });

  const revealClueButtons=function(){
    btns.forEach(btn=>{
      let oc=btn.getAttribute("onclick")||"";
      if(oc.includes("addClue('")){
        let m=oc.match(/addClue\('([^']+)'/);
        if(!(m && clues.includes(m[1]))) btn.style.display="inline-block";
      }
    });
    body.removeEventListener("click", revealClueButtons);
  };

  body.removeEventListener("click", revealClueButtons);
  body.addEventListener("click", revealClueButtons, {once:true});
}
