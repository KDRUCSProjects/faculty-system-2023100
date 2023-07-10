<template>
  <v-row>
    <v-col cols="5">
      <v-card class="h-100 theShadow">
        <v-card-item class="text-center my-4">
          <v-card-title class="text-h5 font-weight-bold">
            <v-card-title class="text-primary d-inline text-h4">{{ title }}</v-card-title>
            Student Taajil Form
          </v-card-title>
          <v-card-subtitle>Create taajil form for student </v-card-subtitle>
        </v-card-item>

        <v-divider class="mt-3"></v-divider>
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="statusForm">
            <v-text-field label="Enter Student ID" v-model="studentId" :rules="rules.studentId"></v-text-field>
            <v-text-field label="Form Reg Number" v-model="regNumber" :rules="rules.regNumber"></v-text-field>
            <!-- <v-text-field label="Notes" v-model="notes"></v-text-field> -->
            <v-text-field label="Educational Year" v-model="educationalYear" :rules="rules.educationalYear"></v-text-field>
            <!-- <v-text-field label="Educational Year" v-model="attachment"></v-text-field> -->
            <v-btn type="submit"> Submit</v-btn>
            <v-alert v-if="erorrMessage" type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="7">
      <router-view>
        <students-data-table :students="students" :headers="headers"></students-data-table>
      </router-view>
    </v-col>
  </v-row>
</template>

<script>
import StudentsDataTable from '@/components/students/tables/StudentsDataTable.vue';
export default {
  components: {
    StudentsDataTable,
  },
  data: () => ({
    type: 'taajil',
    studentId: null,
    regNumber: null,
    educationalYear: null,
    errorMessage: null,
    headers: [
      // {
      //   title: 'No',
      //   sortable: false,
      //   key: 'no',
      // },
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
      return this.$store.getters['conversion/taajilStudents'];
    },
    rules() {
      return {
        // More validations will come later
        studentId: [(v) => !!v || 'Please enter student database Id'],
        educationalYear: [(v) => !!v || 'Please enter educational year name'],
        regNumber: [(v) => !!v || 'Please enter reg number of form'],
      };
    },
  },
  methods: {
    async submitForm() {
      const { valid } = await this.$refs.statusForm.validate();

      if (!valid) return false;

      try {
        // Continue submitting the form
        await this.$store.dispatch('conversion/createTaajil', {
          studentId: this.studentId,
          regNumber: this.regNumber,
          educationalYear: this.educationalYear,
        });
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
  async created() {
    // Load taajil, tabdil and re-entry students
    await this.$store.dispatch('conversion/loadTaajilStudents');
  },
};
</script>

<style lang="scss" scoped></style>
