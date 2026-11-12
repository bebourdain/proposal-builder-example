import { proposal as P } from "../data";

export default function DarkPrestige() {
  const Section = ({ title, children }) => (
    <section className="pd-section">
      <p className="pd-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper pd">
      <div className="pp-cover">
        <p className="pd-cover-kicker">{P.firm.name}</p>
        <div>
          <h1 className="pd-cover-title">{P.project.name}</h1>
          <p className="pd-cover-sub">{P.project.subtitle}</p>
          <p className="pd-desc" style={{ marginTop: 14 }}>
            Prepared for {P.client.name} · {P.project.rfp} · {P.project.date}
          </p>
        </div>
        <div className="pd-cover-foot">
          <span>{P.firm.address}</span>
          <span>{P.firm.website}</span>
        </div>
      </div>
      <div className="pd-body">
        <Section title="Intent">
          <p className="pd-lede">{P.executiveSummary}</p>
        </Section>
        <Section title="Services">
          <div className="pd-grid-3">
            {P.scope.map((g) => (
              <div key={g.title}>
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
        <Section title="Process">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 12 }}>
              <h3>{a.phase}</h3>
              <p className="pd-meta">{a.duration}</p>
              <p className="pd-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="Atelier">
          <div className="pd-grid-3">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="pd-meta">{t.role}</p>
                <p className="pd-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Provenance">
          <div className="pd-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="pd-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pd-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Commission">
          {P.fees.map((f) => (
            <div className="pd-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="pd-fee-row pd-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pd-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
        <Section title="Assurance">
          <ul>
            {P.whyUs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="pd-lede" style={{ marginTop: 14, fontStyle: "italic" }}>
            {P.slogan}
          </p>
        </Section>
      </div>
    </div>
  );
}
