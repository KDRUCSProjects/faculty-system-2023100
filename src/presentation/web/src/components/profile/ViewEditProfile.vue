<template>
  <div>
    <v-card max-width="450" class="mx-auto" v-if="editProfile">
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <base-photo-uploader @photo="getPhoto"></base-photo-uploader>

          <v-text-field v-model="name" label="Name" variant="outlined"></v-text-field>
          <v-text-field v-model="nickname" label="Surname" variant="outlined"></v-text-field>
          <v-text-field v-model="email" label="Password" variant="outlined"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="toggleView" variant="outlined" prepend-icon="mdi-arrow-left">Back to Profile</v-btn>
        <v-btn @click="showAlert" variant="flat">Save Changes</v-btn>
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
        <v-card-subtitle v-if="nickname" class="py-0 my-0 text-center" style="font-family: monospace">
          {{ nickname }}
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
    nickname: '',
    email: '',
    photo: '',
    editProfile: false,
  }),
  methods: {
    toggleView() {
      this.editProfile = !this.editProfile;
    },
    getPhoto(photo) {
      this.photo = photo;
    },
    setData(data) {
      // Data = {fullName, nickName, email}
      this.name = data.name;
      this.nickname = data.nickname;
      this.email = data.email;
      this.photo = data.photo;
    },
    submitForm() {
      // this.$store.dispatch('')
    },
  },
  computed: {
    abbreviation() {
      return this.buildAbbreviation(this.name);
    },
  },
  mounted() {
    // @ component mount
    const userData = this.$store.getters['userData'];

    this.setData({
      name: userData.name,
      email: userData.email,
      nickname: userData.nickname,
      photo: userData.photo,
    });
  },
};
</script>

<style scoped></style>
