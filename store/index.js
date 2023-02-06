export const state = () => ({
  menu: [],
  global: {
    title: ' | ' + new Date().getFullYear() + ' | Recommended-Jobs.com'
  },
  isShowContentModal: false,
  location: '',
  userLocation: {},
  search: '',
  userIp: '',
})

export const getters = {
  location(state) {
    return `${state.userLocation.city}, ${state.userLocation.countryCode}`
  }
}

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
  SET_USER_LOCATION(state, payload) {
    state.userLocation = payload
  },
  SET_USER_IP(state, payload) {
    state.userIp = payload
  }
}

export const actions = {
  async nuxtServerInit({dispatch, getters}, {req}) {
    let ip = req.headers['cf-connecting-ip'] ? req.headers['cf-connecting-ip'] : req.headers['x-real-ip'];
    // const ip = '173.239.211.33'

    const {data} = await this.$axios.get(`http://ip-api.com/json/${ip}`)
    if (data && ip) {
      dispatch('setUserLocation', data)
    } else {
      dispatch('setUserLocation', {
        city: 'New York',
        country: 'United States',
        countryCode: 'US'
      })
    }

    dispatch('setLocation', getters['location'])
    dispatch('setUserIp', ip)
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
  async setUserLocation({commit}, payload) {
    commit('SET_USER_LOCATION', payload)
  },
  async setUserIp({commit}, payload) {
    commit('SET_USER_IP', payload)
  },
  async getCities({commit}, params) {
    const {data} = await this.$axios.get('cities', {params})
    return data
  },
  async getSuggestions({commit}, params) {
    const {data} = await this.$axios.get('suggestions', {params})
    return data?.suggestions
  },
}

