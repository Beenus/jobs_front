<template>
  <div class="search-wrapper">
    <input type="text" placeholder="New York, US" v-model="location" :class="{error: isLocationError}"/>
    <div class="search-results" v-if="location && cities.length">
      <div class="city" v-for="city in cities" :key="city.city + city.countryCode" @click="setLocation(city)">
        {{ city.city }}, {{ city.countryCode }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CitySearch",
  data() {
    return {
      cities: []
    }
  },
  computed: {
    location: {
      get() {
        return this.$store.state.location;
      },
      async set(val) {
        await this.$store.dispatch('jobs/clearErrors')
        await this.$store.dispatch('setLocation', val)

        if (val.length >= 2) {
          const {cities} = await this.$store.dispatch('getCities', {q: val});
          this.cities = cities
        }
      }
    },
    errors() {
      return this.$store.state.jobs.error
    },
    isLocationError() {
      return this.errors && this.errors.includes('Invalid Location')
    },
  },
  methods: {
    async setLocation(city) {
      await this.$store.dispatch('setLocation', `${city.city}, ${city.countryCode}`)
      await this.$store.dispatch('setUserLocation', city)
      this.cities = []
    }
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

    .city {
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
