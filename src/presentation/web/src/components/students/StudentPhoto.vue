<template>
  <div>
    <v-card class="theShadow py-5 pa-3">
      <span class="pro" v-if="!studentRegistration">
        {{ latestSemester ? `${rankSemester(latestSemester)} Semester` : 'Reserved' }}
      </span>

      <v-card-item class="text-center mb-1">
        <v-avatar class="my-2" :size="avatarSize" color="secondary" variant="tonal">
          <v-img v-if="student?.photo" :src="`${imagesResource}/${student?.photo}`" alt="user" />
          <div v-else>
            <span class="text-h5">{{ buildAbbreviation(student?.fullName) }}</span>
          </div>
        </v-avatar>
        <v-card-title class="font-weight-bold mt-3">{{ student?.fullName }}</v-card-title>
        <v-card-subtitle :class="{ 'text-error': !student?.nickName }">{{ student?.nickName || 'N/A' }}</v-card-subtitle>

        <base-update-dialog
          color="primary"
          variant="outlined"
          ref="profilePhotoDialog"
          :photo="true"
          :title="$t('Change Photo')"
          @update="uploadPhoto"
        >
          <v-btn color="primary" variant="outlined" size="small">{{ $t('Update Photo') }}</v-btn>
        </base-update-dialog>
      </v-card-item>
      <v-card-text class="my-8">
        <span class="text-center mx-auto d-flex flex-column justify-center align-center" v-if="!studentRegistration">
          <div class="d-flex">
            <v-chip color="primary" variant="tonal" label class="mx-2">
              <v-icon start icon="mdi-identifier"></v-icon>
              {{ $t('Database ID') }}: {{ student?.id }}
            </v-chip>
            <v-chip label color="primary" variant="tonal">
              <v-icon start icon="mdi-card-account-details"></v-icon>
              {{ $t('Kankor Type') }} : {{ student?.kankorType }}
            </v-chip>
          </div>

          <div class="d-flex my-3">
            <v-chip label color="dark" variant="tonal" class="mx-2">
              <v-icon start icon="mdi-identifier"></v-icon>
              {{ $t('Kankor ID') }} : {{ student?.kankorId }}
            </v-chip>
            <v-chip label color="dark" variant="tonal">
              <v-icon start icon="mdi-calendar-month"></v-icon>
              {{ $t('Kankor Year') }} : {{ student?.educationalYear || 'NA' }}
            </v-chip>
          </div>
        </span>
      </v-card-text>
      <slot>
        <!-- Good for actions or any other components -->
      </slot>
    </v-card>
  </div>
</template>

<script>
import { rankSemester } from '@/utils/global';

export default {
  props: {
    studentRegistration: {
      type: Boolean,
      default: false,
    },
    student: {
      type: Object,
    },
    studentStatus: {
      type: String,
      default: 'RESERVE',
    },
    avatarSize: {
      type: Number,
      default: 170,
    },
  },
  data: () => ({
    photo: null,
  }),
  computed: {
    latestSemester() {
      return this.student?.latestSemester;
    },
  },
  methods: {
    uploadPhoto(photo) {
      this.photo = photo;
      this.$emit('upload-photo', photo);
      // Once emitted,
    },
    rankSemester(p) {
      return rankSemester(p);
    },
  },
  emits: ['upload-photo'],
};
</script>

<style scoped>
.pro {
  color: white;
  background-color: #0b8dfe;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
