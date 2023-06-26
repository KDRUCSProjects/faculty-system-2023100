<template>
  <v-navigation-drawer v-model="drawer" app width="220" color="primary" permanent>
    <!-- App/Drawer name -->
    <v-list-item class="my-4">
      <v-list-item-content>
        <v-list-item-title class="text-center text-h6 font-weight-bold"> CS Faculty </v-list-item-title>
        <v-list-item-subtitle class="text-center"> Management System </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- The Divider -->
    <v-divider></v-divider>

    <!-- Menu Items -->
    <v-list nav dense class="menu-items">
      <div v-for="item in items" :key="item.title">
        <v-list-item link :to="item.to">
          <v-list-item-icon>
            <v-icon color="light">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>

    <template v-slot:append>
      <div class="pa-5">
        <v-btn block color="dark" @click="logout" class="font-weight-bold" prepend-icon="mdi-exit-to-app">
          Logout
          <template v-slot:prepend>
            <v-icon color="primary"></v-icon>
          </template>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-poll',
          to: '/dashboard',
        },
        {
          title: 'Teachers',
          icon: 'mdi-human-male-board',
          to: '/teachers',
        },
        {
          title: 'Students',
          icon: 'mdi-account-school',
          to: '/students',
        },
        {
          title: 'Departments',
          icon: 'mdi-cog-outline',
          to: '/departments',
        },
        {
          title: 'Settings',
          icon: 'mdi-cog-outline',
          to: '/settings',
        },
      ],
      drawer: true,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.replace('/auth');
    },
  },
};
</script>

<style scoped>
.v-list-item--active {
  background: var(--v-primary-base);
  color: white;
}

.v-list-item--active i {
  color: white !important;
}

.v-list-group .v-list-item--active i {
  color: var(--v-primary-base) !important;
}

.v-list-group__items .v-list-item--active i {
  color: #fff !important;
}

.menu-items .v-list-item-title {
  display: inline;
  margin-left: 12px;
}
</style>
