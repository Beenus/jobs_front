import Pages from "@/pages/index.vue";

export const state = () => ({
  pageData: {},
  popularPages: {},
  popularTopics: {},
  popularSearches: {},
  suggestions: null,
  error: {},
  fetching: false,
})

export const getters = {}

export const mutations = {
  SET_PAGE_DATA(state, payload) {
    state.pageData = payload
  },
  SET_PAGE_DATA_CLEAR(state) {
    state.pageData = {}
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_FETCHING(state, payload) {
    state.fetching = payload
  },
  SET_POPULAR_PAGES(state, payload) {
    state.popularPages = payload
  },
  SET_POPULAR_TOPICS(state, payload) {
    state.popularTopics = payload
  },
  SET_POPULAR_SEARCHES(state, payload) {
    state.popularSearches = payload
  },
  SET_SUGGESTIONS(state, payload) {
    state.suggestions = payload
  },
}

export const actions = {
  async getPageData({commit}, slug) {
    try {
      commit('SET_ERROR', null)
      commit('SET_FETCHING', true)

      const {data} = await this.$axios.get(`page/${slug}`,)

      commit('SET_PAGE_DATA', data.page)

      setTimeout(() => {
        commit('SET_FETCHING', false)
      }, 300)

      return data?.page
    } catch (e) {
      if (e?.response) {
        const {data} = e?.response
        if (data?.message) {
          commit('SET_ERROR', data.message)
        }
      }
      commit('SET_ERROR', 'Internal Server Error')
      commit('SET_FETCHING', false)

    }
  },
  async getPopularPages({commit}, route) {
    const {data} = await this.$axios.get(`popular`, {params: {route}})
    commit('SET_POPULAR_PAGES', data?.popularPages)
    commit('SET_POPULAR_TOPICS', data?.popularTopics)
    commit('SET_POPULAR_SEARCHES', data?.popularSearches)
  },
  async generateNewSuggestions({commit}, keyword) {
    let suggestions = null
    try {
      const {data} = await this.$axios.get(`generateNewSuggestions`, {params: {keyword}})
      suggestions = data?.description
    } catch {
      const {data} = await this.$axios.get(`generateNewSuggestions`, {params: {keyword}})
      suggestions = data?.description
    }

    commit('SET_SUGGESTIONS', suggestions)
  },
  clearSuggestions({commit}) {
    commit('SET_SUGGESTIONS', null)
  },
  clearPageData({commit}) {
    commit('SET_PAGE_DATA_CLEAR')
  },
  clearErrors({commit}) {
    commit('SET_ERROR', null)
  },
  setErrors({commit}, payload) {
    commit('SET_ERROR', payload)
  },
}
