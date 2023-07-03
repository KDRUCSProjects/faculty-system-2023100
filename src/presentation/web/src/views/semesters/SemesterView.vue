<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-card-title> Semester 1 </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="7">
        <router-view>
          <students-list :students="students"></students-list>
        </router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StudentsList from '@/components/students/StudentsList.vue';
export default {
  components: {
    StudentsList,
  },
  data: () => ({
    students: [
      {
        yearId: 1,
        year: 1390,
        semId: 1,
        semTitle: 1,
        semEducationalYearId: 1,
        studentId: 8,
        studentFullName: 'Lavada Fay',
        studentKankorId: 'prhw89bp',
      },
      {
        yearId: 1,
        year: 1390,
        semId: 1,
        semTitle: 1,
        semEducationalYearId: 1,
        studentId: 4,
        studentFullName: 'Ashlynn Hahn',
        studentKankorId: 'dggh21y1',
      },
    ],
  }),
  props: {
    id: {
      type: String,
    },
  },
};
</script>
