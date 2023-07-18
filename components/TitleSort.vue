<template>
  <div class="title-sort" :class="{isHeaderVisible, scroll: scrollClass}">
    <div class="inner-container">
      <div class="sidebar left"></div>
      <JobPageSearch/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleSort",
  props: ['isHeaderVisible'],
  data() {
    return {
      scrollPosition: null,
    }
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  computed: {
    scrollClass() {
      return this.scrollPosition > 5
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll)
  }
}
</script>

<style scoped lang="scss">
.title-sort {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  background: #F0F0F0;
  border-top: 1px solid #F0F0F0;
  padding: 15px 0;
  transition: .3s;

  @media (max-width: $screen-md-max) {
    padding: 15px;
  }

  @media (max-width: $screen-xs-max) {
    display: none;
  }

  &.scroll {
    background: #fff;
  }

  &.isHeaderVisible {
    top: 67px;
  }

  .sidebar {
    width: 100%;
    max-width: 195px;

    @media (max-width: $screen-sm-max) {
      display: none;
    }

    &.left {
      @media (max-width: $screen-md-max) {
        display: none;
      }
    }
  }

  .inner-container {
    max-width: 1350px;
    margin: 0 auto;
    display: flex;
    width: 100%;
  }

  .title {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: #000000;

    &.desktop {
      @media (max-width: $screen-xs-max) {
        display: none;
      }
    }

    &.mobile {
      display: none;

      @media (max-width: $screen-xs-max) {
        display: flex;
      }
    }
  }

  .sort-counting {
    .counting {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: #737373;
    }
  }

  .inputs {
    max-width: 640px;

    @media (max-width: $screen-sm-max) {
      max-width: 100%;
    }
  }
}
</style>
