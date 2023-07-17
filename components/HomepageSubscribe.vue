<template>
  <div class="homepage-subscribe">
    <div class="container">
      <div class="email">
        <div class="left">
          <div class="title">Get the latest jobs <br/>delivered right to your <br/>inbox <span>.</span></div>
        </div>
        <div class="right">
          <KeywordSearch @change="changeKeyword" :shouldFocus="false" :native="true" :isHeader="true"
                         placeholder="Job, Company or Keyword"/>
          <CitySearch @change="changeLocation" :native="true" :isHeader="true" placeholder="New York, US"/>
          <div class="input-wrapper">
            <div class="label" v-if="email">Email Address</div>
            <input ref="email" class="input email" type="email" placeholder="Email Address" v-model="email"
                   :class="{text: email, error: !isValidEmail}"/>
          </div>
          <div class="submit" @click="submit" v-if="!sent">{{ !fetching ? 'Submit' : 'Sending...' }}</div>
          <div class="submit" v-else>Thank You!</div>
          <div class="legal">By clicking submit you consent and agree to our <br/>Privacy Policy & Terms and agree to
            receive job <br/>alert emails from Recommended Jobs. You can <br/>unsubscribe at any time.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageSubscribe",
  data() {
    return {
      email: '',
      keyword: '',
      location: '',
      isValidEmail: true,
      fetching: false,
      sent: false,
    }
  },
  methods: {
    changeKeyword(keyword) {
      this.keyword = keyword
    },
    changeLocation(location) {
      this.location = location
    },
    async submit() {
      this.isValidEmail = this.$validateEmail(this.email)

      if (!this.fetching && this.isValidEmail && this.location) {
        this.fetching = true

        const emailData = {
          session: this.$cookies.get('session_uuid'),
          email: this.email,
          job: this.keyword,
          location: this.location,
          region: this.$store.state.userLocation?.region,
          ip: this.$store.state.userIp,
          country: this.$store.state.userLocation?.country,
          timezone: this.$store.state.userOriginalLocation?.timezone,
          countryCode: this.$store.state.userLocation?.countryCode,
        }

        await this.$store.dispatch('emailSubscribe', emailData)
        this.sent = true
        this.$cookies.set('email_subs', true)
      }

      this.fetching = false
    }
  },
  computed: {
    customLocation() {
      return this.$store.getters['location'];
    },
    customSearch() {
      return this.$store.state.search;
    },
    isCustomJob() {
      return this.popupType.includes('custom')
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.email.focus()
    })
  }
}
</script>

<style scoped lang="scss">
.homepage-subscribe {
  background: #EEF0F8;
  padding: 55px 15px 35px;
  width: 100%;

  .email {
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media (max-width: $screen-xs-max) {
      flex-flow: column;
    }

    .right {
      min-width: 275px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }

    .title {
      text-transform: capitalize;
      font-weight: 600;
      font-size: 42px;
      line-height: 60px;
      color: #000;
      margin-top: 10px;

      @media (max-width: $screen-xs-max) {
        text-align: center;
        margin-top: 0;
        font-weight: 600;
        font-size: 28px;
        line-height: 30px;
        margin-bottom: 15px;
      }

      span {
        color: #FEC461;
        margin-left: -10px;

        @media (max-width: $screen-xs-max) {
          margin-left: -5px;
        }
      }
    }

    .job {
      margin: 0 0 10px 0;
      width: 100%;
    }

    .city {
      width: 100%;
    }

    .input-wrapper {
      width: 100%;
      position: relative;
      margin-top: 10px;
      max-width: 375px;

      &::before {
        content: '';
        display: block;
        height: 10px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        pointer-events: none;
        z-index: 1;
        background: url("~/assets/img/svg/email.svg") center / cover no-repeat;
        width: 16px;
      }

      .input {
        width: 100%;
        max-width: 375px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 8px;
        outline: none;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        color: #000000;
        padding: 20px 20px 20px 40px;
        transition: .3s;
        border: 1px solid #246BFD;

        &.email {
          &::placeholder {
            color: #246BFD;
          }
        }

        &.error {
          border: 1px solid red;
        }

        &.text {
          padding-bottom: 5px;
        }
      }

      .label {
        position: absolute;
        top: 5px;
        left: 40px;
        font-weight: 700;
        font-size: 11px;
        line-height: 15px;
        color: #246BFD;
      }
    }

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 100%;
      max-width: 175px;
      min-width: 100px;
      height: 40px;
      background: #FEC461;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      color: #000000;
      margin: 25px auto 0;

      &:hover {
        background: #f5d090;
      }
    }

    .legal {
      margin-top: 15px;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      color: #000;

      &.bold {
        font-weight: 700;
      }
    }

    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -70px;
      max-width: 225px;
      width: 100%;


      @media (max-width: $screen-xs-max) {
        bottom: -45px;
      }
    }
  }
}
</style>
