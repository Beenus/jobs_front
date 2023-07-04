<template>
  <div class="sitemap">
    <div class="container">
      <h1>Sitemap</h1>
      <div class="pages-wrapper">
        <div class="pages">
          <h2 class="title">Pages:</h2>
          <ul>
            <li v-for="page in pages" :key="page.slug">
              <h4>
                <nuxt-link :to="page.slug">{{ page.title }}</nuxt-link>
              </h4>
            </li>
          </ul>
        </div>

        <div class="pages">
          <h2 class="title">Blog:</h2>
          <ul>
            <li v-for="blog in blogs" :key="blog.slug">
              <h4>
                <nuxt-link :to="'/blog/' + blog.slug">{{ blog.title }}</nuxt-link>
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sitemap",
  head() {
    return {
      title: 'Sitemap | Recommended Jobs',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Our Local Job Search Engine is the ultimate destination for all your job search needs. We provide the most comprehensive, up-to-date listings of local jobs in your area, so you can easily find the perfect job for you.',
        }
      ]
    }
  },
  async asyncData({store, route, app}) {
    await store.dispatch('registerPageView', {
      type: 'SITEMAP',
      page_id: null,
      session: app.$cookies.get('session_uuid'),
      ip: store.state.userIp,
      country: store.state.userOriginalLocation?.country,
    })

    const {data} = await app.$axios.get('sitemap-extended')


    return {
      pages: data.routes,
      blogs: data.blogs,
    }
  },
}
</script>

<style scoped lang="scss">
.sitemap {
  padding: 30px 15px;

  h1 {
    margin: 0;
  }

  .pages {
    display: flex;
    flex-flow: column;

    h2 {
      margin-bottom: 0;
    }

    ul {
      margin-top: 0;
      padding-left: 15px;
    }
  }
}
</style>
