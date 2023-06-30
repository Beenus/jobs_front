export const state = () => ({
  list: [],
  categories: [],
  blogArticleData: {},
  latestArticles: [],
})

export const getters = {}

export const mutations = {
  SET_BLOG_LIST(state, payload) {
    state.list = payload
  },

  SET_BLOG_CATEGORIES(state, payload) {
    state.categories = payload
  },

  SET_BLOG_ARTICLE_DATA(state, payload) {
    state.blogArticleData = payload
  },

  SET_LATEST_ARTICLES(state, payload) {
    state.latestArticles = payload
  },
}

export const actions = {
  async getBlogList({commit}, payload) {
    const {data} = await this.$axios.get('blog/list', payload)

    commit('SET_BLOG_CATEGORIES', data.categories)
    commit('SET_BLOG_LIST', data.list)
  },

  async getBlogArticleData({commit}, payload) {
    let params = payload.params
    const {data} = await this.$axios.get(`blog/${payload.slug}`, {params})
    commit('SET_BLOG_ARTICLE_DATA', data.data)
    return data.data
  },

  async getLatestArticles({commit}, id) {
    const {data} = await this.$axios.get(`blog/latest`, {
      params: {
        id,
      }
    })
    commit('SET_LATEST_ARTICLES', data.latest_articles)
  },
}

