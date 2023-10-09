<template>
  <div>
    <v-card class="theShadow">
      <v-card-item class="mt-4">
        <v-card-title class="text-h5 text-primary text-uppercase font-weight-bold">{{ subject?.name }}</v-card-title>
        <v-btn
          @click="downloadShoka"
          class="float-right"
          prepend-icon="mdi-download-circle"
          color="primary"
          variant="tonal"
          download
          :loading="downloadLoading"
        >
          {{ $t('Download Excel') }}
        </v-btn>
        <div class="float-right d-flex">
          <base-attachment-upload @upload-photo="updatePhoto" ref="attachmentUpload"></base-attachment-upload>

          <base-menu :displayPreText="'Chance - '" theme="dark" :items="chanceItems" @selected="setChance"></base-menu>
        </div>
        <v-card-title class="mt-1">{{ $t('Total Credits:') }} {{ subject?.credit }}</v-card-title>
        <v-card-subtitle class="mt-1">{{ $t('Subject Database ID:') }} {{ subject?.id }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <!-- The Table -->

        <v-data-table-virtual
          :loading="loading"
          :loading-text="$t('Loading students please wait')"
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

          <template v-slot:item.assignment="{ item }">
            <div class="text-center" :key="item?.columns?.assignment">
              <base-update-field
                fieldLabel="Marks"
                :fieldValue="item.columns.assignment"
                :fieldName="'assignment'"
                :rowId="item?.raw?.shokaListId"
                :data="item?.raw"
                @update="updateMarks"
              >
              </base-update-field>
            </div>
          </template>

          <template v-slot:item.finalMarks="{ item }">
            <div class="text-center" :key="item?.columns?.finalMarks">
              <base-update-field
                fieldLabel="Marks"
                :fieldValue="item.columns.finalMarks"
                :fieldName="'finalMarks'"
                :rowId="item?.raw?.shokaListId"
                :data="item?.raw"
                @update="updateMarks"
              >
              </base-update-field>
            </div>
          </template>

          <template v-slot:item.projectMarks="{ item }">
            <div class="text-center" :key="item?.columns?.projectMarks">
              <base-update-field
                fieldLabel="Marks"
                :fieldValue="item.columns.projectMarks"
                :fieldName="'projectMarks'"
                :rowId="item?.raw?.shokaListId"
                :data="item?.raw"
                @update="updateMarks"
              >
              </base-update-field>
            </div>
          </template>

          <template v-slot:item.practicalWork="{ item }">
            <div class="text-center" :key="item?.columns?.practicalWork">
              <base-update-field
                fieldLabel="Marks"
                :fieldValue="item.columns.practicalWork"
                :fieldName="'practicalWork'"
                :rowId="item?.raw?.shokaListId"
                :data="item?.raw"
                @update="updateMarks"
              >
              </base-update-field>
            </div>
          </template>

          <template v-slot:item.total="{ item }">
            <div class="text-center">
              <v-chip color="success" variant="tonal" v-if="item.columns.total > 54">
                {{ item.columns.total }}
              </v-chip>
              <v-chip color="error" variant="tonal" v-if="item.columns.total < 54">
                {{ item.columns.total }}
              </v-chip>
            </div>
          </template>

          <template v-slot:item.message="{ item }">
            <v-tooltip :text="item.columns.message" location="top">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" icon="mdi-information" color="dark"></v-icon>
              </template>
            </v-tooltip>
          </template>

          <template v-slot:item.eligibility="{ item }">
            <div class="text-center">
              <v-icon v-if="!!item.columns.eligibility" icon="mdi-check-circle" color="success"></v-icon>
              <v-icon v-else icon="mdi-close-circle" color="error"></v-icon>
            </div>
          </template>

          <template v-slot:item.delete="{ item }">
            <v-btn
              v-if="item.raw?.shokaListId"
              variant="text"
              color="error"
              icon="mdi-delete-outline"
              @click="deleteShokaListId(item.raw?.shokaListId)"
            ></v-btn>
            <v-btn v-else variant="text" color="dark" icon="mdi-circle-outline"></v-btn>
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
  chance: 1,
  renderComponent: true,
  subject: null,
  downloadLoading: false,
  chanceItems: [1, 2, 3, 4],
  attachment: null,
  postLoader: false,
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
    { title: 'Assignment', key: 'assignment', sortable: false },
    { title: 'Practical', key: 'practicalWork', sortable: false },
    { title: 'Mid-Exam', key: 'projectMarks', sortable: false },
    { title: 'Final-Exam', key: 'finalMarks', sortable: false },
    { title: 'Total', key: 'total', sortable: false },
    { title: 'Delete', key: 'delete', sortable: false },
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
      let students = this.$store.getters['subjects/currentShoka'];

      return students.sort((a, b) => a.fullName.localeCompare(b.fullName));
    },
  },
  methods: {
    async updatePhoto(photo) {
      // if photo.fieldValue was null, then proceed DELETE
      if (this.attachment?.id && !photo?.fieldValue) {
        // Show confirmation message for delete:

        let res = await this.$refs.baseConfirmDialog.show({
          warningTitle: this.$t('Warning'),
          title: this.$t('Are you sure you want to delete?'),
          okButton: this.$t('Delete'),
        });

        // If closed, return the function
        if (!res) {
          return;
        }

        // Proceed delete
        this.$store.dispatch('subjects/deleteAttachment', this.attachment?.id);

        this.$refs.attachmentUpload.setPhoto(null);
        this.attachment = null;

        return;
      }

      if (this.attachment?.id) {
        const result = await this.$store.dispatch('subjects/updateAttachment', {
          ['photo']: photo.fieldValue,
          attachmentId: this.attachment.id,
        });

        this.attachment = result.data;

        this.$refs.attachmentUpload.setPhoto(result?.data?.photo);
        return;
      }

      // Begin uploading file

      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure? This will lock shoka and you wont be able to bring changes anymore.'),
        okButton: this.$t('Submit'),
      });

      // If closed, return the function
      if (!res) {
        return;
      }
      const result = await this.$store.dispatch('subjects/uploadAttachment', {
        ['photo']: photo.fieldValue,
        type: 'shoka',
        // Attach subject id
        attachableId: this.subjectId,
        attribute: this.chance || 1,
      });

      this.attachment = result.data;

      this.$refs.attachmentUpload.setPhoto(result?.data?.photo);
    },
    forceRender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.renderComponent = true;
      });
    },
    setChance(value) {
      this.chance = value;
      this.forceRender();
    },
    async downloadShoka() {
      this.downloadLoading = true;
      const file = await this.$store.dispatch('subjects/downloadSubjectShokaBySubjectId', {
        subjectId: this.subjectId,
        chance: this.chance,
      });

      this.downloadFile(file.data, 'Shoka');

      // Make it a little stylish ;)
      setTimeout(() => {
        this.downloadLoading = false;
      }, 500);
    },
    async loadShokaBySubject(chance = this.chance) {
      if (!this.subjectId) return false;
      // first, load the subject
      const subject = await this.$store.dispatch('subjects/loadSubjectById', this.subjectId);
      this.subject = subject.data;

      await this.$store.dispatch('subjects/loadShokaBySubjectId', { subjectId: this.subjectId, chance });
    },
    async deleteShokaListId(id) {
      await this.$store.dispatch('subjects/deleteShokaListId', id);
      await this.loadShokaBySubject();
    },
    async updateMarks({ field, fieldValue, rowId, data }) {
      // if (!data.shokaListId) {
      //   let res = await this.$refs.baseConfirmDialog.show({
      //     warningTitle: this.$t('Warning'),
      //     title: this.$t('You are adding marks of a student that has not been added by the teacher? Continue'),
      //     okButton: this.$t('Yes'),
      //   });

      //   // If closed, return the function
      //   if (!res) {
      //     return false;
      //   }
      // }

      const type = data.shokaListId ? 'updateShokaByShokaListId' : 'addStudentMarksToShokaBySubjectId';

      if (type === 'addStudentMarksToShokaBySubjectId') {
        this.postLoader = true;
        // show a loader and disable inputs
      }

      await this.$store.dispatch(`subjects/${type}`, {
        chance: parseInt(this.chance),
        subjectId: this.subjectId,
        studentId: data.studentId,
        shokaListId: rowId,
        marks: {
          [field]: parseInt(fieldValue),
        },
      });

      await this.loadShokaBySubject();
      this.postLoader = false;
    },
    async loadAttachment(chance = 1) {
      const data = await this.$store.dispatch('subjects/loadAttachment', {
        type: 'shoka',
        attachableId: this.subjectId,
        attribute: chance,
      });

      this.attachment = data?.data;

      if (data?.data?.photo) {
        this.$refs.attachmentUpload.setPhoto(data?.data?.photo);
      } else {
        this.$refs.attachmentUpload.setPhoto(null);
        this.attachment = null;
      }
    },
  },
  watch: {
    async chance() {
      await this.loadShokaBySubject(this.chance);

      // Load its attachment
      this.loadAttachment(this.chance);
    },
  },
  async created() {
    this.loadShokaBySubject(this.chance);

    this.loadAttachment();
  },
};
</script>

<style lang="scss" scoped></style>
