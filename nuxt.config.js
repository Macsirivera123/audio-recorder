import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  // Global page headers
  head: {
    titleTemplate: '%s - online-audio-recorder',
    title: 'online-audio-recorder',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS
  css: [],

  // Plugins
  plugins: [
    { src: '~/plugins/vue-audio-recorder.js', mode: 'client' }
  ],

  // Auto import components
  components: true,

  // Build-time modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Runtime modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Auth module configuration
  auth: {
    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      audience: process.env.AUTH0_AUDIENCE,
      logoutRedirectUri: process.env.AUTH0_LOGOUT_REDIRECT_URI
      }
    },
    redirect: {
      login: '/welcome',
      logout: '/welcome',
      callback: '/login', // used by Auth0 to return to your app
      home: '/home'
    }
  },

  // Axios config (required by auth module)
  axios: {
    baseURL: '/'
  },

  // Vuetify config
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build configuration
  build: {},

  // Router middleware setup (optional global setup)
  router: {
    middleware: []
  }
}
