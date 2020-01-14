import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueKonva from 'vue-konva';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.use(VueKonva);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
