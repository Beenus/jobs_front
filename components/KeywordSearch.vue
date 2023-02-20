<template>
  <div class="search-wrapper job" v-click-outside="outsideClick">
    <input class="input" type="text" :placeholder="placeholder" v-model="searchValue" ref="search"
           :class="{header:isHeader}"/>
    <div class="search-results" v-if="searchValue && suggestions.length">
      <div class="item" v-for="suggestion in suggestions" :key="suggestion" @click="setSearch(suggestion)">
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeywordSearch",
  props: {
    placeholder: {
      require: false,
      default: 'Search for a job or a company'
    },
    isHeader: {
      require: false,
      default: false,
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.search
      },
      async set(val) {
        await this.$store.dispatch('jobs/clearErrors')
        await this.$store.dispatch('setSearch', val)

        if (val.length >= 2) {
          const {suggestions} = await this.$store.dispatch('getSuggestions', {q: val});
          this.suggestions = suggestions
        }
      },
    },
  },
  methods: {
    async setSearch(suggestion) {
      await this.$store.dispatch('setSearch', suggestion)
      this.suggestions = []
    },
    outsideClick() {
      this.suggestions = []
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.search.focus()
    })
  }
}
</script>

<style scoped lang="scss">
.search-wrapper {
  position: relative;
  margin-right: 10px;
  width: 50%;

  @media (max-width: $screen-xs-max) {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
    max-width: 375px;
  }

  &.hp {
    input {
      height: 50px;
    }
  }

  .search-results {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;
    z-index: 1;

    .item {
      padding: 5px 10px;
      background: #fff;
      cursor: pointer;

      &:hover {
        background: #e8e8e8;
      }
    }
  }

  input {
    width: 100%;
    max-width: 375px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 25px;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #000000;
    padding: 20px 20px 20px 50px;
    border: none;

    &.header {
      font-size: 14px;
    }

    &.error {
      border: 2px solid red;
      color: red;
    }
  }

  &::before {
    content: '';
    display: block;
    height: 23px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    pointer-events: none;
    z-index: 1;
    background: url("~/assets/img/svg/magnify_glass.svg") center / cover no-repeat;
    width: 20px;
  }

}
</style>
