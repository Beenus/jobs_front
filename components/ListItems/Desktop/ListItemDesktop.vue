<template>
  <div class="list-item-desktop">
    <div class="ribbon" v-if="job.ribbon" :class="job.ribbon_color || 'green'">{{ job.ribbon }}</div>
    <div class="content-part">
      <div class="title">{{ job.jobtitle }}</div>
      <div class="company-location">
        <div class="company">{{ job.company }}</div>
        <div class="location">{{ job.formattedLocation }}</div>
      </div>
      <div class="description" v-html="job.description" />
    </div>
    <div class="cta-part">
      <CTA :link="job.url" :onMouseDown="job.onmousedown"/>
      <a class="link" :href="job.url" target="_blank" :title="job.jobtitle" :onmousedown="job.onmousedown">Apply Now</a>
    </div>
  </div>
</template>

<script>
import CTA from '../../CTA'

export default {
  name: 'ListItemDesktop',
  components: {CTA},
  props: ['job', 'index'],
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.list-item-desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 30px 40px;
  margin-bottom: 10px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  position: relative;

  .content-part {
    width: 100%;
    max-width: 650px;

    .title {
      font-weight: 700;
      font-size: 22px;
      line-height: 20px;
      color: #000000;
      margin-bottom: 5px;
    }

    .company-location {
      display: flex;
      align-items: center;
      padding-bottom: 13px;
      margin-bottom: 15px;
      border-bottom: 1px solid #EEEEEE;

      > div {
        display: flex;
        align-items: center;

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
            background: url("~/assets/img/svg/location_dark.svg") center / cover no-repeat;
            width: 11px;
          }
        }
      }
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
