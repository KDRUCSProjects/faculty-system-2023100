<template>
  <v-row>
    <v-col cols="5">
      <v-card class="h-100 theShadow py-0 my-0">
        <v-card-item class="text-center bg-primary">
          <v-card-title class="text-h5">
            <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
              {{ $t(capitalizeFirstLetter(type)) }} {{ $t('form') }}
            </span>
          </v-card-title>
          <v-card-subtitle>{{ $t('For conversion blew instruction is important') }}</v-card-subtitle>
        </v-card-item>

        <v-divider class="mt-3"></v-divider>
        <v-card-item v-if="student">
          <v-list-item class="border pa-4">
            <template v-slot:title>
              <v-list-title>{{ student?.fullName }}</v-list-title>
            </template>
            <template v-slot:subtitle>
              <v-list-item-subtitle> {{ $t('Kankor ID') }} : {{ student?.kankorId }} </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ $t('Semester') }} : {{ rankSemester(studentSemester) || 'Reserved' }}
              </v-list-item-subtitle>
            </template>
            <template v-slot:prepend>
              <v-avatar color="secondary" variant="tonal">
                <v-img v-if="student?.photo" :src="`${imagesResource}/${student?.photo}`" />
                <div v-else>
                  <span class="">{{ buildAbbreviation(student?.fullName) }}</span>
                </div>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn color="primary" variant="text" icon="mdi-open-in-new" @click="viewStudent"></v-btn>
              <v-btn color="error" variant="text" icon="mdi-close-circle" @click="removeStudent"></v-btn>
            </template>
          </v-list-item>
        </v-card-item>
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="statusForm">
            <student-search @selected-student="setStudentId" v-if="!studentId"></student-search>

            <v-row class="mt-1">
              <v-col>
                <v-text-field
                  variant="outlined"
                  :label="$t('Registration Number')"
                  v-model="regNumber"
                  :rules="rules.regNumber"
                  prepend-inner-icon="mdi-numeric"
                ></v-text-field>
              </v-col>
              <v-col>
                <base-autocomplete-year @selected-year="setYear"></base-autocomplete-year>
              </v-col>
            </v-row>

            <v-autocomplete
              v-if="type === 'reentry'"
              :label="$t('Reentry Type')"
              variant="outlined"
              v-model="reentrySelectedType"
              :items="reentryTypes"
            ></v-autocomplete>

            <!-- <v-file-input
              prepend-icon=""
              :label="$t('Form Attachment')"
              clearable
              chips
              counter
              show-size
              variant="outlined"
              prepend-inner-icon="mdi-file-document-outline"
            ></v-file-input> -->

            <v-textarea variant="outlined" :label="$t('Notes')" v-model="notes"></v-textarea>

            <v-checkbox
              v-if="type === 'taajil'"
              v-model="specialTaajil"
              :label="$t('Special Taajil')"
              color="dark"
              :value="true"
            ></v-checkbox>

            <!-- <v-text-field label="Educational Year" v-model="attachment"></v-text-field> -->
            <v-alert v-if="erorrMessage" type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>

            <v-btn type="submit" block color="dark" size="large"> {{ $t('Submit') }} </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="7">
      <router-view>
        <students-data-table
          :students="students"
          :headers="headers"
          :studentsTypeText="$t('Students Type')"
          @status="setType"
          @delete-student-status="deleteStudentStatus"
          :search="search"
          :default-items-per-page="itemsPerPage"
          :dynamic-pagination="true"
          :page-count="pageCount"
          @pagination-number="nextConversionStudents"
          @searched-value="loadSearchedValue"
        ></students-data-table>
      </router-view>
    </v-col>
  </v-row>

  <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
</template>

<script>
import StudentsDataTable from '@/components/students/tables/StudentsDataTable.vue';
import StudentSearch from '@/components/students/search/StudentSearch.vue';
import { rankSemester } from '@/utils/global';
export default {
  components: {
    StudentsDataTable,
    StudentSearch,
  },
  data: () => ({
    page: 1,
    // Default from server/api
    itemsPerPage: 5,
    search: '',
    loading: false,
    type: 'taajil',
    reentrySelectedType: null,
    reentryTypes: ['taajil', 'mahrom', 'special_taajil', 'repeat'],
    specialTaajil: false,
    student: null,
    studentSemester: null,
    studentId: null,
    regNumber: null,
    educationalYear: null,
    errorMessage: null,
  }),
  computed: {
    headers() {
      return [
        {
          title: this.$t('Number'),
          key: 'id',
          sortable: false,
        },
        {
          title: this.$t('Kankor ID'),
          key: 'Student.kankorId',
          sortable: false,
        },
        {
          title: this.$t('Full Name'),
          key: 'Student.fullName',
          sortable: false,
        },
        {
          title: this.$t('Father Name'),
          key: 'Student.fatherName',
          sortable: false,
        },
        {
          title: this.$t('Year'),
          key: 'year',
          sortable: false,
        },
        {
          title: this.$t('Notes'),
          align: 'start',
          sortable: false,
          key: 'notes',
        },
        { title: this.$t('Actions'), key: 'actions', sortable: false },
      ];
    },
    students() {
      return this.$store.getters[`conversion/${this.formType}Students`];
    },
    rules() {
      return {
        // More validations will come later
        studentId: [(v) => !!v || this.$t('Please enter student database Id')],
        educationalYear: [(v) => !!v || this.$t('Please enter educational year name')],
        regNumber: [(v) => !!v || this.$t('Please enter reg number of form')],
        attachment: [
          (value) => {
            return !value || !value.length || value[0].size < 2000000 || this.$t('Photo size should be lesser than 2 MB!');
          },
        ],
      };
    },
    title() {
      return `Student ${this.type} form`;
    },
    formType() {
      if (this.type === 'tabdili') {
        return 'tabdili';
      } else if (this.type === 'reentry') {
        return 'reentries';
      } else if (this.type === 'monfaqi') {
        return 'monfaqi';
      } else {
        return 'taajils';
      }
    },
    pageCount() {
      return this.$store.getters[`conversion/${this.formType}Count`]?.totalPages;
    },
  },
  methods: {
    rankSemester(v) {
      return rankSemester(v, this.appLanguage);
    },
    async submitForm() {
      const { valid } = await this.$refs.statusForm.validate();

      if (!valid) return false;

      if (!this.educationalYear) {
        return this.$store.commit('setToast', [0, this.$t('Please select educational year first')]);
      }

      if (this.type === 'reentry' && !this.reentrySelectedType) {
        return this.$store.commit('setToast', [0, this.$t('Please select re-entry type')]);
      }

      try {
        // Continue submitting the form
        const data = {
          studentId: this.studentId,
          regNumber: this.regNumber,
          educationalYear: parseInt(this.educationalYear),
        };

        // Only, if type was reentry
        if (this.type === 'reentry') data.reason = this.reentrySelectedType;

        // Only, if type was taajil
        if (this.type === 'taajil') {
          data.type = this.specialTaajil ? 'special_taajil' : 'taajil';
        }

        await this.$store.dispatch('conversion/createConversion', {
          type: this.formType,
          data,
        });

        // Reload conversions
        // Reset page
        this.page = 1;
        await this.loadConversionStudents({ type: this.formType, page: this.page, limit: this.itemsPerPage });
      } catch (e) {
        this.errorMessage = e;
      }
    },
    async setStudentId(student) {
      this.student = student;
      this.studentId = student.id;

      const { data } = await this.$store.dispatch('students/loadStudentById', student.id);

      this.studentSemester = data?.latestSemester;
    },
    async nextConversionStudents(page) {
      this.loading = true;
      this.loadConversionStudents({ type: this.formType, page, limit: this.itemsPerPage });
      this.loading = false;
    },
    async loadConversionStudents({ type, page, limit, kankorId }) {
      if (!type) throw 'Set type of conversion';
      await this.$store.dispatch('conversion/loadConversionStudents', {
        type: type,
        page: page,
        limit: limit,
        kankorId,
      });
    },
    async loadSearchedValue(value) {
      await this.loadConversionStudents({ type: this.formType, page: this.page, limit: this.itemsPerPage, kankorId: value });
    },
    removeStudent() {
      this.student = null;
      this.studentId = null;
    },
    viewStudent() {
      const routeData = this.$router.resolve({ name: 'view-student', params: { id: this.student.id } });
      window.open(routeData.href, '_blank');
    },
    async setType(type) {
      this.type = type.toLowerCase();
      // When the type is changed, also reload to default conversion students on page 1
      await this.loadConversionStudents({ type: this.formType, page: this.page, limit: this.itemsPerPage });
    },
    setYear(year) {
      this.educationalYear = year;
    },
    async deleteStudentStatus(data) {
      // Ask for user assurance
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: this.$t('Warning'),
        title: this.$t(`Are you sure you want to delete?`),
        okButton: this.$t('Yes'),
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      let { id } = data;
      await this.$store.dispatch('conversion/deleteConversion', { id, type: this.formType });

      // Reload data
      await this.loadConversionStudents({ type: this.formType, page: this.page, limit: this.itemsPerPage });
    },
  },
  async created() {
    // Load taajil, tabdil and re-entry students
    await this.loadConversionStudents({ type: 'taajils', page: this.page, limit: this.itemsPerPage });
    await this.loadConversionStudents({ type: 'reentries', page: this.page, limit: this.itemsPerPage });
    await this.loadConversionStudents({ type: 'tabdili', page: this.page, limit: this.itemsPerPage });
    await this.loadConversionStudents({ type: 'monfaqi', page: this.page, limit: this.itemsPerPage });
  },
};
</script>

<style lang="scss" scoped></style>
