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

  buildModules: ['@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  /**
   * ✅ Final Auth0 config
   */
  auth: {
    redirect: {
      login: '/welcome',
      logout: '/welcome',
      callback: '/callback',
      home: '/home'
    },
    cookie: {
      options: {
        secure: true,
        domain: '.vercel.app'
      }
    },
    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        redirectUri: process.env.AUTH0_REDIRECT_URI, // e.g. https://audio-recorder-self.vercel.app/callback
        logoutRedirectUri: process.env.AUTH0_LOGOUT_REDIRECT_URI, // e.g. https://audio-recorder-self.vercel.app/welcome
        audience: '', // Leave empty unless you're using a protected API
        scope: ['openid', 'profile', 'email']
      }
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
    middleware: [] // Add ['auth'] if you want global protection
  }
}
