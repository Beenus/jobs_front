<template>
  <div class="homepage">

    <div class="content">
      <div class="container">
        <div class="top">
          <div class="text">
            <h1 class="title">Let us help you <br/> find the yellow chair <span>.</span></h1>
            <div class="sub-title">Over 167,457 jobs are available in our site, go ahead and find yours.</div>
          </div>
          <div class="img desktop"/>
        </div>
        <div class="inputs">
          <KeywordSearch class="hp" :isHeader="false" placeholder="Job, Company or Keyword"/>
          <CitySearch class="hp" :isHeader="false" placeholder="New York, US"/>
          <div class="search" v-if="!fetching" @click="search">Search Jobs</div>
          <div class="search fetching" v-else>Searching...</div>
        </div>
      </div>
      <div class="img mobile"/>
    </div>

    <HomepagePopularPages :type="'topics'" :title="'Explore job types <br/>you are interested in.'"/>
    <HomepagePopularPages :type="'searches'" :title="'Find the right job <br/>titles for you.'"/>

    <HomepageSubscribe/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Job Search Engine | Recommended Jobs',
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
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;

  .content {
    background: #246BFD;
    padding: 186px 15px 240px;
    width: 100%;

    @media (max-width: $screen-xs-max) {
      padding: 100px 15px 25px;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media (max-width: 850px) {
      justify-content: center;
    }

    .text {
      max-width: 560px;
      width: 100%;

      @media (max-width: 850px) {
        max-width: 800px;
      }

      @media (max-width: $screen-xs-max) {
        max-width: 375px;
      }
    }

    .title {
      font-weight: 700;
      font-size: 76px;
      line-height: 76px;
      color: #FFFFFF;
      margin: 0;

      br {
        display: none;
      }

      @media (max-width: 850px) {
        text-align: center;
      }

      @media (max-width: $screen-xs-max) {
        font-size: 32px;
        line-height: 36px;
        text-align: center;

        br {
          display: inline-block;
        }
      }

      span {
        color: #FEC461;
        margin-left: -15px;

        @media (max-width: $screen-xs-max) {
          margin-left: -5px;
        }
      }
    }

    .sub-title {
      margin-top: 30px;
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      color: #FFFFFF;
      text-align: center;

      @media (max-width: $screen-xs-max) {
        font-size: 17px;
      }
    }
  }

  .img {
    background: #246BFD url("~/assets/img/hp_chairs.png") no-repeat 50% 100%;
    max-width: 350px;
    height: 210px;
    width: 100%;

    &.desktop {
      @media (max-width: 850px) {
        display: none;
      }
    }

    &.mobile {
      max-width: 420px;
      height: 250px;
      margin: 0 auto;

      @media (min-width: 851px) {
        display: none;
      }
    }
  }

  .inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 635px;
    margin-top: 40px;

    @media (max-width: 850px) {
      margin: 40px auto 0;
    }
    @media (max-width: $screen-xs-max) {
      flex-flow: column;
      margin-top: 25px;
      max-width: 100%;
    }
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    max-width: 125px;
    height: 50px;
    background: #FEC461;
    border-radius: 8px;
    font-weight: 700;
    font-size: 16px;
    line-height: 36px;
    color: #000000;
    margin-left: 5px;

    @media (max-width: $screen-xs-max) {
      max-width: 150px;
      margin-left: 0;
      margin-top: 15px;
    }

    &:hover {
      background: #f5d090;
    }
  }
}
</style>
