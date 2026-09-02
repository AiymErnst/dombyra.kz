// app/[locale]/blog/page.jsx
//
// Список статей — полностью переделан визуально под референсы (крупная
// фотообложка с большим заголовком, затем сетка карточек), но данные и
// сама логика (i18n через pick(), SEO/hreflang/JSON-LD) — те же, что
// были, просто теперь в новой вёрстке на Tailwind вместо старых
// семантических классов (post-page/post-list/...).
//
// По просьбе Айым: на самой обложке — плавающая карточка-ссылка на
// страницу "О нас" (она уже готова) — как тот же приём с плавающей
// карточкой товара в Hero.jsx на главной.
import Link from "next/link";
import { locales, defaultLocale, getDictionary } from "@/lib/i18n";
import { getArticles, pick } from "@/lib/articles";
import { Placeholder } from "@/app/components/ui";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://dombyra.kz";
const HREFLANG = { kz: "kk-KZ", ru: "ru-KZ", en: "en", tr: "tr-TR" };

const FEATURED_ABOUT_TEXT = {
  ru: { label: "О НАС", cta: "Читать историю" },
  kz: { label: "БІЗ ТУРАЛЫ", cta: "Тарихты оқу" },
  en: { label: "ABOUT US", cta: "Read our story" },
  tr: { label: "HAKKIMIZDA", cta: "Hikayemizi oku" },
};

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale).pages.blog || {};
  const url = `${SITE}/${locale}/blog`;
  const languages = Object.fromEntries(
    locales.map((l) => [HREFLANG[l], `${SITE}/${l}/blog`])
  );
  languages["x-default"] = `${SITE}/${defaultLocale}/blog`;
  return {
    title: t.indexMetaTitle || t.indexTitle,
    description: t.indexMetaDesc,
    alternates: { canonical: url, languages },
  };
}

export default async function BlogIndex({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const t = dict.pages.blog || {};
  const posts = getArticles();
  const featured = FEATURED_ABOUT_TEXT[locale] || FEATURED_ABOUT_TEXT.ru;
  const localePrefix = `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.indexTitle,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pick(p.title, locale),
      url: `${SITE}/${locale}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* обложка */}
        <section className="relative h-[58vh] min-h-[420px] w-full overflow-hidden bg-brand-ink">
          <Placeholder>Фото — обложка журнала</Placeholder>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 lg:px-12 lg:pb-14">
            <div className="lg:mx-auto lg:max-w-[1180px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                <span className="font-brand text-[10px] font-bold tracking-[0.14em] text-white">
                  {t.eyebrow || "ЖУРНАЛ"}
                </span>
              </span>
              <h1 className="mt-4 text-balance font-brand text-[44px] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-[60px] lg:text-[84px]">
                {t.indexTitle}
              </h1>
              {t.indexLead && (
                <p className="mt-4 max-w-[440px] font-brand text-[14.5px] font-medium leading-relaxed text-white/75">
                  {t.indexLead}
                </p>
              )}
            </div>
          </div>

          {/* плавающая карточка-ссылка на "О нас" — тот же приём, что у товара в Hero.jsx */}
          <Link
            href={`${localePrefix}/about`}
            className="group absolute right-5 top-14 max-w-[220px] rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur transition-colors hover:bg-white sm:right-8 sm:top-16 lg:right-12 lg:top-16"
          >
            <div className="font-brand text-[11px] font-extrabold tracking-[0.1em] text-brand-blue">
              {featured.label}
            </div>
            <div className="mt-1 flex items-center gap-1.5 font-brand text-[13px] font-bold text-brand-ink">
              {featured.cta}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        </section>

        {/* сетка статей */}
        <section className="px-5 py-14 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-20">
          {posts.length === 0 ? (
            <Placeholder>Статей пока нет</Placeholder>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const category =
                  (t.categories && t.categories[post.category_key]) || post.category_key;
                const title = pick(post.title, locale);
                const excerpt = pick(post.excerpt, locale);
                return (
                  <Link
                    key={post.slug}
                    href={`${localePrefix}/blog/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-shadow hover:shadow-lg"
                  >
                    <div className="relative h-[190px] w-full overflow-hidden bg-brand-bg">
                      {post.cover_url ? (
                        <img
                          src={post.cover_url}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <Placeholder>{category}</Placeholder>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2.5 font-brand text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand-ink/40">
                        <span className="text-brand-blue">{category}</span>
                        {post.read_minutes ? (
                          <span>
                            {post.read_minutes} {t.readMinutes}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-2.5 font-brand text-[17px] font-bold leading-snug text-brand-ink">
                        {title}
                      </h2>
                      {excerpt && (
                        <p className="mt-2 flex-1 font-brand text-[13px] font-medium leading-relaxed text-brand-ink/60">
                          {excerpt}
                        </p>
                      )}
                      <span className="mt-4 font-brand text-[12.5px] font-bold text-brand-blue">
                        {t.readMore} →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
