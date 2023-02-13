import Pages from "@/pages/index.vue";

export const state = () => ({
  list: [],
  meta: {},
  perPage: 15,
  page: 1,
  error: null,
  fetching: false,
})

export const getters = {}

export const mutations = {
  SET_JOBS(state, payload) {
    if (payload.clear) {
      state.list = [...new Map(payload.list.map(item => [item['jobkey'], item])).values()]
    } else {
      state.list = [...new Map(state.list.concat(payload.list).map(item => [item['jobkey'], item])).values()]
    }
  },
  SET_JOBS_META(state, payload) {
    state.meta = payload
  },
  SET_JOBS_CLEAR(state) {
    state.list = []
    state.meta = {}
  },
  SET_PAGE_UP(state) {
    state.page = state.page + 1
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_FETCHING(state, payload) {
    state.fetching = payload
  },
}

export const actions = {
  async getJobs({commit, rootState, rootGetters}, payload) {
    try {
      commit('SET_ERROR', null)

      if (payload.loader) {
        commit('SET_FETCHING', true)
      }

      const params = {
        ip: rootState.userIp,
        search: rootState.search,
        location: rootGetters['location'],
        countryCode: rootState.userLocation.countryCode,
        perPage: rootState.jobs.perPage,
        page: rootState.jobs.page,
      }

      const {data} = await this.$axios.get('jobs', {params})
      commit('SET_JOBS', {list: data.list, clear: payload.clear})
      commit('SET_JOBS_META', data.meta)
      commit('SET_FETCHING', false)

      if (payload.clear === undefined || payload.force) {
        await this.$router.push({path: '/jobs', query: {search: params.search, location: params.location}})
      }
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
  clearJobs({commit}, payload) {
    commit('SET_JOBS_CLEAR')
  },
  setPage({commit}) {
    commit('SET_PAGE_UP')
  },
  clearErrors({commit}) {
    commit('SET_ERROR', null)
  },
  setErrors({commit}, payload) {
    commit('SET_ERROR', payload)
  },
}
