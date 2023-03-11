// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    define: {
      'window.global': {},
    },
    server: {
      proxy: {
        '/graphql': {
          target: 'http://localhost:3001/graphql',
          secure: false,
        },
      },
    },
  },
});
