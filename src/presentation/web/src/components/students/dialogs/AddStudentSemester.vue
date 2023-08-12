<template>
  <div>
    <v-card class="theShadow border py-4 mt-2">
      <v-card-item>
        <!-- <v-card-title>Enroll Student</v-card-title> -->
        <v-card-subtitle>{{ $t('Find student and then add to semester') }}</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-form @submit.prevent="submitForm" ref="findStudentForm">
          <v-text-field
            variant="solo"
            v-model="kankorId"
            :label="$t('Kankor ID')"
            append-inner-icon="mdi-magnify"
            @click:append-inner="findStudent"
            :loading="loading"
            :rules="rules.kankorId"
          ></v-text-field>
          <v-alert type="error" v-model="errorMessage" closable="" :text="errorMessage"> </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    kankorId: null,
    loading: false,
    errorMessage: null,
    student: null,
  }),
  methods: {
    async findStudent() {
      // Validate the form first
      let { valid } = await this.$refs.findStudentForm.validate();

      if (!valid) {
        return false;
      }

      //   Start loader
      this.isLoading = true;

      try {
        const student = await this.$store.dispatch('students/loadStudentByKankorId', this.kankorId);

        console.log(student);
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
  computed: {
    rules() {
      return {
        kankorId: [(v) => !!v || this.$t('Please enter student kankor id')],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
