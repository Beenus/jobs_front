<template>
  <div class="page">
    <Header v-if="!isHomepage"/>
    <div class="main">
      <nuxt/>
      <div id="content-modal" v-show="isShowContentModal"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";

export default {
  name: "default",
  components: {Footer, Header},
  computed: {
    isShowContentModal() {
      return this.$store.state.isShowContentModal
    },
    isHomepage() {
      return this.$route.path === '/'
    }
  }
}
</script>

<style lang="scss">

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
</style>
