<template>
  <div v-if="selectedDay">
    <div class="location">
      <div v-if="!isHistorical" class="loaction__input">
        <GmapAutocomplete
          :value="currentPlace ? currentPlace.name : ''"
          @place_changed="setPlace"
          :options="{
            fields: [
              'geometry',
              'formatted_address',
              'address_components',
              'name',
              'place_id',
              'photo',
            ],
          }"
        >
        </GmapAutocomplete>
      </div>

      <LocationInfo
        v-if="!isHistorical"
        :icon="selectedDay.weather[0].icon"
        :LocationInfo="currentPlace"
      />

      <div v-if="selectedDay" class="location__weather">
        <div v-if="!isHistorical" class="location__weather-left">
          <div class="weather-gradient"></div>

          <div class="date-container">
            <h2 class="date-dayname">
              {{ dateFormatterMixin(selectedDay.dt) }}
            </h2>
            <span class="location">{{ currentPlace.name || '' }}</span>
          </div>

          <div class="weather-container">
            <div
              v-if="
                dateFormatterMixin(weatherInfo.currentWeather.dt) ===
                dateFormatterMixin(selectedDay.dt)
              "
            >
              <h1>{{ ~~weatherInfo.currentWeather.main.temp }}°</h1>
            </div>
            <div v-else>
              <h1>
                {{ ~~selectedDay.temp.max }}° / {{ ~~selectedDay.temp.min }}
              </h1>
            </div>
            <h1>
              {{ selectedDay.weather[0] ? selectedDay.weather[0].main : '' }}
            </h1>
          </div>
        </div>

        <div v-else class="location__weather-left">
          <div class="weather-gradient"></div>
          <div class="date-container">
            <h2 class="date-dayname">
              {{ dateFormatterMixin(selectedDay.dt) }}
            </h2>
          </div>

          <div class="weather-container">
            <h1>{{ ~~selectedDay.temp }}°</h1>
            <h1>
              {{ selectedDay.weather[0] ? selectedDay.weather[0].main : '' }}
            </h1>
          </div>
        </div>

        <div class="location__weather-right">
          <div class="today-info-container">
            <div class="today-info">
              <div class="precipitation">
                <span class="title">PRESSURE </span>&nbsp;
                <span class="value">{{ selectedDay.pressure }} </span>
                <div class="clear"></div>
              </div>

              <div>
                <span class="title">HUMIDITY </span>
                &nbsp;
                <span class="value">{{ selectedDay.humidity }} %</span>
                <div class="clear"></div>
              </div>

              <div>
                <span class="title">WIND </span>
                &nbsp;
                <span class="value">{{ selectedDay.wind_speed }} km/h</span>
                <div class="clear"></div>
              </div>

              <div>
                <span class="title">High temperature</span
                ><span class="value">{{ ~~selectedDay.temp.max }}°C</span>
                <div class="clear"></div>
              </div>

              <div>
                <span class="title">Low temperature</span
                ><span class="value">{{ ~~selectedDay.temp.min }}°C</span>
                <div class="clear"></div>
              </div>

              <div>
                <span class="title">Sunrise </span>
                &nbsp;
                <span class="value">{{ getTime(selectedDay.sunrise) }} </span>
                <div class="clear"></div>
              </div>

              <div>
                <span class="title">Sunset </span
                ><span class="value">{{ getTime(selectedDay.sunset) }} </span>
                <div class="clear"></div>
              </div>
            </div>
          </div>

          <div v-if="!isHistorical" class="week-container">
            <ul class="week-list">
              <li
                @click="selectedDay = day"
                v-for="(day, i) in weatherInfo.daily"
                :key="i"
                :class="selectedDay === day ? 'active' : ''"
              >
                <span class="day-name">{{ getShotDayName(day.dt) }}</span
                ><span class="day-temp"
                  >{{ ~~day.temp.max }}°/ {{ ~~day.temp.min }}°</span
                >
              </li>
            </ul>
          </div>

          <div v-else class="week-container">
            <ul class="week-list">
              <li
                @click="selectedDay = day"
                v-for="(day, i) in weatherInfo"
                :key="i"
                :class="selectedDay === day ? 'active' : ''"
              >
                <span class="day-name">{{ getShotDayName(day.dt) }}</span
                ><span class="day-temp">{{ ~~day.temp }}°</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>

    <div v-if="photos" class="loaction__images">
      <a
        v-for="(item, index) in photos"
        :key="index"
        :href="item"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="item" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
import LocationInfo from '../location/LocationInfo.vue';

export default {
  components: { LocationInfo },
  name: 'WeatherCard',
  props: {
    weatherInfo: {
      type: [Object, Array],
      default: () => {},
    },
    currentPlace: {
      type: Object,
      default: () => {},
    },
    isHistorical: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // eslint-disable-next-line operator-linebreak
      selectedDay: this.isHistorical
        ? this.weatherInfo[0]
        : this.weatherInfo.daily[0] || {},
    };
  },

  computed: {
    photos() {
      const googlePhotos = this.currentPlace?.photos
        ?.map((el) => el.getUrl())
        .slice(0, 4);
      return googlePhotos;
    },
  },

  watch: {
    currentPlace() {},
  },

  methods: {
    setPlace(place) {
      place.lat = place.geometry.location.lat();
      place.lng = place.geometry.location.lng();
      this.$emit('update:currentPlace', place);
    },
  },
};
</script>

<style scoped>
.loaction__input {
  position: relative;
  margin: 2rem;
}

.location__weather {
  border-radius: 1.563rem;
  -webkit-box-shadow: 0 0 4.375rem -0.625rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 4.375rem -0.625rem rgba(0, 0, 0, 0.2);
  background-color: #222831;
  color: #ffffff;
  height: 23.875rem;
  margin: 2rem;
}

.location__weather-left {
  position: relative;
  height: 100%;
  border-radius: 1.563rem;
  width: 40%;
  -webkit-box-shadow: 0 0 1.25rem -0.625rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1.25rem -0.625rem rgba(0, 0, 0, 0.2);
  float: left;
}

.weather-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: var(--gradient);
  border-radius: 1.563rem;
  opacity: 0.8;
}

.date-container {
  position: absolute;
  top: 1.563rem;
  left: 1.563rem;
}

.date-dayname {
  margin: 0;
}

.date-day {
  display: block;
}

.weather-container {
  position: absolute;
  text-align: center;
  bottom: 1.563rem;
  left: 1.563rem;
}

.weather-desc {
  margin: 0;
  text-align: left;
}

.location__weather-right {
  position: relative;
  float: left;
  height: 100%;
  width: 60%;
  padding-top: 1.563rem;
  text-transform: uppercase;
}

.today-info {
  padding: 0.938rem;
  margin: 0 1.563rem 1.563rem 1.563rem;
  border-radius: 0.625rem;
}

.today-info > div:not(:last-child) {
  margin: 0 0 0.625rem 0;
}

.today-info > div .title {
  float: left;
  font-weight: 700;
}

.today-info > div .value {
  float: right;
}

.week-list {
  align-items: center;
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0.625rem 2rem;
  -webkit-box-shadow: 0 0 3.125rem -0.313rem rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 3.125rem -0.313rem rgba(0, 0, 0, 0.25);
}

.week-list > li {
  float: left;
  padding: 0.538rem;
  cursor: pointer;
  border-radius: 0.625rem;
}

.week-list > li.active {
  background: #fff;
  color: #222831;
  border-radius: 0.625rem;
}

.week-list > li .day-name {
  display: block;
  margin: 0.625rem 0 0 0;
  text-align: center;
}

.week-list > li .day-temp {
  display: block;
  font-size: 0.8em;
  text-align: center;
  margin: 0.625rem 0 0 0;
  font-weight: 700;
}

.loaction__images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-height: 20rem;
  overflow-y: auto;
  margin-top: 6rem;
}

.loaction__images img {
  width: 100%;
  height: 10.2rem;
  object-fit: cover;
}

@media only screen and (min-width: 1064px) and (max-width: 1283px) {
  .location__weather-left {
    width: 28%;
  }

  .date-dayname,
  .weather-container h1 {
    font-size: 1.2em;
  }

  .today-info {
    margin: 0 1.563rem 1.563rem 0;
  }

  .week-list {
    margin: 0.625rem 1rem;
  }
}

@media only screen and (max-width: 1063px) {
  .loaction__input {
    margin: 1rem 2rem;
  }
  .location__weather {
    height: 10.575rem;
    margin-top: 1rem;
  }
  .location__weather-left {
    float: unset;
    width: 100%;
  }
  .weather-container {
    bottom: 0.3rem;
  }
  .location__weather-right {
    float: unset;
    width: 100%;
  }
  .today-info {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }
  .week-list {
    display: contents;
  }
  .today-info > div:not(:last-child) {
    margin-bottom: 0.2rem;
  }
  .week-list > li {
    padding: 0.438rem;
  }
  .date-dayname,
  .weather-container h1 {
    font-size: 1.2em;
  }
  .loaction__images {
    margin-top: 5rem;
  }
  .loaction__images img {
    height: 5rem;
  }
}

@media only screen and (max-width: 1044px) {
  .location {
    width: 100%;
  }
}
</style>
