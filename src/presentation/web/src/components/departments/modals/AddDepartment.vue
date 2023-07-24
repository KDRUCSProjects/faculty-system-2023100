<template>
    <div>
      <!-- Default Btn/Slot -->
      <v-btn color="primary" variant="flat">
        Add Department
  
        <v-dialog max-width="550" activator="parent" v-model="dialog" transition="slide-y-transition">
          <v-card class="pa-1" :loading="isLoading">
            <v-card-item>
              <v-card-title>Add Department</v-card-title>
              <v-card-subtitle>
                Fill in the blank to add department
              </v-card-subtitle>
            </v-card-item>
            <v-card-text> 
              <v-form  @submit.prevent="submitForm" ref="addDepartmentForm">
                <v-text-field :rules="rules.name" v-model="name" type="text" variant="outlined" label="Department Name"></v-text-field>                
              </v-form>
              <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
            </v-card-text>
            <v-card-actions class="mx-4">
              <v-btn @click="submitForm" variant="flat" :loading="isLoading">Add Department</v-btn>
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
          name: [(v) => !!v || 'Please enter Department  Name'],
        };
      },
    },
    methods: {
      async submitForm() {
        // Validate the form first
        let { valid } = await this.$refs.addDepartmentForm.validate();
  
        if (!valid) {
          return false;
        }
  
        //   Start loader
        this.isLoading = true;
  
        try {
          const data = {
            name: this.name
          }
          await this.$store.dispatch('departments/addDepartment', data);
  
          this.closeDialog();
        } catch (e) {
          // Show error message if happened
          console.log(e)
          this.errorMessage = e;
        } finally {
          this.isLoading = false;
        }
      },
      closeDialog() {
        this.dialog = false;
        //   Also reset the form
        this.$refs.addDepartmentForm.reset();
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  