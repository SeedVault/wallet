const server = require('./server/app');

module.exports = {
  devServer: {
    before: server,
    https: true,
    port: 9001,
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
