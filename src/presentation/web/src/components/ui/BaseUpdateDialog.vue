<template>
  <v-overlay v-model="dialog" scrim="#000"></v-overlay>

  <slot>
    <v-btn :variant="variant" :color="color">{{ $t('Update') }}</v-btn>
  </slot>

  <v-dialog
    v-model="dialog"
    :max-width="modalWidth"
    transition="slide-y-transition"
    :persistent="persistent"
    activator="parent"
  >
    <v-card :class="{ pashtoFont: $i18n.locale === 'pa' }">
      <v-card-item>
        <v-card-title class="font-weight-bold">
          <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
            {{ title }}
          </span>
        </v-card-title>
        <v-card-subtitle :class="{ pashtoFont: $i18n.locale === 'pa' }">{{ $t(subtitle) }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-form @submit.prevent="update">
          <div v-if="type === 'autocomplete'">
            <v-autocomplete v-model="field" :label="fieldLabel" :items="validValues"></v-autocomplete>
          </div>
          <div v-else-if="type === 'date'" class="mx-auto text-center">
            <DatePicker :is-dark="true" v-model="field"></DatePicker>
          </div>
          <div v-else>
            <v-text-field v-if="!photo" ref="theField" variant="outlined" :label="fieldLabel" v-model="field"></v-text-field>
            <base-photo-uploader
              :modalWidth="modalWidth"
              @photo="setPhoto"
              @photo-size-change="handlePhotoSize"
              :inputTitle="inputTitle"
              v-else
            ></base-photo-uploader>
          </div>
        </v-form>
        <v-alert v-if="errorMessage" type="error" variant="outlined" :text="errorMessage"></v-alert>
      </v-card-text>
      <v-card-actions class="mx-2">
        <v-btn variant="elevated" class="ma-1 px-10" color="primary" @click="update" :disabled="disableUpdateButton">
          {{ $t('Update') }}
        </v-btn>
        <v-btn variant="tonal" class="ma-1" color="error" @click="cancel"> {{ $t('Cancel') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
const initialState = () => ({
  dialog: false,
  field: null,
  errorMessage: null,
  title: 'Update field name',
  subtitle: 'Click update to continue updating...',
  fieldLabel: 'Field name',
  maxPhotoSize: false,
});

import moment from 'moment';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

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
    title: {
      type: String,
      default: 'Update field name',
    },
    subtitle: {
      type: String,
      default: 'Click update to continue',
    },
    fieldLabel: {
      type: String,
      default: 'Field name',
    },
    fieldName: {
      type: String,
      default: 'Field name',
    },
    fieldValue: {
      type: String,
      required: true,
    },
    photo: {
      type: Boolean,
      default: false,
    },
    rowId: {
      type: Number,
      default: null,
    },
    data: {
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    variant: {
      type: String,
      default: 'flat',
    },
    maxValue: {
      type: Number,
    },
    inputTitle: {
      type: String,
    },
    type: {
      type: String,
    },
    validValues: {
      type: Array,
    },
  },
  data: () => initialState(),
  computed: {
    disableUpdateButton() {
      return this.maxPhotoSize;
    },
  },
  components: {
    DatePicker,
  },
  methods: {
    setPhoto(photo) {
      this.field = photo;
    },
    update() {
      // Validate values
      if (this.maxValue) {
        if (this.field > this.maxValue) {
          return this.$store.commit('setToast', [0, `Maximum ${this.maxValue} value is allowed`], { root: true });
        }
      }

      const data = {
        field: this.fieldName,
        fieldValue: this.field,
      };

      if (this.data) data.data = this.data;
      if (this.rowId) data.rowId = this.rowId;
      this.$emit('update', data);

      // Now close the dialog
      this.cancel();
    },
    handlePhotoSize: function (photoSize) {
      this.maxPhotoSize = photoSize;
      console.log(this.maxPhotoSize);
      if (this.maxPhotoSize) {
        return this.$store.commit('setToast', [0, this.$t('Photo size should be lesser than 2 MB!')]);
      }
    },
    cancel() {
      this.dialog = false;
      // this.resetForm();
    },
    resetForm() {
      Object.assign(this.$data, initialState());
      this.errorMessage = null;
    },
  },
  emits: ['update'],
  mounted() {
    if (this.fieldValue) {
      this.field = this.fieldValue;
    }

    // Focus the only input. For some reasons, native focus is not working
  },
};
</script>

<style></style>
