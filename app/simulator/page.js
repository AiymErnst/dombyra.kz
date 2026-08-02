export const metadata = {
  title: "Тренажёр домбры | dombyra.kz",
  description:
    "Интерактивный гриф домбры, библиотека мелодий и режим караоке с распознаванием игры.",
};

export default function SimulatorPage() {
  return (
    <div className="flex flex-1 flex-col">
      <iframe
        src="/simulator.html"
        title="Тренажёр домбры"
        allow="microphone"
        className="min-h-[900px] w-full flex-1 border-0"
      />
    </div>
  );
}
