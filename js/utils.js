// ==========================================
// 线索系统
// ==========================================
function addClue(name, timeOrButton, maybeButton){
  let time = undefined;
  let button = undefined;
  if(timeOrButton instanceof HTMLElement || (timeOrButton && timeOrButton.tagName === 'BUTTON')){
    button = timeOrButton;
  } else {
    time = timeOrButton;
  }
  if(maybeButton instanceof HTMLElement || (maybeButton && maybeButton.tagName === 'BUTTON')){
    button = maybeButton;
  }

  if(clues.includes(name)){
    hideEvidenceButton(button, name);
    hideSavedButtons();
    return;
  }

  clues.push(name);
  document.getElementById("clueBox").innerHTML += `<div class="clue"><span class="tag">证据：</span>${name}</div>`;
  if(time) timeline.push(time);
  document.getElementById("timelineBox").innerHTML = timeline.join("<br>");
  hideEvidenceButton(button, name);
  hideSavedButtons();
  checkEndings();
  saveGame();
}

function getButtonClue(btn){
  if(!btn) return null;
  let dataClue = btn.getAttribute("data-clue") || "";
  if(dataClue) return dataClue;
  let oc = btn.getAttribute("onclick") || "";
  let m = oc.match(/addClue\(['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function hideEvidenceButton(button, name){
  if(!button){
    if(typeof event !== 'undefined' && event){
      button = event.currentTarget || event.target || button;
    }
  }
  if(!button && name){
    document.querySelectorAll('button').forEach(btn => {
      if(getButtonClue(btn) === name){
        button = btn;
      }
    });
  }
  if(button && button.tagName !== 'BUTTON' && button.closest){
    button = button.closest('button');
  }
  if(button && button.tagName === 'BUTTON'){
    button.style.display = 'none';
  }
}

function hideSavedButtons(container){
  let body = typeof container === "string" ? document.getElementById(container) : container;
  if(!body) body = document;
  if(!body) return;
  body.querySelectorAll("button").forEach(btn => {
    let clue = getButtonClue(btn);
    if(clue && clues.includes(clue)) btn.style.display = "none";
  });
}
