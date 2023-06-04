<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow">
    <!-- <span class="pro"></span> -->
    <v-avatar size="120">
      <v-img src="@/assets/images/2.jpg" alt="user" />
    </v-avatar>
    <v-card-title class="pb-0">{{ fullName }}</v-card-title>
    <v-card-subtitle>{{ nickname }}</v-card-subtitle>

    <v-card-actions class="my-3">
      <v-btn color="primary" block variant="flat">View Profile</v-btn>
      <!-- <v-btn color="secondary">Subject</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    photo: {
      type: String,
      default: '@/assets/images/1.jpg',
    },
    fullName: {
      type: String,
      default: 'Mohammad Nabi',
    },
    nickname: {
      type: String,
      default: 'Hotak',
    },
    email: {
      type: String,
      default: 'm@example.com',
    },
  },
};
</script>

<style scoped>
.card-container .pro {
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

.theShadow {
  -webkit-box-shadow: 0 0 37px rgb(8 21 66 / 5%);
  box-shadow: 0 0 37px rgb(8 21 66 / 5%) !important;
  border-radius: 10px;
}

.v-avatar {
}
</style>
