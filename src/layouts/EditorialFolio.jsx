import { proposal as P } from "../data";

export default function EditorialFolio() {
  const Section = ({ title, children }) => (
    <section className="pe-section">
      <h2 className="pe-sec-head">{title}</h2>
      {children}
    </section>
  );
  return (
    <div className="paper pe">
      <div className="pp-cover">
        <p className="pe-cover-kicker">
          {P.firm.name} — Proposal Folio · {P.project.date}
        </p>
        <div>
          <h1 className="pe-cover-title">
            Building the
            <br />
            <em>{P.project.name}</em>
          </h1>
          <p className="pe-cover-deck">
            {P.project.subtitle} for {P.client.name} — {P.project.description}
          </p>
        </div>
        <div className="pe-cover-foot">
          <span>{P.project.rfp}</span>
          <span>{P.project.budget}</span>
          <span>{P.firm.website}</span>
        </div>
      </div>
      <div className="pe-body">
        <Section title="A Letter to St. Alden's">
          <div className="pe-cols-2">
            <p className="pe-lede">{P.coverLetter}</p>
            <p className="pe-lede" style={{ marginTop: 10 }}>
              {P.executiveSummary}
            </p>
          </div>
        </Section>
        <Section title="The Services">
          <div className="pe-grid-3">
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
        <Section title="The Method">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 12 }}>
              <h3>{a.phase}</h3>
              <p className="pe-meta">{a.duration}</p>
              <p className="pe-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="The People">
          <div className="pe-grid-3">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="pe-meta">{t.role}</p>
                <p className="pe-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="The Record">
          <div className="pe-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="pe-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pe-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="The Investment">
          {P.fees.map((f) => (
            <div className="pe-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="pe-fee-row pe-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pe-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
      </div>
    </div>
  );
}
