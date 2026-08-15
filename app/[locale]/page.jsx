// app/[locale]/page.jsx
//
// Главная. Статьи для блока «Журнал» и домбры для блока «Каталог»
// забираем здесь, на сервере: LandingPage помечен "use client" и
// обращаться к базе не может.
import LandingPage from "@/app/components/LandingPage";
import { getDictionary } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { getDombras } from "@/lib/dombras";

export const revalidate = 3600;

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const posts = await getPosts(3);              // на лендинге показываем три
  const { items: catalogItems } = await getDombras(3, 0); // и три домбры

  return (
    <LandingPage
      dict={dict}
      locale={locale}
      posts={posts}
      catalogItems={catalogItems}
    />
  );
}
