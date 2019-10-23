<template>
  <app-layout>
    <loading-circle loading="loading" v-show="loading"></loading-circle>
    <oops v-show="oops"></oops>

    <div class="row" v-show="!loading && !oops">
      <div class="col-lg-7">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title">{{ $t('send.send') }}</h4>

            <div class="empty-wallet text-center" v-show="emptyWallet">
              <h5>Your wallet is empty</h5>
            </div>

            <div class="send-box" v-if="!emptyWallet">

              <validation-box id="_" :validationErrors="validationErrors"></validation-box>

              <form @submit.prevent="verify" v-show="!sending && !verified">
                <input-text v-model="to" id="to" :label="$t('send.to_label')"
                :placeholder="$t('send.to_placeholder')" icon="outline-person-24px@2x.svg"
                :validationErrors="validationErrors"></input-text>

                <input-text v-model="amount" id="amount" :label="$t('send.amount_label')"
                :placeholder="$t('send.amount_placeholder')" icon="outline-coin-24px@2x.svg"
                :validationErrors="validationErrors"></input-text>

                <input type="submit" id="submit" :value="$t('common.continue')"
                  class="btn btn-primary btn-lg btn-block"/>
              </form>

              <div id="sending" class="text-center" v-show="sending || sent">
                <div v-bind:class="[{ 'load-complete': sent }, 'circle-loader circle-text']">
                  <div class="checkmark draw" v-show="sent"></div>
                </div>
                <div v-if="sent">
                  <h5 class="sent-message">{{ $t('send.sent') }}</h5>
                  <p>{{ $t('send.funds_will_be_credited') }}</p>
                  <p class="transaction-id">{{ $t('send.transaction_id') }}: {{ transactionId }}</p>
                </div>
                <div v-if="sending && !sent">
                  {{ $t('common.please_wait') }}
                </div>
              </div>

              <form @submit.prevent="send" v-show="!sending && verified && !sent" class="text-center">
                <h5>{{ $t('send.please_review') }}</h5>
                <p>
                  <i18n path="send.send_amount_to">
                    <strong slot="amount">{{ amount|toCryptoCurrency() }}</strong>
                    <strong slot="to">{{ to }}</strong>
                  </i18n>
                </p>
                <canvas id="qr-canvas"></canvas>
                <p class="to-wallet-address">{{ toWalletAddress}}</p>
                <div class="form-row">
                  <div class="col-12 col-md-6 my-1">
                    <button type="button" @click="previous" class="btn btn-sm btn-light btn-block">
                      <img src="@/assets/icons/arrow-back.svg" /> {{ $t('common.previous') }}
                    </button>
                  </div>
                  <div class="col-12 col-md-6 my-1">
                    <button type="button" @click="send" class="btn btn-sm btn-primary btn-block">
                      {{ $t('send.send') }}
                    </button>
                  </div>
                </div>
              </form>



            </div>




          </div>
        </div>
      </div>

      <div class="col-lg-5">

      </div>
    </div>



  </app-layout>
</template>

<script>
import AppLayout from 'seed-theme/src/layouts/AppLayout.vue';
import BigNumber from 'bignumber.js';
import QRCode from 'qrcode';
export default {
  name: 'Send',
  components: {
    AppLayout,
  },
  data() {
    return {
      loading: false,
      oops: false,
      emptyWallet: false,
      sending: false,
      verfied: false,
      sent: false,
      validationErrors: [],
      balance: '',
      to: '',
      amount: '',
      toWalletAddress: '',
      transactionId: ''
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.validationErrors = [];
      this.loading = true;
      this.emptyWallet = false;
      this.sending = false;
      this.verified = false;
      this.sent = false;
      this.axios.get('/api/wallet')
        .then((result) => {
          this.loading = false;
          this.balance = result.data.balance;
          this.emptyWallet = (this.balance === '0');
        })
        .catch((error) => {
          this.loading = false;
          this.oops = true;
        });
    },
    verify() {
      this.validationErrors = [];
      this.sending = true;
      this.axios.post('/api/wallet/verify', {
        to: this.to,
        amount: this.amount,
      })
        .then((result) => {
          this.sending = false;
          this.verified = true;
          this.toWalletAddress = result.data.toWalletAddress;
          QRCode.toCanvas(document.getElementById('qr-canvas'), this.toWalletAddress, {width: 148}, function (error) {
            if (error) console.error(error);
          });
        })
        .catch((error) => {
          this.sending = false;
          if (error.response.status === 422) {
            this.validationErrors = this.normalizeErrors(error.response);
          } else {
            this.oops = true;
          }
        });
    },
    previous() {
      this.validationErrors = [];
      this.loading = false;
      this.emptyWallet = false;
      this.sending = false;
      this.verified = false;
      this.sent = false;
    },
    send() {
      this.sending = true;
      this.sent = false;
      this.axios.post('/api/wallet/send', {
        to: this.to,
        amount: this.amount,
      })
        .then((result) => {
          this.sending = false;
          this.verified = true;
          this.sent = true;
          this.transactionId = result.data.transactionId;
        })
        .catch((error) => {
          this.sending = false;
          this.verified = false;
          if (error.response.status === 422) {
            this.validationErrors = this.normalizeErrors(error.response);
          } else {
            this.oops = true;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-wallet {
  padding-top: 100px;
  padding-bottom: 100px;
  color: #999;
}

.send-box {
  padding-top: 30px;
  padding-bottom: 30px;
}

.sending {
  padding-top: 100px;
  padding-bottom: 100px;
}

.circle-text {
  margin-bottom: 1em;
}

.to-wallet-address {
  margin-bottom: 50px;
}

.sent-message {
  color: #6b4c9f;
  margin-bottom: 2em;
}

.transaction-id {
  color: #999;
  font-size: 0.95em;
}
</style>
