<template>
  <div class="content-part-wrap">
    <div class="container">
      <div class="content-part">
        <div class="left-sidebar">
          <div class="floating-sidebar">
            <div class="title">Jump to:</div>
            <a :href="`#${item.anchor}`" class="anchor" v-for="(item, index) in anchors" :key="index"
               :class="{active: item.anchor === activeAnchor}">
              {{ item.name }}
            </a>

          </div>
        </div>
        <div class="content">
          <slot/>
        </div>
        <div class="right-sidebar">
          <div class="floating-sidebar">
            <div class="title">Latest Articles</div>
            <ArticleSmall v-for="article in latest" :key="article.id" :article="article"/>
            <nuxt-link class="all-articles" :to="`/blog`">All Articles</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSmall from "@/components/Blog/ArticleSmall.vue";

export default {
  name: "BlogContent",
  components: {ArticleSmall},
  props: ['title', 'anchors', 'latest'],
  data() {
    return {
      activeAnchor: [],
    }
  },
  computed: {
    list() {
      return this.$store.state.blog.blogArticleData?.products_list
    },
    products() {
      return this.$store.state.blog.blogArticleData?.products_list?.products
    },
    formattedList() {
      return this.products?.slice(0, 3)
    },
  },
  watch: {
    '$route.hash': function (val) {
      this.activeAnchor = val.substring(1)
    }
  },
}
</script>

<style scoped lang="scss">
.content-part {
  display: flex;

  @media (max-width: $screen-sm-max) {
    flex-flow: column;
  }

  &-wrap {
    padding: 0 15px;
  }

  .left-sidebar {
    max-width: 142px;
    width: 100%;

    @media (max-width: $screen-sm-max) {
      display: none;
    }

    .floating-sidebar {
      background: #F5F5F5;
      position: sticky;
      top: 15px;
      display: flex;
      flex-flow: column;
      padding: 15px;

      .title {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        margin-bottom: 15px;
      }

      a {
        font-weight: 300;
        font-size: 14px;
        line-height: 19px;
        color: #000000;
        margin-bottom: 10px;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-width: 100%;
        word-break: break-word;

        &:hover, &.active {
          font-weight: 700;
        }
      }
    }
  }

  .content {
    margin-left: 30px;
    max-width: 508px;

    @media (max-width: $screen-sm-max) {
      max-width: 100%;
      margin-left: 0;
    }

    :deep(.paragraph h2) {
      font-weight: 800;
      font-size: 28px;
      line-height: 38px;
      color: #000000;
      margin-bottom: 15px;
    }

    :deep(.paragraph p) {
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
      margin-bottom: 30px;
    }
  }
}

.right-sidebar {
  width: 100%;
  max-width: 250px;
  margin-left: 30px;

  @media (max-width: $screen-sm-max) {
    max-width: 100%;
    margin: 40px 0 0;
  }

  .floating-sidebar {
    position: sticky;
    top: 15px;
    display: flex;
    flex-flow: column;
    width: 100%;
    background: #fff;


    .title {
      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
      color: #000000;
      margin-bottom: 20px;
    }

    .all-articles {
      font-weight: 700;
      font-size: 16px;
      line-height: 11px;
      color: #000000;
      margin-top: 10px;
    }
  }
}
</style>
