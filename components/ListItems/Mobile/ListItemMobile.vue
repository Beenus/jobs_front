<template>
  <div class="list-item-mobile">
    <div class="ribbon" v-if="job.ribbon" :class="job.ribbon_color || 'green'">{{ job.ribbon }}</div>

    <div class="title">{{ job.jobtitle }}</div>
    <div class="company-location">
      <div class="company">{{ job.company }}</div>
      <div class="location">{{ job.formattedLocation }}</div>
    </div>
    <div class="description" v-html="job.description" />
    <CTA :link="job.url" text="Apply Now" :onMouseDown="job.onmousedown" />
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
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.list-item-mobile {
  border: 1px solid #EEEEEE;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  border-radius: 28px;
  position: relative;
  padding: 30px 20px;

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

      color: #707070;


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

  .description {
    margin-bottom: 15px;
    font-weight: 300;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
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
