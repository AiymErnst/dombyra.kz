import LandingPage from "@/app/components/LandingPage";
import { getDictionary } from "@/lib/i18n";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <LandingPage dict={dict} />;
}
