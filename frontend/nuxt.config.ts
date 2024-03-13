// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL
    }
  }
})
