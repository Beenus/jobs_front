<template>
  <div class="blog-article-item">
    <nuxt-link :to="article.url" :title="article.title" class="left">
      <nuxt-img
        class="blog-image"
        fit="cover"
        format="webp"
        loading="lazy"
        :src="article.image"
        :alt="article.title"
        quality="30"
        :width="300" :height="200"
      />
    </nuxt-link>
    <div class="right">
      <nuxt-link :to="article.url" :title="article.title" class="title">
        {{ article.title || article.seo_title }}
      </nuxt-link>
      <nuxt-link :to="article.url" :title="article.title" class="text">{{ article.seo_description }}</nuxt-link>
      <nuxt-link :to="`/blog?category=${article.category.slug}`" class="category">
        {{ article.category.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogArticle",
  props: ['article'],
}
</script>

<style scoped lang="scss">
.blog-article-item {
  display: flex;
  margin-bottom: 30px;

  .left {
    width: 100%;
    max-width: 300px;
    margin-right: 20px;
    text-decoration: none;

    @media (max-width: $screen-xs-max) {
      max-width: 150px;
      max-height: 100px;
      min-width: 150px;
    }
  }

  .right {
    display: flex;
    flex-flow: column;
    align-items: flex-start;

    .title {
      font-weight: 800;
      font-size: 28px;
      line-height: 30px;
      color: #000000;
      margin-bottom: 15px;
      text-decoration: none;

      @media (max-width: $screen-xs-max) {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    .text {
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
      margin-bottom: 25px;
      text-decoration: none;

      @media (max-width: $screen-xs-max) {
        display: none;
      }
    }

    .category {
      text-decoration: none;
      padding: 6px 22px;
      background: #F5F5F5;
      border-radius: 25px;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #000000;

      &:hover {
        background: #eeeeee;
      }

      @media (max-width: $screen-xs-max) {
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #2480FE;
        background: none;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
