<template>
  <div :class="{ pashtoFont: $i18n.locale === 'pa' }">
    <v-autocomplete
      v-model="select"
      variant="outlined"
      prepend-inner-icon="mdi-calendar-month"
      :items="years"
      :label="$t('Select year')"
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
  created() {
    this.select = this.$store.getters['years/onGoingYear']?.year;
  },
};
</script>

<style lang="scss" scoped></style>
