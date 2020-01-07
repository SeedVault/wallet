module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_API_URL,
    https: false,
    port: process.env.WALLET_PORT,
    public: process.env.VUE_APP_WALLET_URL,
    disableHostCheck: true,
    // public: `127.0.0.1:${process.env.WALLET_PORT}`,
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
