<template>
  <div class="content-block">
    <div class="container">
      <div class="content-wrapper">
        <div class="content-part">
          <h1>{{ title }}</h1>
          <div class="content-text" v-html="parsedContent"></div>

          <FAQ :faq="faq"/>
        </div>
        <div class="content-sidebar">
          <div class="ad">Ad</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentBlock",
  props: ['content', 'title', 'faq'],
  computed: {
    getFullYear() {
      return new Date().getFullYear()
    },
    parsedContent() {
      return this.content.trimLeft().replace(/\n\n/g, "<br />").replace(/\n/g, "<br />");
    },
  }
}
</script>

<style scoped lang="scss">
.content {
  &-block {
    padding: 0 15px;
    width: 100%;
    margin-top: 40px;

    h1 {
      font-weight: 800;
      font-size: 32px;
      line-height: 36px;
      color: #000000;
      margin-bottom: 15px;
      margin-top: 0;

      @media (max-width: $screen-xs-max) {
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 10px;
      }
    }

    h2 {
      font-weight: 800;
      font-size: 24px;
      line-height: 24px;
      color: #000000;

      @media (max-width: $screen-xs-max) {
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
      }
    }

    h3 {
      font-weight: 800;
      font-size: 18px;
      line-height: 18px;
      color: #000000;

      @media (max-width: $screen-xs-max) {
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
      }
    }

    .adbig {
      margin: 30px auto 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 400px;
      background: #F2F2F2;

      @media (max-width: $screen-xs-max) {
        margin-bottom: 25px;
        height: 300px;
      }
    }
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: $screen-xs-max) {
      margin-top: 15px;
    }
  }

  &-part {
    max-width: 600px;
    width: 100%;
    padding-right: 15px;

    @media (max-width: $screen-xs-max) {
      padding-right: 0;
      max-width: 100%;
    }
  }

  &-text {
    font-weight: 300;
    font-size: 16px;
    line-height: 36px;
    color: #000000;

    @media (max-width: $screen-xs-max) {
      line-height: 28px;
    }
  }

  &-sidebar {
    max-width: 300px;
    width: 100%;

    @media (max-width: $screen-xs-max) {
      display: none;
    }

    .ad {
      background: #F2F2F2;
      max-width: 300px;
      width: 100%;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
