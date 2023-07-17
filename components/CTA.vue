<template>
  <a v-if="link" class="cta" :class="{themeColor, visited}" target="_blank" :href="link"
     :onmousedown="onMouseDown" :onTouchStart="onTouchStart">{{ text }}</a>
  <div v-else class="cta" :class="{themeColor, visited}">{{ text }}</div>
</template>

<script>
export default {
  name: 'CTA',
  props: {
    link: {
      require: true,
    },
    text: {
      require: false,
      default: 'More Info'
    },
    onMouseDown: {
      require: false,
      default: '',
    },
    onTouchStart: {
      require: false,
      default: '',
    },
    visited: {
      require: false,
      default: false
    }
  },
  computed: {
    themeColor() {
      return this.$store.state.themeColor
    }
  }
}
</script>

<style scoped lang="scss">
.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 150px;
  max-width: 100%;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: .3s;
  border-radius: 8px;
  background: linear-gradient(90deg, #053FB8 0%, #246BFD 100%);

  //
  //background-image: linear-gradient(45deg, rgb(254, 196, 97), rgb(255, 224, 176), rgb(254, 196, 97));
  //background-position: initial;
  //background-repeat: initial;
  //background-attachment: initial;
  //background-origin: initial;
  //background-clip: initial;
  //background-color: initial;
  //background-size: 400% 400% !important;
  //animation: 5s ease 0s infinite normal none running glare !important;
  //
  //@keyframes glare {
  //  0%, 100% {
  //    transform: translate3d(0px, 0px, 0px);
  //  }
  //  0% {
  //    background-position: 0% 50%;
  //  }
  //  50% {
  //    background-position: 100% 50%;
  //  }
  //  100% {
  //    background-position: 0% 50%;
  //  }
  //}
  //

  //&::after {
  //  content: '';
  //  display: block;
  //  pointer-events: none;
  //  background: url("~/assets/img/svg/arrow-top-right-icon.svg") center / cover no-repeat;
  //  width: 10px;
  //  height: 10px;
  //  margin-left: 7px;
  //}

  &.big {
    width: 150px;
  }

  &.visited {
    cursor: not-allowed;
    background: linear-gradient(90deg, #246BFD 0%, #053FB8 100%);
  }


  &:hover {
    background: linear-gradient(90deg, #246BFD 0%, #053FB8 100%);
  }

  &.blue {
    background: #0157FF;

    &:hover {
      background: #2c72fd;
    }
  }

  &.red {
    background: #FF595E;

    &:hover {
      background: #ff7e82;
    }
  }
}
</style>
