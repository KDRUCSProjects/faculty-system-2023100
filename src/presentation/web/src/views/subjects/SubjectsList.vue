<template>
      <base-contents>
      <!-- Appbar Slot -->
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
      <add-subject  ></add-subject >
    </template>
    <v-row no-gutters>
      <v-col  v-for="i=1 in 8" cols="3">
        <v-sheet class="ma-2 pa-2">
          <subject-card></subject-card>
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

};
  </script>
  
  <style scoped></style>