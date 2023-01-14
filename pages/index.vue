<template>
  <div class="homepage">
    <div class="top">
      <img :src="require('assets/img/svg/logo_footer.svg')" alt="Recommended-Jobs.com"/>
      <div class="title">Let us help you find the yellow chair</div>
      <div class="sub-title">Over 167,457 jobs are available in our site, go ahead and find yours.</div>

      <div class="inputs">
        <div class="input job">
          <input type="text" placeholder="Search for a job or a company" v-model="searchValue"/>
        </div>
        <div class="input city">
          <input type="text" placeholder="New York, NY" v-model="locationValue"/>
        </div>
      </div>

      <div class="search" @click="search">Search Jobs</div>
    </div>
    <div class="inner">
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  head() {
    return {
      title: 'Homepage' + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Description',
        }
      ]
    }
  },
  asyncData({store}) {
    return {
      searchValue: store.state.search,
      locationValue: store.state.location,
    }
  },
  methods: {
    async search() {
      await this.$store.dispatch('setSearch', this.searchValue)
      await this.$store.dispatch('setLocation', this.locationValue)
      await this.$router.push('jobs')
    }
  }
}
</script>

<style scoped lang="scss">
.homepage {
  min-height: 1000px;
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

      .input {
        width: 100%;
        position: relative;

        &::before {
          content: '';
          display: block;
          height: 23px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 20px;
          pointer-events: none;
        }

        &.job {
          margin-right: 10px;

          @media (max-width: $screen-xs-max) {
            margin-right: 0;
            margin-bottom: 10px;
          }

          &::before {
            background: url("~/assets/img/svg/magnify_glass.svg") center / cover no-repeat;
            width: 20px;
          }
        }

        &.city {
          &::before {
            background: url("~/assets/img/svg/location.svg") center / cover no-repeat;
            width: 16px;
          }
        }

        input {
          width: 100%;
          max-width: 375px;
          height: 55px;
          background: #FFFFFF;
          border-radius: 25px;
          outline: none;
          font-weight: 400;
          font-size: 16px;
          line-height: 16px;
          color: #000000;
          padding: 20px 20px 20px 50px;
          border: none;
        }
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
