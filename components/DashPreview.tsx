"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Icons";

const NAV_ITEMS: { label: string; badge?: string; d: string }[] = [
  { label: "Home", d: "M3.5 9L10 3.5 16.5 9v7a1 1 0 01-1 1h-11a1 1 0 01-1-1z" },
  { label: "Inbox", badge: "12", d: "M3.5 11l2-6.5h9l2 6.5v4.5a1 1 0 01-1 1h-11a1 1 0 01-1-1zM3.5 11h4l1 2h3l1-2h4" },
  { label: "Orders", d: "M5.5 3.5h9a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 15V5a1.5 1.5 0 011.5-1.5zM7 7.5h6M7 10.5h6M7 13.5h3.5" },
  { label: "Quotes", badge: "3", d: "M5 3h7l3 3v11H5zM8 10h5M8 13h3" },
  { label: "Leads", d: "M10 4a3 3 0 110 6 3 3 0 010-6zM4 17c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" },
  { label: "Campaigns", d: "M3.5 8.5v3l9 4V4.5l-9 4zM12.5 7.5h2a2.5 2.5 0 010 5h-2" },
  { label: "Products", d: "M3 6.5L10 3l7 3.5v7L10 17l-7-3.5zM3 6.5l7 3.5 7-3.5M10 10v7" },
  { label: "Insights", d: "M3.5 16.5h13M6 13V9M10 13V5M14 13v-6" },
  { label: "Rulebook", d: "M4 5h12M4 10h12M4 15h7" },
];

const NEEDS = [
  { av: "SF", bg: "#e3eefc", fg: "#2a4f86", name: "Shah Furnishings", id: "101026-1", line: "Confirm product · Zyra 14 Ivory", pct: "62% match", wait: "Waiting 6 min · flagged 11:36", amber: false, act: "Approve" },
  { av: "RE", bg: "#fbeedd", fg: "#7d4a10", name: "Raj Electricals", id: "101026-4", line: "Quote line · Surge protection device", pct: "41% match", wait: "Waiting 12 min · at risk", amber: true, act: "Approve" },
  { av: "PT", bg: "#e8f5ee", fg: "#17603f", name: "Patel Textiles", id: "101025-9", line: "Answer question · “rate same rahega na?”", pct: "", wait: "Waiting 3 min", amber: false, act: "Reply" },
];

function OkButton({ label }: { label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={`dw-ok${done ? " done" : ""}`} onClick={() => setDone(true)} tabIndex={-1}>
      {done ? (label === "Reply" ? "Replied ✓" : "Approved ✓") : label}
    </button>
  );
}

export default function DashPreview() {
  const fitRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = fitRef.current;
    const d = dashRef.current;
    if (!f || !d) return;
    const fit = () => d.style.setProperty("--k", (f.clientWidth / 1180).toFixed(4));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div className="hero-shot" ref={fitRef}>
          <div className="dash" ref={dashRef} role="img" aria-label="The Anuma web app, with sample data">
            <div className="dw-bar">
              <i />
              <i />
              <i />
              <span className="dw-url">app.anuma.co.in/home</span>
            </div>
            <div className="dw-body">
              <aside className="dw-side">
                <div className="dw-org">
                  <span className="dw-logo">
                    <Logo />
                  </span>
                  <b>Kapoor Textiles</b>
                </div>
                {NAV_ITEMS.map((n, i) => (
                  <span key={n.label} className={`nv${i === 0 ? " on" : ""}`}>
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d={n.d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {n.label}
                    {n.badge && <em>{n.badge}</em>}
                  </span>
                ))}
              </aside>
              <div className="dw-main">
                <div className="dw-head">
                  <div>
                    <b>Home</b>
                    <small>
                      Wednesday, 5 Nov · <i />
                      Live
                    </small>
                  </div>
                  <div className="dw-seg">
                    <span className="on">Today</span>
                    <span>Yesterday</span>
                    <span>Custom</span>
                  </div>
                </div>
                <div className="dw-kpis">
                  <div><span>Needs you</span><b>3 cases</b></div>
                  <div><span>Drafts pending</span><b>7 drafts</b></div>
                  <div><span>Orders closed</span><b>41 · ₹18.6L</b></div>
                  <div><span>Overdue replies</span><b>0</b></div>
                </div>
                <div className="dw-cols">
                  <section className="dw-card">
                    <div className="dw-ch">
                      <b>Needs you</b>
                      <span className="cp amber">At risk 2</span>
                      <span className="cp red">Breaches 0</span>
                    </div>
                    {NEEDS.map((r) => (
                      <div className="dw-row" key={r.id}>
                        <span className="av" style={{ background: r.bg, color: r.fg }}>{r.av}</span>
                        <div className="dw-rt">
                          <b>{r.name} <em>{r.id}</em></b>
                          <span>{r.line} {r.pct && <i className="pct">{r.pct}</i>}</span>
                          <small className={r.amber ? "amber" : undefined}>{r.wait}</small>
                        </div>
                        <OkButton label={r.act} />
                      </div>
                    ))}
                  </section>
                  <section className="dw-card">
                    <div className="dw-ch"><b>Activity log</b><span className="dw-full">Full log</span></div>
                    <div className="dw-act"><span className="disc"><i /><i /></span><div><b>Drafted SO-1042</b> for Kapoor Decor<small>2 min ago</small></div></div>
                    <div className="dw-act"><span className="disc"><i /><i /></span><div><b>Sent today&apos;s stock</b> to 52 distributors<small>9:00</small></div></div>
                    <div className="dw-act"><span className="disc"><i /><i /></span><div><b>Matched 3 of 4 lines</b> on Raj Electricals&apos; RFQ<small>14 min ago</small></div></div>
                    <div className="dw-act"><span className="pdisc">R</span><div><b>Ravi approved</b> SO-1041 · synced to Tally<small>20 min ago</small></div></div>
                  </section>
                </div>
                <div className="dw-cols dw-c2">
                  <section className="dw-card">
                    <div className="dw-ch"><b>Orders this week</b><span className="dw-full">₹74.2L</span></div>
                    <div className="dw-bars">
                      {[38, 52, 45, 70, 61, 84, 66].map((h, i) => (
                        <i key={i} className={i === 6 ? "now" : undefined} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="dw-days">
                      {["Thu", "Fri", "Sat", "Mon", "Tue", "Wed", "Today"].map((d) => <span key={d}>{d}</span>)}
                    </div>
                  </section>
                  <section className="dw-card">
                    <div className="dw-ch"><b>Top buyers</b><span className="dw-full">This month</span></div>
                    <div className="dw-tb"><span>Shree Ganesh Furnishings</span><b>₹21.8L</b></div>
                    <div className="dw-tb"><span>Kapoor Decor</span><b>₹14.2L</b></div>
                    <div className="dw-tb"><span>Royal Home Studio</span><b>₹9.7L</b></div>
                    <div className="dw-tb"><span>Mehta Drapes</span><b>₹8.1L</b></div>
                  </section>
                </div>
              </div>
            </div>
          </div>
      </div>
      <p className="t-small shot-cap">The Anuma web app, with sample data.</p>
    </>
  );
}
