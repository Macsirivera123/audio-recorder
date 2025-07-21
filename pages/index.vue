<script>
export default {
  middleware: 'auth',
  mounted() {
    // Do nothing, this page is protected by middleware
  }
}
</script>

<template>
  <div>
    Redirecting to home...
  </div>
</template>

