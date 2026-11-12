import { proposal as P } from "../data";

export default function HealthcareClean() {
  const Section = ({ title, children }) => (
    <section className="ph-section">
      <p className="ph-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper ph">
      <div className="pp-cover">
        <p className="ph-cover-kicker">
          {P.firm.name} · Response to {P.project.rfp}
        </p>
        <div>
          <h1 className="ph-cover-title">{P.project.name}</h1>
          <p className="ph-cover-sub">
            {P.project.subtitle} for {P.client.name}
          </p>
        </div>
        <div className="ph-cover-stats">
          {P.stats.map((s) => (
            <div key={s.label}>
              <p className="ph-stat-num">{s.num}</p>
              <p className="ph-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="ph-body">
        <Section title="Project Understanding">
          <p className="ph-lede">{P.project.description}</p>
          <p className="ph-lede" style={{ marginTop: 10 }}>
            {P.executiveSummary}
          </p>
        </Section>
        <Section title="Scope of Services">
          <div className="ph-grid-3">
            {P.scope.map((g) => (
              <div className="ph-card" key={g.title}>
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
        <Section title="Approach & Schedule">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 11 }}>
              <h3>{a.phase}</h3>
              <p className="ph-meta">{a.duration}</p>
              <p className="ph-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="Your Care Team">
          <div className="ph-grid-3">
            {P.team.map((t) => (
              <div className="ph-card" key={t.name}>
                <h3>{t.name}</h3>
                <p className="ph-meta">{t.role}</p>
                <p className="ph-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Proven Outcomes">
          <div className="ph-grid-2">
            {P.experience.map((e) => (
              <div className="ph-card" key={e.name}>
                <h3>{e.name}</h3>
                <p className="ph-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="ph-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Fee Summary">
          {P.fees.map((f) => (
            <div className="ph-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="ph-fee-row ph-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="ph-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
        <Section title="Why Meridian">
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
