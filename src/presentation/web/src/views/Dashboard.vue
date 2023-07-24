<template>
  <div>
    <base-contents>
    <div class="card-list">
        <card title="Students" Total="34" iconType="$vuetify"></card>
        <card title="Teachers" Total="34"></card>
        <card title="Male Student" Total="34"></card>
        <card title="Female Student" Total="34"></card>
        <card title="All managers" Total="34"></card>
        <card title="All Users" Total="34"></card>
       
    </div>
    <div class="chart-section">
      <card>
        <v-list>
              <v-list-item ></v-list-item>
        </v-list>
      </card>
      <chartCard></chartCard>
    </div>
    </base-contents>
  </div>
</template>

<script>
import card from '../components/Dashboard/card.vue'
import chartCard from '../components/Dashboard/chartCart.vue/chartCard.vue'

export default {
  components: { card, chartCard },
  data: () => {
    
  },
  methods: {
    
  }
}
 
</script>

<style scoped>
.card-list{
  width: 100%;
  display: flex;
}

.chart-section{
  width: 100%;
  margin-top: 3rem;
}

.chart-section{
  width: 100%;
  display: flex;
}
</style>
