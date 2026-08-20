"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type EditorialItem = {
  title: string;
  description: string;
  meta?: string;
};

type EditorialListProps = {
  items: readonly EditorialItem[];
  variant?: "expertise" | "insights";
};

export function EditorialList({
  items,
  variant = "expertise",
}: EditorialListProps) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className={"editorial-list editorial-list--" + variant}>
      {items.map((item, index) => {
        const isActive = active === index;
        const descriptionId = `${variant}-desc-${index}`;
        return (
          <motion.div
            key={item.title}
            className={"editorial-row " + (isActive ? "editorial-row--active" : "")}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.62,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <button
              type="button"
              className="editorial-row__button"
              onClick={() => setActive(isActive ? null : index)}
              onFocus={() => setActive(index)}
              aria-expanded={isActive}
              aria-controls={descriptionId}
            >
              <span className="editorial-row__meta">
                {variant === "expertise"
                  ? String(index + 1).padStart(2, "0")
                  : item.meta}
              </span>
              <span className="editorial-row__content">
                <span className="editorial-row__title">{item.title}</span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      id={descriptionId}
                      role="region"
                      className="editorial-row__description"
                      initial={{ height: 0, opacity: 0, y: 6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: 4 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>{item.description}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="editorial-row__arrow" aria-hidden="true">↗</span>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
