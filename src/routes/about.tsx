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
      eyebrow="ABOUT ZARIASPA"
      title="Carrying medicine along ancient"
      italicWord="routes."
      lede="Zariaspa Trading was founded in Kabul on a simple principle: the corridors that once moved silk and spice between civilizations can move modern medicine just as faithfully — if someone is willing to do the unglamorous work of doing it right."
      hero={{ src: img1, alt: "Modern Kabul cityscape at dusk with mountains in the distance", w: 1600, h: 900 }}
      body={[
        {
          heading: "Our origin",
          paragraphs: [
            "We took our name from Zariaspa — the ancient Greek name for the city of Balkh in northern Afghanistan, a key waypoint on the original Silk Road. The name is a reminder that this country has always been a connector of worlds.",
            "We started by helping a single hospital in Kabul source spare parts for a CT scanner that had been sitting idle for two years. Today we operate across five hubs and forty countries — but the founding principle hasn't moved.",
          ],
        },
        {
          heading: "What we believe",
          paragraphs: [
            "Provenance matters. Patients deserve genuine equipment with verified chains of custody, not grey-market guesses.",
            "Logistics is care. A vaccine at 9°C is a vaccine that fails. Cold-chain integrity is not a service line — it is patient safety.",
            "Geography is opportunity. The same routes that history called difficult, we call our specialty.",
          ],
        },
        {
          heading: "How we work",
          paragraphs: [
            "Quietly. Carefully. With paperwork in order. Our partners — hospitals, ministries, NGOs, manufacturers — choose us because we make difficult corridors feel uneventful. That is the highest compliment a logistics partner can receive.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Diverse leadership team collaborating", w: 1280, h: 832 },
        { src: img3, alt: "Caravan of camels silhouetted against desert sunset", w: 1280, h: 832 },
        { src: img1, alt: "Kabul cityscape", w: 1600, h: 900 },
      ]}
    />
  ),
});
