<template>
  <div class="single-faq" :class="{open: isShowFaq}" @click="toggle">
    <div class="faq-title">{{ item.title }}</div>
    <div class="wrapper">
      <transition name="slide">
        <div class="faq-text" v-if="isShowFaq">{{ item.text }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleFAQ",
  props: ['item', 'forceOpen'],
  data() {
    return {
      isShowFaq: this.forceOpen,
    }
  },
  methods: {
    toggle() {
      this.isShowFaq = !this.isShowFaq
    }
  }
}
</script>

<style scoped lang="scss">
.single-faq {
  border-radius: 15px;
  padding: 20px 70px;
  margin-bottom: 20px;
  transition: .3s all;
  cursor: pointer;

  @media (max-width: $screen-xs-max) {
    padding: 20px;
  }

  &.open {
    background: #F8F9FA;
    padding: 25px 70px;

    @media (max-width: $screen-xs-max) {
      padding: 20px;
    }

    .faq-title {
      &::before {
        background: url("~/assets/img/minus.png") center / contain no-repeat;
      }
    }
  }

  .faq-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #121724;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      background: url("~/assets/img/plus.png") center / contain no-repeat;
      min-width: 31px;
      min-height: 31px;
      margin-right: 12px;
      margin-top: -3px;
    }
  }

  .faq-text {
    font-weight: 300;
    font-size: 16px;
    line-height: 21px;
    color: #525E6E;
  }
}

.wrapper {
  overflow: hidden;
}

.slide-leave-active,
.slide-enter-active {
  transition: all .5s ease;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  margin-bottom: -130px;
}
</style>
