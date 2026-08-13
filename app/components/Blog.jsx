import { Placeholder, Button, SectionEyebrow } from "./ui";

// Статьи приходят пропсом: LandingPage помечен "use client", поэтому
// обращаться к базе внутри него нельзя — данные забирает серверная
// страница app/[locale]/page.jsx и передаёт вниз.
export default function Blog({ posts = [], dict, locale }) {
  const t = (dict?.pages?.blog) || {};
  if (!posts.length) return null;

  const pick = (map) => {
    if (!map || typeof map !== "object") return "";
    if (map[locale]) return map[locale];
    for (const c of ["ru", "kz", "en", "tr"]) if (map[c]) return map[c];
    return "";
  };

  return (
    <section id="blog" className="scroll-mt-16 bg-brand-bg px-5 py-10 lg:px-7">
      <div className="lg:mx-auto lg:max-w-[1180px]">
        <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
        <h2 className="mt-3 mb-5.5 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
          {t.homeTitle}
        </h2>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {posts.map((post) => {
            const category =
              (t.categories && t.categories[post.category_key]) || post.category_key;
            return (
              <article
                key={post.slug}
                className="flex flex-col border border-brand-border bg-white"
              >
                <a href={`/${locale}/blog/${post.slug}`} className="block h-[160px]">
                  {post.cover_url ? (
                    <img
                      src={post.cover_url}
                      alt={pick(post.title_i18n)}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Placeholder>{category}</Placeholder>
                  )}
                </a>
                <div className="p-4.5">
                  <div className="flex items-center gap-2.5 font-brand text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-ink/40">
                    <span className="text-brand-blue">{category}</span>
                    {post.read_minutes ? (
                      <span>{post.read_minutes} {t.readMinutes}</span>
                    ) : null}
                  </div>
                  <h3 className="mt-2.5 font-brand text-[17px] font-bold leading-snug">
                    <a href={`/${locale}/blog/${post.slug}`}>{pick(post.title_i18n)}</a>
                  </h3>
                  <p className="mt-2 font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
                    {pick(post.excerpt_i18n)}
                  </p>
                  <div className="mt-4">
                    <a href={`/${locale}/blog/${post.slug}`}>
                      <Button variant="secondary" size="sm">
                        {t.readMore}
                      </Button>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
