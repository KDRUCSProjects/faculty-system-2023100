<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="theShadow py-5 pa-3">
          <span class="pro"> ASSIGNED </span>
          <v-card-item class="text-center mb-1">
            <v-avatar class="my-2" size="160" color="secondary" variant="tonal">
              <v-img :src="`${imagesResource}/16872037529921-1.jpg`" alt="user" />
              <!-- <div v-else>
                <span class="text-h5">{{ abbreviation }}</span>
              </div> -->
            </v-avatar>
            <v-card-title class="font-weight-bold mt-3">Mohammad Nabi</v-card-title>
            <v-card-subtitle class="">Hotak</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <span class="text-center mx-auto d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <v-chip color="primary" variant="tonal" label class="mx-2">
                  <v-icon start icon="mdi-identifier"></v-icon>
                  Database ID: 1
                </v-chip>
                <v-chip label color="primary" variant="tonal">
                  <v-icon start icon="mdi-card-account-details"></v-icon>
                  Admission Year: 2019
                </v-chip>
              </div>

              <div class="d-flex my-3">
                <v-chip label color="dark" variant="tonal" class="mx-2">
                  <v-icon start icon="mdi-identifier"></v-icon>
                  Kankor Id: M27004983
                </v-chip>
                <v-chip label color="dark" variant="tonal">
                  <v-icon start icon="mdi-calendar-month"></v-icon>
                  Kankor Year: 2019
                </v-chip>
              </div>
            </span>
          </v-card-text>
          <v-card-title>Actions</v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn variant="flat" color="secondary">Assign to semester </v-btn>
            <v-btn variant="flat" color="error" class="px-6">Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="theShadow pa-1">
          <v-card-item>
            <v-card-title class="font-weight-bold">Biography</v-card-title>
            <v-card-subtitle>Student all personal information </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-list lines="two">
              <v-list-subheader>Personal</v-list-subheader>

              <v-divider></v-divider>
              <v-list-item v-for="rec in personal" :key="rec.title">
                <v-list-item-title class="">{{ rec.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ rec.subtitle }}</v-list-item-subtitle>
                <template v-slot:prepend>
                  <v-avatar color="primary-lighten-1" variant="outlined">
                    <!-- <v-icon color="white">mdi-account</v-icon> -->
                    <span class="h5-text" color="white">{{ buildAbbreviation(rec.subtitle) }}</span>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </template>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-subheader>Location</v-list-subheader>

              <v-list-item v-for="location in locations" :key="location.title">
                <v-list-item-title>{{ location.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ location.subtitle }}</v-list-item-subtitle>

                <template v-slot:prepend>
                  <v-avatar color="primary-lighten-1" variant="outlined">
                    <!-- <v-icon color="white">{{ location.icon }}</v-icon> -->
                    <span class="h5-text" color="white">{{ buildAbbreviation(location.subtitle) }}</span>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn color="grey-lighten-1" icon="mdi-form-textbox" variant="text"></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    locations: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: 'Province',
        title: 'Kandahar',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        subtitle: 'Division',
        title: 'Shahrwali',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        subtitle: 'District',
        title: 'District 9',
      },
    ],
    personal: [
      {
        subtitle: 'Full Name',
        title: 'Mohammad Nabi',
      },
      {
        subtitle: 'Last Name',
        title: 'Hotak',
      },
      {
        subtitle: 'Father Name',
        title: 'Sadiq Nabi',
      },

      {
        subtitle: 'Grand Father Name',
        title: 'Abdul Ghani',
      },
    ],
    personalSecondary: [
      {
        subtitle: 'Fullname',
        title: 'Mohammad Nabi',
      },
      {
        subtitle: 'Last Name',
        title: 'Hotak',
      },
      {
        subtitle: 'Father Name',
        title: 'Sadiq Nabi',
      },

      {
        subtitle: 'Grand Father Name',
        title: 'Abdul Ghani',
      },
    ],
  }),
  props: {
    id: {
      type: String,
    },
  },
  methods: {},
  computed: {},
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
</style>
