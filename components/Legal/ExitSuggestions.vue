<template>
  <div class="exit-popup">
    <div class="title">Let us help you pick a job.</div>
    <div class="job-pages" v-if="suggestions">
      <a v-if="suggestions" @click="openSuggestion(suggestion)" class="job-page"
         v-for="(suggestion, index) in suggestions"
         :title="suggestion"
         :key="index">
        {{ suggestion }}
      </a>
    </div>
    <div class="loader" v-else></div>
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
      return this.$store.state.pages.suggestions?.split(',')
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
  created() {
    this.$store.dispatch('pages/generateNewSuggestions', this.$store.state.search)
  },
  destroyed() {
    this.$store.dispatch('pages/clearSuggestions', this.$store.state.search)
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

.loader {
  color: #407FFF;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: loader 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

@-webkit-keyframes loader {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

@keyframes loader {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>
