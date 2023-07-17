<template>
  <div class="menu" :class="{open, isHeaderVisible}">
    <div class="close" @click="close"/>
    <nuxt-link class="link" @click.native="close" :to="`/`">Home</nuxt-link>
    <nuxt-link class="link" @click.native="close" :to="`/blog`">Blog</nuxt-link>
    <nuxt-link class="link" @click.native="close" :to="`/about`">About Us</nuxt-link>
    <nuxt-link class="link" @click.native="close" :to="`/contact-us`">Contact Us</nuxt-link>
<!--    <a class="link" @click="$store.dispatch('showLegalPopup', 'contact')">Contact Us</a>-->
    <nuxt-link class="link" @click.native="close" :to="`/faq`">FAQs</nuxt-link>
    <!--    <nuxt-link class="link" @click.native="close" :to="`/partner`">Partner with Us</nuxt-link>-->
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  props: ['open'],
  data() {
    return {
      menuOpen: false,
    }
  },
  computed: {
    isHeaderVisible() {
      return this.$store.state.isHeaderVisible
    }
  },
  methods: {
    close() {
      this.$emit('closeMenu', true)
    }
  },
}
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  align-items: center;

  @media (max-width: $screen-xs-max) {
    display: none;

    &.open {
      transition: .3s;
      display: flex;
      flex-flow: column;
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 290px;
      height: 100vh;
      background: #FFF;
      z-index: 2;
      padding-top: 50px;

      &.isHeaderVisible {
        top: 0;
      }
    }
  }

  .link {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #000;
    margin-right: 25px;
    text-decoration: none;
    cursor: pointer;

    @media (max-width: $screen-sm-max) {
      margin-right: 20px;
      text-align: center;
    }

    @media (max-width: $screen-xs-max) {
      color: #000;
      margin-bottom: 20px;
      margin-right: 0;
      font-size: 18px;
      font-style: normal;
      font-weight: 900;
      line-height: 24px;

      &.nuxt-link-exact-active {
        color: #246BFD;
      }
    }

    &.mobile {
      display: none;

      @media (max-width: $screen-xs-max) {
        display: flex;

        font-weight: 300;
        font-size: 15px;
        line-height: 20px;
        color: #000;
        margin-bottom: 20px;
      }
    }

    &.title {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      color: #FFFFFF;
    }

    &.bold {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      text-decoration-line: underline;
      color: #000;
    }
  }

  .close {
    display: none;

    @media (max-width: $screen-xs-max) {
      display: flex;
      position: absolute;
      top: 15px;
      right: 15px;

      &::after {
        content: '';
        background: url("~/assets/img/svg/close-dark.svg") center / contain no-repeat;
        background-size: contain;
        width: 17px;
        height: 17px;
        display: block;
      }
    }
  }
}
</style>
