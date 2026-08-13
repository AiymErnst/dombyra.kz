'use client';
// app/components/TrainerFrame.jsx
//
// Тренажёр подключается статикой из public/app/simulator.html.
//
// allow="microphone" ОБЯЗАТЕЛЕН: без него браузер блокирует доступ к
// микрофону во вложенном документе, и тюнер с караоке молча не работают.
//
// Параметры: mode — режим, lang — язык интерфейса, song — slug мелодии.
// simulator.html читает их сам и открывается в нужном состоянии.

export default function TrainerFrame({ mode = 'normal', locale, song, title }) {
  const params = new URLSearchParams({ mode, lang: locale });
  if (song) params.set('song', song);

  return (
    <div className="trainer-frame">
      <iframe
        src={`/app/simulator.html?${params.toString()}`}
        title={title}
        allow="microphone; autoplay"
        loading="eager"
      />
    </div>
  );
}
