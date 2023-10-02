<template>
  <div>
    <!-- Show Profile -->
    <base-contents>
      <v-row>
        <v-col cols="12">
          <v-card class="theShadow pa-3">
            <v-card-item>
              <v-card-title class="text-h5 font-weight-bold">{{ $t('Assigned Subjects') }}</v-card-title>
              <v-card-subtitle>{{ $t('The list of all assigned subjects to you in this semester') }}</v-card-subtitle>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-text>
              <v-card v-for="(item, i) in semesterWithSubjects" :key="i" class="theShadow pa-3 ma-2">
                <v-card-item>
                  <v-card-title class="text-primary text-h6 font-weight-bold"
                    >{{ item.year }}, <span class="text-dark">{{ rankSemester(item.title) }} {{ $t('Semester') }}</span></v-card-title
                  >
                  <v-card-subtitle>{{ $t('Total subjects:') }} {{ item.subjects.length }}</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                  <subjects-list
                    :subjects="item.subjects"
                    :no-teacher-view="true"
                    :no-subject-update="true"
                    :no-subject-delete="true"
                    @action="getAction"
                  ></subjects-list>
                </v-card-text>
              </v-card>

              <div
                class="d-flex align-center justify-center flex-column"
                style="min-height: 500px"
                v-if="semesterWithSubjects?.length === 0"
              >
                <div class="text-error">{{ $t('You has no subjects assigned') }}</div>

                <span class="text-primary" style="font-size: 13px">{{ $t('Enjoy your day!') }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </base-contents>
  </div>
</template>

<script>
import SubjectsList from '@/components/subjects/SubjectsList.vue';
import { rankSemester } from '@/utils/global';
export default {
  props: ['id'],
  components: {
    SubjectsList,
  },
  data: () => ({}),
  computed: {
    teacher() {
      return this.$store.getters['teachers/currentTeacher'];
    },
    semesterWithSubjects() {
      return this.$store.getters['teachers/currentTeacherAssignedSubjects'];
    },
  },
  methods: {
    rankSemester(title) {
      return rankSemester(title);
    },
    async loadTeacherById(id) {
      await this.$store.dispatch('teachers/loadTeacherById', id);
    },
  },
  async created() {
    const loggedInTeacherId = this.$store.getters['userId'];
    await this.loadTeacherById(loggedInTeacherId);
  },
};
</script>

<style lang="scss" scoped></style>
