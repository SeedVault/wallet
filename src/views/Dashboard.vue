<template>
  <app-layout>

    <div class="row">
      <div class="col-lg-7">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title">Balance</h4>
            <div class="balance">
              <img src="@/assets/images/seed-icon@2x.svg" />
              {{ 345.45 | toCurrency(2) }}
            </div>
            <balance-chart v-if="!loading" :chartdata="chartBalanceData" :options="chartBalanceOptions" :height="200"></balance-chart>
          </div>
        </div>
      </div>

          <div class="col-lg-5">
      <div class="card box">
        <div class="card-body">
          <h4 class="card-title" style="margin-bottom: 30px">Latest Transactions</h4>
          <!-- <button type="button" class="btn btn-sm btn-primary" style="width:48%;">
            <img src="@/assets/icons/SendIcon@2x.svg" /> Send
          </button>
          <button type="button" class="btn btn-sm btn-light" style="width:48%; float: right">
            <img src="@/assets/icons/DownloadIcon@2x.svg" /> Download
          </button> -->
          <table class="table table-responsive-xs transactions__table">
            <tbody>
              <tr v-for="(transaction, index) in latestTransactions" :key="index">
                <td>
                  <div class="transactions__date">{{ transaction.date }}</div>
                  <div class="transactions__user">{{ transaction.user }}</div>
                </td>
                <td>{{ transaction.type }}</td>
                <template v-if="transaction.type == 'Withdraw'">
                  <td class="v-if transactions__amount-withdraw">
                    <img src="@/assets/icons/ArrowOut@2x.svg" />
                    {{ transaction.qty | toCurrency }} SEED
                  </td>
                </template>
                <template v-else>
                  <td class="transactions__amount-deposit">
                    <img src="@/assets/icons/ArrowIn@2x.svg" />
                    {{ transaction.qty | toCurrency }} SEED
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '../layouts/AppLayout.vue';
import BalanceChart from '../components/BalanceChart.vue';
import { Line } from 'vue-chartjs'

export default {
  name: 'Dashboard',
  components: {
    AppLayout,
    BalanceChart,
  },
  data() {
    return {
      loading: false,
      chartBalanceOptions: {
        legend: {
          display: false,
        },
      },
      chartBalanceData: {
        labels: ['22-10-2018', '22-10-2018', '22-10-2018'],
        datasets: [
          {
            // label: 'Data One',
            backgroundColor: '#9bdaa4',
            data: [185, 256, 345]
          }
        ]
      },
      latestTransactions: [
        {
          date: '22-10-2018',
          user: 'Eduardo Polidor',
          type: 'Withdraw',
          qty: 14000
        },
        {
          date: '22-10-2018',
          user: 'Eduardo Polidor',
          type: 'Withdraw',
          qty: 15000
        },
        {
          date: '22-10-2018',
          user: 'Unknown',
          type: 'Deposit',
          qty: 200000
        }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

  .balance {
    font-size: 50px;
    font-weight: 800;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    img {
      margin-right: 20px;
    }
  }


.transactions {
    &__table {
      margin-top: 20px;

      tbody tr:nth-of-type(2n) {
        background-color: #f7f8f9;
      }

      td {
        border-top: 0;
        vertical-align: middle;
        font-weight: 500;

        .right {
          text-align: right;
        }
      }
    }

    &__user {
      color: #686b77;
      font-weight: normal;
    }

    &__amount {
      text-align: right;

      img {
        margin-right: 10px;
      }

      &-withdraw {
        color: #f5296a;
      }

      &-deposit {
        color: #39b54a;
      }
    }
  }

</style>
