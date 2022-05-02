<template>
  <div>
    <GmapMap :center="center" :zoom="15" style="width: 100%; height: 100vh">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    currentPlace: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
    };
  },
  watch: {
    currentPlace() {
      this.addMarker();
    },
  },
  created() {
    this.geolocate();
  },
  methods: {
    addMarker() {
      if (this.currentPlace) {
        this.center = this.currentPlace;
        this.markers = [{ position: this.center }];
      }
    },
    async geolocate() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const params = this.setWeatherParams(
          null,
          position.coords.latitude,
          position.coords.longitude
        );
        await this.$api.weather.getCurrentWeather(params).then((res) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: res.data.name,
          };
        });

        this.markers = [{ position: this.center }];
        this.$emit('update:currentPlace', this.center);
      });
    },
  },
};
</script>
