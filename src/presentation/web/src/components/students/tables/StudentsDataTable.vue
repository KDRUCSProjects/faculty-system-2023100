<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      :loading="loading"
      :loading-text="$t('Loading students please wait')"
      :headers="headers"
      :items="theStudents"
      :no-data-text="$t('No students available')"
      hide-default-footer
      :density="density"
      :search="searched"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="error" variant="text" icon="mdi-close-circle" @click="removeStudentStatus(item)"></v-btn>

        <v-btn @click="viewStudent(item)" variant="text" color="secondary" text icon="mdi-location-enter"> </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar color="dark" class="py-2" v-if="!noHeader">
          <v-toolbar-title> {{ statusTypes[type] }} {{ $t('Students') }} </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-text-field
            class="mx-1"
            density="compact"
            color="light"
            variant="outlined"
            v-model="searchedValue"
            :label="$t('Kankor ID')"
            append-inner-icon="mdi-magnify"
            :loading="loading"
            hide-details=""
          ></v-text-field>

          <div class="px-3">
            <base-menu :items="statusTypes" @selected="setSelectedStatus"></base-menu>
          </div>
        </v-toolbar>

        <slot v-if="customHeader">
          <!-- <v-toolbar flat>
            <v-toolbar-title>Expandable Table</v-toolbar-title>
          </v-toolbar> -->
        </slot>
      </template>

      <template v-slot:item.studentId="{ item }">
        <router-link :to="`/students/view/${item.columns.studentId}`">{{ $t('View') }}</router-link>
      </template>

      <template v-slot:item.kankorId="{ item }">
        <v-chip class="" variant="flat">
          {{ item.columns.kankorId }}
        </v-chip>
      </template>

      <template v-slot:item.Student.kankorId="{ item }">
        <v-chip class="" variant="flat">
          {{ item.raw.Student.kankorId }}
        </v-chip>
      </template>

      <template v-slot:item.gender="{ item }">
        {{ $t(item.columns.gender) }}
      </template>

      <template v-slot:item.kankorType="{ item }">
        {{ $t(item.columns.kankorType) }}
      </template>

      <!-- Number Slot -->
      <template v-slot:item.no="{ index }" v-if="showNumbers">
        <v-chip class="" variant="flat">
          {{ index + 1 + (this.page - 1) * this.itemsPerPage }}
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

      <template v-slot:item.Student.photo="{ item }">
        <v-avatar class="my-2" color="primary" variant="tonal">
          <v-img v-if="item.raw?.Student?.photo" :src="`${imagesResource}/${item.raw.Student?.photo}`" alt="user" />
          <div v-else>
            <span>{{ buildAbbreviation(item.raw.Student?.fullName) }}</span>
          </div>
        </v-avatar>
      </template>

      <template v-if="dynamicPagination" v-slot:bottom>
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
  props: {
    search: {
      type: String,
    },
    density: {
      type: String,
      default: 'default',
    },
    headers: {
      type: Array,
      required: true,
    },
    students: {
      type: Array,
    },
    studentsTypeText: {
      type: String,
      default: 'Type',
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    customHeader: {
      type: Boolean,
      default: false,
    },
    showNumbers: {
      type: Boolean,
      default: false,
    },
    defaultItemsPerPage: {
      type: Number,
      default: 8,
    },
    dynamicPagination: {
      type: Boolean,
      default: false,
    },
    dynamicTotalCount: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VDataTable,
  },
  data() {
    return {
      menu: false,
      page: 1,
      // Default from server/api
      itemsPerPage: 8,
      searchedValue: '',
      errorMessage: null,
      statusTypes: ['Taajil', 'Reentry', 'Tabdili', 'monfaqi'],
      type: null,
    };
  },
  computed: {
    theStudents() {
      return this.students;
    },
    searched() {
      return this.search;
    },
  },
  methods: {
    resetSearchedValue() {
      this.searchedValue = null;
    },
    setSelectedStatus(status) {
      // first, reset input field
      this.searchedValue = '';
      this.type = status;
      this.$emit('status', status);
    },
    removeStudentStatus({ raw }) {
      this.$emit('delete-student-status', { id: raw.id, type: this.type });
    },
    selectStudent(item) {
      const { raw } = item;
      this.$emit('selected-student-id', raw.id);
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
    searchedValue(newValue) {
      this.$emit('searched-value', newValue);
    },
  },
  emits: ['selected-student-id', 'view-student', 'delete-student', 'delete-student-status'],
  async created() {
    if (this.defaultItemsPerPage) {
      this.itemsPerPage = this.defaultItemsPerPage;
    }

    this.type = this.statusTypes[0];
  },
};
</script>

<style scoped></style>
