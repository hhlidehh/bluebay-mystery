// ==========================================
// 窗口控制
// ==========================================

function openWindow(id){
  document.querySelectorAll(".window").forEach(w=>w.style.display="none");
  document.getElementById(id).style.display="block";
  if(id==="mail") renderMail();
  if(id==="report") checkEndings();
}

function closeWindow(id){
  document.getElementById(id).style.display="none";
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

// 页面渲染后自动隐藏已保存证据的按钮
function hideSavedButtons(){
  let btns=document.querySelectorAll("button");
  btns.forEach(btn=>{
    let oc=btn.getAttribute("onclick")||"";
    if(oc.includes("addClue('")){
      let m=oc.match(/addClue\('([^']+)'/);
      if(m && clues.includes(m[1])) btn.style.display="none";
    }
  });
}
