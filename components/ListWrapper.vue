<template>
  <div class="list-wrapper" v-if="list.length">
    <div class="desktop" v-if="!isMobileWidth">
      <div class="item-wrapper" v-for="(job, index) in list" :key="index">
        <component :is="templateDesktop" :job="job" :index="index+1"/>
        <div v-if="isRouteCorrect && pageData.suggestions && index===7">
          <Suggestions :top="true"/>
        </div>
        <div v-if="((index+1) % 10 === 0) && !shortTemplate">
          <Subscribe/>
        </div>
      </div>
    </div>
    <div class="mobile" v-else>
      <div class="item-wrapper" v-for="(job, index) in list" :key="index">
        <component :is="templateMobile" :job="job" :index="index+1"/>
        <div v-if="isRouteCorrect && pageData.suggestions && index===7">
          <Suggestions :top="true"/>
        </div>
        <div v-if="(index+1) % 10 === 0 && !pageData.suggestions">
          <Subscribe/>
        </div>
      </div>
    </div>
    <div class="show-more" :class="{new:shortTemplate}" v-if="!isLoading" @click="setPage" ref="showMore">
      Load more
    </div>
    <div class="show-more" :class="{new:shortTemplate}" v-else ref="showMore">Loading...</div>
  </div>
  <div class="list-wrapper" v-else>No Results</div>
</template>

<script>
import ListItemDesktop from './ListItems/Desktop/ListItemDesktop'
import ListItemMobile from './ListItems/Mobile/ListItemMobile'

export default {
  name: 'ListWrapper',
  components: {
    ListItemDesktop,
    ListItemMobile,
  },
  props: ['isMobileWidth', 'template'],
  data() {
    return {
      isShowMore: false,
      isLoading: false,
      isExitShow: false,
    }
  },
  computed: {
    isRouteCorrect() {
      return this.$nuxt.$route.name === 'slug'
    },
    pageData() {
      return this.$store.state.pages.pageData
    },
    list() {
      return this.$store.state.jobs?.list
    },
    page() {
      return this.$store.state.jobs.page
    },
    totalJobs() {
      return this.$store.state.jobs.meta.totalJobs
    },
    perPage() {
      return this.$store.state.jobs.perPage
    },
    shortTemplate() {
      // return this.template === 'ListItemLogo';
      return true;
    },
    templateDesktop() {
      switch (this.template) {
        case 'ListItemLogo':
          return 'ListItemLogoDesktop'
        default:
          return 'ListItemDesktop'
      }
    },
    templateMobile() {
      switch (this.template) {
        case 'ListItemLogo':
          return 'ListItemLogoDesktop'
        default:
          return 'ListItemMobile'
      }
    },
  },
  methods: {
    async setPage() {
      this.isLoading = true
      await this.$store.dispatch('jobs/setPage')
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, clear: false, loader: false})
      this.isLoading = false

      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;

    },
    scroll() {
      if (process.browser) {
        window.onscroll = () => {
          this.$debounce(async () => {
              let showMorePosition = this.$refs.showMore.getBoundingClientRect().top - window.innerHeight - 850
              if ((showMorePosition < -300 && showMorePosition > -500) && !this.isLoading) {
                this.isLoading = true
                await this.$store.dispatch('jobs/setPage')
                await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, clear: false, loader: false})
                this.isLoading = false
              }
            }, 600
          )
        }
      }
    },
    mouseLeave(event) {
      let isExitShowed = this.$cookies.get('exit_popup');

      if (!this.isExitShow && !isExitShowed) {
        if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
          this.$store.dispatch('showLegalPopup', 'exit')
          // this.isExitShow = true
          // this.$cookies.set('exit_popup', true)
        }
      }
    },
    popstate(event) {
      if (event.state && event.state.wisepops === 'exit-intent') {
        this.$store.dispatch('showLegalPopup', 'exit')
      }
    }
  },
  mounted() {
    // this.scroll()
    document.addEventListener('mouseleave', this.mouseLeave)


    if (window.innerWidth <= 768 && window.matchMedia('(max-width: 2048px)').matches) {
      window.addEventListener('popstate', this.popstate)

      if (
        !window.history.state ||
        window.history.state.wisepops !== 'normal-intent'
      ) {
        window.history.replaceState({wisepops: 'exit-intent'}, '')
        window.history.pushState({wisepops: 'normal-intent'}, '')
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('mouseleave', this.mouseLeave)
    window.removeEventListener('popstate', this.popstate)
  },
}
</script>

<style scoped lang="scss">
.list-wrapper {
  margin-top: 10px;
  margin-bottom: 15px;

  @media (max-width: $screen-sm-max) {
    margin-top: 20px;
  }

  .show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #246BFD;
    border-radius: 5px;
    width: 190px;
    height: 40px;
    margin: 30px auto 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    color: #FFFFFF;

    &:hover {
      background: #6597ff;
    }


    &.new {
      background: #000000;
      border-radius: 50px;
      width: 106px;
      height: 32px;
      font-weight: 700;
      font-size: 15px;
      line-height: 16px;
      color: #FFFFFF;

      &:hover {
        background: #232323;
      }
    }
  }
}
</style>
