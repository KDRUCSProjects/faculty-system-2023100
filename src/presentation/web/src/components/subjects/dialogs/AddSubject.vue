<template>
  <div>
    <!-- Default Btn/Slot -->

    <v-dialog max-width="550" v-model="dialog" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> {{ $t('Add Subject') }} </v-btn>
          </slot>
        </div>
      </template>

      <v-card :loading="isLoading">
        <v-toolbar :color="'dark'">
          <v-toolbar-title class=""> {{ $t('Add New Subject') }} </v-toolbar-title>
        </v-toolbar>

        <v-card-item class="">
          <!-- <v-card-title>Add Subject</v-card-title> -->
          <v-card-subtitle> {{ $t('Fill in the blanks to add subject') }} </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="addSubjectForm">
            <v-text-field
              :rules="rules.name"
              v-model="name"
              type="text"
              variant="outlined"
              :label="$t('Subject Name')"
            ></v-text-field>
            <v-text-field
              :rules="rules.credit"
              v-model="credit"
              type="number"
              variant="outlined"
              :label="$t('Subject Credit')"
            ></v-text-field>
            <v-autocomplete
              v-model="teacherId"
              clearable
              :label="$t('Select Teacher')"
              :items="teachers"
              variant="outlined"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-form>
          <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Add Subject') }}</v-btn>
          <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['semesterId'],
  data: () => ({
    alert: false,
    dialog: false,
    teacherId: null,
    name: null,
    credit: null,
    show: true,
    isLoading: false,
    errorMessage: null,
  }),
  computed: {
    teachers() {
      return this.$store.getters['teachers/teachers'];
    },
    rules() {
      return {
        name: [(v) => !!v || this.$t('Please enter subject name')],
        credit: [(v) => !!v || this.$t('Please enter subject credits')],
      };
    },
  },
  methods: {
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.addSubjectForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        if (!this.semesterId) throw 'No Semester Id selected';

        const data = {
          name: this.name,
          credit: this.credit,
          teacherId: this.teacherId,
          semesterId: this.semesterId,
        };

        console.log(data);

        await this.$store.dispatch('subjects/addSubject', data);
        // Let's also reload teh current semester subjects again :)
        await this.$store.dispatch('semesters/loadSemesterById', this.semesterId);

        this.closeDialog();
      } catch (e) {
        // Show error message if happened
        this.errorMessage = e;
      } finally {
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.dialog = false;
      //   Also reset the form
      this.$refs.addSubjectForm.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
