<template>
  <FixedHeader :hideScrollDown="false" @change="headerFixed">
    <header>
      <div class="main-header">
        <div class="container">
          <div class="header-wrapper">
            <div class="logo-menu">
              <div class="menu-button" @click="showMenu" :class="{open: isShowMenu}"/>
              <div class="logo">
                <nuxt-link :to="'/'">
                  <img :src="require('assets/img/svg/logo.svg')" alt="Top10SolarCompanies.com"/>
                </nuxt-link>
              </div>
            </div>
            <div class="menu-layout" @click="showMenu" :class="{isHeaderVisible}" v-if="isShowMenu"/>
            <HeaderMenu :open="isShowMenu" @closeMenu="showMenu"/>
          </div>
        </div>
      </div>
    </header>
  </FixedHeader>
</template>

<script>
import FixedHeader from "@/components/layout/header/FixedHeader.vue";
import HeaderMenu from "~/components/layout/header/HeaderMenu.vue";

export default {
  name: "Header",
  components: {HeaderMenu, FixedHeader},
  props: ['isHomepage'],
  data() {
    return {
      searchOpen: false,
      windowSize: null,
    }
  },
  computed: {
    isMobileWidth() {
      return this.$device ? this.$device.isMobileOrTablet : this.windowSize ? this.windowSize?.x < 768 : false
    },
    isShowMenu() {
      if (process.browser && this.isMobileWidth) {
        document.body.style.overflow = this.$store.state.isShowMenu ? 'hidden' : 'initial'
      }
      return this.$store.state.isShowMenu
    },
    isHeaderVisible() {
      return this.$store.state.isHeaderVisible
    },
  },
  methods: {
    showMenu() {
      if (process.browser && this.isMobileWidth) {
        this.$store.dispatch('showMenu')
      }
    },
    headerFixed(isHeaderVisible) {
      this.$store.dispatch('changeIsHeaderVisible', isHeaderVisible)
    },
    onResize() {
      this.windowSize = {x: window.innerWidth, y: window.innerHeight}
    },
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped lang="scss">
.main-header {
  display: flex;
  align-items: center;
  background: #fff;
  height: 68px;
  padding: 0 15px;
  border-bottom: 1px solid #EBECF1;

  @media (max-width: $screen-xs-max) {
    height: 55px;
  }

  .logo-menu {
    display: flex;
    align-items: center;
    margin-right: 10px;

    @media (max-width: $screen-xs-max) {
      width: 100%;
      margin-right: 0;
      flex-flow: row-reverse;
    }

    .menu-button {
      cursor: pointer;
      display: none;

      @media (max-width: $screen-xs-max) {
        display: flex;
      }

      &::before {
        content: '';
        background: url("~/assets/img/svg/menu.svg") center / contain no-repeat;
        display: block;
        width: 19px;
        height: 15px;
      }

      &.open {
        &::before {
          background: url("~/assets/img/svg/close-dark.svg") center / contain no-repeat;
        }
      }
    }

    .logo {
      display: flex;
      max-height: 50px;
      max-width: 225px;

      @media (max-width: $screen-xs-max) {
        margin: 0 auto;
      }

      img {
        margin-top: 4px;
        max-height: 50px;
        max-width: 100%;
      }
    }
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menu-layout {
    display: none;

    @media (max-width: $screen-xs-max) {
      transition: .3s;
      display: flex;
      position: fixed;
      top: 55px;
      left: 0;
      background: rgba(0, 0, 0, 0.60);
      width: 100%;
      height: 100vh;
      z-index: 2;

      &.isHeaderVisible {
        top: 0;
      }
    }
  }
}
</style>
