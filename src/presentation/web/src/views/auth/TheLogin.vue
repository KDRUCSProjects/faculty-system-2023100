<template>
  <div id="wrapper" class="d-flex flex-column align-center justify-center mx-auto">
    <v-card elevation="0" width="400">
      <v-card-item>
        <v-form ref="loginForm" :fast-fail="false" @submit.prevent="submitForm">
          <v-card-title class="text-h4" style="text-align: center;margin-bottom: 50px;">LOGIN</v-card-title>
          <v-card-subtitle class="mt-1" style="text-align: center;"> Welcome back. Please enter your details </v-card-subtitle>

         

          <v-text-field v-model="email" :rules="rules.email" clearable label="E-mail" type="email"></v-text-field>

          <v-text-field
            v-model="password"
            :rules="rules.password"
            label="Password"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append-inner="show = !show"
          ></v-text-field>
          <v-checkbox 
            label="Remember me"
            color="primary"
          />
          

          <v-btn :loading="isLoading" class="mt-2" block variant="flat" size="large" type="submit" elevation="0">
            Continue
          </v-btn>



          <v-alert v-if="!!serverResponse" type="error" class="pa-2 my-2 font-weight-medium">
            {{ serverResponse }}
          </v-alert>
        </v-form>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isLoading: false,
      isDisabled: true,
      email: '',
      password: '',
      serverResponse: '',
    };
  },
  methods: {
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.loginForm.validate();

      if (!valid) {
        return false;
      }

      // Let's send the request
      // Turn on the spinner
      this.isLoading = true;

      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('auth', data);

        // If no error, redirect the user to dashboard
        this.$router.replace('/dashboard');
      } catch (e) {
        this.serverResponse = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    rules() {
      return {
        email: [
          (v) => !!v || 'Please enter your email',
          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],
        password: [
          (v) => !!v || 'Please enter you password',
          (v) => v.length >= 6 || 'Password length should be greater than 6 characters',
        ],
      };
    },
  },
};
</script>

<style scoped>
#wrapper {
  height: 100%;
}
/* form {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
} */
/* #bg-image {
  width: 100%;
  position: absolute;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
} */
</style>
