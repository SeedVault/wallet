<template>
  <app-page>
    <template v-slot:main>
      <full-centered v-slot:main v-if="loading || oops">
        <loading-checkmark visible="false" :loading="loading" v-if="!oops"></loading-checkmark>
        <oops v-show="oops"></oops>
      </full-centered>

      <div class="row" v-show="!loading && !oops">
        <div class="col-lg-7">
          <simple-box :title="$t('app.send')">
            <div class="text-black-50 text-center mt-5 mb-5" v-show="emptyWallet">
              <h5>{{ $t('send.your_wallet_is_empty') }}</h5>
            </div>

            <div class="send-box" v-if="!emptyWallet">

              <validation-box id="_" :validationErrors="validationErrors"></validation-box>

              <form @submit.prevent="verify" v-show="!sending && !verified">
                <input-text v-model="to" id="to" :label="$t('send.to_label')"
                :placeholder="$t('send.to_placeholder')" icon="person"
                :validationErrors="validationErrors"></input-text>

                <input-text v-model="amount" id="amount" :label="$t('send.amount_label')"
                :placeholder="$t('send.amount_placeholder')" icon="coin"
                :validationErrors="validationErrors"></input-text>

                <input type="submit" id="submit" :value="$t('common.continue')"
                  class="btn btn-primary btn-lg btn-block font-weight-bold"/>
              </form>

              <div id="sending" class="text-center" v-show="sending || sent">
                <loading-checkmark visible="true" :loading="loading" :showCheckmark="sent">
                  <template v-slot:messages>
                    <div v-if="sent">
                      <h5 class="primary-color mb-5">{{ $t('send.sent') }}</h5>
                      <p>{{ $t('send.funds_will_be_credited') }}</p>
                      <p class="transaction-id">{{ $t('send.transaction_id') }}:
                        {{ transactionId }}</p>
                    </div>
                    <div v-if="sending && !sent">
                      {{ $t('common.please_wait') }}
                    </div>
                  </template>
                </loading-checkmark>
              </div>

              <form @submit.prevent="send" v-show="!sending && verified && !sent"
                class="text-center">
                <h5>{{ $t('send.please_review') }}</h5>
                <p>
                  <i18n path="send.send_amount_to">
                    <strong slot="amount">{{ $n(amount, 'cryptoCurrency') }}</strong>
                    <strong slot="to">{{ to }}</strong>
                  </i18n>
                </p>
                <canvas id="qr-canvas"></canvas>
                <p class="to-wallet-address mb-5">{{ toWalletAddress}}</p>
                <div class="form-row">
                  <div class="col-12 col-md-6 my-1">
                    <button type="button" @click="previous"
                      class="btn btn-md btn-light btn-block font-weight-bold">
                      <icon icon="arrow-left-primary" class="mr-1" /> {{ $t('common.previous') }}
                    </button>
                  </div>
                  <div class="col-12 col-md-6 my-1">
                    <button type="button" @click="send"
                      class="btn btn-md btn-primary btn-block font-weight-bold">
                      {{ $t('send.send') }}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </simple-box>
        </div>
        <div class="col-lg-5">
        </div>
      </div>

    </template>
    <router-view/>
  </app-page>
</template>

<script>
import AppPage from 'seed-theme/src/layouts/AppPage.vue';
import QRCode from 'qrcode';
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
      emptyWallet: false,
      sending: false,
      verified: false,
      sent: false,
      validationErrors: [],
      balance: '',
      to: '',
      amount: '',
      toWalletAddress: '',
      transactionId: '',
    });

    async function getData() {
      try {
        data.loading = true;
        data.oops = false;
        data.validationErrors = [];
        const response = await context.root.axios.get('/wallet/me');
        data.balance = response.data.balance;
        data.walletAddress = response.data.profile.walletAddress;
        data.balance = response.data.balance;
        data.emptyWallet = (data.balance === '0');
        data.loading = false;
      } catch (error) {
        data.loading = false;
        data.oops = true;
      }
    }

    async function verify() {
      try {
        data.sending = true;
        data.validationErrors = [];
        const response = await context.root.axios.post('/wallet/verify', {
          to: data.to,
          amount: data.amount,
        });
        data.verified = true;
        data.toWalletAddress = response.data.toWalletAddress;
        QRCode.toCanvas(document.getElementById('qr-canvas'), data.toWalletAddress,
          { width: 148 }, (error) => { // error
            if (error) console.error(error);
          });
        data.balance = response.data.balance;
        data.walletAddress = response.data.walletAddress;
        data.balance = response.data.balance;
        data.emptyWallet = (data.balance === '0');
        data.sending = false;
      } catch (error) {
        console.log(error);
        data.sending = false;
        if (error.response && error.response.status === 422) {
          data.validationErrors = context.root.normalizeErrors(error.response);
        } else {
          data.oops = true;
        }
      }
    }

    function previous() {
      data.validationErrors = [];
      data.loading = false;
      data.emptyWallet = false;
      data.sending = false;
      data.verified = false;
      data.sent = false;
    }

    async function send() {
      try {
        data.sending = true;
        data.validationErrors = [];
        const response = await context.root.axios.post('/wallet/send', {
          to: data.to,
          amount: data.amount,
        });
        data.sending = false;
        data.verified = true;
        data.sent = true;
        data.transactionId = response.data.transactionId;
      } catch (error) {
        data.sending = false;
        data.verified = false;
        if (error.response && error.response.status === 422) {
          data.validationErrors = context.root.normalizeErrors(error.response);
        } else {
          data.oops = true;
        }
      }
    }

    getData();

    return {
      ...toRefs(data), getData, verify, previous, send,
    };
  },
};

</script>

<style lang="scss" scoped>
.transaction-id {
  color: #999;
  font-size: 0.95em;
}
</style>
