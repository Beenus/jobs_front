<template>
  <div class="list-item-mobile" :class="{ribbon: job.ribbon, visited: isVisited}">
    <div class="ribbon" v-if="job.ribbon" :class="job.ribbon.color || 'green'">{{ job.ribbon.text }}</div>

    <div class="title">{{ job.jobtitle }}</div>
    <div class="company-location">
      <div class="company">{{ companyShort }}</div>
      <div class="location">{{ locationShort }}</div>
    </div>
    <div class="description" v-html="job.description"/>
    <CTA :link="job.url" text="Salary & More Info" :onMouseDown="job.onmousedown" @click.native="visitedJob"/>
  </div>
</template>

<script>
import CTA from '../../CTA'

export default {
  name: 'ListItemMobile',
  props: ['job', 'index'],
  components: {
    CTA,
  },
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
  computed: {
    companyShort() {
      return this.job.company.length > 12 ? this.job.company.substring(0, 12).concat('...') : this.job.company
    },
    locationShort() {
      return this.job.formattedLocation.length > 14 ? this.job.formattedLocation.substring(0, 14).concat('...') : this.job.formattedLocation
    },
  },
  mounted() {
    if (process.browser) {
      this.checkVisited()
    }
  }
}
</script>

<style scoped lang="scss">
.list-item-mobile {
  border: 1px solid #EEEEEE;
  margin-bottom: 10px;
  border-radius: 28px;
  position: relative;
  padding: 30px 20px 25px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

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
      border-radius: 28px;
    }
  }

  .ribbon {
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    padding: 3px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 28px 0 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 1;

    &::before {
      content: '';
      display: block;
      height: 12px;
      pointer-events: none;
      width: 12px;
      margin-right: 5px;
      margin-top: -1px;
    }

    &.green {
      color: #050505;
      background: #00FFA3;

      &::before {
        background: url("~/assets/img/svg/ribbons/salary.svg") center / cover no-repeat;
      }
    }

    &.purple {
      color: #fff;
      background: #EB00FF;

      &::before {
        background: url("~/assets/img/svg/ribbons/experience.svg") center / cover no-repeat;
      }
    }

    &.orange {
      color: #fff;
      background: #FF9D29;

      &::before {
        background: url("~/assets/img/svg/ribbons/immediate.svg") center / cover no-repeat;
      }
    }

    &.red {
      color: #fff;
      background: #F75555;

      &::before {
        background: url("~/assets/img/svg/ribbons/demand.svg") center / cover no-repeat;
      }
    }
  }

  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: #000000;
    margin-bottom: 10px;
  }

  .company-location {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #EEEEEE;

    > div {
      display: flex;
      align-items: center;
      font-size: 16px;
      line-height: 16px;
      color: #7C7C7C;

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
    margin-bottom: 15px;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    color: #7C7C7C;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .cta {
    max-width: 100%;
    width: 100%;
  }
}
</style>
