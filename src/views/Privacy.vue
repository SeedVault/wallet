<template>
  <app-page>
    <template v-slot:main>

      <simple-box :title="$t('app.privacy')">
        Content here
      </simple-box>

    </template>
    <router-view/>
  </app-page>
</template>

<script>
import AppPage from 'seed-theme/src/layouts/AppPage.vue';

export default {
  name: 'Privacy',
  components: {
    AppPage,
  },
  setup() {
  },
};

</script>
