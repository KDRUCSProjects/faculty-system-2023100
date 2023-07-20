<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="theShadow maxHeight">
          <base-photo-uploader @photo="setPhoto"></base-photo-uploader>
          <v-card-item class="text-center">
            <v-card-title class="text-h5">{{ profilePhotoTitle }}</v-card-title>
            <v-card-subtitle class="my-1">{{ profilePhotoSubtitle }}</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="theShadow pa-1">
          <v-card-item>
            <v-card-title class="font-weight-bold text-dark text-uppercase">Biography</v-card-title>
            <v-card-subtitle>Student all personal information </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-form @submit.prevent="submitForm" ref="studentRegForm">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-chip prepend-icon="mdi-note-multiple-outline" label color="light" variant="flat" class="px-5 my-1 mb-3">
                    Kankor Information
                  </v-chip>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        variant="outlined"
                        label="Kankor ID"
                        placeholder="M27004984"
                        v-model="kankorId"
                        :rules="rules.kankorId"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        variant="outlined"
                        label="Kankor Year"
                        v-model.number="educationalYear"
                        placeholder="1402"
                        :rules="rules.educationalYear"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-chip prepend-icon="mdi-account" label color="secondary" variant="flat" class="px-5 my-1 mb-3">
                    Personal Information
                  </v-chip>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        variant="outlined"
                        label="Full Name"
                        v-model="fullName"
                        :rules="rules.fullName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        variant="outlined"
                        label="Last Name"
                        v-model="lastName"
                        :rules="rules.lastName"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    variant="outlined"
                    label="Father Name"
                    v-model="fatherName"
                    :rules="rules.fatherName"
                  ></v-text-field>
                  <v-text-field
                    variant="outlined"
                    label="Grand Father Name"
                    v-model="grandFatherName"
                    :rules="rules.grandFatherName"
                  ></v-text-field>
                </v-window-item>
                <v-window-item :value="2">
                  <v-chip prepend-icon="mdi-map-marker" label color="light" variant="flat" class="px-5 my-1 mb-3">
                    Location Information
                  </v-chip>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field variant="outlined" label="Province" v-model="province"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field variant="outlined" label="Division" v-model="division"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field variant="outlined" label="District" v-model="district"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-chip prepend-icon="mdi-account" label color="primary" variant="flat" class="px-5 my-1 mb-3">
                    Personal Secondary Language (English/Pashto)
                  </v-chip>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field variant="outlined" label="Full Name" v-model="engName"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field variant="outlined" label="Last Name" v-model="engLastName"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field variant="outlined" label="Father Name" v-model="engFatherName"></v-text-field>
                  <v-text-field variant="outlined" label="Grand Father Name" v-model="engGrandFatherName"></v-text-field>
                </v-window-item>
              </v-window>
            </v-form>
            <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
          </v-card-text>
          <v-card-actions class="mx-2">
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" variant="flat" size="large">Submit</v-btn> -->
            <v-btn color="dark" variant="flat" size="large" @click="previousWindow" v-if="step === 2">Previous</v-btn>
            <v-btn color="primary" variant="flat" size="large" @click="submitForm" type="submit"> {{ submitNextBtn }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    newStudentRegAgain: false,
    errorMessage: null,
    shouldSubmit: false,
    kankorId: null,
    fullName: null,
    lastName: null,
    fatherName: null,
    grandFatherName: null,
    photo: null,
    province: null,
    division: null,
    district: null,
    engName: null,
    engLastName: null,
    engFatherName: null,
    engGrandFatherName: null,
    educationalYear: 1399,
  }),
  methods: {
    setPhoto(photo) {
      this.photo = photo;
    },
    nextWindow() {
      // Maximum steps reached
      if (this.step === 2) return false;
      this.step = this.step + 1;

      if (this.step === 2) {
        this.shouldSubmit = true;
      }
    },
    previousWindow() {
      // Maximum steps reached
      if (this.step === 1) return false;
      this.step = this.step - 1;
      if (this.step === 1) {
        this.shouldSubmit = false;
      }
    },
    async submitForm() {
      if (this.step !== 2) {
        // let's validate
        const { valid } = await this.$refs.studentRegForm.validate();

        if (!valid) return false;

        // Move to next window and stop submitting
        return this.nextWindow();
      }

      try {
        // Continue submitting the form
        await this.$store.dispatch('students/addStudent', {
          kankorId: this.kankorId,
          fullName: this.fullName,
          nickName: this.lastName,
          fatherName: this.fatherName,
          grandFatherName: this.grandFatherName,
          photo: this.photo,
          province: this.province,
          division: this.division,
          district: this.district,
          engName: this.engName,
          // This field is not yet added to the Model
          // engLastName: this.engLastName,
          engFatherName: this.engFatherName,
          engGrandFatherName: this.engGrandFatherName,
          educationalYear: this.educationalYear,
        });

        // Show a success toast and redirect if addNewStudentAgain was false
        if (!this.newStudentRegAgain) {
          this.$router.replace('/students/all');
        }
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
  computed: {
    submitNextBtn() {
      return this.shouldSubmit ? 'Add Student' : 'Next Section';
    },
    profilePhotoTitle() {
      return this.photo && this.fullName ? this.fullName : 'Student Photo';
    },
    profilePhotoSubtitle() {
      return this.photo && this.lastName ? this.lastName : 'Maximium: 2 mb';
    },
    rules() {
      return {
        // More validations will come later
        kankorId: [(v) => !!v || 'Please enter student kankor Id'],
        fullName: [(v) => !!v || 'Please enter student name'],
        fatherName: [(v) => !!v || 'Please enter student father name'],
        grandFatherName: [(v) => !!v || 'Please enter student grand father name'],
        educationalYear: [(v) => !!v || 'Please enter student kankor year'],
      };
    },
  },
};
</script>

<style scoped>
.maxHeight {
  padding-top: 118px !important;
  padding-bottom: 118px !important;
}
</style>
