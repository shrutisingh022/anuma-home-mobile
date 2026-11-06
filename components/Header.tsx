import { Mark } from "./Icons";

/** As in the HTML: one centred logo tile, sticky, on a frosted bar. */
export default function Header() {
  return (
    <header className="hdr">
      <div className="wrap bar center">
        <a className="tile" href="#top" aria-label="Anuma home">
          <Mark />
        </a>
      </div>
    </header>
  );
}
