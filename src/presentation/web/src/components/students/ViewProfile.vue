<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="theShadow py-5 pa-3">
          <span class="pro"> ASSIGNED </span>
          <v-card-item class="text-center mb-1">
            <v-avatar class="my-2" size="160" color="secondary" variant="tonal">
              <v-img :src="`${imagesResource}/16872037529921-1.jpg`" alt="user" />
              <!-- <div v-else>
                <span class="text-h5">{{ abbreviation }}</span>
              </div> -->
            </v-avatar>
            <v-card-title class="font-weight-bold mt-3">{{ fullName }}</v-card-title>
            <v-card-subtitle :class="{ 'text-error': !nickName }">{{ nickName || 'N/A' }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <span class="text-center mx-auto d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <v-chip color="primary" variant="tonal" label class="mx-2">
                  <v-icon start icon="mdi-identifier"></v-icon>
                  Database ID: {{ dbId }}
                </v-chip>
                <v-chip label color="primary" variant="tonal">
                  <v-icon start icon="mdi-card-account-details"></v-icon>
                  Admission Year: {{ admissionYear || 'NA' }}
                </v-chip>
              </div>

              <div class="d-flex my-3">
                <v-chip label color="dark" variant="tonal" class="mx-2">
                  <v-icon start icon="mdi-identifier"></v-icon>
                  Kankor Id: {{ kankorId }}
                </v-chip>
                <v-chip label color="dark" variant="tonal">
                  <v-icon start icon="mdi-calendar-month"></v-icon>
                  Kankor Year: {{ kankorYear || 'NA' }}
                </v-chip>
              </div>
            </span>
          </v-card-text>
          <v-card-title>Actions</v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn variant="flat" color="secondary">Assign to semester </v-btn>
            <v-btn variant="flat" color="error" class="px-6">Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <router-view>
          <personal-data :id="id"></personal-data>
        </router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PersonalData from './PersonalData.vue';
export default {
  components: {
    PersonalData,
  },
  data: () => ({
    fullName: null,
    nickName: null,
    dbId: null,
    kankorId: null,
    admissionYear: null,
    kankorYear: null,
    imageUrl: null,
  }),
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    async setData(studentId) {
      const student = await this.$store.dispatch('students/loadStudentById', studentId);
      if (!student.data) return false;

      this.fullName = student.data.fullName;
      this.nickName = student.data.nickName;
      this.dbId = student.data.id;
      this.kankorId = student.data.kankorId;
      this.admissionYear = student.data.admissionYear;
      this.kankorYear = student.data.EducationalYear;
      this.imageUrl = student.data.imageUrl;
    },
  },
  computed: {},
  async created() {
    await this.setData(this.id);
  },
};
</script>

<style scoped>
.pro {
  color: #231e39;
  background-color: #febb0b;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
