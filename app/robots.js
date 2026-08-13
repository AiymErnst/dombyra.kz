// app/robots.js → отдаётся по /robots.txt
//
// Пока домен не переехал с Tilda, сайт живёт на адресе *.vercel.app.
// Его нельзя пускать в индекс: получился бы второй сайт с тем же
// содержанием, конкурирующий с боевым доменом.
//
// Переключается переменной NEXT_PUBLIC_ALLOW_INDEXING:
//   не задана или 'false' → всё закрыто от роботов
//   'true'                → обычный robots.txt
// После переноса домена поставьте её в 'true' и передеплойте.

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const ALLOW = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export default function robots() {
  if (!ALLOW) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
