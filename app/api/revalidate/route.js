// app/api/revalidate/route.js
//
// Мгновенное обновление страниц при изменении мелодий в Supabase.
//
// Без него правки доезжают за сутки (revalidate = 86400). Этого хватает
// для описаний, но не для случая «добавила мелодию и хочу увидеть её
// сейчас». Вебхук закрывает разрыв.
//
// ── Настройка в Supabase ──
// Database → Webhooks → Create a new hook
//   Table:      songs
//   Events:     Insert, Update, Delete
//   Type:       HTTP Request → POST
//   URL:        https://ваш-домен/api/revalidate
//   HTTP Headers: x-revalidate-secret: <значение REVALIDATE_SECRET>
//
// Переменную REVALIDATE_SECRET задайте в настройках проекта на Vercel.
// Без секрета кто угодно смог бы дёргать пересборку и создавать нагрузку.

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { locales } from '@/lib/i18n';

export async function POST(request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'forbidden' }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    // Supabase присылает JSON, но на ручной вызов без тела не падаем
  }

  // В полезной нагрузке вебхука: record — строка после изменения,
  // old_record — до. При удалении record пустой, slug берём из old_record.
  const slug = body?.record?.slug || body?.old_record?.slug || null;

  const revalidated = [];
  for (const locale of locales) {
    // каталог мелодий и карта сайта меняются при любом изменении
    revalidatePath(`/${locale}/songs`);
    revalidated.push(`/${locale}/songs`);

    if (slug) {
      revalidatePath(`/${locale}/songs/${slug}`);
      revalidated.push(`/${locale}/songs/${slug}`);
    }
  }
  revalidatePath('/sitemap.xml');
  revalidated.push('/sitemap.xml');

  return NextResponse.json({ ok: true, slug, revalidated });
}
