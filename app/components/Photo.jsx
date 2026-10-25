// app/components/Photo.jsx
//
// Одно правило для всех фото на сайте:
//   • значение начинается с «/» — это путь к файлу в public/,
//     например "/content/volk/volk-1.jpg" → показываем фото;
//   • любой другой текст — серая заглушка с этим текстом
//     (удобно, пока настоящего фото ещё нет).
//
// Фото показываются через next/image: Vercel сам уменьшает их до размера,
// который реально нужен на экране, переводит в лёгкий формат WebP и
// грузит только тогда, когда человек до фото долистал. Исходник с
// телефона на 300 КБ–1 МБ превращается примерно в 30–80 КБ.
//
// ВАЖНО для того, кто вставляет <Photo>: у родительского блока должен
// быть класс relative (или absolute) и заданный размер — фото
// растягивается на весь этот блок (fill).
//
// sizes — подсказка браузеру, какой ширины фото на экране, чтобы он
// скачал версию нужного размера, а не огромную. priority — только для
// фото на первом экране (обложка главной): его грузим сразу, без очереди.

import Image from "next/image";
import { Placeholder } from "./ui";

// Путь к своему файлу ("/content/…") или полный адрес картинки в интернете
// ("https://…", например фото из Supabase).
export function isPhotoPath(value) {
  return typeof value === "string" && (value.startsWith("/") || /^https?:\/\//.test(value));
}

export default function Photo({
  src,
  label,
  alt,
  sizes = "100vw",
  priority = false,
  className = "object-cover",
}) {
  if (isPhotoPath(src)) {
    return (
      <Image
        src={src}
        alt={alt || label || ""}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        // чужие адреса (https://…) показываем как есть: сжимать через Vercel
        // можно только файлы с разрешённых сайтов, иначе фото не покажется
        unoptimized={!src.startsWith("/")}
      />
    );
  }
  return <Placeholder>{label || src || "Фото"}</Placeholder>;
}
