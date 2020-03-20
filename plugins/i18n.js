import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({ // construction a new VueI18n
    lazy: true,
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en-US.json'),
      th: require('~/locales/th-TH.json'),
      ja: require('~/locales/ja-JP.json')
    }
  })
}
