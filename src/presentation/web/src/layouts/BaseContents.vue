<template>
  <div>
    <the-navigation></the-navigation>
    <the-appbar>
      <slot name="bar"></slot>
    </the-appbar>

    <div class="pa-2 ma-2">
      <slot>
        <!-- contents goes in here -->
      </slot>
    </div>
  </div>
</template>

<script>
import TheNavigation from './TheNavigation.vue';
import TheAppbar from './TheAppbar.vue';
export default {
  components: {
    TheNavigation,
    TheAppbar,
  },
};
</script>

<style></style>
