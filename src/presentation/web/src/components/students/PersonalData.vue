<template>
  <div>
    <v-card class="theShadow pa-1">
      <v-card-item>
        <v-card-title class="font-weight-bold text-dark text-uppercase">Biography</v-card-title>
        <v-card-subtitle>Student all personal information </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-list lines="two">
          <!-- <v-list-subheader>Personal</v-list-subheader> -->
          <v-chip prepend-icon="mdi-account" label color="primary" class="px-5 my-1">Personal</v-chip>

          <v-divider></v-divider>
          <v-list-item v-for="rec in personal" :key="rec.title">
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
              <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-chip prepend-icon="mdi-map-marker" label color="secondary" class="px-5 my-1">Location</v-chip>

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
              <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
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
    personalData: {
      fullName: null,
      nickName: null,
      fatherName: null,
      grandFatherName: null,
    },
    personalDataSecondary: {
      fullName: null,
      nickName: null,
      fatherName: null,
      grandFatherName: null,
    },
    locationsData: {
      province: null,
      division: null,
      district: null,
    },
  }),
  computed: {
    personal() {
      return [
        {
          subtitle: 'Full Name',
          title: this.personalData.fullName,
        },
        {
          subtitle: 'Last Name',
          title: this.personalData.nickName,
        },
        {
          subtitle: 'Father Name',
          title: this.personalData.fatherName,
        },
        {
          subtitle: 'Grand Father Name',
          title: this.personalData.grandFatherName,
        },
      ];
    },
    personalSecondary() {
      return [
        {
          subtitle: 'Fullname',
          title: this.personalDataSecondary.fullName,
        },
        {
          subtitle: 'Last Name',
          title: this.personalDataSecondary.nickName,
        },
        {
          subtitle: 'Father Name',
          title: this.personalDataSecondary.fatherName,
        },
        {
          subtitle: 'Grand Father Name',
          title: this.personalDataSecondary.grandFatherName,
        },
      ];
    },
    locations() {
      return [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Province',
          title: this.locationsData.province,
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Division',
          title: this.locationsData.division,
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'District',
          title: this.locationsData.district,
        },
      ];
    },
  },
  methods: {
    async setData(studentId) {
      const student = await this.$store.dispatch('students/loadStudentById', studentId);
      if (!student.data) return false;

      // Set Personal Data
      this.personalData.fullName = student.data.fullName;
      this.personalData.nickName = student.data.nickName;
      this.personalData.fatherName = student.data.fatherName;
      this.personalData.grandFatherName = student.data.grandFatherName;

      // Set Personal Secondary Data
      this.personalDataSecondary.name = student.data.engName;
      this.personalDataSecondary.lastName = student.data.lastName;
      this.personalDataSecondary.fatherName = student.data.engFatherName;
      this.personalDataSecondary.lastName = student.data.engGrandFatherName;

      // Set Location Data
      this.locationsData.province = student.data.province;
      this.locationsData.division = student.data.division;
      this.locationsData.district = student.data.district;
    },
  },
  async created() {
    await this.setData(this.id);
  },
};
</script>

<style lang="scss" scoped></style>
