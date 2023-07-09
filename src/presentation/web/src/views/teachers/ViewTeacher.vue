<template>
  <div>
    <!-- Show Profile -->
    <v-row>
      <v-col cols="7">
        <v-card class="theShadow pa-3">
          <v-card-item>
            <v-card-title class="text-h5 font-weight-bold">Assigned Subjects</v-card-title>
            <v-card-subtitle>The list of all assigned subjects to this teacher</v-card-subtitle>
          </v-card-item>
          <v-divider></v-divider>
          <v-card-text>
            <subjects-list :subjects="subjects" :noTeacherView="true" @action="getAction"></subjects-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="mx-auto pa-3 theShadow">
          <v-card-item>
            <v-card-title class="text-h5 font-weight-bold">View Profile</v-card-title>
            <v-card-subtitle>Biography</v-card-subtitle>
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
            <v-btn variant="flat" class="px-6 mb-1" prepend-icon="mdi-account" block> Edit Profile</v-btn>
            <v-btn variant="flat" color="dark" class="px-6 mb-1" prepend-icon="mdi-account" block> Change Password</v-btn>
            <v-btn variant="flat" color="error" class="px-6 mb-1" prepend-icon="mdi-account" block> Delete Account</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SubjectsList from '@/components/subjects/SubjectsList.vue';
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
    subjects() {
      return this.$store.getters['teachers/currentTeacherAssignedSubjects'];
    },
  },
  methods: {
    async loadTeacherById(id) {
      await this.$store.dispatch('teachers/loadTeacherById', id);
    },
  },
  async created() {
    await this.loadTeacherById(this.id);
  },
};
</script>

<style lang="scss" scoped></style>
