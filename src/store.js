import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Data source:
// https://github.com/stefangabos/world_countries/blob/master/data/en/countries.json
export default new Vuex.Store({
  state: {
    lang: 'en',
    userChecked: false,
    user: null,
    allRoles: ['user', 'developer', 'publisher'],
    allCountries: [
      'af', 'al', 'dz', 'ad', 'ao', 'ag', 'ar', 'am', 'au', 'at', 'az', 'bs',
      'bh', 'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bt', 'bo', 'ba', 'bw', 'br',
      'bn', 'bg', 'bf', 'bi', 'cv', 'kh', 'cm', 'ca', 'cf', 'td', 'cl', 'cn',
      'co', 'km', 'cg', 'cd', 'cr', 'ci', 'hr', 'cu', 'cy', 'cz', 'dk', 'dj',
      'dm', 'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'sz', 'et', 'fj', 'fi',
      'fr', 'ga', 'gm', 'ge', 'de', 'gh', 'gr', 'gd', 'gt', 'gn', 'gw', 'gy',
      'ht', 'hn', 'hu', 'is', 'in', 'id', 'ir', 'iq', 'ie', 'il', 'it', 'jm',
      'jp', 'jo', 'kz', 'ke', 'ki', 'kp', 'kr', 'kw', 'kg', 'la', 'lv', 'lb',
      'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mg', 'mw', 'my', 'mv', 'ml', 'mt',
      'mh', 'mr', 'mu', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ma', 'mz', 'mm',
      'na', 'nr', 'np', 'nl', 'nz', 'ni', 'ne', 'ng', 'mk', 'no', 'om', 'pk',
      'pw', 'pa', 'pg', 'py', 'pe', 'ph', 'pl', 'pt', 'qa', 'ro', 'ru', 'rw',
      'kn', 'lc', 'vc', 'ws', 'sm', 'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg',
      'sk', 'si', 'sb', 'so', 'za', 'ss', 'es', 'lk', 'sd', 'sr', 'se', 'ch',
      'sy', 'tj', 'tz', 'th', 'tl', 'tg', 'to', 'tt', 'tn', 'tr', 'tm', 'tv',
      'ug', 'ua', 'ae', 'gb', 'us', 'uy', 'uz', 'vu', 've', 'vn', 'ye', 'zm',
      'zw',
    ],
    logo: '/images/application_logo_wallet.svg',
    logoImage: '/images/logo_wallet.svg',
    logoText: '/images/text_wallet.svg',
    logoTextWidth: '128px',
    menu: [
      {
        id: 1,
        text: 'app.dashboard',
        icon: 'outline-dashboard-24px@2x.svg',
        target: 'dashboard',
      },
      {
        id: 2,
        text: 'app.send',
        icon: 'outline-send@2x.svg',
        target: 'send',
      },
      {
        id: 3,
        text: 'app.receive',
        icon: 'outline-history-24px@2x.svg',
        target: 'receive',
      },
      {
        id: 4,
        text: 'app.privacy',
        icon: 'outline-security-24px@2x.svg',
        target: 'privacy',
      },
      {
        id: 5,
        type: 'divider',
        text: '',
        icon: '',
      },
      {
        id: 6,
        text: 'apps.accounts',
        icon: 'icon-gear.svg',
        url: `${ACCOUNTS_URL}/{{ locale }}/profile`,
      },
      {
        id: 7,
        text: 'apps.greenhouse',
        icon: 'outline-app-24px@2x.svg',
        url: `${GREENHOUSE_URL}/{{ locale }}/dashboard`,
      },
    ],
  },
  getters: {
    /* eslint-disable no-shadow */
    lang: state => state.lang,
    allCountries: state => state.allCountries,
    allRoles: state => state.allRoles,
    user: state => state.user,
    userChecked: state => state.userChecked,
    menu: state => state.menu,
    logo: state => state.logo,
    logoImage: state => state.logoImage,
    logoText: state => state.logoText,
    logoTextWidth: state => state.logoTextWidth,
  },
  mutations: {
    SET_LANG(state, params) {
      state.lang = params.lang;
    },
    SET_USER(state, params) {
      state.user = params.user;
    },
    SET_USER_CHECKED(state, params) {
      state.userChecked = params.userChecked;
    },
  },
  actions: {
    setLang({ commit }, params) {
      commit('SET_LANG', params);
    },
    setUser({ commit }, params) {
      commit('SET_USER', params);
    },
    setUserChecked({ commit }, params) {
      commit('SET_USER_CHECKED', params);
    },
  },
});
