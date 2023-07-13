<template>
  <v-card class="mx-auto pa-1" max-width="500">
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <v-row no-gutters>
            <v-col v-for="year in items" cols="6">
              {{ year.year }}
              <v-btn color="error" prepend-icon="mdi-delete" variant="text" @click="deleteYear(year.id)"></v-btn>
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <add-educational-year></add-educational-year>
    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </v-card>
</template>

<script>
import AddEducationalYear from '@/components/profile/dialogs/AddEducationalYear.vue';
export default {
  components: {
    AddEducationalYear,
  },
  data: () => ({
    menu: false,
  }),
  methods: {
    closeMenu() {
      // For some reasons, the dialog won't close when the item is clicked in the menu in Vuetify 3 when using a dialog. Let's use this hack for now.
      this.menu = false;
    },
    async deleteYear(yearId) {
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this Year?',
        subtitle: yearId,
        okButton: 'Yes',
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      await this.$store.dispatch('years/deleteEducationalYearById', yearId);
    },
  },
  computed: {
    items() {
      return this.$store.getters['years/years'];
    },
  },
};
</script>
