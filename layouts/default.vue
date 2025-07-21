<template>
  <v-app dark>
    <!-- Sidebar Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      transition="slide-x-transition"
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Spacer pushes logout to the bottom -->
      <v-spacer></v-spacer>

      <!-- Logout Button at the Bottom -->
      <v-list-item class="mt-auto" @click="logout">
        <v-list-item-action>
          <v-icon color="red">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="red--text">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <!-- Main Page Content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      title: 'Online Audio Recorder',
      items: [
        {
          icon: 'mdi-microphone',
          title: 'Recorder',
          to: '/'
        }
      ]
    }
  },
  methods: {
    logout() {
      // Replace with your actual logout logic
      alert('Logging out...')
      // Example: this.$auth.logout()
    }
  }
}
</script>
