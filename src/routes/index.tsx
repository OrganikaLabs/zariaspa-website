import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { TrustMarquee } from "@/components/TrustMarquee";
import { Footer } from "@/components/Footer";
import "@/i18n";
import { useHtmlLangDir } from "@/i18n/useHtmlLangDir";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zariaspa Trading — Pioneering Global Healthcare Logistics" },
      {
        name: "description",
        content:
          "Kabul-based international trading partner for medical equipment, healthcare tech, and pharmaceutical supply chains. WHO & ISO 13485 aligned.",
      },
      { property: "og:title", content: "Zariaspa Trading — Global Healthcare Logistics" },
      {
        property: "og:description",
        content:
          "Bridging Kabul to the world with premium medical equipment, healthcare tech, and secure pharmaceutical supply chains.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useHtmlLangDir();
  return (
    <main className="min-h-screen bg-parchment text-ink">
      <Navbar />
      <Hero />
      <BentoGrid />
      <TrustMarquee />
      <Footer />
    </main>
  );
}
