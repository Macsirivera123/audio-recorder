<!-- pages/callback.vue -->
<template>
  <div class="text-center pa-5">
    <v-progress-circular indeterminate color="primary" size="48" />
    <div class="mt-3">Logging in, please wait...</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$auth.handleCallback()
  }
}
</script>
