<template>
    <v-card class="d-flex justify-center align-center flex-column pa-2 py-5 theShadow rounded" style="height: '200px'; margin-left: 1%; display: flex; flex: 1;" >
      <v-card-item>
        <v-card-title class="py-0 my-0" style="font-family: monospace; font-size: larger;">
        {{ name || 'Course' }}
      </v-card-title>
      </v-card-item>
    
  
      <v-card-actions class="mt-3" >
        <!-- <v-btn color="secondary" variant="tonal"> Edit </v-btn> -->
        <update-department :departmentId="id"  activator-color="primary"> </update-department> 
        <v-btn prepend-icon="mdi-delete" color="error" variant="text" @click="deleteDepartment(id)">Delete</v-btn>

      </v-card-actions>
  
      <!-- All Dialogs -->
      <!-- Delete Dialog -->
      <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
      <!-- Update Dialog -->
    </v-card>
  </template>
  
  <script>
import updateDepartment from './updateDepartment.vue';
  // import UpdateDepartment from './updateDepartment.vue';
  export default {
  components: { updateDepartment },
    
    data: () => ({
      menu: false,
    }),
    props: {
      id: {
        type: Number,
      },
      name: {
        type: String,
        default: 'Java Script',
      },
    },
    methods: {
      closeMenu() {
        // For some reasons, the dialog won't close when the item is clicked in the menu in Vuetify 3 when using a dialog. Let's use this hack for now.
        this.menu = false;
      },
      async deleteDepartment(id) {
        let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this Subject?',
        subtitle: id,
        okButton: 'Yes',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }
    
      await this.$store.dispatch('departments/deleteDepartment', id);
      }
    },
    emits: ['update-department'],
  };
  </script>
  
  <style scoped>
  .pro {
    color: #231e39;
    background-color: #febb0b;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    padding: 3px 7px;
    position: absolute;
    top: 30px;
    left: 30px;
  }
  
  .theShadow {
    -webkit-box-shadow: 0 0 37px rgb(8 21 66 / 5%);
    box-shadow: 0 0 37px rgb(8 21 66 / 5%) !important;
    border-radius: 10px;
  }
  
  .v-card {
    /* border: 1px dotted '#333333'; */
  }
  
  .v-avatar {
    /* border: 1px solid rgb(var(--v-theme-primary)); */
  }
  </style>
  