export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jobs_front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'}
    ],
  },

  googleFonts: {
    download: true,
    overwriting: true,
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: false,
    families: {
      Nunito: [300, 400, 600, 700],
    },
  },

  router: {
    middleware: ['trailingSlash'],
  },

  gtm: {
    id: '', // Used as fallback if no runtime config is provided
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    '~/assets/scss/global.scss',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/mixins.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "~/plugins/vClickOutside", ssr: false},
    {src: "~/plugins/portalVue.js", ssr: false}
  ],
  //Runtime Config
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL || 'http://localhost:8000/api/v1'
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/google-fonts'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/image',
    '@nuxtjs/gtm',
    '@nuxtjs/style-resources',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  image: {
    domains: [
      'recommended-jobs.com',
    ]
  },
}
