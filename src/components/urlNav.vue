<template>
  <div class="container">
    <!-- 移动端侧边栏开关 -->
    <button 
      class="mobile-sidebar-toggle"
      v-if="isMobile"
      @click="toggleSidebar"
    >
      ☰
    </button>

    <!-- 左侧侧边栏导航（移动端可收起） -->
    <div 
      class="sidebar"
      :class="{ 'sidebar-hidden': isMobile && !sidebarOpen }"
    >
      <div class="sidebar-header">
        <h1>RiverBillowBlog导航</h1>
        <!-- 移动端关闭按钮 -->
        <button 
          class="mobile-close-btn"
          v-if="isMobile"
          @click="toggleSidebar"
        >
          ×
        </button>
      </div>
      <div class="menu-list">
        <button 
          v-for="item in menuItems" 
          :key="item.key"
          @click="handleMenuClick(item.key)"
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
          <div 
            v-for="card in section.cards" 
            :key="card.title" 
            class="card"
            @click="handleCardClick(card.url)"
            @touchstart="handleCardTouchStart"
            @touchend="handleCardTouchEnd"
          >
            <el-avatar
              class="favorite-item-image"
              :size="40"
              :src="getImageSrc(card.icon)"
            >
              <template v-if="isEmoji(card.icon)">
                {{ card.icon }}
              </template>
            </el-avatar>
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
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式判断是否为移动端
const isMobile = ref(false)
// 移动端侧边栏开关状态
const sidebarOpen = ref(false)
// 记录触摸起始时间（优化移动端点击体验）
let touchStartTime = 0

// 导航数据
const menuItems = dataUrlNav.menuItems
const sections = dataUrlNav.sections

// 检测设备类型
const checkDevice = () => {
  const width = window.innerWidth
  isMobile.value = width < 768
  // 移动端默认收起侧边栏
  if (isMobile.value) {
    sidebarOpen.value = false
  } else {
    sidebarOpen.value = true
  }
}

// 切换侧边栏显示/隐藏
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// 菜单点击（移动端点击后自动收起侧边栏）
const handleMenuClick = (key) => {
  scrollToSection(key)
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

// 平滑跳转
const scrollToSection = (key) => {
  const el = document.getElementById(key)
  el && el.scrollIntoView({ behavior: 'smooth' })
}

// 卡片点击跳转逻辑
const handleCardClick = (url) => {
  if (url && /^https?:\/\//.test(url)) {
    window.open(url, '_blank')
  } else {
    alert('暂无可用链接')
  }
}

// 触摸开始（记录时间，区分点击和滑动）
const handleCardTouchStart = () => {
  touchStartTime = Date.now()
}

// 触摸结束（过滤快速滑动，仅处理点击）
const handleCardTouchEnd = (e) => {
  const touchEndTime = Date.now()
  if (touchEndTime - touchStartTime > 300) {
    e.preventDefault()
    return
  }
}

/**
 * 处理头像图片地址
 * @param {string} cover - 图标值（网络图/本地图/emoji）
 * @returns {string|null} 图片地址 / null（emoji 场景）
 */
function getImageSrc(cover) {
  if (isEmoji(cover)) {
    return null
  }
  if (cover.startsWith('http://') || cover.startsWith('https://')) {
    return cover
  }
  return new URL(`${cover}`, import.meta.url).href
}

/**
 * 判断是否为 emoji
 * @param {string} str - 图标值
 * @returns {boolean}
 */
function isEmoji(str) {
  const emojiRegex = /[\p{Emoji}]/u
  return emojiRegex.test(str)
}

// 监听窗口大小变化
onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
})
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
  /* 移动端防止横向滚动 */
  width: 100vw;
  max-width: 100%;
}

/* 移动端侧边栏开关按钮 */
.mobile-sidebar-toggle {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #253347;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* 移动端侧边栏关闭按钮 */
.mobile-close-btn {
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
}

/* 侧边栏样式 */
.sidebar {
  width: 240px;
  background: #253347;
  color: #f8fafc;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  /* 移动端侧边栏过渡动画 */
  transition: transform 0.3s ease;
  z-index: 998;
}

/* 移动端隐藏侧边栏 */
.sidebar-hidden {
  transform: translateX(-100%);
}

.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid #38475c;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sidebar-header h1 {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: #e2e8f0;
}
.menu-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px;
}
.menu-item {
  width: 100%;
  text-align: left;
  padding: 14px 18px;
  background: none;
  border: none;
  color: #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  transition: background 0.2s ease;
  /* 增大移动端触控区域 */
  min-height: 48px;
}
.menu-item:hover {
  background: #475569;
  color: #ffffff;
}
.sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid #38475c;
  font-size: 12px;
  color: #94a3b8;
  word-break: break-all;
}

/* 内容区样式 */
.content {
  flex: 1;
  overflow-y: auto;
  background: #f8fafc;
  padding: 24px;
  /* 移动端内容区适配 */
  padding-top: 60px;
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
  /* 移动端触控优化 */
  min-height: 80px;
  align-items: center;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transform: translateY(-2px);
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

/* 响应式适配 */
/* 平板端 (768px - 1200px) */
@media (max-width: 1200px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
  .sidebar { width: 200px; }
  .content { padding: 16px; padding-top: 20px; }
}

/* 移动端 (<768px) */
@media (max-width: 768px) {
  .mobile-sidebar-toggle {
    display: flex;
  }
  .card-grid { 
    grid-template-columns: 1fr; 
    gap: 12px;
  }
  .sidebar { 
    width: 280px; /* 移动端侧边栏更宽，提升操作体验 */
    position: fixed;
    top: 0;
    left: 0;
  }
  .content { 
    padding: 12px; 
    padding-top: 60px;
  }
  .section {
    margin-bottom: 24px;
  }
  .section-title {
    font-size: 18px;
    margin-bottom: 12px;
  }
  .card {
    padding: 12px;
    gap: 10px;
  }
  .card-info h3 {
    font-size: 14px;
  }
  .card-info p {
    font-size: 11px;
  }
  .favorite-item-image {
    margin-right: 10px;
    min-width: 36px;
  }
}

/* 小屏手机 (<480px) */
@media (max-width: 480px) {
  .sidebar {
    width: 250px;
  }
  .content {
    padding: 8px;
    padding-top: 50px;
  }
  .menu-item {
    padding: 12px 14px;
    font-size: 14px;
  }
  .sidebar-header h1 {
    font-size: 16px;
  }
}
</style>