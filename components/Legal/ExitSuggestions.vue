<template>
  <div class="exit-popup">
    <div class="title">Let us help you pick a job.</div>
    <div class="job-pages">
      <a v-if="suggestions" @click="openSuggestion(suggestion)" class="job-page"
         v-for="(suggestion, index) in suggestions"
         :title="suggestion"
         :key="index">
        {{ suggestion }}
      </a>
      <nuxt-link class="job-page" v-for="(page, index) in pages" :to="page.slug" :title="page.name" :key="index">
        {{ page.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "ExitSuggestions",
  data() {
    return {
      searchValue: '',
      list: [],
      fetching: false,
      step: 0,
      steps: [
        {
          title: 'What <span>Job Type</span> are you interested in?',
          searchInput: false,
          columns: 'one',
          choices: [
            'Work from home',
            'Remote',
            'Full Time',
            'Part Time',
            'No Experience',
          ],
        },
        // {
        //   title: 'Which <span>Job Title</span> are you looking for?',
        //   searchInput: true,
        //   columns: 'two',
        //   choices: [
        //     'Warehouse',
        //     'Cashier',
        //     'Customer Service',
        //     'Healthcare',
        //     'Driver',
        //     'Receptionist',
        //     'Sales',
        //     'Administrative',
        //     'Retail',
        //     'Restaurant',
        //   ],
        // },
      ],
    }
  },
  computed: {
    suggestions() {
      return this.pageData.suggestions?.split(',')
    },
    pages() {
      return this.$store.state.pages.popularPages
    },
    pageData() {
      return this.$store.state.pages.pageData
    },
  },
  methods: {
    async openSuggestion(suggestion) {
      await this.$store.dispatch('closeLegalPopup')
      await this.$store.dispatch('setSearch', suggestion)
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, force: true, loader: true, clear: true,})

      if (process.client) {
        window.scrollTo({top: 0});
      }

    }
  },
  mounted() {
    this.$store.dispatch('registerExitPopupView', {
      ip: this.$store.state.userIp,
      country: this.$store.state.userOriginalLocation?.country,
      session: this.$cookies.get('session_uuid'),
    })
  }
}
</script>

<style scoped lang="scss">
.exit-popup {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 12px;
  color: #fff;
}

.job-pages {
  display: flex;
  flex-flow: row wrap;
  white-space: nowrap;
  gap: 5px;
  justify-content: center;

  &-wrapper {
    overflow: auto;
    height: auto;

    @media (max-width: $screen-xs-max) {
      &.top {
        overflow: hidden;
        height: 105px;
        transition: height .3s;

        &.open {
          height: auto;
        }
      }
    }
  }

  .job-page {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 5px 20px;
    height: 40px;
    position: relative;
    text-decoration: none;
    background: #FFFFFF;
    //border: 1px solid #C1C7CD;
    border-radius: 50px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #4D5358;
    cursor: pointer;
    text-transform: capitalize;

    @media (max-width: $screen-xs-max) {
      height: 38px;

      &.top {
        height: 31px;
        font-weight: 500;
        font-size: 13px;
        line-height: 15px;
        padding: 5px 8px;
      }
    }

    &:hover {
      background: #e4e6e7;
    }

    &::before {
      content: '';
      display: block;
      height: 15px;
      pointer-events: none;
      z-index: 1;
      background: url("~/assets/img/svg/magnify_glass_blue.svg") center / cover no-repeat;
      width: 13px;
      margin-right: 10px;
    }
  }
}
</style>
