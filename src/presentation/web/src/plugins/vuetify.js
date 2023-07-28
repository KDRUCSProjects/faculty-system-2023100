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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
      rounded: 'xs',
    },
  },
  theme: {
    themes: {
      light: {
        // dark: true,
        colors: {
          primary: '#536DFE',
          secondary: '#00BFA5',
          dark: '#211A1D',
          red: '#B71C1C',
        },
      },
    },
  },
});

// Some best hex colors to choose from
// 1. #231E39
// 2. #3F51B5
// 3. #FF5722 (Deep Orange)
// 5E2BFF
