<template>
  <v-card
    class="d-flex justify-center align-center flex-column pa-3 py-5 theShadow rounded"
    :class="{ border: role !== 'user' }"
  >
    <span class="pro" v-if="role !== 'user'">
      <v-icon color="success" size="x-large">mdi-check-decagram</v-icon>
    </span>

    <!-- <span class="pro">  </span> -->
    <v-avatar class="my-3" size="150" color="secondary" variant="tonal">
      <v-img v-if="photo" :src="`${imagesResource}/${photo}`" alt="user" />
      <div v-else>
        <span class="text-h5">{{ abbreviation }}</span>
      </div>
    </v-avatar>
    <v-card-title class="pb-0">{{ fullName }}</v-card-title>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace" v-if="role === 'teachingManager'">
      {{ 'Teaching Manager' }}
    </v-card-subtitle>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace" v-else-if="role === 'execManager'">
      {{ 'Executive Manager' }}
    </v-card-subtitle>
    <v-card-subtitle class="py-0 my-0" style="font-family: monospace" v-else>
      {{ lastName || 'N/A' }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-subtitle class="text-primary">{{ email }}</v-card-subtitle>

    <v-card-actions class="mt-1 px-1">
      <v-btn
        v-if="role === 'user'"
        append-icon="mdi-location-enter"
        color="primary"
        variant="tonal"
        class="mr-1"
        :to="`/teachers/view/${teacherId}`"
        block
      >
        {{ $t('View Profile') }}
      </v-btn>
      <update-teacher v-if="role === 'execManager'" :isAssistant="true" :teacherId="teacherId" activator-color="text">
        <v-btn variant="tonal" color="primary" class="px-6 mb-1" prepend-icon="mdi-account" block>
          {{ $t('Update Account') }}
        </v-btn>
      </update-teacher>
      <update-teacher v-if="role === 'teachingManager'" :isAssistant="true" :teacherId="teacherId" activator-color="text">
        <v-btn variant="tonal" color="primary" class="px-6 mb-1" prepend-icon="mdi-account" block>
          {{ $t('Update Account') }}
        </v-btn>
      </update-teacher>
    </v-card-actions>
  </v-card>
</template>

<script>
import UpdateTeacher from './dialogs/UpdateTeacher.vue';
export default {
  components: {
    UpdateTeacher,
  },
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
    role: {
      type: String,
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
  position: absolute;
  top: 20px;
  left: 20px;
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
