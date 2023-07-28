<template>
  <v-card
    class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded"
    :class="{ semesterCard: isOnGoing }"
  >
    <!-- <span class="pro"> 120 Students </span> -->
    <span class="pro" v-if="isOnGoing">
      <v-icon color="indigo-darken-2" size="x-large">mdi-check-circle-outline</v-icon>
    </span>

    <v-card-title class="pb-0"
      ><span class="text-secondary">{{ rankSemester(title) }}</span> Semester</v-card-title
    >
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace"> {{ subjectsCount }} subjects </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle class="text-primary">{{ year }} year</v-card-subtitle>

    <v-card-actions class="mt-3 px-2">
      <!-- <v-btn color="primary" variant="elevated">Profile</v-btn> -->
      <v-btn color="primary" block variant="tonal" @click="viewSemester(semesterId)"> View Semester</v-btn>
    </v-card-actions>

    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <!-- Update Dialog -->
  </v-card>
</template>

<script>
import { rankSemester } from '@/utils/global';

export default {
  data: () => ({
    menu: false,
  }),
  props: {
    semesterId: {
      type: Number,
    },
    title: {
      type: String,
    },
    subjectsCount: {
      type: Number,
      default: 6,
    },
    year: {
      type: Number,
    },
  },
  computed: {
    isOnGoing() {
      const firstHalf = this.$store.getters['years/onGoingYear']?.firstHalf == true ? true : false;

      // First check if currentSemesterYear matches this semesters year
      if (this.year !== this.$store.getters['years/onGoingYear']?.year) return false;
      if (firstHalf) {
        return this.title % 2 !== 0 ? true : false;
      } else {
        return this.title % 2 === 0 ? true : false;
      }
    },
  },
  methods: {
    viewSemester(semesterId) {
      this.$router.push({
        name: 'view-semester',
        params: {
          id: semesterId,
        },
        query: {
          year: this.year,
          semester: this.title,
        },
      });
    },
    rankSemester(title) {
      return rankSemester(title);
    },
  },
};
</script>

<style scoped>
.pro {
  position: absolute;
  top: 15px;
  left: 15px;
}

.semesterCard {
  border: 1px dotted rgb(var(--v-theme-primary));
}
</style>
