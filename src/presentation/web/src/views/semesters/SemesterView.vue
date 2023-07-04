<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-card class="h-100 theShadow">
          <v-card-item class="text-center my-4">
            <v-card-title class="text-h5 font-weight-bold">
              <v-card-title class="text-primary d-inline text-h4">{{ title }}</v-card-title>
              Semester Overview
            </v-card-title>
            <v-card-subtitle>View all the information of this semester </v-card-subtitle>
          </v-card-item>
          <v-card-item class="text-center my-0 py-0">
            <v-chip label color="primary" size="large" class="mr-1">Semester Title: {{ title }}</v-chip>
            <v-chip label color="secondary" size="large">Semester Year: {{ year }}</v-chip>
          </v-card-item>
          <v-divider class="mt-3"></v-divider>
          <v-card-text>
            <v-tabs v-model="tab" fixed-tabs color="light" align-tabs="center" selected-class="active-tab">
              <v-tab :value="1"> Subjects </v-tab>
              <v-tab :value="2"> Statistics </v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item :value="1">
                <subjects-list :subjects="subjects"></subjects-list>
              </v-window-item>
              <v-window-item :value="2"> later on </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="7">
        <router-view>
          <students-table
            :students="students"
            :headers="headers"
            @mode="setMode"
            @pagination-number="getPageNumber"
            @selected-student-id="getSelectedStudentId"
          ></students-table>
        </router-view>
      </v-col>
    </v-row>

    <!-- Dialogs -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </div>
</template>

<script>
import StudentsTable from '@/components/students/tables/StudentsTable.vue';
import SubjectsList from '@/components/subjects/SubjectsList.vue';
import { rankSemester } from '@/utils/global';
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    StudentsTable,
    SubjectsList,
  },
  data: () => ({
    tab: 1,
    page: 1,
    itemsPerPage: 8,
    selectedStudentId: null,
    mode: 'semester-students',
    headers: [
      {
        title: 'No',
        sortable: false,
        key: 'no',
      },
      {
        title: 'Photo',
        key: 'photo',
        sortable: false,
      },
      {
        title: 'Kankor ID',
        align: 'start',
        key: 'kankorId',
      },
      {
        title: 'Name',
        align: 'start',
        sortable: true,
        key: 'fullName',
      },
      {
        title: 'Father Name',
        align: 'start',
        sortable: true,
        key: 'fatherName',
      },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    subjects: [
      { name: 'Big Data', credits: 4, teacherId: 1 },
      { name: 'Software Engineeing', credits: 4, teacherId: 1 },
      { name: 'Network Engineeing', credits: 4, teacherId: 1 },
      { name: 'Big Data', credits: 4, teacherId: 1 },
      { name: 'Software Engineeing', credits: 4, teacherId: 1 },
      { name: 'Network Engineeing', credits: 4, teacherId: 1 },
    ],
  }),
  computed: {
    students() {
      if (this.mode === 'enrollment') {
        return this.$store.getters['students/students'];
      }
      return this.$store.getters['students/studentsList'];
    },

    title() {
      return rankSemester(this.$route.query.semester);
    },
    year() {
      return this.$route.query.year;
    },
  },
  methods: {
    getPageNumber(number) {
      this.page = number;
      // Also, now let's students
      this.loadStudents();
    },
    setMode(mode) {
      this.mode = mode;
    },
    async getSelectedStudentId(id) {
      this.selectedStudentId = id;

      await this.addStudentToSemester(this.id, this.selectedStudentId);
    },
    async addStudentToSemester(semesterId, studentId) {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to add this student to this semester?',
        subtitle: studentId,
        okButton: 'Yes, continue',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      try {
        await this.$store.dispatch('students/addStudentToSemester', {
          studentId,
          semesterId,
        });
      } catch (e) {
        alert(e);
        // this.errorMessage = e;
      }
    },
    async loadStudents(forceStudentsLoad = false) {
      if (this.mode !== 'enrollment' && forceStudentsLoad) {
        return await this.$store.dispatch('students/loadStudentsListBySemesterId', this.id);
      }
      // Else, the user is trying to load unregistered/reserved students
      try {
        this.loading = true;

        await this.$store.dispatch('students/loadStudents', {
          page: this.page,
          limit: this.itemsPerPage,
          like: '',
        });
      } catch (e) {
        this.errorMessage = e;
      } finally {
        this.loading = false;
      }
    },
    async loadSemesterData() {
      // Load students
      await this.loadStudents();
    },
    semesterName(number) {
      return rankSemester(number);
    },
    viewTeacher() {},
  },
  async created() {
    await this.loadStudents(true);
    await this.loadSemesterData();
  },
};
</script>
<style scoped>
.active-tab {
  background-color: rgb(var(--v-theme-primary));
  border-radius: 0px;
  color: white;
}
</style>
