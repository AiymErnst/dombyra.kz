// app/components/ModePage.jsx
//
// Общая страница для трёх режимов: тюнер, обучение, караоке.
// Серверный компонент — весь текст попадает в HTML до отправки в браузер,
// поэтому его видит поисковый робот. Тренажёр подключается ниже отдельным
// клиентским компонентом.
//
// Шапки здесь нет намеренно: её рисует сам тренажёр внутри iframe.
// Вторая шапка от страницы дала бы две панели одна над другой.

import { locales, defaultLocale } from '@/lib/i18n';
import TrainerFrame from './TrainerFrame';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';

// hreflang требует полноценные коды локали, а не наши внутренние
const HREFLANG = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

const CATEGORY = {
  tuner: 'UtilitiesApplication',
  learn: 'EducationalApplication',
  karaoke: 'EducationalApplication',
};

// Режим страницы → параметр ?mode= для тренажёра.
// В simulator.html «обучение» называется normal.
const TRAINER_MODE = { tuner: 'tuner', learn: 'normal', karaoke: 'karaoke' };

/**
 * Метаданные страницы режима. Вызывается из page.jsx каждого режима.
 * Здесь же собирается hreflang — без него Google склеивает языковые
 * версии и показывает казахоязычному пользователю русскую страницу.
 */
export function buildMetadata({ locale, mode, dict }) {
  const t = dict.pages[mode];
  const url = `${SITE}/${locale}/${mode}`;

  const languages = Object.fromEntries(
    locales.map((l) => [HREFLANG[l], `${SITE}/${l}/${mode}`])
  );
  languages['x-default'] = `${SITE}/${defaultLocale}/${mode}`;

  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      title: t.title,
      description: t.description,
      url,
      locale: HREFLANG[locale].replace('-', '_'),
      images: [`${SITE}/og/${mode}.png`],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default function ModePage({ locale, mode, dict }) {
  const t = dict.pages[mode];
  const ui = dict.pages.ui || {};
  const nav = dict.nav || {};
  const url = `${SITE}/${locale}/${mode}`;

  // FAQPage — заявка на блок «Быстрые ответы» в выдаче.
  // Для запроса «как настроить домбру» это основной источник переходов.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: t.h1,
        url,
        description: t.description,
        inLanguage: locale === 'kz' ? 'kk' : locale,
        applicationCategory: CATEGORY[mode],
        operatingSystem: 'Web browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KZT' },
      },
      ...(t.faq
        ? [{
            '@type': 'FAQPage',
            mainEntity: t.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: nav.trainer || 'dombyra', item: `${SITE}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t.h1, item: url },
        ],
      },
    ],
  };

  // Ссылки на два других режима — внутренняя перелинковка.
  // Робот по ним переходит, в отличие от вкладок внутри iframe.
  const others = ['tuner', 'learn', 'karaoke'].filter((m) => m !== mode);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Тренажёр первым: человек пришёл настраивать домбру, а не читать.
          Текст ниже — для тех, кому нужны подробности, и для поиска. */}
      <TrainerFrame mode={TRAINER_MODE[mode]} locale={locale} title={t.h1} />

      <main className="mode-page">
        <h1>{t.h1}</h1>
        <p className="mode-lead">{t.lead}</p>

        {t.blocks.map((b) => (
          <section key={b.h} className="mode-block">
            <h2>{b.h}</h2>
            <p>{b.p}</p>
          </section>
        ))}

        {t.faq && (
          <section className="mode-faq">
            <h2>{ui.faq || 'FAQ'}</h2>
            {t.faq.map((f) => (
              <details key={f.q}>
                <summary><h3>{f.q}</h3></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        )}

        <nav className="mode-also" aria-label={ui.tryAlso || ''}>
          <h2>{ui.tryAlso || ''}</h2>
          {others.map((m) => (
            <a key={m} href={`/${locale}/${m}`}>
              <b>{dict.pages[m].h1}</b>
              <span>{dict.pages[m].lead}</span>
            </a>
          ))}
          <a href={`/${locale}`}>{nav.catalog || 'dombyra.kz'}</a>
        </nav>
      </main>
    </>
  );
}
