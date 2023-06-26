<template>
  <div>
    <!-- Default Btn/Slot -->
    <v-btn color="primary" variant="flat">
      Add Subject

      <v-dialog max-width="550" activator="parent" v-model="dialog">
        <v-card class="pa-1" :loading="isLoading">
          <v-card-text>
            <v-form  @submit.prevent="submitForm" ref="addSubjectForm">
              <v-text-field :rules="rules.name" v-model="name" type="text" variant="outlined" label="Subject Name"></v-text-field>
              <v-text-field :rules="rules.credit" v-model="credit" type="number" variant="outlined" label="Subject Credit"></v-text-field>
              
            </v-form>
            <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
          </v-card-text>
          <v-card-actions class="mx-4">
            <v-btn @click="submitForm" variant="flat" :loading="isLoading">Add Subject</v-btn>
            <v-btn @click="closeDialog" color="error">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
    dialog: false,
    name: null,
    credit: null,
    show: true,
    isLoading: false,
    errorMessage: null,
  }),
  computed: {
    rules() {
      return {
        name: [(v) => !!v || 'Please enter Subject  Name'],
        credit: [(v) => !!v || 'Please enter Subject Credit'],
      };
    },
  },
  methods: {
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.addSubjectForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        const data = {
          name: this.name,
          credit: this.credit,
          teacherId: 1,
          semesterId: 1
        };

        await this.$store.dispatch('subjects/addSubject', data);

        this.closeDialog();
      } catch (e) {
        // Show error message if happened
        this.errorMessage = e;
      } finally {
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.dialog = false;
      //   Also reset the form
      this.$refs.addSubjectForm.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
