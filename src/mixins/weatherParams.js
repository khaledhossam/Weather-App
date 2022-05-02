// params mixins
export default {
  methods: {
    setWeatherParams(dt, lat, lon) {
      return new (class Params {
        constructor() {
          this.appid = '916bc9e6f098fcfb77954b59ad8ac4e4';
          this.units = 'metric';
          this.exclude = 'hourly';
          this.lat = lat;
          this.lon = lon;
          this.dt = dt;
        }
      })();
    },
  },
};
