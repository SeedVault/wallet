const webpack = require('webpack');
const server = require('./server/app');

module.exports = {
  devServer: {
    before: server,
    https: true,
    port: process.env.WALLET_PORT,
    public: `127.0.0.1:${process.env.WALLET_PORT}`,
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ACCOUNTS_URL: JSON.stringify(process.env.ACCOUNTS_URL),
        WALLET_URL: JSON.stringify(process.env.WALLET_URL),
        GREENHOUSE_URL: JSON.stringify(process.env.GREENHOUSE_URL),
      }),
    ],
  },
};
