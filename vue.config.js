module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/R6OB/' : '/',

  configureWebpack: {
    devtool: 'source-map',
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
