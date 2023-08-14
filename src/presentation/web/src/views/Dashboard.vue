<template>
  <div>
    <base-contents>
      <div class="cards-list">
        <v-row>
          <v-col class="pa-2" cols="4" v-for="(item, index) in statistics" :key="index">
            <v-card class="pa-3 theShadow">
              <v-card-title class="">
                <v-icon color="primary">{{ item.icon }}</v-icon>
                <span class="mx-4 med-size">{{ item.title }}</span>
                <span class="text-dark float-right med-size">
                  {{ item.value }}
                </span>
              </v-card-title>
              <!-- <v-card-text class="text-right">
                <span class="text-dark text-h6">
                  {{ item.value }}
                </span>
              </v-card-text> -->
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- 8 Semesters Statistics -->
      <div class="mt-5">
        <v-row>
          <v-col cols="4" class="theShadow">
            <recent-students-list></recent-students-list>
          </v-col>
          <v-col cols="8" class="theShadow">
            <base-bars :height="230" :datasets="semestersData" :labels="semestersLabels"></base-bars>
          </v-col>
        </v-row>
      </div>

      <!-- One-One Statistic -->

      <!-- <v-card class="theShadow pa-6">
        <v-card-item>
          <v-card-title> 1st Semester Statistics</v-card-title>
        </v-card-item>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <base-bars :height="400" :datasets="getSemesterStats.datasets" :labels="getSemesterStats.labels"></base-bars>
            </v-col>
            <v-col cols="6" ref="dnt">
              <base-bars :height="400" :datasets="getSemesterStats.datasets" :labels="getSemesterStats.labels"></base-bars>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> -->
    </base-contents>
  </div>
</template>

<script>
import BaseBars from '@/components/ui/charts/BaseBars.vue';
import BaseDoughnut from '@/components/ui/charts/BaseDoughnut.vue';
import RecentStudentsList from '@/components/students/RecentStudentsList.vue';
export default {
  components: {
    BaseBars,
    RecentStudentsList,
    BaseDoughnut,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    // getSemesterStats() {
    //   const labels = ['Total', 'Present', 'Taajil', 'Reentry', 'Monfaq', 'Tabdil'];

    //   // Labels are like these: present, taajil, reentry monfaq, tabdili
    //   let maleData = [10, 8, 2, 0, 0, 3];
    //   let femaleData = [3, 2, 1, 3, 5, 1];
    //   const datasets = [
    //     {
    //       label: this.$t('Male'),
    //       backgroundColor: '#400D51',
    //       data: maleData,
    //     },
    //     {
    //       label: this.$t('Female'),
    //       backgroundColor: '#536DFE',
    //       data: femaleData,
    //     },
    //   ];

    //   return {
    //     labels,
    //     datasets,
    //   };
    // },
    // getSemesterPieStats() {
    //   const labels = ['Present', 'Absent'];

    //   // Labels are like these: present, taajil, reentry monfaq, tabdili
    //   let data = [50, 20];
    //   const datasets = [
    //     {
    //       label: this.$t('Students'),
    //       backgroundColor: '#400D51',
    //       data,
    //     },
    //   ];

    //   return {
    //     labels,
    //     datasets,
    //   };
    // },

    semestersLabels() {
      return [
        '1st Semester',
        '2nd Semester',
        '3rd Semester',
        '4th Semester',
        '5th Semester',
        '6th Semester',
        '7th Semester',
        '8th Semester',
      ];
    },
    semestersData() {
      // Total, Present, Absent

      const stats = this.$store.getters['semesters/statistics'];

      console.log(stats);

      const maleData = [
        stats?.semesters[0]?.male.total,
        stats?.semesters[1]?.male.total,
        stats?.semesters[2]?.male.total,
        stats?.semesters[3]?.male.total,
        stats?.semesters[4]?.male.total,
        stats?.semesters[5]?.male.total,
        stats?.semesters[6]?.male.total,
        stats?.semesters[7]?.male.total,
      ];
      const femaleData = [
        stats?.semesters[0]?.female.total,
        stats?.semesters[1]?.female.total,
        stats?.semesters[2]?.female.total,
        stats?.semesters[3]?.female.total,
        stats?.semesters[4]?.female.total,
        stats?.semesters[5]?.female.total,
        stats?.semesters[6]?.female.total,
        stats?.semesters[7]?.female.total,
      ];

      return [
        {
          label: this.$t('Male'),
          backgroundColor: '#400D51',
          data: maleData,
        },
        {
          label: this.$t('Female'),
          backgroundColor: '#536DFE',
          data: femaleData,
        },
      ];
    },

    statistics() {
      const stats = this.$store.getters['semesters/statistics'];

      console.log(stats);

      const half = this.$store.getters['years/onGoingYear']?.firstHalf;
      return [
        {
          icon: 'mdi-calendar-month',
          value: stats?.year + ' / ' + (half ? '1st' : '2nd'),
          title: this.$t('Educational Year'),
        },
        {
          icon: 'mdi-account-group',
          value: stats?.sumOfSemesters.total.male + stats?.sumOfSemesters.total.female,
          title: this.$t('Total Students'),
        },
        {
          icon: 'mdi-account-multiple-check',
          value: stats?.sumOfSemesters.present.male + stats?.sumOfSemesters.present.female,
          title: this.$t('Present Students'),
        },
        {
          icon: 'mdi-account-multiple-minus',
          value: stats?.sumOfSemesters.taajil.male + stats?.sumOfSemesters.taajil.female,
          title: this.$t('Taajil Students'),
        },
        {
          icon: 'mdi-account-multiple-plus',
          value: stats?.sumOfSemesters.reentry.male + stats?.sumOfSemesters.reentry.female,
          title: this.$t('Reentry Students'),
        },
        {
          icon: 'mdi-account-switch',
          value: stats?.sumOfSemesters.monfaq.male + stats?.sumOfSemesters.monfaq.female,
          title: this.$t('Monfaq Students'),
        },
      ];
    },
  },
};
</script>

<style scoped>
.med-size {
  font-size: 18px;
  font-family: 'Calibri';
}
</style>
