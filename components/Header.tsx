import { Mark } from "./Icons";

/** As in the HTML: the logo, centred, on a frosted sticky bar. Start chat lives in the bottom dock. */
export default function Header() {
  return (
    <header className="hdr">
      <div className="wrap bar">
        <a className="tile" href="#top" aria-label="Anuma home">
          <Mark />
        </a>
      </div>
    </header>
  );
}
