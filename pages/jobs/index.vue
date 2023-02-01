<template>
  <div class="jobs-page">
    <div class="list">
      <div class="sidebar left"></div>
      <div class="container">
        <div class="title-sort">
          <div class="title desktop">Available jobs for "{{ search }}" in "{{ location }}"
          </div>
          <div class="title mobile">Available jobs founds in "{{ location }}"</div>

          <div class="sort-counting">
            <div class="counting">{{ perPage }} of items per page</div>
          </div>
        </div>
        <ListWrapper :isMobileWidth="isMobileWidth"/>
      </div>
      <div class="sidebar right">
        <div class="ad">Ad</div>
      </div>
    </div>
<!--    <ContentBlock :keyword="search" content="lorem"/>-->
  </div>
</template>

<script>
export default {
  name: "index.vue",
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
  async asyncData({store, route, from, redirect}) {
    if (!route.query.search) {
      redirect(302, '/')
    } else {
      await store.dispatch('setSearch', route.query.search)
    }

    if (route.query.location) {
      await store.dispatch('setLocation', route.query.location)
    }

    if (!from) {
      await store.dispatch('jobs/getJobs')
    }

    return {
      windowSize: null,
    }
  },
  computed: {
    isMobileWidth() {
      return this.windowSize ? this.windowSize?.x < 768 : false
    },
    listItemsCount() {
      return this.$store.state.jobs.meta.totalJobs
    },
    search() {
      return this.$store.state.search
    },
    location() {
      return this.$store.state.location || this.$store.getters['location'];
    },
    perPage() {
      return this.$store.state.jobs.perPage
    },
  },
  methods: {
    onResize() {
      this.windowSize = {x: window.innerWidth, y: window.innerHeight}
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (process.browser) {
        this.onResize()
      }
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    this.$store.dispatch('jobs/clearJobs')
  }
}
</script>

<style scoped lang="scss">
.jobs-page {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 45px 15px 0;

  .sidebar {
    width: 100%;
    max-width: 195px;

    @media (max-width: $screen-sm-max) {
      display: none;
    }

    &.right {
      padding-left: 36px;

      .ad {
        background: #EBEBEB;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 600px;
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
  }

  .title-sort {
    display: flex;
    justify-content: space-between;

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
        }
      }
    }

    .sort-counting {
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
