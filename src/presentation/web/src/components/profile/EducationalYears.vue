<template>
  <v-card class="mx-auto pa-1 theShadow" max-width="500" :loading="loader">
    <add-educational-year>
      <v-btn size="large" variant="tonal" color="dark" block prepend-icon="mdi-plus"> New Educational Year </v-btn>
    </add-educational-year>
    <v-list>
      <div v-for="year in items" :key="year">
        <v-list-item v-if="!year.onGoing">
          <v-list-item-title class="font-weight-bold text-primary">
            {{ year.year }}
          </v-list-item-title>
          <v-list-item-subtitle style="font-size: 13px"> Addition Date: {{ year.createdAt }} </v-list-item-subtitle>
          <template v-slot:append>
            <!-- <v-btn color="error" icon="mdi-delete-outline" variant="text"></v-btn> -->
            <v-btn color="grey-lighten-1" icon="mdi-select" variant="text" @click="setOnGoingYear(0, year.year)"></v-btn>
          </template>
        </v-list-item>
        <v-list-item class="bg-primary text-light" v-if="year.onGoing">
          <v-list-item-title class="font-weight-bold">
            {{ year.year }}
          </v-list-item-title>
          <v-list-item-subtitle style="font-size: 13px"> Addition Date: {{ year.createdAt }} </v-list-item-subtitle>
          <template v-slot:append>
            <!-- <v-btn color="grey-lighten-1" icon="mdi-select-remove" variant="text" v-if="year"></v-btn> -->

            <!-- ----------- -->

            <v-chip-group mandatory selected-class="text-light" v-model="currentHalf" @update:model-value="updateYearHalf">
              <v-chip filter="" v-for="(half, i) in yearHalfs" :key="i">
                {{ half }}
              </v-chip>
            </v-chip-group>

            <v-btn color="light" icon="mdi-select-remove" variant="text"></v-btn>
          </template>
        </v-list-item>
        <v-list-item class="mt-2" v-if="year.onGoing">
          <v-form @submit.prevent="setTimes(year.id)">
            <v-row>
              <v-col cols="6"
                ><v-text-field class="mt-2" variant="outlined" v-model.number="startDate" label="Semester Start Date">
                </v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field class="mt-2" variant="outlined" v-model.number="endDate" label="Semester End Date">
                </v-text-field
              ></v-col>
            </v-row>
            <v-btn block size="large" color="primary" variant="tonal" @click="setTimes(year.id)"
              >Update Interval Dates</v-btn
            >
          </v-form>
        </v-list-item>
      </div>
    </v-list>

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
    yearHalfs: ['1st Half', '2nd Half'],
    currentHalf: 0,
    loader: false,
    startDate: null,
    endDate: null,
  }),
  methods: {
    async updateYearHalf(v) {
      await this.setOnGoingYear(v);
    },
    closeMenu() {
      // For some reasons, the dialog won't close when the item is clicked in the menu in Vuetify 3 when using a dialog. Let's use this hack for now.
      this.menu = false;
    },
    async setOnGoingYear(year, theYear) {
      // Setting current ongoing year
      this.loader = true;
      await this.$store.dispatch('years/setCurrentOnGoingYear', {
        year: theYear || this.$store.getters['years/onGoingYear'].year,
        half: year,
      });

      this.updateTimes();

      this.loader = false;
    },
    async setTimes(yearId) {
      // Setting current ongoing year
      this.loader = true;
      let prefix = 'first';
      if (this.currentHalf !== 0) {
        prefix = 'Second';
      }

      await this.$store.dispatch('years/updateEducationalYear', {
        yearId,
        data: {
          [prefix + 'HalfStart']: this.startDate,
          [prefix + 'HalfEnd']: this.endDate,
        },
      });

      this.loader = false;
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
    updateTimes() {
      const yearData = this.$store.getters['years/onGoingYearData'];
      let prefix = 'first';
      if (this.currentHalf !== 0) {
        prefix = 'Second';
      }
      this.startDate = yearData[prefix + 'HalfStart'];
      this.endDate = yearData[prefix + 'HalfEnd'];
    },
  },
  computed: {
    items() {
      return this.$store.getters['years/years'];
    },
  },
  created() {
    // Set current year half
    // But first, let's load current year
    this.currentHalf = this.$store.getters['years/onGoingYear']?.firstHalf ? 0 : 1;

    // Set starting and ending dates
    this.updateTimes();
  },
};
</script>
