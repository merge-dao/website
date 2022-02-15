import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.appState.locale,
    fallbackLocale: 'en-US',
    messages: {
      'en-US': require('@/locales/en-US.json'),
      'zh-CN': require('@/locales/zh-CN.json'),
    },
  });

  app.i18n.path = (link) => {
    console.log('link: ', link);
    console.log('app.i18n.locale: ', app.i18n.locale);
    console.log('app.i18n.fallbackLocale: ', app.i18n.fallbackLocale);
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    if (link.indexof('lang') === -1) {
      return `/${link}?lang=${app.i18n.locale}`; // 文件内按语音区分
    } else {
      return `/${link}`;
    }
    // return `/${app.i18n.locale}/${link}` //按文件区分
  };
};
