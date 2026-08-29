import { Placeholder, SectionEyebrow } from "./ui";

// app/components/Certificate.jsx
//
// Раньше компонент вообще не принимал dict/locale (хотя LandingPage их
// уже передавала) — весь текст был на русском в JSX. Теперь — через
// dict.certificate.*, с русским текстом как запасным, как и везде.
//
// Важное уточнение от Айым: «сертификат настоящего казаха» и «Нағыз
// қазақ сертификаты» — одно и то же, это и есть тот сертификат на фото
// слева, а не отдельный предмет. Реальные физические бонусы, которые
// кладутся в коробку вместе с домброй и сертификатом — стикерпак А5
// (настоящий, отпечатанный) и мягкий чехол.
export default function Certificate({ dict }) {
  const t = dict?.certificate || {};

  return (
    <section
      id="certificate"
      className="scroll-mt-16 bg-brand-ink px-5 py-14 text-white lg:px-12 lg:py-20"
    >
      <div className="lg:mx-auto lg:max-w-[1180px]">
        <SectionEyebrow>{t.eyebrow || "ПОДЛИННОСТЬ"}</SectionEyebrow>
        <h2 className="mt-3 max-w-[640px] font-brand text-[30px] font-extrabold uppercase leading-[1.02] tracking-[-0.025em] sm:text-[36px] lg:text-[52px]">
          {t.title1 || "Нағыз қазақ"}{" "}
          <span className="font-display italic normal-case font-normal text-brand-lime">
            {t.title2 || "сертификаты"}
          </span>
        </h2>
        <p className="mt-3 max-w-[560px] font-brand text-sm font-medium leading-relaxed text-white/70">
          {t.subtitle ||
            "К каждому инструменту прилагается именной сертификат: порода дерева, имя мастера, дата сборки и номер экземпляра. А вместе с домброй вы получаете сертификат, стикерпак и мягкий чехол."}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="max-w-[460px] bg-white p-3.5 shadow-2xl">
            <div className="h-[300px] border border-[#E4E9F5]">
              <Placeholder>{t.photoCaption || "Фото сертификата «Нағыз қазақ сертификаты»"}</Placeholder>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            {(t.points || [
              "Уникальный номер и подпись мастера от руки",
              "QR-код с аудиозаписью и паспортом инструмента",
              "Подтверждает ручную работу и происхождение дерева",
            ]).map((line) => (
              <div key={line} className="flex items-start gap-3 bg-white/5 p-4">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-brand-lime" />
                <span className="font-brand text-[13.5px] font-medium leading-relaxed text-white/82">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4 font-brand text-[12px] font-bold uppercase tracking-[0.1em] text-brand-lime">
            {t.bundleLabel || "В комплекте с домброй"}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 bg-white/5 p-4">
              <div className="h-[84px] w-[84px] flex-none">
                <Placeholder>{t.stickerPhotoCaption || "фото — стикерпак А5"}</Placeholder>
              </div>
              <div>
                <div className="font-brand text-[14px] font-extrabold leading-snug">
                  {t.stickerTitle || "Стикерпак А5"}
                </div>
                <div className="mt-1 font-brand text-[12px] font-medium leading-relaxed text-white/60">
                  {t.stickerDesc ||
                    "Реальный печатный набор наклеек с домброй — кладём в коробку вместе с сертификатом"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4">
              <div className="h-[84px] w-[84px] flex-none">
                <Placeholder>{t.casePhotoCaption || "фото — мягкий чехол"}</Placeholder>
              </div>
              <div>
                <div className="font-brand text-[14px] font-extrabold leading-snug">
                  {t.caseTitle || "Мягкий чехол"}
                </div>
                <div className="mt-1 font-brand text-[12px] font-medium leading-relaxed text-white/60">
                  {t.caseDesc || "Для переноски и защиты инструмента — идёт в комплекте"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
