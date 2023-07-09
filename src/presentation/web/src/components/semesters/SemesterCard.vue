<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro"> 120 Students </span> -->

    <v-card-title class="pb-0">{{ title }} Semester</v-card-title>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace"> {{ studentsCount }} students </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle class="text-primary">{{ year }} year</v-card-subtitle>

    <v-card-actions class="mt-3 px-2">
      <!-- <v-btn color="primary" variant="elevated">Profile</v-btn> -->
      <v-btn color="primary" block variant="tonal" @click="viewSemester(semesterId)"> View Semester</v-btn>
    </v-card-actions>

    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <!-- Update Dialog -->
  </v-card>
</template>

<script>
export default {
  data: () => ({
    menu: false,
  }),
  props: {
    semesterId: {
      type: Number,
    },
    title: {
      type: String,
    },
    studentsCount: {
      type: Number,
      default: 120,
    },
    year: {
      type: Number,
    },
  },
  methods: {
    viewSemester(semesterId) {
      this.$router.push({
        name: 'view-semester',
        params: {
          id: semesterId,
        },
        query: {
          year: this.year,
          semester: this.title,
        },
      });
    },
  },
};
</script>

<style scoped></style>
