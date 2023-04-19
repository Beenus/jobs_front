<template>
  <div v-if="popularPages.length" class="popular-jobs" :class="{bottom, top}">
    <div class="container">
      <div class="title">Popular Searches</div>
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
  props: ['bottom', 'top'],
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

  @media(max-width: $screen-sm-max) {
    padding: 0 0 0 15px;
  }


  &.bottom {
    @media (min-width: $screen-md) {
      display: none;
    }

    @media(max-width: $screen-xs-max) {
      margin-top: 20px;
    }
  }

  &.top {
    display: none;

    @media(max-width: $screen-sm-max) {
      display: block;
    }
  }

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
      padding: 5px 20px;
      height: 40px;
      position: relative;
      text-decoration: none;
      background: #FFFFFF;
      //border: 1px solid #C1C7CD;
      border-radius: 50px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #4D5358;

      @media (max-width: $screen-xs-max) {
        height: 38px;
      }

      &:hover {
        background: #e4e6e7;
      }

      //&::before {
      //  content: '';
      //  display: block;
      //  height: 15px;
      //  pointer-events: none;
      //  z-index: 1;
      //  background: url("~/assets/img/svg/magnify_glass.svg") center / cover no-repeat;
      //  width: 13px;
      //  margin-right: 10px;
      //}
    }
  }
}

</style>
