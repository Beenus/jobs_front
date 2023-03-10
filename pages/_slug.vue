<template>
  <div class="jobs-page">
    <div class="list">
      <div class="sidebar left"></div>
      <div class="container">
        <div class="title-sort">
          <div class="title desktop">Available jobs {{ pageData.keyword ? `for "${pageData.keyword}"` : '' }} in
            "{{ location }}"
          </div>
          <div class="title mobile">Available jobs founds in "{{ location }}"</div>

          <div class="sort-counting"></div>
        </div>
        <ListWrapper :isMobileWidth="isMobileWidth"/>
      </div>
      <div class="sidebar right"></div>
    </div>
    <div class="popular-wrap">
      <PopularPages :bottom="true"/>
    </div>
    <ContentBlock v-if="pageData.title && pageData.description" :title="pageData.title"
                  :content="pageData.description" :faq="pageData.faq"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: (this.pageData.seo_title || this.pageData.title) + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageData.seo_description || this.pageData.title || 'Description',
        }
      ]
    }
  },
  async asyncData({store, route, error}) {
    try {
      const page = await store.dispatch('pages/getPageData', route.params.slug)

      await store.dispatch('setSearch', page.keyword)
      await store.dispatch('jobs/getJobs', {route: route.name, clear: true, loader: true})

      return {
        windowSize: null,
      }
    } catch {
      error({statusCode: 404, message: 'Page not found'})
    }
  },
  computed: {
    isMobileWidth() {
      return this.$device ? this.$device.isMobileOrTablet : this.windowSize ? this.windowSize?.x < 768 : false
    },
    pageData() {
      return this.$store.state.pages.pageData
    },
    location() {
      return this.$store.getters['location'];
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
        this.$store.dispatch('registerPageView', {
          type: 'PAGE',
          page_id: this.pageData.id,
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
  padding: 45px 0 0;
  background: #f4f4f4;

  @media (max-width: $screen-sm-max) {
    padding: 35px 0 0;
  }

  .sidebar {
    width: 100%;
    max-width: 195px;

    @media (max-width: $screen-md-max) {
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
    @media (max-width: $screen-md-max) {
      padding: 0 15px;
    }
  }

  .popular-wrap {
    max-width: 100%;

    @media (max-width: $screen-md-max) {
      padding: 0 15px;
    }
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
