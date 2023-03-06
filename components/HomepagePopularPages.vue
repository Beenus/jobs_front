<template>
  <div v-if="popularPages.length" class="popular-jobs">
    <div class="container">
      <div class="job-pages-wrapper">
        <div class="job-pages">
          <nuxt-link class="job-page" v-for="(page, index) in popularPages" :to="page.slug" :title="page.name"
                     :key="index">
            {{ page.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepagePopularPages",
  computed: {
    popularPages() {
      return this.$store.state.pages?.popularPages?.slice(0, 9)
    },
  },
}
</script>

<style scoped lang="scss">
.popular-jobs {
  width: 100%;
  margin-top: 30px;

  .title {
    font-weight: 500;
    font-size: 23px;
    color: #000000;
    margin-bottom: 20px;
  }

  .job-pages {
    display: flex;
    flex-flow: row wrap;
    white-space: nowrap;
    justify-content: center;
    gap: 5px;

    .job-page {
      display: flex;
      align-items: center;
      justify-items: center;
      padding: 5px 20px;
      border: 2px solid #FFFFFF;
      border-radius: 25px;
      height: 30px;
      font-weight: 500;
      font-size: 14px;
      line-height: 15px;
      color: #FFFFFF;
      text-decoration: none;
      background: #246bfd;

      &:hover {
        background: #5388f3;
      }
    }
  }
}
</style>
