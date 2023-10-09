<template>
  <v-snackbar
    v-if="toast"
    v-model="toast"
    :timeout="timeout"
    :variant="'flat'"
    color="grey-darken-4"
    :class="{ pashtoFont: $i18n.locale === 'pa' }"
  >
    <div id="singleText">
      <div class="">
        <v-list-item class="px-0 mx-0" density="compact">
          <v-slot slot:prepend-icon>
            <v-icon v-if="type === 'error'" color="error" class="mr-2" size="large">mdi-close-circle</v-icon>
            <v-icon v-else color="success" class="mr-2" size="large">mdi-check-circle-outline</v-icon>
          </v-slot>
          <span class=""> {{ text }} </span>
        </v-list-item>
      </div>
    </div>

    <template v-slot:actions>
      <v-btn
        size="small"
        class="font-weight-bold"
        :color="color"
        :variant="type === 'success' ? 'text' : 'flat'"
        @click="toast = false"
      >
        {{ $t('Close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success',
    },
    text: {
      default: 'This is a toast!',
    },
    timeout: {
      type: Number,
      default: 5000,
    },
  },
  data: () => ({
    toast: true,
  }),
  computed: {
    color() {
      console.log(this.type);
      return this.type === 'success' ? 'success' : 'error';
    },
  },
  created() {
    setTimeout(() => {
      // Let's delete this toast after when it disappears
      this.toast = false;
    }, this.timeout);
  },
};
</script>

<style scoped>
.size {
  font-size: 23px;
  position: absolute;
  right: 10px;
}
</style>
