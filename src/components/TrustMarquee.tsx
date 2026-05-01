import { useTranslation } from "react-i18next";

const PARTNERS = [
  "WHO",
  "ISO 13485",
  "GDP — EU",
  "USP",
  "FDA",
  "GS1",
  "MoPH Afghanistan",
  "EMA",
  "PIC/S",
  "UNICEF Supply",
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
        <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-terracotta">
          <span className="route-dash h-px w-10" />
          {t("trust.eyebrow")}
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-16 px-10">
          {items.map((p, i) => (
            <div
              key={`${p}-${i}`}
              className="font-serif-display flex shrink-0 items-center gap-3 text-2xl font-medium italic tracking-tight text-ink/55 transition-colors hover:text-terracotta"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta/70" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
