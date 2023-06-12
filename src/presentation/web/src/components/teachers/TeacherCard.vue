<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro">  </span> -->
    <v-avatar size="120">
      <v-img src="@/assets/images/2.jpg" alt="user" />
    </v-avatar>
    <v-card-title class="pb-0">{{ fullName }}</v-card-title>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace">{{ nickname }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle class="text-primary">{{ email }}</v-card-subtitle>

    <v-card-actions class="mt-3">
      <v-btn color="primary" variant="elevated">Profile</v-btn>
      <v-btn color="secondary" variant="tonal"> Subjects</v-btn>

      <v-menu transition="slide-y-transition" elevation="0">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" icon>
            <v-icon icon="mdi-dots-vertical"></v-icon>
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item>
            <v-btn prepend-icon="mdi-key" variant="text" color="dark">Change Password</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn prepend-icon="mdi-book-open-variant" variant="text" color="dark">Assign subject </v-btn>
          </v-list-item>
          <!-- <v-list-item>
            <v-btn prepend-icon="mdi-delete" variant="text" color="dark">Disable Account</v-btn>
          </v-list-item> -->
          <v-list-item>
            <v-btn prepend-icon="mdi-delete" variant="text" color="error">Delete Account</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
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

.theShadow {
  -webkit-box-shadow: 0 0 37px rgb(8 21 66 / 5%);
  box-shadow: 0 0 37px rgb(8 21 66 / 5%) !important;
  border-radius: 10px;
}

.v-card {
  /* border: 1px dotted '#333333'; */
}

.v-avatar {
  /* border: 1px solid rgb(var(--v-theme-primary)); */
}
</style>
