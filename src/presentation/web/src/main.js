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

// Register global components
app.component('base-contents', BaseContents);

registerPlugins(app);

app.mount('#app');
