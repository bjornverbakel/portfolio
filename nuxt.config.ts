// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],

  ssr: false,
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Bjorn Verbakel - Portfolio',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Bjorn Verbakel Portfolio' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'preload', href: '/fonts/DMMono-Light.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/DMMono-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/Mono-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/Mono-Bold.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        { rel: 'preload', href: '/fonts/Mono-Light.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
      ],
    },
  },

  css: ['@/assets/css/main.css'],

  mdc: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['ts', 'vue', 'json', 'bash'],
    },
  },
  compatibilityDate: '2025-05-15',

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
      },
    },
  },
})
