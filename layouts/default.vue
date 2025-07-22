<template>
  <v-app dark>
    <!-- Sidebar Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      temporary
      class="custom-drawer"
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="drawer-item"
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer />

      <!-- Logout Button at the Bottom -->
      <v-list-item @click="logout" class="drawer-item">
        <v-list-item-action>
          <v-icon color="red">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="red--text">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar fixed app color="#556B2F" dark class="app-bar">
      <!-- Burger Icon (left) -->
      <v-btn
        v-if="$auth.loggedIn && $route.path === '/home'"
        icon
        @click.stop="drawer = !drawer"
        class="burger-button"
      >
        <v-icon :color="drawer ? '#CCCCAA' : 'white'">mdi-menu</v-icon>
      </v-btn>

      <!-- Absolute Centered Title -->
      <div class="toolbar-title-wrapper">
        <v-toolbar-title class="text-center">{{ title }}</v-toolbar-title>
      </div>
    </v-app-bar>

    <!-- Main Page Content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
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
          to: '/home'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$auth.logout({ returnTo: process.env.AUTH0_LOGOUT_REDIRECT_URI });
    }
  }
}
</script>

<style scoped>
.toolbar-title-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.burger-button {
  z-index: 1;
}

.custom-drawer {
  background-color: #556B2F;
  border-left: 2px solid #CCCCAA;
}

.drawer-item {
  border-bottom: 1px solid #CCCCAA;
}
</style>
