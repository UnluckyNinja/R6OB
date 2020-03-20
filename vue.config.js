module.exports = {
  publicPath: (() => {
    if (process.env.NODE_ENV === 'production'){
      if(process.env.GITHUB_REPOSITORY){
        let userepo = process.env.GITHUB_REPOSITORY;
        let repo = userepo.substring(userepo.indexOf('/'));
        return repo + `/`
      }
      return '/R6OB/';
    }else{
      return '/'
    }
  })(),

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
  transpileDependencies: ['vuetify'],
};
