export const metadata = {
  title: "Тренажёр домбры онлайн — учись играть по грифу | dombyra.kz",
  description:
    "Интерактивный гриф домбры с подсветкой ладов, библиотекой мелодий и разбором кюев. Учись играть прямо в браузере, без установки и регистрации.",
};

export default function LearnPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <iframe
        src="/simulator.html"
        title="Тренажёр домбры — режим обучения"
        allow="microphone"
        className="w-full flex-1 border-0"
      />
    </div>
  );
}
