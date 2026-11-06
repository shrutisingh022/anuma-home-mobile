import { Mark, WhatsAppIcon } from "./Icons";
import { WA_URL } from "@/lib/site";

/** Logo on the left, Start chat on the right. The button is the merchant admin panel's primary button. */
export default function Header() {
  return (
    <header className="hdr">
      <div className="wrap bar">
        <a className="tile" href="#top" aria-label="Anuma home">
          <Mark />
        </a>
        <a className="btn-admin" href={WA_URL} target="_blank" rel="noopener">
          <WhatsAppIcon />
          Start chat
        </a>
      </div>
    </header>
  );
}
