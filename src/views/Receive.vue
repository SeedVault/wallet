<template>
  <app-layout>
    <loading-circle loading="loading" v-show="loading"></loading-circle>
    <oops v-show="oops"></oops>

    <div class="row" v-show="!loading && !oops">
      <div class="col-lg-7">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title">{{ $t('receive.receive') }}</h4>
            <div class="text-center">
              <canvas id="qr-canvas"></canvas>
              <p class="your-wallet-address">{{ $t('receive.your_wallet_address') }}</p>
              <h4 class="wallet-address">{{ walletAddress }}</h4>
              <p class="share">{{ $t('receive.share_your_address') }}</p>
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
import QRCode from 'qrcode';

export default {
  name: 'Receive',
  components: {
    AppLayout,
  },
  data() {
    return {
      loading: false,
      oops: false,
      walletAddress: '',
      balance: '',
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios.get('/api/wallet')
        .then((result) => {
          this.loading = false;
          this.balance = result.data.balance;
          this.walletAddress = result.data.profile.walletAddress;
          QRCode.toCanvas(document.getElementById('qr-canvas'), this.walletAddress, {width: 200}, function (error) {
            // if (error) console.error(error);
          });
        })
        .catch((error) => {
          this.loading = false;
          this.oops = true;
        });
    }
  },
};
</script>

<style lang="scss" scoped>

h4.wallet-address {
  font-size: 1.2125rem;
  background-color: #eee;
  padding: 10px;
}

p.your-wallet-address {
  font-size: 1rem;
  color: #666;
}
p.share {
  color: #999;
  margin-top: 20px;
}
</style>
