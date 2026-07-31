// ==========================================
// 初始化
// ==========================================

window.onload=function(){
  loadGame();
  initBrowser();
  renderMail();
  initWindowInteractions();
  updateDock();
};

document.addEventListener("keydown",function(e){
  if(e.key==="Escape"){
    let w=document.querySelector(".window[style*='display: block']");
    if(w) w.style.display="none";
  }
});

