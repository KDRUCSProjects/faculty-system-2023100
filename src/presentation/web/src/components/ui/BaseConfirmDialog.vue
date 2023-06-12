<template>
  <v-dialog v-model="dialog" :max-width="modalWidth" transition="slide-y-transition">
    <template>
      <div class="text-center">
        <v-sheet :width="modalWidth" class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="light darken-5" dark>
          <h3 class="grey--text text--lighten-1 mb-4" dir="ltr">
            <span class="font-weight-bold error--text">
              {{ warningTitle }}
            </span>
            <span class="ml-1">:</span>
            <span>
              {{ title }}
            </span>
            <br />
            <span v-if="subtitle" class="info--text my-1"> [ {{ subtitle }} ] </span>
          </h3>

          <v-btn class="ma-1" color="error" @click="confirm">
            {{ okButton }}
          </v-btn>

          <v-btn class="ma-1" color="secondary" @click="cancel"> Cancel </v-btn>
        </v-sheet>
      </div>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: {
    modalWidth: {
      default: 550,
    },
  },
  data: () => ({
    dialog: false,
    warningTitle: undefined,
    title: undefined,
    okButton: 'Okay',
    cancelButton: 'Cancel',
    subtitle: '',

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),
  emits: ['dialog-answer'],
  methods: {
    show(opts = {}) {
      this.dialog = true;
      this.title = opts.title;
      this.warningTitle = opts.warningTitle;
      this.okButton = opts.okButton;
      this.subtitle = opts.subtitle;

      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    confirm() {
      this.dialog = false;
      this.resolvePromise(true);
    },

    cancel() {
      this.dialog = false;
      this.resolvePromise(false);
    },
  },
};
</script>

<style></style>
