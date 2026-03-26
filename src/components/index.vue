<template>
  <div class="index-page-container">
    <loader :loading="loading">
      <!-- 加载页面 -->
      <template v-slot:loader>
        <div>
          <zombie></zombie>
        </div>
      </template>
      <!-- 内容页面 -->
      <template v-slot:body>
        <!-- 首页图片 -->
        <el-image
          :style="bannerStyle"
          class="background-image-index"
          lazy
          :src="'./assets/backgroundPicture.jpg'          "
          fit="cover"
        >
        <!-- :src="
            !$common.isEmpty(mainStore.webInfo.backgroundImage)
              ? mainStore.webInfo.backgroundImage
              : !$common.isEmpty(mainStore.webInfo.randomCover) &&
                mainStore.webInfo.randomCover.length > 0
              ? mainStore.webInfo.randomCover[
                  Math.floor(
                    Math.random() * mainStore.webInfo.randomCover.length
                  )
                ]
              : './assets/backgroundPicture.jpg'
          " -->
          <template v-slot:error>
            <div
              class="image-slot background-image-index-error"
              :style="bannerStyle"
            ></div>
          </template>
        </el-image>
        <!-- 首页文字 -->
        <div
          class="signature-wall myCenter my-animation-hideToShow"
          :style="bannerStyle"
        >
          <h1 class="playful">
            {{ mainStore.webInfo.webTitle }}
          </h1>
          <div class="printer" @click="getGuShi()">
            <printer :printerInfo="printerInfo">
              <template v-slot:paper="scope">
                <h3>{{ scope.content }}<span class="cursor">|</span></h3>
              </template>
            </printer>
          </div>
          <div id="bannerWave1"></div>
          <div id="bannerWave2"></div>
          <i
            class="fa fa-angle-down el-icon-arrow-down"
            aria-hidden="true"
            @click="navigation('.page-container-wrap')"
          ></i>
        </div>
        <!-- 首页内容 -->
        <div class="page-container-wrap">
          <div v-if="deferredContentReady" class="page-container">
            <div class="aside-content" v-if="showAside">
              <myAside
                @selectSort="selectSort"
                @selectArticle="selectArticle"
              ></myAside>
            </div>
            <div class="recent-posts">
              <div class="announcement background-opacity">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
                <div>
                  <div
                    v-for="(notice, index) in getNotifications()"
                    :key="index"
                  >
                    {{ notice }}
                  </div>
                </div>
              </div>

              <div v-show="indexType === 1">
                <div v-for="(sort, index) in sortInfo" :key="index">
                  <div v-if="!$common.isEmpty(sortArticles[sort.id])">
                    <div class="sort-article-first">
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          width="20"
                          height="20"
                          style="vertical-align: -0.15em"
                        >
                          <path
                            d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z"
                            fill="#FF623E"
                          ></path>
                        </svg>
                        {{ sort.sortName }}
                      </div>
                      <div
                        class="article-more"
                        @click="$router.push('/sort/' + sort.id)"
                      >
                        <svg
                          viewBox="0 0 1024 1024"
                          width="20"
                          height="20"
                          style="vertical-align: -0.15em"
                        >
                          <path
                            d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z"
                            fill="#009F72"
                          ></path>
                          <path
                            d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z"
                            fill="#F9DB88"
                          ></path>
                        </svg>
                        MORE
                      </div>
                    </div>
                    <sortArticle
                      :articleList="sortArticles[sort.id]"
                    ></sortArticle>
                  </div>
                </div>
              </div>

              <div v-show="indexType === 2">
                <articleList
                  :articleList="articles"
                  :searchKey="pagination.articleSearch"
                ></articleList>
                <div class="pagination-wrap">
                  <div
                    @click="pageArticles()"
                    class="pagination"
                    v-if="articles.length < pagination.total"
                  >
                    下一页
                  </div>
                  <div v-else style="user-select: none">~~到底啦~~</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 页脚 -->
        <div v-if="deferredContentReady" style="background: var(--background)">
          <myFooter></myFooter>
        </div>
      </template>
    </loader>

    <el-dialog
      title="每日推荐"
      v-model="pushDialogVisible"
      width="60%"
      :append-to-body="true"
      custom-class="centered-dialog"
      :close-on-click-modal="false"
      class="index-push"
      center
    >
      <div style="display: flex; align-items: center; flex-direction: column">
        <div class="push-title">
          {{ push['标题'] }}
        </div>

        <el-image class="push-el-image" lazy :src="push['封面']" fit="cover">
        </el-image>

        <div class="push-button" @click="pushUrl(push['链接'])">
          <span class="push-button-title">立即前往</span>
          <span class="push-button-car">
            <svg viewBox="0 0 1024 1024" width="40" height="40">
              <path
                d="M399.502 655.103c0 7.902-6.665 14.311-14.88 14.311H72.188c-8.215 0-14.875-6.407-14.875-14.311v-28.634c0-7.913 6.66-14.315 14.875-14.315h312.435c8.217 0 14.88 6.402 14.88 14.315l-0.001 28.634zM968.167 655.103c0 7.902-6.664 14.311-14.882 14.311H640.851c-8.216 0-14.877-6.407-14.877-14.311v-28.634c0-7.913 6.661-14.315 14.877-14.315h312.436c8.218 0 14.882 6.402 14.882 14.315l-0.002 28.634z"
                fill="#EA0606"
              ></path>
              <path
                d="M968.097 624.008c0 11.563-17.723 20.937-39.583 20.937H97.263c-21.858 0-39.579-9.372-39.579-20.937v-41.876c0-11.562 17.72-20.935 39.579-20.935h831.25c21.86 0 39.583 9.373 39.583 20.935v41.876zM855.003 526.553h-12c0-161.793-151.025-293.421-336.66-293.421-185.633 0-336.656 131.628-336.656 293.421h-12c0-41.334 9.261-81.425 27.527-119.161 17.612-36.384 42.807-69.046 74.886-97.079 65.813-57.509 153.264-89.181 246.243-89.181 92.981 0 180.434 31.672 246.247 89.181 32.079 28.032 57.274 60.693 74.887 97.079 18.264 37.734 27.526 77.826 27.526 119.161z"
                fill="#EA0606"
              ></path>
              <path
                d="M1001.996 588.091c-121.146 13.91-980.875 0-980.875 0s-30.62-203.887 241.944-144.555c171.281-1.178 273.436 0 489.644 0 193.07-59.332 283.186 108.642 249.287 144.555z"
                fill="#EA0606"
              ></path>
              <path d="M500.343 214.379h12v330.342h-12z" fill="#EA0606"></path>
              <path
                d="M333.217 657.192c0 46.174-38.961 83.602-87.029 83.602-48.056 0-87.021-37.428-87.021-83.602 0-46.172 38.963-83.588 87.021-83.588 48.067 0 87.029 37.417 87.029 83.588z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M246.188 743.794c-49.638 0-90.021-38.85-90.021-86.602 0-47.745 40.383-86.588 90.021-86.588 49.642 0 90.029 38.843 90.029 86.588 0 47.752-40.387 86.602-90.029 86.602z m0-167.19c-46.329 0-84.021 36.151-84.021 80.588 0 44.444 37.692 80.602 84.021 80.602 46.333 0 84.029-36.157 84.029-80.602 0-44.436-37.696-80.588-84.029-80.588z"
                fill="#440A0A"
              ></path>
              <path
                d="M309.872 656.757c0 33.159-27.986 60.035-62.491 60.035-34.51 0-62.487-26.876-62.487-60.035 0-33.16 27.977-60.022 62.487-60.022 34.505 0.001 62.491 26.862 62.491 60.022z"
                fill="#440A0A"
              ></path>
              <path
                d="M271.322 657.558c0 11.747-9.918 21.282-22.151 21.282-12.237 0-22.152-9.535-22.152-21.282 0-11.758 9.916-21.277 22.152-21.277 12.233-0.002 22.151 9.519 22.151 21.277z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M875.521 642.811c0 46.175-38.963 83.603-87.027 83.603-48.061 0-87.021-37.428-87.021-83.603 0-46.173 38.962-83.587 87.021-83.587 48.066 0 87.027 37.414 87.027 83.587z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M788.494 729.413c-49.638 0-90.021-38.85-90.021-86.603 0-47.744 40.384-86.587 90.021-86.587 49.642 0 90.027 38.843 90.027 86.587 0 47.753-40.385 86.603-90.027 86.603z m0-167.189c-46.33 0-84.021 36.151-84.021 80.587 0 44.444 37.691 80.603 84.021 80.603 46.333 0 84.027-36.158 84.027-80.603 0-44.436-37.694-80.587-84.027-80.587z"
                fill="#440A0A"
              ></path>
              <path
                d="M852.174 642.374c0 33.159-27.979 60.037-62.486 60.037-34.512 0-62.487-26.878-62.487-60.037 0-33.161 27.977-60.023 62.487-60.023 34.506-0.001 62.486 26.862 62.486 60.023z"
                fill="#440A0A"
              ></path>
              <path
                d="M813.628 643.173c0 11.75-9.919 21.278-22.153 21.278-12.233 0-22.151-9.528-22.151-21.278 0-11.759 9.919-21.275 22.151-21.275 12.235-0.002 22.153 9.516 22.153 21.275z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M518.135 469.838h56.847v12.556h-56.847z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M522.818 468.694c0 7.902-0.648 14.309-1.445 14.309h-30.37c-0.799 0-1.446-6.406-1.446-14.309V440.06c0-7.912 0.647-14.315 1.446-14.315h30.37c0.797 0 1.445 6.403 1.445 14.315v28.634z"
                fill="#EA0606"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import { useMainStore } from '@/stores/main'
import { pushNotification } from '@/utils/notification-utils'
import { fyjk3 } from '@/assets/data.js'

export default {
  components: {
    loader: defineAsyncComponent(() => import('./common/loader')),
    zombie: defineAsyncComponent(() => import('./common/zombie')),
    printer: defineAsyncComponent(() => import('./common/printer')),
    articleList: defineAsyncComponent(() => import('./articleList')),
    sortArticle: defineAsyncComponent(() => import('./common/sortArticle')),
    myFooter: defineAsyncComponent(() => import('./common/myFooter')),
    myAside: defineAsyncComponent(() => import('./myAside')),
  },
  data() {
    return {
      deferredContentReady: false,
      pushDialogVisible: false,
      push: {},
      loading: false,
      showAside: true,
      indexType: 1,
      printerInfo: '你看对面的青山多漂亮',
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        sortId: null,
        articleSearch: '',
      },
      guShi: {
        content: '',
        origin: '',
        author: '',
        category: '',
      },
      articles: [],
      sortArticles: {},
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/sort') {
        this.indexType = 1
        this.showAside = false
      } else {
        this.indexType = 1
        this.showAside = true
      }
    },
  },
  beforeUnmount() {
    // 移除全局事件监听器
    $off(this.$root, 'articleSaved')
    $off(this.$root, 'resetIndexPage')
  },
  computed: {
    mainStore() {
      return useMainStore()
    },
    sortInfo() {
      return this.mainStore.sortInfo
    },
    bannerStyle() {
      const height = this.mainStore.webInfo.homePagePullUpHeight
      let finalHeight = '50vh'

      if (typeof height === 'number' && height >= 0 && height <= 100) {
        finalHeight = `${height}vh`
      }

      return {
        height: finalHeight,
        animation: 'header-effect 2s',
      }
    },
  },
  mounted() {
    this.scheduleDeferredContentLoad()

    // 监听文章保存成功事件，自动刷新文章列表
    $on(this.$root, 'articleSaved', () => {
      // 先清除本地缓存
      this.sortArticles = {}

      // 添加延迟，确保后端缓存清除完成
      setTimeout(() => {
        this.getSortArticles()
      }, 1000) // 延迟1秒
    })

    // 监听首页重置事件
    $on(this.$root, 'resetIndexPage', () => {
      this.resetToHomePage()
    })

    setTimeout(() => {
      try {
        // 安全地获取网站信息和通知数据
        const webInfo = this.mainStore.webInfo
        const notices = webInfo && webInfo.notices ? webInfo.notices : null

        this.push = pushNotification(notices, false)
        if (!this.$common.isEmpty(this.push)) {
          if (
            '0' !==
            localStorage.getItem('showPushNotification_' + this.push['链接'])
          ) {
            this.pushDialogVisible = true
            localStorage.setItem(
              'showPushNotification_' + this.push['链接'],
              '0'
            )
          }
        }
      } catch (error) {
        console.error('处理推送通知时发生错误:', error)
        // 设置默认值，防止页面崩溃
        this.push = {}
      }
    }, 2000)
  },
  methods: {
    runWhenIdle(task) {
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => task(), { timeout: 1200 })
        return
      }

      setTimeout(() => task(), 0)
    },
    scheduleDeferredContentLoad() {
      this.runWhenIdle(async () => {
        this.deferredContentReady = true
        this.getGuShi()
        this.getSortArticles()
      })
    },
    /**
     * 重置到首页状态
     */
    resetToHomePage() {
      // 重置 indexType 为 1（正常首页模式）
      this.indexType = 1

      // 重置分页数据
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        sortId: null,
        articleSearch: '',
      }

      // 清空文章列表
      this.articles = []

      // 恢复公告栏样式
      this.$nextTick(() => {
        try {
          const announcementEl = document.querySelector('.announcement')
          if (announcementEl) {
            announcementEl.style.maxWidth = ''
          }
        } catch (error) {}

        // 滚动到顶部
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      })
    },

    /**
     * 安全地获取通知列表
     */
    getNotifications() {
      try {
        const webInfo = this.mainStore.webInfo
        const notices = webInfo && webInfo.notices ? webInfo.notices : null
        return pushNotification(notices, true)
      } catch (error) {
        console.error('获取通知列表时发生错误:', error)
        return []
      }
    },

    async selectSort(sort) {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        sortId: sort.id,
        articleSearch: '',
      }
      this.articles = []
      await this.getArticles()
      this.$nextTick(() => {
        this.indexType = 2

        // 安全地设置公告栏样式
        try {
          const announcementEl = document.querySelector('.announcement')
          if (announcementEl) {
            announcementEl.style.maxWidth = '780px'
          }
        } catch (error) {}

        // 安全地滚动到内容区域
        try {
          const recentPostsEl = document.querySelector('.recent-posts')
          if (recentPostsEl) {
            recentPostsEl.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            })
          }
        } catch (error) {}
      })
    },
    async selectArticle(articleSearch) {
      // 如果搜索词为空，返回到正常首页
      if (!articleSearch || !articleSearch.trim()) {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: '',
          sortId: null,
          articleSearch: '',
        }
        this.articles = []
        await this.getArticles()
        this.$nextTick(() => {
          this.indexType = 1 // 返回到首页模式

          // 恢复公告栏样式
          try {
            const announcementEl = document.querySelector('.announcement')
            if (announcementEl) {
              announcementEl.style.maxWidth = ''
            }
          } catch (error) {}
        })
        return
      }

      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        sortId: null,
        articleSearch: articleSearch,
      }
      this.articles = []
      await this.getArticles()
      this.$nextTick(() => {
        this.indexType = 2

        // 安全地设置公告栏样式
        try {
          const announcementEl = document.querySelector('.announcement')
          if (announcementEl) {
            announcementEl.style.maxWidth = '780px'
          }
        } catch (error) {}

        // 安全地滚动到内容区域
        try {
          const recentPostsEl = document.querySelector('.recent-posts')
          if (recentPostsEl) {
            recentPostsEl.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            })
          }
        } catch (error) {}
      })
    },
    pageArticles() {
      this.pagination.current = this.pagination.current + 1
      this.getArticles()
    },

    async getArticles() {
      const res =  fyjk3
      if (!this.$common.isEmpty(res.data)) {
        this.articles = this.articles.concat(res.data.records)
        this.pagination.total = res.data.total
      }
      // await this.$http
        // .post(this.$constant.baseURL + '/article/listArticle', this.pagination)
        // .then((res) => {
        //   if (!this.$common.isEmpty(res.data)) {
        //     this.articles = this.articles.concat(res.data.records)
        //     this.pagination.total = res.data.total
        //   }
        // })
        // .catch((error) => {
        //   this.$message({
        //     message: error.message,
        //     type: 'error',
        //   })
        // })
    },
    getSortArticles() {
      // 添加时间戳参数，避免浏览器缓存
      // 替换接口数据
      const res={
          "code": 200,
          "message": null,
          "data": {
        "2": [
            {
                "id": 4,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "OpenClaw+QQ官方Bot轻量级服务器安装部署指南",
                "articleContent": " 前言\n最近 OpenClaw 的热度很高，作为一款宣称可以实际执行任务的 AI 智能体框架，它的应用潜力引起了我的注意。很多人认为部署这类 AI 框架门槛...",
                "viewCount": 9,
                "commentStatus": true,
                "recommendStatus": true,
                "videoUrl": null,
                "password": null,
                "tips": "密码",
                "viewStatus": true,
                "createTime": "2026-03-09 18:28:49",
                "updateTime": "2026-03-21 16:03:33",
                "updateBy": "River Billow",
                "sortId": 2,
                "labelId": 5,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 2,
                    "sortName": "Linux运维入门",
                    "sortDescription": "Linux运维入门相关操作",
                    "sortType": 0,
                    "priority": 99,
                    "countOfSort": 3,
                    "labels": null
                },
                "label": {
                    "id": 5,
                    "sortId": 2,
                    "labelName": "openclaw",
                    "labelDescription": "openclaw及其相关知识",
                    "countOfLabel": 1
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "本文详细记录了在低配云服务器上部署OpenClaw AI智能体框架，并成功对接QQ机器人的全过程。文章分享了环境配置、核心安装、插件集成以及常见问题的避坑经验，旨在帮助读者快速上手并利用该框架提升自动化任务处理效率。",
                "submitToSearchEngine": true,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "Linux运维入门",
                "labelName": "openclaw",
                "articleUrl": "https://leapya.com/article/4",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            },
            {
                "id": 3,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "Docker安装与入门保姆级教程",
                "articleContent": " 简介\n\n说实话，没接触过 Docker 之前，我在服务器上装环境着实折腾了不少时间——装完 Java 发现版本不对，装完 MySQL 发现和系统库冲突……...",
                "viewCount": 13,
                "commentStatus": true,
                "recommendStatus": false,
                "videoUrl": null,
                "password": null,
                "tips": null,
                "viewStatus": true,
                "createTime": "2026-02-23 23:55:12",
                "updateTime": "2026-03-21 15:58:39",
                "updateBy": "River Billow",
                "sortId": 2,
                "labelId": 4,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 2,
                    "sortName": "Linux运维入门",
                    "sortDescription": "Linux运维入门相关操作",
                    "sortType": 0,
                    "priority": 99,
                    "countOfSort": 3,
                    "labels": null
                },
                "label": {
                    "id": 4,
                    "sortId": 2,
                    "labelName": "Docker",
                    "labelDescription": "Docker相关",
                    "countOfLabel": 1
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "Docker教程：从零安装到实战，涵盖核心概念、常用命令及多容器项目部署，解决环境配置难题。",
                "submitToSearchEngine": true,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "Linux运维入门",
                "labelName": "Docker",
                "articleUrl": "https://leapya.com/article/3",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            },
            {
                "id": 1,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "Debian 与 Ubuntu 安装 Fail2Ban 实现 SSH 自动封禁 IP 防暴力破解教程（保姆级教程）",
                "articleContent": " 简介\n本教程将详细介绍如何在 Debian 和 Ubuntu 系统中安装与配置 Fail2Ban，通过监控 /var/log/auth.log 自动识别 ...",
                "viewCount": 33,
                "commentStatus": true,
                "recommendStatus": false,
                "videoUrl": null,
                "password": null,
                "tips": "123456",
                "viewStatus": true,
                "createTime": "2026-01-29 17:20:36",
                "updateTime": "2026-02-06 00:31:12",
                "updateBy": "River Billow",
                "sortId": 2,
                "labelId": 2,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 2,
                    "sortName": "Linux运维入门",
                    "sortDescription": "Linux运维入门相关操作",
                    "sortType": 0,
                    "priority": 99,
                    "countOfSort": 3,
                    "labels": null
                },
                "label": {
                    "id": 2,
                    "sortId": 2,
                    "labelName": "服务器安全",
                    "labelDescription": "服务器安全",
                    "countOfLabel": 1
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "本教程介绍在Debian/Ubuntu系统安装配置Fail2Ban，通过监控日志自动封禁SSH暴力破解IP，提升服务器安全。",
                "submitToSearchEngine": false,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "Linux运维入门",
                "labelName": "服务器安全",
                "articleUrl": "https://leapya.com/article/1",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            }
        ],
        "3": [
            {
                "id": 2,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "2026年最新 教你0元搭建雨云自动签到，每日自动领积分续费（保姆级教程）",
                "articleContent": "众所周知，雨云（Rainyun）的签到能领积分，积分能换主机。但是每天手动签到太麻烦，买台服务器挂脚本又有点\"杀鸡焉用牛刀\"（而且甚至可能签到的积分还不够服务器...",
                "viewCount": 62,
                "commentStatus": true,
                "recommendStatus": true,
                "videoUrl": null,
                "password": null,
                "tips": "密码",
                "viewStatus": true,
                "createTime": "2026-02-03 14:16:19",
                "updateTime": "2026-02-06 00:04:37",
                "updateBy": "River Billow",
                "sortId": 3,
                "labelId": 3,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 3,
                    "sortName": "白嫖教程",
                    "sortDescription": "主要分享一些可以免费白嫖的福利",
                    "sortType": 0,
                    "priority": 1,
                    "countOfSort": 1,
                    "labels": null
                },
                "label": {
                    "id": 3,
                    "sortId": 3,
                    "labelName": "雨云自动签到",
                    "labelDescription": "聚合全网最新的雨云（Rainyun）自动签到解决方案。无论你是寻找 GitHub Actions 0元挂机脚本、宝塔面板定时任务代码，还是 Docker 部署教程，这里都有。教你如何实现每日自动领积分，轻松免费续费或白嫖云服务器。",
                    "countOfLabel": 1
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "利用GitHub Actions免费全自动完成雨云每日签到，无需服务器。支持验证码、通知，三步即可搭建。",
                "submitToSearchEngine": true,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "白嫖教程",
                "labelName": "雨云自动签到",
                "articleUrl": "https://leapya.com/article/2",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            }
        ],
        "4": [
            {
                "id": 7,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "备考蓝桥杯 Python B 组 Day3：洛谷入门3刷题记",
                "articleContent": "1. 在python中转字符串、整型转换是极其消耗时间的事情，容易引发超时，在[NOIP 2013 普及组] 计数问题这个题目中，我在循环嵌套里一直转字符串...",
                "viewCount": 1,
                "commentStatus": true,
                "recommendStatus": false,
                "videoUrl": null,
                "password": null,
                "tips": null,
                "viewStatus": true,
                "createTime": "2026-03-13 00:11:45",
                "updateTime": "2026-03-13 00:11:45",
                "updateBy": null,
                "sortId": 4,
                "labelId": 6,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 4,
                    "sortName": "蓝桥杯",
                    "sortDescription": "蓝桥杯备考",
                    "sortType": 0,
                    "priority": 1,
                    "countOfSort": 3,
                    "labels": null
                },
                "label": {
                    "id": 6,
                    "sortId": 4,
                    "labelName": "洛谷",
                    "labelDescription": "洛谷，主要刷完基础1-6",
                    "countOfLabel": 3
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "循环内频繁类型转换易致超时，需培养数学思维优化暴力解法。",
                "submitToSearchEngine": true,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "蓝桥杯",
                "labelName": "洛谷",
                "articleUrl": "https://leapya.com/article/7",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            },
            {
                "id": 6,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "备考蓝桥杯 Day2：分支结构",
                "articleContent": "![image.png](/static/articlePicture/LeapYa11773163431463928.webp)\n\n今天按计划刷洛谷的【入门2...",
                "viewCount": 0,
                "commentStatus": true,
                "recommendStatus": false,
                "videoUrl": null,
                "password": null,
                "tips": null,
                "viewStatus": true,
                "createTime": "2026-03-11 01:26:45",
                "updateTime": "2026-03-11 01:26:45",
                "updateBy": null,
                "sortId": 4,
                "labelId": 6,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 4,
                    "sortName": "蓝桥杯",
                    "sortDescription": "蓝桥杯备考",
                    "sortType": 0,
                    "priority": 1,
                    "countOfSort": 3,
                    "labels": null
                },
                "label": {
                    "id": 6,
                    "sortId": 4,
                    "labelName": "洛谷",
                    "labelDescription": "洛谷，主要刷完基础1-6",
                    "countOfLabel": 3
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "练习中遇到条件嵌套和逻辑混乱问题。学习了f-string格式化(:g)和模拟优于复杂公式的思路。",
                "submitToSearchEngine": true,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "蓝桥杯",
                "labelName": "洛谷",
                "articleUrl": "https://leapya.com/article/6",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            },
            {
                "id": 5,
                "userId": 1,
                "articleCover": "/static/randomCover/LeapYa11770000181478338.webp",
                "articleTitle": "备考蓝桥杯 Python B 组 Day1：洛谷入门1刷题记录与基础语法速查笔记",
                "articleContent": "进入专升本后的第一个学年，课业并不轻松，眨眼马上又要就业了。为了能轻松拿下蓝桥杯，我选择了有些基础的 Python，主打一个性价比，不再想花大量时间去折腾 C+...",
                "viewCount": 7,
                "commentStatus": true,
                "recommendStatus": false,
                "videoUrl": null,
                "password": null,
                "tips": null,
                "viewStatus": true,
                "createTime": "2026-03-10 01:31:52",
                "updateTime": "2026-03-10 02:47:40",
                "updateBy": "River Billow",
                "sortId": 4,
                "labelId": 6,
                "commentCount": 0,
                "username": "River Billow",
                "sort": {
                    "id": 4,
                    "sortName": "蓝桥杯",
                    "sortDescription": "蓝桥杯备考",
                    "sortType": 0,
                    "priority": 1,
                    "countOfSort": 3,
                    "labels": null
                },
                "label": {
                    "id": 6,
                    "sortId": 4,
                    "labelName": "洛谷",
                    "labelDescription": "洛谷，主要刷完基础1-6",
                    "countOfLabel": 3
                },
                "hasVideo": false,
                "title": null,
                "content": null,
                "classify": null,
                "cover": null,
                "summary": "备赛蓝桥杯学生分享Python学习笔记，总结新手常见误区与核心语法模板，旨在高效刷题。",
                "submitToSearchEngine": true,
                "matchedLanguage": null,
                "isTranslationMatch": null,
                "hasTranslationMatch": null,
                "sortName": "蓝桥杯",
                "labelName": "洛谷",
                "articleUrl": "https://leapya.com/article/5",
                "translatedTitle": null,
                "translatedContent": null,
                "skipAiTranslation": null,
                "pendingTranslationTitle": null,
                "pendingTranslationContent": null,
                "pendingTranslationLanguage": null,
                "articleThemeConfig": null,
                "payType": 0,
                "payAmount": null,
                "freePercent": 30,
                "paywalled": null,
                "paidCount": null
            }
        ]
          },
          "currentTimeMillis": 1774346143312,
          "success": true
      }
      this.sortArticles = res.data
      // const timestamp = Date.now()
      // const url = `${this.$constant.baseURL}/article/listSortArticle?t=${timestamp}`

      // this.$http
      //   .get(url)
      //   .then((res) => {
      //     if (!this.$common.isEmpty(res.data)) {
      //       this.sortArticles = res.data
      //     } else {
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('获取分类文章列表失败:', error)
      //     this.$message({
      //       message: error.message,
      //       type: 'error',
      //     })
      //   })
    },
    navigation(selector) {
      let pageId = document.querySelector(selector)
      window.scrollTo({
        top: pageId.offsetTop,
        behavior: 'smooth',
      })
    },
    pushUrl(url) {
      window.open(url)
    },
    getGuShi() {
      let that = this
      let xhr = new XMLHttpRequest()
      xhr.open('get', this.$constant.jinrishici)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          that.guShi = JSON.parse(xhr.responseText)
          that.printerInfo = that.guShi.content
        }
      }
      xhr.send()
    },
    getPlatformName(provider) {
      const platformNames = {
        gitee: 'Gitee',
        github: 'GitHub',
        google: 'Google',
        yandex: 'Yandex',
        x: 'Twitter',
        qq: 'QQ',
        baidu: 'Baidu',
      }
      return platformNames[provider] || provider
    },
  },
}
</script>

<style scoped>
.background-image-index {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  transition: height 0.5s ease-in-out;
}
.background-image-index::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  content: '';
}
.background-image-index-error {
  background-color: var(--lightGreen);
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.signature-wall {
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  overflow: hidden;
}
.playful {
  color: var(--white);
  font-size: 40px;
}
.sort-article-first {
  margin: 40px auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--greyFont);
  border-bottom: 1px dashed var(--lightGray);
  padding-bottom: 0.5em;
  line-height: 1.6;
}
.article-more {
  cursor: pointer;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.article-more:hover {
  color: var(--lightGreen);
  font-weight: 700;
  transform: scale(1.1);
}
.printer {
  cursor: pointer;
  color: var(--white);
  background: var(--translucent);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
#bannerWave1 {
  height: 84px;
  background: var(--bannerWave1);
  position: absolute;
  width: 200%;
  bottom: 0;
  z-index: 10;
  animation: gradientBG 120s linear infinite;
}
#bannerWave2 {
  height: 100px;
  background: var(--bannerWave2);
  position: absolute;
  width: 400%;
  bottom: 0;
  z-index: 5;
  animation: gradientBG 120s linear infinite;
}
@media screen and (max-width: 768px) {
  #bannerWave1 {
    width: 400% !important;
    animation: gradientBG 40s linear infinite !important;
  }
  #bannerWave2 {
    width: 600% !important;
    animation: gradientBG 40s linear infinite !important;
  }
}
@media screen and (max-width: 480px) {
  #bannerWave1 {
    width: 400% !important;
    animation: gradientBG 30s linear infinite !important;
  }
  #bannerWave2 {
    width: 600% !important;
    animation: gradientBG 30s linear infinite !important;
  }
}
.cursor {
  margin-left: 1px;
  animation: hideToShow 0.7s infinite;
  font-weight: 200;
}
.el-icon-arrow-down {
  font-size: 40px;
  font-weight: bold;
  color: var(--white);
  position: absolute;
  bottom: 60px;
  animation: my-shake 1.5s ease-out infinite;
  z-index: 15;
  cursor: pointer;
}
.page-container-wrap {
  background: var(--background);
  position: relative;
}
.page-container {
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 0 20px 40px 20px;
  margin: 0 auto;
  flex-direction: row;
}
.recent-posts {
  width: 70%;
}
.announcement {
  padding: 22px;
  border: 1px dashed var(--lightGray);
  color: var(--greyFont);
  border-radius: 10px;
  display: flex;
  margin: 40px auto 40px;
}
.announcement i {
  color: var(--themeBackground);
  font-size: 22px;
  margin: auto 0;
  animation: scale 0.8s ease-in-out infinite;
}
.announcement div div {
  margin-left: 20px;
  line-height: 30px;
}
.aside-content {
  width: calc(30% - 40px);
  user-select: none;
  margin-top: 40px;
  margin-right: 40px;
  max-width: 300px;
  float: right;
}
.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.pagination {
  padding: 13px 15px;
  border: 1px solid var(--lightGray);
  border-radius: 3rem;
  color: var(--greyFont);
  width: 100px;
  user-select: none;
  cursor: pointer;
  text-align: center;
}
.pagination:hover {
  border: 1px solid var(--themeBackground);
  color: var(--themeBackground);
  box-shadow: 0 0 5px var(--themeBackground);
}
.push-title {
  font-weight: bold;
  font-size: 20px;
}
.push-el-image {
  width: 80%;
  min-height: 100px;
  max-height: 400px;
  border-radius: 15px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.push-button {
  position: relative;
  background: var(--lightGreen);
  cursor: pointer;
  width: 230px;
  border-radius: 2rem;
  line-height: 35px;
  color: var(--white);
}
.push-button-title {
  margin-left: 20px;
  font-weight: bold;
}
.push-button-car {
  position: absolute;
  margin-left: 55px;
  animation: passing 4s linear infinite;
}
@media screen and (max-width: 1100px) {
  .recent-posts {
    width: 100%;
  }
  .page-container {
    width: 100%;
  }
}
@media screen and (max-width: 1000px) {
  .page-container {
    flex-direction: column;
  }
  .aside-content {
    width: 100%;
    max-width: unset;
    float: unset;
    margin: 40px auto 0;
  }
}
@media screen and (max-width: 768px) {
  h1 {
    font-size: 35px;
  }
}
</style>
