<template>
  <v-card class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded">
    <!-- <span class="pro">  </span> -->
    <v-avatar class="my-3" size="150" color="secondary" variant="tonal">
      <v-img v-if="photo" :src="`${imagesResource}/${photo}`" alt="user" />
      <div v-else>
        <span class="text-h5">{{ abbreviation }}</span>
      </div>
    </v-avatar>
    <v-card-title class="pb-0">{{ fullName }}</v-card-title>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace">
      {{ lastName || 'Teacher' }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle class="text-primary">{{ email }}</v-card-subtitle>

    <v-card-actions class="mt-1 px-1">
      <v-btn color="primary" variant="elevated" class="mr-1" :to="`/teachers/view/${teacherId}`" block> View Profile </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  
  props: {
    teacherId: {
      type: Number,
    },
    photo: {
      type: String,
      default: '@/assets/images/1.jpg',
    },
    fullName: {
      type: String,
      default: 'Mohammad Nabi',
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      default: 'm@example.com',
    },
  },
  computed: {
    abbreviation() {
      if (this.photo) return null;

      return this.buildAbbreviation(this.fullName);
    },
  },
};
</script>

<style scoped>
.pro {
  color: #231e39;
  background-color: #febb0b;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.theShadow {
  -webkit-box-shadow: 0 0 37px rgb(8 21 66 / 5%);
  box-shadow: 0 0 37px rgb(8 21 66 / 5%) !important;
  border-radius: 10px;
}

.v-card {
  /* border: 1px dotted '#333333'; */
}

.v-avatar {
  /* border: 1px solid rgb(var(--v-theme-primary)); */
}
</style>
