<template>
  <div class="inputs">
    <KeywordSearch class="fixedHeader" :isHeader="false" placeholder="Job Title" @onEnter="search"/>
    <CitySearch class="fixedHeader" :isHeader="false" placeholder="New York, US" @onEnter="search"/>
    <div class="search desktop" v-if="!fetching" @click="search"/>
  </div>

</template>

<script>
export default {
  name: "JobPageSearch",
  data() {
    return {
      fetching: false,
    }
  },
  methods: {
    async search() {
      await this.$store.dispatch('jobs/getJobs', {route: this.$route.name, clear: true, force: true, loader: true})
    },
  }
}
</script>

<style scoped lang="scss">
.inputs {
  display: flex;
  width: 100%;

  @media (max-width: $screen-xs-max) {
    padding-right: 15px;
  }

  .fixedHeader {
    margin-bottom: 0;

    &:nth-child(1) {
      background: #FFFFFF;
      border: 2px solid #000000;
      border-radius: 8px 0 0 8px;
    }

    &:nth-child(2) {
      background: #FFFFFF;
      border: 2px solid #000000;
      border-radius: 0;
    }

    &::before {
      content: none;
    }

    :deep(input) {
      height: 34px;
      padding: 7px 11px;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      color: #000000;
    }

    :deep(.label) {
      display: none;
    }
  }

  .search {
    background: #000000;
    border: 2px solid #000000;
    border-radius: 0 8px 8px 0;
    min-width: 32px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &::before {
      display: block;
      content: '';
      background: url("~/assets/img/svg/magnify_glass_white.svg") center / contain no-repeat;
      min-width: 17px;
      min-height: 17px;
    }
  }
}
</style>
