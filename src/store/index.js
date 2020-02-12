import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'en',
    userChecked: false,
    user: null,
    csrf: null,
    menu: [
      /* {
        id: 1,
        text: 'app.dashboard',
        icon: 'dashboard',
        target: 'dashboard',
      }, */
      {
        id: 2,
        text: 'app.send',
        icon: 'send',
        target: 'send',
      },
      {
        id: 3,
        text: 'app.receive',
        icon: 'timer',
        target: 'receive',
      },
      {
        id: 4,
        text: 'app.privacy',
        icon: 'security',
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
        icon: 'gear',
        url: `${process.env.VUE_APP_ACCOUNTS_URL}/{{ locale }}/profile`,
      },
      {
        id: 7,
        text: 'apps.greenhouse',
        icon: 'seed-app',
        url: `${process.env.VUE_APP_GREENHOUSE_URL}/{{ locale }}/dashboard`,
      },
      {
        id: 8,
        type: 'divider',
        text: '',
        icon: '',
      },
      {
        id: 9,
        text: 'app.sign_out',
        icon: 'exit',
        url: `${process.env.VUE_APP_WALLET_URL}/{{ locale }}/logout`,
      },
    ],
  },
  getters: {
    lang: state => state.lang,
    user: state => state.user,
    userChecked: state => state.userChecked,
    csrf: state => state.csrf,
    allRoles: state => state.allRoles,
    allCountries: state => state.allCountries,
    menu: state => state.menu,
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
    SET_CSRF(state, params) {
      state.csrf = params.csrf;
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
    setCsrf({ commit }, params) {
      commit('SET_CSRF', params);
    },
  },
  modules: {
  },
});
