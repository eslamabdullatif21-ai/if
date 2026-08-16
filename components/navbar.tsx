"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

const SECTION_IDS = ["expertise", "services", "about", "insights", "contact"];

type NavbarProps = {
  copy: Dictionary["nav"];
  brand: Dictionary["brand"];
  locale: Locale;
  location: string;
};

export function Navbar({ copy, brand, locale, location }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const progressRef = useRef<HTMLSpanElement>(null);
  const links = [
    { label: copy.about, href: "#about" },
    { label: copy.expertise, href: "#expertise" },
    { label: copy.services, href: "#services" },
    { label: copy.insights, href: "#insights" },
    { label: copy.contact, href: "#contact" },
  ];

  useEffect(() => {
    let animationFrame = 0;

    const updateNavigation = () => {
      animationFrame = 0;
      const scrollTop = window.scrollY;
      const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximumScroll > 0 ? Math.min(1, scrollTop / maximumScroll) : 0;
      const marker = scrollTop + Math.min(window.innerHeight * 0.3, 270);

      setScrolled(scrollTop > 64);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const sections = SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .sort((first, second) => first.offsetTop - second.offsetTop);

      let nextSection = "top";
      for (const section of sections) {
        if (section.offsetTop <= marker) nextSection = section.id;
      }
      setActiveSection(nextSection);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const changeLanguage = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    const hash = window.location.hash;
    window.location.assign("/" + nextLocale + hash);
  };

  return (
    <>
      <header
        className={[
          "site-nav",
          scrolled ? "site-nav--scrolled" : "",
          menuOpen ? "site-nav--open" : "",
        ].join(" ")}
      >
        <div className="site-shell site-nav__inner">
          <a href="#top" className="nav-brand" aria-label={brand.homeLabel} onClick={closeMenu}>
            <Image
              src="/brand-monogram.png"
              width={713}
              height={634}
              alt=""
              className="nav-brand__mark"
              priority
            />
            <span className="nav-brand__name">
              <span>{brand.lineOne}</span>
              <span>{brand.lineTwo}</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label={copy.primaryLabel}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={
                  "nav-link " +
                  (activeSection === link.href.slice(1) ? "nav-link--active" : "")
                }
                aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
              >
                <span>{link.label}</span>
              </a>
            ))}
            <div className="language-toggle" aria-label={copy.languageLabel}>
              <button
                type="button"
                aria-pressed={locale === "en"}
                className={locale === "en" ? "is-active" : ""}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                aria-pressed={locale === "ar"}
                className={locale === "ar" ? "is-active" : ""}
                onClick={() => changeLanguage("ar")}
              >
                AR
              </button>
            </div>
          </nav>

          <button
            type="button"
            className={"menu-toggle " + (menuOpen ? "menu-toggle--open" : "")}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
          >
            <span />
            <span />
          </button>
        </div>
        <span className="site-nav__progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/brand-monogram.png"
              width={713}
              height={634}
              alt=""
              className="mobile-menu__mark"
              sizes="75vw"
            />
            <nav className="mobile-menu__nav" aria-label={copy.mobileLabel}>
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className={
                    activeSection === link.href.slice(1) ? "mobile-menu__link--active" : ""
                  }
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="mobile-menu__index">0{index + 1}</span>
                  <span className="mobile-menu__label">{link.label}</span>
                  <span className="mobile-menu__arrow" aria-hidden="true">
                    {locale === "ar" ? "↖" : "↗"}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu__footer">
              <div className="language-toggle language-toggle--light" aria-label={copy.languageLabel}>
                <button
                  type="button"
                  aria-pressed={locale === "en"}
                  className={locale === "en" ? "is-active" : ""}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                <span aria-hidden="true">/</span>
                <button
                  type="button"
                  aria-pressed={locale === "ar"}
                  className={locale === "ar" ? "is-active" : ""}
                  onClick={() => changeLanguage("ar")}
                >
                  AR
                </button>
              </div>
              <p>{location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
