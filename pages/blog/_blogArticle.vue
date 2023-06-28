<template>
  <div class="blog-article">
    <div class="top-part">
      <!--      <div class="bg" v-if="article.image" :style="{background:`url(${article.image}) no-repeat`}"/>-->
      <div class="container">
        <div class="page-title">
          <h1>
            {{ article.title }}
          </h1>

          <!--          <time>Last Update: {{ article.date_full }}</time>-->
          <nuxt-link :to="`/blog?category=${article.category.slug}`" class="category"> {{ article.category.name }}</nuxt-link>

          <nuxt-img
            class="blog-image"
            fit="cover"
            format="webp"
            loading="lazy"
            :src="article.image"
            :alt="article.title"
            quality="60"
            :width="960" :height="280"
          />
        </div>
      </div>
    </div>
    <!--    <div class="article-list">-->
    <!--      <div class="container">-->
    <!--        <BlogProducts/>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="blog-content">
      <BlogContent :anchors="article.links" :latest="article.latest_articles">
        <div class="paragraph" v-html="article.description"/>
      </BlogContent>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: (this.article.seo_title || this.article.title) + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.seo_description || 'Recommended10 is a comparison platform that bring you useful lists covering a wide variety of retail products that can help you save time and money',
        }
      ]
    }
  },
  async asyncData({store, route}) {
    const payload = {
      slug: route.params.blogArticle,
      params: {
        locale: route.params.lang,
      }
    }

    await store.dispatch('blog/getBlogArticleData', payload)

    return {}
  },
  computed: {
    article() {
      return this.$store.state.blog.blogArticleData
    },
    backgroundImage() {
      return this.$img(this.article.image, {width: 650, format: 'webp', quality: 50})
    },
  }
}
</script>

<style scoped lang="scss">
.top-part {
  padding: 30px 15px 40px;
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  min-height: 300px;

  @media(max-width: $screen-xs-max) {
    min-height: 150px;
    padding: 15px 0;
    display: flex;
    flex-flow: column-reverse;
  }

  .bg {
    height: 100%;
    width: 100%;
    max-width: 590px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    background-position-y: 50% !important;
    background-size: cover !important;

    @media(max-width: $screen-xs-max) {
      max-width: 100%;
      height: 160px;
      position: relative;
      background-position: initial !important;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 80%;
      height: 100%;
      background-image: linear-gradient(to left, rgba(255, 0, 0, 0), rgb(255, 255, 255));
    }
  }

  .page-title {
    @media(max-width: $screen-xs-max) {
      padding: 0 15px;
    }

    h1 {
      font-weight: 800;
      font-size: 36px;
      line-height: 42px;
      color: #112536;
      margin-top: 0;
      margin-bottom: 10px;

      @media(max-width: $screen-xs-max) {
        font-size: 24px;
        line-height: 30px;
      }
    }

    .category {
      border-radius: 25px;
      background: #F5F5F5;
      height: 38px;
      padding: 5px 15px;
      margin-bottom: 10px;
      color: #246BFD;
      font-size: 16px;
      font-weight: 600;
      text-decoration-line: underline;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: .3s;

      @media(max-width: $screen-xs-max) {
        font-size: 14px;
        height: 32px;
      }

      &:hover {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }
    }

    time {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #112536;
    }

    .blog-image {
      margin-top: 10px;
    }

    .description {
      max-width: 560px;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #112536;

      @media(max-width: $screen-xs-max) {
        font-size: 13px;
        line-height: 16px;
        max-width: 230px;
      }

      &.desktop {
        @media(max-width: $screen-xs-max) {
          display: none;
        }
      }

      &.mobile {
        @media(min-width: $screen-sm) {
          display: none;
        }
      }
    }
  }
}

.article-list {
  margin-top: 20px;
  padding: 0 15px;
}
</style>
