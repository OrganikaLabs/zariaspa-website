import { useState } from "react";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import zariaspaLogo from "@/assets/zariaspa-logo.png";

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const COLS = [
    {
      title: t("footer.cols.capabilities"),
      items: [
        t("footer.items.medEquipment"),
        t("footer.items.pharmaSupply"),
        t("footer.items.healthtech"),
        t("footer.items.coldchain"),
        t("footer.items.regulatory"),
      ],
    },
    {
      title: t("footer.cols.network"),
      items: [
        t("footer.items.kabulHQ"),
        t("footer.items.dubaiHub"),
        t("footer.items.istanbulOffice"),
        t("footer.items.samarkandLiaison"),
        t("footer.items.frankfurtDesk"),
      ],
    },
    {
      title: t("footer.cols.company"),
      items: [
        t("footer.items.about"),
        t("footer.items.leadership"),
        t("footer.items.compliance"),
        t("footer.items.press"),
        t("footer.items.careers"),
      ],
    },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden pt-24 text-parchment"
      style={{
        backgroundColor: "oklch(0.22 0.12 264.7)",
        backgroundImage:
          "radial-gradient(at 20% 10%, oklch(0.35 0.14 264 / 0.7) 0, transparent 50%), radial-gradient(at 90% 90%, oklch(0.831 0.170 81.4 / 0.12) 0, transparent 55%)",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 border-b border-parchment/15 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={zariaspaLogo}
                alt="Zariaspa Trading Co."
                className="h-12 w-auto brightness-0 invert"
              />
            </div>


            <h3 className="font-serif-display tracking-display mt-10 max-w-md text-balance text-4xl font-medium leading-[1.1] md:text-5xl">
              {t("footer.tagline1")} <span className="italic text-saffron">{t("footer.tagline2")}</span>.
            </h3>
            <p className="mt-3 max-w-md text-sm text-parchment/70">
              {t("footer.newsletterDesc")}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-parchment/20 bg-parchment/5 p-1.5 transition-all focus-within:border-saffron/60"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-parchment placeholder:text-parchment/50 focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-ink transition-all hover:brightness-110"
              >
                {submitted ? t("footer.subscribed") : t("footer.subscribe")}
                <ArrowRight className="cta-arrow h-3.5 w-3.5" />
              </button>
            </form>

            <ul className="mt-10 space-y-3 text-sm text-parchment/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-saffron" />
                {t("footer.address")}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-saffron" />
                contact@zariaspa.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-saffron" />
                +93 (0) 20 000 0000
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="mb-5 text-[11px] font-semibold tracking-[0.22em] text-saffron">
                  {col.title.toUpperCase()}
                </p>
                <ul className="space-y-3 text-sm text-parchment/70">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="transition-colors hover:text-saffron">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-8 text-xs text-parchment/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {t("footer.legal.rights")}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-saffron">{t("footer.legal.privacy")}</a>
            <a href="#" className="transition-colors hover:text-saffron">{t("footer.legal.terms")}</a>
            <a href="#" className="transition-colors hover:text-saffron">{t("footer.legal.compliance")}</a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <div className="font-serif-display tracking-display -mb-10 text-center text-[22vw] italic font-medium leading-none text-parchment/[0.05] md:-mb-20">
          Zariaspa
        </div>
      </div>
    </footer>
  );
}
