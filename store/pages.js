import Pages from "@/pages/index.vue";

export const state = () => ({
  pageData: {},
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
}

export const actions = {
  async getPageData({commit}, slug) {
    try {
      commit('SET_ERROR', null)
      commit('SET_FETCHING', true)

      const {data} = await this.$axios.get(`page/${slug}`,)

      commit('SET_PAGE_DATA', data?.page)

      return data?.page
    } catch (e) {
      if (e?.response) {
        const {data} = e?.response
        if (data?.message) {
          commit('SET_ERROR', data.message)
        }
      }
      commit('SET_ERROR', 'Internal Server Error')

    }
    commit('SET_FETCHING', false)
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
