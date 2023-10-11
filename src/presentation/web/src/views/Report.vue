<template>
  <base-contents>
    <v-toolbar color="dark">
      <v-toolbar-title> {{ $t('Semesters') }} </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <!-- Place buttons -->
      <base-menu
        :items="reportItems"
        @selected="setReport"
        display-pre-text="Report - "
        theme="ternary"
        :variant="'flat'"
        :the-default="'present'"
      >
      </base-menu>

      <v-btn
        @click="downloadReport"
        class="float-right mx-1"
        prepend-icon="mdi-download-circle"
        color="indigo"
        variant="elevated"
        download
        :loading="downloadLoading"
      >
        {{ $t('EXCEL FILE') }}
      </v-btn>

      <v-btn
        v-if="showBadlAshaDownload"
        @click="downloadBadlAsha"
        class="float-right"
        prepend-icon="mdi-download-circle"
        color="indigo"
        variant="elevated"
        download
        :loading="downloadBadlAshaLoading"
      >
        {{ $t('Badl Asha') }}
      </v-btn>

      <span class="mx-3">-----</span>

      <base-menu
        :items="semesterItems"
        @selected="setSemesterItem"
        :theDefault="currentSemesterItem"
        display-pre-text="Semester - "
      ></base-menu>

      <base-select-year-dialog @select-year="setYear" :defaultYear="selectedYear" display-pre-text="Semester: ">
        {{ $t('Year') }} {{ selectedYear ? selectedYear : $t('Select') }}
      </base-select-year-dialog>
    </v-toolbar>
    <v-card class="theShadow">
      <v-card-item>
        <v-row class="pa-0 ma-0 d-flex">
          <v-col :cols="showBadlAshaDownload ? '4' : '6'" class="pa-0 ma-0">
            <div class="mx-1"></div>
          </v-col>
          <v-col :cols="showBadlAshaDownload ? '4' : '6'" class="pa-0 ma-0"> </v-col>
          <v-col :cols="showBadlAshaDownload ? '4' : '6'" class="pa-0 ma-0"> </v-col>
        </v-row>
      </v-card-item>
      <v-card-text>
        <students-data-table
          :headers="headersReport"
          :students="reportStudents"
          :no-header="true"
          :show-numbers="true"
          :default-items-per-page="itemsPerPage"
          :search="search"
          :custom-header="true"
        >
          <v-card-text class="pa-0 ma-0">
            <v-row>
              <v-col cols="9">
                <v-text-field
                  density="compact"
                  v-model="search"
                  :placeholder="$t('Search anything...')"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <span style="position: relative; top: 2px; right: 10px">
                  <base-menu
                    :items="genderItems"
                    @selected="setGender"
                    :display-pre-text="'Gender -'"
                    theme="dark"
                    variant="tonal"
                    theDefault="all"
                  ></base-menu>
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </students-data-table>
      </v-card-text>
    </v-card>
  </base-contents>
</template>

<script>
import StudentsDataTable from '@/components/students/tables/StudentsDataTable.vue';
import { rankSemester } from '@/utils/global';

export default {
  components: {
    StudentsDataTable,
  },
  data: () => ({
    id: null,
    selectedYear: null,
    currentSemesterItem: 1,
    page: 1,
    itemsPerPage: 7,
    reportItems: ['present', 'taajil', 'reentry', 'monfaq', 'tabdili'],
    selectedReport: 'present',
    gender: 'all',
    genderItems: ['male', 'female', 'all'],
    search: null,
    downloadLoading: false,
    downloadBadlAshaLoading: false,
    semesterItems: [1, 2, 3, 4, 5, 6, 7, 8],
  }),
  computed: {
    headersReport() {
      return [
        {
          title: this.$t('Photo'),
          key: 'photo',
          sortable: false,
        },
        {
          title: this.$t('Kankor ID'),
          align: 'start',
          key: 'kankorId',
          sortable: false,
        },
        {
          title: this.$t('Full Name'),
          align: 'start',
          sortable: false,
          key: 'fullName',
        },
        {
          title: this.$t('Father Name'),
          align: 'start',
          sortable: false,
          key: 'fatherName',
        },
        {
          title: this.$t('Grand Father Name'),
          align: 'start',
          sortable: false,
          key: 'grandFatherName',
        },
        {
          title: this.$t('Gender'),
          align: 'start',
          sortable: true,
          key: 'gender',
        },
        {
          title: this.$t('Province'),
          align: 'start',
          sortable: true,
          key: 'province',
        },
        {
          title: this.$t('Kankor Type'),
          align: 'start',
          sortable: true,
          key: 'kankorType',
        },
      ];
    },
    showBadlAshaDownload() {
      const semesterTitle = this.currentSemester?.title;

      return semesterTitle % 2 === 0 ? true : false;
    },
    reportStudents() {
      const students = this.$store.getters['semesters/semester']?.statistics?.report;
      if (students) {
        const totalStudents = [...students?.male[this.selectedReport], ...students?.female[this.selectedReport]];
        return totalStudents.filter((s) => {
          if (this.gender == 'all') return s;
          if (this.gender == 'male' && s.gender === 'male') return s;
          if (this.gender == 'female' && s.gender === 'female') return s;
        });
      } else {
        return [];
      }
    },
    currentSemester() {
      return this.$store.getters['semesters/semester'];
    },
  },
  methods: {
    setGender(v) {
      this.gender = v;
    },
    async setSemesterItem(v) {
      this.currentSemesterItem = v;

      const semesters = this.$store.getters['semesters/currentYearSemesters'];
      const semester = semesters.find((semester) => semester.title === v);

      if (semester) {
        this.id = semester.id;
        await this.loadStudents(true, semester?.id);
      }
    },
    async setYear(year) {
      this.selectedYear = year;
      this.$store.commit('semesters/setSelectedYearByUser', year);

      // Also, load it's semesters
      await this.loadSemesters(year);

      //   If year was changed, automatically load its first semester
      await this.setSemesterItem(1);
    },
    async downloadBadlAsha() {
      this.downloadBadlAshaLoading = true;

      let title = this.currentSemester?.title;
      let className = null;
      if (title === 2) className = 1;
      if (title === 4) className = 2;
      if (title === 6) className = 3;
      if (title === 8) className = 4;
      const file = await this.$store.dispatch('semesters/downloadBadlAsha', {
        year: this.selectedYear,
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
      const data = {
        semesterId: this.id,
        type: this.selectedReport,
        gender: this.gender,
      };

      const file = await this.$store.dispatch('semesters/downloadSemesterReportByType', data);

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
    async loadStudents(forceStudentsLoad = false, semesterId) {
      if (forceStudentsLoad) {
        return await this.$store.dispatch('students/loadStudentsListBySemesterId', semesterId);
      }
    },
    semesterName(number) {
      return rankSemester(number);
    },
    viewTeacher() {},
    async loadSemesters(year) {
      await this.$store.dispatch('semesters/loadSemestersByYear', year);
    },
  },
  async created() {
    // Set Default current on-going year on load
    const year = this.$store.getters['years/onGoingYear']?.year;

    // Set default half
    // this.currentHalf = this.$store.getters['years/onGoingYear']?.firstHalf == true ? this.halfs[0] : this.halfs[1];

    const theYear = this.$store.getters['semesters/selectedYearByUser'];
    if (!theYear) {
      this.selectedYear = year;
      this.$store.commit('semesters/setSelectedYearByUser', year);
    }

    if (theYear) {
      this.selectedYear = theYear;
    }

    // Probably the onGoing year
    await this.loadSemesters(this.selectedYear);
    await this.setSemesterItem(1);
  },
};
</script>

<style scoped></style>
