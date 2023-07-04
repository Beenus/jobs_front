<template>
  <footer :class="{homepage: isHomepage}">
    <div class="footer-wrapper-new">
      <div class="top-part-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="top-part">
                <div class="left-part">
                  <nuxt-link to="/">
                    <img v-if="isHomepage" :src="require('assets/img/svg/logo_footer_homepage.svg')"
                         alt="Recommended-Jobs.com"/>
                    <img v-else :src="require('assets/img/svg/logo_footer.svg')" alt="Recommended-Jobs.com"/>
                  </nuxt-link>
                </div>
                <div class="right-part">
                  <div class="column">
                    <div class="title">Useful links</div>
                    <div class="links" id="menu-links-container">
                      <nuxt-link to="/">Homepage</nuxt-link>
                      <nuxt-link to="/about">About Us</nuxt-link>
                      <nuxt-link to="/blog">Blog</nuxt-link>
                      <nuxt-link to="/faq">FAQs</nuxt-link>
                      <a @click="openPopup('terms')">Terms of Use</a>
                      <a @click="openPopup('advertiserDisclosure')">Advertiser Disclosure</a>
                      <a @click="openPopup('privacy')">Privacy Policy</a>
                    </div>
                  </div>
                  <div class="column">
                    <div class="title" id="contact-link-container">
                      <nuxt-link to="/sitemap">Sitemap</nuxt-link>
                    </div>
                  </div>
                  <div class="column">
                    <div class="title" id="contact-link-container">
                      <a @click="openPopup('contact')">Contact Us</a>
                    </div>
                  </div>
                  <div class="column">
                    <div class="title">
                      <nuxt-link to="/partner-with-us">Partner with Us</nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="middle-part-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="middle-part">
                This site is a free online resource that strives to offer helpful content to its visitors. Please be
                advised that the operator of this site accepts advertising compensation from certain companies that
                appear on the site, and such compensation impacts the location and order in which the companies (and/or
                their products) are presented. In fact, Company/product listings on this page DO NOT imply endorsement
                by the site operator. Except as expressly set forth in our Terms of Use, all representations and
                warranties regarding the information presented on this page are disclaimed. The information which
                appears on this site is subject to change at any time. So how do we make money? Our partners compensate
                us. This may influence which products we review and write about, but it in no way affects our
                recommendations or advice. Our partners cannot pay us to guarantee favorable reviews of their products
                or services.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-part-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bottom-part">
                ©{{ year }} - {{ siteUrl }} - By using our content, products & services you agree to our terms of use
                and privacy policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    siteUrl() {
      return 'Recommended-Jobs.com'
    },
    year() {
      return new Date().getFullYear()
    },
    isHomepage() {
      return this.$route.path === '/'
    }
  },
  methods: {
    openPopup (type) {
      this.$store.dispatch('showLegalPopup', type)
    }
  }
}
</script>

<style scoped lang="scss">
footer {
  background: linear-gradient(180deg, #246BFD 0%, #679BFF 100%);
  padding: 0 15px;

  .footer-wrapper-new {
    .top-part {
      display: flex;
      justify-content: space-between;
      padding: 45px 0 50px;

      @media (max-width: $screen-xs-max) {
        flex-flow: column;
        align-items: center;
      }

      .left-part {
        display: flex;
        flex-flow: column;

        @media (max-width: $screen-xs-max) {
          margin-bottom: 20px;
        }
      }

      .right-part {
        display: flex;

        @media (max-width: $screen-xs-max) {
          flex-flow: column;
          align-items: center;
        }

        .column {
          @media (max-width: $screen-xs-max) {
            width: 100%;
          }

          &:not(:last-child) {
            .title {
              margin-right: 50px;

              @media (max-width: $screen-xs-max) {
                margin-right: 0;
              }
            }
          }

          .title, .title > a, .title > div {
            font-weight: 600;
            font-size: 16px;
            line-height: 23px;
            color: #fff;
            margin-bottom: 20px;

            @media (max-width: $screen-xs-max) {
              margin-right: 0;
              text-align: center;
            }
          }

          .links {
            display: flex;
            flex-flow: column;

            @media (max-width: $screen-xs-max) {
              margin-bottom: 10px;
              align-items: center;
            }


            a {
              cursor: pointer;
              font-weight: normal;
              font-size: 14px;
              line-height: 17px;
              color: #fff;
              text-decoration: underline;
              margin-bottom: 10px;
            }
          }
        }
      }
    }

    .middle-part {
      margin: 30px 0;
      font-weight: normal;
      font-size: 15px;
      line-height: 23px;
      text-align: center;
      color: #fff;

      &-wrapper {
        border-top: 1px solid #3176FF;
      }
    }

    .bottom-part {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #fff;
      padding: 23px 0;

      &-wrapper {
        border-top: 1px solid #3176FF;
      }
    }
  }

  &.homepage {
    background: #fff;

    .footer-wrapper-new {
      .top-part {
        .right-part {
          .column {
            .title, .title > a, .title > div {
              color: #000;
            }

            .links {
              a {
                color: #000;
              }
            }
          }
        }
      }

      .middle-part {
        color: #000;

        &-wrapper {
          border-top: 1px solid #F5F5F5;
        }
      }

      .bottom-part {
        color: #000;

        &-wrapper {
          border-top: 1px solid #F5F5F5;
        }
      }
    }
  }
}
</style>
