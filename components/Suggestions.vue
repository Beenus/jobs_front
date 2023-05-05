<template>
  <div v-if="suggestions && suggestions.length" class="suggestions" :class="{bottom, top}">
    <div class="container">
      <div class="title">Related Jobs
<!--        <div class="show-more" v-if="top" @click="open = !open" :class="{open}">Show {{ open ? 'Less' : 'More' }}</div>-->
      </div>
      <div class="job-pages-wrapper" :class="{bottom, top, open}">
        <div class="job-pages" :class="{bottom, top}">
          <a @click="openSuggestion(suggestion)" class="job-page" v-for="(suggestion, index) in suggestions" :title="suggestion"
             :key="index" :class="{bottom, top}">
            {{ suggestion }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Suggestions",
  props: ['bottom', 'top'],
  data() {
    return {
      open: false,
    }
  },
  computed: {
    suggestions() {
      return this.pageData.suggestions?.split(',')
    },
    pageData() {
      return this.$store.state.pages.pageData
    },
  },
  methods: {
    async openSuggestion(suggestion) {
      await this.$store.dispatch('setSearch', suggestion)
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, force: true, loader: true, clear: true,})

      if (process.client) {
        window.scrollTo({top: 0});
      }
    }
  }
}
</script>

<style scoped lang="scss">
.suggestions {
  width: 100%;
  margin: 20px 0;

  &.bottom {
    @media (min-width: $screen-md) {
      display: none;
    }

    @media(max-width: $screen-xs-max) {
      margin-top: 20px;
    }
  }

  .title {
    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .show-more {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #000000;
      cursor: pointer;

      @media (min-width: $screen-xs) {
        display: none;
      }

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

  .job-pages {
    display: flex;
    flex-flow: row wrap;
    white-space: nowrap;
    gap: 5px;

    @media (max-width: $screen-xs-max) {
      min-width: 960px;

      &.top {
        min-width: auto;
      }
    }

    &-wrapper {
      overflow: auto;
      height: auto;

      @media (max-width: $screen-xs-max) {
        &.top {
          //overflow: hidden;
          //height: 70px;
          transition: height .3s;

          &.open {
            height: auto;
          }
        }
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
      cursor: pointer;

      @media (max-width: $screen-xs-max) {
        height: 38px;

        &.top {
          height: 31px;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          padding: 5px 8px;
        }
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
