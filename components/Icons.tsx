import { WA_URL } from "@/lib/site";

// The WhatsApp mark: the main call to action opens WhatsApp, so it carries this instead of an arrow (live site).
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.75.46 3.46 1.33 4.97L2 22l5.22-1.37a9.9 9.9 0 0 0 4.82 1.23h.01c5.49 0 9.94-4.45 9.94-9.94S17.53 2 12.04 2Zm0 18.18h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.22 8.22 0 0 1-1.26-4.39c0-4.56 3.71-8.27 8.28-8.27 4.56 0 8.27 3.71 8.27 8.27 0 4.57-3.71 8.24-8.31 8.24Zm4.54-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"
      />
    </svg>
  );
}

/** The Morse "· —" logo (live nav mark). */
export function Logo() {
  return (
    <span className="brand-mk" aria-hidden="true">
      <i className="brand-dot" />
      <i className="brand-dash" />
    </span>
  );
}

/** The live site's black liquid pill. Label copy stays "Start chat" (v2 demo). */
export function LiquidButton({
  label = "Start chat",
  href = WA_URL,
  size,
  tabIndex,
}: {
  label?: string;
  href?: string;
  size?: "sm" | "wide";
  tabIndex?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      tabIndex={tabIndex}
      className={`btn-liquid${size === "sm" ? " is-sm" : size === "wide" ? " is-wide" : ""}`}
    >
      <span className="lq-shapes" aria-hidden="true">
        <span className="lq-pill" />
        <span className="lq-dot" />
      </span>
      <span className="lq-label">{label}</span>
      <span className="lq-icon" aria-hidden="true">
        <WhatsAppIcon />
      </span>
    </a>
  );
}

/** One copy of the goo filter for every liquid button on the page. */
export function LiquidDefs() {
  return (
    <svg className="lq-defs" width="0" height="0" aria-hidden="true">
      <filter id="lq-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
        <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 48 -22" result="g" />
        <feComposite in="SourceGraphic" in2="g" operator="atop" />
      </filter>
    </svg>
  );
}

/** The logo as the HTML draws it (two bars), for the header tile, dashboard and footer. */
export function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path fill="currentColor" d="M6 3.8v12.4a.8.8 0 001.2.7l10-6.2a.8.8 0 000-1.4l-10-6.2A.8.8 0 006 3.8z" />
    </svg>
  );
}
