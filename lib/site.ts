export const WA_URL = "https://wa.me/919167000410";

export const NAV = [
  { href: "#clients", label: "From our clients", hint: "Outcomes and videos", icon: "clients" },
  { href: "#who", label: "Who it's for", hint: "Businesses that sell in bulk", icon: "who" },
  { href: "#platform", label: "The agents", hint: "Start with one, add the rest", icon: "agents" },
  { href: "#erp", label: "Your ERP", hint: "Tally, SAP, Zoho, Odoo and more", icon: "erp" },
  { href: "#process", label: "How we start", hint: "Four steps, you approve first", icon: "process" },
  { href: "#questions", label: "Questions", hint: "What owners ask us first", icon: "faq" },
] as const;

const ASK = "Explain what Anuma (anuma.co.in) does for Indian manufacturers and B2B sellers, in simple words.";
export const ASK_AI = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(ASK)}` },
  { label: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(ASK)}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(ASK)}` },
  { label: "Google AI", href: `https://www.google.com/search?udm=50&q=${encodeURIComponent(ASK)}` },
];
