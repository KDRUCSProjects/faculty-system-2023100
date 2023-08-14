<template>
  <v-overlay v-model="dialog" scrim="#000"></v-overlay>

  <v-btn variant="flat" color="cyan">
    <slot> Select Year </slot>

    <v-dialog
      v-model="dialog"
      :max-width="modalWidth"
      :persistent="persistent"
      activator="parent"
      transition="slide-y-transition"
    >
      <v-card class="mx-auto" width="250" max-width="400">
        <v-card-title class="bg-dark"> Select Period </v-card-title>

        <v-virtual-scroll :items="items" height="300" item-height="50" class="my-1">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-btn v-if="item !== selectedPeriod" color="primary" variant="tonal" block @click="selectPeriod(item)">
                {{ item }}
              </v-btn>
              <v-btn v-else color="primary" variant="flat" block @click="selectPeriod(item)"> {{ item }} </v-btn>
            </v-list-item>
          </template>
        </v-virtual-scroll>

        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="emitPeriod"> Select </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script>
const initialState = () => ({
  dialog: false,
  selectedPeriod: null,
});
export default {
  props: {
    modalWidth: {
      type: Number,
      default: 400,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    defaultPeriod: {
      type: Number,
    },
  },
  data: () => initialState(),
  computed: {
    items() {
      return this.$store.getters['years/years']?.filter((year) => year.period)?.map((period) => period.period);
    },
  },
  methods: {
    selectPeriod(year) {
      this.selectedPeriod = year;
    },
    emitPeriod() {
      if (!this.selectedPeriod) return false;
      this.$emit('select-period', this.selectedPeriod);
      this.close();
    },
    close() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      Object.assign(this.$data, initialState());
      this.errorMessage = null;
    },
  },
  watch: {
    defaultPeriod(newValue) {
      this.selectedPeriod = newValue;
    },
  },
  created() {
    if (this.defaultPeriod) {
      this.selectedPeriod = this.defaultPeriod;
    }
  },
  emits: ['select-period'],
};
</script>

<style></style>
