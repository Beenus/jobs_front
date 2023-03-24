<template>
  <div class="subscribe" v-if="!isHideSubscribe">
    <div class="left">
      <div class="title">Get notified about new <b v-if="search">{{ search }}</b> jobs in <b>{{ location }}</b></div>
      <div class="actions">
        <div class="sub-cta" @click="showPopup">
          Get Free Job Alerts
        </div>
        <div class="sub-hide" @click="hideEmail">
          No, im not interested.
        </div>
      </div>
    </div>
    <div class="right">
      <div class="icon"/>
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
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 30px 30px;
  margin-bottom: 10px;
  background: #FFFFFF;
  position: relative;
  text-decoration: none;
  border: 1px solid #C6C6C6;
  border-radius: 8px;

  @media (max-width: $screen-xs-max) {
    padding: 20px 0 20px 20px;
  }

  .left {
    width: 100%;
    max-width: 650px;

    .title {
      font-weight: 400;
      font-size: 22px;
      line-height: 20px;
      color: #000000;
      margin-bottom: 15px;
      position: relative;

      @media (max-width: $screen-xs-max) {
        padding-left: 65px;
        padding-right: 20px;
        margin-bottom: 30px;
        line-height: 28px;

        &::before {
          display: block;
          content: '';
          background: url("~/assets/img/svg/notif-big.svg") center / contain no-repeat;
          min-width: 52px;
          min-height: 60px;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;

      @media (max-width: $screen-xs-max) {
        padding-right: 15px;
        justify-content: center;
      }

      .sub-cta {
        width: 173px;
        height: 40px;
        background: #246BFD;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
        margin-right: 15px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }

      .sub-hide {
        font-weight: 400;
        font-size: 14px;
        line-height: 10px;
        display: flex;
        align-items: center;
        text-decoration-line: underline;
        color: #A0A0A0;
        cursor: pointer;

        @media (max-width: $screen-xs-max) {
          line-height: 16px;
          text-align: center;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .right {
    max-width: 270px;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    @media (max-width: $screen-xs-max) {
      display: none;
    }

    .icon {
      min-width: 52px;
      min-height: 60px;

      &::before {
        display: block;
        content: '';
        background: url("~/assets/img/svg/notif-big.svg") center / contain no-repeat;
        min-width: 52px;
        min-height: 60px;
      }
    }
  }
}
</style>
