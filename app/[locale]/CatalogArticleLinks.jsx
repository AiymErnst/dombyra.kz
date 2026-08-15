import Link from "next/link";

// Пока просто статичный список — когда появится таблица articles в
// Supabase, легко заменить на выборку оттуда (по тегу "каталог" или
// похожему), сама вёрстка блока не изменится.
const ARTICLES = [
  { title: "Как выбрать домбру новичку", href: "/blog/kak-vybrat-dombru" },
  { title: "Домбра для ребёнка: с чего начать", href: "/blog/dombra-dlya-rebenka" },
  { title: "Оң бұрау и теріс бұрау — в чём разница", href: "/blog/tuning-difference" },
];

export default function CatalogArticleLinks() {
  return (
    <section className="mt-16 pt-8 border-t border-brand-ink/10">
      <h2 className="text-lg font-medium text-brand-ink mb-4">
        Прежде чем выбрать
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        {ARTICLES.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex-1 px-4 py-3 rounded-xl border border-brand-ink/10 text-brand-ink/80 hover:border-amber-400 hover:text-amber-700 transition-colors text-sm"
          >
            {a.title} →
          </Link>
        ))}
      </div>
    </section>
  );
}
