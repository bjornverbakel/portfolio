// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  css: ['@/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'preload', href: '/fonts/DMMono-Light.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/DMMono-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/Mono-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/Mono-Bold.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/Mono-Light.ttf', as: 'font', type: 'font/ttf', crossorigin: '' }
      ]
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ]
})