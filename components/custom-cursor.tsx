"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || reduceMotion || !ringRef.current) return;

    const ring = ringRef.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    document.documentElement.classList.add("custom-cursor-enabled");

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      ring.dataset.visible = "true";
    };

    const leave = () => {
      ring.dataset.visible = "false";
    };

    const enterInteractive = () => {
      ring.dataset.active = "true";
    };

    const leaveInteractive = () => {
      ring.dataset.active = "false";
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      ring.style.transform =
        "translate3d(" + currentX + "px, " + currentY + "px, 0) translate(-50%, -50%)";
      frame = requestAnimationFrame(render);
    };

    const interactives = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, input, textarea"),
    );

    document.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    interactives.forEach((element) => {
      element.addEventListener("pointerenter", enterInteractive);
      element.addEventListener("pointerleave", leaveInteractive);
    });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      interactives.forEach((element) => {
        element.removeEventListener("pointerenter", enterInteractive);
        element.removeEventListener("pointerleave", leaveInteractive);
      });
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
