<template>
  <div class="list-wrapper" v-if="list.length">
    <div class="desktop" v-if="!isMobileWidth">
      <ListItemDesktop v-for="(job, index) in list" :key="index" :job="job" :index="index+1"/>
    </div>
    <div class="mobile" v-else>
      <ListItemMobile v-for="(job, index) in list" :key="index" :job="job" :index="index+1"/>
    </div>

    <div class="show-more" @click="setPage" ref="showMore">Show More</div>
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
  props: ['isMobileWidth'],
  data() {
    return {
      isShowMore: false,
      isLoading: false,
      isExitShow: false,
    }
  },
  computed: {
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
  },
  methods: {
    async setPage() {
      await this.$store.dispatch('jobs/setPage')
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, clear: false, loader: true})
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;

    },
    scroll() {
      if (process.browser) {
        window.onscroll = () => {
          this.$debounce(async () => {
              let showMorePosition = this.$refs.showMore.getBoundingClientRect().top - window.innerHeight - 500
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
      if (!this.isExitShow) {
        if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
          this.$store.dispatch('showLegalPopup', 'exit')
          this.isExitShow = true
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
    this.scroll()
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

  @media (max-width: $screen-sm-max) {
    margin-top: 20px;
  }

  .show-more {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    font-size: 15px;
    line-height: 20px;
    color: #797979;
    margin: 0 0 15px 0;
    cursor: pointer;

    &:hover {
      color: #000000;
    }

  }
}
</style>
