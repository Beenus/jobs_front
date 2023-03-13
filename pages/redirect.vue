<template>
  <div class="redirect">
    Redirecting... <a :href="url">{{ url }}</a>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  layout: 'redirect',
  async asyncData({route, redirect, store}) {

    if (route.query.code) {
      const url = process.client ? atob(route.query.code) : Buffer.from(route.query.code, 'base64').toString('utf8')
      const uuid = route.query.uuid

      if (uuid) {
        await store.dispatch('registerEmailClick', {
          uuid,
          url,
        })
      }

      redirect(url)

      return {
        url,
        uuid
      }
    } else {
      redirect('/')
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
