<template>
  <div class="categories-wrap">
    <div class="container">
      <div class="categories">
        <nuxt-link :to="`/blog`" class="category" :class="{active: !querySlug}">All</nuxt-link>
        <nuxt-link :to="`/blog?category=${category.slug}`"
                   v-for="(category, index) in categories"
                   :key="index"
                   class="category"
                   :class="{active: querySlug === category.slug}"
        >
          {{ category.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  computed: {
    categories() {
      return this.$store.state.blog.categories
    },
    querySlug() {
      return this.$route.query.category
    }
  }
}
</script>

<style scoped lang="scss">
.categories {
  display: flex;
  gap: 10px;

  @media (min-width: $screen-sm) {
    flex-flow: row wrap;
  }
  &-wrap {
    margin-bottom: 30px;
    padding: 0 15px;

    @media (max-width: $screen-xs-max) {
      overflow: scroll;
    }
  }

  .category {
    background: #F5F5F5;
    border-radius: 25px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    padding: 5px 15px;
    text-decoration: none;
    white-space: nowrap;

    &.active, &:hover {
      background: #2480FE;
      color: #fff;
    }
  }
}
</style>
