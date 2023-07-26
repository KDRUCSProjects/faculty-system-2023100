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
                <update-subject v-if="action.onClick === 'rename'" :subject-id="subject.id" @dialog-close="menu = false">
                  <v-btn
                    :prepend-icon="action.icon"
                    variant="text"
                    color="dark"
                    @click="takeAction({ action: action.onClick, subject: subject })"
                  >
                    {{ action.title }}
                  </v-btn>
                </update-subject>
                <v-btn
                  v-else
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

    <!-- All Dialogs -->
    <!-- Delete Dialog -->
    <base-confirm-dialog ref="baseConfirmDialog"></base-confirm-dialog>
  </div>
</template>

<script>
import UpdateSubject from './dialogs/UpdateSubject.vue';

export default {
  components: { UpdateSubject },
  props: ['subjects', 'noTeacherView', 'noSubjectUpdate'],
  data: () => ({}),
  computed: {
    actions() {
      let actions = [
        {
          icon: 'mdi-note-edit-outline',
          title: 'View Shoka',
          onClick: 'viewShoka',
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
          icon: 'mdi-delete',
          title: 'Delete ',
          onClick: 'delete',
        },
      ];
      if (!this.noTeacherView) {
        actions.unshift({
          icon: 'mdi-account',
          title: 'View Teacher',
          onClick: 'viewTeacher',
        });
      }

      if (!this.noSubjectUpdate) {
        actions.unshift({
          icon: 'mdi-form-textbox ',
          title: 'Update Subject ',
          onClick: 'rename',
        });
      }
      return actions;
    },
  },
  methods: {
    async takeAction({ action, subject }) {
      if (action === 'viewTeacher') {
        this.viewTeacher(subject.teacherId);
      } else if (action === 'delete') {
        await this.deleteSubject(subject);
      } else if (action === 'viewShoka') {
        console.log(subject);
        this.showShoka(subject.id);
      } else if (action === 'downloadAttendance') {
        console.log('downloading..');
      }
    },
    showShoka(subjectId) {
      this.$router.push(`/subjects/shoka/${subjectId}`);
    },
    viewTeacher(teacherId) {
      this.$router.push(`/teachers/view/${teacherId}`);
    },
    async deleteSubject(subject) {
      // Show confirm dialog by access it with $ref
      let res = await this.$refs.baseConfirmDialog.show({
        warningTitle: 'Warning',
        title: 'Are you sure you want to delete this subject?',
        subtitle: `${subject.name}`,
        okButton: 'Yes',
      });
      // If closed, return the function
      if (!res) {
        return false;
      }
      // Otherwise, continue deleting the teacher from the database
      try {
        await this.$store.dispatch('subjects/deleteSubject', subject.id);
        this.$emit('subjectDelete', true);
      } catch (e) {
        console.log(e);
        // Show toast maybe?
      }
    },
  },
  emits: ['action', 'subjectDelete'],
};
</script>

<style lang="scss" scoped></style>
