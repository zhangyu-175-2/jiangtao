<template>
  <div class="url-navigation-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div 
        v-for="(item, index) in navList" 
        :key="index"
        class="nav-item"
        :class="{ active: activeIndex === index }"
        @click="scrollToTarget(index)"
      >
        {{ item.name }}
      </div>
    </aside>

    <!-- 右侧内容区域 -->
    <main class="content">
      <section 
        v-for="(item, index) in navList" 
        :key="index"
        :id="`section-${index}`"
        class="content-section"
      >
        <h2>{{ item.name }}</h2>
        <div class="url-list">
          <a 
            v-for="(url, urlIndex) in item.urls" 
            :key="urlIndex"
            :href="url.link"
            target="_blank"
            class="url-item"
          >
            {{ url.name }}
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// 导航数据（可根据实际需求扩展）
const navList = [
  {
    name: '搜索引擎',
    urls: [
      { name: '百度', link: 'https://www.baidu.com' },
      { name: '谷歌', link: 'https://www.google.com' },
      { name: '必应', link: 'https://www.bing.com' }
    ]
  },
  {
    name: '社交平台',
    urls: [
      { name: '微信', link: 'https://weixin.qq.com' },
      { name: '微博', link: 'https://weibo.com' },
      { name: '抖音', link: 'https://www.douyin.com' }
    ]
  },
  {
    name: '开发工具',
    urls: [
      { name: 'GitHub', link: 'https://github.com' },
      { name: '掘金', link: 'https://juejin.cn' },
      { name: 'Stack Overflow', link: 'https://stackoverflow.com' }
    ]
  },
  {
    name: '视频网站',
    urls: [
      { name: 'B站', link: 'https://www.bilibili.com' },
      { name: '腾讯视频', link: 'https://v.qq.com' },
      { name: '爱奇艺', link: 'https://www.iqiyi.com' }
    ]
  }
]

// 当前激活的导航索引
const activeIndex = ref(0)

// 点击导航项滚动到对应区域
const scrollToTarget = (index) => {
  activeIndex.value = index
  const targetElement = document.getElementById(`section-${index}`)
  if (targetElement) {
    // 平滑滚动到目标位置
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start' // 滚动到顶部
    })
  }
}

// 监听滚动，自动更新激活的导航项（可选增强功能）
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const sectionElements = document.querySelectorAll('.content-section')
  
  sectionElements.forEach((section, index) => {
    const offsetTop = section.offsetTop
    const height = section.offsetHeight
    // 当滚动到当前区域时，更新激活索引
    if (scrollTop >= offsetTop - 100 && scrollTop < offsetTop + height - 100) {
      activeIndex.value = index
    }
  })
}

// 挂载时添加滚动监听，卸载时移除
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始滚动到第一个区域
  scrollToTarget(0)
})

// 组件卸载时移除监听（防止内存泄漏）
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 整体容器样式 */
.url-navigation-container {
  display: flex;
  height: 100vh;
}

/* 左侧侧边栏样式 */
.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px 0;
  position: fixed;
  height: 100%;
  overflow-y: auto;
}

.nav-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #e0e0e0;
}

.nav-item.active {
  background-color: #2196f3;
  color: white;
  font-weight: bold;
}

/* 右侧内容区域样式 */
.content {
  margin-left: 200px;
  padding: 30px;
  width: calc(100% - 200px);
}

.content-section {
  min-height: 80vh; /* 每个区域至少占一屏高度，方便演示滚动 */
  margin-bottom: 50px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.content-section h2 {
  color: #333;
  border-bottom: 2px solid #2196f3;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.url-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.url-item {
  display: block;
  padding: 12px 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.url-item:hover {
  background-color: #2196f3;
  color: white;
  transform: translateY(-2px);
}
</style>