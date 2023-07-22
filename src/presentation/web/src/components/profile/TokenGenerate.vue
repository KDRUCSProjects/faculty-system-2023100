<template>
  <v-card max-width="450" class="mx-auto d-flex justify-center align-center flex-column pa-5 py-12 theShadow rounded">
    <v-card-title>
      <h1>{{ tokenNeed ? tokens.token : '******' }}</h1>
    </v-card-title>
    <br />
    <br />
    <v-card-text>
      <h3>
        {{ tokenNeed ? 'Expires ' : 'Click the button to generate the token' }} {{ tokenNeed ? tokenExpiresFromNow(tokens.expiresIn)+' from now' : '' }}
      </h3>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="fetchToken" variant="flat" class="px-6" prepend-icon="mdi-key">Generate Token</v-btn>
      <!-- <v-btn @click="tokenNeed = false" variant="text" color="error" class="px-2">Cancel</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    tokenNeed: false,
  }),

  computed: {
    tokens() {
      return this.$store.getters['tokens/tokens'];
    },
  },
  methods:{
    async fetchToken(){
        this.tokenNeed=true

        await this.$store.dispatch('tokens/loadTokens');
    },
    tokenExpiresFromNow(token){
        return moment(token).fromNow()
    }
  },
};
</script>

<style scoped></style>
