<template>
  <v-toolbar color="dark">
    <v-toolbar-title> {{ $t('Semesters') }} </v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>

    <base-menu :items="halfs" @selected="setHalf" :theDefault="currentHalf"></base-menu>

    <base-select-year-dialog @select-year="setYear" :defaultYear="selectedYear">
      {{ $t('Year') }} {{ selectedYear ? selectedYear : $t('Select') }}
    </base-select-year-dialog>
  </v-toolbar>
  <v-row no-gutters>
    <v-col v-for="(semester, index) in semesters" :key="index" cols="3">
      <v-sheet class="ma-2 pa-2">
        <semester-card
          :title="semester?.title"
          :year="selectedYear"
          :semesterId="semester.id"
          :subjects-count="semester.Subjects?.length"
        >
        </semester-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import SemesterCard from '@/components/semesters/SemesterCard.vue';
export default {
  data: () => ({
    // Default year. This will be later on changed to latest onGoing year form API.
    selectedYear: null,
    currentHalf: 'All Semesters',
    halfs: ['1st Semester', '2nd Semester', 'All Semesters'],
    onGoingHalf: false,
  }),
  components: {
    SemesterCard,
  },
  computed: {
    ongoingHalf() {
      return this.$store.getters[''];
    },
    semesters() {
      return this.$store.getters['semesters/currentYearSemesters'].filter((semester) => {
        if (this.currentHalf == this.halfs[1]) {
          return semester.title % 2 === 0;
        } else if (this.currentHalf == this.halfs[0]) {
          return semester.title % 2 !== 0;
        } else if (this.currentHalf == this.halfs[2]) {
          return semester;
        }
      });
    },
  },
  methods: {
    setHalf(half) {
      this.currentHalf = half;
    },
    async setYear(year) {
      this.selectedYear = year;
      this.$store.commit('semesters/setSelectedYearByUser', year);

      // Also, load it's semesters
      await this.loadSemesters(year);
    },
    async loadSemesters(year) {
      await this.$store.dispatch('semesters/loadSemestersByYear', year);
    },
  },
  async created() {
    // Load teachers at app mount
    // Set Default current on-going year on load
    const year = this.$store.getters['years/onGoingYear']?.year;

    // Set default half
    // this.currentHalf = this.$store.getters['years/onGoingYear']?.firstHalf == true ? this.halfs[0] : this.halfs[1];

    const theYear = this.$store.getters['semesters/selectedYearByUser'];
    if (!theYear) {
      this.selectedYear = year;
      this.$store.commit('semesters/setSelectedYearByUser', year);
    }

    if (theYear) {
      this.selectedYear = theYear;
    }

    this.onGoingHalf = this.$store.getters['years/onGoingYear']?.firstHalf == true ? this.halfs[0] : this.halfs[1];

    // Probably the onGoing year
    await this.loadSemesters(this.selectedYear);
  },
};
</script>

<style scoped></style>
