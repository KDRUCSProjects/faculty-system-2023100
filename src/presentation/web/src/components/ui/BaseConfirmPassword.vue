<template>
  <v-overlay v-model="dialog" scrim="#000"></v-overlay>

  <v-dialog v-model="dialog" :max-width="modalWidth" transition="slide-y-transition" persistent="">
    <v-card>
      <v-card-item>
        <v-card-title class="font-weight-bold">{{ $t('Confirm Identity') }}</v-card-title>
        <v-card-subtitle>{{ $t('Type your password to continue') }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-form @submit.prevent="confirm">
          <v-text-field :focused="true" variant="outlined" :label="$t('Password')" v-model="password"></v-text-field>
        </v-form>
        <v-alert v-if="errorMessage" type="error" variant="outlined" :text="errorMessage"></v-alert>
      </v-card-text>
      <v-card-actions class="mx-2">
        <v-btn variant="elevated" class="ma-1 px-10" color="primary" @click="confirm"> {{ $t('Continue') }} </v-btn>
        <v-btn variant="tonal" class="ma-1" color="error" @click="cancel"> {{ $t('Cancel') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
const initialState = () => ({
  dialog: false,
  password: null,
  errorMessage: null,
  count: 0,

  // Private variables
  resolvePromise: undefined,
  rejectPromise: undefined,
});
export default {
  props: {
    modalWidth: {
      default: 400,
    },
  },
  data: () => initialState(),
  emits: ['confirm-password-answer'],
  methods: {
    show() {
      this.dialog = true;

      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    confirm() {
      //   this.dialog = false;
      this.$store
        .dispatch('confirmPassword', this.password)
        .then(() => {
          this.$emit('confirm-password-answer', this.password);
          this.resolvePromise(true);
          this.dialog = false;
          this.resetForm();
        })
        .catch(() => {
          //   this.resolvePromise(false);
          //   In case the user typed in correct password, let's show the error but not resolve the promise
          this.errorMessage = `Incorrect Password Try again in ${3 - this.count}`;
          this.count = this.count + 1;
        });

      if (this.count > 2) {
        this.dialog = false;
        this.resolvePromise(false);
        this.resetForm();
      }
    },
    cancel() {
      this.dialog = false;
      this.resolvePromise(false);
      this.resetForm();
    },
    resetForm() {
      Object.assign(this.$data, initialState());
      this.errorMessage = null;
    },
  },
};
</script>

<style></style>
