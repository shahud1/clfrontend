export default {
  mode: 'universal',
  server: {
    port: 6666,
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Connective Learning - ',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css'
      }
    ],
    script: [
      {
        // src: "libs/videojs.thumbnails.js"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/api',
    '~/plugins/i18n',
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/wordcloud', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-izitoast',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // '@nuxtjs/eslint-module'
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '/cl/api'
  },

  proxy: {
    '/cl/api/node': { target: 'http://127.0.0.1:3212', changeOrigin: true, pathRewrite: { '^/cl/api/node': '' } },
    '/cl/api/python': { target: 'http://127.0.0.1:6667', changeOrigin: true, pathRewrite: { '^/cl/api/python': '' } },
    '/cl/api/docker': { target: 'http://127.0.0.1:8080', changeOrigin: true, pathRewrite: { '^/cl/api/docker': '' } }
    // '/cl/api/node': { target: 'http://babyai.org:3212', changeOrigin: true, pathRewrite: { '^/cl/api/node': '' } },
    // '/cl/api/python': { target: 'http://babyai.org:3213', changeOrigin: true, pathRewrite: { '^/cl/api/python': '' } },
    // '/cl/api/docker': { target: 'http://babyai.org:8080', changeOrigin: true, pathRewrite: { '^/cl/api/docker': '' } }
  },
  router: {
    base: '/cl/'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: true,
      icos: 'mdi'
    },
    theme: {
      dark: true
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  env: {
    VIDEO_SERVER: 'http://localhost:8080'
  }

}
