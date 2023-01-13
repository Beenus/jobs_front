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

          <div class="search-wrapper">
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
  methods: {
    toggleContentModal(event, forceValue) {
      const value = forceValue ? forceValue : !this.searchOpen
      this.$store.dispatch('toggleContentModal', value)
      this.searchOpen = value
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

    @media (max-width: $screen-xs-max) {
      width: 100%;
    }

    .menu-button {
      margin-right: 15px;
      cursor: pointer;

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
      max-width: 310px;

      @media (max-width: $screen-xs-max) {
        margin: 0 auto;
      }

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

  .search-wrapper {

  }
}
</style>
