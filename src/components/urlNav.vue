<template>
  <div class="container">
    <!-- 左侧侧边栏导航 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h1>RiverBillowBlog导航</h1>
      </div>
      <div class="menu-list">
        <button 
          v-for="item in menuItems" 
          :key="item.key"
          @click="scrollToSection(item.key)"
          class="menu-item"
        >
          {{ item.label }}
          <span>›</span>
        </button>
      </div>
      <div class="sidebar-footer">
        <!-- 欢迎来到RiverBillowBlog！ -->
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="content">
      <section 
        v-for="section in sections" 
        :key="section.id"
        :id="section.id" 
        class="section"
      >
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="card-grid">
          <!-- 新增卡片点击事件 -->
          <div 
            v-for="card in section.cards" 
            :key="card.title" 
            class="card"
            @click="handleCardClick(card.url)"
          >
          <el-avatar
            class="favorite-item-image"
            :size="40"
            :src="getImageSrc(card.icon)"
          >
            <!-- 核心：src 无效时（emoji 场景），插槽渲染文本 -->
            <template v-if="isEmoji(card.icon)">
              {{ card.icon }}
            </template>
          </el-avatar>
              <!-- <el-avatar
                class="favorite-item-image"
                :size="40"
                :src="getImageSrc(card.icon)"
              >
              </el-avatar> -->
            <div class="card-info">
              <h3>{{ card.title }}</h3>
              <p>{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { dataUrlNav } from '@/assets/data-url-nav.js'


const data = {
  "menuItems": [
    { "label": "英语学习", "key": "english" },
    { "label": "前端开发", "key": "frontend" },
    { "label": "程序员工具", "key": "programmer" },
    { "label": "跨境电商", "key": "crossborder" },
    { "label": "AI工具合集", "key": "ai" },
    { "label": "设计资源", "key": "design" },
    { "label": "编程自学", "key": "study" },
    { "label": "实用工具", "key": "tools" },
    { "label": "求职面试", "key": "job" }
  ],
  "sections": [
    {
      "id": "english",
      "title": "🇬🇧 英语学习",
      "cards": [
        { "icon": "🎙️", "title": "BBC Learning English", "desc": "BBC官方英语学习，听力阅读素材", "url": "https://www.bbc.co.uk/learningenglish" },
        { "icon": "📻", "title": "VOA慢速英语", "desc": "语速缓慢，适合零基础、初中级听力", "url": "https://learningenglish.voanews.com/" },
        { "icon": "📚", "title": "Duolingo", "desc": "多邻国，游戏化背单词学英语", "url": "https://www.duolingo.com/" },
        { "icon": "🔍", "title": "Forvo", "desc": "全球单词发音词典，真人发音", "url": "https://forvo.com/" },
        { "icon": "✍️", "title": "Grammarly", "desc": "英文语法检查、写作润色工具", "url": "https://www.grammarly.com/" },
        { "icon": "🎧", "title": "ESL Pod", "desc": "日常口语对话，逐句讲解", "url": "https://eslpod.com/" },
        { "icon": "📺", "title": "TED Talks", "desc": "英语演讲，练听力积累表达", "url": "https://www.ted.com/" },
        { "icon": "📰", "title": "Breaking News English", "desc": "分级英文新闻，难度可选", "url": "https://breakingnewsenglish.com/" }
      ]
    },
    {
      "id": "frontend",
      "title": "💻 前端开发",
      "cards": [
        { "icon": "📘", "title": "MDN Web Docs", "desc": "前端官方权威文档，HTML/CSS/JS", "url": "https://developer.mozilla.org/" },
        { "icon": "⚡", "title": "Vue.js", "desc": "渐进式前端框架，中文文档", "url": "https://cn.vuejs.org/" },
        { "icon": "🔥", "title": "React", "desc": "主流前端框架，组件化开发", "url": "https://react.dev/" },
        { "icon": "🎨", "title": "CSS Tricks", "desc": "CSS 布局、动画技巧大全", "url": "https://css-tricks.com/" },
        { "icon": "📦", "title": "npm", "desc": "前端包管理、依赖查询", "url": "https://www.npmjs.com/" },
        { "icon": "🎯", "title": "Can I Use", "desc": "查询CSS/JS属性浏览器兼容性", "url": "https://caniuse.com/" },
        { "icon": "🚀", "title": "Vite", "desc": "新一代前端构建工具", "url": "https://cn.vitejs.dev/" },
        { "icon": "📱", "title": "Flexbox Froggy", "desc": "小游戏学习 Flex 布局", "url": "https://flexboxfroggy.com/" }
      ]
    },
    {
      "id": "programmer",
      "title": "🧑‍💻 程序员工具",
      "cards": [
        { "icon": "📖", "title": "GitHub", "desc": "全球代码托管、开源项目", "url": "https://github.com/" },
        { "icon": "🔍", "title": "Stack Overflow", "desc": "编程问题问答社区", "url": "https://stackoverflow.com/" },
        { "icon": "🐙", "title": "Gitee", "desc": "国产代码托管平台", "url": "https://gitee.com/" },
        { "icon": "📝", "title": "CodePen", "desc": "在线前端代码调试演示", "url": "https://codepen.io/" },
        { "icon": "⚙️", "title": "JSON.cn", "desc": "JSON格式化、校验工具", "url": "https://www.json.cn/" },
        { "icon": "🔐", "title": "Git", "desc": "版本控制工具官方文档", "url": "https://git-scm.com/" },
        { "icon": "📊", "title": "LeetCode", "desc": "算法刷题，面试必备", "url": "https://leetcode.cn/" },
        { "icon": "🛠️", "title": "Runno", "desc": "在线运行多种编程语言", "url": "https://runno.dev/" }
      ]
    },
    {
      "id": "crossborder",
      "title": "🌍 跨境电商",
      "cards": [
        { "icon": "🛒", "title": "亚马逊全球开店", "desc": "主流跨境电商平台入驻", "url": "https://gs.amazon.cn/" },
        { "icon": "🛍️", "title": "AliExpress", "desc": "阿里巴巴全球速卖通", "url": "https://www.aliexpress.com/" },
        { "icon": "🚀", "title": "TikTok Shop", "desc": "海外短视频电商带货", "url": "https://seller.tiktokglobalshop.com/" },
        { "icon": "📦", "title": "17Track", "desc": "国际物流包裹查询", "url": "https://www.17track.com/" },
        { "icon": "💱", "title": "XE汇率", "desc": "实时货币汇率换算", "url": "https://www.xe.com/" },
        { "icon": "📈", "title": "Jungle Scout", "desc": "亚马逊选品数据分析", "url": "https://www.junglescout.com/" },
        { "icon": "✈️", "title": "Wish", "desc": "北美移动端跨境电商", "url": "https://www.wish.com/" },
        { "icon": "🌏", "title": "Shopify", "desc": "独立站搭建，跨境开店", "url": "https://www.shopify.com/" }
      ]
    },
    {
      "id": "ai",
      "title": "🤖 AI 工具合集",
      "cards": [
        { "icon": "🧠", "title": "ChatGPT", "desc": "通用AI对话、写作、编程辅助", "url": "https://chat.openai.com/" },
        { "icon": "🎨", "title": "Midjourney", "desc": "AI绘画、设计、海报生成", "url": "https://www.midjourney.com/" },
        { "icon": "📝", "title": "豆包", "desc": "国产AI，写作、总结、答疑", "url": "https://www.doubao.com/" },
        { "icon": "🔊", "title": "ElevenLabs", "desc": "AI真人语音合成", "url": "https://elevenlabs.io/" },
        { "icon": "🎬", "title": "Pika Labs", "desc": "AI文本生成视频", "url": "https://pika.art/" },
        { "icon": "🧾", "title": "通义千问", "desc": "阿里AI，办公文案助手", "url": "https://tongyi.aliyun.com/" },
        { "icon": "📷", "title": "Remove.bg", "desc": "AI一键抠图去背景", "url": "https://www.remove.bg/" },
        { "icon": "📚", "title": "ChatDOC", "desc": "AI阅读PDF、文档总结", "url": "https://chatdoc.com/" }
      ]
    },
    {
      "id": "design",
      "title": "🎨 设计资源",
      "cards": [
        { "icon": "🖌️", "title": "Figma", "desc": "在线UI设计、原型协作", "url": "https://www.figma.com/" },
        { "icon": "🖼️", "title": "Pexels", "desc": "免费可商用高清图片", "url": "https://www.pexels.com/" },
        { "icon": "🎨", "title": "Dribbble", "desc": "优秀UI设计作品参考", "url": "https://dribbble.com/" },
        { "icon": "🌈", "title": "ColorHub", "desc": "配色方案、色彩工具", "url": "https://www.colorhub.app/" },
        { "icon": "📸", "title": "Unsplash", "desc": "无版权高清摄影图", "url": "https://unsplash.com/" },
        { "icon": "✏️", "title": "Canva", "desc": "可画，在线海报设计", "url": "https://www.canva.com/" }
      ]
    },
    {
      "id": "study",
      "title": "📚 编程自学",
      "cards": [
        { "icon": "🏫", "title": "B站学习", "desc": "海量免费编程、前端教程", "url": "https://www.bilibili.com/" },
        { "icon": "🎓", "title": "慕课网", "desc": "IT职业技能在线课程", "url": "https://www.imooc.com/" },
        { "icon": "📖", "title": "菜鸟教程", "desc": "编程入门基础教程", "url": "https://www.runoob.com/" },
        { "icon": "🔧", "title": "廖雪峰博客", "desc": "Git、Java、Python全栈教程", "url": "https://www.liaoxuefeng.com/" },
        { "icon": "🚀", "title": "NowCoder", "desc": "牛客网，笔试面试题库", "url": "https://www.nowcoder.com/" }
      ]
    },
    {
      "id": "tools",
      "title": "🛠️ 实用工具",
      "cards": [
        { "icon": "📅", "title": "ProcessOn", "desc": "在线思维导图、流程图", "url": "https://www.processon.com/" },
        { "icon": "📝", "title": "石墨文档", "desc": "在线协作文档", "url": "https://shimo.im/" },
        { "icon": "🧾", "title": "PDF24", "desc": "PDF合并、分割、转换", "url": "https://tools.pdf24.org/" },
        { "icon": "🌐", "title": "IP查询", "desc": "IP地址、域名信息查询", "url": "https://www.ip138.com/" },
        { "icon": "🧮", "title": "在线计算器", "desc": "科学计算、进制转换", "url": "https://www.99cankao.com/" },
        { "icon": "📸", "title": "TinyPNG", "desc": "图片压缩，无损缩小体积", "url": "https://tinypng.com/" }
      ]
    },
    {
      "id": "job",
      "title": "💼 求职面试",
      "cards": [
        { "icon": "🔍", "title": "BOSS直聘", "desc": "互联网招聘找工作", "url": "https://www.zhipin.com/" },
        { "icon": "🧑‍💼", "title": "拉勾网", "desc": "互联网IT专属招聘", "url": "https://www.lagou.com/" },
        { "icon": "📋", "title": "面试鸭", "desc": "前端、后端面试题库", "url": "https://www.mianshiya.com/" },
        { "icon": "🧩", "title": "前端面试题", "desc": "大厂前端面试总结", "url": "https://frontendinterviewhandbook.com/" }
      ]
    }
  ]
}
// 导航菜单
const menuItems = dataUrlNav.menuItems
const sections = dataUrlNav.sections
// function getImageSrc(cover) {
//   if (cover.startsWith('http://') || cover.startsWith('https://')) {
//     return cover;
//   }
//   else {
//     return new URL(`${cover}`, import.meta.url).href
//   }
// }
/**
 * 处理头像图片地址
 * @param {string} cover - 图标值（网络图/本地图/emoji）
 * @returns {string|null} 图片地址 / null（emoji 场景）
 */
function getImageSrc(cover) {
  // 1. 如果是 emoji，返回 null，让插槽生效
  if (isEmoji(cover)) {
    return null;
  }
  // 2. 网络图片直接返回
  if (cover.startsWith('http://') || cover.startsWith('https://')) {
    return cover;
  }
  // 3. 本地图片处理 Vite 路径
  return new URL(`${cover}`, import.meta.url).href;
}

/**
 * 判断是否为 emoji（兼容当前 🎙️，可扩展所有 emoji）
 * @param {string} str - 图标值
 * @returns {boolean}
 */
function isEmoji(str) {
  const emojiRegex = /[\p{Emoji}]/u;
  return emojiRegex.test(str);
}
// 平滑跳转
const scrollToSection = (key) => {
  const el = document.getElementById(key)
  el && el.scrollIntoView({ behavior: 'smooth' })
}

// 新增：卡片点击跳转逻辑
const handleCardClick = (url) => {
  if (url && /^https?:\/\//.test(url)) {
    window.open(url, '_blank') // 新窗口打开链接
  } else {
    alert('暂无可用链接') // 无有效URL时的提示
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important;
}
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 侧边栏样式优化 */
.sidebar {
  width: 240px;
  /* 优化背景色：更柔和的深蓝色，减少压抑感 */
  background: #253347;
  color: #f8fafc; /* 字体更亮，提升可读性 */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* 新增：轻微阴影，区分内容区 */
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
}
.sidebar-header {
  padding: 20px 16px; /* 增加内边距，更宽松 */
  border-bottom: 1px solid #38475c; /* 边框色匹配新背景 */
  display: flex;
  align-items: center;
  gap: 8px;
}
.sidebar-header h1 {
  font-size: 18px; /* 字号稍大 */
  font-weight: 500; /* 字重降低，更柔和 */
  letter-spacing: 0.8px;
  color: #e2e8f0; /* 标题字体色更柔和 */
}
.menu-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px; /* 调整内边距 */
}
.menu-item {
  width: 100%;
  text-align: left;
  padding: 14px 18px; /* 增加点击区域 */
  background: none;
  border: none;
  color: #e2e8f0; /* 菜单文字色提亮 */
  border-radius: 8px; /* 圆角更大，更柔和 */
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px; /* 字号稍大，提升可读性 */
  font-weight: 400;
  transition: background 0.2s ease; /* 过渡更顺滑 */
}
/* 优化hover效果：更柔和的背景色 */
.menu-item:hover {
  background: #475569;
  color: #ffffff; /* hover时文字更白 */
}
.sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid #38475c;
  font-size: 12px;
  color: #94a3b8;
  word-break: break-all;
}

/* 内容区样式（原有样式保留，仅补充） */
.content {
  flex: 1;
  overflow-y: auto;
  background: #f8fafc;
  padding: 24px;
}
.section {
  margin-bottom: 40px;
}
.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
  border-left: 4px solid #3b82f6;
  padding-left: 8px;
  letter-spacing: 0.8px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.card-icon {
  font-size: 24px;
  line-height: 1;
}
.card-info h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1e293b;
}
.card-info p {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}
.favorite-item-image {
  margin-right: 20px;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  will-change: width, height, opacity;
  min-width: 40px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .card-grid { grid-template-columns: 1fr; }
  .sidebar { width: 200px; }
  .content { padding: 16px; }
}
</style>