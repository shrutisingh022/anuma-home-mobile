"use client";

import { useEffect, useRef } from "react";
import { Mark } from "./Icons";

/*
  The live merchant admin panel's Home (merchants.anuma.run, 6 Nov): light sidebar with
  Navigate / Workspace groups, breadcrumb bar, "Home" with the Yours/Everyone and
  Today/Yesterday/Custom toggles, then Today, Waiting, Replies and Your buyers.
  Drawn at the panel's own size (1960px canvas) and scaled to the phone. Mock data only.
*/

const W = 1960;

function I({ d, children }: { d?: string[]; children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d?.map((p) => <path key={p} d={p} />)}
      {children}
    </svg>
  );
}

const ic = {
  home: <I><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></I>,
  inbox: <I d={["M22 12h-6l-2 3h-4l-2-3H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"]} />,
  file: <I d={["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", "M14 2v4a2 2 0 0 0 2 2h4", "M10 9H8", "M16 13H8", "M16 17H8"]} />,
  users: <I d={["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]}><circle cx="9" cy="7" r="4" /></I>,
  box: <I d={["M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z", "M12 22V12", "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7", "m7.5 4.27 9 5.15"]} />,
  bot: <I d={["M12 8V4H8", "M2 14h2", "M20 14h2", "M15 13v2", "M9 13v2"]}><rect x="4" y="8" width="16" height="12" rx="2" /></I>,
  flow: <I d={["M7 11v4a2 2 0 0 0 2 2h4"]}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></I>,
  radio: <I d={["M4.9 19.1C1 15.2 1 8.8 4.9 4.9", "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", "M19.1 4.9C23 8.8 23 15.1 19.1 19"]}><circle cx="12" cy="12" r="2" /></I>,
  apps: <I d={["M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"]}><rect x="14" y="3" width="7" height="7" rx="1" /></I>,
  logs: <I d={["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5", "M12 7v5l4 2"]} />,
  gear: <I d={["M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"]}><circle cx="12" cy="12" r="3" /></I>,
  search: <I d={["m21 21-4.3-4.3"]}><circle cx="11" cy="11" r="8" /></I>,
  down: <I d={["m6 9 6 6 6-6"]} />,
  up: <I d={["m18 15-6-6-6 6"]} />,
  chat: <I d={["M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z", "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"]} />,
  bell: <I d={["M10.268 21a2 2 0 0 0 3.464 0", "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"]} />,
  alert: <I d={["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01"]} />,
  clock: <I d={["M12 6v6l4 2"]}><circle cx="12" cy="12" r="10" /></I>,
  spark: <I d={["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", "M20 3v4", "M22 5h-4"]} />,
  checks: <I d={["M18 6 7 17l-5-5", "m22 10-7.5 7.5L13 16"]} />,
  pen: <I d={["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"]} />,
};

const NAVIGATE: [React.ReactNode, string][] = [[ic.home, "Home"], [ic.inbox, "Inbox"], [ic.file, "Orders"], [ic.users, "CRM"], [ic.box, "Products"]];
const WORKSPACE: [React.ReactNode, string][] = [[ic.bot, "Agents"], [ic.flow, "Workflows"], [ic.radio, "Channels"], [ic.apps, "Apps"], [ic.logs, "Logs"]];

function Stat({ icon, t, v, d, up }: { icon: React.ReactNode; t: string; v: string; d?: string; up?: boolean }) {
  return (
    <div className="mx-card mx-stat">
      <div className="mx-sh"><span className="mx-ic">{icon}</span>{t}</div>
      <div className="mx-v">{v}</div>
      {d && <div className={`mx-d${up ? " up" : ""}`}>{d}</div>}
    </div>
  );
}

const WAITING = [
  { n: "Shah Furnishings", h: 210, msg: "Is Zyra 14 Ivory in stock? Need 60 m", why: "Product match 62%", wait: "6 min" },
  { n: "Mehta Drapes", h: 28, msg: "Rate same rahega na?", why: "Asked about a rate", wait: "12 min", late: true },
];

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
    <div className="mx-wrap">
      <div className="mx-fit" ref={fitRef}>
        <div className="mx" role="img" aria-label="The Anuma admin panel's Home screen, with sample data">
          <aside className="mx-side">
            <div className="mx-org">
              <span className="mx-logo"><Mark /></span>
              <span className="mx-orgt"><b>Kapoor Textiles</b><small>Admin</small></span>
              <span className="mx-chev">{ic.down}</span>
            </div>
            <div className="mx-search">{ic.search}<span>Search...</span><kbd>⌘K</kbd></div>
            <div className="mx-grp">Navigate</div>
            {NAVIGATE.map(([i, l], k) => (
              <span className={`mx-nv${k === 0 ? " on" : ""}`} key={l}>{i}{l}</span>
            ))}
            <span className="mx-fill" />
            <div className="mx-grp mx-rule">Workspace</div>
            {WORKSPACE.map(([i, l]) => (
              <span className="mx-nv" key={l}>{i}{l}</span>
            ))}
            <span className="mx-nv">{ic.gear}Settings<span className="mx-chev">{ic.up}</span></span>
            <div className="mx-user">
              <span className="mx-uav">RK</span>
              <span className="mx-orgt"><b>Ritu Kapoor</b><small>ritu@kapoortextiles.in</small></span>
              <span className="mx-chev">{ic.up}</span>
            </div>
          </aside>

          <div className="mx-main">
            <header className="mx-top">
              <span className="mx-crumb">Kapoor Textiles <i>/</i> <b>Home</b></span>
              <span className="mx-tb">{ic.chat}</span>
              <span className="mx-tb">{ic.bell}<em>9+</em></span>
            </header>

            <div className="mx-page">
              <div className="mx-head">
                <div>
                  <h3>Home</h3>
                  <small>Friday 6 Nov · <i /> Live</small>
                </div>
                <div className="mx-segs">
                  <span className="mx-seg"><span className="on">Yours</span><span>Everyone</span></span>
                  <span className="mx-seg"><span className="on">Today</span><span>Yesterday</span><span>Custom {ic.pen}</span></span>
                </div>
              </div>

              <div className="mx-sec">
                <b>Today</b>
                <p>Orders captured and hand-offs to the team, compared with yesterday at this time.</p>
              </div>
              <div className="mx-row3">
                <Stat icon={ic.file} t="Orders" v="14" d="+4 on yesterday" up />
                <Stat icon={ic.box} t="Line items" v="86" d="+21 on yesterday" up />
                <Stat icon={ic.alert} t="Escalations" v="2" d="Same as yesterday" />
              </div>

              <div className="mx-sec">
                <b>Waiting</b>
                <p>Customers Order Desk has handed to you, most overdue first.</p>
              </div>
              <div className="mx-card mx-wait">
                {WAITING.map((w) => (
                  <div className="mx-wr" key={w.n}>
                    <span className="mx-av" style={{ background: `hsl(${w.h} 62% 93%)`, color: `hsl(${w.h} 52% 32%)` }}>{w.n[0]}</span>
                    <span className="mx-wt"><b>{w.n}</b><span>“{w.msg}”</span></span>
                    <span className="mx-why">{w.why}</span>
                    <span className={`mx-wait-t${w.late ? " late" : ""}`}>{ic.clock}{w.wait}</span>
                    <span className="mx-btn">Open</span>
                  </div>
                ))}
              </div>

              <div className="mx-sec">
                <b>Replies</b>
                <p>How fast customers hear back, from Order Desk and from the team.</p>
              </div>
              <div className="mx-row3">
                <Stat icon={ic.clock} t="Team reply" v="6 min" d="Median of 9 replies" />
                <Stat icon={ic.spark} t="Order Desk reply" v="18 s" d="Median of 41 replies" />
                <Stat icon={ic.checks} t="Within 15 min" v="94%" d="47 of 50 cases" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
