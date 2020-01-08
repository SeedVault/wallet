<template>
  <app-page>
    <template v-slot:main>
      <full-centered v-slot:main v-if="loading || oops">
        <loading-checkmark visible="false" :loading="loading" v-if="!oops"></loading-checkmark>
        <oops v-show="oops"></oops>
      </full-centered>

      <div class="row" v-show="!loading && !oops">
        <div class="col-lg-7">
          <simple-box :title="$t('receive.receive')">
            <div class="text-center">
              <canvas id="qr-canvas"></canvas>
              <h5 class="text-black-50 font-weight-normal mb-4">
                {{ $t('receive.your_wallet_address') }}</h5>
              <input type="hidden" id="your-wallet-address" :value="walletAddress">
              <h4 class="wallet-address p-3 mb-4">{{ walletAddress }}
                <button type="button" @click="copyToClipboard"
                class="btn btn-light btn-sm"
                style="width: 38px;top:-3px;position: relative"
                :title="$t('receive.copy_wallet_address_to_clipboard')">
                <icon icon="clipboard" /></button></h4>
              <p class="text-black-50">{{ $t('receive.share_your_address') }}</p>
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
  name: 'Receive',
  components: {
    AppPage,
  },
  setup(props, context) {
    const data = reactive({
      loading: false,
      oops: false,
      walletAddress: '',
      balance: '',
    });

    async function getData() {
      try {
        data.loading = true;
        data.oops = false;
        data.validationErrors = [];
        const response = await context.root.axios.get('/wallet/me');
        data.balance = response.data.balance;
        data.walletAddress = response.data.profile.walletAddress;
        QRCode.toCanvas(document.getElementById('qr-canvas'), data.walletAddress,
          { width: 200 }, () => { // error
          });
        data.loading = false;
      } catch (error) {
        data.loading = false;
        data.oops = true;
      }
    }


    function copyToClipboard() {
      const walletAddressToCopy = document.querySelector('#your-wallet-address');
      walletAddressToCopy.setAttribute('type', 'text');
      walletAddressToCopy.select();
      try {
        document.execCommand('copy');
        // const successfulCopy = document.execCommand('copy');
        // var msg = successfulCopy ? 'successful' : 'unsuccessful';
        // alert('Testing code was copied ' + msg);
      } catch (err) {
        // ignore it
      }
      walletAddressToCopy.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    }

    getData();

    return {
      ...toRefs(data), getData, copyToClipboard,
    };
  },
};

</script>

<style lang="scss" scoped>
h4.wallet-address {
  background-color: #eee;
}
</style>
