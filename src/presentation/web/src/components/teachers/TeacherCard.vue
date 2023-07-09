<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro">  </span> -->
    <v-avatar class="my-3" size="150" color="secondary" variant="tonal">
      <v-img v-if="photo" :src="`${imagesResource}/${photo}`" alt="user" />
      <div v-else>
        <span class="text-h5">{{ abbreviation }}</span>
      </div>
    </v-avatar>
    <v-card-title class="pb-0">{{ fullName }}</v-card-title>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace">
      {{ lastName || 'Teacher' }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle class="text-primary">{{ email }}</v-card-subtitle>

    <v-card-actions class="mt-1 px-1">
      <v-btn color="primary" variant="elevated" class="mr-1" :to="`/teachers/view/${teacherId}`" block> View Profile </v-btn>

      <v-menu transition="slide-y-transition" elevation="0" v-model="menu">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" icon class="pa-0 ma-0">
            <v-icon icon="mdi-dots-vertical" class=""></v-icon>
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item>
            <!-- Update Account -->
            <update-teacher :teacherId="teacherId" @dialog-close="closeMenu" activator-color="text"> </update-teacher>
          </v-list-item>
          <v-list-item>
            <!-- Reset Teacher Password -->
            <reset-teacher-password :teacherId="teacherId" @dialog-close="closeMenu" activator-color="text">
            </reset-teacher-password>
          </v-list-item>
          <v-list-item>
            <v-btn prepend-icon="mdi-book-open-variant" variant="text" color="dark">Assign subject </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn prepend-icon="mdi-delete" variant="text" color="error" @click="deleteTeacher(teacherId)">
              Delete Account
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>

    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
    <!-- Update Dialog -->
  </v-card>
</template>

<script>
import UpdateTeacher from './dialogs/UpdateTeacher.vue';
import ResetTeacherPassword from './dialogs/ResetTeacherPassword.vue';
export default {
  components: {
    UpdateTeacher,
    ResetTeacherPassword,
  },
  data: () => ({
    menu: false,
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
  computed: {
    abbreviation() {
      if (this.photo) return null;

      return this.buildAbbreviation(this.fullName);
    },
  },
  methods: {
    closeMenu() {
      // For some reasons, the dialog won't close when the item is clicked in the menu in Vuetify 3 when using a dialog. Let's use this hack for now.
      this.menu = false;
    },
    updateTeacher(teacherId) {
      this.$emit('update-teacher', teacherId);
    },
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
  emits: ['update-teacher'],
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
