import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/sass/main.sass', '~/assets/fonts/fonts.css'],
 
  modules: [
    "@nuxtjs/prismic", 
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt'
  ],

  prismic: {
    endpoint: apiEndpoint || repositoryName
  }
})