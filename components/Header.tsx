"use client";

import { useEffect, useRef, useState } from "react";
import { Mark, WhatsAppIcon } from "./Icons";
import { NAV, WA_URL } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sheet-open", open);
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    menuRef.current?.focus();
  };

  return (
    <>
      <header className={`hdr${scrolled ? " scrolled" : ""}`}>
        <div className="wrap bar split-bar">
          <a className="tile" href="#top" aria-label="Anuma home">
            <Mark />
          </a>
          <div className="hdr-r">
            <a className="btn pri hdr-cta" href={WA_URL} target="_blank" rel="noopener">
              <WhatsAppIcon />
              Start chat
            </a>
            <button
              ref={menuRef}
              type="button"
              className="menu-btn"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="menu-sheet"
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3.5 7h13M3.5 13h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`sheet-scrim${open ? " open" : ""}`} onClick={close} aria-hidden="true" />
      <div
        id="menu-sheet"
        className={`sheet${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="sheet-grab" />
        <div className="sheet-h">
          <b>On this page</b>
          <button ref={closeRef} type="button" className="sheet-x" aria-label="Close menu" onClick={close}>
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
              <span>{n.hint}</span>
            </a>
          ))}
        </nav>
        <a className="btn pri" href={WA_URL} target="_blank" rel="noopener">
          <WhatsAppIcon />
          Start chat
        </a>
      </div>
    </>
  );
}
