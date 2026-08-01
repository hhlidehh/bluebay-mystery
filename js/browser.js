// ==========================================
// ==========================================
// 浏览器导航系统
// ==========================================

let browserTabs=[];
let activeBrowserTab=0;
let browserTabCounter=0;

// 密码记忆：输入正确一次后不再重复要求
let archiveUnlocked=false;
let zonesUnlocked=false;
let restrictedUnlocked=false;

function navCard(id,title,desc,style=''){
  return `<div class="card" onclick="navigatePage('${id}','hidden')" style="cursor:pointer;${style}"><b>${title}</b><br><span style="color:#5a8a9a;font-size:13px;">${desc}</span></div>`;
}

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
<h2>📂 蓝湾水族馆内部档案系统</h2>
<p style="color:#788;">最后登录：2012年6月15日 ｜ 登录用户：admin</p>

<hr>

${navCard('人员名单','📋 工作人员名单','在职人员及部门分配（2012年存档）')}

${navCard('分区详情登录','🔒 各分区详细情况','⚠ 需要分区管理密码','color:#f0a030;')}

${navCard('未开放档案登录','🔒 未开放区域档案','⚠ 需要独立档案密码 ｜ 交互式检索系统','color:#f0a030;')}

<hr>

${evidenceButton('进入水族馆内部档案系统','获得内部系统访问权限')}

`
  },

  "人员名单":{
    url:"internal://ray-bay-aquarium/admin/staff",
    title:"📋 工作人员名单",
    content:`
<h2>📋 蓝湾水族馆工作人员名单</h2>
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

${evidenceButton('获得水族馆工作人员名单','2012年 馆内人事档案')}
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
<h2>📊 蓝湾水族馆 分区详情</h2>

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

${evidenceButton('B区为未开放深海研究区存在9号展缸','2011年 B区地下层扩建')}
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
<h2>🔍 未开放区域档案检索 最后数据更改于:2012</h2>
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

${evidenceButton('9号展缸没有官方生物记录','未知时间 水族馆异常档案')}
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

${evidenceButton('获得馆长陈志远的邮箱密码线索','馆内档案记录显示密码为员工编号')}
`
  }
};

// ---- 声呐解锁的里网页（不可直接搜索，只能通过表网页链接进入） ----
let deepPages={
  "蓝湾水族馆_深层":{
    title:"🐠 蓝湾海洋馆 — 勘探记录（深层）",
    content:`
<h2>🔓 深层档案：建馆前勘探记录</h2>
<p style="color:#788;">分类：地基挖掘报告 | 来源：声呐解锁 | 2008年3月</p>
<hr>
<p>2008年地基挖掘期间，施工队报告了以下<b>非公开发现</b>：</p>
<ul>
<li>B区预定位置下方发现了<b>天然石灰岩空腔</b></li>
<li>空腔壁上有<b>不属于任何已知文明的凿刻痕迹</b></li>
<li>一名潜水员报告"听到了不应该存在于地下的水声"</li>
</ul>
<p>当时的馆长陈志远建议停止挖掘。<b>被驳回。</b></p>
<p>驳回理由：蓝湾造船集团已支付B区扩建费用。</p>
${evidenceButton('建馆勘探在B区发现远古凿痕与异常水声')}
`
  },
  "DSLOP项目报告_深层":{
    title:"📄 DSLOP项目 — 声呐观测原始数据（深层）",
    content:`
<h2>🔓 深层档案：DSLOP声呐原始数据</h2>
<p style="color:#788;">分类：观测日志 | 来源：声呐解锁 | 2010年</p>
<hr>
<p>DSLOP项目的核心设备包括<b>多频声呐阵列</b>。以下为未公开的原始数据摘要：</p>
<ul>
<li>2010年8月：首次声呐扫描。在约500m深度检测到<b>非地质性规律回波</b></li>
<li>2010年10月：回波节奏开始<b>匹配扫描脉冲的间隔</b></li>
<li>2011年2月：声呐阵列收到了<b>未经发射的独立信号</b></li>
</ul>
<p style="color:#d94a4a;">项目内部结论："存在一个位于空腔底部的声源。该声源具有主动响应能力。"</p>
${evidenceButton('DSLOP声呐数据证明9号展缸存在物具有主动声学响应')}
`
  },
  "分区详情_深层":{
    title:"📊 B区 — 完整地下测绘（深层）",
    content:`
<h2>🔓 深层档案：B区地下一层完整图纸</h2>
<p style="color:#788;">分类：工程图纸 | 来源：声呐解锁</p>

<img src="assets/raybay_barea_blueprint.png" alt="B区地下结构测绘图" style="max-width:100%;height:auto;border:1px solid #1d3a48;border-radius:4px;margin:10px 0;">
<p style="color:#788;font-size:12px;">图：B区地下结构测绘图（2011年扩建工程存档扫描件）</p>
<p style="color:#f0a030;">王海生编号BZ-2008，负责B区扩建。他的日志在2011年6月后中断。</p>
`
  },
  "9号展缸_深层":{
    title:"⚠ TANK-09 — 第一次接触记录（深层）",
    content:`
<h2>🔓 深层档案：9号展缸第一次接触</h2>
<p style="color:#788;">分类：未归档 | 来源：声呐解锁 | 日期：未知</p>
<hr>
<p>这份记录没有编号，没有日期，没有签名。</p>
<blockquote style="border-left:3px solid #d94a4a;padding-left:10px;">
<p>"我们以为空腔是空的。"</p>
<p>"第一次声呐扫描时，声波被完整地反射了回来——就像有人站在对面，把每一个脉冲都复述了一遍。"</p>
<p>"后来我们放了水下摄像机。画面里只有黑暗。"</p>
<p>"但声呐屏幕上——<b>黑暗在移动。</b>"</p>
<p>"它不是被困在空腔里。"</p>
<p><b>"它在等待。</b>"</p>
</blockquote>
${evidenceButton('9号展缸存在物的第一次接触记录 它不是在回应——是在等待')}
`
  },
  "未开放档案_深层":{
    title:"🔒 闭馆前最后24小时 — 内部通讯（深层）",
    content:`
<h2>🔓 深层档案：闭馆前最后通讯</h2>
<p style="color:#788;">分类：内部通讯记录 | 来源：声呐解锁 | 2012年6月</p>
<hr>
<p>2012年6月14日 — 陈志远发送给全体工作人员：</p>
<blockquote style="border-left:3px solid #d94a4a;padding-left:10px;">"立即停止所有B区活动。不要回应任何来自地下层的声音。这不是演习。"</blockquote>
<p>2012年6月15日 02:13 — B区研究部最后一条通讯：</p>
<blockquote style="border-left:3px solid #d94a4a;padding-left:10px;">"它开始使用我们的名字了。"</blockquote>
<p>2012年6月15日 08:00 — 闭馆申请提交。</p>
<p>2012年6月16日 — 蓝湾新闻网刊登闭馆报道。造船集团拒绝评论。</p>
${evidenceButton('闭馆前B区研究部最后通讯:它开始使用我们的名字')}
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
    result.innerHTML = navCard('9号展缸','⚠ TANK-09 / 9号展缸','档案编号：TANK-09 ｜ 状态：<b>无生物登记记录</b><br><span style="color:#788;">创建日期：未知 ｜ 最后修改：无</span><p style="color:#f0a030;margin-top:8px;">点击查看完整档案 →</p>','cursor:pointer;border-left:3px solid #d94a4a;');
    return;
  }

  // 5-8号展缸
  if(key.includes("5号")||key.includes("五号")){
    result.innerHTML=navCard('','🐠 TANK-05 / 5号展缸','A区公开展区。热带珊瑚礁生态展缸。<br><span style="color:#788;">状态：2012年关闭后生物移交市立海洋馆。</span>','cursor:default;'); return;
  }
  if(key.includes("6号")||key.includes("六号")){
    result.innerHTML=navCard('','🐡 TANK-06 / 6号展缸','A区公开展区。河豚与海马专题展缸。<br><span style="color:#788;">状态：2012年关闭后生物移交市立海洋馆。</span>','cursor:default;'); return;
  }
  if(key.includes("7号")||key.includes("七号")){
    result.innerHTML=navCard('','🦑 TANK-07 / 7号展缸','B区研究展区。深海发光生物展示。<br><span style="color:#f0a030;">⚠ 2011年起停止对公众开放，转为内部研究用途。</span>','cursor:default;border-left:3px solid #f0a030;'); return;
  }
  if(key.includes("8号")||key.includes("八号")){
    result.innerHTML=navCard('','🦈 TANK-08 / 8号展缸','B区研究展区。原计划展示小型鲨鱼及鳐鱼。<br><span style="color:#f0a030;">⚠ 2011年B区扩建后，该展缸被改造。用途：<b>未记录</b>。</span>','cursor:default;border-left:3px solid #f0a030;'); return;
  }

  // 展缸通用索引
  if(key.includes("展缸")){
    result.innerHTML=navCard('','📋 展缸索引','#1-#4：A区公开展区<br>#5-#6：A区公开展区<br><span style="color:#f0a030;">#7-#8：B区研究展区</span><br><span style="color:#d94a4a;">#9：无登记记录</span>','cursor:default;'); return;
  }

  // 人员检索
  if(key.includes("王海生")||key.includes("海生")){
    result.innerHTML=navCard('','📄 王海生 工作日志','2011年3月：B区地下扩建启动。2011年6月：完工。<br><span style="color:#f0a030;">编号：BZ-2008</span>','cursor:default;'); return;
  }
  if(key.includes("周建国")||key.includes("建国")){
    result.innerHTML=navCard('','📄 周建国 工作日志','2011年7月：接手B区档案管理。所有未开放区域档案独立加密。<br><span style="color:#f0a030;">编号：BZ-2011</span>','cursor:default;'); return;
  }
  if(key.includes("陈志远")||key.includes("志远")){
    result.innerHTML=navCard('陈志远档案','📄 员工档案：陈志远','编号：ADM-001 ｜ 职务：馆长 ｜ 状态：2012年离职<br><span style="color:#f0a030;margin-top:8px;">点击查看员工档案 →</span>','cursor:pointer;border-left:3px solid #f0a030;'); return;
  }

  // 深海/扩建等
  if(key.includes("深海")||key.includes("扩建")||key.includes("B区")||key.includes("地下")){
    result.innerHTML=navCard('','📄 B区扩建工程记录','2011年3月 — B区地下层扩建工程完工。<br><span style="color:#788;">负责人：王海生（BZ-2008）</span>','cursor:default;'); return;
  }

  result.innerHTML="<p style='color:#788;'>该关键词暂无相关结果。</p>";
}

// 第二章（解锁声呐后）：9号展缸页面中所有可见的"9"变为"999"
function applyTank9Chapter2(root){
  if(!sonarUnlocked) return;
  let walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
  let nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n=>{ n.nodeValue=n.nodeValue.replace(/9/g,"999"); });
}
