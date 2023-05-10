<template>
  <div class="jobs-page">
    <PopularPages :top="true" v-if="isMobileWidth && !search"/>
    <div class="list" :class="{short: shortTemplate}">
      <div class="sidebar left"></div>
      <div class="container">
        <div class="title-sort">
          <div class="title desktop">Available jobs {{ search ? `for "${search}"` : '' }} in "{{ location }}"
          </div>
          <div class="title mobile">Jobs founds in "{{ location }}"</div>

          <div class="sort-counting"></div>
        </div>
        <ListWrapper :isMobileWidth="isMobileWidth" :template="template"/>
      </div>
      <div class="sidebar right" :class="{short: shortTemplate}">
        <div class="sidebar-wrap" :class="{headerVisible: isHeaderVisible}" v-if="shortTemplate">
          <PopularPages/>
          <Subscribe/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  head() {
    return {
      title: 'Jobs' + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Description',
        }
      ]
    }
  },
  async asyncData({store, route, from, error}) {
    if (route.query.search) {
      await store.dispatch('setSearch', route.query.search)
    }

    if (route.query.location) {
      await store.dispatch('setLocation', route.query.location)
      const location = route.query.location.split(',');

      let params = {}

      if (location && location[0] && location[1]) {
        params.city = location[0].trim()
        params.region = location[1].trim()
        params.countryCode = store.state.userOriginalLocation.countryCode
      } else {
        if (location && location[0]) {
          const {cities} = await store.dispatch('getCities', {q: location[0].trim()});

          if (cities.length) {
            params = cities[0]
          }
        }
      }

      await store.dispatch('setUserLocation', params)
    }

    if (!from) {
      await store.dispatch('jobs/getJobs', {route: route.name, loader: true})
    }

    return {
      windowSize: null,
      search: store.state.search,
    }
  },
  computed: {
    isMobileWidth() {
      return this.$device ? this.$device.isMobileOrTablet : this.windowSize ? this.windowSize?.x < 768 : false
    },
    location() {
      return this.$store.getters['location'];
    },
    perPage() {
      return this.$store.state.jobs.perPage
    },
    jobsCount() {
      return this.$store.state.jobs.list.length
    },
    jobsFetching() {
      return this.$store.state.jobs.fetching
    },
    template() {
      return this.$store.state.globalTemplate;
    },
    shortTemplate() {
      // return this.template === 'ListItemLogo';
      return true;
    },
    isHeaderVisible() {
      return this.$store.state.isHeaderVisible
    },
  },
  methods: {
    onResize() {
      this.windowSize = {x: window.innerWidth, y: window.innerHeight}
    },
  },
  watch: {
    jobsFetching(val, oldVal) {
      if (val !== oldVal) {
        this.search = this.$store.state.search
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (process.browser) {
        this.$store.dispatch('registerPageView', {
          type: 'JOBS',
          page_id: null,
          session: this.$cookies.get('session_uuid'),
          ip: this.$store.state.userIp,
          country: this.$store.state.userOriginalLocation?.country,
        })

        this.onResize()
        window.addEventListener('resize', this.onResize)
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped lang="scss">
.jobs-page {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 45px 0 40px;
  background: #f0f0f0;

  @media (max-width: $screen-sm-max) {
    padding-top: 35px;
  }

  @media (max-width: $screen-xs-max) {
    padding: 100px 0 0;
  }

  .sidebar {
    width: 100%;
    max-width: 195px;

    @media (max-width: $screen-sm-max) {
      display: none;
    }

    &.right {
      padding-left: 36px;

      .sidebar-wrap {
        position: sticky;
        top: 15px;
        transition: .3s;

        &.headerVisible {
          top: 75px;
        }
      }

      .ad {
        background: #EBEBEB;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 600px;
      }

      &.short {
        max-width: 300px;
        padding-left: 0;
        margin-left: 20px;
      }
    }

    &.left {
      @media (max-width: $screen-md-max) {
        display: none;
      }
    }
  }

  .list {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    width: 100%;
    @media (max-width: $screen-md-max) {
      padding: 0 15px;
    }

    &.short {
      justify-content: flex-start;

      .container {
        @media (min-width: $screen-md) {
          max-width: 640px;
          margin: 0;
        }

      }
    }
  }

  .title-sort {
    display: flex;
    justify-content: space-between;

    @media (max-width: $screen-xs-max) {
      display: none;
    }

    .title {
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      color: #000000;

      &.desktop {
        @media (max-width: $screen-xs-max) {
          display: none;
        }
      }

      &.mobile {
        display: none;

        @media (max-width: $screen-xs-max) {
          display: flex;
          font-weight: 700;
          font-size: 18px;
          line-height: 16px;
          color: #000000;
        }
      }
    }

    .sort-counting {
      @media (max-width: $screen-xs-max) {
        display: none;
      }

      .counting {
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #737373;
      }
    }
  }
}
</style>
