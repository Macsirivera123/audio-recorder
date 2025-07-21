<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    <v-icon size="96" color="primary">mdi-microphone</v-icon>
    <h1 class="mb-4">Welcome to Online Audio Recorder</h1>
    <p class="mb-8">Fast, simple voice recording anywhere.</p>

    <v-btn color="primary" large class="mb-4" @click="login">
      <v-icon left>mdi-login</v-icon> Login
    </v-btn>

    <v-btn color="secondary" large @click="signup">
      <v-icon left>mdi-account-plus</v-icon> Register
    </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWith('auth0') // default login
    },
    signup() {
      this.$auth.loginWith('auth0', {
        params: { screen_hint: 'signup' } // open sign-up tab
      })
    }
  }
}
</script>
