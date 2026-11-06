"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { WA_URL } from "@/lib/site";

/** A round WhatsApp-green button, bottom right. Appears once the hero's Start chat scrolls away; hides over the final card's buttons. */
export default function DockCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
    <a
      className={`wa-fab${show ? " show" : ""}`}
      href={WA_URL}
      target="_blank"
      rel="noopener"
      aria-label="Start chat on WhatsApp"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <WhatsAppIcon />
    </a>
  );
}
