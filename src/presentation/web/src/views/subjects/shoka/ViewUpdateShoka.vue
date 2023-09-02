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
          Download Excel
        </v-btn>
        <div class="float-right d-flex">
          <base-menu :displayPreText="'Chance:'" theme="dark" :items="chanceItems" @selected="setChance"></base-menu>
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

          <template v-slot:item.assignment="{ item }">
            <div class="text-center">
              <base-update-dialog
                :title="'Assignment Marks'"
                @update="updateMarks"
                :fieldLabel="'Marks'"
                :fieldValue="item.columns.assignment"
                :fieldName="'assignment'"
                :rowId="item?.raw?.shokaListId"
                :data="item?.raw"
                :max-value="10"
              >
                <v-btn color="dark" text variant="outlined">
                  {{ item.columns.assignment }}
                </v-btn>
              </base-update-dialog>
            </div>
          </template>

          <template v-slot:item.finalMarks="{ item }">
            <div class="text-center">
              <base-update-dialog
                :title="'Final Marks'"
                @update="updateMarks"
                :fieldLabel="'Marks'"
                :fieldName="'finalMarks'"
                :fieldValue="item.columns.finalMarks"
                :rowId="item?.raw?.shokaListId"
                :data="item?.raw"
                :max-value="60"
              >
                <v-btn color="dark" text variant="outlined">
                  {{ item.columns.finalMarks }}
                </v-btn>
              </base-update-dialog>
            </div>
          </template>

          <template v-slot:item.projectMarks="{ item }">
            <div class="text-center" v-if="item">
              <base-update-dialog
                :title="'Project Marks'"
                @update="updateMarks"
                :fieldLabel="'Marks'"
                :fieldName="'projectMarks'"
                :rowId="item?.raw?.shokaListId"
                :fieldValue="item.columns.projectMarks"
                :data="item?.raw"
                :max-value="20"
              >
                <v-btn color="dark" text variant="outlined">
                  {{ item.columns.projectMarks }}
                </v-btn>
              </base-update-dialog>
            </div>
          </template>

          <template v-slot:item.practicalWork="{ item }">
            <div class="text-center">
              <base-update-dialog
                :title="'Practical Work Marks'"
                @update="updateMarks"
                :fieldLabel="'Marks'"
                :fieldName="'practicalWork'"
                :rowId="item?.raw?.shokaListId"
                :fieldValue="item.columns.practicalWork"
                :data="item?.raw"
                :max-value="10"
              >
                <v-btn color="dark" text variant="outlined">
                  {{ item.columns.practicalWork }}
                </v-btn>
              </base-update-dialog>
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

          <!-- <template v-slot:item.taajil="{ item }">
            <v-icon v-if="!!item.columns.taajil" icon="mdi-check-circle-outline" color="success"></v-icon>
            <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
          </template>

          <template v-slot:item.tabdil="{ item }">
            <v-icon v-if="!!item.columns.tabdil" icon="mdi-check-circle-outline" color="success"></v-icon>
            <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
          </template>

          <template v-slot:item.mahrom="{ item }">
            <v-icon v-if="!!item.columns.mahrom" icon="mdi-check-circle-outline" color="success"></v-icon>
            <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
          </template>

          <template v-slot:item.monfaq="{ item }">
            <v-icon v-if="!!item.columns.monfaq" icon="mdi-check-circle-outline" color="success"></v-icon>
            <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
          </template> -->

          <template v-slot:item.eligibility="{ item }">
            <div class="text-center">
              <v-icon v-if="!!item.columns.eligibility" icon="mdi-check-circle" color="success"></v-icon>
              <v-icon v-else icon="mdi-close-circle" color="error"></v-icon>
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
        <!-- <v-card-actions>
          <v-card-actions class="mx-2">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="error" @click="cancelMigration">Cancel</v-btn>
            <v-btn variant="flat" @click="promoteSemesterStudents" :loading="migrateLoader">Proceed with Migration</v-btn>
          </v-card-actions>
        </v-card-actions> -->
      </v-card-text>
    </v-card>

    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </div>
</template>

<script>
import { VDataTableVirtual } from 'vuetify/labs/VDataTable';

const initialState = () => ({
  chance: 1,
  subject: null,
  downloadLoading: false,
  chanceItems: [1, 2, 3, 4],
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
  },
  data: () => initialState(),
  computed: {
    students() {
      return this.$store.getters['subjects/currentShoka'];
    },
  },
  methods: {
    setChance(value) {
      this.chance = value;
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
    async updateMarks({ field, fieldValue, rowId, data }) {
      if (!data.shokaListId) {
        let res = await this.$refs.baseConfirmDialog.show({
          warningTitle: this.$t('Warning'),
          title: this.$t('You are adding marks of a student that has not been added by the teacher? Continue'),
          okButton: this.$t('Yes'),
        });

        // If closed, return the function
        if (!res) {
          return false;
        }
      }

      const type = data.shokaListId ? 'updateShokaByShokaListId' : 'addStudentMarksToShokaBySubjectId';

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
    },
  },
  watch: {
    async chance() {
      await this.loadShokaBySubject(this.chance);
    },
  },
  async created() {
    this.loadShokaBySubject(this.chance);
  },
};
</script>

<style lang="scss" scoped></style>
