import { proposal as P } from "../data";

export default function TimelinePhased() {
  const Section = ({ title, children }) => (
    <section className="pt-section">
      <p className="pt-sec-head">{title}</p>
      {children}
    </section>
  );
  return (
    <div className="paper pt">
      <div className="pp-cover">
        <div>
          <p className="pt-cover-kicker">
            {P.firm.name} · {P.project.rfp} · {P.project.date}
          </p>
          <h1 className="pt-cover-title" style={{ marginTop: 10 }}>
            {P.project.name}
          </h1>
          <p className="pt-cover-sub">
            {P.project.subtitle} for {P.client.name} — from visioning to
            move-in in 48 months.
          </p>
        </div>
        <div className="pt-cover-phases">
          {P.approach.map((a) => (
            <div className="pt-cover-phase" key={a.phase}>
              <b>{a.phase}</b>
              {a.duration}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-body">
        <Section title="Executive Summary">
          <p className="pt-lede">{P.executiveSummary}</p>
        </Section>
        <Section title="The Plan, Phase by Phase">
          {P.approach.map((a) => (
            <div className="pt-phase-row" key={a.phase}>
              <h3>{a.phase}</h3>
              <p className="pt-meta">{a.duration}</p>
              <p className="pt-desc">{a.desc}</p>
            </div>
          ))}
        </Section>
        <Section title="Scope of Services">
          <div className="pt-grid-3">
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
        <Section title="Team">
          <div className="pt-grid-3">
            {P.team.map((t) => (
              <div key={t.name}>
                <h3>{t.name}</h3>
                <p className="pt-meta">{t.role}</p>
                <p className="pt-desc">{t.bio}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Experience">
          <div className="pt-grid-2">
            {P.experience.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <p className="pt-meta">
                  {e.location} · {e.facts}
                </p>
                <p className="pt-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Fee by Phase">
          {P.fees.map((f) => (
            <div className="pt-fee-row" key={f.phase}>
              <span>{f.phase}</span>
              <span>
                {f.pct} — {f.fee}
              </span>
            </div>
          ))}
          <div className="pt-fee-row pt-fee-total">
            <span>{P.feeTotal.label}</span>
            <span>{P.feeTotal.fee}</span>
          </div>
          <p className="pt-desc" style={{ marginTop: 8 }}>{P.feeTotal.note}</p>
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
