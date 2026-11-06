"use client";

import { useState } from "react";

// The v2 HTML's four features, word for word, in the live media-card shape: dotted stage on top, copy below.
function Seg<T extends string>({ opts, value, onChange, label }: { opts: [T, string][]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {opts.map(([v, l]) => (
        <button key={v} type="button" aria-pressed={v === value} onClick={() => onChange(v)}>
          {l}
        </button>
      ))}
    </div>
  );
}

const RULES = {
  a: [["Price", "List minus 10%"], ["Credit", "30 days, up to ₹5L"], ["Approves", "Sales team"], ["Free delivery", "Above 10 rolls"]],
  b: [["Price", "List minus 5%"], ["Credit", "15 days, up to ₹2L"], ["Approves", "Sales team"], ["Free delivery", "Above 20 rolls"]],
  n: [["Price", "List price"], ["Credit", "Advance only"], ["Approves", "Owner"], ["First order", "Owner sees it first"]],
} as const;

const ROLES = {
  o: [["See every customer and rate", true], ["Edit rates and rules", true], ["Approve orders", true], ["See margins", true]],
  s: [["See every customer and rate", true], ["Edit rates and rules", false], ["Approve orders", true], ["See margins", false]],
  r: [["See their own customers", true], ["Edit rates and rules", false], ["Approve orders", false], ["See margins", false]],
} as const;

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.9 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.4-3.67zM14.1 5.86c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.68-1.1 1.77-.96 2.81 1.02.08 2.06-.52 2.69-1.28z" />
    </svg>
  );
}
function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#34a853" d="M3.6 2.3l10.5 10.5L3.6 23.3c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" />
      <path fill="#fbbc04" d="M17.6 9.3l-3.5 3.5 3.5 3.5 4-2.3c1.1-.6 1.1-1.8 0-2.4l-4-2.3z" />
      <path fill="#4285f4" d="M14.1 12.8L3.6 23.3c.4.2.9.2 1.4-.1l12.6-6.9-3.5-3.5z" />
      <path fill="#ea4335" d="M3.6 2.3l10.5 10.5 3.5-3.5L5 2.4c-.5-.3-1-.3-1.4-.1z" />
    </svg>
  );
}

function Label({ dot, children }: { dot: string; children: string }) {
  return (
    <span className="chip feat-label">
      <i style={{ background: dot }} />
      {children}
    </span>
  );
}

export default function TeamFeatures() {
  const [approved, setApproved] = useState(false);
  const [rule, setRule] = useState<keyof typeof RULES>("a");
  const [flow, setFlow] = useState<"on" | "off">("on");
  const [role, setRole] = useState<keyof typeof ROLES>("o");

  return (
    <div className="feats">
      <article className="feat rv">
        <div className="feat-stage stage">
          <div className="mphone">
            <div className="mnotch" />
            <div className="mscr">
              <small className="mlb">Needs your yes</small>
              <div className="mcard">
                <b>SO-1042 · Shah Furnishings</b>
                <span>2 rolls · Zyra 14 · ₹48,600</span>
                <div className="mbtns">
                  <span className="mno">Edit</span>
                  <button type="button" className={`myes${approved ? " done" : ""}`} onClick={() => setApproved(true)}>
                    {approved ? "Approved ✓" : "Approve"}
                  </button>
                </div>
              </div>
              <div className="mcard dim">
                <b>Proposal · Raj Electricals</b>
                <span>4 lines · ₹4,12,560</span>
              </div>
            </div>
          </div>
        </div>
        <div className="feat-body">
          <Label dot="#f2b53a">Mobile app</Label>
          <h3 className="t-h3">Approve from your phone.</h3>
          <p className="t-lede">For owners, sales and reps, on iOS and Android.</p>
          <ul className="ticks">
            <li>Approve orders and quotes in one tap</li>
            <li>Reps place orders from the market</li>
            <li>Every customer&apos;s history in your pocket</li>
          </ul>
          <div className="stores">
            {/* TODO: real store links once the app is live */}
            <a className="store" href="#team"><AppleIcon /><span><small>Download on the</small>App Store</span></a>
            <a className="store" href="#team"><PlayStoreIcon /><span><small>Get it on</small>Google Play</span></a>
          </div>
        </div>
      </article>

      <article className="feat rv">
        <div className="feat-stage stage">
          <div className="panel-card" aria-live="polite">
            <div className="rh"><b>Rulebook</b><small>applies to every order</small></div>
            {RULES[rule].map(([k, v]) => (
              <div className="rr" key={k}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
        </div>
        <div className="feat-body">
          <Label dot="#6a88e2">Rulebooks</Label>
          <h3 className="t-h3">Write your rules once.</h3>
          <p className="t-lede">Rates, discounts, credit limits and who approves what. Every order follows them.</p>
          <Seg label="Buyer type" value={rule} onChange={setRule} opts={[["a", "Band A dealer"], ["b", "Band B"], ["n", "New buyer"]]} />
        </div>
      </article>

      <article className="feat rv">
        <div className="feat-stage stage">
          <div className="flowx">
            <span className="fs">Enquiry</span><span className="fa">›</span>
            <span className="fs">Quote</span><span className="fa">›</span>
            {flow === "on" && (
              <>
                <span className="fs cus">Partner approval above ₹5L</span><span className="fa">›</span>
              </>
            )}
            <span className="fs">Order</span><span className="fa">›</span>
            <span className="fs">Dispatch</span>
          </div>
        </div>
        <div className="feat-body">
          <Label dot="#e0673f">Custom workflows</Label>
          <h3 className="t-h3">Your steps, in your order.</h3>
          <p className="t-lede">Add the step only your business has. Anuma follows it every time.</p>
          <Seg label="Workflow" value={flow} onChange={setFlow} opts={[["on", "With your step"], ["off", "Standard"]]} />
        </div>
      </article>

      <article className="feat rv">
        <div className="feat-stage stage">
          <div className="panel-card" aria-live="polite">
            {ROLES[role].map(([k, y]) => (
              <div className={`pr ${y ? "y" : "n"}`} key={k}>
                <span className="pk">{y ? "✓" : "✕"}</span>
                {k}
              </div>
            ))}
            <div className="plog">Last action · Ravi approved SO-1042 · 10:44</div>
          </div>
        </div>
        <div className="feat-body">
          <Label dot="#1f1f1f">Roles and approvals</Label>
          <h3 className="t-h3">Everyone sees only what they should.</h3>
          <p className="t-lede">Decide who sees, edits and approves. Every action is logged.</p>
          <Seg label="Role" value={role} onChange={setRole} opts={[["o", "Owner"], ["s", "Sales"], ["r", "Rep"]]} />
        </div>
      </article>
    </div>
  );
}
