import Vue from 'vue';
import VueKonva from 'vue-konva';

import '@/globals'

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n'
import vuetify from './plugins/vuetify';

Vue.use(VueKonva);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app');
