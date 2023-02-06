<template>
  <div class="search-wrapper">
    <input type="text" placeholder="Search for a job or a company" v-model="searchValue" ref="search"/>
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
    }
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

  .search-results {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;

    .item {
      padding: 5px 10px;
      background: #fff;
      cursor: pointer;

      &:hover {
        background: #e8e8e8;
      }
    }
  }
}
</style>
