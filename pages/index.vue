<template>
  <div class="homepage">
    <div class="top">
      <img :src="require('assets/img/svg/logo_footer.svg')" alt="Recommended-Jobs.com"/>
      <div class="title">Let us help you find the yellow chair</div>
      <div class="sub-title">Over 167,457 jobs are available in our site, go ahead and find yours.</div>

      <div class="inputs">
        <KeywordSearch class="hp" :isHeader="false" placeholder="Job, Company or Keyword"/>
        <CitySearch class="hp" :isHeader="false" placeholder="New York, US"/>
      </div>

      <div class="search" v-if="!fetching" @click="search">Search Jobs</div>
      <div class="search fetching" v-else>Searching...</div>

      <HomepagePopularPages/>
    </div>
    <div class="inner">
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Recommended-Jobs: Local Job Search Engine' + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Our Local Job Search Engine is the ultimate destination for all your job search needs. We provide the most comprehensive, up-to-date listings of local jobs in your area, so you can easily find the perfect job for you.',
        }
      ]
    }
  },
  computed: {
    fetching() {
      return this.$store.state.jobs.fetching
    },
  },
  methods: {
    async search() {
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, loader: true, clear: true, force: true})
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (process.browser) {
        this.$store.dispatch('registerPageView', {
          type: 'HOMEPAGE',
          page_id: null,
          session: this.$cookies.get('session_uuid'),
          ip: this.$store.state.userIp,
          country: this.$store.state.userOriginalLocation?.country,
        })
      }
    })
  },
}
</script>

<style scoped lang="scss">
.homepage {
  min-height: 1030px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  background-size: 1440px;
  background: #246BFD url("~/assets/img/homepage_bg.png") no-repeat 50% 100%;

  @media (max-width: $screen-xs-max) {
    min-height: 820px;
    background-size: 1000px;
  }

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 0 15px;
    max-width: 790px;
    width: 100%;

    img {
      margin-bottom: 85px;

      @media (max-width: $screen-xs-max) {
        margin-bottom: 30px;
      }
    }

    .title {
      font-weight: 700;
      font-size: 32px;
      line-height: 36px;
      color: #FFFFFF;
      text-align: center;

      @media (max-width: $screen-xs-max) {
        display: none;
      }
    }

    .sub-title {
      margin-top: 10px;
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      color: #FFFFFF;
      text-align: center;

      @media (max-width: $screen-xs-max) {
        font-size: 17px;
      }
    }

    .inputs {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 40px;

      @media (max-width: $screen-xs-max) {
        flex-flow: column;
        margin-top: 25px;
      }
    }

    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 100%;
      max-width: 250px;
      height: 50px;
      background: #FEC461;
      border-radius: 30px;
      font-weight: 700;
      font-size: 16px;
      line-height: 36px;
      color: #000000;
      margin-top: 30px;

      &:hover {
        background: #f5d090;
      }
    }
  }
}
</style>
