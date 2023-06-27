<template>
  <div class="menu" :class="{headerVisible: isHeaderVisible}">
    <div class="container">
      <div class="menu-wrapper" v-click-outside="closeMenu">
        <div class="menu-items">
          <nuxt-link to="/" class="item" @click.native="closeMenu">Search for a Job</nuxt-link>
          <a class="item" @click="contact">Contact Us</a>
          <nuxt-link to="/about" class="item" @click.native="closeMenu">About Us</nuxt-link>
          <nuxt-link to="/faq" class="item" @click.native="closeMenu">FAQs</nuxt-link>
          <nuxt-link to="/partner-with-us" class="item" @click.native="closeMenu">Partner With Us</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  computed: {
    isHeaderVisible() {
      return this.$store.state.isHeaderVisible
    },
  },
  methods: {
    closeMenu() {
      this.$store.dispatch('showMenu', false)
    },
    contact() {
      this.closeMenu()
      this.$store.dispatch('showLegalPopup', 'contact')
    },
  }
}
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  height: 100%;
  transition: .3s;

  &.headerVisible {
    top: 68px;

    @media (max-width: $screen-xs-max) {
      top: 55px;
    }
  }

  &-wrapper {
    max-width: 375px;
    width: 100%;
    height: 748px;
    background: #246BFD;
    border-right: 1px solid #4380FF;
    border-left: 1px solid #4380FF;
    border-bottom: 1px solid #4380FF;
    display: flex;
    justify-content: center;

    @media (max-width: $screen-xs-max) {
      max-width: 100%;
    }

    .menu-items {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-top: 60px;

      .item {
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        color: #FFFFFF;
        margin-bottom: 55px;
        text-decoration: none;
        padding-left: 10px;
        position: relative;
        cursor: pointer;

        &:hover {
          &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: -10px;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #E5C35A;
          }
        }
      }
    }
  }
}
</style>
