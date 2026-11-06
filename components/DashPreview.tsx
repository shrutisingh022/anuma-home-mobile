"use client";

import { useEffect, useRef } from "react";

/*
  The merchant admin panel's Home, rebuilt from its prototype (nuhome-dashboard.html, v5):
  dark sidebar (collapsed to its icon rail), top bar, "Dashboard" heading with the period tabs,
  three stat cards, the Top products bar chart and the At risk review queue.
  Drawn at 560px wide, the width at which the panel's own layout still holds, then scaled to the phone.
  Mock data only.
*/

const W = 560;
const H = 720;

function I({ d, children }: { d?: string[]; children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d?.map((p) => <path key={p} d={p} />)}
      {children}
    </svg>
  );
}

const ic = {
  grid: <I><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></I>,
  inbox: <I d={["M22 12h-6l-2 3h-4l-2-3H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"]} />,
  file: <I d={["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", "M14 2v4a2 2 0 0 0 2 2h4", "M10 9H8", "M16 13H8", "M16 17H8"]} />,
  users: <I d={["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]}><circle cx="9" cy="7" r="4" /></I>,
  pkg: <I d={["M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z", "M12 22V12", "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"]} />,
  bot: <I d={["M12 8V4H8", "M2 14h2", "M20 14h2", "M15 13v2", "M9 13v2"]}><rect x="4" y="8" width="16" height="12" rx="2" /></I>,
  gear: <I d={["M20 7h-9", "M14 17H5"]}><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></I>,
  search: <I d={["m21 21-4.3-4.3"]}><circle cx="11" cy="11" r="8" /></I>,
  chat: <I d={["M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z", "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"]} />,
  bell: <I d={["M10.268 21a2 2 0 0 0 3.464 0", "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"]} />,
  alert: <I d={["M12 8v4", "M12 16h.01"]}><circle cx="12" cy="12" r="10" /></I>,
  bag: <I d={["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"]} />,
  clock: <I d={["M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", "M14 2v4a2 2 0 0 0 2 2h4", "M9.5 17.5 8 16.25V14"]}><circle cx="8" cy="16" r="6" /></I>,
  check: <I d={["M20 6 9 17l-5-5"]} />,
  x: <I d={["M18 6 6 18", "m6 6 12 12"]} />,
  panel: <I d={["M9 3v18"]}><rect x="3" y="3" width="18" height="18" rx="2" /></I>,
};

const NAV = [ic.grid, ic.inbox, ic.file, ic.users, ic.pkg, ic.bot];

const PRODUCTS: [string, number][] = [["ZYRA 14", 586], ["LUNA 07", 524], ["NOVA 21", 314], ["ARIA 12", 210], ["OPAL 03", 96]];
const MAX = 640;

const CASES = [
  { buyer: "Shah Furnishings", h: 210, match: "62%", prod: "ZYRA 14 Ivory", to: "Ravi" },
  { buyer: "Mehta Drapes", h: 28, match: "55%", prod: "LUNA 07", to: "Meera" },
];

function Av({ name, h }: { name: string; h: number }) {
  return (
    <span className="md-av" style={{ background: `hsl(${h} 62% 93%)`, color: `hsl(${h} 52% 32%)`, boxShadow: `0 0 0 1px hsl(${h} 40% 84%)` }}>
      {name[0]}
    </span>
  );
}

export default function DashPreview() {
  const fitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = fitRef.current;
    if (!f) return;
    const fit = () => f.style.setProperty("--k", (f.clientWidth / W).toFixed(4));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="md-wrap">
      <div className="md-fit" ref={fitRef} style={{ ["--w" as string]: W, ["--h" as string]: H }}>
        <div className="md" role="img" aria-label="The Anuma admin panel's dashboard, with sample data">
          <aside className="md-side">
            <span className="md-ws">KT</span>
            <span className="md-nv">{ic.search}</span>
            {NAV.map((n, i) => (
              <span className={`md-nv${i === 0 ? " on" : ""}`} key={i}>{n}</span>
            ))}
            <span className="md-sp" />
            <span className="md-nv">{ic.gear}</span>
          </aside>
          <div className="md-main">
            <header className="md-top">
              <span className="md-ti md-tl">{ic.panel}</span>
              <span className="md-sp" />
              <span className="md-ti">{ic.chat}</span>
              <span className="md-ti">{ic.bell}</span>
              <span className="md-me">RK</span>
            </header>
            <div className="md-page">
              <div className="md-head">
                <h3>Dashboard</h3>
                <div className="md-tabs">
                  <span>Today</span>
                  <span className="on">Last week</span>
                  <span>Last month</span>
                </div>
              </div>

              <div className="md-stats">
                {[
                  ["Needs you", ic.alert, "2 cases"],
                  ["Sales today", ic.bag, "4 orders"],
                  ["Drafts pending", ic.clock, "21 drafts"],
                ].map(([t, icon, v]) => (
                  <div className="md-card md-stat" key={t as string}>
                    <div className="k">{t}{icon}</div>
                    <div className="v">{v}</div>
                  </div>
                ))}
              </div>

              <div className="md-card">
                <div className="md-ch">
                  <div className="t">Top products</div>
                  <div className="d">Metres ordered · Last week</div>
                </div>
                <div className="md-cb">
                  <div className="md-grid"><i /><i /><i /><i /></div>
                  {PRODUCTS.map(([n, v], i) => (
                    <div className="md-col" key={n}>
                      <span className={`md-bar${i === 0 ? " top" : ""}`} style={{ height: `${(v / MAX) * 100}%` }} />
                      <span className="md-x">{n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md-card">
                <div className="md-caseh"><span className="t">At risk</span><span className="md-badge">2</span></div>
                {CASES.map((c) => (
                  <div className="md-case" key={c.buyer}>
                    <div className="top"><Av name={c.buyer} h={c.h} /><b>{c.buyer}</b><span className="m">· product match {c.match}</span></div>
                    <div className="d">Anuma matched this to <b>{c.prod}</b> · with {c.to}</div>
                    <div className="a">
                      <span className="md-btn p">{ic.check}Approve</span>
                      <span className="md-btn o">{ic.x}Reject</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
