<template>
  <div class="list-item-mobile" :class="{ribbon: job.ribbon, visited: isVisited}">
    <a :href="job.url" target="_blank" :onmousedown="job.onmousedown" @click="registerOutclick" class="ribbon"
       v-if="job.ribbon" :class="job.ribbon.color || 'green'">{{ job.ribbon.text }}</a>

    <a :href="job.url" target="_blank" :onmousedown="job.onmousedown" @click="registerOutclick"
       class="title">{{ job.jobtitle }}</a>
    <div class="company-location">
      <a class="company">{{ companyShort }}</a>
      <a :href="job.url" target="_blank" :onmousedown="job.onmousedown" @click="registerOutclick"
         class="location">{{ locationShort }}</a>
    </div>
    <a :href="job.url" target="_blank" :onmousedown="job.onmousedown" @click="registerOutclick" class="description"
       v-html="job.description + '<span>Read More</span>'"/>
    <CTA text="View Salary & More Info" :link="job.url" target="_blank" :onmousedown="job.onmousedown"
         @click.native="registerOutclick"/>
  </div>
</template>

<script>
import CTA from '../../CTA'
import analytics from "@/mixins/analytics";

export default {
  name: 'ListItemMobile',
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
        await this.registerOutclickMixin('LIST_ITEM_MOBILE')

        this.visitedJob()
      }
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
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;
  position: relative;
  padding: 30px 20px 25px;
  background: #FFFFFF;
  border: 1px solid #C6C6C6;
  border-radius: 5px;

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
    text-decoration: none;

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
    margin-bottom: 15px;
    text-decoration: none;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: #33B1FF;
  }

  .company-location {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #EEEEEE;
    text-transform: uppercase;

    > a {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 13px;
      line-height: 13px;
      color: #000;
      text-decoration: none;

      &::before {
        content: '';
        display: block;
        height: 16px;
        pointer-events: none;
        margin-right: 5px;
        margin-top: -2px;
      }

      &.company {
        color: #246BFD;
        text-decoration: underline;

        &::before {
          background: url("~/assets/img/svg/company_dark.svg") center / cover no-repeat;
          width: 18px;
        }
      }

      &.location {
        margin-left: 10px;

        &::before {
          background: url("~/assets/img/svg/location_dark.svg") center / cover no-repeat;
          width: 11px;
        }
      }
    }
  }

  .description {
    margin-bottom: 15px;
    font-weight: 300;
    font-size: 15px;
    color: #262626;
    line-height: 20px;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    :deep(span) {
      color: #33B1FF;
      text-decoration: underline;
    }
  }

  .cta {
    max-width: 100%;
    width: 100%;
  }
}
</style>
