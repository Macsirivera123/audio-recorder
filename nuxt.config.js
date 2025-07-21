import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  head: {
    titleTemplate: '%s - online-audio-recorder',
    title: 'online-audio-recorder',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [],

  plugins: [
    { src: '~/plugins/vue-audio-recorder.js', mode: 'client' }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE,
        logoutRedirectUri: process.env.AUTH0_LOGOUT_REDIRECT_URI,
        redirectUri: process.env.AUTH0_REDIRECT_URI,
        responseType: 'code',
        codeChallengeMethod: 'S256'
      }
    },
    redirect: {
      login: '/welcome',       // Redirect to welcome page if not logged in
      logout: '/welcome',      // Redirect to welcome after logout
      callback: '/callback',   // Where Auth0 redirects after auth (you need this route)
      home: '/home'            // Redirect after successful login
    }
  },

  axios: {
    baseURL: '/'
  },

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

  build: {},

  router: {
    middleware: [] // Optional: ['auth'] if you want global protection
  }
}
