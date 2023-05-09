<template>
  <a class="list-item-exit-desktop ribbon" :href="job.url" target="_blank" :title="job.jobtitle"
     :onmousedown="job.onmousedown" @click="registerOutclick">
    <span class="index">{{ index }}</span>
    <div class="content-part">
      <div class="title">{{ job.jobtitle }}</div>
      <div class="company-location">
        <div class="company">{{ companyShort }}</div>
        <div class="location">{{ locationShort }}</div>
      </div>
      <div class="cta">
        <div class="more-details">More Details</div>
        <div class="visit-site">View Salary</div>
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
  justify-content: space-between;
  position: relative;
  text-decoration: none;
  width: 100%;
  padding-bottom: 10px;

  &:not(:last-of-type) {
    margin-bottom: 30px;
    border-bottom: 1px solid #DBDBDB;
  }

  @media (max-width: $screen-xs-max) {
    padding: 12px 20px;
  }

  .content-part {
    width: 100%;
    max-width: 650px;

    .title {
      color: #000000;
      margin-bottom: 7px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;

      @media (max-width: $screen-xs) {
        display: flex;
        align-items: center;
      }
    }

    .company-location {
      display: flex;
      align-items: center;

      @media (max-width: $screen-xs) {
        display: none;
      }

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

  .cta {
    margin-top: 5px;
    display: flex;
    & > div {
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      text-decoration-line: underline;
      color: #246BFD;

      &:last-child {
        margin-left: 5px;
      }
    }
  }

  .index {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #F5F5F5;
    border: 1px solid #818181;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    color: #000000;
    margin-right: 15px;
  }
}
</style>
