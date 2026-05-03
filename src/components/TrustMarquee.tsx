import { useTranslation } from "react-i18next";
const whoLogo = "/assets/partners/who.png";
const isoLogo = "/assets/partners/iso13485.png";
const gdpLogo = "/assets/partners/gdp-eu.png";
const uspLogo = "/assets/partners/usp.png";
const fdaLogo = "/assets/partners/fda.svg";
const gs1Logo = "/assets/partners/gs1.png";
const mophLogo = "/assets/partners/moph.png";
const emaLogo = "/assets/partners/ema.png";
const picsLogo = "/assets/partners/pics.png";
const unicefLogo = "/assets/partners/unicef.svg";










const PARTNERS = [
  { name: "WHO", src: whoLogo },
  { name: "ISO 13485", src: isoLogo },
  { name: "GDP — EU", src: gdpLogo },
  { name: "USP", src: uspLogo },
  { name: "FDA", src: fdaLogo },
  { name: "GS1", src: gs1Logo },
  { name: "MoPH Afghanistan", src: mophLogo },
  { name: "EMA", src: emaLogo },
  { name: "PIC/S", src: picsLogo },
  { name: "UNICEF Supply", src: unicefLogo },
];

export function TrustMarquee() {
  const { t } = useTranslation();
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section
      id="standards"
      className="relative overflow-hidden border-y border-hairline bg-parchment-deep py-12 text-ink"
    >
      <div className="absolute inset-0 paper-texture opacity-70" aria-hidden="true" />
      <div className="relative mx-auto mb-6 max-w-7xl px-6 md:px-10">
        <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-primary">
          <span className="route-dash h-px w-10 border-primary text-primary bg-primary" />
          {t("trust.eyebrow")}
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 px-10">
          {items.map((p, i) => (
            <img
              key={`${p.name}-${i}`}
              src={p.src}
              alt={p.name}
              loading="lazy"
              width={512}
              height={512}
              className="h-16 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
