import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import router from './router';
import store from './store';

// plugins
import appAxios from './plugins/appAxios';

// mixins
import timeFormatter from './mixins/timeFormatter';
import weatherParams from './mixins/weatherParams';

// Global registerations
Vue.mixin(timeFormatter);
Vue.mixin(weatherParams);
Vue.use({
  install() {
    Vue.prototype.$api = appAxios;
  },
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB3fWEJAj5W8eVxvNr_OVVVsOL1Jjiw15M',
    libraries: 'places',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
