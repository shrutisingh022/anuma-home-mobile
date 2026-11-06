"use client";

import { useEffect, useState } from "react";
import { LiquidButton } from "./Icons";

/** Sticky "Start chat", stepping aside while the hero's or the final card's buttons are on screen. */
export default function DockCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Steps aside while the hero's or the final card's own buttons are on screen.
    const els = [...document.querySelectorAll(".hero-ctas, .final .ctas")];
    if (!els.length) return;
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => seen.set(e.target, e.isIntersecting));
      setShow(![...seen.values()].some(Boolean));
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`dock${show ? " show" : ""}`} aria-hidden={!show}>
      <LiquidButton tabIndex={show ? 0 : -1} />
    </div>
  );
}
