<template>
  <div>
    <v-card class="theShadow">
      <v-card-item class="mt-4">
        <v-card-title class="text-h5 text-primary text-uppercase font-weight-bold">{{ subject?.name }}</v-card-title>

        <div class="float-right d-flex">
          <!-- Upload and view attachment dialog -->
          <base-attachment-upload @upload-photo="updatePhoto" ref="attachmentUpload"></base-attachment-upload>

          <base-menu
            v-if="month != null"
            :displayPreText="'Month:'"
            theme="dark"
            :items="monthItems"
            :theDefault="month"
            @selected="setMonth"
          ></base-menu>
          <base-menu v-else :displayPreText="'loading'" theme="dark" :items="[]" :theDefault="' '"></base-menu>
        </div>
        <v-card-title class="mt-1">Total Credits: {{ subject?.credit }}</v-card-title>
        <v-card-subtitle class="mt-1">Subject Database ID: {{ subject?.id }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <!-- The Table -->

        <v-data-table-virtual
          :loading="loading"
          loading-text="Loading students please wait"
          :headers="headers"
          :items="students"
        >
          <template v-slot:item.no="{ index }">
            <v-chip class="" variant="tonal">
              {{ index + 1 }}
            </v-chip>
          </template>

          <template v-slot:item.kankorId="{ item }">
            <v-chip class="" variant="flat">
              {{ item.columns.kankorId }}
            </v-chip>
          </template>

          <template v-slot:item.present="{ item }">
            <div class="text-center" :key="item?.columns?.present">
              <base-update-field
                fieldLabel="Count"
                :fieldValue="item.columns.present"
                :fieldName="'present'"
                :rowId="item?.raw?.reportId"
                :data="item?.raw"
                :max-value="31"
                @update="updateMarks"
              >
              </base-update-field>
            </div>
          </template>

          <template v-slot:item.absent="{ item }">
            <div class="text-center" :key="item?.columns?.absent">
              <base-update-field
                fieldLabel="Count"
                :fieldValue="item.columns.absent"
                :fieldName="'absent'"
                :rowId="item?.raw?.reportId"
                :data="item?.raw"
                :max-value="31"
                @update="updateMarks"
              >
              </base-update-field>
            </div>
          </template>

          <template v-slot:item.isMahrom="{ item }">
            <div class="text-center">
              <v-icon v-if="!!item.columns.isMahrom" icon="mdi-check-circle" color="success"></v-icon>
              <v-icon v-else icon="mdi-close-circle" color="dark"></v-icon>
            </div>
          </template>

          <template v-slot:item.totalPresent="{ item }">
            <div class="text-center">
              <v-chip color="success" variant="tonal" v-if="!!!item.columns.isMahrom">
                {{ item.columns.totalPresent }}
              </v-chip>
              <v-chip color="error" variant="tonal" v-if="!!item.columns.isMahrom">
                {{ item.columns.totalPresent }}
              </v-chip>
            </div>
          </template>

          <template v-slot:item.totalAbsent="{ item }">
            <div class="text-center">
              <v-chip color="success" variant="tonal" v-if="!!!item.columns.isMahrom">
                {{ item.columns.totalAbsent }}
              </v-chip>
              <v-chip color="error" variant="tonal" v-if="!!item.columns.isMahrom">
                {{ item.columns.totalAbsent }}
              </v-chip>
            </div>
          </template>

          <template v-slot:item.photo="{ item }">
            <v-avatar class="my-2" color="primary" variant="tonal">
              <v-img v-if="item.columns?.photo" :src="`${imagesResource}/${item.columns?.photo}`" alt="user" />
              <div v-else>
                <span>{{ buildAbbreviation(item.columns?.fullName) }}</span>
              </div>
            </v-avatar>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>

    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </div>
</template>

<script>
import { VDataTableVirtual } from 'vuetify/labs/VDataTable';

import BaseAttachmentUpload from '@/components/ui/dialogs/BaseAttachmentUpload.vue';

const initialState = () => ({
  semester: null,
  month: null,
  renderComponent: true,
  subject: null,
  attachment: null,
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
      sortable: false,
    },
    {
      title: 'Name',
      align: 'start',
      sortable: false,
      key: 'fullName',
    },
    {
      title: 'Father Name',
      align: 'start',
      sortable: false,
      key: 'fatherName',
    },
    {
      title: 'Grand Father Name',
      align: 'start',
      sortable: false,
      key: 'grandFatherName',
    },
    { title: 'Present', key: 'present', sortable: false },
    { title: 'Absent', key: 'absent', sortable: false },
    { title: 'Mahrom', key: 'isMahrom', sortable: false },
    { title: 'Total Present', key: 'totalPresent', sortable: false },
    { title: 'Total Absent', key: 'totalAbsent', sortable: false },

    // { title: 'Success', key: 'eligibility', sortable: false },
  ],
});

export default {
  beforeUnmount() {
    // Reset currentShoka
    this.$store.commit('subjects/setShoka', []);
  },
  props: {
    subjectId: {
      type: Number,
      required: true,
    },
  },
  components: {
    VDataTableVirtual,
    BaseAttachmentUpload,
  },
  data: () => initialState(),
  computed: {
    students() {
      let students = this.$store.getters['subjects/currentAttendance'];

      return students.sort((a, b) => a.fullName.localeCompare(b.fullName));
    },
    monthNames() {
      return ['حمل', 'ثور', 'جوزا', 'سرطان', 'زمری', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلوه', 'حوت'];
    },
    monthItems() {
      let startOfSemester = 0;
      let endOfSemester = 0;

      const semester = this.semester;
      if (!semester) return [];

      const months = [];
      if (semester) {
        startOfSemester = semester.monthStart;
        endOfSemester = semester.monthEnd;
      }

      for (let i = startOfSemester; i <= endOfSemester; i++) {
        months.push(this.monthNames[i]);
      }

      return months;
    },
  },
  methods: {
    async updatePhoto(photo) {
      if (this.attachment?.id) {
        const result = await this.$store.dispatch('subjects/updateAttachment', {
          ['photo']: photo.fieldValue,
          attachmentId: this.attachment.id,
        });

        this.$refs.attachmentUpload.setPhoto(result?.data?.photo);
        return;
      }

      const result = await this.$store.dispatch('subjects/uploadAttachment', {
        ['photo']: photo.fieldValue,
        type: 'attendance',
        // Attach subject id
        attachableId: this.subjectId,
        attribute: this.month || 0,
      });

      this.$refs.attachmentUpload.setPhoto(result?.data?.photo);
    },
    forceRender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.renderComponent = true;
      });
    },
    setMonth(value) {
      this.month = this.monthNames.findIndex((i) => i === value);
      //   this.forceRender();
    },
    async loadAttachment() {
      const data = await this.$store.dispatch('subjects/loadAttachment', {
        type: 'attendance',
        attachableId: this.subjectId,
        attribute: 0,
      });

      this.attachment = data?.data;

      this.$refs.attachmentUpload.setPhoto(data?.data?.photo);
    },
    async loadAttendanceBySubject(month = this.month) {
      if (!this.subjectId) return false;
      // first, load the subject
      const subject = await this.$store.dispatch('subjects/loadSubjectById', this.subjectId);
      this.subject = subject.data;

      await this.$store.dispatch('subjects/loadAttendanceBySubjectId', { subjectId: this.subjectId, month });
    },
    async updateMarks({ field, fieldValue, rowId, data }) {
      const type = data.reportId ? 'updateAttendanceByReportId' : 'addStudentCountToAttendanceBySubjectId';

      await this.$store.dispatch(`subjects/${type}`, {
        month: this.month,
        subjectId: this.subjectId,
        studentId: data.studentId,
        id: rowId,
        counts: {
          [field]: parseInt(fieldValue),
        },
      });

      await this.loadAttendanceBySubject();
    },
  },
  watch: {
    async month() {
      await this.loadAttendanceBySubject(this.month);
    },
  },
  async created() {
    this.loadAttendanceBySubject(this.month);

    // Load subject semester
    const { data: subject } = await this.$store.dispatch('subjects/loadSubjectById', this.subjectId);

    const { data: semester } = await this.$store.dispatch('semesters/loadSemesterById', subject.semesterId);
    this.semester = semester;
    this.month = this.semester.monthStart;

    this.loadAttachment();
  },
};
</script>

<style lang="scss" scoped></style>
