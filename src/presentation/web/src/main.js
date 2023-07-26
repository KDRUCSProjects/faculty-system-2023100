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
import BaseConfirmPassword from '@/components/ui/BaseConfirmPassword.vue';
import BaseUpdateDialog from '@/components/ui/BaseUpdateDialog';
import BaseSelectYearDialog from '@/components/ui/dialogs/BaseSelectYear.vue';
import BaseToast from '@/components/ui/BaseToast.vue';
import BaseAutoCompleteYear from '@/components/ui/BaseAutoCompleteYear.vue';
import BaseMenu from '@/components/ui/BaseMenu.vue';
import i18n from './i18n';

// Register global components
app.component('base-contents', BaseContents);
app.component('base-confirm-dialog', BaseConfirmDialog);
app.component('base-photo-uploader', BasePhotoUploader);
app.component('base-confirm-password', BaseConfirmPassword);
app.component('base-update-dialog', BaseUpdateDialog);
app.component('base-select-year-dialog', BaseSelectYearDialog);
app.component('base-toast', BaseToast);
app.component('base-autocomplete-year', BaseAutoCompleteYear);
app.component('base-menu', BaseMenu);


registerPlugins(app);


app.use(i18n).mount('#app');
