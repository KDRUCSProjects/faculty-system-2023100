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
          <v-card-subtitle> {{ $t('Click the button to add new educational year') }} </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="addYearForm">
            <br>
            <h1 style="text-align: center;">{{ newYear = items[0].year + 1}}</h1>
            <br>
          </v-form>
          <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
        </v-card-text>
        <v-card-actions class=" mx-4">
          <v-btn class="mx-auto mb-2"   @click="submitForm" variant="flat"  :loading="isLoading">{{ $t('Add Year') }}</v-btn>
          <!-- <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn> -->
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
    newYear: 1394,
    show: true,
    isLoading: false,
    errorMessage: null,
  }),
  computed: {
    items() {
      return this.$store.getters['years/years'];
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
          educationalYear: this.newYear,
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
