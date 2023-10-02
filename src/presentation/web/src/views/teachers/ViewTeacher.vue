<template>
  <div>
    <!-- Show Profile -->
    <v-row>
      <v-col cols="7">
        <v-card class="theShadow pa-3">
          <v-card-item>
            <v-card-title class="text-h5 font-weight-bold">{{ $t('Assigned Subjects') }}</v-card-title>
            <v-card-subtitle>{{ $t('The list of all assigned subjects to this teacher') }}</v-card-subtitle>
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

            <div class="d-flex align-center justify-center" style="min-height: 500px">
              <div v-if="semesterWithSubjects?.length === 0" class="text-error">{{ $t('Teacher has no subjects assigned') }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-banner sticky="true" class="ma-0 pa-0">
          <v-card class="mx-auto pa-3 theShadow">
            <v-card-item>
              <v-card-title class="text-h5 font-weight-bold">{{ $t('View Profile') }}</v-card-title>
              <v-card-subtitle>{{ $t('Biography') }}</v-card-subtitle>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <v-avatar class="my-2" size="160" color="secondary" variant="tonal">
                <v-img v-if="teacher?.photo" :src="`${imagesResource}/${teacher?.photo}`" alt="user" />
                <div v-else>
                  <span class="text-h5">{{ abbreviation }}</span>
                </div>
              </v-avatar>
              <v-card-title class="pb-0 text-h5 mt-3" style="font-family: monospace">{{ teacher?.name }}</v-card-title>
              <v-card-subtitle v-if="teacher?.lastName" class="py-0 my-0 text-center" style="font-family: monospace">
                {{ teacher.lastName ? teacher.lastName : 'No NickName' }}
              </v-card-subtitle>
              <!-- <v-divider></v-divider> -->
              <v-card-subtitle class="text-primary mt-3">{{ teacher?.email }}</v-card-subtitle>
            </v-card-text>
            <div class="d-flex w-100 flex-column justify-items-center align-items-center px-2">
              <update-teacher v-if="id" :teacherId="id" activator-color="text">
                <v-btn variant="tonal" color="primary" class="px-6 mb-1" prepend-icon="mdi-account" block>
                  {{ $t('Update Biography') }}
                </v-btn>
              </update-teacher>
              <!-- Reset Teacher Password -->
              <reset-teacher-password v-if="id" :teacherId="id" activator-color="text">
                <v-btn variant="tonal" color="dark" class="px-6 mb-1" prepend-icon="mdi-account" block>
                  {{ $t('Change Password') }}
                </v-btn>
              </reset-teacher-password>

              <v-btn
                variant="tonal"
                color="error"
                class="px-6 mb-1"
                prepend-icon="mdi-account"
                block
                @click="deleteTeacher(id)"
                >{{ $t('Delete Account') }}</v-btn
              >
            </div>
            <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
          </v-card>
        </v-banner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SubjectsList from '@/components/subjects/SubjectsList.vue';
import UpdateTeacher from '@/components/teachers/dialogs/UpdateTeacher.vue';
import ResetTeacherPassword from '@/components/teachers/dialogs/ResetTeacherPassword.vue';
import { rankSemester } from '@/utils/global';
export default {
  props: ['id'],
  components: {
    SubjectsList,
    UpdateTeacher,
    ResetTeacherPassword,
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
    async deleteTeacher(id) {
      // Show confirm dialog by access it with $ref

      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: this.$t('Warning'),
        title: this.$t('Are you sure you want to delete this teacher?'),
        okButton: this.$t('Yes'),
      });

      // If closed, return the function
      if (!res) {
        return false;
      }

      // Otherwise, continue deleting the teacher from the database
      await this.$store.dispatch('teachers/deleteTeacher', id);
      this.$router.replace('/teachers');
    },
  },
  async created() {
    await this.loadTeacherById(this.id);
  },
};
</script>

<style lang="scss" scoped></style>
