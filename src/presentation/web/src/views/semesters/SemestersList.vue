<template>
  <base-contents>
    <!-- Appbar Slot
    <template v-slot:bar>
      <v-text-field
        clearable=""
        :loading="loading"
        density="compact"
        variant="outlined"
        label="Find teacher by name"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
      <div class="mx-1"></div>
      <add-teacher></add-teacher>
    </template> -->
    <v-toolbar color="dark">
      <v-toolbar-title> Semesters </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <base-select-year-dialog @select-year="setYear" :defaultYear="selectedYear">
        {{ selectedYear ? `Year: ${selectedYear}` : 'Select Year' }}
      </base-select-year-dialog>
    </v-toolbar>
    <v-row no-gutters>
      <v-col v-for="(semester, index) in semesters" :key="index" cols="3">
        <v-sheet class="ma-2 pa-2">
          <semester-card :title="semester?.title" :year="selectedYear" :semesterId="semester.id"> </semester-card>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Dialogs -->
  </base-contents>
</template>

<script>
import SemesterCard from '@/components/semesters/SemesterCard.vue';
export default {
  data: () => ({
    // Default year. This will be later on changed to latest onGoing year form API.
    selectedYear: 1401,
  }),
  components: {
    SemesterCard,
  },
  computed: {
    semesters() {
      return this.$store.getters['semesters/currentYearSemesters'];
    },
  },
  methods: {
    async setYear(year) {
      this.selectedYear = year;
      // this.$store.commit('setCurrentYear', year);

      // Also, load it's semesters
      await this.loadSemesters(year);
    },
    async loadSemesters(year) {
      await this.$store.dispatch('semesters/loadSemestersByYear', year);
    },
  },
  async mounted() {
    // Load teachers at app mount

    // Probably the onGoing year
    await this.loadSemesters(this.selectedYear);
  },
};
</script>

<style scoped></style>
