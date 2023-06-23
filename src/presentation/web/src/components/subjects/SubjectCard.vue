<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro">  </span> -->
    
    <v-card-title class="pb-0">{{ subjectName }}</v-card-title>
    <v-card-subtitle class="py-1 text-h6 " style="font-family: monospace">
      {{ teacherName }}
    </v-card-subtitle>
    <v-card-subtitle class="text-primary ">{{ semesterTitle }}</v-card-subtitle>
    <v-card-subtitle class="text-primary ">{{ subjectCredit }} Credit</v-card-subtitle>

    
      <v-card-actions class="mt-2 ">
      <v-btn color="primary" prepend-icon="mdi-pencil" variant="text">Edit</v-btn>
      <v-btn prepend-icon="mdi-delete" variant="text" color="error" @click="deleteSubject(subjectId)">
              Delete
            </v-btn>
      </v-card-actions>

    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
    <!-- Update Dialog -->
  </v-card>
</template>

<script>
export default {
  props: {
    subjectId: {
      type: Number
    },
    semesterTitle: {
      type: Number,
      default: 'No semester Title',
    },
    subjectName: {
      type: String, 
      default: 'No Subject Name',
    },
    subjectCredit: {
      type: Number, 
      default: 4,
    },
    teacherName: {
      type: String, 
      default: 'No Teacher Name',
    },
  },
 methods:{
  async deleteSubject(subjectId) {
      // Show confirm dialog by access it with $ref
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this Subject?',
        subtitle: subjectId,
        okButton: 'Yes',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      // Otherwise, continue deleting the subject from the database
      await this.$store.dispatch('subjects/deleteSubject', subjectId);
    },
 }
 
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
