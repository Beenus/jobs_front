<template>
  <div class="blog-articles-wrapper">
    <div class="container">
      <div class="title" v-if="isHomepage">Latest Articles</div>
      <div class="blog-articles">
        <BlogArticle :article="article" v-for="article in blogList" :key="article.id"/>
      </div>
      <nuxt-link to="/blog" class="show-all" v-if="isHomepage">Show All</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogList",
  props: ['isHomepage'],
  computed: {
    blogList() {
      return this.isHomepage ? this.$store.state.blog.latestArticles : this.$store.state.blog.list
    }
  },
}
</script>

<style scoped lang="scss">
.blog-articles {
  &-wrapper {
    padding: 0 15px;

    .title {
      color: #000;
      font-size: 38px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      margin-bottom: 30px;
      margin-top: 40px;

      @media (max-width: $screen-xs-max) {
        font-weight: 400;
        font-size: 28px;
        line-height: 32px;
        margin-bottom: 20px;
      }
    }

    .show-all {
      display: flex;
      margin-bottom: 50px;
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      text-decoration-line: underline;
    }
  }
}
</style>
