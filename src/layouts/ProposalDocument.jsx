import { proposal as P } from "../data";
import ExperimentalCover from "./ExperimentalCover";
import "./proposal-document.css";
import "./experimental-proposal.css";

const pageTitles = {
  overview: "Project overview",
  scope: "Scope of services",
  projects: "Selected projects",
  team: "Proposed team",
  schedule: "Delivery schedule",
  fees: "Professional fees",
};

const pageDescription = {
  overview: P.project.name,
  scope: P.project.subtitle,
  projects: "Relevant experience",
  team: P.firm.name,
  schedule: P.project.duration,
  fees: P.project.budget,
};

const folio = (index) => String(index).padStart(2, "0");

function Page({ layout, section, index, experimental, children }) {
  return (
    <section className={experimental ? "cp-page xp-page" : "cp-page"} data-section={section}
      id={experimental ? `proposal-${section}` : undefined} data-frame={experimental ? undefined : layout.frame}>
      <header className="cp-mast">
        <strong>{P.firm.name}</strong>
        <span>{P.project.rfp}</span>
      </header>
      <div className="cp-page-heading">
        <p className="cp-label">{pageDescription[section]}</p>
        <h2>{pageTitles[section]}</h2>
      </div>
      <div className="cp-content">{children}</div>
      <footer className="cp-footer">
        <span>{P.project.name}</span>
        <span>{folio(index + 1)} / {folio(layout.order.length + 1)}</span>
      </footer>
    </section>
  );
}

function CoverArt({ artwork }) {
  if (artwork === "photo") {
    return (
      <figure className="cp-cover-art cp-cover-photo">
        <img src={new URL("../assets/north-patient-tower.webp", import.meta.url).href} alt="Concept illustration of a hospital tower" />
        <figcaption>Concept illustration</figcaption>
      </figure>
    );
  }
  if (artwork === "plan") {
    return (
      <div className="cp-cover-art cp-cover-plan" aria-hidden="true">
        <div className="cp-tower">
          {Array.from({ length: 12 }, (_, floor) => <i key={floor} />)}
        </div>
        <div className="cp-plinth" />
      </div>
    );
  }
  return null;
}

function Cover({ layout }) {
  const { cover, order, artwork, geometry } = layout;
  return (
    <section className="cp-page cp-cover" data-section="cover" data-cover={cover} data-artwork={artwork} style={{
      "--cp-cover-inset": `${geometry.inset}px`,
      "--cp-cover-height": `${geometry.height}px`,
      "--cp-cover-split": `${geometry.split}%`,
      "--cp-title-size": `${geometry.size}px`,
      "--cp-title-weight": geometry.weight,
      "--cp-title-tracking": `${geometry.tracking}px`,
      "--cp-title-case": geometry.uppercase ? "uppercase" : "none",
    }}>
      <header className="cp-cover-mast">
        <strong>{P.firm.name}</strong>
        <span>{P.project.rfp}</span>
      </header>
      <div className="cp-cover-title">
        <p className="cp-label">{P.client.name}</p>
        <h1>{P.project.name}</h1>
        <p>{P.project.subtitle}</p>
      </div>
      <CoverArt artwork={artwork} />
      <dl className="cp-cover-facts">
        {P.stats.map(({ num, label }) => (
          <div key={label}><dt>{label}</dt><dd>{num}</dd></div>
        ))}
      </dl>
      <footer className="cp-cover-footer">
        <span>{P.project.date}</span>
        {layout.contents && <span>{order.slice(0, 3).map(section => pageTitles[section]).join(" / ")}</span>}
        <span>{P.project.budget}</span>
      </footer>
    </section>
  );
}

function Overview({ mode }) {
  return (
    <div className="cp-overview" data-mode={mode}>
      <section className="cp-brief">
        <h3>Project brief</h3>
        <p>{P.project.description}</p>
        <p>{P.executiveSummary}</p>
      </section>
      <section className="cp-letter">
        <h3>Letter of interest</h3>
        <p>{P.coverLetter}</p>
        <p><strong>{P.firm.principal}</strong><br />{P.firm.principalTitle}</p>
      </section>
      <section className="cp-rationale">
        <h3>Why Meridian</h3>
        <ul>{P.whyUs.map(reason => <li key={reason}>{reason}</li>)}</ul>
      </section>
    </div>
  );
}

function Scope({ mode }) {
  return (
    <div className="cp-scope cp-records" data-mode={mode}>
      {P.scope.map(({ title, items }) => (
        <article className="cp-record" key={title}>
          <h3>{title}</h3>
          <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

function Projects({ mode }) {
  return (
    <div className="cp-projects cp-records" data-mode={mode}>
      {P.experience.map(({ name, location, facts, desc }, index) => (
        <article className="cp-record" key={name}>
          <div className="cp-record-head">
            <p className="cp-label"><span className="cp-record-number">{folio(index + 1)} / </span>{location}</p>
            <h3>{name}</h3>
          </div>
          <ul className="cp-project-facts">
            {facts.split(" · ").map(fact => <li key={fact}>{fact}</li>)}
          </ul>
          <p className="cp-record-copy">{desc}</p>
        </article>
      ))}
    </div>
  );
}

function Team({ mode }) {
  return (
    <div className="cp-team cp-records" data-mode={mode}>
      {P.team.map(({ name, role, bio }, index) => (
        <article className="cp-record" key={name}>
          <div className="cp-record-head">
            <p className="cp-label"><span className="cp-record-number">{folio(index + 1)} / </span>{role}</p>
            <h3>{name}</h3>
          </div>
          <p className="cp-record-copy">{bio}</p>
        </article>
      ))}
    </div>
  );
}

function Schedule({ mode }) {
  const periods = P.approach.map(({ phase, duration, desc }) => {
    const [start, end] = duration.match(/\d+/g).map(Number);
    const [number, title] = phase.split(" — ");
    return { phase, number, title, duration, desc, start, end };
  });
  const months = Math.max(...periods.map(({ end }) => end));
  return (
    <ol className="cp-schedule" data-mode={mode}>
      {periods.map(({ phase, number, title, duration, desc, start, end }) => (
        <li key={phase} style={{ "--cp-start": `${(start - 1) / months * 100}%`, "--cp-length": `${(end - start + 1) / months * 100}%` }}>
          <span className="cp-phase-number" aria-hidden="true">{number}</span>
          <div className="cp-phase-head"><h3>{title}</h3><p className="cp-label">{duration}</p></div>
          <p className="cp-phase-copy">{desc}</p>
          <div className="cp-phase-track" aria-hidden="true"><i /></div>
        </li>
      ))}
    </ol>
  );
}

function Fees({ mode }) {
  return (
    <div className="cp-fees" data-mode={mode}>
      <div className="cp-fee-total">
        <p className="cp-label">{P.feeTotal.label}</p>
        <p className="cp-amount">{P.feeTotal.fee}</p>
        <p>{P.feeTotal.note}</p>
      </div>
      <table>
        <thead><tr><th scope="col">Phase</th><th scope="col">Share</th><th scope="col">Fee</th></tr></thead>
        <tbody>
          {P.fees.map(({ phase, pct, fee }) => (
            <tr key={phase} style={{ "--cp-share": pct }}>
              <th scope="row">{phase}</th>
              <td><span className="cp-fee-bar" aria-hidden="true" />{pct}</td>
              <td>{fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const content = { overview: Overview, scope: Scope, projects: Projects, team: Team, schedule: Schedule, fees: Fees };

export default function ProposalDocument({ layout }) {
  const design = layout.experiment;
  const sheets = layout.order.length + 1;
  const pages = ["cover", ...layout.order];
  return (
    <div className="sheet-zoom cp-sheets" style={{
      zoom: "var(--sheet-zoom, 1)",
      "--cp-cover-bg": layout.palette.background,
      "--cp-cover-ink": layout.palette.ink,
      "--cp-accent": layout.palette.accent,
    }} data-font={layout.font} data-experiment={design?.motif} data-treatment={design?.treatment}>
      {pages.map((section, index) => {
        const Content = content[section];
        return (
          <div className="sheet-wrap" key={section}>
            <p className="sheet-label">Page {index + 1} of {sheets} — US Letter 11″ × 8.5″ Landscape</p>
            <div className="sheet">
              {Content ? (
                <Page layout={layout} section={section} index={index} experimental={Boolean(design)}>
                  <Content mode={design?.modes[section] || layout.modes[section]} />
                </Page>
              ) : design ? <ExperimentalCover key={layout.id} layout={layout} design={design} /> : <Cover layout={layout} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
