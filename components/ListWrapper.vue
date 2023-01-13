<template>
  <div class="list-wrapper">
    <div class="desktop" v-if="!isMobileWidth">
      <ListItemDesktop v-for="(job, index) in list" :key="index" :job="job" :index="index+1"
                       v-if="index+1 <= isShowPaginated"/>
    </div>
    <div class="mobile" v-else>
      <ListItemMobile v-for="(job, index) in list" :key="index" :job="job" :index="index+1"
                      v-if="index+1 <= isShowPaginated"/>
    </div>

    <div class="setPage" @click="setPage" v-if="isLastPage">PAGE MORE</div>
  </div>
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
      return this.$store.state.jobs.list
    },
    page() {
      return this.$store.state.jobs.page
    },
    perPage() {
      return this.$store.state.jobs.perPage
    },
    isShowPaginated() {
      return this.page * this.perPage
    },
    isLastPage() {
      return this.isShowPaginated <= this.list.length
    },
  },
  methods: {
    setPage() {
      this.$store.dispatch('jobs/setPage')
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
}
</style>
