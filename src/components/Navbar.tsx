import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "@/i18n";

function Mark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="oklch(0.303 0.137 264.7)" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="oklch(0.831 0.170 81.4)" strokeWidth="0.7" opacity="0.7" />
      <path d="M 20 6 L 23 20 L 20 34 L 17 20 Z" fill="oklch(0.831 0.170 81.4)" />
      <path d="M 6 20 L 20 17 L 34 20 L 20 23 Z" fill="oklch(0.94 0.04 85)" opacity="0.85" />
      <circle cx="20" cy="20" r="2" fill="oklch(0.303 0.137 264.7)" />
    </svg>
  );
}

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { label: t("nav.capabilities"), href: "#capabilities" },
    { label: t("nav.network"), href: "#network" },
    { label: t("nav.standards"), href: "#standards" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const current = SUPPORTED_LANGS.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGS[0];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-hairline" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <Mark />
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-serif-display text-base font-semibold tracking-[0.14em] text-ink">
              ZARIASPA
            </span>
            <span className="text-[10px] tracking-[0.32em] text-ink-soft">EST · TRADING CO.</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="text-[13px] font-medium tracking-wide text-ink/75 transition-colors hover:text-terracotta"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((s) => !s)}
              className="glass-light flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-ink/85 transition-all hover:text-ink"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <Globe className="h-3.5 w-3.5 text-terracotta" />
              <span>{current.display}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <ul
                className="glass absolute end-0 mt-2 w-44 overflow-hidden rounded-xl py-1 text-sm shadow-xl"
                role="listbox"
              >
                {SUPPORTED_LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => {
                        i18n.changeLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-start transition-colors hover:bg-ink/5 hover:text-terracotta ${
                        l.code === i18n.language ? "text-terracotta" : "text-ink/85"
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[11px] text-ink-soft">{l.display}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-terracotta px-4 py-2 text-xs font-semibold tracking-wide text-parchment transition-all hover:brightness-110 md:inline-flex"
          >
            {t("nav.partner")}
          </a>

          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="glass-light flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label={t("nav.menu")}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="glass border-t border-hairline lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-ink/85 transition hover:bg-ink/5 hover:text-terracotta"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex flex-wrap gap-2 border-t border-hairline px-3 pt-3">
              {SUPPORTED_LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => i18n.changeLanguage(l.code)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    l.code === i18n.language
                      ? "border-terracotta bg-terracotta/10 text-terracotta"
                      : "border-hairline text-ink/70 hover:text-terracotta"
                  }`}
                >
                  {l.display}
                </button>
              ))}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
