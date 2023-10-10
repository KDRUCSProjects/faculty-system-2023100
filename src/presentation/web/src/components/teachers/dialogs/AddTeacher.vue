<template>
  <div>
    <!-- Default Btn/Slot -->
    <v-btn color="primary" variant="flat">
      {{ $t('Add Teacher') }}

      <v-dialog max-width="550" activator="parent" v-model="dialog" transition="slide-y-transition">
        <!-- <v-toolbar :color="'dark'" class="mb-2">
          <v-toolbar-title class=""> {{ $t('Add New Teacher Account') }} </v-toolbar-title>
        </v-toolbar> -->

        <v-card class="" :loading="isLoading" :class="{ pashtoFont: $i18n.locale === 'pa' }">
          <!-- <v-card-item>
            <v-card-title class="font-weight-bold">Teacher Registration</v-card-title>
            <v-card-subtitle>Fill the form to add new teacher account</v-card-subtitle>
          </v-card-item> -->

          <v-card-text>
            <v-form @submit.prevent="submitForm" ref="addTeacherForm">
              <div style="max-width: 220px" class="text-align-center mx-auto">
                <base-photo-uploader @photo="getPhoto" @photo-size-change="handlePhotoSize"></base-photo-uploader>
              </div>
              <v-text-field :rules="rules.name" v-model="name" variant="outlined" :label="$t('Full Name')"></v-text-field>
              <v-text-field v-model="lastName" variant="outlined" :label="$t('Nick Name')"></v-text-field>
              <v-text-field
                type="email"
                :rules="rules.email"
                v-model="email"
                variant="outlined"
                :label="$t('Email')"
              ></v-text-field>
              <v-text-field
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append-inner="show = !show"
                :rules="rules.password"
                v-model="password"
                variant="outlined"
                :label="$t('Password')"
              ></v-text-field>
            </v-form>

            <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
          </v-card-text>
          <v-card-actions class="mx-4">
            <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Add Account') }}</v-btn>
            <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
export default {
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
    pSize: null,
    dynamicPhotoSize: null,
  }),
  computed: {
    rules() {
      return {
        name: [(v) => !!v || this.$t('Please enter full name')],
        // email validation
        email: [
          (v) => !!v || this.$t('Please enter email address'),
          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('E-mail must be valid'),
        ],

        // password validation
        password: [
          (v) => !!v || this.$t('Please enter password'),
          (v) => /[A-Z]/.test(v) || this.$t('Password must contain 1 uppercase letter'),
          (v) => /[a-z]/.test(v) || this.$t('Password must contain 1 lowercase letter'),
          (v) => /[0-9]/.test(v) || this.$t('Password must contain 1 number'),
          (v) => /[#?!@$_+:"{'`~,.<>'};%^&*(-)]/.test(v) || this.$t('Password must contain 1 symbol'),
          (v) => v.length >= 8 || this.$t('Password length must be greater than 8 characters'),
        ],
      };
    },
  },

  methods: {
    getPhoto(photo) {
      this.photo = photo;
    },
    handlePhotoSize: function (photoSize) {
      this.pSize = photoSize;
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

        if (this.pSize) {
          return this.$store.commit('setToast', [0, this.$t('Photo size should be lesser than 2 MB!')]);
        }

        await this.$store.dispatch('teachers/addTeacher', data);
        this.closeDialog();
      } catch (e) {
        context.commit('setToast', [0, this.$t('Photo size should be lesser than 2 MB!')], { root: true });
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
};
</script>

<style lang="scss" scoped></style>
