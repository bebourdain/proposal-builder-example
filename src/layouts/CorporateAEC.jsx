import { proposal as P } from "../data";

export default function CorporateAEC() {
  const Section = ({ title, children }) => (
    <section className="pc-section">
      <p className="pc-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper pc">
      <div className="pp-cover">
        <div className="pc-cover-band">
          <p className="pc-firm">{P.firm.name}</p>
          <h1 className="pc-cover-title">{P.project.name}</h1>
          <p className="pc-cover-sub">{P.project.subtitle}</p>
        </div>
        <div className="pc-cover-lower">
          <div className="pc-cover-meta">
            <div>
              <b>Prepared For</b>
              {P.client.name}
              <br />
              {P.client.contact}
            </div>
            <div>
              <b>Solicitation</b>
              {P.project.rfp}
              <br />
              {P.project.date}
            </div>
            <div>
              <b>Project Value</b>
              {P.project.budget}
              <br />
              {P.project.duration}
            </div>
          </div>
          <div className="pc-cover-foot">
            <span>{P.firm.address}</span>
            <span>{P.firm.website}</span>
          </div>
        </div>
      </div>
      <div className="pc-body">
        <Section title="Letter of Interest">
          <p className="pc-lede">Dear Mr. Reyes,</p>
          <p className="pc-lede" style={{ marginTop: 10 }}>
            {P.coverLetter}
          </p>
          <p className="pc-sig">
            Respectfully submitted,
            <br />
            {P.firm.principal} — {P.firm.principalTitle}
          </p>
        </Section>
        <Section title="Executive Summary">
          <p className="pc-lede">{P.executiveSummary}</p>
        </Section>
        <Section title="Scope of Services">
          <div className="pc-grid-3">
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
        <Section title="Project Approach">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 12 }}>
              <h3>{a.phase}</h3>
              <p className="pc-meta">{a.duration}</p>
              <p className="pc-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="Key Personnel">
          <div className="pc-grid-2">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="pc-meta">{t.role}</p>
                <p className="pc-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Relevant Experience">
          <div className="pc-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="pc-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pc-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Professional Fee">
          {P.fees.map((f) => (
            <div className="pc-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="pc-fee-row pc-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pc-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
      </div>
    </div>
  );
}
