<template>
  <v-row>
    <v-col cols="5">
      <v-card class="h-100 theShadow py-0 my-0">
        <v-card-item class="text-center bg-primary">
          <v-card-title class="text-h5"> {{ type }} form </v-card-title>
          <v-card-subtitle>Create student {{ type }} form for student </v-card-subtitle>
        </v-card-item>

        <v-divider class="mt-3"></v-divider>
        <v-card-item v-if="student">
          <v-list-item class="border pa-4">
            <template v-slot:title>
              <v-list-title>{{ student?.fullName }}</v-list-title>
            </template>
            <template v-slot:subtitle>
              <v-list-item-subtitle> Kankor ID: {{ student?.kankorId }} </v-list-item-subtitle>
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
                  label="Registration Number"
                  v-model="regNumber"
                  :rules="rules.regNumber"
                  prepend-inner-icon="mdi-numeric"
                ></v-text-field>
              </v-col>
              <v-col>
                <base-autocomplete-year @selected-year="setYear"></base-autocomplete-year>
              </v-col>
            </v-row>

            <v-file-input
              prepend-icon=""
              label="Form Attachment"
              clearable
              chips
              counter
              show-size
              variant="outlined"
              prepend-inner-icon="mdi-file-document-outline"
            ></v-file-input>

            <v-textarea variant="outlined" label="Notes" v-model="notes"></v-textarea>

            <!-- <v-text-field label="Educational Year" v-model="attachment"></v-text-field> -->
            <v-alert v-if="erorrMessage" type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>

            <v-btn type="submit" block color="dark"> Submit </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="7">
      <router-view>
        <students-data-table
          :students="students"
          :headers="headers"
          studentsTypeText="Students Type"
          @status="setType"
        ></students-data-table>
      </router-view>
    </v-col>
  </v-row>
</template>

<script>
import StudentsDataTable from '@/components/students/tables/StudentsDataTable.vue';
import StudentSearch from '@/components/students/search/StudentSearch.vue';
export default {
  components: {
    StudentsDataTable,
    StudentSearch,
  },
  data: () => ({
    type: 'taajil',
    student: null,
    studentId: null,
    regNumber: null,
    educationalYear: null,
    errorMessage: null,
    headers: [
      {
        title: 'Record ID',
        key: 'id',
        sortable: false,
      },
      {
        title: 'Student ID',
        key: 'studentId',
        sortable: false,
      },
      {
        title: 'Notes',
        align: 'start',
        sortable: true,
        key: 'notes',
      },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
  }),
  computed: {
    students() {
      return this.$store.getters[`conversion/${this.formType}Students`];
    },
    rules() {
      return {
        // More validations will come later
        studentId: [(v) => !!v || 'Please enter student database Id'],
        educationalYear: [(v) => !!v || 'Please enter educational year name'],
        regNumber: [(v) => !!v || 'Please enter reg number of form'],
        attachment: [
          (value) => {
            return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be lesser than 2 MB!';
          },
        ],
      };
    },
    title() {
      return `Student ${this.type} form`;
    },
    formType() {
      if (this.type === 'taajil') {
        return 'taajils';
      } else if (this.type === 'reentry') {
        return 'reentries';
      } else {
        return 'tabdili';
      }
    },
  },
  methods: {
    async submitForm() {
      const { valid } = await this.$refs.statusForm.validate();

      if (!valid) return false;

      if (!this.educationalYear) {
        return this.$store.commit('setToast', [0, 'Please select educational year first']);
      }

      try {
        // Continue submitting the form
        await this.$store.dispatch('conversion/createConversion', {
          type: this.formType,
          data: {
            studentId: this.studentId,
            regNumber: this.regNumber,
            educationalYear: parseInt(this.educationalYear),
          },
        });
      } catch (e) {
        this.errorMessage = e;
      }
    },
    setStudentId(student) {
      this.student = student;
      this.studentId = student.id;
    },
    removeStudent() {
      this.student = null;
      this.studentId = null;
    },
    viewStudent() {
      const routeData = this.$router.resolve({ name: 'view-student', params: { id: this.student.id } });
      window.open(routeData.href, '_blank');
    },
    setType(type) {
      this.type = type;
    },
    setYear(year) {
      this.educationalYear = year;
    },
  },
  async created() {
    // Load taajil, tabdil and re-entry students
    await this.$store.dispatch('conversion/loadConversionStudents', 'taajils');
    await this.$store.dispatch('conversion/loadConversionStudents', 'reentries');
    await this.$store.dispatch('conversion/loadConversionStudents', 'tabdili');
  },
};
</script>

<style lang="scss" scoped></style>
