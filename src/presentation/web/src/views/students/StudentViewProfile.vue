<template>
  <div>
    <v-row>
      <v-col cols="4">
        <student-photo :student="student" @upload-photo="updatePhoto">
          <div id="actions" class="ma-4">
            <v-btn variant="flat" block color="dark"> Actions </v-btn>
            <div class="my-1"></div>
            <v-btn variant="flat" block color="red" @click="deleteStudent(student.id)"> Delete </v-btn>
          </div>
        </student-photo>
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
import StudentPhoto from '@/components/students/StudentPhoto.vue';
export default {
  components: {
    StudentDetails,
    StudentPhoto,
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
