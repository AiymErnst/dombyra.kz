// app/api/revalidate/route.js
//
// Мгновенное обновление страниц при изменении данных в Supabase.
//
// Без него правки доезжают за час (revalidate = 3600 у каталога) или
// за сутки (revalidate = 86400 у мелодий). Этого хватает для мелких
// правок описаний, но не для случая «добавила товар и хочу увидеть
// его сейчас». Вебхук закрывает разрыв.
//
// Теперь понимает ДВЕ таблицы: songs (было) и dombras (добавлено) —
// определяет, какую именно, по полю table в теле вебхука от Supabase.
//
// ── Настройка в Supabase ──
// Database → Webhooks → Create a new hook
//   Table:      songs  (или dombras — заводите ВТОРОЙ отдельный вебхук)
//   Events:     Insert, Update, Delete
//   Type:       HTTP Request → POST
//   URL:        https://ваш-домен/api/revalidate
//   HTTP Headers: x-revalidate-secret: <значение REVALIDATE_SECRET>
//
// Переменную REVALIDATE_SECRET задайте в настройках проекта на Vercel.
// Без секрета кто угодно смог бы дёргать пересборку и создавать нагрузку.
//
// Важно: для dombras нужен ОТДЕЛЬНЫЙ вебхук в Supabase (Table: dombras),
// указывающий на тот же URL — Supabase не умеет один вебхук вешать на
// две таблицы сразу. Этот файл сам разберётся, что пришло, по полю table.

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

  const table = body?.table || null;
  const slug = body?.record?.slug || body?.old_record?.slug || null;

  const revalidated = [];

  if (table === 'dombras') {
    for (const locale of locales) {
      revalidatePath(`/${locale}/katalog`);
      revalidated.push(`/${locale}/katalog`);
      revalidatePath(`/${locale}`);
      revalidated.push(`/${locale}`);

      if (slug) {
        revalidatePath(`/${locale}/katalog/${slug}`);
        revalidated.push(`/${locale}/katalog/${slug}`);
      }
    }
  } else {
    for (const locale of locales) {
      revalidatePath(`/${locale}/songs`);
      revalidated.push(`/${locale}/songs`);

      if (slug) {
        revalidatePath(`/${locale}/songs/${slug}`);
        revalidated.push(`/${locale}/songs/${slug}`);
      }
    }
    revalidatePath('/sitemap.xml');
    revalidated.push('/sitemap.xml');
  }

  return NextResponse.json({ ok: true, table, slug, revalidated });
}
