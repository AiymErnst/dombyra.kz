import { Button } from "./ui";

export default function LeadForm() {
  return (
    <section id="lead" className="bg-brand-blue px-5 py-9 pb-10 text-white lg:px-7">
      <div className="lg:mx-auto lg:max-w-[560px]">
        <h2 className="font-brand text-[26px] font-extrabold uppercase leading-[1.08] tracking-[-0.025em]">
          Подберём домбыру под вашу руку
        </h2>
        <p className="mt-2.5 mb-5 font-brand text-sm font-medium leading-relaxed text-white/78">
          Оставьте номер — мастер напишет в WhatsApp и пришлёт аудиозаписи
          трёх подходящих инструментов.
        </p>
        <div className="flex flex-col gap-2.5">
          <input
            type="tel"
            placeholder="+7 (___) ___ __ __"
            className="w-full rounded-full border border-white/35 bg-white/8 px-4 py-3.5 font-brand text-sm font-medium text-white placeholder:text-white/55"
          />
          <Button className="w-full">Купить с подбором</Button>
        </div>
        <div className="mt-3 font-brand text-[11px] font-medium text-white/62">
          Нажимая кнопку, вы соглашаетесь с политикой обработки данных.
        </div>
      </div>
    </section>
  );
}
