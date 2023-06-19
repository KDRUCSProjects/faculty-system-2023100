<template>
  <div>
    <v-card max-width="450" class="mx-auto" v-if="editProfile">
      <v-card-text>
        <v-form @submit.prevent="submitForm" ref="editProfileForm">
          <base-photo-uploader
            @photo="getPhoto"
            :defaultPhoto="`${imagesResource}/${photo}`"
            :defaultPhotoName="photo"
          ></base-photo-uploader>

          <v-text-field :rules="rules.name" v-model="name" label="Name" variant="outlined"></v-text-field>
          <v-text-field v-model="lastName" label="Last Name" variant="outlined"></v-text-field>
          <!-- <v-text-field v-model="email" label="Email" variant="outlined"></v-text-field> -->
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="toggleView" variant="outlined" prepend-icon="mdi-arrow-left">Back to Profile</v-btn>
        <v-btn @click="submitForm" variant="flat" :disabled="!newChanges">Save Changes</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Show Profile -->

    <v-card
      max-width="450"
      v-else
      class="mx-auto d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded"
    >
      <v-card-text class="text-center">
        <v-avatar class="my-2" size="160" color="secondary" variant="tonal">
          <v-img v-if="photo" :src="`${imagesResource}/${photo}`" alt="user" />
          <div v-else>
            <span class="text-h5">{{ abbreviation }}</span>
          </div>
        </v-avatar>
        <v-card-title class="pb-0">{{ name }}</v-card-title>
        <v-card-subtitle v-if="lastName" class="py-0 my-0 text-center" style="font-family: monospace">
          {{ lastName }}
        </v-card-subtitle>
        <!-- <v-divider></v-divider> -->
        <v-card-subtitle class="text-primary">{{ email }}</v-card-subtitle>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="toggleView" variant="flat" class="px-6" prepend-icon="mdi-account"> Edit Profile</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    lastName: '',
    email: '',
    photo: '',
    newPhoto: '',
    editProfile: false,
    newChanges: false,
    serverResponse: null,
    errorMessage: null,
  }),
  methods: {
    toggleView() {
      this.editProfile = !this.editProfile;
    },
    getPhoto(photo) {
      this.newPhoto = photo;
    },
    setData(data) {
      // Data = {fullName, lastName, email}
      this.name = data.name;
      this.lastName = data.lastName;
      this.email = data.email;
      this.photo = data.photo;
    },
    async submitForm() {
      let { valid } = await this.$refs.editProfileForm.validate();

      if (!valid) return false;

      try {
        const data = {
          name: this.name,
          lastName: this.lastName,
        };

        if (this.newPhoto.name !== this.photo) {
          data['photo'] = this.newPhoto;
        }

        await this.$store.dispatch('updateProfile', data);

        // Now, also update the [photo]
        this.photo = this.$store.getters['userData'].photo;

        // Once the update is completed, toggle back to view profile
        this.toggleView();
      } catch (e) {
        this.errorMessage = e;
      }
    },
    checkChanges(field, newValue) {
      let theValue = this.$store.getters['userData'][field];
      if (theValue !== newValue) {
        this.newChanges = true;
      } else {
        this.newChanges = false;
      }
    },
  },
  computed: {
    abbreviation() {
      return this.buildAbbreviation(this.name);
    },
    rules() {
      return {
        name: [(v) => !!v || 'Name is required'],
      };
    },
  },
  created() {
    // @ component mount
    const userData = this.$store.getters['userData'];

    this.setData({
      name: userData.name,
      email: userData.email,
      lastName: userData.lastName,
      photo: userData.photo,
    });
  },
  watch: {
    name(newV) {
      this.checkChanges('name', newV);
    },
    lastName(newV) {
      this.checkChanges('lastName', newV ? newV : null);
    },
    newPhoto(newValue) {
      if (newValue?.name !== this.photo) {
        this.newChanges = true;
      } else {
        this.newChanges = false;
      }
    },
  },
};
</script>

<style scoped></style>
