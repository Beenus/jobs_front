<template>
  <div class="search-wrapper city">
    <input class="input" type="text" placeholder="New York, US" v-model="location"
           :class="{error: isLocationError, header:isHeader}"/>
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
  props: {
    placeholder: {
      require: false,
      default: 'New York, US'
    },
    isHeader: {
      require: false,
      default: false,
    }
  },
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
  width: 50%;

  @media (max-width: $screen-xs-max) {
    max-width: 375px;
    width: 100%;
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
    background: url("~/assets/img/svg/location.svg") center / cover no-repeat;
    width: 16px;
  }
}
</style>
