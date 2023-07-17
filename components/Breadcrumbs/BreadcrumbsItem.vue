<template>
  <div class="breadcrumbs-item">
    <NuxtLink v-if="item.link" :to="item.link" class="breadcrumbs-item">{{ item.name }}</NuxtLink>
    <div v-else class="breadcrumbs-item active">{{ item.name }}</div>
    <div class="separator" v-if="!isLast"></div>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbsItem",
  props: ['item', 'isLast'],
}
</script>

<style scoped lang="scss">
.breadcrumbs-item {
  color: #A7A7A7;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  display: flex;
  align-items: center;

  :not(.active) {
    margin-right: 15px;
  }

  .separator {
    margin-right: 15px;
    width: 8px;
    height: 10px;
    background: url("~/assets/img/svg/arrow_right_gray.svg") center / contain no-repeat;
  }

  &.active {
    font-weight: 700;
  }
}
</style>
