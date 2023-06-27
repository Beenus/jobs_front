<template>
  <div class="blog-articles-wrapper">
    <div class="container">
      <div class="blog-articles">
        <BlogArticle :article="article" v-for="article in blogList" :key="article.id"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogList",
  computed: {
    blogList() {
      return this.$store.state.blog.list
    }
  },
}
</script>

<style scoped lang="scss">
.blog-articles {
  &-wrapper {
    padding: 0 15px;
  }
}
</style>
