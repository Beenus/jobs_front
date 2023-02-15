<template>
  <div class="list-item-desktop" :class="{ribbon: job.ribbon, visited: isVisited}">
    <div class="ribbon" v-if="job.ribbon" :class="job.ribbon_color || 'green'">{{ job.ribbon }}</div>
    <div class="content-part">
      <a class="title" :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="visitedJob">{{ job.jobtitle }}</a>
      <div class="company-location">
        <a class="company" :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="visitedJob">{{ job.company }}</a>
        <a class="location" :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="visitedJob">{{ job.formattedLocation }}</a>
      </div>
      <a class="description" :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="visitedJob" v-html="job.description"/>
    </div>
    <div class="cta-part">
      <CTA class="big" :link="job.url" :onMouseDown="job.onmousedown" @click.native="visitedJob"
           text="Salary & More Info"/>
      <a class="link" :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="visitedJob">
        Apply Now
      </a>
    </div>
  </div>
</template>

<script>
import CTA from '../../CTA'

export default {
  name: 'ListItemDesktop',
  components: {CTA},
  props: ['job', 'index'],
  data() {
    return {
      isVisited: false,
    }
  },
  methods: {
    visitedJob() {
      let inStorage = JSON.parse(localStorage.getItem('visitedJobs')) || []
      inStorage.push(this.job.jobkey)
      localStorage.setItem('visitedJobs', JSON.stringify(inStorage))

      this.checkVisited()
    },
    checkVisited() {
      let inStorage = JSON.parse(localStorage.getItem('visitedJobs')) || []
      this.isVisited = inStorage.includes(this.job.jobkey)
    },
  },
  computed: {},
  mounted() {
    if (process.browser) {
      this.checkVisited()
    }
  }
}
</script>

<style scoped lang="scss">
.list-item-desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 30px 30px;
  margin-bottom: 10px;
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  position: relative;

  &.ribbon {
    padding-top: 40px;
  }

  &.visited {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.6);
      pointer-events: none;
      z-index: 2;
      border-radius: 8px;
    }
  }

  .content-part {
    width: 100%;
    max-width: 650px;

    .title {
      display: flex;
      font-weight: 700;
      font-size: 22px;
      line-height: 20px;
      color: #000000;
      margin-bottom: 7px;
      text-decoration: none;
    }

    .company-location {
      display: flex;
      align-items: center;
      padding-bottom: 13px;
      margin-bottom: 15px;
      border-bottom: 1px solid #EEEEEE;

      > a {
        display: flex;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #7C7C7C;
        text-decoration: none;

        &::before {
          content: '';
          display: block;
          height: 16px;
          pointer-events: none;
          margin-right: 5px;
        }

        &.company {
          &::before {
            background: url("~/assets/img/svg/company.svg") center / cover no-repeat;
            width: 18px;
          }
        }

        &.location {
          margin-left: 10px;

          &::before {
            background: url("~/assets/img/svg/location.svg") center / cover no-repeat;
            width: 11px;
          }
        }
      }
    }

    .description {
      font-weight: normal;
      font-size: 15px;
      line-height: 20px;
      color: #7C7C7C;
      text-decoration: none;
    }
  }

  .cta-part {
    max-width: 270px;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    .link {
      margin-top: 15px;
      font-weight: 400;
      font-size: 15px;
      line-height: 100%;
      color: #000000;
      text-decoration: underline;

      &.visited {
        cursor: not-allowed;
      }
    }
  }

  .ribbon {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    padding: 3px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 0 0 0;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;

    &.green {
      color: #050505;
      background: #00FFA3;
    }

    &.purple {
      color: #fff;
      background: #EB00FF;
    }

    &.orange {
      color: #fff;
      background: #FF9D29;
    }
  }
}
</style>
