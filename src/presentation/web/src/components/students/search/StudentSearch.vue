<template>
  <v-autocomplete
    @focus="clearError"
    v-model="select"
    :loading="loading"
    :items="items"
    v-model:search="search"
    :no-data-text="$t('No students available')"
    item-title="kankorId"
    :item-value="(item) => item"
    clearable
    hide-details
    :label="$t('Search by kankor id')"
    :error="emptyInput"
    :customFilter="customFilter"
    variant="outlined"
    prepend-inner-icon="mdi-identifier"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props">
        <template v-slot:title>
          <v-list-title>{{ item?.raw?.fullName }}</v-list-title>
        </template>
        <template v-slot:subtitle>
          <v-list-item-subtitle>{{ $t(' Kankor ID') }}: {{ item.raw.kankorId }} </v-list-item-subtitle>
        </template>
        <template v-slot:prepend>
          <v-avatar color="secondary" variant="tonal">
            <v-img v-if="item?.raw?.photo" :src="`${imagesResource}/${item?.raw?.photo}`" />
            <div v-else>
              <span class="">{{ buildAbbreviation(item?.raw?.fullName) }}</span>
            </div>
          </v-avatar>
        </template>
      </v-list-item>
    </template>

    <!-- <template v-slot:item="data">
        <template>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
          </v-list-item-content>
        </template>
      </template> -->
  </v-autocomplete>
  <!-- <v-btn
      :disabled="!select"
      color="
          primary"
      elevation="0"
      depressed
      large
      @click="emitSelectedDisease"
    >
      Select
    </v-btn> -->
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      emptyInput: false,
    };
  },
  watch: {
    async search(val) {
      val && val !== this.select && (await this.querySelections(val));
    },
    select() {
      this.emitSelectedStudent();
    },
  },
  methods: {
    customFilter() {
      // You can filter inside the items which one to return, but we left this job to be done at line 105
    },
    showError() {
      this.emptyInput = true;
    },
    clearError() {
      this.emptyInput = false;
    },
    emitSelectedStudent() {
      console.log(this.select);
      this.$emit('selected-student', this.select); // select => Object(Data) of selected Disease
    },
    async loadStudents(like = '') {
      await this.$store.dispatch('students/loadStudents', {
        limit: 15,
        page: 1,
        like,
      });
    },
    async querySelections() {
      this.loading = true;
      this.$emit('loading', true);
      // Simulated ajax query

      await this.loadStudents(this.search);

      this.items = this.students;

      this.loading = false;
      this.$emit('loading', false);

      // Also, emit these items:
      this.$emit('items', this.items);
    },
  },
  computed: {
    students() {
      return this.$store.getters['students/students'];
    },
  },
  emits: ['selected-student', 'loading'],
  async created() {
    // Fetch Diseases
    await this.$store.dispatch('students/loadStudents');
    this.items = this.students;

    console.log(this.items);
  },
};
</script>

<style>
/* Warning: This style is global */
#theToolbar {
  padding: 0px !important;
  margin: 0px !important;
  border: none !important;
  width: 100%;
}

#theToolbar .v-toolbar__content {
  padding: 0px !important;
  margin: 0px !important;
}
</style>
