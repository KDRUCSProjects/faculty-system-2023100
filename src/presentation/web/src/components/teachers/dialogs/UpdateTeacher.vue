<template>
  <div>
    <!-- Default Btn/Slot -->

    <v-dialog max-width="550" activator="parent" v-model="dialog" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> Update Teacher </v-btn>
          </slot>
        </div>
      </template>

      <v-card class="pa-1" :loading="isLoading">
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="updateTeacherForm">
            <base-photo-uploader @photo="getPhoto" :defaultPhoto="photo"></base-photo-uploader>

            <v-text-field :rules="rules.name" v-model="name" variant="outlined" label="Full Name"></v-text-field>
            <v-text-field v-model="lastName" variant="outlined" label="Nick Name"></v-text-field>
            <v-text-field type="email" :rules="rules.email" v-model="email" variant="outlined" label="Email"></v-text-field>
          </v-form>

          <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn @click="submitForm" variant="flat" :loading="isLoading">Update Account</v-btn>
          <v-btn @click="closeDialog" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    teacherId: {
      type: Number,
    },
  },
  data: () => ({
    alert: false,
    dialog: false,
    name: null,
    lastName: null,
    email: null,
    photo: null,
    newPhoto: null,
    show: true,
    isLoading: false,
    errorMessage: null,
  }),
  computed: {
    rules() {
      return {
        name: [(v) => !!v || 'Please enter teacher name'],
        // email validation
        email: [
          (v) => !!v || 'Please enter teacher email address',
          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],
      };
    },
    teacher() {
      return this.$store.getters['teachers/currentTeacher'];
    },
  },
  methods: {
    getPhoto(photo) {
      this.newPhoto = photo;
    },
    async setTeacher() {
      await this.$store.dispatch('teachers/loadTeacherById', this.teacherId);

      this.name = this.teacher.name;
      this.lastName = this.teacher.lastName;
      this.email = this.teacher.email;
      this.photo = this.teacher.photo;
    },
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.updateTeacherForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        const data = {
          teacherId: this.teacherId,
          // Data starts here...
          name: this.name,
          lastName: this.lastName,
          email: this.email,
        };

        if (this.newPhoto) {
          data['photo'] = this.newPhoto;
        }

        await this.$store.dispatch('teachers/updateTeacher', data);

        // Set new data values
        await this.setTeacher();

        this.closeDialog();
      } catch (e) {
        // Show error message if happened
        this.errorMessage = e;
      } finally {
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.dialog = false;
      //   Also reset the form

      // tell parent that the windows is closed
      this.$emit('dialog-close');
    },
  },
  emits: ['dialog-close'],
  async created() {
    await this.setTeacher();
  },
};
</script>

<style lang="scss" scoped></style>
