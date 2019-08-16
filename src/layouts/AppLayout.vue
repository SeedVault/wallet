<template>
  <div class="layout-container">
    <b-container fluid>
      <b-form-row align-v="center">
        <b-col md="2">
          <div class="sidebar">
            <center>
              <img class="sidebar__logo" src="/images/application_logo_wallet.svg" />
            </center>

            <div class="sidebar__profile media">
              <template v-if="user.picture != ''">
                <img class="align-self-start mr-3 rounded-circle" :src="user.picture" />
              </template>
              <template v-else>
                <img class="align-self-start mr-3 rounded-circle" src="@/assets/images/avatar@2x.svg" />
              </template>
              <div class="media-body">
                <div class="sidebar__profile--email">{{ user.email }}</div>
                <div class="sidebar__profile--username">{{ user.username }}</div>
              </div>
            </div>

            <div class="sidebar__menu">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'dashboard'}">
                    <img src="@/assets/icons/outline-dashboard-24px@2x.svg" />
                    {{ $t('app.dashboard') }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'send'}">
                    <img src="@/assets/icons/outline-send@2x.svg" />
                    {{ $t('app.send') }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'receive'}">
                    <img src="@/assets/icons/outline-history-24px@2x.svg" />
                    {{ $t('app.receive') }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'privacy'}">
                    <img src="@/assets/icons/outline-security-24px@2x.svg" />
                    {{ $t('app.privacy') }}
                  </router-link>
                </li>
                <!-- <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'transactions'}">
                    <img src="@/assets/icons/outline-history-24px@2x.svg" />
                    {{ $t('app.transactions') }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'settings'}">
                    <img src="@/assets/icons/outline-tune-24px@2x.svg" />
                    {{ $t('app.settings') }}
                  </router-link>
                </li> -->
              </ul>
              <ul class="nav flex-column sidebar__menu--signout">
                <li class="nav-item">
                   <router-link class="nav-link" :to="{ name: 'help'}">
                    <img src="@/assets/icons/outline-help_outline-24px@2x.svg" />
                    {{ $t('app.help') }}
                  </router-link>
                </li>
              </ul>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="/auth/logout">
                    <img src="@/assets/icons/outline-exit_to_app-24px@2x.svg" />
                    {{ $t('app.sign_out') }}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </b-col>

        <b-col md="10">
          <!-- <font-awesome-icon :icon="['fas', 'user-circle']" /> -->
          <template v-if="$route.matched.length">
            <!-- <transition name="fade" mode="out-in"> -->
              <div class="container-fluid workspace">
                <!-- <router-view></router-view> -->
                 <slot/>
              </div>
            <!-- </transition> -->
          </template>
          <template v-else>
            <center>
              <h1>You are logged {{ loggedIn ? 'in' : 'out' }}</h1>
            </center>
          </template>

        </b-col>
      </b-form-row>

    </b-container>
  </div>
</template>

<script>
// import auth from '../auth'

export default {
  mounted () {
    document.body.className = 'body-gray'
  },
  beforeDestroy () {
    document.body.className = ''
  },
  /*data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },*/
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  /*created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }*/
}
</script>

<style lang="scss" scoped>

  .layout-container {
    height:100%;
  }

  .sidebar {

    &__logo {
      padding-left: 20px;
      margin-top: 37px;
      margin-bottom: 40px;
    }

    &__profile {
      padding-left: 10px;
      margin-bottom: 50px;

      img {
        width: 40px;
        height: 40px;
        float: left;
      }

      &--email {
        font-size: 12px;
        line-height: 18px;
      }

      &--username {
        font-size: 20px;
        line-height: 24px;
      }
    }

    &__menu {
      a {
        font-size: 16px;
        padding: 13px 20px 13px 20px;
        color: #686b77;
        img {
          padding-right: 10px;
        }

        &.active {
          background: rgba(107,76,159,.15);
          border-radius: 8px;
          color: #6b4c9f;
          font-weight: 500;
          img {
            filter: invert(38%) sepia(13%) saturate(2389%) hue-rotate(221deg) brightness(75%) contrast(92%);
          }
        }

        &:hover {
          color: #6b4c9f;
          font-weight: 500;
          img {
            filter: invert(38%) sepia(13%) saturate(2389%) hue-rotate(221deg) brightness(75%) contrast(92%);
          }
        }
      }

      &--signout {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #dedfe0;
        margin-bottom: 20px;
      }
    }

  }

  .workspace {
    min-height: 80%;
    margin-top: 20px;
    @media (min-width: 576px) {
      padding-left: 40px;
    }
  }

</style>
