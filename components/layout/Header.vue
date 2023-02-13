<template>
  <header>
    <div class="main-header">
      <div class="container">
        <div class="header-wrapper">
          <div class="logo-menu">
            <div class="menu-button"></div>
            <div class="logo">
              <nuxt-link :to="'/'">
                <img :src="require('assets/img/svg/logo_footer.svg')" alt="Recommended-Jobs.com"/>
              </nuxt-link>
            </div>
          </div>

          <div class="search-inputs">
            <div class="inputs">
              <KeywordSearch/>
              <CitySearch/>
              <div class="search desktop" v-if="!fetching" @click="search">Search Jobs</div>
              <div class="search fetching" v-else>Searching...</div>
              <div class="search mobile" v-if="!fetching" @click="searchMobile">Search Jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchOpen: false,
    }
  },
  computed: {
    fetching() {
      return this.$store.state.jobs.fetching
    },
  },
  methods: {
    async search() {
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, clear: true, force: true, loader: true})
    },
    searchMobile() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.main-header {
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #246BFD 0%, #246BFD 100%);
  height: 68px;
  padding: 0 15px;

  @media (max-width: $screen-xs-max) {
  }

  .logo-menu {
    display: flex;
    align-items: center;
    margin-right: 10px;

    @media (max-width: $screen-xs-max) {
      width: 100%;
      margin-right: 0;
    }

    .menu-button {
      margin-right: 15px;
      cursor: pointer;
      display: none;

      &::before {
        content: '';
        background: url("~/assets/img/svg/menu.svg") center / contain no-repeat;
        display: block;
        width: 19px;
        height: 15px;
      }
    }

    .logo {
      display: flex;
      max-height: 50px;
      max-width: 225px;

      img {
        margin-top: 4px;
        max-height: 50px;
        max-width: 100%;
      }
    }
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-inputs {
    display: flex;
    align-items: center;
    max-width: 640px;
    width: 100%;

    @media (max-width: $screen-xs-max) {
      max-width: 120px;
    }

    .inputs {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      .search-wrapper {
        width: 100%;
        position: relative;

        @media (max-width: $screen-xs-max) {
          display: none;
        }
      }

      .search {
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        max-width: 120px;
        min-width: 100px;
        height: 40px;
        background: #FEC461;
        border-radius: 30px;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #000000;

        &:hover {
          background: #f5d090;
        }

        &.desktop {
          @media (max-width: $screen-xs-max) {
            display: none;
          }
        }

        &.mobile {
          display: none;

          @media (max-width: $screen-xs-max) {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
