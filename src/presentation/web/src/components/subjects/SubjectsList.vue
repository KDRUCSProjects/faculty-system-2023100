<template>
  <div>
    <v-list>
      <!-- <v-list-subheader>Subjects</v-list-subheader> -->
      <v-list-item v-for="(subject, i) in subjects" :key="i" class="my-1 border" variant="outline">
        <v-list-item-title>{{ subject.name }}</v-list-item-title>
        <v-list-item-subtitle>Credits: {{ subject.credit }}</v-list-item-subtitle>

        <template v-slot:prepend>
          <v-chip variant="flat" class="mr-4" color="dark">{{ i + 1 }}</v-chip>
        </template>

        <template v-slot:append>
          <v-menu transition="slide-y-transition" elevation="0">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props" variant="text" icon="mdi-dots-vertical"></v-btn>
            </template>

            <v-list density="compact">
              <v-list-item v-for="(action, i) in actions" :key="i">
                <v-btn
                  :prepend-icon="action.icon"
                  variant="text"
                  color="dark"
                  @click="takeAction({ action: action.onClick, subject: subject })"
                >
                  {{ action.title }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['subjects', 'noTeacherView'],
  data: () => ({}),
  computed: {
    actions() {
      let actions = [
        {
          icon: 'mdi-passport-biometric',
          title: 'Download Attendance',
          onClick: 'downloadAttendance ',
        },
        {
          icon: 'mdi-note-text-outline',
          title: 'Download Shoka',
          onClick: 'downloadAttendance ',
        },
      ];

      if (!this.noTeacherView) {
        actions.unshift({
          icon: 'mdi-account',
          title: 'View Teacher',
          onClick: 'viewTeacher',
        });
      }

      return actions;
    },
  },
  methods: {
    takeAction({ action, subject }) {
      if (action === 'viewTeacher') {
        this.viewTeacher(subject.teacherId);
      }
    },
    viewTeacher(teacherId) {
      this.$router.push(`/teachers/view/${teacherId}`);
    },
  },
  emits: ['action'],
};
</script>

<style lang="scss" scoped></style>
