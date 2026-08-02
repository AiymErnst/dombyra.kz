import LandingPage from "./components/LandingPage";

export const metadata = {
  title: "dombyra.kz — мастерские домбры и онлайн-тренажёр",
  description:
    "Мастерские домбры ручной работы, сертификат подлинности на каждый инструмент, бесплатный онлайн-тренажёр и тюнер домбры.",
  openGraph: {
    title: "dombyra.kz — мастерские домбры и онлайн-тренажёр",
    description:
      "Мастерские домбры ручной работы, сертификат подлинности на каждый инструмент, бесплатный онлайн-тренажёр и тюнер домбры.",
    url: "https://dombyra.kz",
    siteName: "dombyra.kz",
    locale: "ru_RU",
    type: "website",
  },
};

export default function Home() {
  return <LandingPage />;
}
