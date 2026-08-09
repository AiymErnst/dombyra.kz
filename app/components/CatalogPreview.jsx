import { Placeholder, Badge, Button } from "./ui";
import { CATALOG } from "./data";

export default function CatalogPreview() {
  return (
    <section id="catalog" className="scroll-mt-16 bg-white pt-10 lg:mx-auto lg:max-w-[1180px]">
      <div className="flex items-end justify-between gap-3 px-5 pb-1.5 lg:px-7">
        <h2 className="font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
          Каталог
        </h2>
        <a
          href="#catalog"
          className="pb-1 font-brand text-xs font-bold uppercase tracking-[0.08em] text-brand-teal"
        >
          все 47 →
        </a>
      </div>
      <p className="px-5 font-brand text-sm font-medium text-brand-ink/60 lg:px-7">
        Каждая домбыра — один экземпляр. Слушайте запись до покупки.
      </p>
      <div
        data-row
        className="flex gap-3 overflow-x-auto px-5 py-4 [scroll-snap-type:x_mandatory] lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-7"
      >
        {CATALOG.map((item) => (
          <article
            key={item.name}
            className="w-[232px] flex-none border border-brand-border bg-white [scroll-snap-align:start] lg:w-auto"
          >
            <div className="relative h-[232px] bg-brand-bg lg:h-[300px]">
              <Placeholder>Домбыра «{item.name}»</Placeholder>
              {item.badge && (
                <div className="pointer-events-none absolute left-0 top-0">
                  <Badge>{item.badge}</Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="font-brand text-[17px] font-bold">{item.name}</div>
              <div className="mt-1 font-brand text-xs font-medium text-brand-ink/50">
                {item.subtitle}
              </div>
              <div className="mt-3 font-brand text-lg font-extrabold text-brand-blue">
                {item.price}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="px-5 lg:px-7">
        <Button className="w-full lg:w-auto">Перейти в каталог</Button>
      </div>
      <div className="h-16" />
    </section>
  );
}
