<template>
  <app-page>
    <template v-slot:main>
      <full-centered v-slot:main v-if="loading || oops">
        <loading-checkmark visible="false" :loading="loading" v-if="!oops"></loading-checkmark>
        <oops v-show="oops"></oops>
      </full-centered>

      <div class="row" v-show="!loading && !oops">
        <div class="col-lg-7">
          <simple-box :title="$t('dashboard.balance')">
            <div class="display-1 text-truncate mb-3">
              <icon icon="seed-symbol"
              class="token-symbol" /> {{ $n(balance, 'cryptoCurrency') }}
            </div>
            <balance-chart v-if="!loading" :chart-data="chartBalanceData"
            :options="chartBalanceOptions" :height="200"></balance-chart>
          </simple-box>
        </div>
        <div class="col-lg-5">
          <simple-box :title="$t('dashboard.latest_transactions')">
            <latest-transactions :transactions="latestTransactions"></latest-transactions>
          </simple-box>
        </div>
      </div>


    </template>
    <router-view/>
  </app-page>
</template>

<script>
import AppPage from 'seed-theme/src/layouts/AppPage.vue';
import BigNumber from 'bignumber.js';
import { reactive, toRefs } from '@vue/composition-api';

export default {
  name: 'Dashboard',
  components: {
    AppPage,
  },
  setup(props, context) {
    const data = reactive({
      loading: false,
      oops: false,
      balance: '',
      latestTransactions: [],
      chartBalanceOptions: {
        legend: {
          display: false,
        },
      },
      chartBalanceData: {
        labels: [],
        datasets: [
          {
            // label: 'Data One',
            backgroundColor: '#9bdaa4',
            data: [],
          },
        ],
      },
    });

    async function getData() {
      try {
        data.loading = true;
        data.oops = false;
        data.validationErrors = [];
        const response = await context.root.axios.get('/wallet/me/dashboard');
        data.balance = response.data.balance;
        data.latestTransactions = response.data.latestTransactions;
        data.chartBalanceData.labels = [];
        data.chartBalanceData.datasets[0].data = [];
        let balanceHistory = new BigNumber(response.data.balance);
        const hist = [balanceHistory];
        for (let i = 0; i < data.latestTransactions.length; i += 1) {
          const amount = new BigNumber(data.latestTransactions[i].amount);
          if (data.latestTransactions[i].sent) {
            balanceHistory = balanceHistory.plus(amount);
          } else {
            balanceHistory = balanceHistory.minus(amount);
          }
          hist.push(balanceHistory);
        }
        for (let i = data.latestTransactions.length - 1; i >= 0; i -= 1) {
          data.chartBalanceData.labels.push(
            context.root.$i18n.d(Date.parse(data.latestTransactions[i].date), 'short'),
          );
          data.chartBalanceData.datasets[0].data.push(hist[i]);
        }
        data.loading = false;
      } catch (error) {
        data.loading = false;
        data.oops = true;
      }
    }

    function getExplorerUrl() {
      return process.env.VUE_APP_PARITY_URL_EXPLORER;
    }

    getData();

    return {
      ...toRefs(data), getData, getExplorerUrl,
    };
  },
};

</script>

<style lang="scss" scoped>
.token-symbol {
  height: 0.88em;
  top: -2px;
  position: relative;
}
</style>
