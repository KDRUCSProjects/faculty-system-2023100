<template>
  <div>
    <v-dialog>
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> Start Migration </v-btn>
          </slot>
        </div>
      </template>

      <v-card class="theShadow">
        <v-card-item>
          <v-card-title>Welcome to students migration</v-card-title>
          <v-card-subtitle>Please preview your migration before submitting the process</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <students-table
            :students="students"
            :headers="headers"
            @mode="setMode"
            @selected-student-id="getSelectedStudentId"
            @delete-student="deleteStudentFromSemester"
            ref="studentsTable"
          ></students-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StudentsTable from '@/components/students/tables/StudentsTable.vue';
export default {
  props: ['semesterId'],
  data: () => ({
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
  }),
  components: {
    StudentsTable,
  },
  methods: {
    async loadSemesterById() {
      if (!this.semesterId) return false;
      await this.$store.dispatch('semesters/loadSemesterById', this.semesterId);
    },
  },
  computed: {
    students() {
      return this.$store.getters['students/studentsList'];
    },
  },
  async created() {
    await this.loadSemesterById();
  },
};
</script>

<style lang="scss" scoped></style>
