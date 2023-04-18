<template>
  <div class="list-item-logo-desktop" :class="{visited: isVisited}">
    <div class="top-part">
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown" @click="registerOutclick"
         class="logo">
        <img :src="job.logo ? job.logo : '/img/job_icon.svg'" :alt="job.jobtitle">
      </a>
      <div class="title-location">
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick" class="title">{{ job.jobtitle }}</a>
        <div class="company-location">
          <a @click="setSearch" class="company">{{ job.company }}</a>
          <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
             @click="registerOutclick" class="location">| {{ job.formattedLocation }}</a>
        </div>
      </div>
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
         @click="registerOutclick" class="arrow-cta"/>
    </div>
    <div class="content-part">
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown" @click="registerOutclick" class="description desktop" v-html="job.description + '<span>Read More</span>'"/>
      <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown" @click="registerOutclick" class="description mobile" v-html="job.description_mobile + '<span>Read More</span>'"/>
      <div class="tags" v-if="job.tags">
        <a :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown"
           @click="registerOutclick" class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</a>
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
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #EEEEEE;
    padding-right: 20px;
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
      margin-right: 20px;

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
        line-height: 20px;
        color: #246BFD;
        margin-bottom: 10px;
        text-decoration: none;

        @media (max-width: $screen-xs-max) {
          font-size: 20px;
          line-height: 23px;
          margin-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .company-location {
        margin-top: 5px;

        .company {
          font-weight: 600;
          font-size: 15px;
          line-height: 13px;
          color: #FF5AA5;
          text-decoration: none;
        }

        .location {
          font-weight: 600;
          font-size: 15px;
          line-height: 13px;
          color: #FF5AA5;
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
    padding-left: 85px;

    .description {
      font-weight: 300;
      font-size: 15px;
      line-height: 20px;
      color: #262626;
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
      margin-top: 15px;
      display: flex;
      gap: 8px;
      flex-flow: row wrap;

      .tag {
        background: #00FFA3;
        border-radius: 7px;
        font-size: 11px;
        line-height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
        color: #000000;
        padding: 5px;
        height: 24px;
        text-decoration: none;
      }
    }
  }
}
</style>
