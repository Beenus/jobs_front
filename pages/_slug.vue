<template>
  <div class="jobs-page">
    <Suggestions :top="true" v-if="pageData.suggestions && isMobileWidth && !pageData.keyword"/>
    <PopularPages :top="true" v-else-if="isMobileWidth && !pageData.keyword"/>

    <div class="list" :class="{short: shortTemplate}">
      <div class="sidebar left"></div>
      <div class="container">
        <TitleSort :isHeaderVisible="isHeaderVisible"/>

        <ListWrapper :isMobileWidth="isMobileWidth" :template="template"/>
      </div>
      <div class="sidebar right" :class="{short: shortTemplate}">
        <div class="sidebar-wrap" :class="{headerVisible: isHeaderVisible}" v-if="shortTemplate">
          <Suggestions v-if="pageData.suggestions"/>
          <PopularPages v-else/>
          <Subscribe/>

          <GptAd ad-unit="Right_to_lineup"
                 :collapseEmptyDiv="true"
                 :size="[300, 250]"
          />

        </div>
      </div>
    </div>
    <ContentBlock v-if="pageData.title && pageData.description" :title="pageData.title"
                  :content="pageData.description" :faq="pageData.faq"/>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
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
      await store.dispatch('pages/getPopularPages', route?.params?.slug)

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
  padding: 65px 0 0;
  background: #f0f0f0;

  @media (max-width: $screen-sm-max) {
    padding: 35px 0 0;
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
      padding-top: 15px;

      .sidebar-wrap {
        position: sticky;
        top: 140px;
        transition: .3s;
        z-index: 2;

        &.headerVisible {
          top: 145px;
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

  .popular-wrap {
    max-width: 100%;

    @media (max-width: $screen-md-max) {
      padding: 0 15px;
    }
  }
}
</style>
