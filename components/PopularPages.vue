<template>
  <div v-if="popularPages.length" class="popular-jobs">
    <div class="container">
      <div class="title">Popular Jobs</div>
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
  name: "PopularPages",
  computed: {
    popularPages() {
      return this.$store.state.pages.popularPages
    },
  },
}
</script>

<style scoped lang="scss">
.popular-jobs {
  width: 100%;
  margin-bottom: 30px;

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
    gap: 5px;

    @media (max-width: $screen-xs-max) {
      min-width: 960px;
    }

    &-wrapper {
      overflow: hidden;

      @media (max-width: $screen-xs-max) {
        overflow: scroll;
      }
    }

    .job-page {
      display: flex;
      align-items: center;
      justify-items: center;
      background: #F1F3F4;
      border-radius: 50px;
      padding: 5px 20px;
      height: 38px;
      font-weight: 500;
      font-size: 14px;
      line-height: 15px;
      color: #202124;
      position: relative;
      text-decoration: none;

      &:hover {
        background: #e4e6e7;
      }

      &::before {
        content: '';
        display: block;
        height: 15px;
        pointer-events: none;
        z-index: 1;
        background: url("~/assets/img/svg/magnify_glass.svg") center / cover no-repeat;
        width: 13px;
        margin-right: 10px;
      }
    }
  }
}
</style>
