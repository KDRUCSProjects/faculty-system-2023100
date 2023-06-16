/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import router from '../router';
import store from '../store/index';

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router).use(store);

  // Global Mixins
  app.mixin({
    computed: {
      imageResource() {
        return 'http://localhost:4000/storage/images';
      },
    },
    methods: {
      buildAbbreviation(str) {
        // null length cannot be read, hence let's change it to string
        if (!str) str = '';
        let result = '';
        let upperCaseCount = 0;

        for (let i = 0; i < str.length; i++) {
          if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) {
            result += str[i];
            upperCaseCount++;
          }
        }

        if (upperCaseCount === 1 && str[0] === str[0].toUpperCase()) {
          result += str[str.length - 1];
        }

        return result.toUpperCase();
      },
    },
  });
}
