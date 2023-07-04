<template>
  <div>
    <v-list>
      <!-- <v-list-subheader>Subjects</v-list-subheader> -->
      <v-list-item v-for="(subject, i) in subjects" :key="i" class="my-1 border" variant="outline">
        <v-list-item-title>{{ subject.name }}</v-list-item-title>
        <v-list-item-subtitle>Credits: {{ subject.credits }}</v-list-item-subtitle>

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
                  @click="emitAction({ action: action.onClick, subjectId: subject.id })"
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
  props: ['subjects'],
  data: () => ({
    actions: [
      {
        icon: 'mdi-account',
        title: 'View Teacher',
        onClick: 'viewTeacher',
      },
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
      {
        icon: 'mdi-cash',
        title: 'Download BadlAsha',
        onClick: 'downloadAttendance ',
      },
    ],
  }),
  computed: {},
  methods: {
    emitAction({ action, subjectId }) {
      this.$emit('action', {
        action,
        subjectId,
      });
    },
  },
  emits: ['action'],
};
</script>

<style lang="scss" scoped></style>
