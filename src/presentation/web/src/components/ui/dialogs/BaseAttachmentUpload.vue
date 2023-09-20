<template>
  <v-overlay v-model="dialog" scrim="#000"></v-overlay>

  <v-btn variant="tonal" color="dark" prepend-icon="mdi-file-document">
    <slot> View Attachment </slot>

    <v-dialog class="ma-5" v-model="dialog" fullscreen="" activator="parent" transition="slide-y-transition">
      <v-card>
        <v-card-item>
          <v-card-title class="font-weight-bold"> Upload Attachment </v-card-title>
          <v-card-subtitle> View and update your attachment file</v-card-subtitle>

          <v-spacer></v-spacer>
          <div class="float-right">
            <base-update-dialog
              color="primary"
              variant="tonal"
              ref="profilePhotoDialog"
              :photo="true"
              :title="$t('Update Attachment')"
              @update="uploadPhoto"
            >
              <v-btn color="primary" variant="outlined" size="small">{{ $t('Upload Attachment') }}</v-btn>
            </base-update-dialog>
          </div>
        </v-card-item>

        <v-card-text>
          <!-- <div
            class="d-flex justify-center"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
          >
            No file found
          </div> -->

          <v-img v-if="attachment" aspect-ratio="1/1" cover :src="`${this.imagesResource}/${this.attachment}`"></v-img>

          <div class="text-center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" v-else>
            <v-card-subtitle class="text-error my-1">No file found</v-card-subtitle>
          </div>
        </v-card-text>

        <!-- <v-card-actions>
          <v-btn color="primary" variant="flat" block> Save </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script>
const initialState = () => ({
  dialog: false,
  attachment: null,
});
export default {
  props: {
    modalWidth: {
      type: Number,
      default: 400,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  data: () => initialState(),
  computed: {},
  methods: {
    close() {
      this.dialog = false;
    },
    uploadPhoto(photo) {
      this.photo = photo;
      this.$emit('upload-photo', photo);
    },
    setPhoto(photo) {
      this.attachment = photo;
    },
  },
  created() {},
};
</script>

<style></style>
