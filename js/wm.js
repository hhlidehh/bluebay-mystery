// ═══════════════════════════════════════
// 窗口管理器 — 所有窗口的基类与注册中心
// ═══════════════════════════════════════

/* global 变量，供内联 onclick 使用 */
var _winZ = 100;

function openWindow(id){
  var w = _WM.get(id);
  if(w){ w.open(); return; }
  var el = document.getElementById(id);
  if(el){ el.style.display='block'; el.style.zIndex=++_winZ; }
}
function closeWindow(id){
  var w = _WM.get(id);
  if(w){ w.close(); return; }
  var el = document.getElementById(id);
  if(el){ el.style.display='none'; }
}
function minimizeWindow(id){
  var w = _WM.get(id);
  if(w) w.minimize();
}

/* ── 窗口注册中心 ── */
var _WM = {
  _apps: {},
  _active: null,
  _list: [],
  register: function(app){
    _WM._apps[app.id] = app;
    _WM._list.push(app);
  },
  get: function(id){ return _WM._apps[id] || null; },
  active: function(){ return _WM._active; },
  bring: function(app){
    var z = 0;
    for(var i=0; i<_WM._list.length; i++){
      _WM._list[i].el.classList.remove('activeWindow');
      var cz = parseInt(_WM._list[i].el.style.zIndex)||0;
      if(cz>z) z=cz;
    }
    app.el.style.zIndex = Math.max(z+1, ++_winZ);
    app.el.classList.add('activeWindow');
    _WM._active = app;
  },
  updateDock: function(){
    var d = document.getElementById('dock');
    if(!d) return;
    d.innerHTML = '';
    for(var i=0; i<_WM._list.length; i++){
      var a = _WM._list[i];
      if(!a._launched) continue;
      var item = document.createElement('div');
      item.className = 'dockItem' + (a===_WM._active?' active':'');
      item.title = a.label;
      item.textContent = a.icon;
      (function(app){ item.onclick = function(){ app.open(); }; })(a);
      d.appendChild(item);
    }
  }
};

/* ── 窗口基类 ── */
function GameWindow(id, icon, label){
  this.id = id;
  this.icon = icon || '📄';
  this.label = label || id;
  this.el = document.getElementById(id);
  this._launched = false;
  _WM.register(this);
  if(this.el) this._bind();
}

GameWindow.prototype._bind = function(){
  var self = this;
  var el = this.el;

  /* 焦点：点击任意位置 */
  el.addEventListener('pointerdown', function(){ self._focus(); });

  /* 拖拽：标题栏 */
  var bar = el.querySelector('.windowTitleBar');
  if(!bar) return;
  bar.addEventListener('pointerdown', function(e){
    if(e.target.closest('.windowControls')) return;
    self._focus();
    bar.setPointerCapture(e.pointerId);
    var ox = e.clientX - el.offsetLeft;
    var oy = e.clientY - el.offsetTop;
    function move(ev){
      el.style.left = Math.max(0, Math.min(ev.clientX-ox, window.innerWidth-el.offsetWidth))+'px';
      el.style.top  = Math.max(50, Math.min(ev.clientY-oy, window.innerHeight-el.offsetHeight))+'px';
    }
    function up(ev){
      bar.releasePointerCapture(ev.pointerId);
      bar.removeEventListener('pointermove', move);
      bar.removeEventListener('pointerup', up);
    }
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', up);
  });
};

GameWindow.prototype._focus = function(){
  if(this.el.style.display==='none') return;
  _WM.bring(this);
};

GameWindow.prototype.open = function(){
  if(!this.el) return;
  this._launched = true;
  this.el.style.display = 'block';
  if(!this.el.style.left){ this.el.style.left='8%'; this.el.style.top='80px'; }
  _WM.bring(this);
  _WM.updateDock();
  if(this.onOpen) this.onOpen();
};

GameWindow.prototype.close = function(){
  if(!this.el) return;
  this.el.classList.remove('activeWindow');
  this.el.style.display = 'none';
  if(this.id==='browser'||this.id==='sonar'){ if(typeof stopWave==='function') stopWave(); }
  if(_WM._active===this) _WM._active=null;
  _WM.updateDock();
  if(this.onClose) this.onClose();
};

GameWindow.prototype.minimize = function(){
  this.close();
};

/* ── 具体应用子类 ── */

function MailWindow(){
  GameWindow.call(this, 'mail', '📧', '委托邮箱');
  this.onOpen = function(){ if(typeof renderMail==='function') renderMail(); };
}
MailWindow.prototype = Object.create(GameWindow.prototype);
MailWindow.prototype.constructor = MailWindow;

function BrowserWindow(){
  GameWindow.call(this, 'browser', '🌐', 'NEXUS搜索');
  this.onOpen = function(){ if(typeof initBrowser==='function') initBrowser(); };
}
BrowserWindow.prototype = Object.create(GameWindow.prototype);
BrowserWindow.prototype.constructor = BrowserWindow;

function CaseWindow(){
  GameWindow.call(this, 'case', '📁', '案件档案');
}
CaseWindow.prototype = Object.create(GameWindow.prototype);
CaseWindow.prototype.constructor = CaseWindow;

function ReportWindow(){
  GameWindow.call(this, 'report', '📝', '调查报告');
  this.onOpen = function(){ if(typeof checkEndings==='function') checkEndings(); };
}
ReportWindow.prototype = Object.create(GameWindow.prototype);
ReportWindow.prototype.constructor = ReportWindow;

function SonarWindow(){
  GameWindow.call(this, 'sonar', '🌊', '深海声呐');
}
SonarWindow.prototype = Object.create(GameWindow.prototype);
SonarWindow.prototype.constructor = SonarWindow;

/* ── 一键初始化 ── */
function initAllWindows(){
  new MailWindow();
  new BrowserWindow();
  new CaseWindow();
  new ReportWindow();
  new SonarWindow();
}
