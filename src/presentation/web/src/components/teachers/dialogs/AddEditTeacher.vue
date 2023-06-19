script
<template>
  <div>
    <!-- Default Btn/Slot -->
    <v-btn :color="activatorColor" :variant="activatorVariant" :prepend-icon="activatorPrependIcon">
      {{ title }}

      <v-dialog max-width="550" activator="parent" v-model="dialog">
        <v-card class="pa-1" :loading="isLoading">
          <!-- <v-card-item>
            <v-card-title class="font-weight-bold">Teacher Registration</v-card-title>
            <v-card-subtitle>Fill the form to add new teacher account</v-card-subtitle>
          </v-card-item> -->

          <v-card-text>
            <v-form @submit.prevent="submitForm" ref="addTeacherForm">
              <base-photo-uploader @photo="getPhoto"></base-photo-uploader>

              <v-text-field :rules="rules.name" v-model="name" variant="outlined" label="Full Name"></v-text-field>
              <v-text-field v-model="lastName" variant="outlined" label="Nick Name"></v-text-field>
              <v-text-field
                type="email"
                :rules="rules.email"
                v-model="email"
                variant="outlined"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-if="!updateAccount"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append-inner="show = !show"
                :rules="rules.password"
                v-model="password"
                variant="outlined"
                label="Password"
              ></v-text-field>
            </v-form>

            <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
          </v-card-text>
          <v-card-actions class="mx-4">
            <v-btn @click="submitForm" variant="flat" :loading="isLoading">
              {{ title }}
            </v-btn>
            <v-btn @click="closeDialog" color="error">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    updateAccount: {
      type: Boolean,
      default: false,
    },
    teacherId: {
      type: Number,
    },
    activatorVariant: {
      type: String,
      default: 'flat',
    },
    activatorColor: {
      type: String,
      default: 'primary',
    },
    activatorPrependIcon: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    alert: false,
    dialog: false,
    name: null,
    lastName: null,
    email: null,
    photo: null,
    password: null,
    show: true,
    isLoading: false,
    errorMessage: null,
  }),
  computed: {
    title() {
      return !this.updateAccount ? 'Add Teacher' : 'Update Account';
    },
    accountOldData() {
      return this.$store.getters['teachers/teacherById'](this.teacherId);
    },
    rules() {
      return {
        name: [(v) => !!v || 'Please enter teacher name'],
        // email validation
        email: [
          (v) => !!v || 'Please enter teacher email address',
          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],

        // password validation
        password: [
          (v) => !!v || 'Please enter teacher account password',
          (v) => /[A-Z]/.test(v) || 'Password must contain 1 uppercase letter',
          (v) => /[a-z]/.test(v) || 'Password must contain 1 lowercase letter',
          (v) => /[0-9]/.test(v) || 'Password must contain 1 number ',
          (v) => /[#?!@$_+:"{'`~,.<>'};%^&*(-)]/.test(v) || 'Password must contain 1 symbol',
          (v) => v.length >= 8 || 'Password length must be greater than 8 characters',
        ],
      };
    },
  },
  methods: {
    getPhoto(photo) {
      this.photo = photo;
    },
    setAccountOldData() {
      if (!this.updateAccount) return false;
      this.name = this.accountOldData.name;
      this.lastName = this.accountOldData.lastName;
      this.email = this.accountOldData.email;
    },
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.addTeacherForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        const data = {
          name: this.name,
          lastName: this.lastName,
          role: 'user',
          email: this.email,
          password: this.password,
        };

        if (this.photo) {
          data['photo'] = this.photo;
        }

        // Remove password if updating account
        if (this.updateAccount) {
          delete data.role;
          delete data.password;
          delete data.photo;

          // Push teacherId
          data.teacherId = this.accountOldData.id;
        }

        const actionType = !this.updateAccount ? 'addTeacher' : 'updateTeacher';

        await this.$store.dispatch(`teachers/${actionType}`, data);

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
      this.$refs.addTeacherForm.reset();
      this.photo = null;
    },
  },
  created() {
    if (this.updateAccount) {
      this.setAccountOldData();
    }
  },
  watch: {
    dialog(v) {
      if (!v) this.$emit('dialog-close');
    },
  },
  emits: ['dialog-close'],
};
</script>

<style lang="scss" scoped></style>
