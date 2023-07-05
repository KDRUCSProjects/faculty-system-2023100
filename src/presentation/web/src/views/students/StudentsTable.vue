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
        <v-btn @click="viewStudent(item)" variant="text" color="primary" text icon="mdi-location-enter"> </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar color="dark">
          <v-toolbar-title> Students Table </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-text-field
            style="position: relative; top: 10px; right: 10px"
            density="compact"
            color="light"
            variant="outlined"
            v-model="search"
            label="Kankor ID"
            append-inner-icon="mdi-magnify"
            @click:append-inner="findStudent"
            :loading="loading"
          ></v-text-field>

          <!-- Status Filter menu -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="cyan" variant="flat" v-bind="props"> Status </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in studentStatus" :key="index" :value="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn color="primary" class="ml-1" variant="flat" link to="/students/new"> New Student </v-btn>
        </v-toolbar>
      </template>

      <!-- <template v-slot:headers></template> -->

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

      <template v-slot:item.status="{ item }">
        <v-chip color="red">
          {{ item.columns.status }}
        </v-chip>
      </template>

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
        {
          title: 'Status',
          sortable: false,
          key: 'status',
        },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      studentStatus: ['reserve', 'present', 'taajil', 'tabdili', 'graduate'],
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
    async loadStudents(options = { page: this.page, limit: this.itemsPerPage, like: '' }) {
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
      await this.loadStudents({ page: newValue, limit: this.itemsPerPage, like: this.search });
    },
  },
  async created() {
    await this.loadStudents({ page: 1, limit: this.itemsPerPage });
  },
};
</script>

<style scoped></style>
