// ==========================================
// 窗口控制
// ==========================================

function openWindow(id){
  document.querySelectorAll(".window").forEach(w=>w.style.display="none");
  document.getElementById(id).style.display="block";
  if(id==="mail") renderMail();
  if(id==="report") checkEndings();
  if(id==="browser") initBrowser();
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
