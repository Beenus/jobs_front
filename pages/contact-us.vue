<template>
  <div class="contact-us">
    <div class="container">
      <div class="contact-us-form" v-if="!isDone">
        <div class="form-title">Get in touch</div>
        <div class="form-subtitle">
          Have an inquiry regarding partnering with us?<br/>
          Fill out the form below to contact our team.
        </div>
        <div class="row">
          <div class="input">
            <div class="label">First name</div>
            <input v-model="name" name="name" type="text" placeholder="First Name" :class="{error: !isValidName}">
          </div>
          <div class="input">
            <div class="label">Last Name</div>
            <input v-model="lastName" name="lastName" type="text" placeholder="Last Name"
                   :class="{error: !isValidName}">
          </div>
        </div>
        <div class="input">
          <div class="label">Email address</div>
          <input v-model="email" name="email" type="email" placeholder="Email" :class="{error: !isValidEmail}">
        </div>
        <div class="input">
          <div class="label">Message</div>
          <textarea v-model="help" name="help" id="help" rows="5" placeholder="Your message here..."
                    :class="{error: !isValidHelp}"></textarea>
        </div>
        <div class="send" :class="{active: activeButton, isDone, isSending}" @click="sendHelp()"></div>
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
    <HomepageSubscribe/>
  </div>
</template>

<script>
export default {
  name: "contact-us",
  data() {
    return {
      isFormShow: false,
      name: null,
      lastName: null,
      email: null,
      subject: 'Contact Us',
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
      return this.name && this.lastName && this.email && this.help
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
              name: this.name + ' ' + this.lastName,
              email: this.email,
              subject: this.subject,
              text: this.help,
            })

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
  padding-top: 30px;

  &-form {
    display: flex;
    flex-flow: column;
    justify-content: center;
    max-width: 500px;
    margin-bottom: 60px;

    .form-title {
      color: #000;
      font-size: 38px;
      font-style: normal;
      font-weight: 800;
      line-height: 38px;
    }

    .form-subtitle {
      color: #6E777A;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-top: 25px;
      margin-bottom: 30px;
    }

    .form-text {
      margin: 20px 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      color: #000000;
    }

    .send {
      border: 1px solid #EAEAEA;
      height: 44px;
      width: 100%;
      transition: .3s;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 5px;
      background: #246BFC;

      &::before {
        content: 'Get in touch';
        font-weight: 600;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
      }

      &.isSending {
        &::before {
          content: 'Sending...';
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
    }

    .row {
      display: flex;
      width: 100%;

      .input:last-child {
        margin-left: 10px;
      }
    }

    .input {
      width: 100%;
      margin-bottom: 10px;

      .label {
        color: #ACACAE;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
      }
    }

    input, textarea {
      font-family: "Exo 2", sans-serif;
      border: 1px solid #EAEAEA;
      box-sizing: border-box;
      padding: 10px 20px;
      width: 100%;
      margin-bottom: 7px;
      font-size: 15px;
      max-height: 200px;
      border-radius: 5px;
      background: #F5F5F5;
      color: #717C7F;

      &.error {
        border-color: #ff6969;
      }

      &::placeholder {
        font-size: 14px;
        line-height: 26px;
        color: #717C7F;
      }
    }

    .error {
      color: red;
    }
  }

  &-thank-you {
    margin-top: 60px;
    padding: 0 15px;

    .form-title {
      color: #000;
      font-size: 38px;
      font-style: normal;
      font-weight: 800;
      line-height: 38px;
    }

    .form-text {
      color: #6E777A;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-top: 30px;
      margin-bottom: 100px;
    }
  }
}
</style>
