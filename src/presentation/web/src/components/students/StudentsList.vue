<template>
  <div>
    <v-list>
      <v-list-item v-for="(student, index) in students" :key="index" :title="student.studentFullName"></v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['students'],
};
</script>

<style lang="scss" scoped></style>
