<template>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">{{ $t('First Step') }}</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step :complete="e1 > 2" step="2">{{ $t('Second Step') }}</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step step="3">{{ $t('Third Step') }}</v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            {{ $t('Continue') }}
          </v-btn>
  
          <v-btn flat>{{ $t('Cancel') }}</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            {{ $t('Continue') }}
          </v-btn>
  
          <v-btn flat>{{ $t('Cancel') }}</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            {{ $t('Continue') }}
          </v-btn>
  
          <v-btn flat>{{ $t('Cancel') }}</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </template>
  <script>
  export default {
    data () {
      return {
        e1: 0
      }
    }
  }
</script>