<template>
  <v-card class="d-flex justify-center align-left flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro">  </span> -->
    <v-img
        src="../../assets/images/big data.jpg"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        width="300"
        cover
        >
        <v-card-title class="text-white">Author</v-card-title>
        </v-img>
    <v-card-title class="pb-0">Software Engineering</v-card-title>
    <v-card-subtitle class="py-1 text-h6 " style="font-family: monospace">
      Naveed Hematmal
    </v-card-subtitle>
    <v-card-subtitle class="text-primary ">5th Semester</v-card-subtitle>

    
      <v-card-actions class="mt-2 ">
      <v-btn color="primary" variant="elevated">Edit</v-btn>
      <v-btn color="red" variant="elevated"> Delete</v-btn> 
      </v-card-actions>

    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
    <!-- Update Dialog -->
  </v-card>
</template>