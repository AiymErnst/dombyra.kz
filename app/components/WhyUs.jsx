import { WHY_TAGS } from "./data";

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-16 bg-white px-5 py-11 text-center lg:px-7">
      <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
      <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em]">
        Почему
        <br />
        <span className="text-brand-blue">именно мы</span>
      </h2>
      <div className="mx-auto mt-6.5 flex max-w-[900px] flex-wrap justify-center gap-2">
        {WHY_TAGS.map((tag) => (
          <span
            key={tag.label}
            className={`inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2.5 font-brand text-[12.5px] font-bold tracking-[-0.01em] ${
              tag.filled
                ? "bg-brand-blue text-white"
                : "border border-[#D8E0EE] bg-brand-bg text-brand-blue"
            }`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </section>
  );
}
