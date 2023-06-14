<template>
  <v-card class="mx-auto" max-width="650">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold"> Change your password </v-card-title>
      <v-card-subtitle class="text-center">
        <p>Just type it twice and try not to forget it.</p>
      </v-card-subtitle>

      <v-card-text class="my-3">
        <v-row style="text-align: center">
          <v-col :class="{ 'text-success': passwordRules.chars8 }">
            <b>8+</b>
            <p>Character</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.uppercase }">
            <b>AA</b>
            <p>Uppercase</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.lowercase }">
            <b>aa</b>
            <p>Lowercase</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.number }">
            <b>123</b>
            <p>Number</p>
          </v-col>
          <v-col :class="{ 'text-success': passwordRules.symbols }">
            <b>@$#</b>
            <p>Symbol</p>
          </v-col>
        </v-row>

        <v-form class="pa-3" @submit.prevent="submitForm" ref="changePasswordForm">
          <v-text-field
            v-model="newPassword"
            type="password"
            label="New Password"
            placeholder="Enter new password"
            variant="solo"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Enter the above password"
            variant="solo"
          ></v-text-field>
          <v-btn
            :disabled="disabledBtn"
            type="submit"
            block
            class="text-none mb-4"
            color="primary"
            size="x-large"
            variant="elevated"
          >
            Save Changes
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
  },
  watch: {
    newPassword(newValue) {
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
        this.passwordRules.uppercase
      ) {
        this.disabledBtn = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 25px 180px 25px 180px;
}
</style>
