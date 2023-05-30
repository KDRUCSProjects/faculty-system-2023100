<template>
  <div>
    <base-contents>
      <v-btn @click="addTeacher">{{ textButton }}</v-btn>

      <v-list>
        <v-list-item v-for="teacher in teachers">{{ teacher.name }}</v-list-item>
      </v-list>

      {{ name + lastName }}

      <v-btn @click="loadTeachers">Reload Data</v-btn>
    </base-contents>
  </div>
</template>

<script>
export default {
  name: 'Test Page',
  props: [],
  components: {},
  data: () => ({
    textButton: 'Add teacher',
    teachers: [],
  }),
  methods: {
    showAlert() {
      alert('');
    },
    clearText() {
      this.textButton = 'Empty';
    },
    async loadTeachers() {
      //GEtting data from API
      return [
        { age: 18, name: 'Shams' },
        { age: 29, name: 'Khalil' },
      ];
    },
    addTeacher() {},
  },
  async created() {
    // this.teachers = await this.loadTeachers();
    // this.showAlert();
  },
};
</script>

<style scoped></style>
