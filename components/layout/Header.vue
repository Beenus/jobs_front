<template>
  <FixedHeader :hideScrollDown="true">
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

            <div class="search-inputs" v-if="!isHomepage">
              <div class="inputs">
                <KeywordSearch :isHeader="true" placeholder="Job, Company or Keyword" @onEnter="search"/>
                <CitySearch :isHeader="true" placeholder="New York, US" @onEnter="search"/>
                <div class="search desktop" v-if="!fetching" @click="search">Search</div>
                <div class="search fetching" v-else>Searching...</div>
<!--                <div class="search mobile" v-if="!fetching" @click="searchMobile">Search Jobs</div>-->
              </div>
            </div>

            <div class="notification" @click="showPopup">
              <div class="icon"/>
            </div>
          </div>
        </div>
      </div>
    </header>
  </FixedHeader>
</template>

<script>
import FixedHeader from "@/components/layout/header/FixedHeader.vue";

export default {
  name: "Header",
  components: {FixedHeader},
  props:['isHomepage'],
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
    },
    showPopup() {
      this.$store.dispatch('showLegalPopup', 'email custom')
    },
  },
}
</script>

<style scoped lang="scss">
.main-header {
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #246BFD 0%, #246BFD 100%);
  height: 68px;
  padding: 0 15px;
  border-bottom: 1px solid #4380FF;

  @media (max-width: $screen-xs-max) {
    height: 55px;
  }

  .logo-menu {
    display: flex;
    align-items: center;
    margin-right: 10px;

    @media (max-width: $screen-xs-max) {
      width: 100%;
      margin-right: 0;
      justify-content: center;
      padding-left: 45px;
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
      display: none;
    }

    .inputs {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      .search-wrapper {
        width: 100%;
        position: relative;
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
          font-weight: 600;
          font-size: 14px;
          line-height: 16px;

          &::before {
            content: '';
            display: block;
            pointer-events: none;
            z-index: 1;
            background: url("~/assets/img/svg/magnify_glass_dark.svg") center / cover no-repeat;
            width: 11px;
            height: 13px;
            margin-right: 5px;
          }

          @media (max-width: $screen-xs-max) {
            display: none;
          }
        }

        &.mobile {
          display: none;

          @media (max-width: $screen-xs-max) {
            display: flex;
            border-radius: 8px;
            font-size: 14px;
            height: 36px;
          }
        }
      }
    }
  }

  .notification {
    min-width: 30px;
    min-height: 28px;
    cursor: pointer;
    margin-left: 15px;

    &:hover {
      opacity: 0.9;
    }

    &::before {
      display: block;
      content: '';
      background: url("~/assets/img/svg/notif.svg") center / contain no-repeat;
      min-width: 30px;
      min-height: 28px;
    }
  }
}
</style>
