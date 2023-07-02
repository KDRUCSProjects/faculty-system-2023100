<template>
    <v-card class="d-flex justify-center align-center flex-column pa-2 py-5 theShadow rounded" style="height: '200px'; margin-left: 1%; display: flex; flex: 1;" >
      <!-- <span class="pro">  </span> -->
      <!-- <v-avatar class="my-3" size="120" color="secondary" variant="tonal">
        
      </v-avatar> -->
      <!-- <v-card-title class="pb-0">{{ fullName }}</v-card-title> -->
      <v-card-subtitle class="py-0 my-0" style="font-family: monospace; font-size: larger;">
        {{ name || 'Course' }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <!-- <v-card-subtitle class="text-primary">{{ email }}</v-card-subtitle> -->
  
      <v-card-actions class="mt-3" >
        <v-btn color="secondary" variant="tonal"> Edit </v-btn>
        <v-btn color="error" variant="elevated" @click="deleteDepartment()">Delete</v-btn>
  
        <!-- <v-menu transition="slide-y-transition" elevation="0" v-model="menu">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon>
              <v-icon icon="mdi-dots-vertical"></v-icon>
            </v-btn>
          </template>

        </v-menu> -->
      </v-card-actions>
  
      <!-- All Dialogs -->
      <!-- Delete Dialog -->
      <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
      <!-- Update Dialog -->
    </v-card>
  </template>
  
  <script>
//   import UpdateTeacher from './dialogs/UpdateTeacher.vue';
  export default {
    // components: {
    //   UpdateTeacher,
    // },
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
    computed: {
    },
    methods: {
      closeMenu() {
        // For some reasons, the dialog won't close when the item is clicked in the menu in Vuetify 3 when using a dialog. Let's use this hack for now.
        this.menu = false;
      },
      async deleteDepartment() {
        let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this Subject?',
        // subtitle: subjectId,
        okButton: 'Yes',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }
      console.log('clicked')
      await this.$store.dispatch('subjects/deleteSubject', subjectId);
      }
    },
    emits: ['update-teacher'],
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
  