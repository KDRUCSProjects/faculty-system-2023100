<template>
  <v-card
  class="mx-auto"
  width="400"
  mr-2
  prepend-icon = {{ iconType }}
  >
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
        iconType: {
          type: String
        },
        title: {
            type: String,
        },
        Total: {
            type: String
        }
    }
}
</script>

