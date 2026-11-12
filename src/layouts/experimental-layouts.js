// Each variant keeps the organizing idea of its corresponding design study.
// The shared proposal data is rendered in those visual systems on screen and paper.
const designStudies = {
  131: ["press", "Poster"],
  132: ["wall", "Archive"],
  133: ["orbit", "Orbit"],
  134: ["ribbon", "Rooms"],
  135: ["glass", "Console"],
  136: ["glass", "Folio"],
  149: ["electric", "Playground"],
  150: ["tape", "Cassette"],
  151: ["wall", "Pinboard"],
  152: ["blueprint", "Layers"],
  153: ["glass", "Flow"],
  154: ["glass", "Aurora"],
  155: ["editorial", "Vellum"],
  156: ["arcade", "Neon"],
  157: ["gallery", "Arch"],
  158: ["dashboard", "Control"],
  159: ["ribbon", "Ribbon"],
  160: ["wall", "Collage"],
  161: ["index", "Strict"],
  162: ["glass", "Panels"],
  163: ["editorial", "Monogram"],
  164: ["specimen", "Field"],
  165: ["press", "Event"],
  166: ["index", "Case"],
  167: ["press", "Useful"],
  168: ["ribbon", "Verbs"],
  169: ["dashboard", "Waveform"],
  170: ["orbit", "Shape"],
  171: ["gallery", "Portal"],
  172: ["arcade", "Pixel"],
  173: ["dashboard", "Numbers"],
  174: ["orbit", "Connections"],
  175: ["glass", "Soft"],
  176: ["gallery", "Frame"],
  177: ["ribbon", "Spectrum"],
  178: ["dashboard", "Platform"],
  179: ["editorial", "Swiss"],
  180: ["press", "Brutalist"],
  181: ["specimen", "Botanical"],
  182: ["gallery", "Contact"],
  183: ["blueprint", "Drawing"],
  184: ["arcade", "Terminal"],
  185: ["gallery", "Lookbook"],
  186: ["ticket", "Ticket"],
  187: ["orbit", "Map"],
  188: ["specimen", "Clay"],
  189: ["index", "Ledger"],
  190: ["tape", "Radio"],
  191: ["gallery", "Museum"],
  192: ["index", "Redacted"],
  193: ["electric", "Hyperpop"],
  194: ["editorial", "Sentence"],
  195: ["ribbon", "Metro"],
  196: ["tape", "Record"],
  197: ["press", "Letterpress"],
  198: ["index", "Catalogue"],
  199: ["glass", "Windows"],
  200: ["comic", "Panels"],
  201: ["blueprint", "Spec"],
  202: ["wall", "Notes"],
  203: ["orbit", "Optical"],
};

// The most characteristic section arrangements take precedence. Other
// sections retain the individual layout's grid and reading order.
const motifModes = {
  electric: { overview: "memo", projects: "feature", fees: "chart" },
  tape: { projects: "index", schedule: "track" },
  wall: { overview: "columns", projects: "gallery" },
  blueprint: { schedule: "gantt" },
  arcade: { schedule: "gantt" },
  comic: { projects: "feature", team: "gallery", schedule: "calendar", fees: "left" },
  press: { fees: "left" },
  orbit: { fees: "chart" },
  glass: { overview: "columns" },
  dashboard: { schedule: "gantt" },
  gallery: { overview: "memo", projects: "gallery" },
  ribbon: { schedule: "track" },
  ticket: { schedule: "milestones" },
  index: { team: "index" },
};

const treatmentModes = {
  Radio: { projects: "rows" },
  Arch: { projects: "band" },
  Lookbook: { projects: "feature" },
};

const descriptions = {
  electric: "Electric collage · Color-changing section previews",
  tape: "Analog deck · Track list and section playback controls",
  wall: "Studio pinboard · Draggable project facts",
  blueprint: "Drawing set · Elevation, scope layers, and Gantt schedule",
  arcade: "Terminal display · Step through the proposal",
  comic: "Comic panels · Turn through the proposal",
  press: "Oversized display type · Bold print layouts",
  orbit: "Orbit graphics · Section readouts and radial details",
  glass: "Layered panels · Section readouts and modular pages",
  editorial: "Publication cover · Editorial grids and long-form pages",
  dashboard: "Project dashboard · Technical readouts and fee charts",
  gallery: "Framed imagery · Project and team galleries",
  specimen: "Field guide · Specimen cards and fee matrix",
  ribbon: "Color bands · Section previews and schedule tracks",
  ticket: "Ticket-stub cover · Perforated tables and milestones",
  index: "Indexed sections · Numbered records and ledgers",
};

export function experimentalDesign(id) {
  if (!id.startsWith("layout-")) return undefined;
  const study = designStudies[Number(id.slice(7))];
  if (!study) return undefined;
  const [motif, treatment] = study;
  return {
    motif,
    treatment,
    description: descriptions[motif],
    modes: { ...motifModes[motif], ...treatmentModes[treatment] },
  };
}
