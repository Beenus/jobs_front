<template>
  <div v-if="popularPages.length" class="popular-jobs" :class="type">
    <div class="container">
      <div class="job-pages-wrapper">
        <div class="title" v-html="title"/>
        <div class="job-pages">
          <div class="title-type">{{ titleType }}</div>
          <div class="pages">
            <nuxt-link class="job-page" v-for="(page, index) in popularPages" :to="page.slug" :title="page.name"
                       :key="index">
              {{ page.name }}
            </nuxt-link>
          </div>
          <div v-if="type==='searches' && pages.length > 12" class="show-more" :class="{open:showMore}"
               @click="showMore = !showMore">Show
            {{ showMore ? 'Less' : 'More' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepagePopularPages",
  props: ['title', 'type'],
  data() {
    return {
      showMore: false,
    }
  },
  computed: {
    pages() {
      switch (this.type) {
        case 'topics':
          return this.$store.state.pages?.popularTopics
        case 'searches':
          return this.$store.state.pages?.popularSearches
        default:
          return this.$store.state.pages?.popularPages
      }
    },
    popularPages() {
      switch (this.type) {
        case 'topics':
          return this.pages?.slice(0, 9)
        case 'searches':
          return this.showMore ? this.pages : this.pages?.slice(0, 12)
        default:
          return this.pages?.slice(0, 9)
      }
    },
    titleType() {
      switch (this.type) {
        case 'topics':
          return 'Topics'
        case 'searches':
          return 'Suggested Searches'
        default:
          return 'Popular Pages'
      }
    }
  },
}
</script>

<style scoped lang="scss">
.popular-jobs {
  width: 100%;
  padding: 60px 15px;

  @media (max-width: $screen-xs-max) {
    padding: 30px 15px;
  }

  &.searches {
    background: #EEF0F8;
  }

  .job-pages-wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: $screen-xs-max) {
      flex-flow: column;
    }
  }

  .title {
    font-weight: 400;
    font-size: 42px;
    line-height: 60px;
    color: #000000;

    @media (max-width: $screen-xs-max) {
      font-weight: 400;
      font-size: 28px;
      line-height: 32px;
      margin-bottom: 20px;
    }
  }

  .job-pages {
    max-width: 500px;
    width: 100%;

    .title-type {
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      color: #000000;
      margin-bottom: 20px;

      @media (max-width: $screen-xs-max) {
        display: none;
      }
    }

    .pages {
      display: flex;
      flex-flow: row wrap;
      white-space: nowrap;
      gap: 10px 5px;

      .job-page {
        display: flex;
        align-items: center;
        justify-items: center;
        padding: 10px 25px;
        height: 48px;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #000;
        text-decoration: none;
        border: 1px solid #000000;
        border-radius: 24px;

        &:hover {
          background: #eeeeee;
        }
      }
    }

    .show-more {
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: #000000;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-top: 30px;

      &::after {
        content: '';
        background: url("~/assets/img/svg/arrow_down.svg") no-repeat center;
        background-size: contain;
        width: 14px;
        height: 6px;
        display: block;
        transition: .3s;
        margin-left: 5px;
      }

      &.open {
        &::after {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
