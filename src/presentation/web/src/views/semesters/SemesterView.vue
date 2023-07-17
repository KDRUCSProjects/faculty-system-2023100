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
              <v-tab :value="2"> Actions </v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item :value="1">
                <subjects-list :subjects="subjects" @subject-delete="loadSubjects"></subjects-list>
                <add-subject :semester-id="id">
                  <v-btn variant="tonal" color="primary" block :prepend-icon="'mdi-plus'">New Subject</v-btn>
                </add-subject>
              </v-window-item>
              <v-window-item :value="2">
                <v-card>
                  <v-card-item>
                    <v-card-title>Students Promotion</v-card-title>
                    <v-card-subtitle>Migrate students from this semester to next semester</v-card-subtitle>
                  </v-card-item>
                  <v-card-actions>
                    <v-btn variant="flat" color="success" block @click="promoteSemesterStudents"> Promote Students </v-btn>
                  </v-card-actions>
                </v-card>
              </v-window-item>
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
            @delete-student="deleteStudentFromSemester"
            ref="studentsTable"
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
import AddSubject from '@/components/subjects/dialogs/AddSubject.vue';
export default {
  provide() {
    return {
      semesterId: this.id,
      enableStudentsAddition: this.$route.query.semester == 1 ? true : false,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    StudentsTable,
    SubjectsList,
    AddSubject,
  },
  data: () => ({
    tab: 1,
    page: 1,
    itemsPerPage: 8,
    selectedStudentId: null,
    mode: 'semester-students',
    headers: [
      // {
      //   title: 'No',
      //   sortable: false,
      //   key: 'no',
      // },
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
  }),
  computed: {
    students() {
      if (this.mode === 'enrollment') {
        return this.$store.getters['students/students'];
      }
      return this.$store.getters['students/studentsList'];
    },
    subjects() {
      return this.$store.getters['semesters/semesterSubjects'];
    },
    title() {
      return rankSemester(this.$route.query.semester);
    },
    year() {
      return this.$route.query.year;
    },
  },
  methods: {
    async promoteSemesterStudents() {
      // if (this.mode !== 'enrollment') {
      //   return alert('Switch back to semester students');
      // }\

      const students = this.students?.map((student) => student.studentId);

      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to promote these students to next semester?',
        subtitle: `Students Count: ${students?.length}`,
        okButton: 'Yes, I am sure',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      console.log(students);

      await this.$store.dispatch('students/promoteStudents', students);
    },
    async getPageNumber(number) {
      this.page = number;
      // Also, now let's load students
      await this.loadStudents();
    },
    async loadSubjects() {
      await this.$store.dispatch('semesters/loadSemesterById', this.id);
    },
    async setMode(mode) {
      this.mode = mode;

      // Now load relevant mode data
      if (this.mode === 'enrollment') {
        await this.loadStudents(true);
      } else {
        await this.loadStudents();
      }
    },
    async getSelectedStudentId(id) {
      this.selectedStudentId = id;

      await this.addStudentToSemester(this.id, this.selectedStudentId);
    },
    async deleteStudentFromSemester(studentId) {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this student from this semester?',
        subtitle: studentId,
        okButton: 'Yes, continue',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      try {
        await this.$store.dispatch('students/deleteStudentFromSemester', {
          studentId,
          semesterId: this.id,
        });

        // Now lets reload the students
        await this.loadStudents(true);
      } catch (e) {
        this.$store.commit('setToast', [0, e || 'Failed deleting student from semester']);
        // this.errorMessage = e;
      }
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

        // Now, lets toggle back the view and reset the page to number 1
        this.page = 1;
        // Now lets reload the students
        await this.loadStudents(true);
        // And switch back to semester students
        this.$refs.studentsTable.switchMode();
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
