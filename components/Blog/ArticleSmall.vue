<template>
  <div class="article-small">
    <div class="top-part">
      <div class="date"> {{ article.date_full }} |</div>
      <nuxt-link :to="`/blog?category=${article.category.slug}`" class="category"> {{ article.category.name }}</nuxt-link>
    </div>
    <nuxt-link :to="article.url" class="title">{{ article.title }}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "ArticleSmall",
  props: ['article'],
}
</script>

<style scoped lang="scss">
.article-small {
  .top-part {
    display: flex;

    .date {
      font-weight: 300;
      font-size: 14px;
      line-height: 19px;
      color: #000000;
      margin-right: 5px;
    }

    .category {
      font-weight: 300;
      font-size: 14px;
      line-height: 19px;
      color: #2480FE;
    }
  }

  .title {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    text-decoration: none;
  }
}
</style>
