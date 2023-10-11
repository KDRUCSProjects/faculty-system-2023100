<template>
  <div>
    <v-card class="theShadow pa-1">
      <v-card-item>
        <v-card-title class="font-weight-bold text-dark text-uppercase">{{ $t('Biography') }}</v-card-title>
        <v-card-subtitle>{{ $t('Student all personal information') }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-list lines="two">
          <!-- <v-list-subheader>Personal</v-list-subheader> -->
          <v-chip
            prepend-icon="mdi-account"
            label
            color="primary"
            class="px-5 my-1"
            :variant="showSecondaryLanguage ? 'outlined' : 'tonal'"
            @click="toggleView('personal')"
          >
            {{ $t('Personal') }}
          </v-chip>
          <v-chip
            prepend-icon="mdi-account"
            label
            color="indigo"
            :variant="showSecondaryLanguage ? 'tonal' : 'outlined'"
            class="px-5 my-1 mx-1"
            @click="toggleView('secondaryPersonal')"
          >
            {{ $t('Secondary Language') }}
          </v-chip>

          <!-- Personal Info -->
          <v-divider></v-divider>
          <v-list-item v-for="rec in currentPersonalData" :key="rec.title" class="border ma-1">
            <v-list-item-title :class="{ 'text-error': !rec.title }" class="font-weight-bold">
              {{ rec.title || 'N/A' }}
            </v-list-item-title>
            <v-list-item-subtitle style="font-size: 13px">{{ rec.subtitle }}</v-list-item-subtitle>
            <!-- <template v-slot:prepend>
              <v-avatar color="dark" variant="flat">
                <span class="h5-text" color="white">{{ buildAbbreviation(rec.subtitle) }}</span>
              </v-avatar>
            </template> -->

            <template v-slot:append>
              <base-update-dialog
                :title="rec.subtitle"
                @update="updateField"
                :fieldLabel="rec.subtitle"
                :fieldValue="rec.title"
                :fieldName="rec.fieldName"
                :type="rec.type"
                :validValues="rec.validValues"
              >
                <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
              </base-update-dialog>
            </template>
          </v-list-item>

          <!-- locations info -->
          <div v-if="!showSecondaryLanguage">
            <div class="my-1"></div>
            <v-chip prepend-icon="mdi-map-marker" label color="secondary" class="px-5 my-1">{{ $t('Location') }}</v-chip>

            <v-list-item v-for="location in locations" :key="location.title" class="border ma-1">
              <v-list-item-title :class="{ 'text-error': !location.title }">
                {{ location.title || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>
              <!-- 
              <template v-slot:prepend>
                <v-avatar color="dark" variant="flat">
                  <span class="h5-text" color="white">{{ buildAbbreviation(location.subtitle) }}</span>
                </v-avatar>
              </template> -->

              <template v-slot:append>
                <base-update-dialog
                  :title="location.subtitle"
                  @update="updateField"
                  :fieldLabel="location.subtitle"
                  :fieldValue="location.title"
                  :fieldName="location.fieldName"
                  :type="location.type"
                  :validValues="location.validValues"
                >
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </base-update-dialog>
              </template>
            </v-list-item>
          </div>

          <div v-if="!showSecondaryLanguage">
            <!-- Kankor Info -->

            <v-chip prepend-icon="mdi-card-account-details" label color="dark" class="px-5 my-1">
              {{ $t('Kankor') }}
            </v-chip>

            <v-list-item v-for="location in kankorInfo" :key="location.title" class="border ma-1">
              <v-list-item-title :class="{ 'text-error': !location.title }">
                {{ location.title || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>

              <!-- <template v-slot:prepend>
                <v-avatar color="dark" variant="flat">
                  <span class="h5-text" color="white">{{ buildAbbreviation(location.subtitle) }}</span>
                </v-avatar>
              </template> -->

              <template v-slot:append>
                <base-update-dialog
                  :title="location.subtitle"
                  @update="updateField"
                  :fieldLabel="location.subtitle"
                  :fieldValue="location.title"
                  :fieldName="location.fieldName"
                  :type="location.type"
                  :validValues="location.validValues"
                >
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </base-update-dialog>
              </template>
            </v-list-item>
          </div>

          <div v-if="!showSecondaryLanguage">
            <!-- School Info -->

            <v-chip prepend-icon="mdi-school" label color="dark" class="px-5 my-1">{{ $t('School') }}</v-chip>

            <v-list-item v-for="location in schoolInfo" :key="location.title" class="border ma-1">
              <v-list-item-title :class="{ 'text-error': !location.title }">
                {{ location.title || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>

              <template v-slot:append>
                <base-update-dialog
                  :title="location.subtitle"
                  @update="updateField"
                  :fieldLabel="location.subtitle"
                  :fieldValue="location.title"
                  :fieldName="location.fieldName"
                  :type="location.type"
                  :validValues="location.validValues"
                >
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </base-update-dialog>
              </template>
            </v-list-item>
          </div>

          <div v-if="!showSecondaryLanguage">
            <!-- Monograph Info -->

            <v-chip prepend-icon="mdi-book-open-variant" label color="dark" class="px-5 my-1">{{ $t('Monograph') }}</v-chip>

            <v-list-item v-for="location in monographInfo" :key="location.title" class="border ma-1">
              <v-list-item-title :class="{ 'text-error': !location.title }">
                {{ location.title || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>

              <template v-slot:append>
                <base-update-dialog
                  :title="location.subtitle"
                  @update="updateField"
                  :fieldLabel="location.subtitle"
                  :fieldValue="location.title"
                  :fieldName="location.fieldName"
                  :type="location.type"
                  :validValues="location.validValues"
                >
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </base-update-dialog>
              </template>
            </v-list-item>
          </div>

          <div v-if="!showSecondaryLanguage">
            <!-- Semester Info -->

            <v-chip prepend-icon="mdi-google-classroom" label color="dark" class="px-5 my-1">{{
              $t('Semester Info')
            }}</v-chip>

            <v-list-item v-for="location in semesterInfo" :key="location.title" class="border ma-1">
              <v-list-item-title :class="{ 'text-error': !location.title }">
                {{ location.title || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>

              <template v-slot:append>
                <base-update-dialog
                  :title="location.subtitle"
                  @update="updateField"
                  :fieldLabel="location.subtitle"
                  :fieldValue="location.title"
                  :fieldName="location.fieldName"
                  :type="location.type"
                  :validValues="location.validValues"
                >
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </base-update-dialog>
              </template>
            </v-list-item>
          </div>

          <div v-if="!showSecondaryLanguage">
            <!-- Semester Info -->

            <v-chip prepend-icon="mdi-table-large" label color="dark" class="px-5 my-1">{{ $t('Results Table') }}</v-chip>

            <v-list-item v-for="location in resultsTableInfo" :key="location.title" class="border ma-1">
              <v-list-item-title :class="{ 'text-error': !location.title }">
                {{ location.title || 'N/A' }}
              </v-list-item-title>
              <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>

              <template v-slot:append>
                <base-update-dialog
                  :title="location.subtitle"
                  @update="updateField"
                  :fieldLabel="location.subtitle"
                  :fieldValue="location.title"
                  :fieldName="location.fieldName"
                  :type="location.type"
                  :validValues="location.validValues"
                >
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </base-update-dialog>
              </template>
            </v-list-item>
          </div>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Dialogs -->
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    id: {
      type: String,
    },
  },
  data: () => ({
    fullName: null,
    nickName: null,
    fatherName: null,
    grandFatherName: null,
    engFullName: null,
    engNickName: null,
    engFatherName: null,
    engGrandFatherName: null,
    province: null,
    division: null,
    district: null,
    showSecondaryLanguage: false,
  }),
  computed: {
    personal() {
      return [
        {
          subtitle: this.$t('Full Name'),
          title: this.student?.fullName,
          fieldName: 'fullName',
        },
        {
          subtitle: this.$t('Last Name'),
          title: this.student?.nickName,
          fieldName: 'nickName',
        },
        {
          subtitle: this.$t('Father Name'),
          title: this.student?.fatherName,
          fieldName: 'fatherName',
        },
        {
          subtitle: this.$t('Grand Father Name'),
          title: this.student?.grandFatherName,
          fieldName: 'grandFatherName',
        },
        {
          subtitle: this.$t('Gender'),
          title: this.student?.gender,
          fieldName: 'gender',
          type: 'autocomplete',
          validValues: ['male', 'female'],
        },
        {
          subtitle: this.$t('Phone Number'),
          title: this.student?.phoneNumber,
          fieldName: 'phoneNumber',
        },
        {
          subtitle: this.$t('Tazkera Number'),
          title: this.student?.tazkeraNumber,
          fieldName: 'tazkeraNumber',
        },
        // {
        //   subtitle: this.$t('Birth Date'),
        //   title: this.student?.dob,
        //   fieldName: 'dob',
        //   type: 'dob',
        // },
      ];
    },
    personalSecondary() {
      return [
        {
          subtitle: this.$t('Full Name'),
          title: this.student?.engName,
          fieldName: 'engName',
        },
        {
          subtitle: this.$t('Last Name'),
          title: this.student?.engLastName,
          fieldName: 'engLastName',
        },
        {
          subtitle: this.$t('Father Name'),
          title: this.student?.engFatherName,
          fieldName: 'engFatherName',
        },
        {
          subtitle: this.$t('Grand Father Name'),
          title: this.student?.engGrandFatherName,
          fieldName: 'engGrandFatherName',
        },
        {
          subtitle: this.$t('Birth City'),
          title: this.student?.birthCityEnglish,
          fieldName: 'birthCityEnglish',
        },
        {
          subtitle: this.$t('Birth Country'),
          title: this.student?.birthCountryEnglish,
          fieldName: 'birthCountryEnglish',
        },
        {
          subtitle: this.$t('Birth Date'),
          title: this.student?.engDob,
          fieldName: 'engDob',
          type: 'date',
        },
      ];
    },
    locations() {
      return [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: this.$t('Province'),
          title: this.student?.province,
          fieldName: 'province',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: this.$t('Division'),
          title: this.student?.division,
          fieldName: 'division',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: this.$t('District'),
          title: this.student?.district,
          fieldName: 'district',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: this.$t('Birth City'),
          title: this.student?.birthCity,
          fieldName: 'birthCity',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: this.$t('Birth Country'),
          title: this.student?.birthCountry,
          fieldName: 'birthCountry',
        },
      ];
    },
    kankorInfo() {
      return [
        {
          color: 'blue',
          subtitle: this.$t('KankorId'),
          title: this.student?.kankorId,
          fieldName: 'kankorId',
        },
        {
          color: 'amber',
          subtitle: this.$t('KankorMarks'),
          title: this.student?.kankorMarks,
          fieldName: 'kankorMarks',
        },
        {
          color: 'amber',
          subtitle: this.$t('KankorYear'),
          title: this.student?.admissionYear,
          fieldName: 'admissionYear',
        },
        {
          color: 'amber',
          subtitle: this.$t('Faculty ID'),
          title: this.student?.csId,
          fieldName: 'csId',
        },
      ];
    },
    schoolInfo() {
      return [
        {
          color: 'blue',
          subtitle: this.$t('School Name'),
          title: this.student?.schoolName,
          fieldName: 'schoolName',
        },
        {
          color: 'amber',
          subtitle: this.$t('Graduation Year'),
          title: this.student?.schoolGraduationYear,
          fieldName: 'schoolGraduationYear',
        },
      ];
    },
    monographInfo() {
      return [
        {
          color: 'blue',
          subtitle: this.$t('Research Title'),
          title: this.student?.monographTitle,
          fieldName: 'monographTitle',
        },
        {
          color: 'amber',
          subtitle: this.$t('Research Defense Date'),
          title: this.student?.monographDefenseDate,
          fieldName: 'monographDefenseDate',
        },
      ];
    },
    semesterInfo() {
      return [
        {
          color: 'blue',
          subtitle: this.$t('Repeat Semester Year'),
          title: this.student?.repeatSemesterYear,
          fieldName: 'repeatSemesterYear',
        },
        {
          color: 'amber',
          subtitle: this.$t('Mahrom Semester Year'),
          title: this.student?.mahromSemesterYear,
          fieldName: 'mahromSemesterYear',
        },
      ];
    },
    resultsTableInfo() {
      return [
        {
          color: 'amber',
          subtitle: this.$t('Page Number'),
          title: this.student?.resultsTableNumber,
          fieldName: 'resultsTableNumber',
        },
      ];
    },
    student() {
      const data = this.$store.getters['students/currentStudent'];

      if (data?.dob) {
        data.dob = moment(data?.dob).format('YYYY-MM-DD');
      }

      if (data?.engDob) {
        data.engDob = moment(data?.engDob).format('YYYY-MM-DD');
      }
      return data;
    },
    currentPersonalData() {
      return !this.showSecondaryLanguage ? this.personal : this.personalSecondary;
    },
  },
  methods: {
    toggleView(view) {
      view === 'personal' ? (this.showSecondaryLanguage = false) : (this.showSecondaryLanguage = true);
    },
    async loadStudent(studentId) {
      // This is duplicate, and will be removed in the future.
      await this.$store.dispatch('students/loadStudentById', studentId);
    },
    async updateField({ field, fieldValue }) {
      await this.$store.dispatch('students/updateStudent', { [field]: fieldValue, studentId: this.id });
    },
  },
  async created() {
    await this.loadStudent(this.id);
  },
};
</script>

<style lang="scss" scoped></style>
