export const state = () => ({
  menu: [],
  global: {
    title: ' | ' + new Date().getFullYear() + ' | Recommended-Jobs.com'
  },
  isShowContentModal: false,
  location: 'New York, NY',
  search: 'Amazon',
})

export const getters = {}

export const mutations = {
  SET_CONTENT_MODAL(state, payload) {
    state.isShowContentModal = payload
  },
  SET_LOCATION(state, payload) {
    state.location = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  },
}

export const actions = {
  async nuxtServerInit({dispatch}, {req}) {
    // await dispatch('getMenu')
  },
  async toggleContentModal({commit}, payload) {
    commit('SET_CONTENT_MODAL', payload)
  },
  async setLocation({commit}, payload) {
    commit('SET_LOCATION', payload)
  },
  async setSearch({commit}, payload) {
    commit('SET_SEARCH', payload)
  },
}

