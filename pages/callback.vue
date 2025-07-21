<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <div class="text-center">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="mt-4">Logging in, please wait...</p>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth', // Auth module will automatically process callback
}
</script>
