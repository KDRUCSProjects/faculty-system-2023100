<template>
  <div id="app">
    <file-pond
      class="filepond"
      name="test"
      ref="pond"
      label-idle="Select profile image"
      accepted-file-types="image/jpeg, image/png"
      server="/api/users"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      imagePreviewHeight="170"
      imageCropAspectRatio="1:1"
      imageResizeTargetWidth="200"
      imageResizeTargetHeight="200"
      stylePanelLayout="compact circle"
      styleLoadIndicatorPosition="right bottom"
      styleButtonRemoveItemPosition="left bottom"
    />
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
  name: 'app',
  data: function () {
    return { myFiles: ['cat.jpeg'] };
  },
  methods: {
    handleFilePondInit: function () {
      console.log('FilePond has initialized');

      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
  components: {
    FilePond,
  },
};
</script>
<style>
.filepond {
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
}
</style>
