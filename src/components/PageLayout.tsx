import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Reveal } from "./Reveal";
import { useHtmlLangDir } from "@/i18n/useHtmlLangDir";
import "@/i18n";

export type PageImage = { src: string; alt: string; w: number; h: number };

interface PageLayoutPropsI18n {
  /** i18n key prefix under `pages.*` (e.g. "about", "imaging"). */
  tKey: string;
  /** Ordered list of paragraph keys per body section. */
  sections: { headingKey?: string; paragraphKeys: string[] }[];
  hero: PageImage;
  gallery: PageImage[];
}

interface PageLayoutPropsLegacy {
  eyebrow: string;
  title: string;
  italicWord: string;
  lede: string;
  hero: PageImage;
  body: { heading?: string; paragraphs: string[] }[];
  gallery: PageImage[];
}

type PageLayoutProps = PageLayoutPropsI18n | PageLayoutPropsLegacy;

function isLegacy(p: PageLayoutProps): p is PageLayoutPropsLegacy {
  return (p as PageLayoutPropsLegacy).title !== undefined;
}

export function PageLayout(props: PageLayoutProps) {
  useHtmlLangDir();
  const { t } = useTranslation();

  if (isLegacy(props)) {
    return <LegacyPageLayout {...props} />;
  }

  const { tKey, sections, hero, gallery } = props;
  const k = (s: string) => `pages.${tKey}.${s}`;

  return (
    <main className="min-h-screen bg-parchment text-ink">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 paper-texture opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 map-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-ink-soft transition-colors hover:text-terracotta"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {t("common.back")} · Zariaspa
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-10 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-terracotta">
              <span className="route-dash h-px w-10" />
              {t(k("eyebrow"))}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-serif-display tracking-display mt-5 text-balance text-5xl font-medium leading-[1.02] md:text-7xl lg:text-[88px]">
              {t(k("title"))}{" "}
              <span className="italic text-terracotta">{t(k("italic"))}</span>
            </h1>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {t(k("lede"))}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-14 overflow-hidden rounded-3xl border border-hairline shadow-[var(--shadow-elevated)]">
              <img
                src={hero.src}
                alt={hero.alt}
                width={hero.w}
                height={hero.h}
                loading="eager"
                className="h-[42vh] min-h-[320px] w-full object-cover md:h-[58vh]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body + side gallery */}
      <section className="relative bg-parchment py-16 md:py-24">
        <div className="absolute inset-0 paper-texture opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:pe-8">
            {sections.map((section, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="mb-12">
                  {section.headingKey && (
                    <h2 className="font-serif-display mb-5 text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
                      {t(k(section.headingKey))}
                    </h2>
                  )}
                  {section.paragraphKeys.map((pk, j) => (
                    <p key={j} className="mb-4 text-base leading-relaxed text-ink-soft md:text-[17px]">
                      {t(k(pk))}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 grid grid-cols-2 gap-4">
              {gallery.map((img, i) => (
                <Reveal
                  key={i}
                  delay={i * 100}
                  className={i === 0 ? "col-span-2" : ""}
                >
                  <div className="group relative overflow-hidden rounded-2xl border border-hairline">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Reveal>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function LegacyPageLayout({
  eyebrow,
  title,
  italicWord,
  lede,
  hero,
  body,
  gallery,
}: PageLayoutPropsLegacy) {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-parchment text-ink">
      <Navbar />
      <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 paper-texture opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 map-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-ink-soft transition-colors hover:text-terracotta"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {t("common.back")} · Zariaspa
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-10 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-terracotta">
              <span className="route-dash h-px w-10" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-serif-display tracking-display mt-5 text-balance text-5xl font-medium leading-[1.02] md:text-7xl lg:text-[88px]">
              {title} <span className="italic text-terracotta">{italicWord}</span>
            </h1>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {lede}
            </p>
          </Reveal>
          <Reveal delay={440}>
            <div className="mt-14 overflow-hidden rounded-3xl border border-hairline shadow-[var(--shadow-elevated)]">
              <img
                src={hero.src}
                alt={hero.alt}
                width={hero.w}
                height={hero.h}
                loading="eager"
                className="h-[42vh] min-h-[320px] w-full object-cover md:h-[58vh]"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="relative bg-parchment py-16 md:py-24">
        <div className="absolute inset-0 paper-texture opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:pe-8">
            {body.map((section, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="mb-12">
                  {section.heading && (
                    <h2 className="font-serif-display mb-5 text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 text-base leading-relaxed text-ink-soft md:text-[17px]">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-28 grid grid-cols-2 gap-4">
              {gallery.map((img, i) => (
                <Reveal key={i} delay={i * 100} className={i === 0 ? "col-span-2" : ""}>
                  <div className="group relative overflow-hidden rounded-2xl border border-hairline">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Reveal>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
