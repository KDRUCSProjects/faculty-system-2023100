<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro">  </span> -->
    <v-avatar size="120"> <v-img :src="`${apiRoute}/${photo}`" alt="user" /> </v-avatar>
    <v-card-title class="pb-0">{{ fullName }}</v-card-title>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace">{{ lastName || 'Teacher' }}</v-card-subtitle>
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
            <v-btn prepend-icon="mdi-delete" variant="text" color="error" @click="deleteTeacher(teacherId)"
              >Delete Account</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>

    <!-- Dialogs -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    apiRoute: 'http://localhost:4000/storage/images',
  }),
  props: {
    teacherId: {
      type: Number,
    },
    photo: {
      type: String,
      default: '@/assets/images/1.jpg',
    },
    fullName: {
      type: String,
      default: 'Mohammad Nabi',
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      default: 'm@example.com',
    },
  },
  methods: {
    async deleteTeacher(teacherId) {
      // Show confirm dialog by access it with $ref

      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this teacher?',
        okButton: 'Yes',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      // Otherwise, continue deleting the teacher from the database
      await this.$store.dispatch('teachers/deleteTeacher', teacherId);
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
