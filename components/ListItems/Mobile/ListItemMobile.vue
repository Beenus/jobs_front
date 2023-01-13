<template>
  <div class="list-item-mobile">
    <div class="title">{{ job.title }}</div>
    <div class="title">{{ job.company }}</div>
    <div class="title">{{ job.location }}</div>
    <div class="title">{{ job.description }}</div>
    <CTA :link="job.link"/>
  </div>
</template>

<script>
import CTA from '../../CTA'

export default {
  name: 'ListItemMobile',
  props: ['job', 'index'],
  components: {
    CTA,
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
