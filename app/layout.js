import "./globals.css";

export const metadata = {
  title: "Домбыра — онлайн-тренажёр домбры | dombyra.kz",
  description:
    "Интерактивный тренажёр домбры: разучивай мелодии по грифу, играй в режиме караоке и настраивай инструмент. Для детей и взрослых.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Manrope:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-ink">
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
