<template>
  <v-card class="mx-auto" max-width="650">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold"> Change your password </v-card-title>
      <v-card-subtitle class="text-center">
        <p>Just type it twice and try not to forget it.</p>
      </v-card-subtitle>

      <v-card-text class="my-3">
        <!-- <p class="mb-1">Password should be and must contain the followings:</p> -->

        <v-row style="text-align: center">
          <v-col :class="{ 'text-success': passwordRules.chars8 }">
            <b>8+</b>
            <p>Character</p>
          </v-col>
          <v-col>
            <b>AA</b>
            <p>Uppercase</p>
          </v-col>
          <v-col>
            <b>aa</b>
            <p>Lowercase</p>
          </v-col>
          <v-col>
            <b>123</b>
            <p>Number</p>
          </v-col>
          <v-col>
            <b>@$#</b>
            <p>Symbol</p>
          </v-col>
        </v-row>

        <v-form class="pa-3" @submit.prevent="submitForm">
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
            :disabled="newChanges"
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
        </v-form>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    isLoading: false,
    errorMessage: null,
    newChanges: false,
    passwordRules: {
      chars8: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbols: false,
    },
  }),
  methods: {
    async submitForm() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('changePassword', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
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
      this.passwordRules.symbol = false;
      this.passwordRules.number = false;

      // Condition 1:
      // Check if newly entered password contains at least 8 chars
      if (newValue.length > 8) {
        this.passwordRules.chars8 = true;
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
