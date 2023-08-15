<template>
  <div>
    <v-row>
      <v-col cols="4">
        <student-photo :student="student" @upload-photo="updatePhoto">
          <div id="actions" class="ma-4">
            <v-btn
              @click="downloadTranscript"
              class="float-right mb-1"
              prepend-icon="mdi-download-circle-outline"
              color="primary"
              variant="flat"
              block
              download
              :loading="downloadLoading"
            >
              Transcript
            </v-btn>
            <div class="my-1"></div>
            <v-btn variant="flat" prepend-icon="mdi-delete-outline" block color="red" @click="deleteStudent(student.id)">
              {{ $t('Delete') }}
            </v-btn>
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
  beforeUnmount() {
    this.$store.commit('students/setStudent', null);
  },
  components: {
    StudentDetails,
    StudentPhoto,
  },
  data: () => ({
    initLoader: false,
    photo: null,
    downloadLoading: false,
  }),
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    async downloadTranscript() {
      this.downloadLoading = true;
      const file = await this.$store.dispatch('students/downloadTranscript', this.id);

      this.downloadFile(file.data, 'Transcripts - Numeric Table');

      // Make it a little stylish ;)
      setTimeout(() => {
        this.downloadLoading = false;
      }, 500);
    },
    async updatePhoto(photo) {
      await this.$store.dispatch('students/updateStudent', { ['photo']: photo.fieldValue, studentId: this.id });
    },
    async loadStudent(studentId) {
      await this.$store.dispatch('students/loadStudentById', studentId);
    },
    async deleteStudent(studentId) {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure you want to delete this student?'),
        subtitle: this.student?.fullName,
        okButton: this.$t('Yes'),
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      await this.$store.dispatch('students/deleteStudentById', studentId);
      // Let's redirect(replace) the user to /students
      this.$router.replace('/students/all');
    },
  },
  computed: {
    student() {
      return this.$store.getters['students/currentStudent'];
    },
  },
  async created() {
    this.loadInitialData(this, async () => {
      await this.loadStudent(this.id);
    });
  },
};
</script>
