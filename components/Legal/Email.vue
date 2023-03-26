<template>
  <div class="email">
    <div class="title" v-if="!isCustomJob || !customSearch">Join Recommended Jobs</div>
    <div class="title" v-else>{{ customSearch }}<br/>{{ customLocation }}</div>
    <div class="sub-title" v-if="!isCustomJob">Get the latest jobs<br/>delivered right to your inbox</div>
    <div class="sub-title" v-else>Set up your job alert</div>
    <KeywordSearch @change="changeKeyword" :native="true" :isHeader="true" placeholder="Job, Company or Keyword"/>
    <CitySearch @change="changeLocation" :native="true" :isHeader="true" placeholder="New York, US"/>
    <div class="input-wrapper">
      <div class="label" v-if="email">Email Address</div>
      <input ref="email" class="input email" type="email" placeholder="Email Address" v-model="email"
             :class="{text: email, error: !isValidEmail}"/>
    </div>
    <div class="submit" @click="submit" v-if="!sent">{{ !fetching ? 'Submit' : 'Sending...' }}</div>
    <div class="submit" v-else>Thank You!</div>
    <div class="legal">By signing up you agree to Recommended Jobs’s Terms and Privacy Policy</div>
    <div class="legal bold">Recommended Jobs is a job search engine. We are not an agent or representative of any
      employer.
    </div>

    <div class="logo">
      <nuxt-link :to="'/'">
        <img :src="require('assets/img/svg/logo_footer.svg')" alt="Recommended-Jobs.com"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Email",
  props: ['popupType'],
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
          ip: this.$store.state.userIp,
          country: this.$store.state.userOriginalLocation?.country,
          timezone: this.$store.state.userOriginalLocation?.timezone,
          countryCode: this.$store.state.userOriginalLocation?.countryCode,
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
.email {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  max-width: 325px;
  margin: 0 auto;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #33B1FF;
    text-transform: capitalize;
    text-align: center;
  }

  .sub-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #000000;
    margin-top: 15px;
    margin-bottom: 35px;
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
    max-width: 325px;
    min-width: 100px;
    height: 40px;
    background: #FEC461;
    border-radius: 30px;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: #000000;
    margin-top: 25px;

    &:hover {
      background: #f5d090;
    }
  }

  .legal {
    margin-top: 15px;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #000000;

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
</style>
