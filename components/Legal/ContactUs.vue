<template>
  <div class="contact-us">
    <div class="contact-us-form" v-if="!isDone">
      <div class="form-title">Send us a message</div>
      <input v-model="name" name="name" type="text" placeholder="Full Name" :class="{error: !isValidName}">
      <input v-model="email" name="email" type="email" placeholder="Email" :class="{error: !isValidEmail}">
      <input v-model="subject" name="subject" type="text" placeholder="Subject" :class="{error: !isValidSubject}">

      <textarea v-model="help" name="help" id="help" rows="5" placeholder="Your message here..."
                :class="{error: !isValidHelp}"></textarea>
      <div class="send" :class="{active: activeButton, isDone, isSending}" @click="sendHelp()">
        <div class="btn-loader" v-if="isSending">
          <div class="lds-dual-ring"></div>
        </div>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
    </div>
    <div class="contact-us-thank-you" v-else>
      <div class="form-title">Thank you!</div>
      <div class="form-text">
        We’ve received your message. <br/>
        Someone from our team will contact you soon.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      isFormShow: false,
      name: null,
      email: null,
      subject: null,
      help: null,
      isValidName: true,
      isValidSubject: true,
      isValidEmail: true,
      isValidHelp: true,
      isSending: false,
      isDone: false,
      error: null,
    }
  },
  computed: {
    activeButton() {
      return this.name && this.email && this.help
    }
  },
  methods: {
    async sendHelp() {
      if (!this.isSending && !this.isDone) {
        this.isValidName = !!this.name
        this.isValidSubject = !!this.subject
        this.isValidEmail = this.$validateEmail(this.email)
        this.isValidHelp = !!this.help

        if (this.isValidName && this.isValidEmail && this.isValidHelp) {
          try {
            this.error = null
            this.isSending = true
            const response = await this.$axios.post(`form/contact`, {
              name: this.name,
              email: this.email,
              subject: this.subject,
              text: this.help,
            })

            console.log(response);

            this.isSending = false
            this.isDone = response.data
          } catch (e) {
            this.isSending = false
            this.isDone = false
            this.error = e.message
          }
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
.contact-us {
  &-form {
    display: flex;
    flex-flow: column;
    justify-content: center;

    .form-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      color: #000000;
      margin-bottom: 20px;
    }

    .form-text {
      margin: 20px 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      color: #000000;
    }

    .send {
      background: #3663EB;
      border: 1px solid #EAEAEA;
      height: 44px;
      width: 100%;
      transition: .3s;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &::before {
        content: 'Submit Now';
        font-weight: 600;
        font-size: 14px;
        line-height: 14px;
        color: #FFFFFF;
      }

      &.isSending {
        &::before {
          content: none;
        }
      }

      &.close {
        &::before {
          content: 'OK, CLOSE';
        }
      }

      &:hover {
        opacity: 0.95;
      }

      .btn-loader {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        .lds-dual-ring {
          display: inline-block;
          width: 40px;
          height: 55px;
        }

        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 34px;
          height: 34px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }

        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

      }
    }

    input, textarea {
      font-family: "Exo 2", sans-serif;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      box-sizing: border-box;
      padding: 10px 20px;
      width: 100%;
      margin-bottom: 7px;
      font-size: 14px;
      max-height: 200px;

      &.error {
        border-color: #ff6969;
      }

      &::placeholder {
        font-weight: 900;
        font-size: 14px;
        line-height: 26px;
        color: #C7C7C7;
      }
    }

    .error {
      color: red;
      margin-top: 25px;
    }
  }
}
</style>
