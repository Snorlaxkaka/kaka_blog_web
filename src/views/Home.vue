<!--
 * @Author: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @Date: 2025-07-30 15:16:31
 * @LastEditors: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @LastEditTime: 2025-07-30 15:52:49
 * @FilePath: \kaka_blog_web\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mb-9">
    <div class="mb-7">
      <div class="bgImg d-flex jc-center" id="header">
        <div class="text-white d-flex jc-center ai-center">
          <span class="shouye-text">chengfen的个人前端博客</span>
        </div>
        <div class="arrow-down">
          <i class="iconfont icon-down" @click="downPage"></i>
        </div>
      </div>
    </div>
    <div class="articles-container">
      <div v-for="(article, i) in articles" :key="i" class="article-item">
        <div class="article-card">
          <div class="article-title">
            <div>
              <router-link :to="`/article/list/${article._id}`">{{
                article.title
              }}</router-link>
            </div>
          </div>
          <div class="article-meta">
            <div class="article-date">
              <i class="iconfont icon-riqi2"></i>
              <span>{{ article.createdAt | date("YYYY-MM-DD") }}</span>
            </div>
            <div class="article-category">
              <router-link :to="`/tags`">
                <i class="iconfont icon-sort"></i>
                {{ article.categories[0].name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10" v-if="articles.length > 0">
      <div class="page-navigator d-flex jc-center">
        <div
          :class="{ current: 1 == pagination.currentPage }"
          class="mx-4 hand fs-md"
        >
          <a @click="goToPage(1)" data-hover="首页">
            <span class="text-grey-1">首页</span>
          </a>
        </div>
        <div class="mx-4 hand fs-md">
          <a @click="prev()">
            <span class="text-grey-1">&laquo;</span>
          </a>
        </div>
        <div
          class="mx-4 hand fs-md"
          :class="{ current: article == pagination.currentPage }"
          v-for="article in pagination.totalPage"
          :key="article"
        >
          <a
            @click="goToPage(article)"
            :data-hover="article"
            class="text-grey-1"
          >
            {{ article }}
          </a>
        </div>

        <div class="mx-4 hand fs-md">
          <a @click="next()">
            <span class="text-grey-1">&raquo;</span>
          </a>
        </div>
        <div
          class="mx-4 hand fs-md"
          :class="{ current: pagination.totalPage == pagination.currentPage }"
        >
          <a @click="goToPage(pagination.totalPage)" data-hover="末页">
            <span class="text-grey-1">末页</span>
          </a>
        </div>
        <div class="current mx-4 fs-md">
          <span class="text-grey-1">
            第{{ pagination.currentPage }}页 / 共{{ pagination.totalPage }}页
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      articles: [],
      pagination: {
        totalPage: 1,
        currentPage: 1,
      },
    }
  },
  methods: {
    async fetchData () {
      const res = await this.$http.get(
        `/articles/${this.pagination.currentPage}`
      )
      this.articles = res.data.list
      this.pagination.totalPage = res.data.totalPage
      this.pagination.currentPage = res.data.currentPage
    },
    async goToPage (pageNum) {
      this.pagination.currentPage = pageNum
      this.fetchData()
    },
    prev () {
      if (this.pagination.currentPage == 1) {
        return
      }
      this.pagination.currentPage--
      this.fetchData()
    },
    next () {
      if (this.pagination.currentPage == this.pagination.totalPage) {
        return
      }
      this.pagination.currentPage++
      this.fetchData()
    },
    downPage () {
      $('html,body').animate(
        { scrollTop: $('#header').outerHeight() - 56 },
        500
      )
    },
  },
  mounted () {
    this.fetchData()
  },
}
</script>

<style lang="scss" scoped>
.bgImg {
  background-image: url("../assets/images/bg-blog.jpg");
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;

  .shouye-text {
    font-size: 30px;
    font-family: "Roboto", sans-serif;
    width: 14em;
    white-space: nowrap;
    animation: typing 2.5s steps(13, end), infinite;
    overflow: hidden;
  }
  .line-down {
    font-size: 32px;
    font-family: "Roboto", sans-serif;
    animation: shine 0.5s linear infinite alternate;
  }
  .arrow-down {
    position: absolute;
    bottom: 30px;
    color: #fff;
    animation: arrowDown 0.8s linear infinite alternate;
    .icon-down {
      cursor: pointer;
      font-size: 45px;
    }
  }
}

@keyframes arrowDown {
  0% {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: translatey(-20%);
  }
  20% {
    visibility: visible;
    opacity: 0;
    -webkit-transform: translatey(10%);
  }
  100% {
    visibility: visible;
    opacity: 1;
    -webkit-transform: translatey(20%);
  }
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 13em;
  }
}
@keyframes shine {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}

@media screen and (max-width: 768px) {
  .shouye-text {
    font-size: 24px !important;
  }
  .line-down {
    font-size: 24px !important;
  }
}

/* 容器样式 */
.articles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 使文章从左向右排列 */
}

/* 每个文章项的样式 */
.article-item {
  width: calc(25% - 30px); /* 每个文章项占据25%的宽度减去间距 */
  margin: 15px; /* 文章项之间的间距 */
  box-sizing: border-box; /* 确保宽度包括padding和border */
}

/* 单篇文章卡片的样式 */
.article-card {
  background-color: #363938;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 4px;
  overflow: hidden;
  height: 120px;
}

/* 文章标题样式 */
.article-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  font-size: 14px;
  text-align: center;
  word-wrap: break-word; /* 允许在单词内换行 */
  line-height: 1.5; /* 行高，根据需要调整 */
  max-height: 72px; /* 限制标题区域的最大高度，以控制多行显示 */
  overflow: hidden; /* 隐藏溢出的内容 */
  a {
    color: #34b686;
  }
}

/* 文章元数据样式 */
.article-meta {
  display: flex;
  justify-content: space-around; /* 时间和类别间隔均匀分布 */
  padding: 10px 20px;
  font-size: 14px;
  color: #bbb;
}

/* 文章日期样式 */
.article-date {
  display: flex;
  align-items: center;
}

/* 文章类别样式 */
.article-category {
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    color: #bbb;
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .article-item {
    width: calc(33.333% - 30px); /* 在较小屏幕上每行显示3个 */
  }
}

@media (max-width: 768px) {
  .article-item {
    width: calc(50% - 30px); /* 在更小的屏幕上每行显示2个 */
  }
}

@media (max-width: 480px) {
  .article-item {
    width: 100%; /* 在手机屏幕上每行显示1个 */
  }
}
</style>
