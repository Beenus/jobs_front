<template>
  <div class="list-item-logo-desktop" :class="{visited: isVisited}">
    <div class="top-part">
      <div class="title-location">
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick" class="title">{{ job.jobtitle }}</a>
        <div class="company-location">
          <a @click="setSearch" class="company">{{ job.company }}</a>
          <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
             @click="registerOutclick" class="location">| {{ job.formattedLocation }}</a>
        </div>
      </div>
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown" @click="registerOutclick"
         class="logo">
        <img :src="job.logo ? job.logo : '/img/job_icon.svg'" :alt="job.jobtitle">
      </a>
    </div>
    <div class="content-part">
      <div class="left-part">
        <!--        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"-->
        <!--           @click="registerOutclick"-->
        <!--           v-if="job.salary" class="salary">{{ job.salary }}</a>-->
        <div class="tags" v-if="job.tags">
          <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
             @click="registerOutclick" class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</a>
        </div>
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick"
           class="description desktop" v-html="job.description + '<span>Read More</span>'"/>
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick"
           class="description mobile" v-html="job.description_mobile + '<span>Read More</span>'"/>
      </div>
      <div class="right-part">
        <CTA :link="job.url" :title="job.jobtitle" :onMouseDown="job.onmousedown"
             @click.native="registerOutclick" class="big desktop" text="More Info"/>
        <CTA text="View Salary & More Info" :link="job.url" class="mobile" target="_blank" :onMouseDown="job.onmousedown"
             @click.native="registerOutclick"/>
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick" class="link">View Salary</a>
      </div>
    </div>
  </div>
</template>

<script>
import CTA from "@/components/CTA.vue";
import analytics from "@/mixins/analytics";

export default {
  name: "ListItemLogoDesktop",
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
        await this.registerOutclickMixin('LIST_ITEM_LOGO_DESKTOP')

        this.visitedJob()
      }
    },
    async setSearch() {
      await this.$store.dispatch('setSearch', this.job.company)
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, force: true, loader: true, clear: true,})

      if (process.client) {
        window.scrollTo({top: 0});
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
.list-item-logo-desktop {
  background: #FFFFFF;
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 20px 30px;
  position: relative;

  @media (max-width: $screen-xs-max) {
    padding: 20px;
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
      border-radius: 16px;
    }
  }

  .top-part {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #EEEEEE;
    position: relative;

    .logo {
      min-width: 64px;
      min-height: 64px;
      width: 64px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #EEEEEE;
      border-radius: 16px;
      margin-left: 15px;

      img {
        max-width: 40px;
        max-height: 40px;
        height: auto;
        width: auto;
      }
    }

    .title-location {
      .title {
        font-weight: 700;
        font-size: 22px;
        line-height: 23px;
        color: #282828;
        text-decoration: none;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        @media (max-width: $screen-xs-max) {
          font-size: 20px;
        }
      }

      .company-location {
        margin-top: 5px;

        .company {
          font-weight: 600;
          font-size: 15px;
          line-height: 13px;
          color: #9E9E9E;
          text-decoration-line: underline;
        }

        .location {
          font-weight: 600;
          font-size: 15px;
          line-height: 13px;
          color: #9E9E9E;
          text-decoration: none;
        }
      }
    }

    .arrow-cta {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-100%);
      right: 0;
      width: 12px;
      height: 20px;
      background: url("~/assets/img/svg/arrow_right.svg") center / contain no-repeat;
    }
  }

  .content-part {
    display: flex;

    @media (max-width: $screen-xs-max) {
      flex-flow: column;
    }

    .left-part {
      margin-right: 30px;

      @media (max-width: $screen-xs-max) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }

    .right-part {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;

      .desktop {
        @media (max-width: $screen-xs-max) {
          display: none;
        }
      }
      .mobile {
        &.cta {
          max-width: 100%;
          width: 100%;
        }
        @media (min-width: $screen-sm) {
          display: none;
        }
      }

      .link {
        margin-top: 10px;
        font-weight: 400;
        font-size: 15px;
        line-height: 100%;
        color: #262626;
        text-decoration: underline;

        @media (max-width: $screen-xs-max) {
          display: none;
        }
      }
    }

    .salary {
      display: flex;
      font-weight: 700;
      font-size: 18px;
      line-height: 18px;
      color: #000000;
      margin-bottom: 15px;
      text-decoration: none;

    }

    .description {
      font-weight: 300;
      font-size: 15px;
      line-height: 20px;
      color: #5F5F5F;
      text-decoration: none;

      :deep(span) {
        font-weight: 600;
        color: #000000;
        text-decoration: underline;
      }

      &.desktop {
        @media (max-width: $screen-xs-max) {
          display: none;
        }
      }

      &.mobile {
        display: none;

        @media (max-width: $screen-xs-max) {
          display: block;
        }
      }
    }

    .tags {
      margin-bottom: 15px;
      display: flex;
      gap: 8px;
      flex-flow: row wrap;

      .tag {
        background: #EEF4FF;
        border-radius: 7px;
        font-size: 11px;
        line-height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
        color: #246BFD;
        padding: 5px;
        height: 24px;
        text-decoration: none;
      }
    }
  }
}
</style>
