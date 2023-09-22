// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  css: ['@picocss/pico/scss/pico.scss', '~/settings.scss'],
  modules: ['@pinia/nuxt'],
  // @ts-ignore
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
