'use client';
// app/[locale]/(trainer)/layout.jsx
//
// Общий layout для /tuner, /learn, /karaoke. Папка (trainer) — "route
// group": в адресе не участвует, нужна только чтобы у этих трёх страниц
// был СВОЙ общий layout, который Next.js не пересоздаёт при переходах
// между ними (и при смене языка тоже — [locale] выше в дереве меняет
// только params, сам компонент на том же месте дерева не размонтируется).
//
// Здесь и только здесь живёт <Trainer> — двигатель тренажёра монтируется
// один раз и просто получает новые mode/locale при переходах, вместо
// того чтобы каждый раз загружаться заново.
//
// mode/locale читаются из URL (а не передаются пропом откуда-то) —
// значит URL остаётся единственным источником правды, и обновление
// страницы (F5) на /kz/karaoke всегда откроет тренажёр в нужном режиме.

import { usePathname, useRouter } from 'next/navigation';
import Trainer from '@/app/components/Trainer';

// URL-сегмент → внутреннее имя режима тренажёра (в simulator.html
// "обучение" по историческим причинам называется normal)
const PATH_TO_MODE = { tuner: 'tuner', learn: 'normal', karaoke: 'karaoke' };
const MODE_TO_PATH = { tuner: 'tuner', normal: 'learn', karaoke: 'karaoke' };
const DEFAULT_MODE_PATH = 'learn';

export default function TrainerLayout({ children }) {
  const pathname = usePathname() || '';
  const router = useRouter();

  const segs = pathname.split('/').filter(Boolean);
  const locale = segs[0] || 'ru';
  const modePath = segs[1] || DEFAULT_MODE_PATH;
  const mode = PATH_TO_MODE[modePath] || 'normal';

  return (
    <>
      <Trainer
        mode={mode}
        locale={locale}
        onModeChange={(newMode) => {
          const target = `/${locale}/${MODE_TO_PATH[newMode] || DEFAULT_MODE_PATH}`;
          if (target !== pathname) router.push(target, { scroll: false });
        }}
        onLocaleChange={(newLocale) => {
          const target = `/${newLocale}/${modePath}`;
          if (target !== pathname) router.push(target, { scroll: false });
        }}
      />
      {/* key={pathname} — без него бывало, что SEO-текст под тренажёром
          "отставал" на один переход: заходишь в караоке — виден текст
          обучения, обновляешь страницу (F5) — правильный караоке,
          переключаешься в обучение — виден текст караоке. Похоже на
          известную особенность App Router: этот layout клиентский и сам
          перерисовывается мгновенно по смене pathname, а дочерняя
          серверная страница (сам текст) — нет, если React не получит явный
          сигнал "это другой элемент, а не тот же самый с новым содержимым".
          key меняется на каждую смену маршрута — React каждый раз монтирует
          текстовый блок заново, а не пытается переиспользовать старый. */}
      <div key={pathname}>{children}</div>
    </>
  );
}
