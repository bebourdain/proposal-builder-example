import { proposal as P } from "../data";

export default function GalleryCards() {
  const Section = ({ title, children }) => (
    <section className="pg-section">
      <p className="pg-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper pg">
      <div className="pp-cover">
        <div className="pg-cover-card">
          <div>
            <span className="pg-chip">{P.project.rfp}</span>
          </div>
          <div>
            <h1 className="pg-cover-title">{P.project.name}</h1>
            <p className="pg-cover-sub">
              {P.project.subtitle} · Prepared for {P.client.name} by{" "}
              {P.firm.name}
            </p>
          </div>
          <div className="pg-cover-foot">
            <span>{P.project.date}</span>
            <span>{P.project.budget}</span>
            <span>{P.firm.website}</span>
          </div>
        </div>
      </div>
      <div className="pg-body">
        <Section title="Overview">
          <div className="pg-card">
            <p className="pg-lede">{P.executiveSummary}</p>
          </div>
        </Section>
        <Section title="Scope of Services">
          <div className="pg-grid-3">
            {P.scope.map((g) => (
              <div className="pg-card" key={g.title}>
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
        <Section title="Approach">
          <div className="pg-grid-2">
            {P.approach.map((a) => (
              <div className="pg-card" key={a.phase}>
                <h3>{a.phase}</h3>
                <p className="pg-meta">{a.duration}</p>
                <p className="pg-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Team">
          <div className="pg-grid-3">
            {P.team.map((t) => (
              <div className="pg-card" key={t.name}>
                <h3>{t.name}</h3>
                <p className="pg-meta">{t.role}</p>
                <p className="pg-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Selected Projects">
          <div className="pg-grid-2">
            {P.experience.map((e) => (
              <div className="pg-card" key={e.name}>
                <h3>{e.name}</h3>
                <p className="pg-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pg-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Fees">
          <div className="pg-card">
            {P.fees.map((f) => (
              <div className="pg-fee-row" key={f.phase}>
                <span>{f.phase}</span>
                <span>
                  {f.pct} — {f.fee}
                </span>
              </div>
            ))}
            <div className="pg-fee-row pg-fee-total">
              <span>{P.feeTotal.label}</span>
              <span>{P.feeTotal.fee}</span>
            </div>
            <p className="pg-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
          </div>
        </Section>
        <Section title="Why Meridian">
          <div className="pg-card">
            <ul>
              {P.whyUs.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}
