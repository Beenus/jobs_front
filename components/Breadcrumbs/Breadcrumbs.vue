<template>
  <div class="breadcrumbs">
    <BreadcrumbsItem v-for="(item, index) in links" :key="index" :item="item" :isLast="links.length - 1 === index"/>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ['links'],
}
</script>

<style scoped lang="scss">
.breadcrumbs {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
</style>
