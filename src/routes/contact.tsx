import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useHtmlLangDir } from "@/i18n/useHtmlLangDir";
import { useTranslation } from "react-i18next";
import img1 from "@/assets/pages/contact-1.jpg";
import img2 from "@/assets/pages/contact-2.jpg";
import img3 from "@/assets/pages/contact-3.jpg";
import "@/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zariaspa Trading Co." },
      {
        name: "description",
        content:
          "Speak with the Zariaspa team. Headquartered in Wazir Akbar Khan, Kabul, with hubs in Dubai, Istanbul, Samarkand, and Frankfurt.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useHtmlLangDir();
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-parchment text-ink">
      <Navbar />

      <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 paper-texture opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 map-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-terracotta">
              <span className="route-dash h-px w-10" />
              {t("pages.contact.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif-display tracking-display mt-5 text-balance text-5xl font-medium leading-[1.02] md:text-7xl lg:text-[88px]">
              {t("pages.contact.title")}{" "}
              <span className="italic text-terracotta">{t("pages.contact.italic")}</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {t("pages.contact.lede")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-parchment pb-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-3xl border border-hairline bg-card p-8 shadow-[var(--shadow-elevated)] md:p-10"
            >
              <h2 className="font-serif-display text-3xl font-medium tracking-tight md:text-4xl">
                {t("pages.contact.formTitle")}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">{t("pages.contact.formNote")}</p>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-xs font-medium tracking-[0.18em] text-ink-soft">
                  {t("pages.contact.name")}
                  <input
                    required
                    type="text"
                    className="rounded-xl border border-hairline bg-parchment px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none"
                    placeholder={t("pages.contact.namePh")}
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs font-medium tracking-[0.18em] text-ink-soft">
                  {t("pages.contact.org")}
                  <input
                    required
                    type="text"
                    className="rounded-xl border border-hairline bg-parchment px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none"
                    placeholder={t("pages.contact.orgPh")}
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs font-medium tracking-[0.18em] text-ink-soft md:col-span-2">
                  {t("pages.contact.email")}
                  <input
                    required
                    type="email"
                    className="rounded-xl border border-hairline bg-parchment px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none"
                    placeholder={t("footer.emailPlaceholder")}
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs font-medium tracking-[0.18em] text-ink-soft md:col-span-2">
                  {t("pages.contact.help")}
                  <textarea
                    required
                    rows={5}
                    className="resize-none rounded-xl border border-hairline bg-parchment px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none"
                    placeholder={t("pages.contact.helpPh")}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-4 text-sm font-semibold text-ink transition-all terracotta-glow"
              >
                {submitted ? t("pages.contact.sent") : t("pages.contact.send")}
                <ArrowRight className="cta-arrow h-4 w-4" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-hairline">
                <img
                  src={img1}
                  alt="Zariaspa office reception"
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-2xl border border-hairline">
                  <img src={img2} alt="Writing in a notebook" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl border border-hairline">
                  <img src={img3} alt="Wazir Akbar Khan street" width={1280} height={832} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="rounded-2xl border border-hairline bg-card p-6">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-terracotta">{t("pages.contact.reachUs")}</p>
                <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-terracotta" />
                    {t("footer.address")}
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-terracotta" />
                    contact@zariaspa.com
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-terracotta" />
                    +93 (0) 20 000 0000
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
