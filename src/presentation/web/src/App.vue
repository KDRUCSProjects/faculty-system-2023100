<template>
  <v-app>
    <v-locale-provider :rtl="$i18n.locale == 'pa' ? true : false" :class="{ pashtoFont: $i18n.locale === 'pa' }">
      <v-main>
        <router-view />

        <v-container>
          <div id="notifications">
            <div v-for="(item, i) in toastMessages" :key="i">
              <base-toast :type="item.type" :text="item.text" :key="i"></base-toast>
            </div>
          </div>
        </v-container>
      </v-main>
    </v-locale-provider>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    checkAppLanguage(){
      const language = localStorage.getItem('appLanguage');
      if(!language){
        localStorage.setItem('appLanguage','en');
      }
      this.$i18n.locale=localStorage.getItem('appLanguage')
    }
  },
  computed: {
    toastMessages() {
      return this.$store.getters['toastMessages'];
    },
  },
  async created() {
    this.checkAppLanguage();

    // Load all years
    await this.$store.dispatch('years/loadEducationalYears');
    // Load current on-going educational year
    await this.$store.dispatch('years/loadCurrentOnGoingYear');
    // Load all teachers
    await this.$store.dispatch('teachers/loadTeachers');

    // Load statistics of current year
    await this.$store.dispatch('semesters/loadStatistics', this.$store.getters['years/onGoingYear']?.year);
  },
};
</script>

<style>
.theShadow {
  -webkit-box-shadow: 0 0 37px rgb(8 21 66 / 5%);
  box-shadow: 0 0 37px rgb(8 21 66 / 5%) !important;
  border-radius: 10px;
}

@font-face {
  font-family: 'Bahij Nassim';
  src: local('Bahij Nassim'), url(./assets/fonts/BahijNassim/BahijNassim.ttf) format('truetype');
}

.pashtoFont {
  font-family: 'Bahij Nassim' !important;
}

.pashtoFontBold {
  font-family: 'Bahij Nassim' !important;
  font-weight: bold !important;
}
</style>
