<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-card class="h-100 theShadow">
          <v-card-item class="text-center my-4">
            <v-card-title class="text-h5 font-weight-bold">
              <v-card-title class="text-primary d-inline text-h4">{{ title }}</v-card-title>
              {{ $t('Semester Overview') }}
            </v-card-title>
            <v-card-subtitle>{{ $t('View all the information of this semester') }} </v-card-subtitle>
          </v-card-item>
          <v-card-item class="text-center my-0 py-0">
            <v-chip label color="primary" size="large" class="mr-1">{{ $t('Semester Title') }} : {{ title }}</v-chip>
            <v-chip label color="secondary" size="large">{{ $t('Semester Year') }} : {{ year }}</v-chip>
          </v-card-item>
          <v-divider class="mt-3"></v-divider>
          <v-card-text>
            <v-tabs v-model="tab" fixed-tabs color="light" align-tabs="center" selected-class="bg-teal-lighten-4">
              <v-tab :value="1"> {{ $t('Subjects') }} </v-tab>
              <v-tab :value="2"> {{ $t('Statistics') }} </v-tab>
              <v-tab :value="3"> {{ $t('Migration') }} </v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item :value="1">
                <subjects-list :subjects="subjects" @subject-delete="loadSubjects"></subjects-list>
                <add-subject :semester-id="id">
                  <v-btn variant="tonal" color="primary" block :prepend-icon="'mdi-plus'">{{ $t('New Subject') }}</v-btn>
                </add-subject>
              </v-window-item>
              <v-window-item :value="2">
                <v-card>
                  <v-card-text class="pa-0 mt-10">
                    <div class="h-100 t-3">
                      <base-bars :height="295" :datasets="semesterStatistics" :labels="statisticsLabels"></base-bars>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item :value="3">
                <v-card class="mt-7">
                  <v-card-item>
                    <v-card-title class="text-dark font-weight-bold text-h5">{{ $t('Students Migration') }}</v-card-title>
                  </v-card-item>
                  <v-card-text>
                    <p>
                      {{ $t('Migrate your currently enrolled students in this semester to the upcoming semester. This will not migrate students who has taajil, tabdili or students who has not completed the requires marks for the next semester.') }}
                    </p>

                    <v-alert
                      v-if="!currentSemester?.completed"
                      icon="mdi-alert"
                      variant="outlined"
                      type="warning"
                      class="pa-2 mt-4"
                    >
                      {{ $t('Do this only if your currently semester is finished') }}
                    </v-alert>
                    <v-alert
                      v-if="currentSemester?.completed"
                      icon="mdi-alert"
                      variant="outlined"
                      type="error"
                      class="pa-2 mt-4"
                    >
                      {{ $t('Students have migrated already to next semester') }}
                    </v-alert>
                  </v-card-text>
                  <v-card-actions class="mx-2">
                    <div class="w-100">
                      <migration-review>
                        <v-btn
                          variant="tonal"
                          size="x-large"
                          color="success"
                          prepend-icon="mdi-stairs-up"
                          block
                          :disabled="currentSemester.completed && !forceMigrate"
                        >
                          {{ $t('Start Migration') }}
                        </v-btn>
                      </migration-review>
                    </div>
                  </v-card-actions>
                  <v-card-text class="ma-0 pa-0" v-if="currentSemester?.completed">
                    <v-checkbox :label="$t('Force migrate')" v-model="forceMigrate"></v-checkbox>
                  </v-card-text>
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
import MigrationReview from '@/components/semesters/dialogs/MigrationReview';
import BaseBars from '@/components/ui/charts/BaseBars.vue';
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
    MigrationReview,
    BaseBars,
  },
  data: () => ({
    tab: 1,
    page: 1,
    itemsPerPage: 8,
    selectedStudentId: null,
    forceMigrate: false,
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
      // {
      //   title: 'Kankor Year',
      //   align: 'start',
      //   sortable: true,
      //   key: 'kankorYear',
      // },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    statisticsLabels: ['Total', 'Present', 'Taajil', 'Reentry', 'Monfaq', 'Tabdil'],
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
    currentSemester() {
      return this.$store.getters['semesters/semester'];
    },
    semesterStatistics() {
      // female data are set to null fr now
      const stats = this.$store.getters['semesters/currentSemesterStatistics'];
      console.log(stats.male);

      // Labels are like these: present, taajil, reentry monfaq, tabdili
      let maleData = [
        stats?.male?.total,
        stats?.male?.present,
        stats?.male?.taajil,
        stats?.male?.reentry?.total,
        stats?.male?.monfaq,
        stats?.male?.tabdili,
      ];
      let femaleData = [
        stats?.female?.total,
        stats?.female?.present,
        stats?.female?.taajil,
        stats?.female?.reentry?.total,
        stats?.female?.monfaq,
        stats?.female?.tabdili,
      ];
      return [
        {
          label: this.$t('Male'),
          backgroundColor: '#400D51',
          data: maleData,
        },
        {
          label: this.$t('Female'),
          backgroundColor: '#536DFE',
          data: femaleData,
        },
      ];
    },
  },
  methods: {
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
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure you want to delete this student from this semester?'),
        subtitle: studentId,
        okButton: this.$('Yes, continue'),
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
        this.$store.commit('setToast', [0, e || this.$('Failed deleting student from semester')]);
        // this.errorMessage = e;
      }
    },
    async addStudentToSemester(semesterId, studentId) {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure you want to add this student to this semester?'),
        subtitle: studentId,
        okButton: this.$t('Yes, continue'),
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
