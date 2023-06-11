<template>
  <div>
    <v-card max-width="450" class="mx-auto">
      <v-card-item>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-text-field v-model="nickname" label="Surname"></v-text-field>
          <v-text-field v-model="email" label="Password"></v-text-field>

          <v-card-actions>
            <v-btn @click="showAlert" block variant="flat">Save Changes</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    nickname: '',
    email: '',
  }),
  methods: {
    setData(data) {
      // Data = {fullName, nickName, email}
      this.name = data.name;
      this.nickname = data.nickname;
      this.email = data.email;
    },
    submitForm() {
      // this.$store.dispatch('')
    },
  },
  mounted() {
    // @ component mount
    const userData = this.$store.getters['userData'];

    this.setData({
      name: userData.name,
      email: userData.email,
      nickname: userData.nickname,
    });
  },
};
</script>

<style scoped></style>
