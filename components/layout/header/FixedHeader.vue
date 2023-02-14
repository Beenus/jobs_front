<template>
  <div :class="[headerClass, {[fixedClass]: isFixed}, {scrolled: lastScrollTop >= 80}]">
    <slot/>
    <div class="mobile-search-location" v-if="search && lastScrollTop >= 200" @click="searchMobile">
      {{ search }} in {{ location }}
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
      check: null,
      isFixed: false,
      lastScrollTop: 0
    };
  },
  computed: {
    search() {
      return this.$store.state.search
    },
    location() {
      return this.$store.getters['location'];
    },
  },
  mounted() {
    this.main();
    this.registerEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    searchMobile() {
      this.$router.push('/')
    },
    getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },
    main() {
      let _this = this;
      this.lastScrollTop = this.getScrollTop();
      this.check = function () {
        let _a = _this, threshold = _a.threshold, hideScrollDown = _a.hideScrollDown;
        let currentScrollPos = _this.getScrollTop();
        let isOverThreshold = currentScrollPos > threshold;
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
    }
  },
}
</script>

<style lang="scss" scoped>
.vue-fixed-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  transition: .3s;

  @media (max-width: $screen-xs-max) {
    position: fixed;

    &.scrolled {
      transform: translateY(-100%);
    }
    &.vue-fixed-header--isFixed {
      transform: translateY(0);
    }
  }

  .mobile-search-location {
    display: none;

    @media (max-width: $screen-xs-max) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
      height: 30px;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
    }
  }
}
</style>
