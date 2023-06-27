<template>
  <div class="blog">
    <div class="container">
      <h1 class="title">Recommended Jobs Blog</h1>
    </div>
    <LazyBlogCategories/>
    <LazyBlogList/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Blog' + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Recommended10 is a comparison platform that bring you useful lists covering a wide variety of retail products that can help you save time and money',
        }
      ]
    }
  },
  async asyncData({route, store, error, app, redirect}) {
    await store.dispatch('registerPageView', {
      type: 'BLOG_INDEX',
      locale: route.params.lang,
      page_id: null,
      session: app.$cookies.get('session_uuid'),
      ip: store.state.ip,
      country: store.state.userLocationCountry?.country,
    })

    const page = +route.query?.page?.replace(/[^0-9]/g, '') || 1
    const category = route.query?.category || null

    const blogList = await store.dispatch('blog/getBlogList', {
      params: {
        locale: route.params.lang,
        page: page,
        category: category,
      }
    })

    return {}

  },
  methods: {},
  computed: {
    blogList() {
      return this.$store.state.blog.list
    }
  },
  watch: {
    '$route.query.category': async function (val) {
      await this.$store.dispatch('blog/getBlogList', {
        params: {
          locale: this.$route.params.lang,
          category: val,
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.blog {
  padding-top: 70px;

  @media (max-width: $screen-xs-max) {
    padding-top: 30px;
  }

  .title {
    color: #000;
    font-size: 38px;
    line-height: 38px;
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 15px;

    @media (max-width: $screen-xs-max) {
      font-size: 28px;
      line-height: 28px;
    }
  }
}
</style>
