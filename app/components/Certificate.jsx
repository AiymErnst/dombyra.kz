import { Placeholder, SectionEyebrow } from "./ui";

export default function Certificate() {
  return (
    <section id="certificate" className="scroll-mt-16 bg-brand-ink px-5 py-10 text-white lg:px-7">
      <div className="lg:mx-auto lg:max-w-[1180px]">
        <SectionEyebrow>ПОДЛИННОСТЬ</SectionEyebrow>
        <h2 className="mt-3 max-w-[640px] font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.025em] lg:text-[52px]">
          Нағыз қазақ
          <br />
          сертификаты
        </h2>
        <p className="mt-2.5 max-w-[640px] font-brand text-sm font-medium leading-relaxed text-white/70">
          К каждому инструменту прилагается именной сертификат: порода
          дерева, имя мастера, дата сборки и номер экземпляра.
        </p>
        <div className="mt-6 max-w-[460px] bg-white p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <div className="h-[360px] border border-[#E4E9F5]">
            <Placeholder>Фото сертификата «Нағыз қазақ сертификаты»</Placeholder>
          </div>
        </div>
        <div className="mt-6 flex max-w-[640px] flex-col gap-3">
          {[
            "Уникальный номер и подпись мастера от руки",
            "QR-код с аудиозаписью и паспортом инструмента",
            "Подтверждает ручную работу и происхождение дерева",
          ].map((line) => (
            <div key={line} className="flex items-baseline gap-3">
              <span className="mt-[-2px] h-1.5 w-1.5 flex-none bg-brand-lime" />
              <span className="font-brand text-[13.5px] font-medium leading-relaxed text-white/82">
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
