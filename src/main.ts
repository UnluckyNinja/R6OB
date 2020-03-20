import Vue from 'vue';
// import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';
import VueKonva from 'vue-konva';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n'
import vuetify from './plugins/vuetify';

// Vue.use(Buefy, {
//   defaultIconPack: 'fa',
// });

Vue.use(VueKonva);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app');
