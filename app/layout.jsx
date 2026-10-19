import Script from 'next/script';
import './globals.css';

// Google Analytics 4. ID берётся из переменной Vercel NEXT_PUBLIC_GA_ID
// (вид G-XXXXXXXXXX). Пока переменной нет, счётчик просто не грузится.
// Переходы между страницами без перезагрузки GA4 ловит сам —
// настройка «Enhanced measurement → Page changes based on browser history».
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
