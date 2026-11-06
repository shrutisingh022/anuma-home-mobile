import Header from "@/components/Header";
import DashPreview from "@/components/DashPreview";
import ClientReel from "@/components/ClientReel";
import AgentTabs from "@/components/AgentTabs";
import TeamFeatures from "@/components/TeamFeatures";
import DockCta from "@/components/DockCta";
import Reveal from "@/components/Reveal";
import ProcessSteps from "@/components/ProcessSteps";
import { FaqList, Industries } from "@/components/Lists";
import { LiquidButton, LiquidDefs, Mark, WhatsAppIcon } from "@/components/Icons";
import { CircleCheck, Lock, Server, Undo2 } from "@/components/PixelIcons";
import { Globe, HardHat, ShoppingBag, Store, Truck } from "lucide-react";
import { WA_URL } from "@/lib/site";

/*
  Order and every word: anuma-home-mobile-v2.html (6 Nov).
  Header, hero and dashboard: as the HTML lays them out. Everything below: the live anuma.co.in components.
  Side margins: 16px throughout.
*/

const ERPS: [string, string][] = [
  ["Tally", "/erp/tally.png"],
  ["SAP", "/erp/sap.svg"],
  ["Odoo", "/erp/odoo.png"],
  ["Zoho", "/erp/zoho.svg"],
  ["Dynamics 365", "/erp/dynamics.svg"],
  ["ERPNext", "/erp/erpnext.svg"],
];

const SELL_TO = [[Store, "Dealers"], [Truck, "Distributors"], [ShoppingBag, "Retailers"], [HardHat, "Project buyers"], [Globe, "Exporters"]] as const;


const DATA = [
  { I: CircleCheck, h: "Nothing goes out without a yes", p: "Every order and quote waits for your team to approve it." },
  { I: Lock, h: "Your data is only yours", p: "Your BOMs, rates and customers are never shared with anyone." },
  { I: Undo2, h: "Easy to stop", p: "Your orders are saved in your own ERP. If you stop Anuma, your work carries on as before." },
  { I: Server, h: "In your own cloud", p: "Run it in your own AWS account, with Claude on Amazon Bedrock. Your data stays in India." },
];

export default function Home() {
  return (
    <div className="page">
      <LiquidDefs />
      <Header />

      <main id="top">
        {/* HERO: as the HTML has it */}
        <section className="hero wrap">
          <span className="hero-chip"><i />WhatsApp, email and calls, into your ERP</span>
          <h1>
            <em>AI agents</em> for Indian manufacturers.
          </h1>
          <p className="lede">Every enquiry handled until it&apos;s paid. Inside your ERP.</p>
          <div className="ctas hero-ctas">
            <a className="btn-start" href={WA_URL} target="_blank" rel="noopener">
              Start chat
              <WhatsAppIcon />
            </a>
          </div>
          <DashPreview />
        </section>

        {/* WHO IT'S FOR */}
        <section className="section wrap" id="who">
          <div className="head">
            <span className="t-eyebrow">Who it&apos;s for</span>
            <h2 className="t-h2">Made for businesses that sell in bulk.</h2>
            <p className="t-lede">Orders come in on WhatsApp, email and calls. Your team types them in.</p>
          </div>
          <div className="sell">
            <span className="sell-k">You sell to</span>
            <div className="sell-pills">
              {SELL_TO.map(([I, s]) => (
                <span className="sell-pill" key={s}><I aria-hidden size={15} strokeWidth={1.75} />{s}</span>
              ))}
            </div>
          </div>
          <Industries />
          <p className="notfit">Not for online sellers or marketplace stores yet. Anuma is built for orders between businesses.</p>
        </section>

        {/* FROM OUR CLIENTS */}
        <section className="section wrap" id="clients">
          <div className="head">
            <span className="t-eyebrow">From our clients</span>
            <h2 className="t-h2">Running at businesses like yours.</h2>
          </div>
          <div className="stats rv">
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

        {/* THE AGENTS */}
        <section className="section wrap" id="platform">
          <div className="head">
            <span className="t-eyebrow">The agents</span>
            <h2 className="t-h2">The agents do the typing.</h2>
            <p className="t-lede">Start with one. Add the rest later.</p>
          </div>
          <AgentTabs />

          <div className="erp">
            <h3 className="t-h3">Everything lands in your ERP</h3>
            <div className="erp-grid">
              {ERPS.map(([n, src]) => (
                <div className="erp-tile rv" key={n}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" width={40} height={40} loading="lazy" />
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BUILT FOR YOUR WHOLE TEAM */}
        <section className="section wrap" id="team">
          <div className="head">
            <span className="t-eyebrow">For your team</span>
            <h2 className="t-h2">Built for<br />your whole team.</h2>
            <p className="t-lede">Owners, sales, reps and accounts each get what they need.</p>
          </div>
          <TeamFeatures />
        </section>

        {/* HOW WE START */}
        <section className="section wrap" id="process">
          <div className="head">
            <span className="t-eyebrow">How we start</span>
            <h2 className="t-h2">We set it up with you.</h2>
            <p className="t-lede">You approve before we build.</p>
          </div>
          <ProcessSteps />
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
                <span className="sv-txt"><b>{h}</b><span>{p}</span></span>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="section wrap" id="questions">
          <div className="head">
            <span className="t-eyebrow">Questions</span>
            <h2 className="t-h2">What owners ask first.</h2>
          </div>
          <FaqList />
          <p className="faq-else">
            Something else? <a href={WA_URL} target="_blank" rel="noopener">Start a chat</a>. A person replies.
          </p>
        </section>

        {/* FINAL: as the HTML has it */}
        <section className="wrap end-wrap">
          <div className="final">
            <div className="fimg" style={{ backgroundImage: "url(/final.jpg)" }} />
            <h2>Tell us how you work.</h2>
            <p>Send us a message. We&apos;ll show you where to start.</p>
            <div className="ctas">
              <LiquidButton size="wide" />
              <a className="btn gl" href="#platform">See how it works</a>
            </div>
            <div className="fcard-foot">
              <Mark />
              <nav>
                <a href="https://anuma.co.in/blog">Blog</a>
                <a href="https://anuma.co.in/contact">Contact</a>
                <a href="https://anuma.co.in/privacy">Privacy</a>
                <a href="https://anuma.co.in/terms">Terms</a>
                <a href="https://anuma.co.in/model-training">Model Training</a>
              </nav>
              <p>© 2026 Anuma Intelligence Private Limited</p>
            </div>
          </div>
        </section>
      </main>

      <DockCta />
      <Reveal />
    </div>
  );
}
