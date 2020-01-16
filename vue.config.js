module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/R6OB/' : '/',

  configureWebpack: {
    devtool: 'source-map',
  },
};
