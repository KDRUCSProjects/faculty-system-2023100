<template>
    <div>
      <base-contents>
      <template v-slot:bar>
      <v-text-field
        clearable=""
        :loading="loading"
        density="compact"
        variant="outlined"
        label="Find Course by name"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
      <div class="mx-1"></div>
      <add-department></add-department>
      
    </template>
    <v-row no-gutters style="padding: 0.3%;">
      <department-card v-for="(department, index) in departments" :key="index"
      :name = "department.name"
      :id = "department.id"
      >
      
      </department-card>
   
    </v-row>
    
      </base-contents>
    </div>
</template>
  
  <script>
  import departmentCard from '../../components/departments/departmentCard.vue';
  import AddSubject from '@/components/departments/modals/AddDepartment.vue';
import AddDepartment from '../../components/departments/Modals/AddDepartment.vue';
  export default {
  components: { departmentCard, AddDepartment },
  computed: {
    departments() {
      return this.$store.getters['departments/departments'];
    },
  },
  async mounted() {
    // Load courses at app mount
    await this.$store.dispatch('departments/getDepartments');
  },
  }
  </script>
  
  <style lang="scss" scoped></style>
  