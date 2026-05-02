import { ArrowUpRight, Activity, Truck, ShieldCheck, Thermometer, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

function Tile({
  className = "",
  eyebrow,
  title,
  desc,
  icon,
  city,
  to,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
  city?: string;
  to: string;
}) {
  const { t } = useTranslation();
  return (
    <Link
      to={to}
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-hairline bg-card transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/50 hover:shadow-[0_20px_50px_-20px_oklch(0.58_0.16_35/0.35)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 map-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-terracotta/8 blur-2xl"
        aria-hidden="true"
      />

      {city && (
        <div className="relative z-10 flex items-center justify-between border-b border-hairline px-7 pt-6 pb-3 md:px-8">
          <span className="font-serif-display text-xs italic tracking-wide text-ink-soft">
            ↳ {t("bento.via")} {city}
          </span>
          <span className="route-dash h-px w-16 opacity-60" />
        </div>
      )}

      <div className="relative z-10 mt-auto flex flex-col gap-3 p-7 md:p-8">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-terracotta">
          {icon}
          <span>{eyebrow}</span>
        </div>
        <h3 className="font-serif-display text-3xl font-medium leading-[1.1] tracking-tight text-ink md:text-[34px]">
          {title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">{desc}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink/70 transition-colors group-hover:text-terracotta">
          {t("bento.explore")} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
        </div>
      </div>
    </Link>
  );
}

export function BentoGrid() {
  const { t } = useTranslation();

  return (
    <section id="capabilities" className="relative bg-parchment py-28 text-ink md:py-36">
      <div className="absolute inset-0 paper-texture opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-terracotta">
                <span className="route-dash h-px w-10 border-primary text-primary bg-primary" />
                {t("bento.eyebrow")}
              </p>
              <h2 className="font-serif-display tracking-display text-balance text-5xl font-medium leading-[1.02] md:text-7xl">
                {t("bento.headline1")}<br />
                <span className="italic text-terracotta">{t("bento.headline2")}</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              {t("bento.intro")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[300px_300px_300px]">
          <Reveal className="md:col-span-4 md:row-span-2">
            <Tile
              to="/solutions/imaging"
              className="h-full min-h-[440px]"
              eyebrow={t("bento.tiles.imaging.eyebrow")}
              title={t("bento.tiles.imaging.title")}
              desc={t("bento.tiles.imaging.desc")}
              icon={<Activity className="h-3.5 w-3.5" />}
              city={t("bento.routes.imaging")}
            />
          </Reveal>

          <Reveal delay={120} className="md:col-span-2">
            <Tile
              to="/solutions/pharma"
              className="h-full min-h-[300px]"
              eyebrow={t("bento.tiles.pharma.eyebrow")}
              title={t("bento.tiles.pharma.title")}
              desc={t("bento.tiles.pharma.desc")}
              icon={<Truck className="h-3.5 w-3.5" />}
              city={t("bento.routes.pharma")}
            />
          </Reveal>

          <Reveal delay={200} className="md:col-span-2">
            <Tile
              to="/solutions/healthtech"
              className="h-full min-h-[300px]"
              eyebrow={t("bento.tiles.healthtech.eyebrow")}
              title={t("bento.tiles.healthtech.title")}
              desc={t("bento.tiles.healthtech.desc")}
              icon={<Package className="h-3.5 w-3.5" />}
              city={t("bento.routes.healthtech")}
            />
          </Reveal>

          <Reveal delay={120} className="md:col-span-3">
            <Tile
              to="/solutions/compliance"
              className="h-full min-h-[280px]"
              eyebrow={t("bento.tiles.compliance.eyebrow")}
              title={t("bento.tiles.compliance.title")}
              desc={t("bento.tiles.compliance.desc")}
              icon={<ShieldCheck className="h-3.5 w-3.5" />}
              city={t("bento.routes.compliance")}
            />
          </Reveal>

          <Reveal delay={200} className="md:col-span-3">
            <Tile
              to="/solutions/infrastructure"
              className="h-full min-h-[280px]"
              eyebrow={t("bento.tiles.infra.eyebrow")}
              title={t("bento.tiles.infra.title")}
              desc={t("bento.tiles.infra.desc")}
              icon={<Thermometer className="h-3.5 w-3.5" />}
              city={t("bento.routes.infra")}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
