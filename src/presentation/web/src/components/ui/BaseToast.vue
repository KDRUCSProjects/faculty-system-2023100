<template>
  <v-snackbar v-if="toast" v-model="toast" :timeout="timeout" :vertical="vertical" :color="color" tile>
    <!-- Due to programmatically creating the snackbar, 
      there's some problem to use the natural v-icon component -->

    <div id="multipleTexts" v-if="texts">
      <span v-for="(text, index) in texts" :key="index">
        <i v-if="icon" :class="`bx ${icon}`" class="size icon" :style="iconStyle"></i>
        <p>{{ text.msg }}</p>
      </span>
    </div>

    <div id="singleText" v-else>
      <i v-if="icon" :class="`bx ${icon}`" class="size" :style="iconStyle"></i>
      <div class="mr-6">
        {{ text }}
      </div>
    </div>

    <template v-if="close" v-slot:action="{ attrs }">
      <v-btn :color="btnColor" text v-bind="attrs" @click="toast = false" :class="`${btnTextColor}--text`">
        {{ closeTxt }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      default: 'This is a toast!',
    },
    texts: {
      default: null,
    },
    close: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    icon: {
      type: String,
      default: 'bx-check-circle',
    },
    color: {
      type: null,
      default: undefined,
    },
    btnColor: {
      type: String,
      default: 'primary',
    },
    iconColor: {
      type: String,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    btnBackground: {
      type: String,
    },
    btnTextColor: {
      type: String,
      default: 'primary',
    },
  },
  data: () => ({
    toast: true,
  }),
  computed: {
    iconStyle() {
      return !this.iconColor ? `color: white` : `color: var(--v-${this.iconColor}-base)`;
    },
    closeTxt() {
      return 'close';
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
