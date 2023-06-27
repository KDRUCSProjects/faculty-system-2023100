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
    <v-row no-gutters>
      <v-col v-for="(semester, index) in semesters" :key="index" cols="3">
        <v-sheet class="ma-2 pa-2">
          <semester-card :title="semester.title" :year="currentYear" :semesterId="semester.id"> </semester-card>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Dialogs -->
  </base-contents>
</template>

<script>
import SemesterCard from '@/components/semesters/SemesterCard.vue';
export default {
  data: () => ({}),
  components: {
    SemesterCard,
  },
  computed: {
    semesters() {
      return this.$store.getters['semesters/currentYearSemesters'];
    },
    currentYear() {
      return this.$store.getters['semesters/currentYear'];
    },
  },
  methods: {},
  async mounted() {
    // Load teachers at app mount
    await this.$store.dispatch('semesters/loadSemestersByYear', 1401);
  },
};
</script>

<style scoped></style>
