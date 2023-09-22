// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/scss/global.scss'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
        },
      ],
    },
  },

  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },

  vite: {
    esbuild: {
      tsconfigRaw: {},
    },
    //   css: {
    //     preprocessorOptions: {
    //       scss: {
    //         additionalData: '@use "@/assets/scss/_vars.scss" as *;',
    //       },
    //     },
    //   },
  },
});
