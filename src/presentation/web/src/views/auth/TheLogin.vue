<template>
  <div id="wrapper" class="d-flex flex-column align-center justify-center mx-auto">
    <v-card elevation="0" width="400">
      <v-card-item>
        <v-form ref="loginForm" :fast-fail="false" @submit.prevent="submitForm">
          <v-card-title class="text-h4">{{ $t('LOGIN') }}</v-card-title>
          <v-card-subtitle class="mt-1"> {{ $t('Welcome back. Please enter your details') }} </v-card-subtitle>

          <div class="my-3"></div>

          <v-text-field v-model="email" :rules="rules.email" clearable :label="$t('Email')" type="email"></v-text-field>

          <v-text-field
            v-model="password"
            :rules="rules.password"
            :label="$t('Password')"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append-inner="show = !show"
          ></v-text-field>

          <v-btn :loading="isLoading" class="mt-2" block variant="flat" size="large" type="submit" elevation="0">
            {{ $t('Continue') }}
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

        if (this.$store.getters.isTeacher) {
          return this.$router.replace('/home');
        } else {
          this.$router.replace('/dashboard');
        }
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
          (v) => !!v || this.$t('Please enter email address'),
          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],
        password: [(v) => !!v || this.$t('Please enter password')],
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
