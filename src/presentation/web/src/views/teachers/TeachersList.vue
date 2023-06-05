<template>
  <base-contents>
    <v-row no-gutters>
      <v-col v-for="(teacher, index) in teachers" :key="index" cols="3">
        <v-sheet class="ma-2 pa-2">
          <teacher-card :fullName="teacher.name">{{ index }}</teacher-card>
        </v-sheet>
      </v-col>
    </v-row>
  </base-contents>
</template>

<script>
import TeacherCard from '@/components/teachers/TeacherCard.vue';
export default {
  data: () => ({}),
  components: {
    TeacherCard,
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
