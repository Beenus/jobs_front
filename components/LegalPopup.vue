<template>
  <div class="legal" @click.self="closePopup" :class="legalPopupType">
    <div class="legal-popup" :class="legalPopupType">
      <div class="close-trigger" @click.self="closePopup"/>
      <component :is="legalPage" :popupType="legalPopupType"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalModal',
  computed: {
    legalPopupType() {
      return this.$store.state.legalPopupType
    },
    legalPage() {
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
        case 'exit':
          return () => import(`@/components/Legal/Exit.vue`)
        case 'email':
        case 'email custom':
          return () => import(`@/components/Legal/Email.vue`)
        default:
          return null
      }
    }
  },
  methods: {
    closePopup() {
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  padding: 50px;

  &.exit {
    @media (max-width: $screen-xs-max) {
      padding: 15px;
    }
  }

  &.email {
    @media (max-width: $screen-xs-max) {
      padding: 15px;
    }
  }

  &-popup {
    background: #FFFFFF;
    padding: 40px 50px 65px 50px;
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

    &.exit {
      background: #246BFD;
      max-width: 500px;
      min-height: 450px;
      height: auto;

      @media (max-width: $screen-xs-max) {
        padding: 20px;
      }

      .close-trigger {
        @media (max-width: $screen-xs-max) {
          right: 5px;
          top: 5px;
        }

        &::after {
          background: url("~/assets/img/svg/close-white.svg") no-repeat center;
        }
      }
    }


    &.email {
      max-width: 460px;
      min-height: 520px;
      height: auto;
      background: #F4F4F4;
      border-radius: 5px;

      @media (max-width: $screen-xs-max) {
        padding: 20px 20px 30px;
        min-height: auto;

        .close-trigger {
          right: 5px;
          top: 5px;
        }
      }
    }
  }

  :deep(.legal-text) {
    overflow: scroll;
    padding-right: 20px;

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
