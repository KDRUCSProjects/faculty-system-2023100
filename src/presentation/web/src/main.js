/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

const app = createApp(App);

// import global components
import BaseContents from '@/layouts/BaseContents.vue';
import BaseConfirmDialog from '@/components/ui/BaseConfirmDialog.vue';
import BasePhotoUploader from '@/components/ui/BasePhotoUploader.vue';

// Register global components
app.component('base-contents', BaseContents);
app.component('base-confirm-dialog', BaseConfirmDialog);
app.component('base-photo-uploader', BasePhotoUploader);

registerPlugins(app);

app.mount('#app');
