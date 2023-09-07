<template>
  <div>
    <v-overlay scrim="#000"></v-overlay>

    <v-dialog width="80%" transition="slide-y-transition" v-model="dialog">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> {{ $t('Start Migration') }} </v-btn>
          </slot>
        </div>
      </template>

      <v-card class="ma-0 pa-0">
        <v-card-text class="ma-0 pa-0" style="overflow-y: hidden">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card class="theShadow pa-7 bg-dark" style="height: 100vh">
                <v-card-text class="d-flex justify-center align-center" style="height: 100vh">
                  <v-card-item class="text-center mx-auto">
                    <v-card-title class="text-h4 pb-2 text-uppercase font-weight-bold">
                      {{ $t('Welcome to students migration') }}
                    </v-card-title>
                    <v-card-title class="text-h4 pb-2 text-uppercase text-secondary font-weight-bold">{{
                      $t('Overview')
                    }}</v-card-title>
                    <v-card-subtitle class="mt-4">
                      {{ $t('Please review your migration before submitting the process.') }} <br />{{
                        $t('Here you will see which students are eligible for the next semester.')
                      }}<br />
                      {{ $t('Take some time and review all students') }}
                    </v-card-subtitle>
                    <v-btn
                      @click="reviewStudentsEligibility"
                      size="x-large"
                      class="mt-5 px-12"
                      append-icon="mdi-arrow-right-circle"
                      :loading="loading"
                      >{{ $t('Begin Review') }}</v-btn
                    >
                    <br />
                    <v-btn
                      @click="cancelMigration"
                      class="mt-10"
                      text
                      icon="mdi-close"
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                    </v-btn>
                    <!-- 
                <v-alert
                  style="position: absolute; bottom: 75px"
                  icon="mdi-information"
                  variant="outlined"
                  type="info"
                  class="pa-2 mt-4 text-center mx-auto"
                >
                  Do not do migrate students if your new semester hasn't started officialy.
                </v-alert> -->
                  </v-card-item>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item :value="2">
              <v-card class="theShadow pa-5">
                <v-card-text>
                  <v-card-item>
                    <v-card-title class="text-h5 text-uppercase">{{ $t('All Students') }}</v-card-title>
                    <v-card-subtitle>{{
                      $t('Review all the student of this semester and then hit the migrate button')
                    }}</v-card-subtitle>
                  </v-card-item>
                  <v-data-table-virtual
                    :loading="loading"
                    :loading-text="$t('Loading students please wait')"
                    height="500"
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

                    <template v-slot:item.message="{ item }">
                      <div class="text-center">
                        <v-tooltip :text="item.columns.message" location="top">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" icon="mdi-information" color="dark"></v-icon>
                          </template>
                        </v-tooltip>
                      </div>
                    </template>

                    <template v-slot:item.taajil="{ item }">
                      <div class="text-center">
                        <v-icon v-if="!!item.columns.taajil" icon="mdi-check-circle-outline" color="success"></v-icon>
                        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
                      </div>
                    </template>

                    <template v-slot:item.tabdil="{ item }">
                      <div class="text-center">
                        <v-icon v-if="!!item.columns.tabdil" icon="mdi-check-circle-outline" color="success"></v-icon>
                        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
                      </div>
                    </template>

                    <template v-slot:item.mahrom="{ item }">
                      <div class="text-center">
                        <v-icon v-if="!!item.columns.mahrom" icon="mdi-check-circle-outline" color="success"></v-icon>
                        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
                      </div>
                    </template>

                    <template v-slot:item.monfaq="{ item }">
                      <div class="text-center">
                        <v-icon v-if="!!item.columns.monfaq" icon="mdi-check-circle-outline" color="success"></v-icon>
                        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
                      </div>
                    </template>

                    <template v-slot:item.absent="{ item }">
                      <div class="text-center">
                        <v-icon v-if="!!item.columns.absent" icon="mdi-check-circle-outline" color="success"></v-icon>
                        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
                      </div>
                    </template>

                    <template v-slot:item.repeat_semester="{ item }">
                      <div class="text-center">
                        <v-icon
                          v-if="!!item.columns.repeat_semester"
                          icon="mdi-check-circle-outline"
                          color="success"
                        ></v-icon>
                        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" color="dark"></v-icon>
                      </div>
                    </template>

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
                </v-card-text>
                <v-card-actions class="mx-2">
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" color="error" @click="cancelMigration">{{ $t('Cancel') }}</v-btn>
                  <v-btn variant="flat" @click="promoteSemesterStudents" :loading="migrateLoader">{{
                    $t('Proceed with Migration')
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-dialog>

    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </div>
</template>

<script>
import { VDataTableVirtual } from 'vuetify/labs/VDataTable';

export default {
  inject: ['semesterId'],
  data: () => ({
    step: 1,
    loading: false,
    migrateLoader: false,
    dialog: false,
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
      // {
      //   title: 'Kankor Year',
      //   align: 'start',
      //   sortable: true,
      //   key: 'kankorYear',
      // },
      { title: 'Taajil', key: 'taajil', sortable: false },
      { title: 'Tabdil', key: 'tabdil', sortable: false },
      { title: 'Monfaq', key: 'monfaq', sortable: false },
      { title: 'Absent', key: 'absent', sortable: false },
      { title: 'Repeat', key: 'repeat_semester', sortable: false },
      { title: 'Info', key: 'message', sortable: false },
      { title: 'Eligibility', key: 'eligibility', sortable: false },
    ],
  }),
  components: {
    VDataTableVirtual,
  },
  methods: {
    async loadSemesterById() {
      if (!this.semesterId) return false;
      await this.$store.dispatch('semesters/loadSemesterById', this.semesterId);
    },
    async reviewStudentsEligibility() {
      this.loading = true;
      // Proceed to next page
      await this.$store.dispatch('semesters/reviewSemesterStudentsPromotion', this.semesterId);

      // Lets make things a little stylish
      setTimeout(() => {
        this.step = 2;
        this.loading = false;
      }, 600);
    },
    cancelMigration() {
      this.dialog = false;
      this.step = 1;
    },
    async promoteSemesterStudents() {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure you want to continue migration?'),
        okButton: this.$t('Yes, continue'),
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      this.migrateLoader = true;

      await this.$store.dispatch('semesters/promoteStudentsBySemester', this.semesterId);
      this.migrateLoader = false;

      this.cancelMigration();

      // Reload this semester
      await this.loadSemesterById(this.semesterId);
    },
  },
  computed: {
    students() {
      const students = this.$store.getters['semesters/reviewStudents'];
      console.log(students);

      return students;
    },
  },
  async created() {
    await this.loadSemesterById();
  },
};
</script>

<style lang="scss" scoped></style>
