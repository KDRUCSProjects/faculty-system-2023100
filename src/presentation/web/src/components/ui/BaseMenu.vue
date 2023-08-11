<template>
  <div class="mx-1">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn :color="theme || 'primary'" variant="flat" v-bind="props">
          {{ displayPreText ? displayPreText + ' ' + selected : selected || defaultItem }}
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
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ['items', 'theDefault', 'theme', 'displayPreText'],
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
