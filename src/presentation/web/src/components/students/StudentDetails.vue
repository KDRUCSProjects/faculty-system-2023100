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

          <v-divider></v-divider>
          <v-list-item v-for="rec in currentPersonalData" :key="rec.title">
            <v-list-item-title :class="{ 'text-error': !rec.title }" class="font-weight-bold" style="font-family: monospace">
              {{ rec.title || 'N/A' }}
            </v-list-item-title>
            <v-list-item-subtitle style="font-size: 13px">{{ rec.subtitle }}</v-list-item-subtitle>
            <template v-slot:prepend>
              <v-avatar color="dark" variant="flat">
                <!-- <v-icon color="white">mdi-account</v-icon> -->
                <span class="h5-text" color="white">{{ buildAbbreviation(rec.subtitle) }}</span>
              </v-avatar>
            </template>

            <template v-slot:append>
              <base-update-dialog
                :title="rec.subtitle"
                @update="updateField"
                :fieldLabel="rec.subtitle"
                :fieldValue="rec.title"
                :fieldName="rec.fieldName"
              >
                <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
              </base-update-dialog>
            </template>
          </v-list-item>
          <v-divider></v-divider>

          <v-chip prepend-icon="mdi-map-marker" label color="secondary" class="px-5 my-1">{{ $t('Location') }}</v-chip>

          <v-list-item v-for="location in locations" :key="location.title">
            <v-list-item-title :class="{ 'text-error': !location.title }">
              {{ location.title || 'N/A' }}
            </v-list-item-title>
            <v-list-item-subtitle style="font-size: 13px">{{ location.subtitle }}</v-list-item-subtitle>

            <template v-slot:prepend>
              <v-avatar color="dark" variant="flat">
                <!-- <v-icon color="white">{{ location.icon }}</v-icon> -->
                <span class="h5-text" color="white">{{ buildAbbreviation(location.subtitle) }}</span>
              </v-avatar>
            </template>

            <template v-slot:append>
              <base-update-dialog
                :title="location.subtitle"
                @update="updateField"
                :fieldLabel="location.subtitle"
                :fieldValue="location.title"
                :fieldName="location.fieldName"
              >
                <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
              </base-update-dialog>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Dialogs -->
  </div>
</template>

<script>
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
      ];
    },
    student() {
      return this.$store.getters['students/currentStudent'];
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
