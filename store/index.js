export const state = () => ({
  menu: [],
  global: {
    title: ' | ' + new Date().getFullYear() + ' | Recommended-Jobs.com'
  },
  isShowContentModal: false,
  isShowMenu: false,
  location: '',
  userLocation: {},
  userOriginalLocation: {},
  search: '',
  userIp: '',
  source: null,
  isShowLegalPopup: false,
  legalPopupType: null,
  isHideSubscribe: false,
  globalTemplate: 'ListItem',
  isHeaderVisible: true,
  clickId: '',
})

export const getters = {
  location(state) {
    return `${state.userLocation.city}`
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
  SET_USER_ORIGINAL_LOCATION(state, payload) {
    state.userOriginalLocation = payload
  },
  SET_USER_IP(state, payload) {
    state.userIp = payload
  },
  SET_SOURCE(state, payload) {
    state.source = payload
  },
  SET_SHOW_LEGAL_POPUP(state, payload) {
    state.isShowLegalPopup = true
    state.legalPopupType = payload
  },
  SET_CLOSE_LEGAL_POPUP(state) {
    state.isShowLegalPopup = false
    state.legalPopupType = null
  },
  SET_HIDE_SUBSCRIBE(state, payload) {
    state.isHideSubscribe = payload
  },
  SET_USER_TIMEZONE(state, payload) {
    state.userTimezone = payload
  },
  SET_IS_HEADER_VISIBLE(state, payload) {
    state.isHeaderVisible = payload
  },
  SET_SHOW_MENU(state, payload) {
    state.isShowMenu = payload ? payload : !state.isShowMenu
  },
  SET_CLICK_ID(state, payload) {
    state.clickId = payload
  },
}

export const actions = {
  async nuxtServerInit({dispatch, getters}, {req, route, $cookies}) {
    let ip = req.headers['cf-connecting-ip'] ? req.headers['cf-connecting-ip'] : req.headers['x-real-ip'];
    // const ip = '173.239.211.33' //US
    // const ip = '84.247.59.200' //DE

    if (route.query.gclid) {
      $cookies.set('gclid', route.query.gclid)
    }

    if (route.query.msclkid) {
      $cookies.set('msclkid', route.query.msclkid)
    }

    const {data} = await this.$axios.get(`http://ip-api.com/json/${ip}`)
    if (data && ip) {
      dispatch('setUserLocation', data)
      dispatch('setUserOriginalLocation', data)
    } else {
      dispatch('setUserLocation', {
        city: 'New York',
        country: 'United States',
        countryCode: 'US',
        region: 'NY',
        timezone: 'America/New_York',
      })
      dispatch('setUserOriginalLocation', {
        city: 'New York',
        country: 'United States',
        countryCode: 'US',
        region: 'NY',
        timezone: 'America/New_York',
      })
    }

    let clickId = $cookies.get('gclid') || $cookies.get('msclkid');

    await dispatch('pages/getPopularPages', route?.params?.slug)

    dispatch('setClickId', clickId)
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
  async setUserOriginalLocation({commit}, payload) {
    commit('SET_USER_ORIGINAL_LOCATION', payload)
  },
  async setUserIp({commit}, payload) {
    commit('SET_USER_IP', payload)
  },
  async setClickId({commit}, payload) {
    commit('SET_CLICK_ID', payload)
  },
  async getCities({commit, state}, params) {
    // console.log(state.source);
    if (state.source) {
      // state.source.cancel('Canceled')
    }
    const cancelToken = this.$axios.CancelToken;
    const source = cancelToken.source()
    commit('SET_SOURCE', source)

    const {data} = await this.$axios.get('cities', {params, cancelToken: state.source.token})
    return data
  },
  async getSuggestions({commit, state}, params) {
    if (state.source) {
      // state.source.cancel()
    }
    const cancelToken = this.$axios.CancelToken;
    const source = cancelToken.source('Canceled')
    commit('SET_SOURCE', source)

    const {data} = await this.$axios.get('suggestions', {params, cancelToken: state.source.token})
    return data?.suggestions
  },
  async registerPageView({commit}, params) {
    const {data} = await this.$axios.post('analytics', params)
    this.$cookies.set('session_uuid', data.session_uuid)
  },
  async registerOutclick({commit,state}, params) {
    const {data} = await this.$axios.post('analytics/outclick', {...params, clickId: state.clickId})
  },
  async registerEmailClick({commit}, params) {
    const {data} = await this.$axios.post('analytics/email/click', params)
  },
  async emailSubscribe({commit}, params) {
    const {data} = await this.$axios.post('analytics/email/subscribe', params)
  },
  async unsubscribeEmail({commit}, params) {
    const {data} = await this.$axios.post('analytics/email/unsubscribe', params)
  },
  async registerExitPopupView({commit}, params) {
    const {data} = await this.$axios.post('analytics/exit/view', params)
  },
  async registerExitPopupClick({commit}, params) {
    const {data} = await this.$axios.post('analytics/exit/click', params)
  },
  hideSubscribe({commit}, payload) {
    commit('SET_HIDE_SUBSCRIBE', payload)
  },
  showLegalPopup({commit}, payload) {
    commit('SET_SHOW_LEGAL_POPUP', payload)
  },
  showMenu({commit}, payload) {
    commit('SET_SHOW_MENU', payload)
  },

  closeLegalPopup({commit}) {
    commit('SET_CLOSE_LEGAL_POPUP')
  },
  changeIsHeaderVisible({commit}, payload) {
    commit('SET_IS_HEADER_VISIBLE', payload)
  },
}

