<template>
  <div class="subscribe" v-if="!isHideSubscribe">
    <div class="title-text">
      <div class="title">Be the first to see new jobs</div>
      <div class="sub-title">
        Get notified about new <b v-if="search">{{ search }}</b> jobs in
        <b>{{ location }}{{ region ? `, ${region}` : '' }}</b>
      </div>
      <div class="sub-cta" @click="showPopup">
        Get Free Job Alerts
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subscribe",
  computed: {
    search() {
      return this.$store.state.search
    },
    location() {
      return this.$store.state.location
    },
    region() {
      return this.$store.state.userLocation?.region
    },
    isHideSubscribe() {
      return this.$store.state.isHideSubscribe
    }
  },
  methods: {
    showPopup() {
      this.$store.dispatch('showLegalPopup', 'email custom')
    },
    hideEmail() {
      this.$cookies.set('email_subs_hide', true)

      this.$store.dispatch('hideSubscribe', true)
    }
  },
}
</script>

<style scoped lang="scss">
.subscribe {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  text-decoration: none;
  border-radius: 8px;
  //padding: 30px;
  padding: 30px 30px 30px 0;

  @media (max-width: $screen-xs-max) {
    padding: 30px;
    margin-bottom: 10px;
  }

  .title-text {
    position: relative;
    padding-left: 50px;

    &::before {
      display: block;
      content: '';
      background: url("~/assets/img/svg/notif-big.svg") center / contain no-repeat;
      min-width: 35px;
      min-height: 40px;
      position: absolute;
      left: 0;
      top: 0;
    }

    .title {
      font-weight: 700;
      font-size: 22px;
      line-height: 20px;
      color: #246BFD;
    }

    .sub-title {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #000000;
      margin-top: 15px;
    }

    .sub-cta {
      width: 173px;
      height: 32px;
      background: #000;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #FFFFFF;
      cursor: pointer;
      margin-top: 15px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    padding-right: 15px;
    justify-content: center;

    .sub-hide {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      display: flex;
      align-items: center;
      text-decoration-line: underline;
      color: #A0A0A0;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
