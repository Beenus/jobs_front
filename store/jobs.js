export const state = () => ({
  list: [],
  perPage: 10,
  page: 1,
})

export const getters = {}

export const mutations = {
  SET_JOBS(state, payload) {
    state.list = payload
  },
  SET_PAGE_UP(state, payload) {
    state.page = state.page + 1
  },
}

export const actions = {
  async nuxtServerInit({dispatch}, {req}) {
    // await dispatch('getMenu')
  },
  async getJobs({commit}) {
    const list = [
      {
        ribbon: 'High Salary',
        ribbon_color: 'green',
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        ribbon: 'No Experience',
        ribbon_color: 'purple',
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        ribbon: 'Immediate Start',
        ribbon_color: 'orange',
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
      {
        title: 'Director of Product',
        company: 'Apple Inc.',
        location: 'New York, NY',
        link: 'apple.com',
        description: 'Applying for this position, you’ll work remotely from your home in Israel and report directly to our Head of Product Design. Work remotely from home in a modern SaaS, Product-led company that has a US customer base. This is a remote role so you will work from home which saves you commuting time'
      },
    ]

    commit('SET_JOBS', list)
  },

  setPage({commit}) {
    commit('SET_PAGE_UP')
  }
}

