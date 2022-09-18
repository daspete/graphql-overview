export default {
    publicRuntimeConfig: {
        GRAPH_URL: process.env.GRAPH_URL,
        GRAPH_WS_URL: process.env.GRAPH_WS_URL,
    },

    components: true,
    
    css: [
        '@/assets/css/tailwind.css',
        '@/assets/css/main.scss',
    ],

    buildModules: [
        '@nuxtjs/svg',
    ],

    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/apollo',
        '@nuxtjs/tailwindcss',
        'cookie-universal-nuxt',
    ],

    plugins: [
        { src: '~/plugins/portal-vue.js' },
    ],

    apollo: {
        clientConfigs: {
            default: '~/apollo.config.js',
        },

        authenticationType: 'Bearer',
        tokenName: 'testapp',
    },

    i18n: {
        langDir: '~/locales/',
        locales: [
            { code: 'en', iso: 'en-GB', file: 'en.json', dir: 'ltr' },
        ],
        defaultLocale: 'en',
    },
}