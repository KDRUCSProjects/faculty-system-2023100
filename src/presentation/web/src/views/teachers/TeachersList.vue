<template>
  <v-toolbar color="dark">
    <v-toolbar-title> {{ $t('All Teachers') }} </v-toolbar-title>

    <v-btn color="secondary" :variant="showAssistants ? 'flat' : 'tonal'" @click="toggleAssistants">Assistants</v-btn>
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
          :role="teacher.role"
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
  data: () => ({
    showAssistants: false,
  }),
  components: {
    TeacherCard,
    AddTeacher,
  },
  computed: {
    teachers() {
      if (this.showAssistants) {
        return this.$store.getters['teachers/teachersAndAssistants'];
      }

      return this.$store.getters['teachers/teachers'];
    },
  },
  methods: {
    toggleAssistants() {
      this.showAssistants = !this.showAssistants;
    },
  },
  async mounted() {
    // Load teachers at app mount
    await this.$store.dispatch('teachers/loadTeachers');
  },
};
</script>

<style scoped></style>
