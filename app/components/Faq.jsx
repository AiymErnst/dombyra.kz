import { SectionEyebrow } from "./ui";
import { FAQS } from "./data";

export default function Faq({ openFaq, onToggle }) {
  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-white px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7"
    >
      <SectionEyebrow>ВОПРОС — ОТВЕТ</SectionEyebrow>
      <h2 className="mt-3 mb-1 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
        Что спрашивают чаще всего
      </h2>
      <div>
        {FAQS.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={faq.q} className="border-t border-brand-border last:border-b">
              <button
                onClick={() => onToggle(isOpen ? -1 : i)}
                className="flex w-full items-start gap-3.5 border-none bg-transparent py-4.5 text-left cursor-pointer"
              >
                <span className="flex-1 font-brand text-[15px] font-bold leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`flex-none w-5 font-brand text-xl font-bold text-brand-blue transition-transform duration-150 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="m-0 pb-5 pr-8 font-brand text-sm font-medium leading-relaxed text-brand-ink/62">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
