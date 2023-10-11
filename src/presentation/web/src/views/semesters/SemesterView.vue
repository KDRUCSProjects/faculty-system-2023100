<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-card class="h-100 theShadow">
          <v-card-item class="text-center my-4">
            <v-card-title class="text-h5 font-weight-bold" :class="{ pashtoFont: $i18n.locale === 'pa' }">
              <h3 class="text-primary d-inline text-h4" :class="{ pashtoFont: $i18n.locale === 'pa' }">
                <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
                  {{ title }}
                </span>
              </h3>
              <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
                {{ ' ' + $t('Semester Overview') }}
              </span>
            </v-card-title>
            <v-card-subtitle>{{ $t('View all the information of this semester') }} </v-card-subtitle>
          </v-card-item>
          <v-card-item class="text-center my-0 py-0">
            <!-- <v-chip label color="primary" size="large" class="mr-1">{{ $t('Semester Title') }} : {{ title }}</v-chip> -->
            <v-chip class="mx-2" label color="dark">
              <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
                {{ $t('Start Year') }} : {{ returnYear(currentSemester?.title, 0) }}
              </span>
            </v-chip>
            <v-chip label color="dark">{{ $t('End Year') }} : {{ returnYear(currentSemester?.title, 1) }}</v-chip>
          </v-card-item>
          <v-divider class="mt-3"></v-divider>
          <v-card-text>
            <v-tabs
              v-model="tab"
              fixed-tabs
              color="light"
              align-tabs="center"
              center-active=""
              selected-class="bg-teal-lighten-4"
            >
              <v-tab :value="1"> {{ $t('Subjects') }} </v-tab>
              <v-tab :value="2"> {{ $t('Statistics') }} </v-tab>
              <!-- <v-tab :value="3"> {{ $t('Report') }} </v-tab> -->
              <v-tab :value="4"> {{ $t('Migration') }} </v-tab>
              <v-tab :value="5"> {{ $t('Attendance') }} </v-tab>
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

              <!-- <v-window-item :value="3">
                <v-card class="mt-3">
                  <v-card-item>
                    <v-row class="pa-0 ma-0 d-flex">
                      <v-col :cols="showBadlAshaDownload ? '4' : '6'" class="pa-0 ma-0">
                        <div class="mx-1">
                          <base-menu
                            :items="reportItems"
                            @selected="setReport"
                            :block="true"
                            display-pre-text="Type:   "
                            theme="dark"
                            :variant="'tonal'"
                            :the-default="'present'"
                          >
                          </base-menu>
                        </div>
                      </v-col>
                      <v-col :cols="showBadlAshaDownload ? '4' : '6'" class="pa-0 ma-0">
                        <v-btn
                          @click="downloadReport"
                          class="float-right mx-1"
                          prepend-icon="mdi-download-circle"
                          color="primary"
                          variant="tonal"
                          download
                          block="true"
                          :loading="downloadLoading"
                        >
                          EXCEL FILE
                        </v-btn>
                      </v-col>
                      <v-col :cols="showBadlAshaDownload ? '4' : '6'" class="pa-0 ma-0">
                        <v-btn
                          v-if="showBadlAshaDownload"
                          @click="downloadBadlAsha"
                          class="float-right"
                          prepend-icon="mdi-download-circle"
                          color="teal"
                          variant="tonal"
                          download
                          block="true"
                          :loading="downloadBadlAshaLoading"
                        >
                          Badl Asha
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-item>
                  <v-card-text>
                    <students-data-table
                      :headers="headersReport"
                      :students="reportStudents"
                      :no-header="true"
                      :show-numbers="true"
                      :default-items-per-page="4"
                    ></students-data-table>
                  </v-card-text>
                  <v-card-actions class="mx-2"> </v-card-actions>
                </v-card>
              </v-window-item> -->
              <v-window-item :value="4">
                <v-card class="mt-7">
                  <v-card-item>
                    <v-card-title class="text-dark font-weight-bold text-h5">
                      <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
                        {{ $t('Students Migration') }}
                      </span>
                    </v-card-title>
                  </v-card-item>
                  <v-card-text>
                    <p>
                      {{
                        $t(
                          'Migrate your currently enrolled students in this semester to the upcoming semester. This will not migrate students who has taajil, tabdili or students who has not completed the requires marks for the next semester.'
                        )
                      }}
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
              <v-window-item :value="5">
                <v-card class="mt-7">
                  <v-card-item>
                    <v-card-title class="text-dark font-weight-bold text-h5">
                      <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
                        {{ $t('Attendance') }}
                      </span>
                    </v-card-title>
                  </v-card-item>
                  <v-card-text class="my-0 py-0">
                    <p>
                      {{ $t('setSemesterAttendanceInfo') }}
                    </p>

                    <v-form @submit.prevent="submitSemesterDuration" ref="semesterDurationForm">
                      <!-- <v-range-slider
                        class="mt-12 mb-3"
                        :ticks="months"
                        :model-value="[semesterStart, semesterEnd]"
                        min="1"
                        max="12"
                        :step="1"
                        show-ticks="always"
                        thumb-label="always"
                        tick-size="5"
                      >
                        <template v-slot:thumb-label="{ modelValue }">
                          <v-item-title class="pashtoFont"> {{ monthNames[modelValue - 1] }}</v-item-title>
                        </template>
                      </v-range-slider> -->

                      <v-row class="pa-0 ma-0">
                        <v-col cols="6">
                          <v-select
                            variant="outlined"
                            :label="$t('Semester Start')"
                            :items="monthNames"
                            v-model="semesterStart"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-select :label="$t('Semester End')" :items="monthNames" variant="outlined" v-model="semesterEnd">
                          </v-select>
                        </v-col>
                      </v-row>

                      <v-row class="pa-0 ma-0">
                        <v-col cols="6">
                          <v-text-field
                            :label="$t('Total Duration (Weeks)')"
                            variant="outlined"
                            prepend-inner-icon="mdi-clock-time-eight-outline"
                            v-model="totalWeeks"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            :label="$t('Attendance Percentage')"
                            variant="outlined"
                            prepend-inner-icon="mdi-list-status"
                            v-model="attendancePercentage"
                            append-inner-icon="mdi-percent"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-btn variant="tonal" type="submit" size="large" color="primary" block>
                        {{ $t('Update Attendance') }}
                      </v-btn>
                    </v-form>
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
import StudentsDataTable from '@/components/students/tables/StudentsDataTable.vue';
import SubjectsList from '@/components/subjects/SubjectsList.vue';
import { rankSemester } from '@/utils/global';
import AddSubject from '@/components/subjects/dialogs/AddSubject.vue';
import MigrationReview from '@/components/semesters/dialogs/MigrationReview';
import BaseBars from '@/components/ui/charts/BaseBars.vue';

export default {
  provide() {
    return {
      semesterId: this.id,
      enableStudentsAddition: this.enableSemesterAddition,
      showBadlAshaDownload: this.showBadlAshaDownload,
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
    StudentsDataTable,
  },
  data: () => ({
    monthNames: ['حمل', 'ثور', 'جوزا', 'سرطان', 'زمری', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلوه', 'حوت'],
    months: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    semesterStart: 0,
    semesterEnd: 3,
    totalWeeks: 16,
    attendancePercentage: 25,
    tab: 1,
    page: 1,
    itemsPerPage: 8,
    reportItems: ['present', 'taajil', 'reentry', 'monfaq', 'tabdili'],
    selectedReport: 'present',
    selectedStudentId: null,
    forceMigrate: false,
    mode: 'semester-students',
    downloadLoading: false,
    downloadBadlAshaLoading: false,
    yearData: null,
  }),
  computed: {
    statisticsLabels() {
      return [
        this.$t('Total'),
        this.$t('Present'),
        this.$t('Taajil'),
        this.$t('Reentry'),
        this.$t('Monfaqi'),
        this.$t('Tabdili'),
      ];
    },
    headersReport() {
      return [
        // {
        //   title: 'No',
        //   sortable: false,
        //   key: 'no',
        // },
        {
          title: this.$t('Kankor ID'),
          align: 'start',
          key: 'kankorId',
        },
        {
          title: this.$t('Full Name'),
          align: 'start',
          sortable: true,
          key: 'fullName',
        },
        {
          title: this.$t('Father Name'),
          align: 'start',
          sortable: true,
          key: 'fatherName',
        },
      ];
    },
    headers() {
      return [
        // {
        //   title: 'No',
        //   sortable: false,
        //   key: 'no',
        // },
        {
          title: this.$t('Photo'),
          key: 'photo',
          sortable: false,
        },
        {
          title: this.$t('Kankor ID'),
          align: 'start',
          key: 'kankorId',
        },
        {
          title: this.$t('Full Name'),
          align: 'start',
          sortable: true,
          key: 'fullName',
        },
        {
          title: this.$t('Father Name'),
          align: 'start',
          sortable: true,
          key: 'fatherName',
        },

        { title: this.$t('Actions'), key: 'actions', sortable: false },
      ];
    },
    enableSemesterAddition() {
      const semesterTitle = this.$route.query.semester == 1 || this.$route.query.semester == 5 ? true : false;

      // const currentYearSemesters = this.$store.getters['semesters/currentYearSemesters'];

      // let semesterIsFromCurrentYearSemester = false;

      // const currentSemesterYearId =  this.$store.dispatch('semester/loadSemesterById', this.id);

      return semesterTitle;
    },
    showBadlAshaDownload() {
      const semesterTitle = this.$route.query.semester;

      return semesterTitle % 2 === 0 ? true : false;
    },
    students() {
      if (this.mode === 'enrollment') {
        let students = this.$store.getters['students/students'];
        // Return 1st semester if 1st semester

        let semesterTitle = this.$route.query.semester;
        students = students?.filter((s) => {
          if (semesterTitle == 1 && s.kankorType === 'general') {
            return s;
          } else if (semesterTitle == 5 && s.kankorType === 'pass14') {
            return s;
          }
        });

        return students;
      }
      return this.$store.getters['students/studentsList'];
    },
    reportStudents() {
      const students = this.$store.getters['semesters/semester']?.statistics?.report;
      const totalStudents = [...students?.male[this.selectedReport], ...students?.female[this.selectedReport]];
      return totalStudents;
    },
    subjects() {
      return this.$store.getters['semesters/semesterSubjects'];
    },
    title() {
      return rankSemester(this.$route.query.semester, this.appLanguage);
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
    async submitSemesterDuration() {
      const { valid } = await this.$refs.semesterDurationForm.validate();

      if (!valid) return false;

      const start = this.monthNames.findIndex((item) => item === this.semesterStart);
      const end = this.monthNames.findIndex((item) => item === this.semesterEnd);

      if (!start && !end) {
        return this.$store.commit('setToast', [0, 'Please set start and end of the semester']);
      }

      const data = {
        totalWeeks: this.totalWeeks,
        attendancePercentage: this.attendancePercentage,
        monthStart: start,
        monthEnd: end,
        semesterId: this.id,
      };

      await this.$store.dispatch('semesters/updateDuration', data);
    },
    async downloadBadlAsha() {
      this.downloadBadlAshaLoading = true;

      let title = this.currentSemester.title;
      let className = null;
      if (title === 2) className = 1;
      if (title === 4) className = 2;
      if (title === 6) className = 3;
      if (title === 8) className = 4;
      const file = await this.$store.dispatch('semesters/downloadBadlAsha', {
        year: this.year,
        classTitle: className,
      });

      this.downloadFile(file.data, `Class ${className} ${this.year} - BadlAsha List`);

      // Make it a little stylish ;)
      setTimeout(() => {
        this.downloadBadlAshaLoading = false;
      }, 500);
    },
    async downloadReport() {
      this.downloadLoading = true;
      const file = await this.$store.dispatch('semesters/downloadSemesterReportByType', {
        semesterId: this.id,
        type: this.selectedReport,
      });

      this.downloadFile(file.data, `${this.selectedReport} List`);

      // Make it a little stylish ;)
      setTimeout(() => {
        this.downloadLoading = false;
      }, 500);
    },
    setReport(value) {
      this.selectedReport = value;
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
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure you want to delete this student from this semester?'),
        subtitle: studentId,
        okButton: this.$t('Yes, continue'),
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
      return rankSemester(number, this.appLanguage);
    },
    viewTeacher() {},
    async setSemesterData(semesterId) {
      const { data } = await this.$store.dispatch('semesters/loadSemesterById', semesterId);

      this.semesterStart = this.monthNames[data?.monthStart];
      this.semesterEnd = this.monthNames[data?.monthEnd];
      this.attendancePercentage = data?.attendancePercentage;
      this.totalWeeks = data?.totalWeeks;

      // Semester start and end
      const theYear = this.$store.getters['years/yearById'](data.educationalYearId);
      this.yearData = theYear;
    },
    returnYear(title, shift) {
      if (shift === 0) {
        return title % 2 !== 0 ? this.yearData?.firstHalfStart : this.yearData?.SecondHalfStart;
      } else {
        return title % 2 !== 0 ? this.yearData?.firstHalfEnd : this.yearData?.SecondHalfEnd;
      }
    },
  },
  async created() {
    await this.loadStudents(true);
    await this.loadSemesterData();

    await this.setSemesterData(this.id);
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
