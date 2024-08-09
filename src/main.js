/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import vuetify from './plugins/vuetify';

const app = createApp(App).use(vuetify);

registerPlugins(app);

app.mount('#app');
