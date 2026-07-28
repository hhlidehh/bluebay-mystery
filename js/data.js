// 当前证据
let clues=[];

// 时间线
let timeline=[];

// ==========================================
// 双账户邮箱系统
// ==========================================

let accounts={

  // ---- 主人公（调查员 林默）的邮箱 ----
  investigator:{
    name:"林默",
    mail:"linmo_nexus@probe.org",
    loggedIn:true,
    unread:2,
    mails:[
      {
        title:"📋 委托通知：蓝湾水族馆失踪案",
        from:"NEXUS调查总局 <dispatch@nexus.gov>",
        body:`
<h2>案件委托通知</h2>

<p>
调查员 <b>林默</b>，您好：
</p>

<p>
现正式委托您调查 <b>李清禾</b>（女，24岁）失踪一案。
</p>

<p>
<b>案件编号：</b>NX-2025-0713<br>
<b>失踪时间：</b>2025年7月13日<br>
<b>失踪地点：</b>蓝湾市废弃水族馆（蓝湾海洋馆）
</p>

<p>
我们对李清禾的网络账户进行了初步调查。她的个人邮箱为：
</p>

<blockquote style="background:#0a141c;padding:10px;border-left:3px solid #54dfff;">
📧 <b>qinghe_li@165.com</b>
</blockquote>

<p>
该邮箱目前处于<b>加密锁定</b>状态。我们未能获取访问权限。
</p>

<p>
技术部门分析发现，李清禾习惯使用<b>她最熟悉的事物组合作为密码</b>。
初步判断密码由<b>某个地点的英文名中的重要词汇 + 重要年份</b>构成。具体细节请查看下方"技术协助"邮件。
</p>

<p>
请您查看下方"技术协助"邮件，获取更多密码线索。
</p>

<hr>

<p style="color:#58dcff;">
⚠ 注意：收集到的所有证据请及时保存至案件档案。
</p>
`
      },
      {
        title:"🔑 技术协助：密码分析报告",
        from:"NEXUS技术部 <tech@nexus.gov>",
        body:`
<h2>密码分析报告</h2>

<p>
调查员林默，关于李清禾邮箱的密码，我们有以下发现：
</p>

<div class="clue">
<span class="tag">分析结果：</span>
李清禾在多个平台上使用的密码模式为：<b>一个对她有意义的地点的英文名的其中一个词 + 该地点的重要年份</b>
</div>

<p>
根据她的社交平台足迹，李清禾对<b>蓝湾水族馆</b>怀有特殊感情——她在个人博客中反复提及那里。
</p>

<p>
我们建议你在<b>NEXUS搜索</b>中查找该水族馆的官方网站：
</p>

<ul>
<li>找到水族馆的<b>官方英文名称</b>,提取<b>关键词</b></li>
<li>找到该馆的<b>成立/建馆年份</b></li>
<li>将二者组合尝试</li>
</ul>

<p>
<b>密码格式应为：</b>水族馆英文名中的关键词 + 建馆年份（四位数）
</p>

<p>
请在邮箱客户端中输入李清禾的邮箱地址和密码登录。
</p>

<button onclick="
  showingLogin=true;
  renderMail();
  document.getElementById('mail').scrollTop=0;
">
🔓 前往解锁受害者邮箱
</button>
`
      }
    ]
  },

  // ---- 受害者（李清禾）的邮箱 ----
  victim:{
    name:"李清禾",
    mail:"qinghe_li@165.com",
    loggedIn:false,
    password:"ray2008",
    unread:3,
    mails:[
      {
        title:"蓝湾海洋馆系统通知",
        from:"system@ray-bay-aquarium.com",
        body:`
<h2>访客须知</h2>

尊敬的李清禾：

<br><br>

感谢您参与：
<b>深海生命观察计划</b>

<br><br>

访问日期：2025年7月13日

<br><br>

访问区域：B区

<br><br>

请严格遵守以下规则：

<br><br>

① 不要回应玻璃另一侧的人。

<br><br>

② 如果工作人员告诉你水族馆不存在，请立即离开。

<br><br>

③ 不要观察9号展缸超过60秒。

<br><br>

④ 如果听见有人敲击玻璃，不要敲回去。

<br><br>

<button onclick="addClue('获得水族馆异常规则文件','7月13日 李清禾进入蓝湾水族馆')">
📌 保存证据
</button>
`
      },
      {
        title:"未知发件人：不要继续寻找",
        from:"unknown@unknown.com",
        body:`
<h2>未知邮件</h2>

你正在调查错误的事情。

<br><br>

她不是失踪。

<br><br>

她只是进入了水里。

<br><br>

你还记得吗?那年我们侥幸瞥见的,9号展缸。

<br><br>

<button onclick="addClue('未知者知道9号展缸存在','7月14日 收到匿名警告')">
📌 保存证据
</button>
`
      },
      {
        title:"草稿箱：如果我没有回来",
        from:"李清禾",
        body:`
<h2>未发送草稿</h2>

哥哥：

<br><br>

如果你看到这封邮件，说明我没有离开那里。

<br><br>

我调查发现：
<br>
蓝湾水族馆地下没有海。

<br><br>

但是地下传来了海浪声。

<br><br>

还有一点：
<br>
他们展示的"鱼"不是鱼。

<br><br>

<button onclick="addClue('李清禾发现地下异常区域','7月13日 最后调查记录')">
📌 保存证据
</button>
`
      }
    ]
  },

  // ---- 馆长（陈志远）的邮箱 ----
  director:{
    name:"陈志远",
    mail:"zhiyuan_chen@ray-bay-aquarium.com",
    loggedIn:false,
    password:"ADM1965",
    unread:6,
    mails:[
      {
        title:"📩 邀请：重返深海生命观察计划",
        from:"蓝湾海洋研究中心 <contact@bay-marine-research.org>",
        body:`
<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;">
<p style="color:#788;font-size:12px;margin:0;">发件人：蓝湾海洋研究中心 &lt;contact@bay-marine-research.org&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2025年5月20日 09:00</p>
<p style="color:#788;font-size:12px;margin:0;">主题：重返深海生命观察计划（DSLOP）</p>
</div>

<p>陈志远先生：</p>

<p>十三年了。我们决定<b>重启深海生命观察计划（DSLOP）</b>。</p>

<p>蓝湾海洋馆旧址的B区设施仍然完好。造船集团已经完成了设备更新。我们计划在<b>2025年7月</b>重新启动观测。</p>

<p>我们需要您回来。</p>

<p>
作为当年唯一了解B区全部情况的人，您的经验对本次资料复核工作至关重要。
</p>

<p>
本次DSLOP项目复核工作由以下协作方共同参与：
</p>

<ul>
<li>现场调查与资料整理组（负责人：李清禾）</li>
<li>蓝湾造船集团深海工程部</li>
<li>蓝湾海洋研究中心观测团队</li>
</ul>

<p style="color:#f0a030;">请您在2025年6月15日前回复。重启会议定于6月20日。</p>

<p style="color:#788;font-size:12px;">—— 蓝湾海洋研究中心</p>

<hr style="border-color:#1d3a48;">

<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;background:#0f1418;">
<p style="color:#788;font-size:12px;margin:0;">发件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：蓝湾海洋研究中心 &lt;contact@bay-marine-research.org&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2025年5月20日 23:45</p>
<p style="color:#788;font-size:12px;margin:0;">主题：Re：重返深海生命观察计划</p>
</div>

<p>我会来。</p>

<p>但我有一个条件：<b>任何进入B区的人必须先阅读我留下的档案。</b></p>

<p style="color:#d94a4a;">十三年前我关闭它的原因，至今没有改变。</p>

<p style="color:#788;font-size:12px;">—— 陈志远</p>

<button onclick="addClue('陈志远应DSLOP重启邀请重返计划 并警告B区危险','2025年5月 DSLOP计划重启 陈志远受邀返回')">
📌 保存证据
</button>
`
      },
      {
        title:"📩 关于B区扩建项目最终确认",
        from:"蓝湾造船集团项目部 <project@bay-shipyard.com>",
        body:`
<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;">
<p style="color:#788;font-size:12px;margin:0;">发件人：蓝湾造船集团项目部 &lt;project@bay-shipyard.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2011年3月21日 14:30</p>
<p style="color:#788;font-size:12px;margin:0;">主题：关于B区扩建项目最终确认</p>
</div>

<p>陈馆长：</p>

<p>B区地下扩建工程已经完成。按照合作协议，地下区域将不再属于水族馆公开运营范围。</p>

<p>关于新增设施：</p>
<ul>
<li>不列入游客地图</li>
<li>不记录于公开档案</li>
<li>非相关工作人员禁止进入核心区域</li>
</ul>

<p>请您确认。</p>
<p style="color:#788;font-size:12px;">—— 蓝湾造船集团项目部</p>

<hr style="border-color:#1d3a48;">

<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;background:#0f1418;">
<p style="color:#788;font-size:12px;margin:0;">发件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：蓝湾造船集团项目部 &lt;project@bay-shipyard.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2011年3月21日 16:12</p>
<p style="color:#788;font-size:12px;margin:0;">主题：Re：关于B区扩建项目最终确认</p>
</div>

<p><b>我不同意。</b></p>
<p>水族馆不是实验基地。</p>
<p>如果你们继续使用9号区域，我会向董事会报告。</p>
<p style="color:#788;font-size:12px;">—— 陈志远</p>

<blockquote style="color:#5a7a88;font-size:13px;border-left:2px solid #1d3a48;padding-left:10px;">
&gt; 陈馆长：<br>
&gt; B区地下扩建工程已经完成...
</blockquote>

<button onclick="addClue('蓝湾造船集团参与水族馆地下建设并试图控制B区','2011年3月 造船集团要求控制B区')">
📌 保存证据
</button>
`
      },
      {
        title:"📩 9号展缸维护报告（最高权限）",
        from:"B区研究部 <b-dept@ray-bay-aquarium.com>",
        body:`
<h2>9号展缸维护报告（最高权限）</h2>

<p>馆长：</p>

<p>关于TANK-09维护情况：</p>
<p>1. 展缸结构正常。</p>
<p>2. 水循环系统正常。</p>
<p>3. <b>生物编号问题仍无法解决。</b></p>

<p style="color:#788;font-size:12px;">—— B区研究部</p>

<hr style="border-color:#1d3a48;">

<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;background:#0f1418;">
<p style="color:#788;font-size:12px;margin:0;">发件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：B区研究部 &lt;b-dept@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2011年8月4日 10:02</p>
<p style="color:#788;font-size:12px;margin:0;">主题：Re：9号展缸维护报告</p>
</div>

<p>为什么系统里没有它的编号？</p>
<p style="color:#788;font-size:12px;">—— 陈志远</p>

<hr style="border-color:#1d3a48;">

<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;">
<p style="color:#788;font-size:12px;margin:0;">发件人：B区研究部 &lt;b-dept@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2011年8月4日 11:30</p>
<p style="color:#788;font-size:12px;margin:0;">主题：Re：Re：9号展缸维护报告</p>
</div>

<p>因为它不是我们登记的生物。</p>
<p style="color:#788;font-size:12px;">—— B区研究部</p>

<hr style="border-color:#1d3a48;">

<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;background:#0f1418;">
<p style="color:#788;font-size:12px;margin:0;">发件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：B区研究部 &lt;b-dept@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2011年8月4日 11:35</p>
<p style="color:#788;font-size:12px;margin:0;">主题：Re：Re：Re：9号展缸维护报告</p>
</div>

<p style="color:#d94a4a;">那它是什么？</p>
<p style="color:#788;font-size:12px;">—— 陈志远</p>

<hr style="border-color:#1d3a48;">

<div style="border:1px solid #1d3a48;padding:12px;margin:8px 0;border-radius:4px;">
<p style="color:#788;font-size:12px;margin:0;">发件人：B区研究部 &lt;b-dept@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">收件人：陈志远 &lt;zhiyuan_chen@ray-bay-aquarium.com&gt;</p>
<p style="color:#788;font-size:12px;margin:0;">时间：2011年8月4日 14:00</p>
<p style="color:#788;font-size:12px;margin:0;">主题：Re：Re：Re：Re：9号展缸维护报告</p>
</div>

<p><b>建议不要继续询问。</b></p>
<p style="color:#788;font-size:12px;">—— B区研究部</p>

<button onclick="addClue('9号展缸并非水族馆登记生物','B区研究部承认9号展缸中不是馆内生物')">
📌 保存证据
</button>
`
      },
      {
        title:"📩 闭馆申请",
        from:"陈志远 <zhiyuan_chen@ray-bay-aquarium.com>",
        body:`
<h2>闭馆申请</h2>

<p>蓝湾水族馆申请停止运营。</p>

<p>原因：设备维护成本过高。</p>

<hr>

<p style="color:#f0a030;">附件：真正原因.txt</p>

<blockquote style="border-left:3px solid #d94a4a;padding-left:10px;">
<p>2012年6月15日之后，</p>
<p>请不要打开地下区域。</p>
<p>不要相信任何关于"继续研究"的承诺。</p>
<p>那东西不是展品。</p>
<p><b>它只是被困在那里。</b></p>
</blockquote>

<button onclick="addClue('陈志远申请闭馆并警告地下区域危险','2012年6月 陈志远试图关闭水族馆')">
📌 保存证据
</button>
`
      },
      {
        title:"📩 给周建国最后一次警告",
        from:"陈志远 <zhiyuan_chen@ray-bay-aquarium.com>",
        body:`

<p>我不知道你们到底在研究什么。</p>

<p>但是我知道一件事。</p>

<p><b>9号展缸里的东西已经开始回应声音。</b></p>

<p>昨晚监控记录：</p>

<blockquote style="border-left:3px solid #d94a4a;padding-left:10px;">
它模仿了工作人员的声音。
</blockquote>

<p>停止实验。</p>

<p>这是最后通知。</p>

<button onclick="addClue('9号展缸具有未知响应能力并能模仿人类声音','陈志远警告9号展缸出现模仿声音行为')">
📌 保存证据
</button>
`
      },
      {
        title:"草稿箱：如果有人找到这里",
        from:"陈志远（未发送）",
        body:`
<h2>草稿箱：如果有人找到这里</h2>

<p>我不知道这封邮件是否会有人看到。</p>

<p>请不要相信"深海生命计划"。</p>

<p>那不是研究。</p>

<p>那是一次错误。</p>

<p>十三年前，我们以为我们发现了海洋里的生命。</p>

<p>后来我们发现：</p>

<p style="color:#d94a4a;"><b>它一直在观察我们。</b></p>

<button onclick="addClue('水族馆异常事件早于李清禾调查 陈志远暗示存在物具有观察能力','陈志远留下的最终警告')">
📌 保存证据
</button>
`
      }
    ]
  }
};

let currentAccount = "investigator";
let loggedInAccounts = ["investigator"];
let showingLogin = false;

function updateUnreadDot(){
  let dot=document.getElementById("unreadDot"); if(!dot) return;
  let hasUnread=loggedInAccounts.some(k=>{
    let a=accounts[k];
    let total=a.mails.length;
    let read=a._read?a._read.size:0;
    return total>read;
  });
  dot.style.display=hasUnread?"block":"none";
}

// 渲染邮箱界面
function renderMail(){
  // 侧边栏
  let sb=document.getElementById("mailSidebar");
  sb.innerHTML=`<div class="sidebarTitle">📧 邮箱账户</div>`;
  loggedInAccounts.forEach(k=>{
    let a=accounts[k];
    let cls="sidebarAcct";
    if(k===currentAccount && !showingLogin) cls+=" active";
    sb.innerHTML+=`<div class="${cls}" onclick="switchToAccount('${k}')">
      <div class="name">${a.name}</div>
      <div class="mail">${a.mail}</div>
    </div>`;
  });
  sb.innerHTML+=`<div class="sidebarAdd" onclick="showLoginForm()">＋ 添加账户</div>`;

  // 标题
  let title=showingLogin?"🔑 登录邮箱":"📧 "+(accounts[currentAccount]||{}).name+" 邮箱";
  document.getElementById("mailTitle").innerHTML=title;

  // 主内容区
  let main=document.getElementById("mailMain");
  if(showingLogin){
    main.innerHTML=`
      <div class="loginForm passBox">
        <h4 style="margin:0 0 8px 0;color:#54dfff;">登录邮箱账户</h4>
        <p>请输入邮箱地址：</p>
        <input id="loginEmail" type="text" placeholder="example@mail.com" style="width:100%;margin-bottom:8px;" onkeydown="if(event.key==='Enter')document.getElementById('loginPass').focus()">
        <p>请输入密码：</p>
        <input id="loginPass" type="password" placeholder="请输入密码..." style="width:100%;" onkeydown="if(event.key==='Enter')doMailLogin()">
        <br><br>
        <button onclick="doMailLogin()">🔓 登录</button>
        <div class="hint" id="loginMsg"></div>
      </div>`;
    return;
  }

  // 收件箱
  let box=accounts[currentAccount];
  if(!box._read) box._read=new Set();
  main.innerHTML=`<h3>📥 收件箱（${box.mails.length - box._read.size} 未读）</h3>`;
  box.mails.forEach((m,i)=>{
    let unread=!box._read.has(i);
    main.innerHTML+=`
      <div class="email" onclick="openMail(${i})">
        ${unread?'<span class="mailDot"></span>':''}
        <b>${m.title}</b>
        <div class="emailFrom">发件人：${m.from}</div>
      </div>`;
  });
  // 邮件内容区
  main.innerHTML+=`<div id="mailContent"></div>`;
  updateUnreadDot();
}

function showLoginForm(){
  showingLogin=true;
  renderMail();
}

function switchToAccount(k){
  showingLogin=false;
  currentAccount=k;
  renderMail();
}

function doMailLogin(){
  let email=document.getElementById("loginEmail").value.trim();
  let pass=document.getElementById("loginPass").value;
  let msg=document.getElementById("loginMsg");
  if(!email||!pass){ if(msg)msg.innerHTML="❌ 请输入邮箱地址和密码。"; return; }

  for(let k in accounts){
    if(accounts[k].mail===email && accounts[k].password===pass){
      if(!loggedInAccounts.includes(k)) loggedInAccounts.push(k);
      accounts[k].loggedIn=true;
      if(k==="victim") addClue("成功破解并登录李清禾邮箱","调查员获得受害者邮箱访问权限");
      currentAccount=k;
      showingLogin=false;
      saveGame();
      if(msg) msg.innerHTML="✅ 登录成功！";
      setTimeout(()=>renderMail(),400);
      return;
    }
  }
  if(msg) msg.innerHTML="❌ 邮箱地址或密码错误。";
}

// 打开邮件
function openMail(i){
  let box=accounts[currentAccount];
  if(!box._read) box._read=new Set();
  box._read.add(i);
  document.getElementById("mailContent").innerHTML=box.mails[i].body;
  hideSavedButtons();
}

// ==========================================
// 水族馆失踪案 网站数据库
// ==========================================

let websites={

  "蓝湾水族馆":{
    url:"https://www.ray-bay-aquarium.com",
    title:"蓝湾海洋馆官方网站",
    keywords:["蓝湾水族馆","蓝湾海洋馆","Ray Bay Aquarium","ray","鳐鱼"],
    content:`
<h2>🐠蓝湾海洋馆</h2>
<h3>Ray Bay Aquarium</h3>

<p style="color:#36bddd;font-size:15px;">—— 蓝湾市深海生物展览馆 ——</p>

<p><b>🏗 建馆时间：</b>2008年3月</p>

<p><b>运营状态：</b>2012年因经营问题关闭</p>

<p><b>当前状态：</b>建筑已废弃，不对外开放</p>

<hr>

<h3>场馆信息</h3>
<p>蓝湾海洋馆曾拥有蓝湾市最大的深海生物展区，包含8个公开展缸。</p>
<p>据前员工回忆，海洋馆地下还有装修中的区域,但<b>最后未对公众开放</b>。</p>
<p>镇馆之宝为一条罕见的<b style="font-size:30px">巨型鳐鱼</b>，海洋馆的英文名即来源于此。</p>

<hr>

<h3>访客须知（旧版存档）</h3>
<p style="color:#788;font-size:13px;">该内容来自 2012 年网站存档</p>

<ul>
<li>请勿在闭馆后逗留</li>
<li>B区仅限工作人员进入</li>
<li>如发现异常，请拨打内部电话 #0421</li>
<li>展缸玻璃均为特制，请勿敲击</li>
</ul>

<hr>

<p style="font-size:12px;color:#4a6a78;">
© 2008-2012 Ray Bay Aquarium 蓝湾海洋馆 | 
<span style="cursor:pointer;text-decoration:underline;color:#5a8a9a;" onclick="navigatePage('9号展缸登录','hidden')">
旧版内部档案入口
</span>
</p>

<button onclick="addClue('官方记录显示水族馆2012年关闭','2012年 蓝湾水族馆停止运营')">
📌 保存网页证据
</button>
`
  },

  "鳐鱼百科":{
    url:"https://encyclopedia.ray-bay-aquarium.com/stingray",
    title:"鳐鱼百科",
    keywords:["鳐鱼","ray","Ray","蓝湾水族馆","蓝湾海洋馆"],
    content:`
<h2>📘 鳐鱼百科</h2>

<p><b>中文名：</b>鳐鱼</p>
<p><b>英文名：</b><b>ray</b></p>

<p>鳐鱼是一种扁平的海洋生物，常见于沙地底部。它们的身体呈菱形，尾部细长，有的种类尾上有毒刺。</p>

<p>蓝湾水族馆曾以一条罕见的巨型鳐鱼为镇馆之宝，馆名“Ray Bay Aquarium”即取自此物。</p>

<p>习性：鳐鱼喜欢在浅海或珊瑚礁附近活动，白天藏身沙底，夜间浮出寻找食物。</p>

<button onclick="addClue('鳐鱼是蓝湾水族馆的镇馆之宝 英文名为 ray','鳐鱼百科 提供水族馆密码线索')">
📌 保存网页证据
</button>
`
  },

  "李清禾":{
    url:"https://search.nexus.gov/q=李清禾",
    title:"关于李清禾的信息",
    content:`
<h2>搜索结果：李清禾</h2>

<p>🔍 找到 3 条相关记录：</p>

<div class="card" style="cursor:default;">
<b>📰 新闻</b><br>
"蓝湾市年轻调查员失踪"——蓝湾日报 2025-07-15
</div>

<div class="card" style="cursor:default;">
<b>📍 失踪地点</b><br>
废弃蓝湾水族馆（蓝湾海洋馆旧址）
</div>

<div class="card" style="cursor:default;">
<b>🕐 最后出现时间</b><br>
2025年7月13日 14:30
</div>

<br>

<button onclick="addClue('李清禾最后进入废弃水族馆','2025年7月13日 李清禾失踪')">
📌 保存网页证据
</button>
`
  },

  "蓝湾造船":{
    url:"https://www.bay-shipyard.com",
    title:"蓝湾造船集团官网",
    content:`
<h2>🚢 蓝湾造船集团</h2>

<p><b>公司介绍：</b></p>
<p>蓝湾市最大海洋工业企业，成立于1995年。</p>

<br>

<p><b>主要项目：</b></p>
<ul>
<li>深海工程开发</li>
<li>海洋科研平台建设</li>
</ul>

<br>

<p><b>合作机构：</b></p>
<p>蓝湾海洋研究中心</p>

<br>

<p style="font-size:13px;color:#788;">注：该公司于2012年后退出了蓝湾海洋馆的合作项目。</p>

<br>

<button onclick="addClue('造船集团参与深海研究项目','2020年 深海工程启动')">
📌 保存网页证据
</button>
`
  },

  "蓝湾论坛":{
    url:"https://bbs.bay-city.com/abandoned",
    title:"蓝湾居民论坛",
    content:`
<h2>💬 帖子：废弃水族馆晚上有人吗？</h2>

<p>发布者：<b>海边老人</b> | 时间：2025-06-20</p>

<hr>

<div class="card" style="cursor:default;">
<p>"那里2012年就关闭了，大门锁着。"</p>
</div>

<div class="card" style="cursor:default;">
<p>"可是每个月15号晚上，里面都会亮灯。"</p>
<p style="color:#788;">——海边老人，2025-06-21</p>
</div>

<div class="card" style="cursor:default;">
<p>"我也见过！大概晚上11点，灯光一闪一闪的，不像正常照明。"</p>
<p style="color:#788;">——匿名用户，2025-06-22</p>
</div>

<br>

<button onclick="addClue('废弃水族馆关闭后仍然出现灯光','2012年后 水族馆异常现象')">
📌 保存网页证据
</button>
`
  },

  "陈志远":{
    url:"https://encyclopedia.nexus.gov/陈志远",
    title:"陈志远 — 人物百科",
    content:`
<h2>📖 陈志远</h2>

<p style="color:#788;">蓝湾海洋馆前馆长 | 海洋生物学家</p>

<hr>

<p><b>出生：</b>1965年 | <b>籍贯：</b>蓝湾市</p>

<p><b>学历：</b>蓝湾海洋大学 海洋生物学博士</p>

<p><b>履历：</b></p>
<ul>
<li>1998-2008：蓝湾海洋研究中心 高级研究员</li>
<li>2008-2012：<b>蓝湾海洋馆（Ray Bay Aquarium）</b> 馆长</li>
</ul>

<p><b>主要成就：</b></p>
<p>主持蓝湾海洋馆的建馆工作，引进多条珍稀海洋生物。曾与<b>蓝湾造船集团</b>合作开展深海生物研究项目。</p>

<hr>

<p style="color:#788;">联系方式（资料存档）：</p>
<blockquote style="background:#0a141c;padding:10px;border-left:3px solid #54dfff;">
📧 <b>zhiyuan_chen@ray-bay-aquarium.com</b>
</blockquote>

<p style="color:#788;font-size:12px;">该邮箱为海洋馆内部工作邮箱，2012年后停用。</p>

<button onclick="addClue('获得馆长陈志远的邮箱地址','陈志远曾任蓝湾海洋馆馆长')">
📌 保存证据
</button>
`
  },

  "蓝湾新闻网":{
    url:"https://news.bay-city.com/2012/aquarium-closure",
    title:"蓝湾新闻网 — 2012年水族馆关闭报道",
    content:`
<h2>📰 蓝湾新闻网</h2>
<p style="color:#788;">2012年6月16日 | 记者：许文</p>

<hr>

<h3>蓝湾海洋馆正式关闭 经营十三年后落幕</h3>

<p>昨日，蓝湾海洋馆（Ray Bay Aquarium）正式向市政府提交了停止运营申请。这座成立于2008年的海洋生物展览馆将在本月内关闭所有设施。</p>

<p>馆长陈志远在记者会上表示："这是一个艰难的决定。设备维护成本超出了我们的承受范围。"</p>

<p>然而，有前员工匿名向本报透露，关闭的真正原因并非经营问题。</p>

<blockquote style="border-left:3px solid #f0a030;padding-left:10px;">
"B区早在去年就停止了对普通员工的开放。有同事说听到了奇怪的声音。"
<br>
"陈馆长和造船集团的人吵过好几次。"
<br>
"后来就没人敢去B区了。"
</blockquote>

<p>蓝湾造船集团对此拒绝评论。</p>

<p>蓝湾海洋馆的关闭标志着蓝湾市失去了唯一的深海生物展览设施。市政府表示将"评估该建筑的后续用途"。</p>

<p style="color:#788;font-size:12px;">（本文于2012年6月16日刊登。该建筑至今未重新开放。）</p>

<button onclick="addClue('2012年新闻报道暗示水族馆关闭另有隐情','2012年6月 蓝湾新闻网报道闭馆内幕')">
📌 保存证据
</button>
`
  },

  "深海生命计划":{
    url:"https://research.bay-marine.org/dslop/public",
    title:"深海生命计划（DSLOP）— 公开档案",
    content:`
<h2>🔍 深海生命计划 相关记录</h2>
<p style="color:#f0a030;">⚠ 项目状态：2025年5月重启</p>
<p style="color:#788;">找到 3 份相关档案：</p>

<div class="card" onclick="navigatePage('DSLOP项目报告','web')" style="cursor:pointer;">
<b>📄 《蓝湾海洋馆DSLOP项目报告》</b><br>
<span style="color:#5a8a9a;font-size:13px;">蓝湾海洋馆 | 存档：2010年 | 更新：2025年</span>
</div>

<div class="card" onclick="navigatePage('DSLOP合作名单','web')" style="cursor:pointer;">
<b>📋 《蓝湾市海洋研究合作名单》</b><br>
<span style="color:#5a8a9a;font-size:13px;">蓝湾海洋研究中心 | 2010年存档</span>
</div>

<div class="card" onclick="navigatePage('DSLOP公开说明','web')" style="cursor:pointer;">
<b>📘 《DSLOP项目公开说明》</b><br>
<span style="color:#5a8a9a;font-size:13px;">蓝湾海洋研究中心 | 2025年5月</span>
</div>
`
  },

  "DSLOP项目报告":{
    url:"https://research.bay-marine.org/dslop/report-2010",
    title:"蓝湾海洋馆2010年度项目报告",
    content:`
<h2>📄 蓝湾海洋馆2010年度项目报告</h2>
<p style="color:#788;">内部文件 | 2010年12月</p>

<hr>

<h3>原项目（2010年）</h3>
<p>2010年6月，本馆正式加入<b>深海生命观察计划（DSLOP）</b>。项目选址：<b>蓝湾海洋馆B区</b>。周期：2010年—2015年（计划）。</p>
<ul>
<li>深海生物活动监测</li>
<li>异常声波信号记录</li>
<li>水下摄像数据分析</li>
</ul>
<p>2011年B区扩建后，观测范围扩展至地下层新增区域。</p>
<p style="color:#d94a4a;">2012年：项目随水族馆关闭而暂停。</p>

<h3 style="color:#f0a030;">2025年重启</h3>
<p>2025年5月，蓝湾海洋研究中心宣布重启DSLOP项目。观测站点仍设在原蓝湾海洋馆B区旧址。</p>
<p>前馆长<b>陈志远</b>被邀请作为顾问重返项目。</p>

<button onclick="addClue('DSLOP项目2010年启动 2012年暂停 2025年重启 陈志远与李清禾受邀','2025年 DSLOP重启 陈志远被邀请返回')">
📌 保存证据
</button>
`
  },

  "DSLOP合作名单":{
    url:"https://research.bay-marine.org/dslop/partners",
    title:"蓝湾市海洋研究合作名单",
    content:`
<h2>📋 蓝湾市海洋研究合作名单</h2>
<p style="color:#788;">蓝湾海洋研究中心存档 | 2010年</p>

<hr>

<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0f1a22;">
<th style="padding:8px;border:1px solid #1d3a48;">机构名称</th>
<th style="padding:8px;border:1px solid #1d3a48;">角色</th>
</tr>
<tr><td style="padding:8px;border:1px solid #1d3a48;">蓝湾海洋研究中心</td><td style="padding:8px;border:1px solid #1d3a48;">项目牵头</td></tr>
<tr><td style="padding:8px;border:1px solid #1d3a48;">蓝湾海洋馆</td><td style="padding:8px;border:1px solid #1d3a48;">观测站点</td></tr>
<tr><td style="padding:8px;border:1px solid #1d3a48;">蓝湾造船集团</td><td style="padding:8px;border:1px solid #1d3a48;">深海工程</td></tr>
<tr><td style="padding:8px;border:1px solid #1d3a48;">蓝湾市海洋大学</td><td style="padding:8px;border:1px solid #1d3a48;">学术合作</td></tr>
<tr><td style="padding:8px;border:1px solid #1d3a48;">蓝湾市政府</td><td style="padding:8px;border:1px solid #1d3a48;">资金支持</td></tr>
</table>

<p style="color:#788;font-size:12px;">注：2012年蓝湾海洋馆退出。2025年DSLOP重启后重新加入。</p>

<button onclick="addClue('DSLOP项目涉及政府、企业、学术多方合作','2010年 蓝湾市多机构参与深海研究')">
📌 保存证据
</button>
`
  },

  "DSLOP公开说明":{
    url:"https://research.bay-marine.org/dslop/about",
    title:"DSLOP项目公开说明",
    content:`
<h2>📘 深海生命观察计划（DSLOP）</h2>
<p style="color:#788;">公开说明文件 | 2010年6月</p>

<hr>

<p><b>项目全称：</b>Deep Sea Life Observation Program</p>
<p><b>简称：</b>DSLOP</p>
<p><b>启动时间：</b>2010年</p>
<p><b>牵头单位：</b>蓝湾海洋研究中心</p>

<h3>项目目标</h3>
<p>在蓝湾近海深海区域建立长期生物观测网络，监测未知海洋生物的<b>活动模式、声波信号及行为特征</b>。</p>

<p style="color:#f0a030;">项目公开说明中提到：</p>
<blockquote style="border-left:3px solid #f0a030;padding-left:10px;">
"本项目将采用最新深海摄像与声呐技术，<br>
对<b>自然形成的深海空腔</b>进行长期监控。<br>
观测目标包括该区域特有的<b>大型未知海洋生物</b>。"
</blockquote>

<p style="color:#f0a030;font-size:12px;">注：2012年暂停。2025年5月宣布重启。</p>

<button onclick="addClue('DSLOP项目公开宣称研究天然深海空腔中的未知生物','2010年 DSLOP项目正式启动')">
📌 保存证据
</button>
`
  }
};

// ---- 浏览器导航核心 ----

function browserGo(){
  let input=document.getElementById("addrInput").value.trim();
  if(!input) return;

  // 检查是否是隐藏页面
  for(let k in hiddenPages){
    if(input===k || hiddenPages[k].url===input){
      navigatePage(k,"hidden");
      return;
    }
  }

  // 检查是否是已知网站
  for(let k in websites){
    if(input===k || websites[k].url===input){
      navigatePage(k,"web");
      return;
    }
  }

  // 否则作为搜索关键词
  showSearchResults(input);
}

function showSearchResults(key){
  let body=document.getElementById("browserBody");
  let found=false;
  let normalizedKey = key.toLowerCase();

  let html=`<h3>🔍 NEXUS 搜索：<span style="color:#36bddd;">${key}</span></h3>`;
  for(let name in websites){
    let site = websites[name];
    let normalizedName = name.toLowerCase();
    let keywordMatch = site.keywords && site.keywords.some(w=>{
      let normalizedW = w.toLowerCase();
      return normalizedW.includes(normalizedKey) || normalizedKey.includes(normalizedW);
    });
    if(normalizedName.includes(normalizedKey) || normalizedKey.includes(normalizedName) || keywordMatch){
      found=true;
      html+=`
        <div class="card" onclick="navigatePage('${name}','web')">
          <b>${site.title}</b><br>
          <span style="color:#5a8a9a;font-size:13px;">${site.url}</span>
        </div>`;
    }
  }
  if(!found){
    html+=`<p style="color:#788;padding:20px;">没有找到与"${key}"相关的网页。<br><br>尝试搜索：<b>蓝湾水族馆</b>、<b>李清禾</b>、<b>蓝湾造船</b>、<b>蓝湾论坛</b></p>`;
  }

  body.innerHTML=html;
  pushHistory({type:"search",key:key});
  updateNavUI("search",key);
}

function navigatePage(id,source){
  // 已解锁的登录页自动跳过
  if(id==="9号展缸登录" && archiveUnlocked){ navigatePage("内部档案门户","hidden"); return; }
  if(id==="分区详情登录" && zonesUnlocked){ navigatePage("分区详情","hidden"); return; }
  if(id==="未开放档案登录" && restrictedUnlocked){ navigatePage("未开放档案","hidden"); return; }

  let body=document.getElementById("browserBody");
  let page;
  let url;
  if(source==="hidden"){
    page=hiddenPages[id];
    url=page.url;
    body.innerHTML=page.content;
    hideSavedButtons();
  } else {
    page=websites[id];
    url=page.url;
    body.innerHTML=page.content;
    hideSavedButtons();
  }

  pushHistory({type:"page",id:id,source:source,url:url});
  updateNavUI("page",id,url);
}

function browserBack(){
  if(browserPos<=0) return;
  browserPos--;
  restoreHistory(browserHistory[browserPos]);
}

function browserForward(){
  if(browserPos>=browserHistory.length-1) return;
  browserPos++;
  restoreHistory(browserHistory[browserPos+1]);
}

function browserRefresh(){
  if(browserPos>=0){
    let h=browserHistory[browserPos];
    restoreHistory(h);
  }
}

function pushHistory(state){
  // 清除当前位置之后的历史
  browserHistory=browserHistory.slice(0,browserPos+1);
  browserHistory.push(state);
  browserPos=browserHistory.length-1;
}

function restoreHistory(state){
  if(state.type==="search"){
    showSearchResults(state.key);
    // 修正：不重复push
    browserPos=browserHistory.indexOf(state);
  } else {
    // 直接渲染
    let body=document.getElementById("browserBody");
    let page=state.source==="hidden"?hiddenPages[state.id]:websites[state.id];
    body.innerHTML=page.content;
    updateNavUI("page",state.id,state.url);
    browserPos=browserHistory.indexOf(state);
  }
}

function updateNavUI(mode,val,url){
  let addr=document.getElementById("addrInput");
  let icon=document.getElementById("addrIcon");
  let btnBack=document.getElementById("btnBack");
  let btnFwd=document.getElementById("btnFwd");

  if(mode==="search"){
    let searchValue = String(val || "").trim();
    addr.value = searchValue ? searchValue : "";
    icon.innerHTML="🔍";
  } else {
    addr.value=url||val;
    icon.innerHTML="🔗";
  }

  btnBack.disabled=browserPos<=0;
  btnFwd.disabled=browserPos>=browserHistory.length-1;
}
