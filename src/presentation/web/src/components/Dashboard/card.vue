<template>
  <v-card
  class="mx-auto"
  width="400"
  mr-2
  prepend-icon="mdi-home"
  >
  <!-- <v-icon prepend-icon="icon">{{ prependIcon }}</v-icon>   -->
      <template v-slot:title>
        {{ title }}
      </template>
  
      <v-card-text>
        {{ Total }}
      </v-card-text>
    </v-card>
</template>

<script>

export default{
    props: {
        icon: {
        type: String,
        required: true
        },
        title: {
            type: String,
        },
        Total: {
            type: String
        }
    },
    computed: {
      prependIcon() {
        return this.icon;
      }
  }
}
</script>

