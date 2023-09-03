<template>
  <v-card max-width="450" class="mx-auto d-flex justify-center align-center flex-column pa-5 py-12 theShadow rounded">
    <v-card-title>
      <h2>System Backup</h2>
    </v-card-title>
    <v-card-subtitle>Generate data backup at current state of system</v-card-subtitle>
    <v-card-text>
      <!-- <v-alert
        type="info"
        variant="outlined"
        title="Attention"
        text="System data is automatically cloned on Thursday!"
      ></v-alert> -->
      <div class="mt-6"></div>
      <v-btn size="x-large" icon="mdi-database-arrow-down" variant="outlined"></v-btn>
    </v-card-text>

    <v-card-actions class="mt-8">
      <v-btn @click="startBackup" variant="flat" class="px-6" :loading="isLoading">Start Backup</v-btn>
      <!-- <v-btn @click="tokenNeed = false" variant="text" color="error" class="px-2">Cancel</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
  }),
  methods: {
    async startBackup() {
      this.isLoading = true;
      await this.$store.dispatch('startDBBackup');

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>

<style scoped></style>
