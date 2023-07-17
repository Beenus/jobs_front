<template>
  <div class="legal">
    <div class="content-part-wrap">
      <div class="container">
        <div class="content-part">
          <div class="left-sidebar">
            <div class="floating-sidebar">
              <div class="title">Jump to:</div>
              <a :href="`#${item.anchor}`" class="anchor" v-for="(item, index) in anchors" :key="index"
                 :class="{active: item.anchor === activeAnchor}">
                {{ item.title }}
              </a>

            </div>
          </div>
          <div class="content">
            <h1>{{ title }}</h1>
            <slot/>
          </div>
          <div class="right-sidebar">
            <div class="floating-sidebar">
              <nuxt-link to="/">
                <img :src="require('assets/img/svg/logo_footer_homepage.svg')" alt="RecommendedJobs"/>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegalTwoSidebars",
  props: ['title', 'anchors'],
  data() {
    return {
      activeAnchor: [],
    }
  },
  watch: {
    '$route.hash': function (val) {
      this.activeAnchor = val.substring(1)
    }
  },
}
</script>

<style scoped lang="scss">
.legal {
  .content-part {
    display: flex;
    margin-top: 25px;

    @media (max-width: $screen-xs-max) {
      margin-top: 15px;
    }

    &-wrap {
      padding: 0 15px;
    }

    .left-sidebar {
      max-width: 142px;
      width: 100%;

      @media (max-width: $screen-xs-max) {
        display: none;
      }

      .floating-sidebar {
        background: #F5F5F5;
        position: sticky;
        top: 15px;
        display: flex;
        flex-flow: column;
        padding: 15px;

        .title {
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #000000;
          margin-bottom: 15px;
        }

        a {
          font-weight: 300;
          font-size: 14px;
          line-height: 19px;
          color: #000000;
          margin-bottom: 10px;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          max-width: 100%;
          word-break: break-word;

          &:hover, &.active {
            font-weight: 700;
          }
        }
      }
    }

    .content {
      margin-left: 30px;
      max-width: 508px;

      @media (max-width: $screen-sm-max) {
        max-width: 100%;
      }

      @media (max-width: $screen-xs-max) {
        margin-left: 0;
      }


      h1 {
        font-size: 38px;
        font-weight: 800;
        line-height: 52px;
        margin-bottom: 30px;
        margin-top: 0;
      }

      .title {
        font-weight: 800;
        font-size: 28px;
        line-height: 38px;
        color: #000000;
        margin-bottom: 15px;
      }

      .text {
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        margin-bottom: 30px;

        :deep(b) {
          font-weight: bold
        }
      }
    }

    .right-sidebar {
      width: 100%;
      max-width: 250px;
      margin-left: 30px;

      @media (max-width: $screen-sm-max) {
        display: none;
      }

      .floating-sidebar {
        position: sticky;
        top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 178px;
        width: 100%;
        background: #F5F5F5;
        padding: 20px;
      }
    }
  }
}
</style>
