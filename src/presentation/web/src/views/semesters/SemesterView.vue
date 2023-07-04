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
          <students-table :students="students" :headers="headers"></students-table>
        </router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StudentsTable from '@/components/students/tables/StudentsTable.vue';
import SubjectsList from '@/components/subjects/SubjectsList.vue';
import { rankSemester } from '@/utils/global';
import AddStudentSemester from '@/components/students/dialogs/AddStudentSemester.vue';
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
    AddStudentSemester,
  },
  data: () => ({
    tab: 1,
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
    async loadStudents() {
      await this.$store.dispatch('students/loadStudentsListBySemesterId', this.id);
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
    await this.loadSemesterData();

    console.log(this.$route.query, this.$route.params);
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
