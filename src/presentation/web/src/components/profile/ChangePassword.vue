<template>
  <v-card class="mx-auto theShadow" max-width="550">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold text-h5 mt-5">
        <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
          {{ $t('Change account password') }}
        </span>
      </v-card-title>
      <v-card-subtitle class="text-center">
        <p>{{ $t('Just type it twice and try not to forget it') }}</p>
      </v-card-subtitle>
      <v-card-text class="my-3">
        <v-row style="text-align: center">
          <v-col :class="{ 'text-success': passwordRules.chars8 }">
            <b>8+</b>
            <p>{{ $t('Character') }}</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.uppercase }">
            <b>AA</b>
            <p>{{ $t('Uppercase') }}</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.lowercase }">
            <b>aa</b>
            <p>{{ $t('Lowercase') }}</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.number }">
            <b>123</b>
            <p>{{ $t('Number') }}</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.symbols }">
            <b>@$#</b>
            <p>{{ $t('Symbol') }}</p>
          </v-col>
        </v-row>
        <v-form class="pa-3 mt-5" @submit.prevent="submitForm" ref="changePasswordForm">
          <v-text-field
            v-model="newPassword"
            type="password"
            :label="$t('New Password')"
            :placeholder="$t('New Password')"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            type="password"
            :label="$t('Confirm Password')"
            :placeholder="$t('Enter the above password')"
            variant="outlined"
          ></v-text-field>
          <span class="text-error" v-if="passwordComparison">
            {{ $t('New password and confirm password does not match') }}
          </span>
          <v-btn
            :disabled="disabledBtn"
            type="submit"
            block
            class="text-none my-5"
            color="primary"
            size="x-large"
            variant="elevated"
          >
            {{ $t('Save Changes') }}
          </v-btn>
          <v-alert v-if="!!errorMessage" type="error" class="pa-2 my-2 font-weight-medium">
            {{ errorMessage }}
          </v-alert>
          <v-alert
            v-if="serverResponse"
            type="success"
            title="Success"
            text="Password has been changed successfully."
          ></v-alert>
        </v-form>
      </v-card-text>
    </v-card-item>
    <!-- Dialogs -->
    <base-confirm-password ref="baseConfirmPassword" @confirm-password-answer="getOldPassword"></base-confirm-password>
  </v-card>
</template>
<script>
const initiatePasswordRules = () => ({
  chars8: false,
  uppercase: false,
  lowercase: false,
  number: false,
  symbols: false,
});
export default {
  data: () => ({
    dialog: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    disabledBtn: true,
    isLoading: false,
    errorMessage: null,
    newChanges: false,
    serverResponse: false,
    passwordRules: initiatePasswordRules(),
  }),
  computed: {
    passwordComparison() {
      return this.newPassword && this.confirmPassword && this.confirmPassword !== this.newPassword ? true : false;
    },
  },
  methods: {
    getOldPassword(getOldPassword) {
      this.currentPassword = getOldPassword;
    },
    resetForm() {
      this.newPassword = '';
      this.currentPassword = '';
      this.confirmPassword = '';
      this.passwordRules = initiatePasswordRules();
    },
    async submitForm() {
      this.isLoading = true;
      try {
        // Let's ask the user to re-enter their password
        let answer = await this.$refs.baseConfirmPassword.show();
        if (!answer) {
          // Reset the form and return
          await this.$refs.changePasswordForm.reset();
          this.resetForm();
          return false;
        }
        await this.$store.dispatch('changePassword', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
        // If no error message, that means the password has changes.
        // Remember, a 200 OK only comes with a successful password change, otherwise this line won't even hit
        this.serverResponse = true;
        // Later, we will render the message from the server/api.
        // Now, let's reset the form
        this.resetForm();
      } catch (e) {
        this.errorMessage = e;
      } finally {
        this.isLoading = false;
      }
    },
    passwordValidation(newValue, compareWith) {
      // Reset everything on change
      this.passwordRules.chars8 = false;
      this.passwordRules.uppercase = false;
      this.passwordRules.lowercase = false;
      this.passwordRules.symbols = false;
      this.passwordRules.number = false;
      this.disabledBtn = true;
      // Condition 1:
      // Check if newly entered password contains at least 8 chars
      if (newValue.length > 8) {
        this.passwordRules.chars8 = true;
      }
      // Check if newly entered password contains uppercase letter
      if (/[A-Z]/.test(newValue)) {
        this.passwordRules.uppercase = true;
      }
      // Check if newly entered password contains lowercase letter
      if (/[a-z]/.test(newValue)) {
        this.passwordRules.lowercase = true;
      }
      // Check if newly entered password contains number
      if (/[0-9]/.test(newValue)) {
        this.passwordRules.number = true;
      }
      // Check if newly entered password contains symbols
      if (/[#?!@$_+:"{'`~,.<>'};%^&*(-)]/.test(newValue)) {
        this.passwordRules.symbols = true;
      }
      // Check all condition that is true or false
      if (
        this.passwordRules.chars8 &&
        this.passwordRules.lowercase &&
        this.passwordRules.number &&
        this.passwordRules.symbols &&
        this.passwordRules.uppercase &&
        compareWith === newValue
      ) {
        this.disabledBtn = false;
      } else {
        this.disabledBtn = true;
      }
    },
  },
  watch: {
    newPassword(newValue) {
      this.passwordValidation(newValue, this.confirmPassword);
    },
    confirmPassword(newValue) {
      // Also, re-check password validation
      this.passwordValidation(newValue, this.newPassword);
    },
  },
};
</script>
<style scoped>
.container {
  padding: 25px 180px 25px 180px;
}
</style>
