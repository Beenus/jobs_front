<template>
  <div v-if="suggestions && suggestions.length" class="blog-article-suggestions">
    <div class="title">Related Jobs:</div>
    <div class="job-pages">
      <a @click="openSuggestion(suggestion)" class="job-page" v-for="(suggestion, index) in suggestions"
         :title="suggestion" :key="index">{{ suggestion.trim() }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogSuggestions",
  computed: {
    suggestions() {
      return this.blogArticleData.suggestions?.split(',')
    },
    blogArticleData() {
      return this.$store.state.blog.blogArticleData
    },
  },
  methods: {
    async openSuggestion(suggestion) {
      await this.$store.dispatch('setSearch', suggestion.trim() )
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, force: true, loader: true, clear: true,})

      if (process.client) {
        window.scrollTo({top: 0});
      }
    }
  }
}
</script>

<style scoped lang="scss">
.blog-article-suggestions {
  background: #F5F5F5;
  padding: 20px;
  margin-bottom: 30px;

  .title {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .job-pages {
    display: flex;
    flex-flow: column;

    .job-page {
      display: flex;
      color: #246BFD;
      font-size: 14px;
      text-decoration-line: underline;
      margin-bottom: 7px;
      cursor: pointer;
    }
  }
}
</style>
