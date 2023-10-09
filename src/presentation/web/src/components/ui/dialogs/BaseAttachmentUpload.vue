<template>
  <v-overlay v-model="dialog" scrim="#000"></v-overlay>

  <v-btn variant="tonal" color="dark" prepend-icon="mdi-file-document">
    <slot> {{ $t('View Attachment') }} </slot>

    <v-dialog class="ma-5" v-model="dialog" fullscreen="" activator="parent" transition="slide-y-transition">
      <v-card>
        <v-card-item>
          <v-card-title class="font-weight-bold">
            <span :class="{ pashtoFont: $i18n.locale === 'pa' }">
              {{ $t('Upload Attachment') }}
            </span>
          </v-card-title>
          <v-card-subtitle :class="{ pashtoFont: $i18n.locale === 'pa' }">
            {{ $t('View and update your attachment file') }}</v-card-subtitle
          >

          <div class="update_dialog d-flex" :class="{ toLeft: $i18n.locale === 'pa' }">
            <!-- Enable remove only for admins -->
            <v-btn
              v-if="attachment && isAdmin"
              variant="tonal"
              color="error"
              size="small"
              class="mx-1"
              @click="removePhoto"
              >{{ $t('Remove') }}</v-btn
            >

            <!-- Disable Post Requests now -->
            <div v-if="!attachment">
              <base-update-dialog
                ref="profilePhotoDialog"
                :photo="true"
                :title="$t('Select a scan')"
                :subtitle="$t('Make sure the image is clear')"
                :inputTitle="$t('Select image')"
                @update="uploadPhoto"
              >
                <v-btn color="primary" variant="flat" size="small">{{
                  attachment ? 'Update' : 'Upload' + ' Attachment'
                }}</v-btn>
              </base-update-dialog>
            </div>

            <div style="position: relative; top: -4px" class="mx-1">
              <v-btn icon="mdi-close" variant="text" color="error" size="small" @click="dialog = false"></v-btn>
            </div>
          </div>
        </v-card-item>

        <v-card-text>
          <!-- <div
            class="d-flex justify-center"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
          >
            No file found
          </div> -->

          <v-img v-if="attachment" aspect-ratio="16/9" :src="`${this.imagesResource}/${this.attachment}`"> </v-img>

          <div class="text-center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" v-else>
            <v-card-subtitle class="text-error my-1" :class="{ pashtoFont: $i18n.locale === 'pa' }">{{
              $t('No file found')
            }}</v-card-subtitle>
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
  computed: {
    isAdmin() {
      return this.$store.getters['isAdmin'];
    },
  },
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
    removePhoto() {
      this.$emit('upload-photo', null);
    },
  },
  created() {},
};
</script>

<style scoped>
.update_dialog {
  position: absolute;
  top: 30px;
  right: 30px;
}

.toLeft {
  left: 30px !important;
  right: auto;
}
</style>
