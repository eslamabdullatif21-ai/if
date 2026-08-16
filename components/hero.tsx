"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MagneticLink } from "@/components/magnetic-link";
import type { Dictionary, Locale } from "@/lib/i18n";

type HeroProps = {
  copy: Dictionary["hero"];
  locale: Locale;
};

export function Hero({ copy, locale }: HeroProps) {
  const forwardArrow = locale === "ar" ? "←" : "→";

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="site-shell hero__grid">
        <div className="hero__copy">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {copy.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="hero__title" aria-label={copy.ariaHeadline}>
            {copy.headline.map((line, index) => (
              <span className="hero__line-mask" key={line} aria-hidden="true">
                <motion.span
                  initial={{ y: "105%", opacity: 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.78,
                    delay: 0.42 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero__details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              {copy.supporting}
            </p>
            <MagneticLink href="#expertise" className="primary-link">
              {copy.cta} <span aria-hidden="true">{forwardArrow}</span>
            </MagneticLink>
          </motion.div>
        </div>

        <motion.figure
          className="hero__visual"
          initial={{ scale: 0.985 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/editorial/geometric-facade.jpg"
            alt={copy.imageAlt}
            fill
            className="hero__photo"
            priority
            sizes="(max-width: 900px) calc(100vw - 48px), 38vw"
          />
          <span className="hero__photo-wash" aria-hidden="true" />
          <Image
            src="/brand-monogram.png"
            width={713}
            height={634}
            alt=""
            className="hero__photo-mark"
            priority
            sizes="220px"
          />
          <figcaption>{copy.imageCaption}</figcaption>
        </motion.figure>
      </div>

      <motion.div
        className="site-shell hero__footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.92 }}
      >
        <span>{copy.independent}</span>
        <a href="#expertise" className="scroll-cue">
          <span>{copy.scroll}</span>
          <span aria-hidden="true">↓</span>
        </a>
        <span>{copy.location}</span>
      </motion.div>
    </section>
  );
}
