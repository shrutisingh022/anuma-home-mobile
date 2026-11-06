"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidButton, Logo } from "./Icons";
import { Blocks, Factory, Layers, ListOrdered, MessageCircle, Users } from "./PixelIcons";
import { NAV } from "@/lib/site";

const ICONS = { clients: Users, agents: Layers, erp: Blocks, process: ListOrdered, who: Factory, faq: MessageCircle };

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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    menuRef.current?.focus();
  };

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="glass-bar">
          <a className="brand" href="#top" aria-label="Anuma home">
            <Logo />
          </a>
          <div className="nav-r">
            <LiquidButton size="sm" />
            <button
              ref={menuRef}
              type="button"
              className="m-burger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="menu-sheet"
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3.5 7h13M3.5 13h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`m-scrim${open ? " is-open" : ""}`} onClick={close} aria-hidden="true" />
      <div id="menu-sheet" className={`m-sheet${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="m-grab" />
        <div className="m-sheet-top">
          <span className="t-eyebrow">On this page</span>
          <button ref={closeRef} type="button" className="m-x" aria-label="Close menu" onClick={close}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="m-list">
          {NAV.map((n) => {
            const I = ICONS[n.icon];
            return (
              <a key={n.href} href={n.href} className="m-sub" onClick={() => setOpen(false)}>
                <span className="nav-tile">
                  <I aria-hidden />
                </span>
                <span>
                  <b>{n.label}</b>
                  <small>{n.hint}</small>
                </span>
              </a>
            );
          })}
        </nav>
        <LiquidButton tabIndex={open ? 0 : -1} />
      </div>
    </>
  );
}
