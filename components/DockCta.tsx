"use client";

import { useEffect, useState } from "react";
import { LiquidButton } from "./Icons";

/** Sticky "Start chat", always on (as in the HTML), stepping aside while the final card's buttons are on screen. */
export default function DockCta() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fin = document.querySelector(".final .ctas");
    if (!fin) return;
    const io = new IntersectionObserver((es) => setShow(!es[0].isIntersecting));
    io.observe(fin);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`dock${show ? " show" : ""}`} aria-hidden={!show}>
      <LiquidButton tabIndex={show ? 0 : -1} />
    </div>
  );
}
