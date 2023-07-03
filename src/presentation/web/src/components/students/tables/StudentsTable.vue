<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      :loading="loading"
      loading-text="Loading students please wait"
      class="elevation-0 border-bottom"
      :headers="headers"
      :items="theStudents"
      no-data-text="No students available"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="deleteStudent(item)" variant="text" color="red" text icon="mdi-delete-outline"> </v-btn>
        <v-btn @click="viewStudent(item)" variant="text" color="primary" text icon="mdi-location-enter"> </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar color="primary">
          <v-toolbar-title> Semester Students </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="cyan" variant="flat" v-bind="props"> Filter </v-btn>
            </template>
            <!-- <v-list>
              <v-list-item v-for="(item, index) in studentStatus" :key="index" :value="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list> -->
          </v-menu>

          <v-btn color="light" class="ml-1" variant="flat" link to="/students/new" prepend-icon="mdi-plus-outline">
            Student Enrollment
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.kankorId="{ item }">
        <v-chip class="" variant="flat">
          {{ item.columns.kankorId }}
        </v-chip>
      </template>

      <!-- <template v-slot:item.status="{ item }">
        <v-chip color="red">
          {{ item.columns.status }}
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
  props: ['headers', 'students'],
  components: {
    VDataTable,
  },
  data() {
    return {
      menu: false,
      page: 1,
      // Default from server/api
      itemsPerPage: 8,
      loading: false,
      errorMessage: null,
      search: '',
    };
  },
  computed: {
    theStudents() {
      return this.attachTableNumber(this.students, this.page, this.itemsPerPage);
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
          id: raw.studentId,
        },
      });
    },
  },
  watch: {},
  async created() {},
};
</script>

<style scoped></style>
