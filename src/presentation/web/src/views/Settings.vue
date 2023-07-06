<template>
  <base-contents>
    <div>
      <v-card-title> App Settings </v-card-title>
      <v-card-subtitle> Set your account settings down below</v-card-subtitle>

      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab v-for="(tab, index) in tabs" :key="index" :value="index" color="light">{{ tab.title }}</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item class="pa-3">
          <view-edit-profile> </view-edit-profile>
        </v-window-item>
        <v-window-item class="pa-3">
          <change-password></change-password>
        </v-window-item>
        <v-window-item class="pa-3">
          <educational-years > </educational-years>
        </v-window-item>
      </v-window>
    </div>
  </base-contents>
</template>

<script>
import ViewEditProfile from '@/components/profile/ViewEditProfile.vue';
import ChangePassword from '@/components/profile/ChangePassword.vue';
import EducationalYears from '@/components/profile/EducationalYears.vue';

export default {
  components: {
    ViewEditProfile,
    ChangePassword,
    EducationalYears,
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
      {
        title: 'Educational Year',
        component: 'EducationalYear',
      },
    ],
  }),
};
</script>

<style scoped></style>
