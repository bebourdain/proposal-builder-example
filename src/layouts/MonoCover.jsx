import { proposal as P } from "../data";

export default function MonoCover() {
  let n = 0;
  const num = () => String(++n).padStart(2, "0");
  const Section = ({ label, children }) => (
    <section className="pm-section">
      <div>
        <p className="pm-num">{num()}</p>
        <p className="pm-sec-label">{label}</p>
      </div>
      <div>{children}</div>
    </section>
  );
  return (
    <div className="paper pm">
      <div className="pp-cover">
        <div>
          <p className="pm-kicker">{P.firm.name} — {P.firm.tagline}</p>
        </div>
        <div>
          <h1 className="pm-cover-title">{P.project.name}</h1>
          <p className="pm-cover-sub">
            A Proposal for {P.project.subtitle}
          </p>
          <p className="pm-desc" style={{ marginTop: 8 }}>
            Prepared for {P.client.name} · {P.project.rfp}
          </p>
        </div>
        <div className="pm-cover-foot">
          <span>{P.project.date}</span>
          <span>{P.project.budget}</span>
          <span>{P.firm.website}</span>
        </div>
      </div>
      <div className="pm-body">
        <Section label="Executive Summary">
          <p className="pm-lede">{P.executiveSummary}</p>
          <div className="pm-grid-2" style={{ marginTop: 18 }}>
            {P.stats.map((s) => (
              <div key={s.label}>
                <p className="pm-stat-num">{s.num}</p>
                <p className="pm-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section label="Scope of Services">
          <div className="pm-grid-3">
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
        <Section label="Our Approach">
          {P.approach.map((a) => (
            <div key={a.phase} style={{ marginBottom: 12 }}>
              <h3>{a.phase}</h3>
              <p className="pm-meta">{a.duration}</p>
              <p className="pm-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section label="Proposed Team">
          <div className="pm-grid-2">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="pm-team-role">{t.role}</p>
                <p className="pm-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section label="Relevant Experience">
          <div className="pm-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="pm-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pm-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section label="Fee Summary">
          {P.fees.map((f) => (
            <div className="pm-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>{f.pct} — {f.fee}</span>
            </div>
          ))}
          <div className="pm-fee-row pm-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pm-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
        </Section>
        <Section label="Why Meridian">
          <ul>
            {P.whyUs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="pm-lede" style={{ marginTop: 16, fontWeight: 900 }}>
            {P.slogan}
          </p>
        </Section>
      </div>
    </div>
  );
}
