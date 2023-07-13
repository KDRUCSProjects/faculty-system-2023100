<template>
  <v-app>
    <v-main>
      <router-view />

      <v-container>
        <div id="notifications">
          <div v-for="(item, i) in toastMessages" :key="i">
            <base-toast :type="item.type" :text="item.text" :key="i"></base-toast>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  methods: {},
  computed: {
    toastMessages() {
      return this.$store.getters['toastMessages'];
    },
  },
  async created() {
    // Load all years
    await this.$store.dispatch('years/loadEducationalYears');
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
