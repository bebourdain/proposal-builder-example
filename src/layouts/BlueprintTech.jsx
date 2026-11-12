import { proposal as P } from "../data";

export default function BlueprintTech() {
  const Section = ({ title, children }) => (
    <section className="pb-section">
      <p className="pb-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper pb">
      <div className="pp-cover">
        <div className="pb-frame">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="pb-stamp">{P.project.rfp}</span>
            <span className="pb-stamp">ISSUED {P.project.date}</span>
          </div>
          <div>
            <h1 className="pb-cover-title">{P.project.name}</h1>
            <p className="pb-cover-sub">{P.project.subtitle} — {P.client.name}</p>
          </div>
          <div className="pb-titleblock">
            <div>
              <b>PREPARED BY</b>
              {P.firm.name}
            </div>
            <div>
              <b>PRINCIPAL</b>
              {P.firm.principal}
            </div>
            <div>
              <b>BUDGET</b>
              {P.project.budget}
            </div>
            <div>
              <b>DURATION</b>
              {P.project.duration}
            </div>
          </div>
        </div>
      </div>
      <div className="pb-body">
        <Section title="00 / Project Understanding">
          <p className="pb-lede">{P.project.description}</p>
          <p className="pb-lede" style={{ marginTop: 10 }}>{P.executiveSummary}</p>
        </Section>
        <Section title="01 / Scope of Services">
          <div className="pb-grid-3">
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
        <Section title="02 / Phasing & Approach">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 11 }}>
              <h3>
                {a.phase} <span className="pb-meta">[{a.duration}]</span>
              </h3>
              <p className="pb-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="03 / Key Personnel">
          <div className="pb-grid-2">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="pb-meta">{t.role}</p>
                <p className="pb-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="04 / Precedent Projects">
          <div className="pb-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="pb-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pb-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="05 / Fee Schedule">
          {P.fees.map((f) => (
            <div className="pb-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} · {f.fee}
              </span>
            </div>
          ))}
          <div className="pb-fee-row pb-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pb-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
        <Section title="06 / Why This Team">
          <ul>
            {P.whyUs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
