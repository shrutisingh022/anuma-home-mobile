import Header from "@/components/Header";
import DashPreview from "@/components/DashPreview";
import ClientReel from "@/components/ClientReel";
import AgentTabs from "@/components/AgentTabs";
import TeamFeatures from "@/components/TeamFeatures";
import DockCta from "@/components/DockCta";
import Reveal from "@/components/Reveal";
import { Mark, WhatsAppIcon } from "@/components/Icons";
import { ASK_AI, WA_URL } from "@/lib/site";

/*
  Section order follows the 6 Nov call: outcomes lead, ERP gets its own moment.
  Hero → Client outcomes → Who it's for → Agents → ERP → Team → How we start → Your data → Questions → Final
  Button copy is unchanged from the v2 demo.
*/

const INDUSTRIES: [string, string, string][] = [
  ["Fabric and textiles", "Swatch photos, shades, rolls and metres", "M3 6c2.3-1.6 4.7 1.6 7 0s4.7 1.6 7 0M3 10c2.3-1.6 4.7 1.6 7 0s4.7 1.6 7 0M3 14c2.3-1.6 4.7 1.6 7 0s4.7 1.6 7 0"],
  ["Consumer electronics", "Daily stock to every distributor", "M7 3h6a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM8.5 14h3"],
  ["Electricals", "Thousands of SKUs, RFQs of 900 lines", "M11 2.5L5 11h4.5L8.5 17.5 15 8.5h-4.5z"],
  ["Pumps", "Specs and drawings in, custom quotes out", "M10 3.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13zM10 10l3-4M10 10l-4.5 1M10 10l1.5 4.8"],
  ["Die casting", "Part drawings, tooling and repeat orders", "M3.5 7h13v8.5h-13zM6.5 7V4.5h7V7M7 11h6"],
  ["Pipes and fittings", "Sizes, grades and project tenders", "M2.5 8h9a3 3 0 013 3v6.5M2.5 12h7a1 1 0 011 1v4.5"],
  ["Gears and machining", "Drawings in, quotes out, fast", "M10 7.4a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2zM10 2.5v2.4M10 15.1v2.4M2.5 10h2.4M15.1 10h2.4M4.7 4.7l1.7 1.7M13.6 13.6l1.7 1.7M4.7 15.3l1.7-1.7M13.6 6.4l1.7-1.7"],
  ["Steel and metals", "Rates that move every day", "M3 5h14M3 10h14M3 15h14"],
  ["Pharma and chemicals", "Grades, batches and repeat orders", "M8 2.5h4M8.5 2.5v5L4 15.5a1.3 1.3 0 001.1 2h9.8a1.3 1.3 0 001.1-2L11.5 7.5v-5M6.3 12h7.4"],
  ["Export and custom goods", "A new product for every enquiry", "M3 12.5h14l-2 4H5zM6 12.5V7h8v5.5M10 7V3.5"],
  ["Handcrafted goods", "Bulk orders for corporates and stores", "M7 3h6M8 3c0 2-3 3-3 7a5 5 0 0010 0c0-4-3-5-3-7"],
  ["Packaging", "Sizes, prints and reorders", "M3 6.5L10 3l7 3.5v7L10 17l-7-3.5zM3 6.5l7 3.5 7-3.5M10 10v7"],
];

const ERPS: [string, string][] = [
  ["Tally", "/erp/tally.png"],
  ["SAP", "/erp/sap.svg"],
  ["Zoho", "/erp/zoho.svg"],
  ["Odoo", "/erp/odoo.png"],
  ["Dynamics 365", "/erp/dynamics.svg"],
  ["ERPNext", "/erp/erpnext.svg"],
];

const STEPS = [
  { h: "Look", p: "We go through a day of your real orders, quotes and messages. We find where your team's time goes.", you: "You share a day of work", we: "You see where time goes" },
  { h: "Plan", p: "We agree what Anuma does and what your team keeps doing.", you: "You approve the plan", we: "It's in writing" },
  { h: "Set up", p: "We connect your WhatsApp, email and ERP, and load your catalogue and rates.", you: "You give us access", we: "You see your own orders, prepared" },
  { h: "Run", p: "We run it with you every day and fix what goes wrong. It gets better each time your team corrects it.", you: "Your team approves orders", we: "We handle the rest" },
];

const DATA = [
  { h: "Nothing goes out without a yes", p: "Every order and quote waits for your team to approve it.", bg: "var(--green-soft)", fg: "var(--green)", d: "M4.5 10.5l3.5 3.5 7.5-8", w: 2 },
  { h: "Your data is only yours", p: "Your BOMs, rates and customers are never shared with anyone.", bg: "var(--accent-soft)", fg: "var(--accent)", d: "M6 9h8a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2zM7 9V6.5a3 3 0 016 0V9", w: 1.8 },
  { h: "Easy to stop", p: "Your orders are saved in your own ERP. If you stop Anuma, your work carries on as before.", bg: "var(--rose-soft)", fg: "var(--rose)", d: "M10 3.5v6M6.4 6a5.8 5.8 0 107.2 0", w: 1.8 },
  { h: "In your own cloud", p: "Run it in your own AWS account, with Claude on Amazon Bedrock. Your data stays in India.", bg: "#ececf1", fg: "var(--ink)", d: "M5.5 14.5a3.5 3.5 0 01-.3-7A5 5 0 0114.6 6a4 4 0 01.4 8.5z", w: 1.7 },
];

const FAQ: [string, string][] = [
  ["What is this, and what do I do?", "Your team keeps doing the selling. Anuma does the reading, typing and checking, and hands them a ready order or quote. They check it and say yes."],
  ["Do my customers have to change how they order?", "No. They keep sending WhatsApp messages, emails, photos and voice notes. There is nothing for them to download."],
  ["Will it work with my ERP?", "Yes. Tally, SAP, Odoo, Zoho, Dynamics and ERPNext. If yours is custom, we connect to it, or start with Excel."],
  ["My products are custom. Can it handle that?", "It learns from your own old quotes, orders and catalogue. When it isn't sure, it asks your team. Every answer makes it better."],
  ["Can I see it on my kind of enquiry?", "Yes. Send us one day of your real orders. We come back with them prepared, before we build anything."],
  ["Will my team use it, or is it one more app?", "Your team keeps using WhatsApp and Tally. They get one screen on their phone to approve orders. It removes the typing, not the people."],
  ["Can I make changes myself?", "Yes. Add products, change rates and fix a wrong match yourself. We help with the bigger changes."],
  ["How long before it works?", "You see your first orders prepared within days. It gets better every week."],
  ["Can I see every enquiry and salesperson in one place?", "Yes. Every enquiry, quote and order, who is handling it and what is pending. You get a summary every morning."],
  ["Is my data safe? What if you shut down?", "Your data is kept private and separate. Your orders and quotes are saved in your own ERP, so they stay with you."],
];

export default function Home() {
  return (
    <div className="page">
      <Header />

      <main id="top">
        {/* HERO */}
        <section className="hero wrap">
          <h1>
            <em>AI agents</em> for Indian manufacturers.
          </h1>
          <p className="lede">Every enquiry, from every channel, handled until it&apos;s paid. Inside the ERP you already run.</p>
          <DashPreview />
        </section>

        {/* OUTCOMES: lead with proof */}
        <section className="sec c wrap" id="clients">
          <span className="lbl">From our clients</span>
          <h2>Already running at businesses like yours.</h2>
          <div className="stats rv">
            {/* TODO: confirm both numbers with the clients before ads go live */}
            <div className="stat"><b>3,000 → 1</b><span>WhatsApp groups into one agent</span><small>NuHome</small></div>
            <div className="stat"><b>8 min</b><span>to send a quote, down from 14 days</span><small>Axis Electricals</small></div>
          </div>
          <ClientReel />
        </section>

        {/* WHO IT'S FOR */}
        <section className="sec band wrap" id="who">
          <span className="lbl">Who it&apos;s for</span>
          <h2>Made for businesses that sell in bulk.</h2>
          <p className="intro">Your customers order on WhatsApp, email or calls. Your team types it all into the ERP.</p>
          <div className="sellto">
            <span className="sl">You sell to</span>
            {["Dealers", "Distributors", "Retailers", "Project buyers", "Exporters"].map((s) => <span key={s}>{s}</span>)}
          </div>
          <div className="inds">
            {INDUSTRIES.map(([b, p, d]) => (
              <div className="ind rv" key={b}>
                <span className="iic">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <b>{b}</b>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <p className="notfor">Not for online sellers or marketplace stores yet. Anuma is built for orders between businesses.</p>
        </section>

        {/* AGENTS */}
        <section className="sec" id="platform">
          <div className="wrap">
            <span className="lbl">The agents</span>
            <h2>The agents type. Your team sells.</h2>
            <p className="intro">Each agent takes one job your team does by hand. Start with one, add the rest later.</p>
            <AgentTabs />
          </div>
        </section>

        {/* ERP: bigger, its own moment */}
        <section className="erp band sec wrap" id="erp">
          <span className="lbl">Your ERP</span>
          <h2>Everything lands in your ERP.</h2>
          <p className="intro">Orders, quotes and payments, saved where your accounts team already works.</p>
          <div className="erp-grid">
            {ERPS.map(([n, src]) => (
              <div className="erp-tile rv" key={n}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" width={44} height={44} loading="lazy" />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <p className="erp-more">Custom ERP? <b>We connect to it,</b> or start with Excel.</p>
        </section>

        {/* TEAM */}
        <section className="sec" id="team">
          <div className="wrap">
            <span className="lbl">What Excel and WhatsApp can&apos;t do</span>
            <h2>Built for your whole team.</h2>
            <p className="intro">Owners, sales, reps and accounts each get what they need. Tap the demos.</p>
            <TeamFeatures />
          </div>
        </section>

        {/* PROCESS */}
        <section className="sec band" id="process">
          <div className="wrap">
            <span className="lbl">How we start</span>
            <h2>We set it up. You approve first.</h2>
            <p className="intro">The same team stays with you, from the first chat to every day after.</p>
            <div className="steps">
              {STEPS.map((s, i) => (
                <div className="step rv" key={s.h}>
                  <span className="n">{i + 1}</span>
                  <div className="card body">
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                    <div className="give"><span className="you">{s.you}</span><span>{s.we}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YOUR DATA */}
        <section className="sec c" id="data">
          <div className="wrap">
            <span className="lbl">Your data</span>
            <h2>Your prices stay yours.</h2>
            <p className="intro">Anuma keeps your rates, customers and margins private. Nothing moves without your team&apos;s okay.</p>
            <div className="cards dgrid">
              {DATA.map((c) => (
                <div className="card pc rv" key={c.h}>
                  <span className="pi" style={{ background: c.bg, color: c.fg }}>
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d={c.d} stroke="currentColor" strokeWidth={c.w} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="sec band c wrap" id="questions">
          <span className="lbl">Questions</span>
          <h2>What owners ask us first.</h2>
          <div className="card qs">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <p className="else">
            Something else?{" "}
            <a href={WA_URL} target="_blank" rel="noopener">Start a chat</a>. A person replies.
          </p>
        </section>

        {/* FINAL */}
        <section className="wrap" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 0px))" }}>
          <div className="final">
            <div className="fimg" style={{ backgroundImage: "url(/final.jpg)" }} />
            <h2>Tell us how you work.</h2>
            <p>Send us a message. We&apos;ll show you where to start.</p>
            <div className="ctas">
              <a className="btn pri" href={WA_URL} target="_blank" rel="noopener">
                <WhatsAppIcon />
                Start chat
              </a>
              <a className="btn gl" href="#platform">See how it works</a>
            </div>
            <footer className="fcard-foot">
              <Mark />
              <nav>
                <a href="https://anuma.co.in/blog">Blog</a>
                <a href="https://anuma.co.in/contact">Contact</a>
                <a href="https://anuma.co.in/privacy">Privacy</a>
                <a href="https://anuma.co.in/terms">Terms</a>
                <a href="https://anuma.co.in/model-training">Model Training</a>
                <a href="/anuma.md">This page as text</a>
              </nav>
              <div className="askai">
                <span>Ask AI about Anuma</span>
                <div>
                  {ASK_AI.map((a) => (
                    <a key={a.label} href={a.href} target="_blank" rel="noopener">{a.label}</a>
                  ))}
                </div>
              </div>
              <p className="legal">
                <span>© 2026 Anuma Intelligence Private Limited</span>
                <span><b>CIN</b> U62099MH2026PTC474204</span>
                <span><b>DPIIT</b> DIPP285119</span>
              </p>
            </footer>
          </div>
        </section>
      </main>

      <DockCta />
      <Reveal />
    </div>
  );
}
