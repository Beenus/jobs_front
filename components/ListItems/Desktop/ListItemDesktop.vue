<template>
  <div class="list-item-desktop" :class="{ribbon: job.ribbon, visited: isVisited}">
    <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
       @click="registerOutclick" class="ribbon" v-if="job.ribbon"
       :class="job.ribbon.color || 'green'">{{ job.ribbon.text }}</a>
    <div class="content-part">
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="registerOutclick" class="title">{{ job.jobtitle }}</a>
      <div class="company-location">
        <a @click="setSearch" class="company">{{ job.company }}</a>
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick" class="location">{{ job.formattedLocation }}</a>
      </div>
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="registerOutclick" class="description" v-html="job.description + '<span>Read More</span>'"/>
    </div>
    <div class="cta-part">
      <CTA :link="job.url" :title="job.jobtitle" :onMouseDown="job.onmousedown"
           @click.native="registerOutclick" class="big" text="More Info"/>
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="registerOutclick" class="link">View Salary</a>
    </div>
  </div>
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
        await this.registerOutclickMixin('LIST_ITEM_DESKTOP')

        this.visitedJob()
      }
    },
    async setSearch() {
      await this.$store.dispatch('setSearch', this.job.company)
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, force: true, loader: true, clear: true,})

      if (process.client) {
        window.scrollTo({ top: 0});
      }
    }
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
  padding: 20px 20px 20px 30px;
  margin-bottom: 10px;
  background: #FFFFFF;
  position: relative;
  text-decoration: none;
  border: 1px solid #C6C6C6;
  border-radius: 8px;

  &.ribbon {
    padding-top: 50px;
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
      font-size: 24px;
      line-height: 24px;
      color: #000;
      margin-bottom: 15px;
      text-decoration: none;
    }

    .company-location {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid #EEEEEE;

      > a {
        font-weight: 700;
        font-size: 13px;
        line-height: 13px;
        color: #9E9E9E;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

        &::before {
          content: '';
          display: inline-block;
          height: 12px;
          pointer-events: none;
          margin-right: 5px;
        }

        &.company {
          color: #246BFD;
          cursor: pointer;
          text-decoration: underline;
          max-width: 170px;

          &::before {
            background: url("~/assets/img/svg/company.svg") center / cover no-repeat;
            width: 13px;
          }
        }

        &.location {
          margin-left: 10px;

          &::before {
            background: url("~/assets/img/svg/location.svg") center / cover no-repeat;
            width: 9px;
          }
        }
      }
    }

    .description {
      text-decoration: none;
      font-weight: 200;
      font-size: 16px;
      line-height: 1.56;
      color: #262626;

      :deep(span) {
        color: #246BFD;
        text-decoration: underline;
      }
    }
  }

  .cta-part {
    margin-left: 20px;
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
    top: 20px;
    left: 30px;
    height: 25px;
    padding: 3px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 1;
    text-decoration: none;

    &::before {
      //content: '';
      display: block;
      height: 12px;
      pointer-events: none;
      width: 12px;
      margin-right: 5px;
      margin-top: -2px;
    }

    &.green {
      color: #050505;
      background: linear-gradient(90deg, #00FFA3 0%, #88FFD4 100%);

      &::before {
        background: url("~/assets/img/svg/ribbons/salary.svg") center / cover no-repeat;
      }
    }

    &.purple {
      color: #fff;
      background: linear-gradient(90deg, #EB00FF 0%, #F583FF 100%);

      &::before {
        background: url("~/assets/img/svg/ribbons/experience.svg") center / cover no-repeat;
      }
    }

    &.blue {
      color: #fff;
      background: linear-gradient(90deg, #33B1FF 0%, #80CEFF 100%);

      &::before {
        width: 7px;
        background: url("~/assets/img/svg/ribbons/immediate.svg") center / cover no-repeat;
      }
    }

    &.red {
      color: #fff;
      background: linear-gradient(90deg, #FF5AA5 0%, #FF97C6 100%);

      &::before {
        width: 9px;
        background: url("~/assets/img/svg/ribbons/demand.svg") center / cover no-repeat;
      }
    }
  }
}
</style>
