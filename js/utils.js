// ==========================================
// 线索系统
// ==========================================
function addClue(name,time){
  if(clues.includes(name)){
    if(event&&event.target&&event.target.tagName==='BUTTON') event.target.style.display='none';
    return;
  }
  clues.push(name);
  document.getElementById("clueBox").innerHTML += `<div class="clue"><span class="tag">证据：</span>${name}</div>`;
  timeline.push(time);
  document.getElementById("timelineBox").innerHTML=timeline.join("<br>");
  if(event&&event.target&&event.target.tagName==='BUTTON') event.target.style.display='none';
  checkEndings();
  saveGame();
}
function hideSavedButtons(container){
  let body=typeof container==="string"?document.getElementById(container):container;
  if(!body) body=document.getElementById("browserBody");
  if(!body) return;
  body.querySelectorAll("button").forEach(btn=>{
    let oc=btn.getAttribute("onclick")||"";
    if(!oc.includes("addClue('")) return;
    let m=oc.match(/addClue\\('([^']+)'/);
    if(m&&clues.includes(m[1])) btn.style.display="none";
  });
}
