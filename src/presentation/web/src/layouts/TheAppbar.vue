<template>
  <v-app-bar class="px-4" elevation="0" border>
    <!-- The Menu -->
    <!-- navigation button/collapser -->
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

    <v-spacer></v-spacer>

    <!-- Dropdown user profile menu -->
    <div id="the-menu">
      <v-cards-title class="d-inline mx-2">{{ user.fullName }}</v-cards-title>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar>
              <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-3">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar size="60px" class="mb-3">
                <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption">
                {{ user.email }}
              </p>
              <v-divider class="my-1"></v-divider>
              <v-btn variant="text" block> Profile </v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn variant="text" block to="/change-password"> Change Password </v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn variant="text" block> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
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
      // await this.$store.dispatch("logout");
      // this.$router.replace("/auth");
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
