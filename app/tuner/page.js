export const metadata = {
  title: "Бесплатный тюнер домбры онлайн | dombyra.kz",
  description:
    "Настройте домбру за минуту прямо в браузере — тюнер слышит обе струны и показывает, куда крутить колки. Без установки и регистрации.",
};

export default function TunerPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <iframe
        src="/simulator.html?mode=tuner"
        title="Тюнер домбры"
        allow="microphone"
        className="w-full flex-1 border-0"
      />
    </div>
  );
}
