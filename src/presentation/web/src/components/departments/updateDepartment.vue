<template>
    <div>
      <!-- Default Btn/Slot -->
      <v-btn :color="activatorColor" @click="getDepartment" :variant="activatorVariant" :prepend-icon="activatorIcon">
        {{ $t('Edit') }}
        <v-dialog max-width="550" activator="parent" v-model="dialog" transition="slide-y-transition">
          <v-card class="pa-1" :loading="isLoading">
            <v-card-text>
              <v-form @submit.prevent="submitForm" ref="updateDepartmentForm">
                <v-text-field :rules="rules.name" v-model="name" variant="outlined" :label="$t('Department Name')"></v-text-field>
              </v-form>
  
              <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
            </v-card-text>
            <v-card-actions class="mx-4">
              <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Update Department') }}</v-btn>
              <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </template>
  
  <script>
import { resolveComponent } from 'vue';
  export default {
    props: {
      departmentId: {
        type: Number,
      },
      activatorIcon: {
        type: String,
        default: 'mdi-pencil',
      },
      activatorVariant: {
        type: String,
        default: 'text',
      },
      activatorColor: {
        type: String,
        default: 'primary',
      },
    },
    data: () => ({
      alert: false,
      dialog: false,
      name: null,
      show: true,
      isLoading: false,
      errorMessage: null,
    }),
    computed: {
      rules() {
        return {
          name: [(v) => !!v || this.$t('Please enter Department name')],
        };
      },
    },
    methods: {
      async getDepartment() {
        console.log(this.departmentId)
        const response = await this.$store.dispatch('departments/loadDepartmentById', this.departmentId);
  
        if (!response.data) return false;
  
        console.log(response.data.name)
        this.name = response.data.name;
      },
      async submitForm() {
      
        // Validate the form first
        let { valid } = await this.$refs.updateDepartmentForm.validate();
  
        if (!valid) {
          return false;
        }
  
        //   Start loader
        this.isLoading = true;
        try {
          const data = {
            departmentId: this.departmentId,
            // Data starts here...
            name: this.name,
          };
  
       
          await this.$store.dispatch('departments/updateDepartment', data);
  
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
        // tell parent that the windows is closed
        this.$emit('dialog-close');
      },
    },
    emits: ['dialog-close'],
    async created() {
      await this.getDepartment();
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  