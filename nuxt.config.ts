import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

// add build time to env
import.meta.env.VITE_APP_BUILD_TIME = new Date().getTime().toString()

export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'nuxt-module-eslint-config',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // renderJsonPayloads: true,
    // https://github.com/nuxt/nuxt/issues/24229
    appManifest: false,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/index.scss',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      // no scale
      viewport: 'width=device-width,initial-scale=1,user-scalable=no',
      // <link rel="preconnect" href="https://fonts.googleapis.com">
      // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      // <link href="https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap" rel="stylesheet">
      link: [
        // { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/layout-column-line.svg' },
        { rel: 'apple-touch-icon', href: '/layout-column-line.svg' },

        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // use local font for load
        // { href: 'https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap', rel: 'stylesheet' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `    (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "kwm5q1tej7");`,
        },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslintConfig: {
    setup: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return ['github-corners'].includes(tag)
      },
    },
  },
})
