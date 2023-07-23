<template>
  <div>
    <base-contents>
      <template v-slot:bar>
        <v-text-field
          clearable=""
          :loading="loading"
          density="compact"
          variant="outlined"
          label="Find Department by name"
          prepend-inner-icon="mdi-magnify"
          v-model="depID"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
        <div class="mx-1"></div>
      </template>
      <v-toolbar :color="'dark'">
        <v-toolbar-title> All Departments </v-toolbar-title>
        <v-divider inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="mx-4">
          <add-department></add-department>
        </div>
      </v-toolbar>
      <v-row no-gutters>
        <v-col v-for="(department, index) in departments" :key="index" cols="3">
          <v-sheet class="ma-2 pa-2">
            <department-card :name="department.name" :id="department.id"> </department-card>
          </v-sheet>
        </v-col>
      </v-row>
    </base-contents>
  </div>
</template>

<script>
import departmentCard from '../../components/departments/departmentCard.vue';
import AddDepartment from '@/components/departments/modals/AddDepartment.vue';
export default {
  components: { departmentCard, AddDepartment },
  computed: {
    departments() {
      return this.$store.getters['departments/departments'];
    },
  },

  data: () => ({
    depID: null,
  }),
  async mounted() {
    // Load courses at app mount
    await this.$store.dispatch('departments/getDepartments');
  },
};
</script>

<style lang="scss" scoped></style>
