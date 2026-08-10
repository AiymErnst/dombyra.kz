export const metadata = {
  title: "Караоке для домбры — играй под подсказки в реальном времени | dombyra.kz",
  description:
    "Режим караоке слушает твою игру через микрофон и подсвечивает лады в темпе мелодии — сразу видно, где ошибся. Бесплатно, без установки.",
};

export default function KaraokePage() {
  return (
    <div className="flex flex-1 flex-col">
      <iframe
        src="/simulator.html?mode=karaoke"
        title="Караоке-режим для домбры"
        allow="microphone"
        className="min-h-[900px] w-full flex-1 border-0"
      />
    </div>
  );
}
