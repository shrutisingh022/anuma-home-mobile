// The Anuma mobile app's Inbox, rebuilt from the App Store screens (anuma-mobile-store/app-screens.html,
// anuma-mobile main, 22 Oct) inside an iPhone frame. Mock data only: no real customers, no photos.
// The screen is drawn at the app's real size (440 x 956) and scaled down to fit the phone.

function Ic({ id, className, size }: { id: string; className?: string; size?: number }) {
  return (
    <svg className={`ap-ic${className ? " " + className : ""}`} style={size ? { width: size, height: size } : undefined} aria-hidden="true">
      <use href={`#ap-${id}`} />
    </svg>
  );
}

function Disc() {
  return (
    <span className="ap-ring ok">
      <span className="ap-disc"><i /><i /></span>
    </span>
  );
}

function Held({ initials, tone }: { initials: string; tone: string }) {
  return (
    <span className="ap-stack">
      <span className="ap-disc back"><i /><i /></span>
      <span className="ap-ring warn front">
        <span className="ap-face" style={{ background: tone }}>{initials}</span>
      </span>
    </span>
  );
}

type Row = {
  kind: "open" | "esc" | "closed";
  id: string;
  timer?: { text: string; wait?: boolean };
  unread?: boolean;
  time: string;
  name: string;
  contact: string;
  msg: { text?: string; tick?: "read" | "grey"; typing?: boolean; unread?: boolean };
  who?: "anuma" | { initials: string; tone: string };
};

const ROWS: Row[] = [
  { kind: "open", id: "061126-001", timer: { text: "23:12 left" }, unread: true, time: "11:42 am", name: "Kapoor Decor", contact: "Ritu Kapoor", msg: { typing: true }, who: "anuma" },
  { kind: "esc", id: "061126-002", timer: { text: "6:38 left" }, unread: true, time: "11:36 am", name: "Shah Furnishings", contact: "Arjun Shah", msg: { text: "Is Zyra 14 Ivory in stock? Need 60 m", unread: true }, who: { initials: "RV", tone: "#e3eefc" } },
  { kind: "open", id: "061126-003", timer: { text: "18:40 left" }, time: "11:20 am", name: "Raj Electricals", contact: "Vikram Raj", msg: { text: "Quote sent. 4 lines, ₹4,12,560.", tick: "read" }, who: "anuma" },
  { kind: "open", id: "061126-004", timer: { text: "21:05 left" }, time: "10:58 am", name: "Patel Textiles", contact: "Sana Patel", msg: { text: "Sharing the swatch card now", tick: "grey" }, who: { initials: "MK", tone: "#fbeedd" } },
  { kind: "esc", id: "061126-005", timer: { text: "12m", wait: true }, time: "10:31 am", name: "Mehta Drapes", contact: "Priya Mehta", msg: { text: "Rate same rahega na?" }, who: { initials: "RV", tone: "#e3eefc" } },
  { kind: "closed", id: "051126-007", time: "Yesterday", name: "Shree Ganesh Furnishings", contact: "Harpreet Singh", msg: { text: "Thank you! Your order is on its way.", tick: "read" } },
  { kind: "closed", id: "041126-003", time: "Mon", name: "Royal Home Studio", contact: "+91 98200 00000", msg: { text: "Received, thanks" } },
];

export default function AppPhone() {
  return (
    <div className="ap-device" role="img" aria-label="The Anuma app on a phone: the Inbox, with sample data">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="ap-house" viewBox="0 0 24 24"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></symbol>
          <symbol id="ap-msgs" viewBox="0 0 24 24"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></symbol>
          <symbol id="ap-package" viewBox="0 0 24 24"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" /><path d="m7.5 4.27 9 5.15" /></symbol>
          <symbol id="ap-bell" viewBox="0 0 24 24"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></symbol>
          <symbol id="ap-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></symbol>
          <symbol id="ap-timer" viewBox="0 0 24 24"><line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" /></symbol>
          <symbol id="ap-checks" viewBox="0 0 24 24"><path d="M18 6 7 17l-5-5" /><path d="m22 10-7.5 7.5L13 16" /></symbol>
        </defs>
      </svg>
      <span className="ap-btn ap-btn-a" aria-hidden="true" />
      <span className="ap-btn ap-btn-b" aria-hidden="true" />
      <span className="ap-btn ap-btn-c" aria-hidden="true" />
      <span className="ap-btn ap-btn-d" aria-hidden="true" />
      <div className="ap-glass">
        <div className="ap-fit">
          <div className="ap-screen">
            <div className="ap-island" />
            <div className="ap-sb">
              <span>9:41</span>
              <span className="r">
                <svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="8" width="3.2" height="4" rx="1" fill="#0a0a0a" /><rect x="5" y="5.5" width="3.2" height="6.5" rx="1" fill="#0a0a0a" /><rect x="10" y="3" width="3.2" height="9" rx="1" fill="#0a0a0a" /><rect x="15" y="0" width="3.2" height="12" rx="1" fill="#0a0a0a" /></svg>
                <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.3c2.4 0 4.6.9 6.2 2.5l1.2-1.2C14 1.7 11.4.6 8.5.6S3 1.7 1.1 3.6l1.2 1.2C3.9 3.2 6.1 2.3 8.5 2.3Zm0 3.4c1.5 0 2.8.6 3.8 1.5l1.2-1.2C12.2 4.8 10.4 4 8.5 4s-3.7.8-5 2l1.2 1.2c1-.9 2.3-1.5 3.8-1.5Zm0 3.3c.6 0 1.1.2 1.5.6L8.5 11.1 7 9.6c.4-.4.9-.6 1.5-.6Z" fill="#0a0a0a" /></svg>
                <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" stroke="#0a0a0a" opacity=".35" fill="none" /><rect x="2" y="2" width="20" height="9" rx="2.5" fill="#0a0a0a" /><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="#0a0a0a" opacity=".4" /></svg>
              </span>
            </div>

            <div className="ap-topbar">
              <span className="t">Inbox</span>
              <span className="ap-me">KT</span>
            </div>
            <div className="ap-pad"><div className="ap-search"><Ic id="search" /><span>Search conversations</span></div></div>
            <div className="ap-pad2"><div className="ap-seg"><span className="on">All</span><span>Open</span><span>Escalated</span><span>Closed</span></div></div>

            <div className="ap-list">
              {ROWS.map((r) => (
                <div className={`ap-row ${r.kind}`} key={r.id}>
                  <div className="l1">
                    <span className={`ap-ctag ${r.kind}`}><i />{r.id}</span>
                    {r.timer && (
                      <span className={`ap-timer ${r.timer.wait ? "wait" : "win"}`}><Ic id="timer" />{r.timer.text}</span>
                    )}
                    <span className="sp" />
                    {r.unread && <span className="ap-udot" />}
                    <span className="ap-time">{r.time}</span>
                  </div>
                  <div className="l2"><b>{r.name}</b><span className="ap-muted">, {r.contact}</span></div>
                  <div className="l3">
                    <div className={`msg${r.msg.unread ? " unread" : ""}`}>
                      {r.msg.typing ? (
                        <span className="ap-typing">typing <span><i /><i /><i /></span></span>
                      ) : (
                        <>
                          {r.msg.tick && <Ic id="checks" className={r.msg.tick === "read" ? "tick-read" : "tick-grey"} size={15} />}
                          <span>{r.msg.text}</span>
                        </>
                      )}
                    </div>
                    {r.who === "anuma" && <Disc />}
                    {r.who && r.who !== "anuma" && <Held initials={r.who.initials} tone={r.who.tone} />}
                  </div>
                </div>
              ))}
            </div>

            <div className="ap-fade" />
            <div className="ap-tabbar">
              <span className="tb"><Ic id="house" /></span>
              <span className="tb on"><span className="w"><Ic id="msgs" /><span className="ap-badge">2</span></span></span>
              <span className="tb"><Ic id="package" /></span>
              <span className="tb"><span className="w"><Ic id="bell" /><span className="ap-badge">4</span></span></span>
            </div>
            <div className="ap-home" />
          </div>
        </div>
      </div>
    </div>
  );
}
