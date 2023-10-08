<template>
  <div>
    <!-- Default Btn/Slot -->

    <v-dialog max-width="550" activator="parent" v-model="dialog" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> {{ $t('Update Teacher') }} </v-btn>
          </slot>
        </div>
      </template>

      <v-card :loading="isLoading" class="pb-5 pt-3">
        <!-- <v-toolbar :color="'dark'">
          <v-toolbar-title class=""> {{ $t('Update Teacher Account') }} </v-toolbar-title>
        </v-toolbar> -->

        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="updateTeacherForm">
            <base-photo-uploader @photo="getPhoto" :defaultPhoto="photo" @photo-size-change="handlePhotoSize"></base-photo-uploader>

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
              :label="$t('New Password')"
            ></v-text-field>
          </v-form>

          <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Update Account') }}</v-btn>
          <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn>
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
    isAssistant: {
      type: Boolean,
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
    pSize:null,
    isLoading: false,
    errorMessage: null,
    password: null,
  }),
  computed: {
    rules() {
      const passwordValidation = [
        (v) => !!v || this.$t('Please enter password'),
        (v) => /[A-Z]/.test(v) || this.$t('Password must contain 1 uppercase letter'),
        (v) => /[a-z]/.test(v) || this.$t('Password must contain 1 lowercase letter'),
        (v) => /[0-9]/.test(v) || this.$t('Password must contain 1 number'),
        (v) => /[#?!@$_+:"{'`~,.<>'};%^&*(-)]/.test(v) || this.$t('Password must contain 1 symbol'),
        (v) => v.length >= 8 || this.$t('Password length must be greater than 8 characters'),
      ];

      let validations = {
        name: [(v) => !!v || this.$t('Please enter teacher name')],
        // email validation
        email: [
          (v) => !!v || this.$t('Please enter teacher email address'),
          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('E-mail must be valid'),
        ],
      };

      if (this.password) validations.password = passwordValidation;
      return validations;
    },
    teacher() {
      return this.$store.getters['teachers/currentTeacher'];
    },
  },
  methods: {
    getPhoto(photo) {
      this.newPhoto = photo;
    },
    handlePhotoSize: function (photoSize) {
      this.pSize = photoSize;
    },
    async setTeacher() {
      if (!this.dialog) return;
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

        if (this.pSize) {
          return this.$store.commit('setToast', [0, this.$t('Photo size should be lesser than 2 MB!')]);
        }

        if (this.password) {
          data.password = this.password;
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
  watch: {
    async dialog(v) {
      if (!!v || !this.isAssistant) {
        this.setTeacher(this.teacherId);
      }
    },
  },
  emits: ['dialog-close'],
  async created() {
    console.log(this.teacherId);
    await this.setTeacher();
  },
};
</script>

<style lang="scss" scoped></style>
