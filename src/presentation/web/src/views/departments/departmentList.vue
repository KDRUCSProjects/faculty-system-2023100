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
      <add-teacher></add-teacher>
      
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
  export default {
  components: { departmentCard },
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
  