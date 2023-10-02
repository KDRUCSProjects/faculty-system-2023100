<template>
  <div>
    <!-- Default Btn/Slot -->

    <v-dialog max-width="300" v-model="dialog" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> {{ $t('Download Attendance') }} </v-btn>
          </slot>
        </div>
      </template>

      <v-card :loading="isLoading">
        <v-toolbar :color="'dark'">
          <v-toolbar-title class=""> {{ $t('Generate Attendance Report') }} </v-toolbar-title>
        </v-toolbar>

        <v-card-item>
          <!-- <v-card-title>Add Subject</v-card-title> -->
          <v-card-subtitle> {{ $t('Pick start and end date of the report') }} </v-card-subtitle>
        </v-card-item>
        <v-card-text class="mx-auto">
          <DatePicker :is-dark="true" v-model.range="range"></DatePicker>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn
            @click="submitForm"
            variant="flat"
            :loading="isLoading"
            prepend-icon="mdi-download-circle"
            color="primary"
            download
            block
            >{{ $t('Download') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    DatePicker,
  },
  props: ['subjectId'],
  data: () => ({
    alert: false,
    dialog: false,
    isLoading: false,
    errorMessage: null,
    range: new Date(),
  }),
  computed: {},
  methods: {
    async submitForm() {
      // Validate the form first

      let { start, end } = this.range;
      if (!start || !end) {
        return this.$store.commit('setToast', [0, this.$t('Please select dates')]);
      }

      start = moment(start).format('YYYY-MM-DD');
      end = moment(end).format('YYYY-MM-DD');

      //   Start loader
      this.isLoading = true;
      try {
        let file = await this.$store.dispatch('subjects/downloadSubjectAttendanceBySubjectId', {
          subjectId: this.subjectId,
          start,
          end,
        });

        this.downloadFile(file.data, 'Attendance Report');

        setTimeout(() => {
          this.isLoading = false;
        }, 300);
        this.closeDialog();
      } catch (e) {
        // Show error message if happened
        this.errorMessage = e;
      }
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
