<template>
  <div class="partner-with-us">
    <div class="container">
      <div class="legal-text">
        <h1>Partner with us</h1>
        <p>We are a company of Online Performance Marketing experts, specialized in
          Affiliate Marketing. We focus on PPC Marketing, as we believe that it brings the best users with
          the highest ROI.</p>

        <div class="become-partner">
          <div class="become-partner-wrapper">

            <div class="content-part">
              <div class="title">Excellent Record</div>
              <div class="text">From PPC services, to Amazon stores traffic we optimze and maximize
                companies online funnel
              </div>
              <div class="record">
                <div class="image projects"></div>
                <div class="record-text">350+ Projects Done</div>
              </div>
              <div class="record">
                <div class="image clients"></div>
                <div class="record-text">100+ Happy Clients</div>
              </div>
              <div class="record">
                <div class="image team"></div>
                <div class="record-text">10+ Team Experts</div>
              </div>
            </div>

            <div class="partner-form">
              <div class="title">Become a partner</div>
              <div class="sub-title">Come partner with us</div>

              <div class="form">
                <input v-model="name" id="name" type="text" placeholder="First and Last Name">
                <input v-model="email" id="email" type="email" placeholder="Email">
                <input v-model="title" id="title" type="text" placeholder="Title">
                <input v-model="company" id="company" type="text" placeholder="Company Name">
                <textarea v-model="note" id="note" cols="30" rows="4" placeholder="Add a note..."></textarea>
                <div class="btn" @click="sendPartner" :class="{disabled: !isValid || isPending}">Submit Now</div>
                <p v-if="result && result.status === 200">Thank you!</p>
                <p class="error" v-if="error">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="build-value">
          <div class="build-value-wrapper">
            <div class="top-part">
              <div class="title">We Build Value</div>
              <div class="text">Get more info about us, just check our work process to know how we do
                great impact.
              </div>
            </div>
            <div class="middle-part">
              <div class="middle-item">
                <div class="title">12</div>
                <div class="text">Years of experience</div>
              </div>
              <div class="middle-item">
                <div class="title">50</div>
                <div class="text">Operated Sites</div>
              </div>
              <div class="middle-item">
                <div class="title">300+</div>
                <div class="text">Direct Brands</div>
              </div>
              <div class="middle-item">
                <div class="title">1M+</div>
                <div class="text">Unique Users</div>
              </div>
            </div>
            <div class="bottom-part">
              <div class="left-part">
                <div class="title">We help to create <br/> revenue growth</div>
                <div class="text">
                  <p>We research, analyze, execute and getting the job
                    done by our special optimization technics.</p>
                  <p>The longer we work together, the better results
                    will be reflected.</p>
                </div>
              </div>
              <div class="right-part">
                <img :src="require('assets/img/chart.png')" alt="Chart"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Partner',
  data() {
    return {
      name: '',
      email: '',
      title: '',
      company: '',
      note: '',
      isPending: false,
      result: null,
      error: null,
    }
  },
  computed: {
    isValid() {
      return this.name && this.$validateEmail(this.email) && this.title && this.company && this.note
    },
  },

  methods: {
    async sendPartner() {
      if (this.isValid && !this.isPending) {
        try {
          this.isPending = true
          this.error = null
          this.result = await this.$axios.post('form/partner', {
            name: this.name,
            email: this.email,
            title: this.title,
            company: this.company,
            note: this.note,
          })
        } catch (e) {
          this.isPending = false
          this.error = e.message
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.partner-with-us {
  padding: 0 15px;

  @media (max-width: $screen-xs-max) {
    h1, p {
      text-align: center;
    }
  }
}

.become-partner {
  padding: 50px 0;
  background: #fff;
  margin-bottom: 60px;

  &-wrapper {
    display: flex;

    @media (max-width: $screen-xs-max) {
      flex-flow: column;
    }

    .partner-form {
      width: 50%;
      padding-left: 50px;

      @media (max-width: $screen-xs-max) {
        padding: 0;
        width: 100%;
      }

      .title {
        font-weight: bold;
        font-size: 32px;
        line-height: 45px;
        color: #000000;

        @media (max-width: $screen-xs-max) {
          text-align: center;
        }
      }

      .sub-title {
        font-weight: normal;
        font-size: 28px;
        line-height: 45px;
        color: #000000;

        @media (max-width: $screen-xs-max) {
          text-align: center;
        }
      }

      .form {
        margin-top: 55px;
        max-width: 350px;

        @media (max-width: $screen-xs-max) {
          max-width: 100%;
        }

        input, textarea {
          width: 100%;
          background: #FFFFFF;
          border-radius: 3px;
          padding: 15px 25px;
          min-height: 44px;
          font-weight: normal;
          font-size: 16px;
          line-height: 22px;
          color: #000000;
          margin-bottom: 7px;
          outline: none;
          resize: none;
          border: 1px solid #EAEAEA;

          &::placeholder {
            color: #9FA8C2;
          }
        }

        .btn {
          width: 100%;
          height: 44px;
          margin-top: 12px;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3663EB;
          border: 1px solid #EAEAEA;
          color: #fff;
          cursor: pointer;

          &.disabled {
            cursor: not-allowed;
          }

          &:hover {
            opacity: 0.7;
          }
        }

        .error {
          color: red;
        }
      }
    }

    .content-part {
      width: 50%;

      @media (max-width: $screen-xs-max) {
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
      }

      .title {
        font-weight: bold;
        font-size: 32px;
        line-height: 45px;
        color: #000000;
        max-width: 306px;
        margin-bottom: 20px;

        @media (max-width: $screen-xs-max) {
          text-align: center;
        }
      }

      .text {
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: #000000;
        max-width: 306px;
        margin-bottom: 35px;

        @media (max-width: $screen-xs-max) {
          text-align: center;
        }
      }

      .record {
        display: flex;
        align-items: center;
        margin-bottom: 50px;

        .image {
          width: 64px;
          height: 60px;
          margin-right: 24px;

          &.clients {
            background: url('~assets/img/svg/records/clients.png') center / contain no-repeat;
          }

          &.projects {
            background: url('~assets/img/svg/records/projects.png') center / contain no-repeat;
          }

          &.team {
            background: url('~assets/img/svg/records/team.png') center / contain no-repeat;
          }
        }

        &-text {
          font-weight: 600;
          font-size: 18px;
          line-height: 27px;
          color: #000000;
        }
      }
    }
  }
}

.build-value {
  padding: 50px 0;

  &-wrapper {
    background: #fff;
    padding: 40px 80px;

    @media (max-width: $screen-xs-max) {
      padding: 30px 0;
    }

    .top-part {
      border-bottom: 1px solid #F1F1F1;

      .title {
        font-weight: 600;
        font-size: 36px;
        line-height: 23px;
        color: #000000;
        text-align: center;
        margin-bottom: 35px;
      }

      .text {
        font-weight: normal;
        font-size: 15px;
        line-height: 23px;
        color: #000000;
        text-align: center;
        margin-bottom: 60px;
      }
    }

    .middle-part {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      width: 100%;

      @media (max-width: $screen-xs-max) {
        grid-template-columns: repeat(2, 1fr);
      }

      .middle-item {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        padding: 25px 15px;

        .title {
          font-weight: bold;
          font-size: 48px;
          line-height: 23px;
          color: #000000;
          margin-bottom: 20px;
        }

        .text {
          font-weight: 600;
          font-size: 18px;
          line-height: 23px;
          color: #000000;
          text-align: center;
        }
      }
    }

    .bottom-part {
      margin-top: 80px;
      display: flex;
      justify-content: space-between;

      @media (max-width: $screen-xs-max) {
        flex-flow: column;
      }

      .left-part {
        max-width: 400px;
        margin-right: 50px;

        @media (max-width: $screen-xs-max) {
          max-width: 100%;
          text-align: center;
          margin-right: 0;
        }

        .title {
          font-weight: 600;
          font-size: 36px;
          line-height: 42px;
          color: #000000;
          margin-bottom: 30px;
        }

        .text {
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #000000;
        }
      }

      .right-part {
        @media (max-width: $screen-xs-max) {
          text-align: center;
        }

        img {
          max-width: 400px;

          @media (max-width: $screen-xs-max) {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
