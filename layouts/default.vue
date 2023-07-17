<template>
  <div class="page" :class="{homepage: isHomepage}">
    <Header :isHomepage="isHomepage"/>
    <div class="main">
      <nuxt/>
      <div id="content-modal" v-show="isShowContentModal"/>
    </div>
    <Footer/>

    <client-only>
      <transition name="fade">
        <div class="loader-wrapper" v-if="isFetching">
          <div class="loader"/>
        </div>
      </transition>
    </client-only>
    <Cookies/>
    <LegalPopup v-if="isShowLegalPopup"/>
  </div>
</template>

<script>
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
import Menu from "@/components/layout/Menu.vue";

export default {
  name: "default",
  components: {Menu, Footer, Header},
  computed: {
    isShowContentModal() {
      return this.$store.state.isShowContentModal
    },
    isHomepage() {
      return this.$route.path === '/'
    },
    isFetching() {
      return this.$store.state.jobs.fetching || this.$store.state.pages.fetching
    },
    isShowLegalPopup() {
      return this.$store.state.isShowLegalPopup
    },
    isShowMenu() {
      return this.$store.state.isShowMenu
    },
  },
  mounted() {
    this.$store.dispatch('hideSubscribe', this.$cookies.get('email_subs_hide'))
    if (this.$route.query?.legal) {
      switch (this.$route.query?.legal) {
        case 'terms':
        case 'privacy':
        case 'advertiserDisclosure':
          this.$store.dispatch('showLegalPopup', this.$route.query?.legal)
          break
        default:
          break
      }
    }

    if (this.$route.name !== 'index' && this.$route.name !== 'blog' && this.$route.name !== 'blog-blogArticle' && (!this.$cookies.get('email_subs') || !this.$cookies.get('email_subs_hide'))) {
      setTimeout(() => {
        if (!this.isShowLegalPopup) {
          this.$store.dispatch('showLegalPopup', 'email')
        }
      }, 5000)
    }
  },
}
</script>

<style lang="scss">
.page {
  position: relative;
  padding-top: 68px;

  @media (max-width: $screen-xs-max) {
    padding-top: 55px;
  }

  &.homepage {
    padding-top: 0;
  }

  .main {
    position: relative;
    min-height: 100vh;

    #content-modal {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(18, 37, 54, 0.96);
      top: 0;
      left: 0;
    }
  }

  .fade-enter-active {
    transition: opacity .1s
  }

  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }


  .loader-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-items: center;
    align-items: center;
  }

  .loader {
    color: #407FFF;
    font-size: 20px;
    margin: 100px auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: loader 1.3s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  @-webkit-keyframes loader {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }
  @keyframes loader {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }
}


</style>
