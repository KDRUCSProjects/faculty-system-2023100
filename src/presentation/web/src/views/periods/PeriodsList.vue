<template>
  <v-toolbar color="dark">
    <v-toolbar-title> {{ $t('Periods') }} </v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>

    <v-btn
      @click="downloadReport"
      class="float-right mx-1"
      prepend-icon="mdi-download-circle"
      color="indigo"
      variant="elevated"
      download
      :loading="downloadLoading"
    >
      {{ $t('Result Table') }}
    </v-btn>

    <base-select-period-dialog @select-period="setPeriod" :defaultPeriod="selectedPeriod">
      {{ selectedPeriod ? `Period ${selectedPeriod}` : this.$t('Select Period') }}
    </base-select-period-dialog>
  </v-toolbar>
  <v-row no-gutters>
    <v-col v-for="(semester, index) in semesters" :key="semester" cols="3">
      <v-sheet class="ma-2 pa-2">
        <semester-card
          :title="semester?.title"
          :year="semester.year"
          :semesterId="semester.id"
          :subjects-count="semester.Subjects?.length"
          :period="selectedPeriod"
          :periodCard="true"
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
    selectedPeriod: null,
    downloadLoading: false,
  }),
  components: {
    SemesterCard,
  },
  computed: {
    semesters() {
      return this.$store.getters['semesters/currentPeriodSemesters'];
    },
    selectedPeriodByUser() {
      return this.$store.getters['semesters/selectedPeriod'];
    },
  },
  methods: {
    async downloadReport() {
      this.downloadLoading = true;

      if (!this.selectedPeriod) return false;

      const file = await this.$store.dispatch('semesters/downloadPeriodResultTable', this.selectedPeriod);

      this.downloadFile(file.data, `Period ${this.selectedPeriod} Result Table`);

      // Make it a little stylish ;)
      setTimeout(() => {
        this.downloadLoading = false;
      }, 500);
    },
    async setPeriod(value) {
      this.selectedPeriod = value;
      this.$store.commit('semesters/setSelectedPeriodByUser', value);

      // Also, load it's semesters
      await this.loadSemesters(value);
    },
    async loadSemesters(period) {
      await this.$store.dispatch('semesters/loadSemestersByPeriod', period);
    },
  },
  async created() {
    // Load teachers at app mount
    // Set Default current on-going year on load
    const periods = this.$store.getters['years/years']?.filter((year) => year.period)?.map((p) => p.period);

    // Select the latest period as default
    const period = this.$store.getters['semesters/selectedPeriodByUser'];
    if (!period) {
      this.selectedPeriod = periods[0];
      this.$store.commit('semesters/setSelectedPeriodByUser', this.selectedPeriod);
    }

    if (period) {
      this.selectedPeriod = period;
    }

    // Probably the onGoing year
    await this.loadSemesters(this.selectedPeriod);
  },
};
</script>

<style scoped></style>
