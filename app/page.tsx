import Header from "@/components/Header";
import DashPreview from "@/components/DashPreview";
import ClientReel from "@/components/ClientReel";
import AgentTabs from "@/components/AgentTabs";
import TeamFeatures from "@/components/TeamFeatures";
import DockCta from "@/components/DockCta";
import Reveal from "@/components/Reveal";
import { FaqChat, Industries } from "@/components/Lists";
import { LiquidButton, LiquidDefs, Logo } from "@/components/Icons";
import { CircleCheck, Lock, Server, Undo2 } from "@/components/PixelIcons";
import { ASK_AI } from "@/lib/site";

/*
  Visual system: the live anuma.co.in (painted cards, liquid pill, hairline cards, Morse stages, chat FAQ).
  Content and order: the v2 demo, with the 6 Nov call's changes (outcomes lead, ERP gets its own moment).
  Button copy is the demo's: "Start chat", "See how it works".
*/

const WORKS_WITH: [string, string][] = [
  ["Tally", "/erp/tally.png"],
  ["SAP", "/erp/sap.svg"],
  ["Zoho", "/erp/zoho.svg"],
  ["Odoo", "/erp/odoo.png"],
  ["Microsoft Dynamics", "/erp/dynamics.svg"],
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
  { h: "Look", p: "We go through a day of your real orders, quotes and messages.", you: "You share a day of work", we: "You see where time goes" },
  { h: "Plan", p: "We agree what Anuma does and what your team keeps doing.", you: "You approve the plan", we: "It's in writing" },
  { h: "Set up", p: "We connect WhatsApp, email and your ERP, and load your catalogue and rates.", you: "You give us access", we: "Your own orders, prepared" },
  { h: "Run", p: "We run it with you every day. It gets better each time your team corrects it.", you: "Your team approves orders", we: "We handle the rest" },
];

const DATA = [
  { I: CircleCheck, h: "Nothing goes out without a yes", p: "Every order and quote waits for your team to approve it." },
  { I: Lock, h: "Your data is only yours", p: "Your BOMs, rates and customers are never shared with anyone." },
  { I: Undo2, h: "Easy to stop", p: "Orders are saved in your own ERP. Stop Anuma and work carries on." },
  { I: Server, h: "In your own cloud", p: "Your own AWS account, with Claude on Amazon Bedrock. Data stays in India." },
];

export default function Home() {
  return (
    <div className="page">
      <LiquidDefs />
      <Header />

      <main id="top">
        {/* HERO: the painted card */}
        <section className="hero">
          <div className="hero-card">
            <div className="hero-pic" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/hero-mobile.webp" alt="" fetchPriority="high" />
            </div>
            <h1 className="t-h1">AI agents for Indian manufacturers.</h1>
            <p className="t-hero-lede">Every enquiry, from every channel, handled until it&apos;s paid. Inside the ERP you already run.</p>
            <div className="hero-actions">
              <LiquidButton size="wide" />
              <a className="link-arrow" href="#platform">See how it works</a>
            </div>
            <div className="ww">
              <p className="ww-label">Works with</p>
              <ul className="ww-list" aria-label="Works with Tally, SAP, Zoho, Odoo and Microsoft Dynamics">
                {WORKS_WITH.map(([n, src]) => (
                  <li className="ww-dot" key={n} title={n}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={n} width={18} height={18} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="shot">
          <DashPreview />
        </div>

        {/* OUTCOMES lead */}
        <section className="section wrap" id="clients">
          <div className="head">
            <span className="t-eyebrow">From our clients</span>
            <h2 className="t-h2">Already running at businesses like yours.</h2>
          </div>
          <div className="stats rv">
            {/* TODO: confirm both numbers with the clients before ads go live */}
            <div className="case-stat">
              <b className="t-stat">3,000 → 1</b>
              <span className="t-small">WhatsApp groups into one agent</span>
              <span className="by">NuHome</span>
            </div>
            <div className="case-stat">
              <b className="t-stat">8 min</b>
              <span className="t-small">to send a quote, down from 14 days</span>
              <span className="by">Axis Electricals</span>
            </div>
          </div>
          <ClientReel />
        </section>

        {/* WHO IT'S FOR */}
        <section className="section wrap" id="who">
          <div className="head">
            <span className="t-eyebrow">Who it&apos;s for</span>
            <h2 className="t-h2">Made for businesses that sell in bulk.</h2>
            <p className="t-lede">Your customers order on WhatsApp, email or calls. Your team types it all into the ERP.</p>
          </div>
          <div className="sell">
            <span className="t-small">You sell to</span>
            {["Dealers", "Distributors", "Retailers", "Project buyers", "Exporters"].map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>
          <Industries />
          <p className="notfit">
            <b>Not for online sellers or marketplace stores yet.</b> Anuma is built for orders between businesses.
          </p>
        </section>

        {/* AGENTS */}
        <section className="section wrap" id="platform">
          <div className="head">
            <span className="t-eyebrow">The agents</span>
            <h2 className="t-h2">The agents type. Your team sells.</h2>
            <p className="t-lede">Each agent takes one job your team does by hand. Start with one, add the rest later.</p>
          </div>
          <AgentTabs />
        </section>

        {/* ERP: its own moment, bigger logos */}
        <section className="section wrap" id="erp">
          <div className="head is-center">
            <span className="t-eyebrow">Your ERP</span>
            <h2 className="t-h2">Everything lands in your ERP.</h2>
            <p className="t-lede">Orders, quotes and payments, saved where your accounts team already works.</p>
          </div>
          <div className="erp-grid">
            {ERPS.map(([n, src]) => (
              <div className="erp-tile rv" key={n}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" width={40} height={40} loading="lazy" />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <p className="t-small erp-note">Custom ERP? <b>We connect to it,</b> or start with Excel.</p>
        </section>

        {/* TEAM */}
        <section className="section wrap" id="team">
          <div className="head">
            <span className="t-eyebrow">What Excel and WhatsApp can&apos;t do</span>
            <h2 className="t-h2">Built for your whole team.</h2>
            <p className="t-lede">Owners, sales, reps and accounts each get what they need. Tap the demos.</p>
          </div>
          <TeamFeatures />
        </section>

        {/* HOW WE START */}
        <section className="section wrap" id="process">
          <div className="head">
            <span className="t-eyebrow">How we start</span>
            <h2 className="t-h2">We set it up. You approve first.</h2>
            <p className="t-lede">The same team stays with you, from the first chat to every day after.</p>
          </div>
          <ol className="case-flow">
            {STEPS.map((s, i) => (
              <li key={s.h} className="rv">
                <span className="case-orb">{i + 1}</span>
                <div className="card">
                  <h3 className="t-h3">{s.h}</h3>
                  <p>{s.p}</p>
                  <div className="give"><span className="you">{s.you}</span><span>{s.we}</span></div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* YOUR DATA */}
        <section className="section wrap" id="data">
          <div className="head">
            <span className="t-eyebrow">Your data</span>
            <h2 className="t-h2">Your prices stay yours.</h2>
          </div>
          <div className="sv-list data-list">
            {DATA.map(({ I, h, p }) => (
              <div className="sv-row" key={h}>
                <span className="sv-tile"><I aria-hidden /></span>
                <span><b>{h}</b><span>{p}</span></span>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="section wrap" id="questions">
          <div className="head is-center">
            <span className="t-eyebrow">Questions</span>
            <h2 className="t-h2">What owners ask us first.</h2>
          </div>
          <FaqChat />
          <p className="faq-else">
            Something else? <a href="https://wa.me/919167000410" target="_blank" rel="noopener">Start a chat</a>. A person replies.
          </p>
        </section>

        {/* CLOSING: the painted end card */}
        <section className="end">
          <div className="end-card">
            <h2 className="t-h2">Tell us how you work.</h2>
            <p className="t-lede">Send us a message. We&apos;ll show you where to start.</p>
            <div className="end-actions">
              <LiquidButton size="wide" />
              <a className="btn btn-glass" href="#platform">See how it works</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <Logo />
        <nav aria-label="Footer">
          <a href="https://anuma.co.in/blog">Blog</a>
          <a href="https://anuma.co.in/contact">Contact</a>
          <a href="https://anuma.co.in/privacy">Privacy</a>
          <a href="https://anuma.co.in/terms">Terms</a>
          <a href="https://anuma.co.in/model-training">Model Training</a>
          <a href="/anuma.md">This page as text</a>
        </nav>
        <div className="askai">
          <span className="t-small">Ask AI about Anuma</span>
          <div>
            {ASK_AI.map((a) => (
              <a key={a.label} className="chip" href={a.href} target="_blank" rel="noopener">{a.label}</a>
            ))}
          </div>
        </div>
        <p className="legal">
          <span>© 2026 Anuma Intelligence Private Limited</span>
          <span>CIN U62099MH2026PTC474204 · DPIIT DIPP285119</span>
        </p>
      </footer>

      <DockCta />
      <Reveal />
    </div>
  );
}
