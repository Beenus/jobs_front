<template>
  <a class="cta" :class="{themeColor, visited}" target="_blank" :href="link" :onmousedown="onMouseDown">{{ text }}</a>
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
  color: #000;
  text-decoration: none;
  font-weight: 600;
  background: #FEC461;
  border-radius: 25px;
  transition: .3s;

  &.big {
    width: 200px;
  }

  &.visited {
    cursor: not-allowed;
    background: #f5d090;
  }

  &:hover {
    background: #f5d090;
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
