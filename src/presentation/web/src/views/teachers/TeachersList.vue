<template>
  <v-toolbar color="dark">
    <v-toolbar-title> All Teachers </v-toolbar-title>
    <v-divider inset vertical></v-divider>
    <v-spacer></v-spacer>

    <div class="mx-4">
      <add-teacher></add-teacher>
    </div>
  </v-toolbar>
  <v-row no-gutters>
    <v-col v-for="(teacher, index) in teachers" :key="index" cols="3">
      <v-sheet class="ma-2 pa-2">
        <teacher-card
          :fullName="teacher.name"
          :email="teacher.email"
          :lastName="teacher.lastName"
          :teacherId="teacher.id"
          :photo="teacher.photo"
        >
        </teacher-card>
      </v-sheet>
    </v-col>
  </v-row>

  <!-- Dialogs -->
</template>

<script>
import TeacherCard from '@/components/teachers/TeacherCard.vue';
import AddTeacher from '@/components/teachers/dialogs/AddTeacher.vue';
export default {
  data: () => ({}),
  components: {
    TeacherCard,
    AddTeacher,
  },
  computed: {
    teachers() {
      return this.$store.getters['teachers/teachers'];
    },
  },
  methods: {},
  async mounted() {
    // Load teachers at app mount
    await this.$store.dispatch('teachers/loadTeachers');
  },
};
</script>

<style scoped></style>
