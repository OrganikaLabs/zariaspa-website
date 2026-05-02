import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import img1 from "@/assets/pages/healthtech-1.jpg";
import img2 from "@/assets/pages/healthtech-2.jpg";
import img3 from "@/assets/pages/healthtech-3.jpg";

export const Route = createFileRoute("/solutions/healthtech")({
  head: () => ({
    meta: [
      { title: "Healthcare Technology — Zariaspa Trading" },
      {
        name: "description",
        content:
          "Diagnostics, IoT devices, and hospital information systems integration tailored for institutions across Afghanistan and the wider region.",
      },
    ],
  }),
  component: () => (
    <PageLayout
      eyebrow="03 — HEALTHTECH"
      title="Healthcare technology, integrated"
      italicWord="end-to-end."
      lede="Connected diagnostics, IoT-enabled monitoring, and the EMR backbone that ties them together — implemented by a team that understands both bedside reality and ministry policy."
      hero={{ src: img1, alt: "Doctor reviewing patient diagnostics on a tablet", w: 1280, h: 832 }}
      body={[
        {
          heading: "Diagnostics that travel",
          paragraphs: [
            "Point-of-care analyzers, portable ultrasound, ECG, and connected vital-signs platforms — selected for ruggedness, low power draw, and serviceability in environments that range from tertiary hospitals to provincial clinics.",
            "Every device ships with cloud or on-premise data sync, configurable to the receiving institution's bandwidth and privacy posture.",
          ],
        },
        {
          heading: "IoT for clinical operations",
          paragraphs: [
            "Asset tracking for crash carts and infusion pumps. Cold-room temperature telemetry. Bed-occupancy and oxygen-flow sensors. We deploy the hardware, the gateway, and the dashboards — and we train the biomeds who keep them running.",
          ],
        },
        {
          heading: "Hospital information systems",
          paragraphs: [
            "From ADT and EMR to LIS, RIS, and PACS — we integrate proven HIS platforms with HL7 / FHIR pipelines that connect imaging, laboratory, pharmacy, and finance into one operational picture.",
            "Implementations are phased to keep wards live, with multilingual UIs in English, Dari, Pashto, and Arabic.",
          ],
        },
      ]}
      gallery={[
        { src: img2, alt: "Portable diagnostic IoT device", w: 1024, h: 1024 },
        { src: img3, alt: "Hospital information system control room", w: 1280, h: 832 },
        { src: img1, alt: "Clinician using tablet diagnostic", w: 1280, h: 832 },
      ]}
    />
  ),
});
