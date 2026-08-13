// app/components/navHref.js
//
// Один способ строить адреса для всего сайта.
//
// Якорь (#catalog) ведёт на блок главной. На самой главной он работает
// как якорь, на любой другой странице должен стать полноценной ссылкой
// /{locale}#catalog — иначе клик просто ничего не делает.
//
// Страница (/tuner) всегда получает языковой префикс.

export function navHref(link, locale, isLanding) {
  if (link.type === "anchor") {
    return isLanding ? link.href : `/${locale}${link.href}`;
  }
  return `/${locale}${link.href}`;
}
