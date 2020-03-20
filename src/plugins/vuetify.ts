import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/src/locale/zh-Hans';
import en from 'vuetify/src/locale/en';
import i18n from '@/i18n';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans, en },
    current: 'en',
    // t: (key, ...params) => i18n.t(key, params).toString(),
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2f2f2f',
        secondary: '#424242',
        accent: '#f2f2f2',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
