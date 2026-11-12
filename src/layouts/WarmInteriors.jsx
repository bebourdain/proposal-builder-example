import { proposal as P } from "../data";

export default function WarmInteriors() {
  const Section = ({ title, children }) => (
    <section className="pw-section">
      <p className="pw-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper pw">
      <div className="pp-cover">
        <p className="pw-cover-kicker">
          A proposal from {P.firm.name} · {P.project.date}
        </p>
        <div>
          <h1 className="pw-cover-title">
            The <em>{P.project.name}</em>
            <br />
            at {P.client.name}
          </h1>
          <p style={{ marginTop: 14, fontSize: 14, color: "#f2cdb4" }}>
            {P.project.subtitle} · {P.project.rfp}
          </p>
        </div>
        <div className="pw-cover-foot">
          <span>{P.firm.tagline}</span>
          <span>{P.firm.website}</span>
        </div>
      </div>
      <div className="pw-body">
        <Section title="Spaces that care for people">
          <p className="pw-lede">{P.coverLetter}</p>
        </Section>
        <Section title="What we will do">
          <div className="pw-grid-3">
            {P.scope.map((g) => (
              <div className="pw-card" key={g.title}>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
        <Section title="How we will work together">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 12 }}>
              <h3>{a.phase}</h3>
              <p className="pw-meta">{a.duration}</p>
              <p className="pw-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="The people at your table">
          <div className="pw-grid-3">
            {P.team.map((t) => (
              <div className="pw-card" key={t.name}>
                <h3>{t.name}</h3>
                <p className="pw-meta">{t.role}</p>
                <p className="pw-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Rooms we have made well">
          <div className="pw-grid-2">
            {P.experience.map((e) => (
              <div className="pw-card" key={e.name}>
                <h3>{e.name}</h3>
                <p className="pw-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pw-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="An honest fee">
          {P.fees.map((f) => (
            <div className="pw-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="pw-fee-row pw-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pw-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
        <Section title="Why Meridian">
          <ul>
            {P.whyUs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="pw-sec-head" style={{ marginTop: 16 }}>
            {P.slogan}
          </p>
        </Section>
      </div>
    </div>
  );
}
