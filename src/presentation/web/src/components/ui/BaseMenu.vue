<template>
  <div class="mx-1" :class="{ pashtoFont: $i18n.locale === 'pa' }">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn :color="theme || 'primary'" :variant="variant || 'flat'" v-bind="props" :block="block">
          {{ btnTitle }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="setItem(item)"
          :class="{ 'bg-primary': item === selected }"
          :variant="item === selected ? 'tonal' : 'flat'"
        >
          <v-list-item-title>
            <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
              {{ $t(item.toString()) }}
            </span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ['items', 'theDefault', 'theme', 'displayPreText', 'block', 'variant'],
  data: () => ({
    selected: null,
    defaultItem: null,
  }),
  methods: {
    setItem(item) {
      this.selected = item;
    },
  },
  watch: {
    selected(v) {
      this.$emit('selected', v);
    },
  },
  computed: {
    btnTitle() {
      return this.displayPreText
        ? this.$t(this?.displayPreText.toString()) + this.$t(this?.selected.toString())
        : this.$t(this?.selected.toString()) || this.$t(this?.defaultItem.toString());
    },
  },
  emits: ['selected'],
  created() {
    if (this.theDefault) {
      this.defaultItem = this.theDefault;
      this.selected = this.theDefault;
    } else if (this.items.length != 0) {
      this.defaultItem = this.items[0];
      this.selected = this.items[0];
    }
  },
};
</script>

<style lang="scss" scoped></style>
