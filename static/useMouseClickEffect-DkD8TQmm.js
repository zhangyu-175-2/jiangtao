import{Bn as e}from"./ep-actions-DS-MB-JP.js";import{i as t}from"./captcha-core-DG2GwIy3.js";import"./framework-B4vmTVL3.js";import"./axios-BbR7LXbm.js";import{a as n}from"./index-BeGcwt36.js";var r=[`none`,`text`,`firework`],i={none:`无效果`,text:`社会主义核心价值观`,firework:`烟花粒子`},a=null,o={},s={},c={};function l(){return new Promise((e,t)=>{if(window.anime){e(window.anime);return}let n=document.createElement(`script`);n.src=`/libs/js/anime.min.js`,n.onload=()=>e(window.anime),n.onerror=()=>t(Error(`Failed to load anime.js`)),document.head.appendChild(n)})}function u(e){return e.target.closest(`#waifu`)||e.target.closest(`#waifu-chat`)||e.target.closest(`#waifu-tool`)||e.target.closest(`button`)||e.target.closest(`a`)||e.target.closest(`.el-dialog`)||e.target.closest(`.el-message-box`)||e.target.closest(`.el-popover`)||e.target.closest(`.el-drawer`)||e.target.closest(`.tool-box`)||e.target.closest(`input`)||e.target.closest(`textarea`)||e.target.nodeName===`A`||e.target.nodeName===`IMG`}function d(e,t){if(!t||typeof t!=`string`)return null;if(c[e])return c[e];try{let n=Function(`x`,`y`,`config`,`anime`,`${t}\n//# sourceURL=poetize-mouse-effect-${e}.js`);return c[e]=n,n}catch(t){return console.error(`[鼠标点击特效] 插件代码编译失败 (${e}):`,t),null}}function f(e,t,n){return p.apply(this,arguments)}function p(){return p=t(function*(e,t,n){let r=o[e];if(!r)return!1;let i=d(e,r);if(!i)return!1;try{let r={},a=s[e];if(a)try{r=JSON.parse(a)}catch(e){}let o=window.anime;if(!o)try{o=yield l()}catch(e){o=null}return i(t,n,r,o),!0}catch(t){return console.error(`执行插件 ${e} 失败:`,t),!1}}),p.apply(this,arguments)}function m(){let e={code:200,message:null,data:[{id:1,pluginType:`mouse_click_effect`,pluginKey:`none`,pluginName:`无效果`,pluginDescription:`关闭鼠标点击效果`,pluginConfig:`{}`,pluginCode:null,enabled:!0,isSystem:!0,version:null,author:null,manifest:null,backendCode:null,frontendCss:null,installSql:null,uninstallSql:null,hasBackend:0,sortOrder:0,createTime:`2026-01-31T02:32:51`,updateTime:`2026-01-31T02:32:51`},{id:2,pluginType:`mouse_click_effect`,pluginKey:`text`,pluginName:`社会主义核心价值观`,pluginDescription:`点击时显示社会主义核心价值观文字：富强、民主、文明、和谐等`,pluginConfig:`{"texts": ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"], "color": "#ff6651", "fontSize": 16, "duration": 1500, "moveDistance": 160}`,pluginCode:`const list = config.texts || [
  "富强", "民主", "文明", "和谐",
  "自由", "平等", "公正", "法治",
  "爱国", "敬业", "诚信", "友善"
];

if (typeof window._textEffectIdx === "undefined") {
  window._textEffectIdx = 0;
}

const span = document.createElement("span");
span.textContent = list[window._textEffectIdx];
window._textEffectIdx = (window._textEffectIdx + 1) % list.length;

Object.assign(span.style, {
  "z-index": "1000",
  top: y - 20 + "px",
  left: x + "px",
  position: "absolute",
  "pointer-events": "none",
  "font-weight": "bold",
  color: config.color || "#ff6651",
  transition: "all 1.5s ease-out"
});

if (document.body && span && span.nodeType === Node.ELEMENT_NODE) {
  document.body.appendChild(span);
} else {
  return;
}

setTimeout(() => {
  span.style.top = y - 180 + "px";
  span.style.opacity = "0";
}, 10);

setTimeout(() => {
  if (span.parentNode) {
    span.parentNode.removeChild(span);
  }
}, 1500);`,enabled:!0,isSystem:!0,version:null,author:null,manifest:null,backendCode:null,frontendCss:null,installSql:null,uninstallSql:null,hasBackend:0,sortOrder:1,createTime:`2026-01-31T02:32:51`,updateTime:`2026-01-31T02:32:51`},{id:3,pluginType:`mouse_click_effect`,pluginKey:`firework`,pluginName:`烟花粒子`,pluginDescription:`点击时产生彩色烟花粒子扩散效果`,pluginConfig:`{"colors": ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"], "particleCount": 30, "minRadius": 16, "maxRadius": 32, "minDistance": 50, "maxDistance": 180}`,pluginCode:`if (!anime) { console.warn("anime.js未加载"); return; }

const colors = config.colors || ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
const numberOfParticules = config.particleCount || 30;

// 将页面坐标转换为视口坐标（因为canvas使用position:fixed）
const viewportX = x - window.scrollX;
const viewportY = y - window.scrollY;

// 获取或创建canvas
let canvas = document.getElementById("mousedown-effect");
if (!canvas) {
  canvas = document.createElement("canvas");
  canvas.id = "mousedown-effect";
  Object.assign(canvas.style, {
    position: "fixed",
    left: "0",
    top: "0",
    pointerEvents: "none",
    zIndex: "1000"
  });
  document.body.appendChild(canvas);
}

// 设置canvas尺寸
canvas.width = 2 * window.innerWidth;
canvas.height = 2 * window.innerHeight;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

const ctx = canvas.getContext("2d", {willReadFrequently: true});
ctx.scale(2, 2);

// 粒子方向
function setParticuleDirection(p) {
  const t = anime.random(0, 360) * Math.PI / 180;
  const a = anime.random(50, 180);
  const n = [-1, 1][anime.random(0, 1)] * a;
  return {
    x: p.x + n * Math.cos(t),
    y: p.y + n * Math.sin(t)
  };
}

// 创建粒子
function createParticule(px, py) {
  const p = {
    x: px,
    y: py,
    color: colors[anime.random(0, colors.length - 1)],
    radius: anime.random(16, 32)
  };
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  };
  return p;
}

// 创建圆环
function createCircle(px, py) {
  const c = {
    x: px,
    y: py,
    color: "#F00",
    radius: 0.1,
    alpha: 0.5,
    lineWidth: 6
  };
  c.draw = function() {
    ctx.globalAlpha = c.alpha;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = c.lineWidth;
    ctx.strokeStyle = c.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  return c;
}

// 创建粒子和圆环（使用视口坐标）
const circle = createCircle(viewportX, viewportY);
const particules = [];
for (let i = 0; i < numberOfParticules; i++) {
  particules.push(createParticule(viewportX, viewportY));
}

// 所有动画目标
const allTargets = [...particules, circle];

// 渲染函数 - 绘制所有元素
function renderAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < allTargets.length; i++) {
    allTargets[i].draw();
  }
}

// 启动动画
anime.timeline().add({
  targets: particules,
  x: function(p) { return p.endPos.x; },
  y: function(p) { return p.endPos.y; },
  radius: 0.1,
  duration: anime.random(1200, 1800),
  easing: "easeOutExpo",
  update: renderAll
}).add({
  targets: circle,
  radius: anime.random(80, 160),
  lineWidth: 0,
  alpha: {
    value: 0,
    easing: "linear",
    duration: anime.random(600, 800)
  },
  duration: anime.random(1200, 1800),
  easing: "easeOutExpo",
  offset: 0
});`,enabled:!0,isSystem:!0,version:null,author:null,manifest:null,backendCode:null,frontendCss:null,installSql:null,uninstallSql:null,hasBackend:0,sortOrder:2,createTime:`2026-01-31T02:32:51`,updateTime:`2026-01-31T02:32:51`}],currentTimeMillis:1774346143526,success:!0};if(e&&e.data){let t=e.data,n=[],a={};t.forEach(e=>{let t=e.pluginKey;n.includes(t)||n.push(t),a[t]=e.pluginName,e.pluginCode&&(o[t]=e.pluginCode,delete c[t]),e.pluginConfig&&(s[t]=e.pluginConfig)}),r=n,i=a}var t={code:200,message:null,data:{pluginName:`社会主义核心价值观`,pluginCode:`const list = config.texts || [
  "富强", "民主", "文明", "和谐",
  "自由", "平等", "公正", "法治",
  "爱国", "敬业", "诚信", "友善"
];

if (typeof window._textEffectIdx === "undefined") {
  window._textEffectIdx = 0;
}

const span = document.createElement("span");
span.textContent = list[window._textEffectIdx];
window._textEffectIdx = (window._textEffectIdx + 1) % list.length;

Object.assign(span.style, {
  "z-index": "1000",
  top: y - 20 + "px",
  left: x + "px",
  position: "absolute",
  "pointer-events": "none",
  "font-weight": "bold",
  color: config.color || "#ff6651",
  transition: "all 1.5s ease-out"
});

if (document.body && span && span.nodeType === Node.ELEMENT_NODE) {
  document.body.appendChild(span);
} else {
  return;
}

setTimeout(() => {
  span.style.top = y - 180 + "px";
  span.style.opacity = "0";
}, 10);

setTimeout(() => {
  if (span.parentNode) {
    span.parentNode.removeChild(span);
  }
}, 1500);`,pluginKey:`text`,enabled:!0,pluginConfig:`{"texts": ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"], "color": "#ff6651", "fontSize": 16, "duration": 1500, "moveDistance": 160}`},currentTimeMillis:1774346143552,success:!0};t&&t.data&&t.data.pluginKey?a=e.data.pluginKey:console.debug(`获取当前激活鼠标点击效果失败:`,err)}function h(e){var t;return a===null?(e==null||(t=e.webInfo)==null?void 0:t.mouseClickEffect)||`none`:a}function g(e){let t=h(e),o=(r.indexOf(t)+1)%r.length,s=r[o];return a=s,n.post(`/sysPlugin/setActivePlugin`,{pluginType:`mouse_click_effect`,pluginKey:s}).catch(e=>{console.debug(`同步鼠标点击效果到后端失败:`,e)}),{type:s,label:i[s]||s}}function _(e){let t=h(e);return{type:t,label:i[t]||t,isOverridden:a!==null}}function v(){a=null}function y(e){var t,n,r;let i=(t=e.cpuCoreThreshold)==null?2:t,a=(n=e.memoryThreshold)==null?4:n,o=(r=e.disableMobile)==null?!0:r;return!!((navigator.hardwareConcurrency||4)<=i||navigator.deviceMemory&&navigator.deviceMemory<=a||o&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))}function b(t){let n={disableLowPerf:!1,disableInAdmin:!1,cpuCoreThreshold:2,disableMobile:!0};if(t&&t.webInfo&&t.webInfo.mouseClickEffectConfig)try{let r=JSON.parse(t.webInfo.mouseClickEffectConfig);n=e(e({},n),r)}catch(e){}return n}function x(e){let t=b(e);if(t.disableLowPerf&&y(t))return console.log(`低性能设备，已禁用点击特效`),()=>{};m();let n=t=>{let n=h(e);if(n===`none`||u(t))return;let r=t.pageX,i=t.pageY;o[n]?f(n,r,i):console.warn(`插件 ${n} 没有可执行的代码`)};document.body.addEventListener(`click`,n);let r=()=>{document.body.removeEventListener(`click`,n)},i=null;if(t.enableFpsCheck){let e=0,n=performance.now(),a=0,o=()=>{let s=performance.now();if(e++,s-n>=1e3){var c;if(Math.round(e*1e3/(s-n))<((c=t.fpsThreshold)==null?30:c)){if(a++,a>=3){console.warn(`FPS过多低于阈值(${t.fpsThreshold})，自动关闭点击特效`),r(),r=()=>{},cancelAnimationFrame(i);return}}else a=Math.max(0,a-1);e=0,n=s}i=requestAnimationFrame(o)};setTimeout(()=>{i=requestAnimationFrame(o)},2e3)}return()=>{r(),i&&cancelAnimationFrame(i)}}export{g as cycleMouseClickEffect,_ as getMouseClickEffectInfo,x as initMouseClickEffect,v as resetMouseClickEffect};