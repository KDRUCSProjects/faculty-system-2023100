<template>
    <div>
      <!-- Default Btn/Slot -->
      
  
        <v-dialog max-width="550" activator="parent" v-model="dialog" transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              <slot>
                <v-btn color="primary"> Change Password </v-btn>
              </slot>
            </div>
          </template>
          
          <v-card class="pa-1" :loading="isLoading">
            <v-card-item>
              <v-card-title>{{ $t('Change Teacher Password') }}</v-card-title>
              <v-card-subtitle>
                {{ $t('Fill in the blank to change teacher password') }}
              </v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <v-form @submit.prevent="submitForm" ref="resetTeacherPasswordForm">
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
              <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Change Password') }}</v-btn>
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
      activatorIcon: {
        type: String,
        default: 'mdi-key',
      },
      activatorVariant: {
        type: String,
        default: 'text',
      },
      activatorColor: {
        type: String,
        default: 'primary',
      },
    },
    data: () => ({
      alert: false,
      dialog: false,
      password: null,
      show: true,
      isLoading: false,
      errorMessage: null,
    }),
    computed: {
      rules() {
        return {
            // password validation
          password: [
            (v) => !!v ||  this.$t('Please enter password'),
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
      async submitForm() {
        // Validate the form first
        let { valid } = await this.$refs.resetTeacherPasswordForm.validate();
  
        if (!valid) {
          return false;
        }
  
        //   Start loader
        this.isLoading = true;
  
        try {
          const data = {
            teacherId: this.teacherId,
            // Data starts here...
            password: this.password
          };
          await this.$store.dispatch('teachers/updateTeacher', data);
  
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
        this.$refs.resetTeacherPasswordForm.reset();
        // tell parent that the windows is closed
        this.$emit('dialog-close');
      },
    },
    emits: ['dialog-close'],
  };
  </script>
  
  <style lang="scss" scoped></style>
  