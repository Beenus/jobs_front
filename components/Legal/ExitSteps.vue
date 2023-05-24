<template>
  <div class="exit-popup">
    <div class="title" v-if="!isFinalStep">Let us help you pick a job.</div>
    <div class="title" v-else>Most <span>recommended jobs</span> for you</div>
    <div class="steps">
      <div class="step" v-if="!isFinalStep && !fetching">
        <div class="step-title" v-if="currentStep?.title" v-html="currentStep.title"></div>
        <div class="choices" :class="[currentStep.columns]">
          <div class="choice" v-for="(choice, index) in currentStep.choices" :key="index" @click="selectChoice(choice)">
            {{ choice }}
          </div>
        </div>
        <div class="search-input" v-if="currentStep.searchInput">
          <input class="input" type="text" placeholder="Type any other job title" v-model="searchValue" ref="search"
                 @keyup.enter="search(null)"/>
          <div class="search" @click="search(null)"/>
        </div>
      </div>
      <div class="searching" v-if="fetching">
        <div class="loader"/>
      </div>
      <div class="final-step" v-if="isFinalStep && !fetching && list.length">
        <ListItemExitDesktop v-for="(job, index) in list" :key="index" :job="job" :index="index + 1"/>
      </div>
    </div>
  </div>
</template>

<script>
import ListItemExitDesktop from '../ListItems/Desktop/ListItemExitDesktop'

export default {
  name: "ExitSteps",
  components: {
    ListItemExitDesktop,
  },
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
    isFinalStep() {
      return this.step >= this.steps.length
    },
    currentStep() {
      return this.steps[this.step]
    }
  },
  methods: {
    selectChoice(choice) {
      if (this.step === this.steps.length - 1) {
        this.search(choice)
      } else {
        this.$store.dispatch('registerExitPopupClick', {
          step: this.step,
          value: choice,
          session: this.$cookies.get('session_uuid'),
        })
      }

      this.step++
    },
    async search(choice) {
      this.fetching = true
      let keyword = choice ? choice : this.searchValue

      await this.$store.dispatch('registerExitPopupClick', {
        step: this.step,
        value: keyword,
        session: this.$cookies.get('session_uuid'),
      })

      this.list = await this.$store.dispatch('jobs/getJobsExit', {keyword})

      this.fetching = false
    },
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

  span {
    color: #33B1FF;
  }
}

.steps {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 30px 10px;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  .step {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    &-title {
      font-weight: 400;
      font-size: 24px;
      line-height: 33px;
      text-align: center;
      color: #000000;

      :deep(span) {
        color: #33B1FF;
      }
    }

    .choices {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: row wrap;
      gap: 5px;
      margin-top: 30px;
      margin-bottom: 30px;

      &.one {
        max-width: 175px;
      }

      &.two {
        max-width: 100%;

        .choice {

          @media (max-width: $screen-xs-max) {
            max-width: 45%;
          }
        }
      }

      .choice {
        background: #EEEEEE;
        border-radius: 8px;
        max-width: 175px;
        height: 56px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #000000;

        &:hover {
          cursor: pointer;
          background: #d9d9d9;
        }
      }
    }

    .search-input {
      display: flex;

      input {
        background: #FFFFFF;
        border: 2px solid #000000;
        border-radius: 8px 0 0 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
        max-width: 185px;
        width: 100%;
        outline: none;
      }

      .search {
        background: #000000;
        border: 2px solid #000000;
        border-radius: 0 8px 8px 0;
        min-width: 32px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &::before {
          display: block;
          content: '';
          background: url("~/assets/img/svg/magnify_glass_white.svg") center / contain no-repeat;
          min-width: 17px;
          min-height: 17px;
        }
      }
    }
  }

  .final-step {
    padding: 20px 40px;


    @media (max-width: $screen-xs-max) {
      padding: 0;
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
