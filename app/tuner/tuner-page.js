export const metadata = {
  title: "Бесплатный тюнер домбры онлайн | dombyra.kz",
  description:
    "Настройте домбру за минуту прямо в браузере — тюнер слышит обе струны и показывает, куда крутить колки. Без установки и регистрации.",
};

export default function TunerPage() {
  return (
    <div className="flex flex-1 flex-col">
      <iframe
        src="/simulator.html?mode=tuner"
        title="Тюнер домбры"
        allow="microphone"
        className="min-h-[900px] w-full flex-1 border-0"
      />
    </div>
  );
}
