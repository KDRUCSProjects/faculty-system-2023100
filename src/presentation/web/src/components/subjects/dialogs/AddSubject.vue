<template>
  <div>
    <!-- Default Btn/Slot -->
    <v-btn color="primary" variant="flat">
      Add Subject

      <v-dialog max-width="550" activator="parent" v-model="dialog">
        <v-card class="pa-1" :loading="isLoading">
          <v-card-text>
            <v-form >
              <base-photo-uploader></base-photo-uploader>

              <v-text-field type="text" variant="outlined" label="Subject Name"></v-text-field>
              <v-text-field type="text" variant="outlined" label="Subject Code"></v-text-field>
              <v-text-field variant="outlined" label="Teacher"></v-text-field>
              <v-text-field variant="outlined" label="Semester"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="mx-4">
            <v-btn variant="flat">Add Subject</v-btn>
            <v-btn>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  }
</script>

<style lang="scss" scoped></style>
