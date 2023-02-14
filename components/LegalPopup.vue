<template>
  <div class="legal" @click.self="closePopup">
    <div class="legal-popup" :class="legalPopupType">
      <div class="close-trigger" @click.self="closePopup"/>
      <component :is="legalPage"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalModal',
  computed: {
    legalPopupType () {
      return this.$store.state.legalPopupType
    },
    legalPage () {
      switch (this.legalPopupType) {
        case 'terms':
          return () => import(`@/components/Legal/Terms.vue`)
        case 'privacy':
          return () => import(`@/components/Legal/Privacy.vue`)
        case 'advertiserDisclosure':
          return () => import(`@/components/Legal/AdvertiserDisclosure.vue`)
        case 'partner':
          return () => import(`@/components/Legal/Partner.vue`)
        case 'contact':
          return () => import(`@/components/Legal/ContactUs.vue`)
        default:
          return null
      }
    }
  },
  methods: {
    closePopup () {
      this.$store.dispatch('closeLegalPopup')
    },
  },
}
</script>

<style scoped lang="scss">
.legal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  padding: 50px;

  &-popup {
    background: #FFFFFF;
    padding: 40px 55px 65px 55px;
    width: 100%;
    height: 100%;
    max-height: 850px;
    display: flex;
    max-width: 1200px;
    color: #000;
    position: relative;

    &.contact {
      width: auto;
      height: auto;
    }
  }

  :deep(.legal-text) {
    overflow: scroll;

    h1 {
      font-size: 32px;
      margin-bottom: 15px;
      font-weight: bold;
    }

    p {
      margin-bottom: 15px;
    }
  }

  .close-trigger {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    position: absolute;
    right: 10px;
    top: 10px;

    &::after {
      content: '';
      opacity: 0.7;
      background: url("~/assets/img/svg/close-dark.svg") no-repeat center;
      background-size: contain;
      width: 48%;
      height: 48%;
      display: block;
    }
  }
}
</style>
