'use client';
// app/components/Trainer.jsx
//
// Заменяет TrainerFrame (iframe) — тренажёр монтируется прямо в
// страницу, без отдельного окна браузера внутри окна. Именно это чинит
// разом три вещи: одну шапку, реально зафиксированную Play-панель и
// мгновенное переключение режима/языка без перезагрузки.
//
// Как это работает: файл public/app/simulator.html остаётся ЕДИНЫМ
// источником правды (стили + разметка + скрипт тренажёра). Этот
// компонент один раз при монтировании подгружает его текстом, вынимает
// стили в <head> страницы, разметку — в свой контейнер, скрипт —
// выполняет и вызывает window.mountDombraTrainer(container, opts).
// Дальше режим/язык/мелодия меняются вызовами setMode/setLocale/setSong
// без пересоздания — см. возвращаемый объект в mountDombraTrainer()
// (конец простого скрипта в simulator.html).

import { useEffect, useRef } from 'react';

const TRAINER_URL = '/app/simulator.html';
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap';
const EXTERNAL_SCRIPTS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js',
  'https://cdn.jsdelivr.net/npm/soundfont-player@0.12.0/dist/soundfont-player.min.js',
];

// Кэшируем распарсенный файл и промис загрузки — при переходах между
// /tuner, /learn, /karaoke компонент не пересоздаётся (общий layout),
// но на случай будущих изменений не хотим тянуть/парсить файл повторно.
let assetsPromise = null;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Не удалось загрузить ${src}`));
    document.head.appendChild(s);
  });
}

function ensureFontsLink() {
  if (document.getElementById('dombra-trainer-fonts')) return;
  const link = document.createElement('link');
  link.id = 'dombra-trainer-fonts';
  link.rel = 'stylesheet';
  link.href = FONTS_URL;
  document.head.appendChild(link);
}

async function loadTrainerAssets() {
  if (assetsPromise) return assetsPromise;
  assetsPromise = (async () => {
    const res = await fetch(TRAINER_URL);
    if (!res.ok) throw new Error(`Не удалось загрузить ${TRAINER_URL}: ${res.status}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Стили тренажёра — переносим в <head> реальной страницы ОДИН РАЗ.
    // Второй <style> в файле лежит ВНУТРИ svg (#tunerNeckSvg) — он и так
    // приедет вместе с разметкой body, отдельно вытаскивать не нужно.
    if (!document.getElementById('dombra-trainer-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'dombra-trainer-styles';
      styleTag.textContent = doc.head.querySelector('style')?.textContent || '';
      document.head.appendChild(styleTag);
    }

    // Разметка body — без служебных <script>, их выполняем отдельно ниже
    const bodyClone = doc.body.cloneNode(true);
    bodyClone.querySelectorAll('script').forEach((el) => el.remove());
    const markup = bodyClone.innerHTML;

    // Единственный инлайновый <script> файла — определяет mountDombraTrainer
    const scripts = [...doc.querySelectorAll('script:not([src])')];
    const mainScript = scripts[scripts.length - 1]?.textContent || '';
    if (!mainScript) throw new Error('В simulator.html не найден основной <script>');

    return { markup, mainScript };
  })();
  return assetsPromise;
}

export default function Trainer({ mode, locale, song, onModeChange, onLocaleChange }) {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const mountedOptsRef = useRef({ mode, locale, song });

  // Всегда держим АКТУАЛЬНЫЕ пропсы под рукой: монтирование асинхронное
  // (нужно сначала загрузить simulator.html), и за это время режим/язык
  // могли уже смениться. Без этого тренажёр открывался в том режиме,
  // который был на момент начала загрузки, а не в текущем.
  const latestPropsRef = useRef({ mode, locale, song });
  latestPropsRef.current = { mode, locale, song };

  // Монтируем ОДИН РАЗ. mode/locale/song на момент первого рендера уходят
  // как начальные — дальнейшие изменения идут через setMode/setLocale/
  // setSong в отдельных эффектах ниже, без пересоздания тренажёра.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        ensureFontsLink();
        await Promise.all(EXTERNAL_SCRIPTS.map(loadScriptOnce));
        const { markup, mainScript } = await loadTrainerAssets();
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = markup;

        if (!window.mountDombraTrainer) {
          // eslint-disable-next-line no-new-func
          const run = new Function(mainScript);
          run();
        }
        if (!window.mountDombraTrainer) {
          throw new Error('simulator.html не определил window.mountDombraTrainer');
        }

        handleRef.current = window.mountDombraTrainer(containerRef.current, {
          ...mountedOptsRef.current,
          onModeChange,
          onLocaleChange,
        });

        // Досинхронизация с текущим адресом: пока файл грузился, режим или
        // язык могли уже поменяться (или тренажёр пересоздался при смене
        // языка). setMode/setLocale сами ничего не делают, если значение
        // уже совпадает, так что лишней работы здесь нет.
        const latest = latestPropsRef.current;
        handleRef.current.setLocale(latest.locale);
        handleRef.current.setMode(latest.mode);
      } catch (err) {
        // Не даём упасть всей странице — тренажёр просто не появится,
        // ошибка видна в консоли для отладки.
        console.error('[Trainer] не удалось смонтировать тренажёр:', err);
      }
    })();

    return () => {
      cancelled = true;
      handleRef.current?.destroy();
      handleRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Смена режима/языка/мелодии ПОСЛЕ первого монтирования — без
  // пересоздания тренажёра (см. setMode/setLocale/setSong в simulator.html)
  useEffect(() => {
    handleRef.current?.setMode(mode);
  }, [mode]);

  useEffect(() => {
    handleRef.current?.setLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (song) handleRef.current?.setSong(song);
  }, [song]);

  return <div ref={containerRef} className="dombra-trainer" />;
}
