// ==========================================
// ==========================================
// 浏览器导航系统
// ==========================================

let browserHistory=[];
let browserPos=-1;

// 密码记忆：输入正确一次后不再重复要求
let archiveUnlocked=false;
let zonesUnlocked=false;
let restrictedUnlocked=false;

// 隐藏网页（只能通过页面内链接访问）
let hiddenPages={
  "9号展缸登录":{
    url:"internal://ray-bay-aquarium/admin/login",
    title:"🔒 内部系统 — 身份验证",
    content:`
<h2>🔒 旧版内部档案系统</h2>

<div class="passBox">
<h4 style="margin:0 0 8px 0;color:#f0a030;">⚠ 仅限授权人员访问</h4>
<p>请输入内部访问码以继续：</p>
<input id="archivePass" type="password" placeholder="请输入访问码..." onkeydown="if(event.key==='Enter')loginArchive()">
<button onclick="loginArchive()">验证访问</button>
<div class="hint" id="archiveMsg"></div>
<p style="color:#3a4a52;font-size:11px;margin-top:4px;">系统记录：初始访问码沿用馆内公开联络方式。</p>
</div>
`
  },

  "内部档案门户":{
    url:"internal://ray-bay-aquarium/admin/portal",
    title:"📂 内部档案系统 v2.1",
    content:`
<h2>📂 Ray Bay Aquarium 内部档案系统</h2>
<p style="color:#788;">最后登录：2012年6月15日 ｜ 登录用户：admin</p>

<hr>

<div class="card" onclick="navigatePage('人员名单','hidden')" style="cursor:pointer;">
<b>📋 工作人员名单</b><br>
<span style="color:#5a8a9a;font-size:13px;">在职人员及部门分配（2012年存档）</span>
</div>

<div class="card" onclick="navigatePage('分区详情登录','hidden')" style="cursor:pointer;">
<b>🔒 各分区详细情况</b><br>
<span style="color:#f0a030;font-size:13px;">⚠ 需要分区管理密码</span>
</div>

<div class="card" onclick="navigatePage('未开放档案登录','hidden')" style="cursor:pointer;">
<b>🔒 未开放区域档案</b><br>
<span style="color:#f0a030;font-size:13px;">⚠ 需要独立档案密码 ｜ 交互式检索系统</span>
</div>

<hr>

<button onclick="addClue('进入水族馆内部档案系统','获得内部系统访问权限')">
📌 保存证据
</button>
`
  },

  "人员名单":{
    url:"internal://ray-bay-aquarium/admin/staff",
    title:"📋 工作人员名单",
    content:`
<h2>📋 Ray Bay Aquarium 工作人员名单</h2>
<p style="color:#788;">存档日期：2012年5月</p>

<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#0f1a22;">
<th style="padding:8px;border:1px solid #1d3a48;text-align:left;">姓名</th>
<th style="padding:8px;border:1px solid #1d3a48;text-align:left;">部门</th>
<th style="padding:8px;border:1px solid #1d3a48;text-align:left;">编号</th>
<th style="padding:8px;border:1px solid #1d3a48;text-align:left;">备注</th>
</tr>
<tr>
<td style="padding:8px;border:1px solid #1d3a48;">陈志远</td>
<td style="padding:8px;border:1px solid #1d3a48;">馆长办公室</td>
<td style="padding:8px;border:1px solid #1d3a48;">ADM-001</td>
<td style="padding:8px;border:1px solid #1d3a48;color:#788;">—</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #1d3a48;">王海生</td>
<td style="padding:8px;border:1px solid #1d3a48;">B区管理部</td>
<td style="padding:8px;border:1px solid #1d3a48;">BZ-2008</td>
<td style="padding:8px;border:1px solid #1d3a48;">B区扩建负责人</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #1d3a48;">赵明</td>
<td style="padding:8px;border:1px solid #1d3a48;">A区展示部</td>
<td style="padding:8px;border:1px solid #1d3a48;">AZ-2009</td>
<td style="padding:8px;border:1px solid #1d3a48;color:#788;">—</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #1d3a48;">刘小雨</td>
<td style="padding:8px;border:1px solid #1d3a48;">C区维护部</td>
<td style="padding:8px;border:1px solid #1d3a48;">CZ-2010</td>
<td style="padding:8px;border:1px solid #1d3a48;color:#788;">—</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #1d3a48;">周建国</td>
<td style="padding:8px;border:1px solid #1d3a48;">B区研究部</td>
<td style="padding:8px;border:1px solid #1d3a48;">BZ-2011</td>
<td style="padding:8px;border:1px solid #1d3a48;">内部档案管理员</td>
</tr>
</table>



<button onclick="addClue('获得水族馆工作人员名单','2012年 馆内人事档案')">
📌 保存证据
</button>
`
  },

  "分区详情登录":{
    url:"internal://ray-bay-aquarium/admin/zones-login",
    title:"🔒 分区详情 — 密码验证",
    content:`
<h2>🔒 各分区详细档案</h2>

<div class="passBox">
<h4 style="margin:0 0 8px 0;color:#f0a030;">⚠ 需要分区管理密码</h4>
<p>请输入分区管理密码：</p>
<input id="zonePass" type="password" placeholder="请输入密码..." onkeydown="if(event.key==='Enter')loginZones()">
<button onclick="loginZones()">验证</button>
<div class="hint" id="zoneMsg"></div>
<p style="color:#3a4a52;font-size:11px;margin-top:4px;">系统记录：分区密码由对应部门负责人设定。</p>
</div>
`
  },

  "分区详情":{
    url:"internal://ray-bay-aquarium/admin/zones",
    title:"📊 各分区详细情况",
    content:`
<h2>📊 Ray Bay Aquarium 分区详情</h2>

<div style="background:#0f1a22;padding:12px;margin:10px 0;border-left:3px solid #36bddd;">
<b>A区 — 公开展示区</b>
<p style="color:#788;">状态：2012年关闭前正常运营。包含展缸 #1-#4，展示近海生物。</p>
</div>

<div style="background:#0f1a22;padding:12px;margin:10px 0;border-left:3px solid #f0a030;">
<b>B区 — 深海生物研究区</b>
<p style="color:#d94a4a;">⚠ 未对公众开放</p>
<p>包含展缸 #5-#8</p>
<p>据王海生（编号BZ-2008）的工作日志，B区地下层在2011年进行过扩建。</p>
</div>

<div style="background:#0f1a22;padding:12px;margin:10px 0;border-left:3px solid #55ff88;">
<b>C区 — 设备维护区</b>
<p style="color:#788;">状态：正常。负责全馆水循环系统及供电。</p>
</div>

<hr>

<p style="color:#788;font-size:13px;">
注：关于未开放区域的详细档案，请使用独立检索系统查阅。
</p>

<button onclick="addClue('B区为未开放深海研究区存在9号展缸','2011年 B区地下层扩建')">
📌 保存证据
</button>
`
  },

  "未开放档案登录":{
    url:"internal://ray-bay-aquarium/admin/restricted-login",
    title:"🔒 未开放区域档案 — 密码验证",
    content:`
<h2>🔒 未开放区域检索系统</h2>

<div class="passBox">
<h4 style="margin:0 0 8px 0;color:#d94a4a;">⚠ 高度受限档案</h4>
<p>请输入独立档案密码：</p>
<input id="restrictPass" type="password" placeholder="请输入档案密码..." onkeydown="if(event.key==='Enter')loginRestricted()">
<button onclick="loginRestricted()">验证</button>
<div class="hint" id="restrictMsg"></div>
<p style="color:#3a4a52;font-size:11px;margin-top:4px;">系统记录：独立档案密码由档案管理员设定。</p>
</div>
`
  },

  "未开放档案":{
    url:"internal://ray-bay-aquarium/admin/restricted",
    title:"🔍 未开放区域检索系统",
    content:`
<h2>🔍 未开放区域档案检索</h2>
<p style="color:#788;">输入关键词检索档案库...</p>

<div class="searchbox">
<input id="archiveSearch" placeholder="输入关键词，如：1号展缸、深海、扩建..." onkeydown="if(event.key==='Enter')searchArchive()">
<button onclick="searchArchive()">检索</button>
</div>

<div id="archiveResult" style="margin-top:15px;">
<p style="color:#788;">请输入关键词进行检索。</p>
</div>
`
  },

  "9号展缸":{
    url:"internal://ray-bay-aquarium/admin/archive/tank9",
    title:"🔒 内部档案：9号展缸记录",
    content:`
<h2>⚠ 访问限制页面</h2>

<p style="color:#f0a030;">该页面来自旧服务器内部网络。</p>

<p>权限要求：<b>B区工作人员</b></p>

<br>

<p>档案编号：TANK-09</p>

<p>记录：<br>9号展缸没有登记生物编号。</p>

<p>创建日期：未知</p>

<p>最后修改：无记录</p>

<br>

<p style="color:#d94a4a;">备注：</p>
<blockquote style="border-left:3px solid #d94a4a;padding-left:10px;">
"不要记录它看见你的次数。"
</blockquote>

<br>

<button onclick="addClue('9号展缸没有官方生物记录','未知时间 水族馆异常档案')">
📌 保存证据
</button>
`
  },

  "陈志远档案":{
    url:"internal://ray-bay-aquarium/admin/staff/chen-zhiyuan",
    title:"📄 员工档案：陈志远",
    content:`
<h2>📄 员工档案</h2>

<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr><td style="padding:6px;border:1px solid #1d3a48;color:#788;">姓名</td><td style="padding:6px;border:1px solid #1d3a48;">陈志远</td></tr>
<tr><td style="padding:6px;border:1px solid #1d3a48;color:#788;">编号</td><td style="padding:6px;border:1px solid #1d3a48;">ADM-001</td></tr>
<tr><td style="padding:6px;border:1px solid #1d3a48;color:#788;">职务</td><td style="padding:6px;border:1px solid #1d3a48;">馆长</td></tr>
<tr><td style="padding:6px;border:1px solid #1d3a48;color:#788;">部门</td><td style="padding:6px;border:1px solid #1d3a48;">馆长办公室</td></tr>
<tr><td style="padding:6px;border:1px solid #1d3a48;color:#788;">入职</td><td style="padding:6px;border:1px solid #1d3a48;">2008年</td></tr>
<tr><td style="padding:6px;border:1px solid #1d3a48;color:#788;">状态</td><td style="padding:6px;border:1px solid #1d3a48;color:#d94a4a;">2012年离职</td></tr>
</table>

<div class="passBox">
<p style="color:#f0a030;">📧 工作邮箱：<b>zhiyuan_chen@ray-bay-aquarium.com</b></p>
<p>系统记录的登录凭据：<b>部门代码字母部分 + 出生年份</b></p>
</div>

<button onclick="addClue('获得馆长陈志远的邮箱密码线索','馆内档案记录显示密码为员工编号')">
📌 保存证据
</button>
`
  }
};

// 内部档案登录验证（门禁0421）
function loginArchive(){
  let input=document.getElementById("archivePass");
  let p=input?input.value:"";
  let msg=document.getElementById("archiveMsg");
  if(p!=="0421"){
    if(msg) msg.innerHTML="❌ 访问码错误。";
    return;
  }
  if(msg) msg.innerHTML="✅ 验证通过，正在加载档案系统...";
  archiveUnlocked=true;
  saveGame();
  setTimeout(()=>{
    addClue("进入水族馆内部档案系统","获得内部系统访问权限");
    navigatePage("内部档案门户","hidden");
  },600);
}

// 分区详情登录验证（密码BZ2008）
function loginZones(){
  let input=document.getElementById("zonePass");
  let p=input?input.value:"";
  let msg=document.getElementById("zoneMsg");
  if(p!=="BZ2008"){
    if(msg) msg.innerHTML="❌ 密码错误。";
    return;
  }
  if(msg) msg.innerHTML="✅ 验证通过，正在加载分区档案...";
  zonesUnlocked=true;
  saveGame();
  setTimeout(()=>{ navigatePage("分区详情","hidden"); },600);
}

// 未开放区域档案登录验证（密码BZ2011）
function loginRestricted(){
  let input=document.getElementById("restrictPass");
  let p=input?input.value:"";
  let msg=document.getElementById("restrictMsg");
  if(p!=="BZ2011"){
    if(msg) msg.innerHTML="❌ 密码错误。";
    return;
  }
  if(msg) msg.innerHTML="✅ 验证通过，正在加载检索系统...";
  restrictedUnlocked=true;
  saveGame();
  setTimeout(()=>{ navigatePage("未开放档案","hidden"); },600);
}

// 档案检索
function searchArchive(){
  let key=document.getElementById("archiveSearch").value.trim();
  let result=document.getElementById("archiveResult");
  if(!key){ result.innerHTML="<p style='color:#788;'>请输入关键词。</p>"; return; }

  // 9号展缸
  if(key.includes("9号")||key.includes("九号")||key.includes("TANK9")||key.includes("tank9")){
    result.innerHTML=`
<div class="card" style="cursor:pointer;border-left:3px solid #d94a4a;" onclick="navigatePage('9号展缸','hidden')">
<b>⚠ TANK-09 / 9号展缸</b><br>
<span style="color:#d94a4a;">档案编号：TANK-09 ｜ 状态：<b>无生物登记记录</b></span><br>
<span style="color:#788;">创建日期：未知 ｜ 最后修改：无</span>
<p style="color:#f0a030;margin-top:8px;">点击查看完整档案 →</p>
</div>`; return;
  }

  // 5-8号展缸
  if(key.includes("5号")||key.includes("五号")){
    result.innerHTML=`<div class="card" style="cursor:default;"><b>🐠 TANK-05 / 5号展缸</b><br><span style="color:#788;">A区公开展区。热带珊瑚礁生态展缸。</span><br><span style="color:#788;">状态：2012年关闭后生物移交市立海洋馆。</span></div>`; return;
  }
  if(key.includes("6号")||key.includes("六号")){
    result.innerHTML=`<div class="card" style="cursor:default;"><b>🐡 TANK-06 / 6号展缸</b><br><span style="color:#788;">A区公开展区。河豚与海马专题展缸。</span><br><span style="color:#788;">状态：2012年关闭后生物移交市立海洋馆。</span></div>`; return;
  }
  if(key.includes("7号")||key.includes("七号")){
    result.innerHTML=`<div class="card" style="cursor:default;border-left:3px solid #f0a030;"><b>🦑 TANK-07 / 7号展缸</b><br><span style="color:#788;">B区研究展区。深海发光生物展示。</span><br><span style="color:#f0a030;">⚠ 2011年起停止对公众开放，转为内部研究用途。</span></div>`; return;
  }
  if(key.includes("8号")||key.includes("八号")){
    result.innerHTML=`<div class="card" style="cursor:default;border-left:3px solid #f0a030;"><b>🦈 TANK-08 / 8号展缸</b><br><span style="color:#788;">B区研究展区。原计划展示小型鲨鱼及鳐鱼。</span><br><span style="color:#f0a030;">⚠ 2011年B区扩建后，该展缸被改造。用途：<b>未记录</b>。</span></div>`; return;
  }

  // 展缸通用索引
  if(key.includes("展缸")){
    result.innerHTML=`
<div class="card" style="cursor:default;"><b>📋 展缸索引</b><br>
<span style="color:#788;">#1-#4：A区公开展区</span><br>
<span style="color:#788;">#5-#6：A区公开展区</span><br>
<span style="color:#f0a030;">#7-#8：B区研究展区</span><br>
<span style="color:#d94a4a;">#9：无登记记录</span></div>`; return;
  }

  // 人员检索
  if(key.includes("王海生")||key.includes("海生")){
    result.innerHTML=`<div class="card" style="cursor:default;"><b>📄 王海生 工作日志</b><br><span style="color:#788;">2011年3月：B区地下扩建启动。2011年6月：完工。</span><br><span style="color:#f0a030;">编号：BZ-2008</span></div>`; return;
  }
  if(key.includes("周建国")||key.includes("建国")){
    result.innerHTML=`<div class="card" style="cursor:default;"><b>📄 周建国 工作日志</b><br><span style="color:#788;">2011年7月：接手B区档案管理。所有未开放区域档案独立加密。</span><br><span style="color:#f0a030;">编号：BZ-2011</span></div>`; return;
  }
  if(key.includes("陈志远")||key.includes("志远")){
    result.innerHTML=`
<div class="card" style="cursor:pointer;border-left:3px solid #f0a030;" onclick="navigatePage('陈志远档案','hidden')">
<b>📄 员工档案：陈志远</b><br>
<span style="color:#788;">编号：ADM-001 ｜ 职务：馆长 ｜ 状态：2012年离职</span><br>
<span style="color:#f0a030;margin-top:8px;">点击查看员工档案 →</span>
</div>`; return;
  }

  // 深海/扩建等
  if(key.includes("深海")||key.includes("扩建")||key.includes("B区")||key.includes("地下")){
    result.innerHTML=`
<div class="card" style="cursor:default;">
<b>📄 B区扩建工程记录</b><br>
<span style="color:#788;">2011年3月 — B区地下层扩建工程完工。</span><br>
<span style="color:#788;">负责人：王海生（BZ-2008）</span>
</div>`; return;
  }

  result.innerHTML="<p style='color:#788;'>未找到与「"+key+"」匹配的档案记录。</p>";
}
