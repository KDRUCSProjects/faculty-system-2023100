<template>
  <base-contents>
    <!-- Appbar Slot -->
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
    </template>
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
  </base-contents>
</template>

<script>
import TeacherCard from '@/components/teachers/TeacherCard.vue';
import AddTeacher from '@/components/teachers/dialogs/AddEditTeacher.vue';
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
