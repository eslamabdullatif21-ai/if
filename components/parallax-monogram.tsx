"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/lib/i18n";

type ParallaxMonogramProps = {
  copy: Dictionary["motif"];
};

export function ParallaxMonogram({ copy }: ParallaxMonogramProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !sectionRef.current || !markRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        markRef.current,
        { yPercent: -8, scale: 1 },
        {
          yPercent: 8,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="motif" aria-label={copy.ariaLabel}>
      <Image
        src="/editorial/stone-arches.jpg"
        alt={copy.imageAlt}
        fill
        className="motif__photo"
        sizes="100vw"
      />
      <span className="motif__wash" aria-hidden="true" />
      <Image
        ref={markRef}
        src="/brand-monogram.png"
        width={713}
        height={634}
        alt=""
        className="motif__mark"
        sizes="80vw"
      />
      <div className="site-shell motif__content">
        <p className="section-kicker section-kicker--light">{copy.kicker}</p>
        <p className="motif__statement">
          {copy.statement}
        </p>
        <p className="motif__location">{copy.location}</p>
      </div>
    </section>
  );
}
