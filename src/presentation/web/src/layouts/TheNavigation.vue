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
        <div v-if="!item.children">
          <v-list-item link :to="item.to">
            <v-list-item-icon>
              <v-icon color="light">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-group :value="item.title">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-icon>{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>

            <div v-for="(child, index) in item.children" :key="index">
              <v-list-item v-if="!child.divider" density="compact" :title="child.title" :to="child.to"> </v-list-item>
              <v-divider v-else></v-divider>
            </div>
          </v-list-group>
        </div>
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
          children: [
            {
              title: 'All Students',
              icon: 'mdi-account-school',
              to: '/students/all',
            },
            {
              title: 'New Student',
              icon: 'mdi-account-school',
              to: '/students/new',
            },
            {
              title: 'Student Conversion',
              icon: 'mdi-swap-horizontal',
              to: '/students/status-change',
            },
            // { divider: true },
          ],
        },
        {
          title: 'Semesters',
          icon: 'mdi-google-classroom',
          to: '/semesters/all',
        },
        // {
        //   title: 'Subjects',
        //   icon: 'mdi-book-open-blank-variant',
        //   to: '/subjects',
        // },
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
      open: ['Users'],
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

<style>
/* .v-list-item--active {
  background: var(--v-primary-base);
  color: white;
}

.v-list-item--active i {
  color: white !important;
} */
/* 
.v-list-group .v-list-item--active i {
  color: var(--v-primary-base) !important;
}

.v-list-group__items .v-list-item--active i {
  color: #fff !important;
} */

.menu-items .v-list-item-title {
  display: inline;
  margin-left: 12px;
}
</style>
