<template>
  <div :class="[headerClass, {[fixedClass]: isFixed}, {scrolled: lastScrollTop >= minScroll}]">
    <slot/>
    <div class="mobile-search-location" v-if="listPage">
      <JobPageSearch/>

      <Suggestions v-if="isRouteCorrect && suggestions"/>
      <PopularPages v-else/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedHeader',
  props: {
    threshold: {
      required: false,
      type: Number,
      default: 0
    },
    headerClass: {
      required: false,
      type: String,
      default: 'vue-fixed-header'
    },
    fixedClass: {
      required: false,
      type: String,
      default: 'vue-fixed-header--isFixed'
    },
    hideScrollDown: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      minScroll: 50,
      check: null,
      isFixed: false,
      lastScrollTop: 0,
    };
  },
  mounted() {
    this.main();
    this.registerEvent();
  },
  computed: {
    listPage() {
      return this.$route.name === 'jobs' || this.$route.name === 'slug'
    },
    isRouteCorrect() {
      return this.$nuxt.$route.name === 'slug'
    },
    suggestions() {
      return this.$store.state.pages?.pageData?.suggestions
    },
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },
    main() {
      let _this = this;
      this.lastScrollTop = this.getScrollTop();
      this.check = function () {
        let _a = _this, threshold = _a.threshold, hideScrollDown = _a.hideScrollDown;
        let currentScrollPos = _this.getScrollTop();
        let isOverThreshold = true;
        let newIsFixed = currentScrollPos <= _this.lastScrollTop
          ? isOverThreshold
          : (hideScrollDown ? false : isOverThreshold);
        _this.lastScrollTop = currentScrollPos;
        if (_this.isFixed !== newIsFixed) {
          _this.isFixed = newIsFixed;
          _this.$emit('change', _this.isFixed);
        }
      };
    },
    registerEvent() {
      window.addEventListener('scroll', this.check);
    },
    removeEvent() {
      window.removeEventListener('scroll', this.check);
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-fixed-header {
  //position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  transition: .3s;

  //@media (max-width: $screen-xs-max) {
  position: fixed;

  &.scrolled {
    transform: translateY(-100%);
    //box-shadow: 0 0 9px rgba(0, 0, 0, 0.25);

    @media (max-width: $screen-xs-max) {
      transform: translateY(-55px);
    }
  }

  &.vue-fixed-header--isFixed {
    transform: translateY(0);
  }

  //}

  .mobile-search-location {
    display: none;

    @media (max-width: $screen-xs-max) {
      display: block;
      width: 100%;
      background: #f0f0f0;
      padding: 15px 0 15px 15px;

      :deep(.popular-jobs), :deep(.suggestions) {
        padding-left: 0;
        margin: 10px 0 0 0;

        .title {
          display: none;
        }

        .job-pages-wrapper {
          .job-pages {
            flex-flow: row nowrap;

            .job-page {
              height: 40px;
              padding: 8px 15px;
              font-weight: 500;
              font-size: 13px;
              line-height: 12px;

              &::before {
                content: '';
                display: block;
                height: 15px;
                pointer-events: none;
                z-index: 1;
                background: url("~/assets/img/svg/magnify_glass_blue.svg") center / cover no-repeat;
                width: 13px;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
