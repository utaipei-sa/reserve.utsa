/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF00',

          primary: '#D3DCE8',
          'primary-2': '#97A8C0',
          'primary-3': '#607696',
          'primary-4': '#415878',
          'primary-lighten': '#E4EBF5',

          secondary: '#F5B9CC',
          'secondary-2': '#F390A1',
          'secondary-3': '#C7768A',
          'secondary-4': '#A45371',
          'secondary-lighten': '#FCECF1',

          accent: `#EB7347`,
          note: `#F1EFF6`,

          error: '#C62828',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          'info-light': '#BBDEFB',
          'success-light': '#E6F3EE',
          'success-dark': '#1F3029',
          'warning-light': '#FFCBB1',
          'error-dark': '#B00020'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi'
  }
});
