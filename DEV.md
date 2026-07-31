# 应用开发指南

所有窗口继承自 `GameWindow`（`js/wm.js`）。

## 类层次

```
GameWindow (基类)                 ← 拖拽·焦点·开关·快捷栏
├── MailWindow     📧 委托邮箱
├── BrowserWindow  🌐 NEXUS搜索
├── CaseWindow     📁 案件档案
├── ReportWindow   📝 调查报告
└── SonarWindow    🌊 深海声呐

_WM (管理器)                      ← 注册·查找·z-index·dock
```

## 新建应用

### 1. HTML 模板

```html
<div class="window" id="myApp">
  <div class="windowTitleBar">
    <div class="windowTitle">
      <span class="windowIcon">🎯</span><span>我的应用</span>
    </div>
    <div class="windowControls">
      <button class="windowControlBtn minimize" onclick="minimizeWindow('myApp')">—</button>
      <button class="windowControlBtn close" onclick="closeWindow('myApp')">✕</button>
    </div>
  </div>
  <div class="windowBody">
    <!-- 内容 -->
  </div>
</div>
```

桌面图标：
```html
<div class="icon" onclick="openWindow('myApp')">🎯<br>我的应用</div>
```

### 2. 定义子类（`js/wm.js`）

```js
function MyAppWindow(){
  GameWindow.call(this, 'myApp', '🎯', '我的应用');
  this.onOpen = function(){ /* 打开时执行 */ };
  this.onClose = function(){ /* 关闭时执行 */ };
}
MyAppWindow.prototype = Object.create(GameWindow.prototype);
MyAppWindow.prototype.constructor = MyAppWindow;
```

### 3. 注册实例（`js/wm.js` 的 `initAllWindows()` 中）

```js
new MyAppWindow();
```

## GameWindow 提供的方法

| 方法 | 说明 |
|------|------|
| `open()` | 显示 + 提到最前 + `onOpen()` |
| `close()` | 隐藏 + `onClose()` |
| `minimize()` | 隐藏 |
| `_focus()` | 提至最前（自动绑定点击事件） |
| `_bind()` | 绑定拖拽和焦点事件 |

## 全局函数

| 函数 | 说明 |
|------|------|
| `openWindow(id)` | 打开应用 |
| `closeWindow(id)` | 关闭应用 |
| `minimizeWindow(id)` | 最小化应用 |

## 样式

所有窗口 CSS 在 `css/style.css` 中，关键类：
- `.window` — 基础样式
- `.window.activeWindow` — 焦点窗口光晕
- `.windowTitleBar` — 标题栏（拖拽手柄）
- `.dock` / `.dockItem` — 底部快捷栏
