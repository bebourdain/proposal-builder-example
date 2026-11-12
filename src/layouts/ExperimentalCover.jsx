import { useRef, useState } from "react";
import { proposal as P } from "../data";

const tower = new URL("../assets/north-patient-tower.webp", import.meta.url).href;
const labels = {
  overview: "Project overview",
  scope: "Scope of services",
  projects: "Selected projects",
  team: "Proposed team",
  schedule: "Delivery schedule",
  fees: "Professional fees",
};
const content = {
  overview: () => [P.project.name, P.project.description],
  scope: () => [P.scope[0].title, P.scope[0].items[0]],
  projects: () => [P.experience[0].name, P.experience[0].facts],
  team: () => [P.team[0].name, P.team[0].role],
  schedule: () => [P.approach[0].phase, P.approach[0].duration],
  fees: () => [P.feeTotal.fee, P.feeTotal.label],
};

function ConceptImage() {
  return <figure className="xp-photo">
    <img src={tower} alt="Concept illustration of a hospital tower" draggable={false} />
    <figcaption>Concept illustration</figcaption>
  </figure>;
}

function Fact({ stat }) {
  return <div className="xp-fact"><dt>{stat.label}</dt><dd>{stat.num}</dd></div>;
}

function Elevation() {
  return (
    <div className="xp-elevation" aria-hidden="true">
      <div className="xp-elevation-tower">{Array.from({ length: 12 }, (_, floor) => <i key={floor} />)}</div>
      <div className="xp-elevation-base" />
    </div>
  );
}

function Cassette({ treatment }) {
  return (
    <div className="xp-deck" aria-hidden="true" data-deck={treatment}>
      <div className="xp-deck-top"><b>{P.project.rfp}</b><span>{P.firm.name}</span></div>
      <div className="xp-deck-window">
        <i /><i />
      </div>
      <div className="xp-deck-bars" />
    </div>
  );
}

function StudyObject({ treatment }) {
  return <div className="xp-study-object" data-object={treatment} aria-hidden="true"><i /><i /><i /><i /><i /></div>;
}

function CoverFigure({ motif, treatment }) {
  if (["blueprint", "dashboard"].includes(motif)) return <Elevation />;
  if (motif === "tape") return <Cassette treatment={treatment} />;
  if (motif === "orbit") return <div className="xp-orbits" aria-hidden="true"><i /><i /><i /><i /></div>;
  if (motif === "arcade") return <div className="xp-pixel-tower"><Elevation /></div>;
  if (motif === "ribbon") return <div className="xp-ribbon-art" aria-hidden="true"><i /><i /><i /></div>;
  if (motif === "specimen") return <StudyObject treatment={treatment} />;
  if ((motif === "press" && treatment !== "Poster") || motif === "index") return null;
  return <ConceptImage />;
}

function Pinboard() {
  const [offsets, setOffsets] = useState({});
  const [active, setActive] = useState(null);
  const drag = useRef(null);

  const move = (event) => {
    if (drag.current?.pointer !== event.pointerId) return;
    const { index, x, y, origin } = drag.current;
    const clamp = value => Math.max(-48, Math.min(48, value));
    setOffsets(previous => ({
      ...previous,
      [index]: [clamp(origin[0] + event.clientX - x), clamp(origin[1] + event.clientY - y)],
    }));
  };

  return (
    <div className="xp-pinboard">
      <ConceptImage />
      {P.stats.map((stat, index) => {
        const offset = offsets[index] || [0, 0];
        return (
          <div className="xp-note" key={stat.label} data-note={index} data-front={active === index || undefined}
            style={{ "--note-x": `${offset[0]}px`, "--note-y": `${offset[1]}px` }}
            onPointerDown={event => {
              event.currentTarget.setPointerCapture(event.pointerId);
              drag.current = { pointer: event.pointerId, index, x: event.clientX, y: event.clientY, origin: offset };
              setActive(index);
            }}
            onPointerMove={move} onLostPointerCapture={() => { drag.current = null; }}>
            <dl><Fact stat={stat} /></dl>
          </div>
        );
      })}
      <button type="button" className="xp-wall-reset" onClick={() => { setOffsets({}); setActive(null); }}>Reset board</button>
    </div>
  );
}

export default function ExperimentalCover({ layout, design }) {
  const { motif, treatment } = design;
  const [cursor, setCursor] = useState(0);
  const section = layout.order[cursor];
  const [headline, summary] = content[section]();
  const step = direction => setCursor(index => (index + direction + layout.order.length) % layout.order.length);
  const sequenced = ["tape", "arcade", "comic"].includes(motif);
  const sceneColors = ["#d7fb35", "#ff825e", "#ffb9f0", "#a4e8fa", "#f9d86b", "#fff"];
  const sceneStyle = motif === "electric" && treatment === "Playground" ? { "--xp-scene": sceneColors[cursor] } : undefined;
  const readout = (
    <div className="xp-readout" aria-live="polite">
      <span>{String(cursor + 1).padStart(2, "0")} / {labels[section]}</span>
      <strong>{headline}</strong>
      <p>{summary}</p>
      <a className="xp-open" href={`#proposal-${section}`}>Open section ↗</a>
    </div>
  );

  return (
    <section className="cp-page cp-cover xp-cover" data-section="cover" data-cover={motif} style={sceneStyle}>
      <header className="xp-mast">
        <strong>{P.firm.name}</strong><span>{P.project.rfp}</span>
      </header>
      <div className="xp-title">
        <p className="cp-label">{P.client.name}</p>
        <h1>{P.project.name}</h1>
        <p>{P.project.subtitle}</p>
      </div>
      <div className="xp-cover-visual">
        {motif === "wall" ? <Pinboard /> : <CoverFigure motif={motif} treatment={treatment} />}
        {["tape", "arcade", "comic", "blueprint", "dashboard", "glass", "orbit"].includes(motif) && readout}
      </div>
      {motif !== "wall" && <dl className="xp-facts">{P.stats.map(stat => <Fact stat={stat} key={stat.label} />)}</dl>}
      <nav className="xp-chapters" aria-label="Proposal sections">
        {layout.order.map((key, index) => (
          <button type="button" key={key} aria-pressed={index === cursor} onClick={() => setCursor(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{labels[key]}
          </button>
        ))}
        {sequenced && <div className="xp-transport">
          <button type="button" aria-label="Previous section" onClick={() => step(-1)}>←</button>
          <button type="button" aria-label="Next section" onClick={() => step(1)}>→</button>
        </div>}
      </nav>
      {!["tape", "arcade", "comic", "blueprint", "dashboard", "glass", "orbit"].includes(motif) && <div className="xp-extra">{readout}</div>}
      <footer className="xp-foot"><span>{P.project.date}</span><span>{P.project.budget}</span></footer>
    </section>
  );
}
