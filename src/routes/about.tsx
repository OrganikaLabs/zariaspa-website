import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/about-1.jpg";
import img2 from "@/assets/pages/about-2.jpg";
import img3 from "@/assets/pages/about-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zariaspa — From Kabul, the modern Silk Road" },
      {
        name: "description",
        content:
          "Founded in Kabul, Zariaspa carries premium medical equipment, healthcare technology, and pharmaceuticals along the corridors that once carried silk and spice.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      tKey="about"
      hero={{ src: img1, alt: "Modern Kabul cityscape at dusk with mountains in the distance", w: 1600, h: 900 }}
      sections={[
        { headingKey: "s1h", paragraphKeys: ["s1p1", "s1p2"] },
        { headingKey: "s2h", paragraphKeys: ["s2p1", "s2p2", "s2p3"] },
        { headingKey: "s3h", paragraphKeys: ["s3p1"] },
      ]}
      gallery={[
        { src: img2, alt: "Diverse leadership team collaborating", w: 1280, h: 832 },
        { src: img3, alt: "Caravan of camels silhouetted against desert sunset", w: 1280, h: 832 },
        { src: img1, alt: "Kabul cityscape", w: 1600, h: 900 },
      ]}
    />
  ),
});
