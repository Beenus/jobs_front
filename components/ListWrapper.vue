<template>
  <div class="list-wrapper" v-if="list.length">
    <div class="desktop" v-if="!isMobileWidth">
      <ListItemDesktop v-for="(job, index) in list" :key="index" :job="job" :index="index+1"/>
    </div>
    <div class="mobile" v-else>
      <ListItemMobile v-for="(job, index) in list" :key="index" :job="job" :index="index+1"/>
    </div>

    <div class="show-more" @click="setPage">Show More</div>
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
      await this.$store.dispatch('jobs/getJobs', this.$route.name)
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
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
    border-bottom: 1px solid #EEEEEE;
    cursor: pointer;

    &:hover {
      color: #000000;
    }

  }
}
</style>
