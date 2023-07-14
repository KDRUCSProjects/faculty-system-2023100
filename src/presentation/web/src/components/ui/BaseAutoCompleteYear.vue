<template>
  <div>
    <v-autocomplete
      v-model="select"
      variant="outlined"
      prepend-inner-icon="mdi-calendar-month"
      :items="years"
      label="Select year"
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  data: () => ({
    select: null,
  }),
  computed: {
    years() {
      return this.$store.getters['years/years']?.map((year) => {
        return year.year;
      });
    },
  },
  watch: {
    select(val) {
      this.$emit('selected-year', val);
    },
  },
  emits: ['selected-year'],
};
</script>

<style lang="scss" scoped></style>
