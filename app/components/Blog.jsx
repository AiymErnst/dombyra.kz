import { Placeholder, Button, SectionEyebrow } from "./ui";
import { BLOG_POSTS } from "./data";

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-16 bg-brand-bg px-5 py-10 lg:px-7">
      <div className="lg:mx-auto lg:max-w-[1180px]">
        <SectionEyebrow>ЖУРНАЛ</SectionEyebrow>
        <h2 className="mt-3 mb-5.5 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
          Читать перед покупкой
        </h2>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.title}
              className="flex flex-col border border-brand-border bg-white"
            >
              <div className="h-[160px]">
                <Placeholder>Фото: {post.category.toLowerCase()}</Placeholder>
              </div>
              <div className="p-4.5">
                <div className="flex items-center gap-2.5 font-brand text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-ink/40">
                  <span className="text-brand-blue">{post.category}</span>
                  <span>{post.time}</span>
                </div>
                <h3 className="mt-2.5 font-brand text-[17px] font-bold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
                  {post.desc}
                </p>
                <div className="mt-4">
                  <Button variant="secondary" size="sm">
                    Читать
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
