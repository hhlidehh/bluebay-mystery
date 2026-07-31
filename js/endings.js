// ==========================================
// 结局解锁检查
// ==========================================

function checkEndings(){
  let any=false;
  if(clues.length>=2){ document.getElementById("endSlot1").style.display="block"; any=true; }
  let hasShip=clues.includes("造船集团参与深海研究项目")||clues.includes("蓝湾造船集团参与水族馆地下建设并试图控制B区");
  let hasTank=clues.includes("9号展缸没有官方生物记录")||clues.includes("9号展缸并非水族馆登记生物");
  let hasChen=clues.some(c=>c.includes("陈志远"));
  if(hasShip && hasTank && hasChen){ document.getElementById("endSlot2").style.display="block"; any=true; }
  let hasRule=clues.includes("获得水族馆异常规则文件");
  let hasUnderground=clues.includes("李清禾发现地下异常区域");
  let hasWarning=clues.some(c=>c.includes("陈志远")&&(c.includes("观察")||c.includes("警告")));
  if(hasRule && hasTank && hasUnderground && hasWarning){ document.getElementById("endSlot3").style.display="block"; any=true; }
  document.getElementById("endingMsg").style.display=any?"none":"block";
}

function makeReport(type){
  let result=document.getElementById("result");
  if(clues.length<5){ result.innerHTML=`<h3>⚠ 调查失败</h3><p>证据不足。报告被退回。</p>`; return; }
  if(type==1){
    result.innerHTML=`
<h2>END 01：官方解释</h2>
<p>你提交了一份标准失踪报告：李清禾在勘察废弃水族馆时遭遇建筑坍塌。</p>
<p>警方接受了你的报告。案件归档。</p>
<p>三个月后，蓝湾论坛出现了一条帖子：</p>
<blockquote>"废弃水族馆又要重新开放了？"</blockquote>
<p style="color:#f0a030;">DSLOP项目重启的消息一闪而过。<br>没有人提到李清禾。<br>也没有人提到陈志远的警告。</p>
<p>调查结束。<br>但你偶尔会想起那封草稿箱邮件：</p>
<p style="color:#d94a4a;">"它一直在观察我们。"</p>`;
  }
  if(type==2){
    result.innerHTML=`
<h2>END 02：深海实验</h2>
<p>你的报告揭露了一个被掩盖的事实：</p>
<ul>
<li>蓝湾造船集团在水族馆地下建造了秘密实验区</li>
<li>9号展缸是该实验的核心——一个没有记录的活体样本</li>
<li>前馆长陈志远试图阻止，但被迫离职</li>
</ul>
<p>报告提交后，造船集团股价暴跌。DSLOP项目被叫停。</p>
<br>
<button onclick="sendSonarEmail();unlockSonar();renderMail();" style="font-size:16px;padding:14px 28px;">📧 接收新邮件</button>
<p style="color:#788;font-size:12px;margin-top:8px;">调查总部发来了新的消息...</p>`;
  }
  if(type==3){
    let hasRule=clues.includes("获得水族馆异常规则文件");
    let hasTank=clues.includes("9号展缸没有官方生物记录")||clues.includes("9号展缸并非水族馆登记生物");
    let hasUnderground=clues.includes("李清禾发现地下异常区域");
    let hasWarning=clues.some(c=>c.includes("陈志远")&&(c.includes("观察")||c.includes("警告")));
    if(hasRule && hasTank && hasUnderground && hasWarning){
      result.innerHTML=`
<h2>END TRUE：深渊回响</h2>
<p>你的最终报告不是一份结案文书——它是一份警告。</p>
<hr>
<p><b>2008年</b>——蓝湾海洋馆建成。没人知道B区地下有什么。</p>
<p><b>2010年</b>——DSLOP启动。他们知道地下有东西。</p>
<p><b>2011年</b>——B区扩建。天然空腔被发现。造船集团将其改造为展缸。<br>他们以为可以研究它。后来发现——它一直在研究他们。</p>
<p><b>2012年</b>——陈志远试图关闭水族馆。他失败了。但他留下了档案。<br>他在等一个后来者。</p>
<p><b>2025年</b>——DSLOP重启。李清禾被派去勘察。她没有回来。然后，你来了。</p>
<hr>
<p>你打开陈志远草稿箱里的最后一段文字：</p>
<blockquote>
"十三年前，我们以为我们发现了海洋里的生命。"<br>
"后来我们发现：<b>它一直在观察我们。</b>"
</blockquote>
<p>你关上电脑，望向窗外。</p>
<p style="color:#d94a4a;">蓝湾的海面平静如镜。<br>但你知道——那下面有东西正在回望。</p>
<h3>案件状态：真相确认。<br>但真相不是结束。</h3>
<br>
<button onclick="sendSonarEmail();unlockSonar();renderMail();" style="font-size:16px;padding:14px 28px;">📧 接收新邮件</button>
<p style="color:#788;font-size:12px;margin-top:8px;">调查总部发来了新的消息...</p>`;
    } else {
      result.innerHTML=`
<h2>END 03：残缺拼图</h2>
<p>你找到了许多碎片——规则、展缸、地下异常。</p>
<p>但缺少了最关键的一块：陈志远的故事。</p>
<p style="color:#d94a4a;">建议：深入调查陈志远的邮箱与档案。</p>`;
    }
  }
}
