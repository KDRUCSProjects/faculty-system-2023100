<template>
  <v-text-field
    :class="{ pashtoFont: $i18n.locale === 'pa' }"
    ref="theField"
    variant="outlined"
    v-model.number="field"
    @update:focused="update"
    :rules="maxValueRule"
    density="compact"
    :error="error"
    hide-details="true"
    class="baseUpdateField"
  ></v-text-field>
</template>
<script>
const initialState = () => ({
  field: null,
  errorMessage: null,
  error: false,
  fieldLabel: 'Field name',
});
export default {
  props: {
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
  },
  data: () => initialState(),
  computed: {
    disableUpdateButton() {
      return this.maxPhotoSize;
    },
  },
  methods: {
    update(focused) {
      //   Only on blur
      if (focused) return false;

      //   Reset error message
      this.error = false;

      // Check if value is not null and newValue and oldValue are not equal
      if (this.field === null) return false;
      if (this.field == this.fieldValue) return false;

      // Prevent characters
      const reg = new RegExp('^[0-9]+$');

      if (!reg.test(this.field)) {
        this.field = this.fieldValue;
        return this.$store.commit('setToast', [0, `Characters not allowed`], { root: true });
      }

      // Validate values
      if (this.maxValue) {
        if (this.field > this.maxValue) {
          this.error = true;
          // Set old value
          this.field = this.fieldValue;
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

<style scoped>
.baseUpdateField {
  width: 60px;
}

.baseUpdateField >>> input {
  text-align: center;
}
</style>
