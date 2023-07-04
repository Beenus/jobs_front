<template>
  <ClientOnly v-if="isShowCookies">
    <div class="cookies">
      <div class="container">
        <div class="cookies-wrapper">
          <div class="text">We use cookies to enhance the security, performance, functionality and for analytical and
            promotional activities. We use cookies to personalize ads for you. By continuing to browse this site you're
            agreeing to our Privacy Policy.
          </div>
          <div class="btn" @click="hideCookies">Got It</div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "Cookies",
  data() {
    return {
      isShowCookies: false,
    }
  },
  computed: {
    userOriginalLocation() {
      return this.$store.state.userOriginalLocation?.countryCode?.toLowerCase()
    },
    isNotCookiesCountry() {
      return !['us', 'ca'].includes(this.userOriginalLocation)
    }
  },
  watch: {
    currentCountry() {
      this.checkCookies()
    }
  },
  mounted() {
    this.checkCookies()
  },
  methods: {
    checkCookies() {
      let inStorage = null
      if (process.browser) {
        inStorage = localStorage.getItem('showCookies')
      }

      this.isShowCookies = this.isNotCookiesCountry && inStorage == null
    },
    hideCookies() {
      localStorage.setItem('showCookies', 'true')
      this.isShowCookies = false
    }
  }
}
</script>

<style scoped lang="scss">
.cookies {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #2480FE;
  padding: 0 15px;

  .cookies-wrapper {
    overflow: auto;
    display: inline-flex;
    align-items: center;
    height: 70px;

    @media (max-width: $screen-xs-max) {
      height: 90px;
    }

    .text {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #FFFFFF;
      display: inline;

      @media (max-width: $screen-xs-max) {
        font-size: 11px;
        line-height: 15px;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      float: right;
      background: #FFFFFF;
      border-radius: 8px;
      max-width: 100px;
      width: 100%;
      height: 35px;
      margin-left: 10px;
      min-width: 70px;
      cursor: pointer;

      &:hover {
        background: #f1f1f1;
      }
    }
  }
}
</style>
