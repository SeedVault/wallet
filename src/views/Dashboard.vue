<template>
  <app-layout>
    <div class="row">
      <div class="col-sm">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title">{{ $t('app.dashboard') }}</h4>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '../layouts/AppLayout.vue';

export default {
  name: 'Dashboard',
  components: {
    AppLayout,
  },
};
</script>
