<!--
 * @Author: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @Date: 2025-07-30 15:16:31
 * @LastEditors: linjunjie 129569154+Snorlaxkaka@users.noreply.github.com
 * @LastEditTime: 2025-07-30 15:51:02
 * @FilePath: \kaka_blog_web\src\views\Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <Header></Header>
    <Snow></Snow>
    <router-view style="min-height: 800px"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Snow from '@/components/Snow.vue'

export default {
  components: {
    Header,
    Footer,
    Snow,
  },
  data () {
    return {}
  },
}
</script>
