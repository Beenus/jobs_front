<template>
  <div v-if="popularPages.length" class="popular-jobs" :class="{bottom, top}">
    <div class="container">
      <div class="title">Popular Searches
        <div class="show-more" v-if="top" @click="open = !open" :class="{open}">Show {{ open ? 'Less' : 'More' }}</div>
      </div>
      <div class="job-pages-wrapper" :class="{bottom, top, open}">
        <div class="job-pages" :class="{bottom, top}">
          <nuxt-link class="job-page" v-for="(page, index) in popularPages" :to="page.slug" :title="page.name"
                     :key="index" :class="{bottom, top}">
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
  data() {
    return {
      open: false,
    }
  },
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

    @media(min-width:$screen-sm )and (max-width: $screen-sm-max) {
      display: block;
      padding-right: 15px;
      margin-bottom: 20px;
    }
  }

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 15px;
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
      overflow: hidden;

      @media (max-width: $screen-xs-max) {
        overflow: scroll;

        &.top {
          overflow: hidden;
          height: 70px;
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

      @media (max-width: $screen-xs-max) {
        height: 38px;

        &.top {
          height: 31px;
          font-weight: 500;
          font-size: 10px;
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
