import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import EmptyRouter from './views/EmptyRouter.vue';
import i18n from './i18n';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:locale',
      component: EmptyRouter,
      props: true,
      beforeEnter(to, from, next) {
        const { locale } = to.params;
        if (!i18n.availableLocales.includes(locale)) {
          next('/error/404');
        }
        if (i18n.locale !== locale) {
          i18n.locale = locale;
        }
        store.dispatch('setLang', { lang: i18n.locale });
        next();
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: "auth" */ './views/Home.vue'),
        },
        {
          path: 'legal/policy',
          name: 'legal-privacy',
          component: () => import(/* webpackChunkName: "auth" */ './views/LegalPrivacy.vue'),
        },
        {
          path: 'legal/tos',
          name: 'legal-terms',
          component: () => import(/* webpackChunkName: "auth" */ './views/LegalTerms.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Dashboard.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'send',
          name: 'send',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Send.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'receive',
          name: 'receive',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Receive.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Transactions.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'help',
          name: 'help',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Help.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Privacy.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import(/* webpackChunkName: "wallet" */ './views/Settings.vue'),
          meta: { authenticated: true },
        },
      ],
    },
    {
      path: '/error/:httpError(\\d+)',
      name: 'error',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "error" */ './views/Error.vue'),
    },
    {
      path: '*',
      redirect: '/error/404',
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (!store.getters.userChecked) {
    /* axios.get('/auth/me')
      .then((response) => {
        store.dispatch('setUser', { user: response.data });
        store.dispatch('setUserChecked', { userChecked: true });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          store.dispatch('setUser', { user: null });
          store.dispatch('setUserChecked', { userChecked: true });
        } else {
          // Something went wrong. Ignore it.
        }
      }); */
    try {
      const response = await axios.get('/auth/me');
      store.dispatch('setUser', { user: response.data });
      store.dispatch('setUserChecked', { userChecked: true });
    } catch (error) {
      if (error.response.status === 403) {
        store.dispatch('setUser', { user: null });
        store.dispatch('setUserChecked', { userChecked: true });
      } else {
        // Something went wrong. Ignore it.
      }
    }
  }

  if (to.matched.some(record => record.meta.authenticated) && !store.getters.user) {
    window.location.href = '/auth/login';
  } else {
    next();
  }
});

export default router;
