<template>
  <a class="list-item-exit-desktop ribbon" :href="job.url" target="_blank" :title="job.jobtitle"
     :onmousedown="job.onmousedown" @click="registerOutclick">
    <span class="index">{{ index }}</span>
    <div class="ribbon orange">Immediate start</div>
    <div class="content-part">
      <div class="title">{{ job.jobtitle }}</div>
      <div class="company-location">
        <div class="company">{{ companyShort }}</div>
        <div class="location">{{ locationShort }}</div>
      </div>
    </div>
  </a>
</template>

<script>
import CTA from '../../CTA'
import analytics from "@/mixins/analytics";

export default {
  name: 'ListItemDesktop',
  components: {CTA},
  mixins: [analytics],
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
    async registerOutclick() {
      if (process.browser) {
        await this.registerOutclickMixin('LIST_ITEM_EXIT_POPUP')
      }
    },
  },
  computed: {
    companyShort() {
      return this.job.company.length > 15 ? this.job.company.substring(0, 15).concat('...') : this.job.company
    },
    locationShort() {
      return this.job.formattedLocation.length > 17 ? this.job.formattedLocation.substring(0, 17).concat('...') : this.job.formattedLocation
    },
  },
}
</script>

<style scoped lang="scss">
.list-item-exit-desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px 25px 50px;
  margin-bottom: 10px;
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  position: relative;
  text-decoration: none;
  min-height: 100px;
  width: 100%;

  @media (max-width: $screen-xs-max) {
    padding: 12px 20px;
    min-height: 90px;
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

    @media (max-width: $screen-xs) {
      height: 71px;
    }

    .title {
      color: #000000;
      margin-bottom: 7px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;

      @media (max-width: $screen-xs) {
        height: 45px;
        display: flex;
        align-items: center;
      }
    }

    .company-location {
      display: flex;
      align-items: center;

      > div {
        display: flex;
        font-weight: 400;
        font-size: 14px;
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

          @media (max-width: $screen-xs) {
            display: none;
          }

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

  .ribbon {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 25px;
    padding: 3px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 0;
    font-weight: 500;
    font-size: 13px;
    line-height: 1;

    &::before {
      content: '';
      display: block;
      height: 12px;
      pointer-events: none;
      width: 12px;
      margin-right: 5px;
      margin-top: -2px;
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
        width: 7px;
        background: url("~/assets/img/svg/ribbons/immediate.svg") center / cover no-repeat;
      }
    }

    &.red {
      color: #fff;
      background: #F75555;

      &::before {
        width: 9px;
        background: url("~/assets/img/svg/ribbons/demand.svg") center / cover no-repeat;
      }
    }
  }

  .index {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 35px;
    height: 35px;
    left: -17px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background: #F5F5F5;
    border: 1px solid #818181;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    color: #000000;

    @media (max-width: $screen-xs-max) {
      left: -12px;
      width: 25px;
      height: 25px;
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
    }

  }
}
</style>
