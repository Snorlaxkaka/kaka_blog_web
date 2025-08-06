<template>
  <div class="px-4">
    <i
      active-class="active"
      class="iconfont icon-find fs-xxxl nav-item"
      @click="dialogVisible = true"
    ></i>
    <el-dialog
      :append-to-body="true"
      title="文章搜索"
      class="text-center fs-xxxxl"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div id="search">
        <input
          v-model="search"
          type="text"
          required="true"
          class="search-input bdr w-100 fs-xxl"
          placeholder="文章关键词"
          @keyup.enter="Search"
          style="height: 40px"
        />
      </div>
      <ul v-for="blog in filterBlogs" :key="blog._id">
        <router-link
          tag="li"
          class="hand fs-xl pt-3"
          :class="isInput ? `show-list` : ''"
          :to="`/article/list/${blog._id}`"
          style="display: none"
           @click.native="clearSearch" 
        >
          {{ blog.title }}
        </router-link>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInput: false,
      dialogVisible: false,
      search: '',
      blog: [],
      blogs: [],
    }
  },
  mounted() {
    window.addEventListener('input', this.inputListener)
    this.fetchArticles()
  },
  beforeDestroy() {
    window.removeEventListener('input', this.inputListener)
  },
  watch: {
    $route() {
      this.dialogVisible = false
    },
  },
  computed: {
    filterBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search)
      })
    },
  },
  methods: {
    async fetchArticles() {
      const res = await this.$http.get('articles/list')
      this.blogs = res.data
    },
    inputListener() {
      const inputTitle =
        document.getElementsByClassName('search-input')[0].value
      this.isInput = inputTitle || ''
    },
    clearSearch() {
      this.search = ''
      this.isInput = false
      this.dialogVisible = false
    },
  },
  created() {
    this.fetchArticles()
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.nav-item.active {
  color: map-get($colors, 'red');
}

.nav-item:hover {
  color: map-get($colors, 'red');
}
.show-list {
  display: block !important;
  text-align: left;
}
@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
}
</style>
