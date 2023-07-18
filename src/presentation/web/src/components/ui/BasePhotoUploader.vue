<template>
  <div id="app">
    <file-pond
      :style="{ 'max-width': `${maxWidth}px` }"
      class="filepond"
      ref="pond"
      label-idle="Select profile image"
      v-bind:files="myFiles"
      accepted-file-types="image/jpeg, image/png"
      v-on:init="handleFilePondInit"
      imagePreviewHeight="170"
      imageCropAspectRatio="1:1"
      imageResizeTargetWidth="200"
      imageResizeTargetHeight="200"
      stylePanelLayout="compact circle"
      styleLoadIndicatorPosition="right bottom"
      styleButtonRemoveItemPosition="left bottom"
      @addfile="handleFile"
      @removefile="$emit('photo', null)"
    />
    <!-- <p v-if="photoSize" class="error">Can't upload the photo with size more than 2 mb</p> -->
  </div>

</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
  props: {
    defaultPhoto: {
      type: String,
    },
    maxWidth: {
      type: Number,
      default: 230,
    },
  },
  name: 'app',
  data: function () {
    return {
      myFiles: [],
      photoSize: false,
    };
  },
  methods: {
    handleFilePondInit: function () {
      // FilePond instance methods are available on `this.$refs.pond`
    },
    removeMassage: function () {
      console.log('clicked')
    },
    handleFile() {
      let theFile = this.$refs.pond._pond.getFile();

      if(theFile.fileSize > 1024 * 1024){

        this.photoSize = true
      
      }
      else{
        this.photoSize = false
      }
      
      this.$emit('photo', theFile.file || null)
      this.$emit('photo-size-change', this.photoSize)
    },
  },
  components: {
    FilePond,
  },
  emits: ['photo'],
  created() {
    if (this.defaultPhoto) {
      this.myFiles.push(`${this.imagesResource}/${this.defaultPhoto}`);
    }
  },
};
</script>
<style>
.filepond {
  margin-left: auto;
  margin-right: auto;
}

.error{
  color: red
}
</style>
