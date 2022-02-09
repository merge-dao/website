export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  query,
  error,
  redirect,
}) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;
  // Get locale from query
  const locale = query.lang || defaultLocale;
  if (store.state.appState.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }
  // Set locale
  store.commit('appState/setLang', locale);
  app.i18n.locale = store.state.appState.locale;
  // If route is /<defaultLocale>/... -> redirect to /...
  // if (
  //   locale === defaultLocale &&
  //   route.fullPath.indexOf('/' + defaultLocale) === 0
  // ) {
  //   const toReplace =
  //     '^/' +
  //     defaultLocale +
  //     (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '');
  //   const re = new RegExp(toReplace);
  //   return redirect(route.fullPath.replace(re, '/'));
  // }
  if (!query.lang) {
    return redirect(route.fullPath + '?lang=' + locale);
  }
}
