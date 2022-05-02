<template>
  <div class="home">
    <AppLoader v-if="loading" />
    <div v-else class="home__weather-card">
      <div class="home__weather__card_wrapper">
        <WeatherCard
          v-if="!loading"
          :weather-info="weatherInfo"
          :current-place.sync="currentPlace"
        />

        <div class="location__weather__past">
          <button
            v-if="!historicalWeather.length > 0"
            @click="getHistoricalWeather"
          >
            Past 5 Days
          </button>
        </div>
      </div>

      <div class="home__weather__card_wrapper">
        <WeatherCard
          v-if="!loading && historicalWeather.length > 0"
          :weather-info="historicalWeather"
          :current-place.sync="currentPlace"
          :is-historical="true"
        />
      </div>
    </div>

    <div class="home__map">
      <AppMap
        :current-place.sync="currentPlace"
        @getWeather="getWeather($event)"
      />
    </div>
  </div>
</template>

<script>
import WeatherCard from '../components/weather/WeatherCard.vue';
import AppMap from '../components/location/AppMap.vue';
import AppLoader from '../components/global/AppLoader.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherCard,
    AppMap,
    AppLoader,
  },
  data() {
    return {
      loading: true,
      weatherInfo: {},
      currentPlace: {},
      historicalWeather: [],
    };
  },
  watch: {
    currentPlace() {
      if (this.currentPlace) {
        this.historicalWeather = [];
        this.weatherInfo = {};
        this.getWeather(this.currentPlace);
      }
    },
  },
  methods: {
    async getWeather(e) {
      this.loading = true;

      const params = this.setWeatherParams(null, e.lat, e.lng);

      // eslint-disable-next-line operator-linebreak
      [this.weatherInfo.currentWeather, this.weatherInfo.daily] =
        await Promise.all([
          this.$api.weather.getCurrentWeather(params).then((res) => res.data),
          this.$api.weather
            .getBulkWeather(params)
            .then((res) => res.data.daily),
        ]);

      this.loading = false;
    },

    async getHistoricalWeather() {
      this.loading = true;

      const { currentPlace } = this;
      const params = this.setWeatherParams(
        this.dt,
        currentPlace.lat,
        currentPlace.lng
      );

      for (let day = 1; day < 6; day += 1) {
        params.dt = this.dateSubtractDays(day);
        // eslint-disable-next-line no-await-in-loop
        await this.$api.weather.getHistoricalWeather(params).then((res) => {
          this.historicalWeather.push(res.data.current);
        });
      }
      this.historicalWeather.reverse();
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.home {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  height: 100vh;
}
.home__weather__card_wrapper {
  margin-bottom: 1rem;
}
.location__weather__past {
  text-align: right;
}

.location__weather__past button {
  margin: 0 2rem;
  background-image: var(--gradient);
}
@media only screen and (max-width: 1063px) {
  .home {
    display: block;
  }
  .location__weather__past {
    margin-top: 1rem;
  }
}
</style>
