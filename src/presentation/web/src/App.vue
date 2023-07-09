<template>
  <v-app>
    <v-main>
      <router-view />

      <v-container>
        <div id="notifications"></div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  async created() {
    // Load all years
    await this.$store.dispatch('loadAllYears');
    // Load all teachers
    await this.$store.dispatch('teachers/loadTeachers');
  },
};
</script>

<style>
.theShadow {
  -webkit-box-shadow: 0 0 37px rgb(8 21 66 / 5%);
  box-shadow: 0 0 37px rgb(8 21 66 / 5%) !important;
  border-radius: 10px;
}
</style>
