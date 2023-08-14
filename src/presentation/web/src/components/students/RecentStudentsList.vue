<template>
  <div style="min-height: 470px" class="mx-3">
    <v-list>
      <h3 class="font-weight-bold" :class="{ pashtoFont: isPashto }">{{ $t('Recent Students') }}</h3>
      <v-divider class="mt-2"></v-divider>
      <div class="mt-5">
        <v-list-item
          class="pa-0 ma-0"
          v-for="(student, index) in students"
          :key="index"
          :title="student.fullName"
          :subtitle="student.fatherName"
        >
          <template v-slot:prepend>
            <v-avatar class="my-2" color="primary" variant="tonal">
              <v-img v-if="student?.photo" :src="`${imagesResource}/${student?.photo}`" alt="user" />
              <div v-else>
                <span>{{ buildAbbreviation(student?.fullName) }}</span>
              </div>
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn variant="text" @click="viewProfile(student.id)" color="secondary" text icon="mdi-location-enter"> </v-btn>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    students() {
      let limit = 6;
      console.log(this.$store.getters['students/students']);
      const students = this.$store.getters['students/students'];

      return students.splice(0, 7);
    },
  },
  methods: {
    viewProfile(id) {
      this.$router.push(`/students/view/${id}`);
    },
  },
  async created() {
    await this.$store.dispatch('students/loadStudents');
  },
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px dashed var(--v-secondary-lighten5);
  border-color: rgba(0, 0, 0, 0.2);
  margin: 3px !important;
  border-radius: 3px;
  cursor: pointer;
}
</style>
