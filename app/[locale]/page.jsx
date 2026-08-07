import { getDictionary } from '@/lib/i18n';

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <main>
      <nav>
        <a href={`/${locale}/catalog`}>{dict.nav.catalog}</a>
        <a href={`/${locale}/certificate`}>{dict.nav.certificate}</a>
        <a href="/simulator">{dict.nav.trainer}</a>
        <a href="/simulator#tuner">{dict.nav.tuner}</a>
        <a href="#why">{dict.nav.why}</a>
        <a href={`/${locale}/reviews`}>{dict.nav.reviews}</a>
        <a href={`/${locale}/blog`}>{dict.nav.blog}</a>
      </nav>

      <section>
        <span>{dict.hero.badge}</span>
        <h1>{dict.hero.title}</h1>
        <p>{dict.hero.subtitle}</p>
        <div>
          <strong>{dict.hero.productName}</strong>
          <span>{dict.hero.productDesc}</span>
          <button>{dict.hero.cta}</button>
        </div>
      </section>

      <section>
        <div>
          <strong>{dict.stats.since.year}</strong>
          <p>{dict.stats.since.label}</p>
        </div>
        <div>
          <strong>{dict.stats.launch.year}</strong>
          <p>{dict.stats.launch.label}</p>
        </div>
        <div>
          <strong>{dict.stats.clients.value}</strong>
          <p>{dict.stats.clients.label}</p>
        </div>
      </section>
    </main>
  );
}
