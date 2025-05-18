import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/sass/main.sass', '~/assets/fonts/fonts.css'],
 
  modules: [
    "@nuxtjs/prismic",
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@nuxtjs/google-fonts'
  ],


  googleFonts: {
    families: {
      'Noto Serif SC': {
        wght: [200, 300, 400, 500], // Specify weights you need
        ital: [400] // Optional italic variants
      }
    },
    display: 'swap', // Improves loading performance
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false, // Set to true if you want to self-host
    inject: true // Automatically inject the font in your app
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName
  }
})