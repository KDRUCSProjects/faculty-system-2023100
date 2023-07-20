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
        <v-card-title class="bg-dark"> Select Educational Year </v-card-title>

        <v-virtual-scroll :items="items" height="300" item-height="50" class="my-1">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-btn v-if="item !== selectedYear" color="secondary" variant="tonal" block @click="selectYear(item)">
                {{ item }}
              </v-btn>
              <v-btn v-else color="secondary" variant="flat" block @click="selectYear(item)"> {{ item }} </v-btn>
            </v-list-item>
          </template>
        </v-virtual-scroll>

        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="emitYear"> Select </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script>
const initialState = () => ({
  dialog: false,
  selectedYear: null,
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
    defaultYear: {
      type: Number,
    },
  },
  data: () => initialState(),
  computed: {
    items() {
      return this.$store.getters['years/years']?.map((year) => year.year);
    },
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year;
    },
    emitYear() {
      if (!this.selectedYear) return false;
      this.$emit('select-year', this.selectedYear);
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
    defaultYear(newValue) {
      this.selectedYear = newValue;
    },
  },
  created() {
    if (this.defaultYear) {
      this.selectedYear = this.defaultYear;
    }
  },
  emits: ['select-year'],
};
</script>

<style></style>
