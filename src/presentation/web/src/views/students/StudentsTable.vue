<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      :loading="loading"
      :loading-text="$t('Loading students please wait')"
      class="elevation-0 border-bottom"
      :headers="headers"
      :items="students"
      :no-data-text="$t('No students available')"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="viewStudent(item)" variant="text" color="primary" text icon="mdi-location-enter"> </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar color="dark">
          <v-toolbar-title> {{ $t('Students') }} </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-text-field
            style="position: relative; top: 10px"
            class="mx-2"
            density="compact"
            color="light"
            variant="outlined"
            v-model="search"
            :label="$t('Kankor ID')"
            append-inner-icon="mdi-magnify"
            @click:append-inner="findStudent"
            :loading="loading"
          ></v-text-field>

          <!-- Status Filter menu -->
          <base-menu
            :items="studentStatus"
            display-pre-text="TYPE - "
            theme="cyan"
            @selected="setStudentsStatus"
          ></base-menu>

          <v-btn color="primary" class="ml-1" variant="flat" link to="/students/new"> {{ $t('New Student') }} </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>

      <template v-slot:item.kankorId="{ item }">
        <v-chip class="" variant="flat">
          {{ item.columns.kankorId }}
        </v-chip>
      </template>

      <template v-slot:item.gender="{ item }">
        <div v-if="item.columns.gender">
          {{ $t(item.columns?.gender) }}
        </div>
      </template>

      <template v-slot:item.kankorType="{ item }">
        <div v-if="item.columns.kankorType">
          {{ $t(item.columns?.kankorType) }}
        </div>
      </template>

      <!-- <template v-slot:item.status="{ item }">
        <v-chip color="primary">
          {{ selectedStatus }}
        </v-chip>
      </template> -->

      <template v-slot:item.photo="{ item }">
        <v-avatar class="my-2" color="primary" variant="tonal">
          <v-img v-if="item.columns?.photo" :src="`${imagesResource}/${item.columns?.photo}`" alt="user" />
          <div v-else>
            <span>{{ buildAbbreviation(item.columns?.fullName) }}</span>
          </div>
        </v-avatar>
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
      menu: false,
      selectedStatus: false,
      page: 1,
      // Default from server/api
      itemsPerPage: 10,
      loading: false,
      errorMessage: null,
      search: '',
      headers: [
        {
          title: this.$t('Number'),
          sortable: false,
          key: 'no',
        },
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
          title: this.$t('Addition Date'),
          align: 'start',
          sortable: true,
          key: 'createdAt',
        },
        {
          title: this.$t('Actions'),
          key: 'actions',
          sortable: false,
        },
      ],
      studentStatus: ['all', 'reserved'],
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
    async setStudentsStatus(status) {
      this.selectedStatus = status;
      this.loadStudents({ page: 1, limit: this.itemsPerPage, status });
    },
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
    async loadStudents(options = { page: this.page, limit: this.itemsPerPage, like: this.search }) {
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
      await this.loadStudents({ page: newValue, limit: this.itemsPerPage, like: this.search, status: this.selectedStatus });
    },
    async search(newValue) {
      await this.loadStudents({ page: 1, limit: this.itemsPerPage, like: newValue, status: this.selectedStatus });
    },
  },
  async created() {
    await this.loadStudents({ page: 1, limit: this.itemsPerPage });
  },
};
</script>

<style scoped></style>
