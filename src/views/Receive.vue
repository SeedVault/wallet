<template>
  <app-layout>

    <div class="row">
      <div class="col-lg-7">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title">Receive tokens</h4>
            <form @submit.prevent="Receives">

              <p><br /></p>

                <input-text v-model="address" id="address" label="Crypto address"
                placeholder="Crypto address" icon="outline-person-24px@2x.svg"
                validationErrors="validationErrors"></input-text>

                <input-text v-model="amount" id="amount" label="Amount"
                placeholder="" icon="outline-language-24px@2x.svg"
                validationErrors="validationErrors"></input-text>


                <input type="submit" id="submit" value="Receive"
                  class="btn btn-primary btn-lg btn-block"/>

              </form>
              <p><br /></p>
          </div>
        </div>
      </div>

      <div class="col-lg-5">

      </div>
    </div>

  </app-layout>
</template>

<script>
import AppLayout from '../layouts/AppLayout.vue';

export default {
  name: 'Receive',
  components: {
    AppLayout,
  },
  data() {
    return {
      address: '',
      amount: '',
      validationErrors: [],
    };
  },
};
</script>
