import { CONTACT_WHATSAPP_URL } from "./data";

// app/components/LeadForm.jsx
//
// Раньше здесь было поле для номера телефона + кнопка "Купить с
// подбором" — Айым попросила убрать саму форму: клиент должен сразу
// нажимать и переходить в WhatsApp, без набора номера.
//
// Ссылка на WhatsApp — из data.js (CONTACT_WHATSAPP_URL), чтобы номер
// хранился в одном месте и не расходился с тем, что в Header.jsx.
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.7-.3-1.4-.8-2-1.4-.5-.5-1-1.1-1.3-1.8-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.8 2.8 4.4 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export default function LeadForm({ dict }) {
  const t = dict?.leadForm || {};
  const message = encodeURIComponent(
    t.prefillMessage || "Здравствуйте! Помогите подобрать домбру."
  );

  return (
    <section id="lead" className="bg-brand-blue px-5 py-14 text-white lg:px-7 lg:py-20">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="font-brand text-[26px] font-extrabold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[34px]">
          {t.title1 || "Подберём"}{" "}
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-lime">
            {t.title2 || "домбыру"}
          </span>{" "}
          {t.title3 || "под вашу руку"}
        </h2>
        <p className="mt-3 mb-6 font-brand text-sm font-medium leading-relaxed text-white/78">
          {t.subtitle ||
            "Мастер сам напишет вам в WhatsApp и пришлёт аудиозаписи трёх подходящих инструментов — никаких форм, просто нажмите."}
        </p>
        
          href={`${CONTACT_WHATSAPP_URL}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-lime py-4 font-brand text-sm font-bold text-brand-ink sm:w-auto sm:px-10"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t.cta || "Написать в WhatsApp"}
        </a>
      </div>
    </section>
  );
}
