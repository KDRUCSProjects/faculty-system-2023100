<template>
  <base-contents>
    <v-card class="container">
      <h2>Reset Password</h2>

      <p>Just type it twice and try not to forget it.</p>
      <p>Password should be and must contain:</p>
      <v-container style="margin-top: 20px; margin-bottom: 50px; width: 480px">
        <v-row style="text-align: center;">
          <v-col>
            <b>8+</b>
            <p>Character</p>
          </v-col>
          <v-col>
            <b>AA</b>
            <p>Uppercase</p>
          </v-col>
          <v-col>
            <b>aa</b>
            <p>Lowercase</p>
          </v-col>
          <v-col>
            <b>123</b>
            <p>Number</p>
          </v-col>
          <v-col>
            <b>@$#</b>
            <p>Symbol</p>
          </v-col>
        </v-row>
      </v-container>
      <v-form>
        <v-text-field type="password" label="New Password" placeholder="Enter new password" variant="solo"></v-text-field>
        <v-text-field type="password" label="Confirm Password" placeholder="Enter the above password"
          variant="solo"></v-text-field>
        <v-btn block class="text-none mb-4" color="primary" size="x-large"
          variant="elevated" >
          Reset Password
        </v-btn>
        <v-btn block class="text-none mb-4" color="primary" size="x-large"
          variant="tonal" >
          Back to Login
        </v-btn>
      </v-form>




    </v-card>
  </base-contents>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  padding: 25px 180px 25px 180px;

}
</style>
