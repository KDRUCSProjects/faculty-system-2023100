<template>
  <div>
    <!-- Default Btn/Slot -->

    <v-dialog
      max-width="550"
      activator="parent"
      v-model="dialog"
      transition="slide-y-transition"
      :class="{ pashtoFont: $i18n.locale === 'pa' }"
    >
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot>
            <v-btn color="primary"> {{ $t('Update Subject') }} </v-btn>
          </slot>
        </div>
      </template>
      <v-card class="pa-1" :loading="isLoading" :class="{ pashtoFont: $i18n.locale === 'pa' }">
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="updateSubjectForm">
            <v-text-field :rules="rules.name" v-model="name" variant="outlined" :label="$t('Subject Name')"></v-text-field>
            <v-text-field
              :rules="rules.pashtoName"
              v-model="pashtoName"
              variant="outlined"
              :label="$t('Subject Pashto Name')"
            ></v-text-field>
            <v-text-field
              :rules="rules.credit"
              v-model="credit"
              type="number"
              variant="outlined"
              :label="$t('Subject Credit')"
            ></v-text-field>
            <v-text-field
              :rules="rules.codeNumber"
              v-model="codeNumber"
              type="text"
              variant="outlined"
              :label="$t('Subject Code Number')"
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
          <v-btn @click="submitForm" variant="flat" :loading="isLoading">{{ $t('Update Subject') }}</v-btn>
          <v-btn @click="closeDialog" color="error">{{ $t('Cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  inject: ['semesterId'],
  props: {
    subjectId: {
      type: Number,
    },
    activatorIcon: {
      type: String,
      default: 'mdi-pencil',
    },
    activatorVariant: {
      type: String,
      default: 'text',
    },
    activatorColor: {
      type: String,
      default: 'primary',
    },
  },
  data: () => ({
    alert: false,
    dialog: false,
    name: null,
    pashtoName: null,
    credit: null,
    codeNumber: null,
    teacherId: null,
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
        pashtoName: [(v) => !!v || this.$t('Please enter subject pashto name')],
        credit: [(v) => !!v || this.$t('Please enter subject credits')],
        codeNumber: [(v) => !!v || this.$t('Please enter subject code number')],
      };
    },
  },
  methods: {
    async setSubject() {
      const response = await this.$store.dispatch('subjects/loadSubjectById', this.subjectId);

      if (!response.data) return false;

      this.name = response.data.name;
      this.pashtoName = response.data.pashtoName;
      this.credit = response.data.credit;
      this.teacherId = response.data.teacherId;
      this.codeNumber = response.data.codeNumber;
    },
    async submitForm() {
      // Validate the form first
      let { valid } = await this.$refs.updateSubjectForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        const data = {
          subjectId: this.subjectId,
          // Data starts here...
          name: this.name,
          pashtoName: this.pashtoName,
          credit: this.credit,
          teacherId: this.teacherId,
          codeNumber: this.codeNumber,
        };

        await this.$store.dispatch('subjects/updateSubject', data);
        // Plus, update the semester subjects
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
      // tell parent that the windows is closed
      this.$emit('dialog-close');
    },
  },
  emits: ['dialog-close'],
  async created() {
    await this.setSubject();
  },
};
</script>

<style lang="scss" scoped></style>
