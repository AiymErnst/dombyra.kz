// app/[locale]/page.jsx
//
// Главная. Статьи для блока «Журнал» забираем здесь, на сервере:
// LandingPage помечен "use client" и обращаться к базе не может.

import LandingPage from "@/app/components/LandingPage";
import { getDictionary } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";

export const revalidate = 3600;

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const posts = await getPosts(3);   // на лендинге показываем три

  return <LandingPage dict={dict} locale={locale} posts={posts} />;
}
