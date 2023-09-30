<template>
  <v-overlay v-model="dialog" scrim="#000"></v-overlay>

  <v-btn variant="text" color="primary" prepend-icon="mdi-web">
    <slot> {{ selectedLanguage }}</slot>

    <v-dialog
      v-model="dialog"
      :max-width="modalWidth"
      activator="parent"
      transition="slide-y-transition"
      style="overflow: hidden"
    >
      <v-card class="mx-auto" width="250" max-width="400">
        <v-card-title class="bg-dark text-center"> {{ $t('Select App Language') }} </v-card-title>

        <v-virtual-scroll :items="items" height="300" item-height="50" class="my-1">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-btn v-if="item !== selectedLanguage" color="primary" variant="tonal" block @click="selectLanguage(item)">
                {{ item === 'en' ? 'English' : 'Pashto' }}
              </v-btn>
              <v-btn v-else color="primary" variant="flat" block @click="selectLanguage(item)">
                {{ item === 'en' ? 'English' : 'Pashto' }}
              </v-btn>
            </v-list-item>
          </template>
        </v-virtual-scroll>

        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="emitLanguage"> {{ $t('Select') }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script>
const initialState = () => ({
  dialog: false,
  selectedLanguage: null,
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
  },
  data: () => initialState(),
  computed: {
    items() {
      return ['en', 'pa'];
    },
  },
  methods: {
    selectLanguage(year) {
      this.selectedLanguage = year;
    },
    emitLanguage() {
      if (!this.selectedLanguage) return false;
      this.$emit('select-language', this.selectedLanguage);

      this.$i18n.locale = this.selectedLanguage;

      localStorage.setItem('language', this.selectedLanguage);

      //   Change app language=
      this.close();
    },
    close() {
      this.dialog = false;
      this.resetForm();
    },
  },
  currentElectedLanguage() {
    return this.$i18n.locale;
  },
  watch: {
    dialog(v) {
      if (!v) {
        this.selectedLanguage = this.$i18n.locale;
      }
    },
  },
  created() {
    // Get default language

    this.selectedLanguage = this.$i18n.locale;
  },
  emits: ['select-language'],
};
</script>

<style></style>
