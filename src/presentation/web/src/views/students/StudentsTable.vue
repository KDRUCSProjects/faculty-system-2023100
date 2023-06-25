<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      :loading="loading"
      loading-text="Loading students please wait"
      class="elevation-0 border-bottom"
      :headers="headers"
      :items="students"
      no-data-text="No students available"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="viewStudent(item)" variant="text" color="primary" size="small" text prepend-icon="mdi-eye">
          View
        </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title> Students Table </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" variant="flat" link to="/students/new"> New Student </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable';

export default {
  components: {
    VDataTable,
  },
  data() {
    return {
      page: 1,
      // Default from server/api
      itemsPerPage: 10,
      loading: false,
      errorMessage: null,
      search: '',
      headers: [
        {
          title: 'No',
          sortable: false,
          key: 'no',
        },
        {
          title: 'Kankor ID',
          align: 'start',
          sortable: true,
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
        {
          title: 'Province',
          align: 'start',
          sortable: true,
          key: 'province',
        },
        {
          title: 'Addition Date',
          align: 'start',
          sortable: true,
          key: 'createdAt',
        },
        { title: 'actions', key: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    students() {
      return this.attachTableNumber(this.$store.getters['students/students'], this.page, this.itemsPerPage);
    },
    pageCount() {
      return this.$store.getters['students/counts']?.totalPages;
    },
  },
  methods: {
    deleteStudent() {},
    editStudent() {},
    viewStudent(item) {
      const { raw } = item;
      this.$router.push({
        name: 'view-student',
        params: {
          id: raw.id,
        },
      });
    },
    async loadStudents(options = { page: this.page, like: '' }) {
      try {
        this.loading = true;
        await this.$store.dispatch('students/loadStudents', options);
      } catch (e) {
        this.errorMessage = e;
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    async page(newValue) {
      await this.loadStudents({ page: newValue });
    },
  },
  async created() {
    await this.loadStudents({ page: 1 });
  },
};
</script>

<style scoped></style>
