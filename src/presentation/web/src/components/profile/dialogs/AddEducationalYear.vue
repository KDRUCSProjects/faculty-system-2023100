<template>
  <div>
    <!-- Default Btn/Slot -->
    <v-dialog max-width="450" activator="parent" v-model="dialog" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary" prepend-icon="mdi-plus"> {{ $t('Add New Educational Year') }} </v-btn>
          </slot>
        </div>
      </template>
      <v-card class="pa-1" :loading="isLoading">
        <v-card-item>
          <v-card-title>{{ $t('Add Educational Year') }}</v-card-title>
          <v-card-subtitle> {{ $t('Fill in the blanks to add educational year') }} </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="addYearForm">
            <v-text-field
              :rules="rules.educationalYear"
              v-model="educationalYear"
              type="text"
              variant="outlined"
              :label="$t('Enter Educational Year')"
            ></v-text-field>
          </v-form>
          <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Add Year') }}</v-btn>
          <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
    dialog: false,
    educationalYear: null,
    show: true,
    isLoading: false,
    errorMessage: null,
  }),
  computed: {
    rules() {
      return {
        educationalYear: [(v) => !!v || this.$t('Please enter Educational Year')],
      };
    },
  },
  methods: {
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.addYearForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        const data = {
          educationalYear: this.educationalYear,
        };
        await this.$store.dispatch('years/addEducationalYear', data);

        this.closeDialog();
      } catch (e) {
        // Show error message if happened
        console.log(e);
        this.errorMessage = e;
      } finally {
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.dialog = false;
      //   Also reset the form
      this.$refs.addYearForm.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
