/*
 * @Author: your name
 * @Date: 2022-01-06 12:01:27
 * @LastEditTime: 2022-02-09 18:31:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jd/Users/jiaobingqian/work/crypto/website/nuxt.config.js
 */
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: 'matter-404.html',
    // routes: ['/', '/about', '/zh-CN', '/zh-CN/about'],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Matter Protocol is the basic axiom of the nft world.',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts/index.css',
    '~/assets/css/layout.css',
    '~/assets/css/embed-responsive.css',
    '~/assets/css/typography.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/countly-analytics','~/plugins/i18n.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    [
      'nuxt-mq',
      {
        breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1440 },
      },
    ],
    '@nuxtjs/speedcurve',
    '~/modules/nuxt-module-ipfs',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    html: {
      minify: {
        collapseWhitespace: true, // this solves route-based hydration issues
      },
    },
    extend(config, ctx) {
      config.optimization.minimize = false;
    },
  },

  router: {
    base: '/',
    middleware: 'i18n',
  },

  publicRuntimeConfig: {
    // Speedcurve config
    lux: {
      id: process.env.SPEEDCURVE_ID || '',
    },
    countly: {
      key: process.env.COUNTLY_KEY || '',
      domain: process.env.DEPLOY_DOMAIN || '',
      events: {
        LINK_CLICK_NAV: 'linkClickNav',
        LINK_CLICK_FOOTER: 'linkClickFooter',
        SOCIAL_MEDIA_OUTBOUNDS: 'socialMediaOutbounds',
        CTA_CLICK: 'ctaClick',
        NEWSLETTER_SUBSCRIBE: 'newsletterSubscribe',
        NOT_FOUND: '404NotFound',
      },
    },
  },
};
