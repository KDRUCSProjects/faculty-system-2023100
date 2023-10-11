<template>
  <base-contents>
    <div>
      <v-card-title> {{ $t('App Settings') }} </v-card-title>
      <v-card-subtitle> {{ $t('Set your account settings down below') }}</v-card-subtitle>

      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <div v-for="(tab, index) in tabs" :key="index">
          <v-tab :value="index" color="light" v-if="show(tab.role)"> {{ tab.title }}</v-tab>
        </div>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item class="pa-3">
          <view-edit-profile> </view-edit-profile>
        </v-window-item>
        <v-window-item class="pa-3">
          <change-password></change-password>
        </v-window-item>
        <v-window-item class="pa-3">
          <educational-years> </educational-years>
        </v-window-item>
        <v-window-item class="pa-3">
          <token-generate> </token-generate>
        </v-window-item>
        <v-window-item class="pa-3">
          <system-backup> </system-backup>
        </v-window-item>
      </v-window>
    </div>
  </base-contents>
</template>

<script>
import ViewEditProfile from '@/components/profile/ViewEditProfile.vue';
import ChangePassword from '@/components/profile/ChangePassword.vue';
import EducationalYears from '@/components/profile/EducationalYears.vue';
import TokenGenerate from '@/components/profile/TokenGenerate.vue';
import SystemBackup from '@/components/profile/SystemBackup.vue';

export default {
  components: {
    ViewEditProfile,
    ChangePassword,
    EducationalYears,
    TokenGenerate,
    SystemBackup,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    tabs() {
      return [
        {
          title: this.$t('Profile'),
          component: 'ViewEditProfile',
          role: ['admin', 'user', 'execManager', 'teachingManager'],
        },
        {
          title: this.$t('Change Password'),
          component: 'ChangePassword',
          role: ['admin', 'user', 'execManager', 'teachingManager'],
        },
        {
          title: this.$t('Educational Year'),
          component: 'EducationalYear',
          role: ['admin', 'teachingManager'],
        },
        {
          title: this.$t('Token Generate'),
          component: 'TokenGenerate',
          role: ['admin', 'teachingManager'],
        },
        {
          title: this.$t('System Backup'),
          component: 'SystemBackup',
          role: ['admin', 'teachingManager'],
        },
      ];
    },
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
    role() {
      return this.$store.getters['role'];
    },
  },
  methods: {
    show(roles) {
      let theRole = this.role;
      let x = roles.includes(theRole);
      return x;
    },
  },
};
</script>

<style scoped></style>
