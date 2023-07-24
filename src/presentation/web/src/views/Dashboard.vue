<template>
  <div>
    <base-contents>
    <div class="card-list">
      <v-card
        v-for="card in cards" :key="card.title"
        class="mx-auto"
        width="300"
        prepend-icon = "mdi-home"
      >
      <!-- <span class="icon" :class="card.icon"></span> -->
        <template v-slot:title>
          {{ card.total }}
        </template>

        <v-card-text>
          {{ card.title }}
        </v-card-text>
  </v-card>
    </div>
    <div class="chart-section">
      <card>
      
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
  data() {
    return {
      cards: [
        {
          title: "Card 1",
          total: 10,
          icon: "home"
        },
        {
          title: "mdi-home",
          total: 5,
          icon: "home"
        },
        {
          title: "Card 3",
          total: 8,
          icon: "home"
        },
        {
          title: "Card 1",
          total: 10,
          icon: "home"
        },
        {
          title: "Card 2",
          total: 5,
          icon: "home"
        },
        {
          title: "Card 3",
          total: 8,
          icon: "home"
        }
      ]}
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
