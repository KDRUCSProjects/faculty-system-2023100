<template>
  <v-app-bar class="px-4" elevation="0" border>
    <!-- The Menu -->
    <!-- navigation button/collapser -->

    <slot>
      <div style="width: 500px">
        <v-text-field
          clearable=""
          :loading="loading"
          density="compact"
          variant="outlined"
          label="Find student by id"
          prepend-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </div>
    </slot>

    <v-spacer></v-spacer>

    <!-- Dropdown user profile menu -->
    <div id="the-menu">
      <v-cards-title class="d-inline mx-2">{{ userFullName }}</v-cards-title>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="primary" variant="flat">
              <v-img v-if="userPhoto" :src="`${imagesResource}/${userPhoto}`"></v-img>
              <span v-else class="text-h7">
                {{ abbreviation }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-3">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar size="60px" class="mb-3" color="primary" variant="flat">
                <v-img v-if="userPhoto" :src="`${imagesResource}/${userPhoto}`"></v-img>
                <span v-else class="text-h6">
                  {{ abbreviation }}
                </span>
              </v-avatar>
              <h3>{{ userFullName }}</h3>
              <p class="text-caption">
                {{ userEmail }}
              </p>
              <v-divider class="my-1"></v-divider>
              <v-btn variant="text" block to="/settings" color="dark"> Settings </v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn variant="text" block @click="logout" color="error"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import globalMixins from '@/mixins/global.mixins';

export default {
  data: () => ({
    user: {
      initials: 'MN',
      fullName: 'Mohammad Nabi',
      email: 'admin@example.com',
    },
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.replace('/auth');
    },
  },
  computed: {
    items() {
      return [
        {
          title: 'Settings',
          icon: 'mdi-cog-outline',
          to: '/settings',
        },
        { title: 'Logout', icon: 'mdi-exit-to-app' },
      ];
    },
    userPhoto() {
      return this.$store.getters['photo'];
    },
    userFullName() {
      return this.$store.getters['fullName'];
    },
    userLastName() {
      return this.$store.getters['lastName'];
    },
    userEmail() {
      return this.$store.getters['email'];
    },
    abbreviation() {
      return this.buildAbbreviation(this.userFullName);
    },
  },
};
</script>

<style scoped>
#appbar {
  margin-right: 15px;
  margin-top: 15px !important;
  margin-left: 15px;
  padding: 5px;
  box-sizing: content-box;
}
</style>
