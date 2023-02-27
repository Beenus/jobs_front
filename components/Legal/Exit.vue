<template>
  <div class="exit-popup">
    <div class="title">Don't Miss These Job Offers Near You</div>
    <div class="jobs-list">
      <ListItemExitDesktop v-for="(job, index) in formattedList" :key="index" :job="job" :index="index + 1"/>
    </div>
  </div>
</template>

<script>
import ListItemExitDesktop from '../ListItems/Desktop/ListItemExitDesktop'

export default {
  name: "Exit",
  components: {
    ListItemExitDesktop,
  },
  computed: {
    list() {
      return this.$store.state.jobs?.list
    },
    formattedList() {
      let inStorage = JSON.parse(localStorage.getItem('visitedJobs')) || []

      return [...this.list]?.sort((a, b) => {
        if (inStorage.includes(a.jobkey)) {
          return 1
        } else if (inStorage.includes(b.jobkey)) {
          return -1
        } else {
          return 0
        }
      })?.slice(0, 3)
    },
  },
}
</script>

<style scoped lang="scss">
.exit-popup {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 12px;
  color: #fff;
}

.jobs-list {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
}
</style>
