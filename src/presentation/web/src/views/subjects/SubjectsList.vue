<template>
  <base-contents>
    <!-- AppBar Slot -->
    <template v-slot:bar>
      <v-text-field
        clearable=""
        density="compact"
        variant="outlined"
        label="Find subject by name"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
      <div class="mx-1"></div>
      <add-subject></add-subject>
    </template>
    <v-row no-gutters>
      <v-col v-for="(subject, index) in subjects" :key="index" cols="3">
        <v-sheet class="ma-2 pa-2">
          <subject-card
            :subjectName="subject.name"
            :semesterTitle="subject.semesterTitle"
            :teacherName="subject.teacherName"
            :subjectId="subject.id"
            :subjectCredit="subject.credit"
          ></subject-card>
        </v-sheet>
      </v-col>
    </v-row>
  </base-contents>
</template>

<script>
import SubjectCard from '@/components/subjects/SubjectCard.vue';
import AddSubject from '@/components/subjects/dialogs/AddSubject.vue';
export default {
  data: () => ({}),
  components: {
    SubjectCard,
    AddSubject,
  },
  computed: {
    subjects() {
      return this.$store.getters['subjects/subjects'];
    },
  },
  methods: {},
  async mounted() {
    // Load subjects at app mount
    await this.$store.dispatch('subjects/loadSubjects');
  },
};
</script>

<style scoped></style>
