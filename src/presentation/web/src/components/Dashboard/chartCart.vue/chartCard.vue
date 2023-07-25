<template>
    <v-card
      class="mx-auto"
      width="1000"
      prepend-icon="mdi-home"
    >
      <template v-slot:title>
        Student Statistics
      </template>
      <chart></chart>
    </v-card>
</template>


<script>

  import chart from '../charts/chart.vue';
  export default {
    components: {
      chart
    }
  };
  </script>
