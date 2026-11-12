import { proposal as P } from "../data";

export default function SwissStudio() {
  let n = 0;
  const Section = ({ label, children }) => {
    n += 1;
    return (
      <section className="ps-section">
        <p className="ps-sec-label">
          <span>{String(n).padStart(2, "0")}</span>
          {label}
        </p>
        <div>{children}</div>
      </section>
    );
  };
  return (
    <div className="paper ps">
      <div className="pp-cover">
        <div>
          <div className="ps-cover-rule" />
          <p className="ps-meta">{P.firm.name} · {P.project.date}</p>
        </div>
        <div>
          <h1 className="ps-cover-title">
            {P.project.name}
            <span className="ps-red">.</span>
          </h1>
          <p className="ps-lede" style={{ marginTop: 14 }}>
            {P.project.subtitle} for {P.client.name}
          </p>
        </div>
        <div className="ps-cover-grid">
          <div>
            <b>Solicitation</b>
            {P.project.rfp}
          </div>
          <div>
            <b>Construction Budget</b>
            {P.project.budget}
          </div>
          <div>
            <b>Principal-in-Charge</b>
            {P.firm.principal}
          </div>
        </div>
      </div>
      <div className="ps-body">
        <Section label="Summary">
          <p className="ps-lede">{P.executiveSummary}</p>
        </Section>
        <Section label="Scope">
          <div className="ps-grid-3">
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
        <Section label="Approach">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 11 }}>
              <h3>
                {a.phase} <span className="ps-red">/</span>{" "}
                <span style={{ fontWeight: 400 }}>{a.duration}</span>
              </h3>
              <p className="ps-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section label="Team">
          <div className="ps-grid-2">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="ps-meta">{t.role}</p>
                <p className="ps-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section label="Experience">
          <div className="ps-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="ps-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="ps-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section label="Fees">
          {P.fees.map((f) => (
            <div className="ps-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="ps-fee-row ps-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="ps-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
        <Section label="Why Us">
          <ul>
            {P.whyUs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="ps-lede" style={{ marginTop: 14 }}>
            {P.slogan}
          </p>
        </Section>
      </div>
    </div>
  );
}
