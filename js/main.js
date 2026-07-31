window.onload = function(){
  loadGame();
  if(typeof initBrowser==='function') initBrowser();
  renderMail();
  _WM.updateDock();
};

// 在 wm.js 加载后立即注册所有窗口
initAllWindows();

document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){
    var a = _WM.active();
    if(a) a.close();
  }
});
