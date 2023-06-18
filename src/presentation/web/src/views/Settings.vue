<template>
  <base-contents>
    <div>
      <v-card-title> App Settings </v-card-title>
      <v-card-subtitle> Set your account settings down below</v-card-subtitle>

      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab v-for="(tab, index) in tabs" :key="index" :value="index" color="light">{{ tab.title }}</v-tab>
      </v-tabs>

      <!-- <v-window v-model="tab">
        <v-window-item class="pa-3" v-for="(tab, index) in tabs" :value="index" :key="index">
          <component :is="tab.component"></component>
        </v-window-item>
      </v-window> -->

      <v-window v-model="tab">
        <v-window-item class="pa-3">
          <view-edit-profile> </view-edit-profile>
        </v-window-item>
        <v-window-item class="pa-3">
          <change-password></change-password>
        </v-window-item>
      </v-window>
    </div>
  </base-contents>
</template>

<script>
import ViewEditProfile from '@/components/profile/ViewEditProfile.vue';
import ChangePassword from '@/components/profile/ChangePassword.vue';

export default {
  components: {
    ViewEditProfile,
    ChangePassword,
  },
  data: () => ({
    tab: null,
    tabs: [
      {
        title: 'Profile',
        component: 'ViewEditProfile',
      },
      {
        title: 'Change Password',
        component: 'ChangePassword',
      },
    ],
  }),
};
</script>

<style scoped></style>
