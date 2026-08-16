"use client";

import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function MagneticLink({
  href,
  children,
  className = "",
}: MagneticLinkProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.16;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.16;
    setOffset({
      x: Math.max(-10, Math.min(10, x)),
      y: Math.max(-8, Math.min(8, y)),
    });
  };

  return (
    <motion.a
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.a>
  );
}
