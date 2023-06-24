<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="theShadow py-5 pa-3">
          <span class="pro"> ASSIGNED </span>
          <v-card-item class="text-center mb-1">
            <v-avatar class="my-2" size="160" color="secondary" variant="tonal">
              <v-img v-if="student?.imageUrl" :src="`${imagesResource}/${student?.imageUrl}`" alt="user" />
              <div v-else>
                <span class="text-h5">{{ buildAbbreviation(student?.fullName) }}</span>
              </div>
            </v-avatar>
            <v-card-title class="font-weight-bold mt-3">{{ student?.fullName }}</v-card-title>
            <v-card-subtitle :class="{ 'text-error': !student?.nickName }">{{ student?.nickName || 'N/A' }}</v-card-subtitle>

            <base-update-dialog :photo="true" title="Change Photo" @update="updatePhoto">
              <v-btn color="primary" variant="flat" size="small">Update Photo</v-btn>
            </base-update-dialog>
          </v-card-item>
          <v-card-text class="my-8">
            <span class="text-center mx-auto d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <v-chip color="primary" variant="tonal" label class="mx-2">
                  <v-icon start icon="mdi-identifier"></v-icon>
                  Database ID: {{ student?.id }}
                </v-chip>
                <v-chip label color="primary" variant="tonal">
                  <v-icon start icon="mdi-card-account-details"></v-icon>
                  Admission Year: {{ student?.admissionYear || 'NA' }}
                </v-chip>
              </div>

              <div class="d-flex my-3">
                <v-chip label color="dark" variant="tonal" class="mx-2">
                  <v-icon start icon="mdi-identifier"></v-icon>
                  Kankor Id: {{ student?.kankorId }}
                </v-chip>
                <v-chip label color="dark" variant="tonal">
                  <v-icon start icon="mdi-calendar-month"></v-icon>
                  Kankor Year: {{ student?.admissionYear || 'NA' }}
                </v-chip>
              </div>
            </span>
          </v-card-text>
          <v-card-title>Actions</v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn variant="flat" color="secondary">Assign to semester </v-btn>
            <v-btn variant="flat" color="error" class="px-6" @click="deleteStudent(student.id)">Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <router-view>
          <student-details :id="id"></student-details>
        </router-view>
      </v-col>
    </v-row>

    <!-- Dialogs -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </div>
</template>

<script>
import StudentDetails from '@/components/students/StudentDetails.vue';
export default {
  components: {
    StudentDetails,
  },
  data: () => ({
    photo: null,
  }),
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    async updatePhoto(photo) {
      console.log(photo);
      await this.$store.dispatch('students/updateStudent', { ['photo']: photo.fieldValue, studentId: this.id });
    },
    async loadStudent(studentId) {
      await this.$store.dispatch('students/loadStudentById', studentId);
    },
    async deleteStudent(studentId) {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this student?',
        subtitle: this.student?.fullName,
        okButton: 'Yes',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      await this.$store.dispatch('students/deleteStudentById', studentId);
      // Let's redirect(replace) the user to /students
      this.$router.replace('/students');
    },
  },
  computed: {
    student() {
      return this.$store.getters['students/currentStudent'];
    },
  },
  async created() {
    await this.loadStudent(this.id);
  },
};
</script>

<style scoped>
.pro {
  color: #231e39;
  background-color: #febb0b;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
