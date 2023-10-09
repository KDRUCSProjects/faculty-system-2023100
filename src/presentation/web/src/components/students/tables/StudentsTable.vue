<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      :loading="loading"
      :loading-text="$t('Loading students please wait')"
      class="elevation-0 border-bottom"
      :headers="headers"
      :items="theStudents"
      :no-data-text="$t('No students available')"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn v-if="enrollmentMode" @click="selectStudent(item)" variant="text" color="primary" text icon="mdi-plus-thick">
        </v-btn>
        <v-btn v-if="!enrollmentMode" @click="deleteStudent(item)" variant="text" color="red" text icon="mdi-delete-outline">
        </v-btn>
        <v-btn
          v-if="!enrollmentMode"
          @click="viewStudent(item)"
          variant="text"
          color="secondary"
          text
          icon="mdi-location-enter"
        >
        </v-btn>
      </template>

      <template v-slot:top v-if="!hideToolbar">
        <v-toolbar :color="enrollmentMode ? 'dark' : 'primary'">
          <v-toolbar-title>
            {{ enrollmentMode ? $t('Reserved  Students') : $t('Semester Students') }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="cyan" variant="flat" v-bind="props"> Filter </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in studentStatus" :key="index" :value="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->

          <v-btn
            v-if="enableStudentsAddition"
            :color="enrollmentMode ? 'primary' : 'light'"
            class="mx-3"
            variant="flat"
            link
            @click="switchMode"
            :prepend-icon="enrollmentMode ? 'mdi-account-group' : 'mdi-plus-outline'"
          >
            {{ enrollmentMode ? $t('Semester Students') : $t('Student Enrollment') }}
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.kankorId="{ item }">
        <v-chip class="" variant="flat">
          {{ item.columns.kankorId }}
        </v-chip>
      </template>

      <!-- Number Slot -->
      <!-- <template v-slot:item.no="{ index }">
        <v-chip class="" variant="flat">
          {{ index + 1 + (this.page - 1) * this.itemsPerPage }}
        </v-chip>
      </template> -->

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

      <template v-if="enrollmentMode" v-slot:bottom>
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
  inject: ['enableStudentsAddition'],
  props: ['headers', 'students', 'hideToolbar'],
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
      enrollmentMode: false,
    };
  },
  computed: {
    theStudents() {
      return this.students;
    },
    pageCount() {
      return this.$store.getters['students/counts']?.totalPages;
    },
  },
  methods: {
    selectStudent(item) {
      const { raw } = item;
      this.$emit('selected-student-id', raw.id);
    },
    switchMode() {
      this.enrollmentMode = !this.enrollmentMode;
      if (this.enrollmentMode) {
        this.$emit('mode', 'enrollment');
      } else {
        this.$emit('mode', 'semester-students');
      }
    },
    deleteStudent(item) {
      const { raw } = item;

      this.$emit('delete-student', raw.studentId);
    },
    editStudent() {},
    viewStudent(item) {
      const { raw } = item;

      // first, let's emit what the component is doing.
      this.$emit('view-student', raw.studentId);
      this.$router.push({
        name: 'view-student',
        params: {
          id: raw.studentId,
        },
      });
    },
  },
  watch: {
    page(newValue) {
      this.$emit('pagination-number', newValue);
    },
    itemsPerPage(newValue) {
      this.$emit('items-per-page', newValue);
    },
  },
  emits: ['mode', 'selected-student-id', 'view-student', 'delete-student'],
  async created() {},
};
</script>

<style scoped></style>
