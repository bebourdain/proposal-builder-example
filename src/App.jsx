import { useCallback, useEffect, useMemo, useState } from "react";
import PaperSheets from "./PaperSheets";
import ProposalDocument from "./layouts/ProposalDocument";
import proposalLayouts from "./layouts/proposal-layouts.json";
import { experimentalDesign } from "./layouts/experimental-layouts";
import { LAYOUT_TAGS, tagsForLayout } from "./layouts/layout-tags";
import "./App.css";
import "./layout-picker.css";
import "./layouts/layouts.css";

import MonoCover from "./layouts/MonoCover";
import BlueprintTech from "./layouts/BlueprintTech";
import SwissStudio from "./layouts/SwissStudio";
import CorporateAEC from "./layouts/CorporateAEC";
import WarmInteriors from "./layouts/WarmInteriors";
import HealthcareClean from "./layouts/HealthcareClean";
import EditorialFolio from "./layouts/EditorialFolio";
import DarkPrestige from "./layouts/DarkPrestige";
import TimelinePhased from "./layouts/TimelinePhased";
import GalleryCards from "./layouts/GalleryCards";

const ORIGINAL_LAYOUTS = [
  {
    id: "mono-cover",
    name: "1. Mono Statement",
    tagline: "Bold black typography, hairline rules, numbered sections",
    why: "Strictly monochrome with giant uppercase display type and numbered sections — the typography carries the whole proposal. Reads confident and modern for design-forward selection committees.",
    tags: [],
    component: MonoCover,
  },
  {
    id: "blueprint",
    name: "2. Blueprint",
    tagline: "Deep blue drawing-sheet aesthetic with a title block",
    why: "Styled like a construction drawing set: grid background, bordered frame, monospace type, and a real title block on the cover. Speaks the client's facilities language.",
    tags: ["Colorful", "Dark Covers", "Technical"],
    component: BlueprintTech,
  },
  {
    id: "swiss",
    name: "3. Swiss Studio",
    tagline: "Grid discipline, one red accent, generous whitespace",
    why: "International Typographic Style — one typeface, a strict label column, and a single red accent. Signals precision and design maturity.",
    tags: ["Editorial"],
    component: SwissStudio,
  },
  {
    id: "corporate",
    name: "4. Corporate AEC",
    tagline: "Navy-and-gold letterhead formality, letter first",
    why: "The traditional A/E proposal: a formal letter of interest up front, serif body, navy band and gold rules. Safe and polished for conservative hospital boards.",
    tags: ["Editorial"],
    component: CorporateAEC,
  },
  {
    id: "warm",
    name: "5. Warm Interiors",
    tagline: "Terracotta and cream, human and hospitality-minded",
    why: "Leads with warmth — terracotta cover, cream paper, soft cards, and section titles written in plain human language. Puts the interior design story forward.",
    tags: ["Colorful"],
    component: WarmInteriors,
  },
  {
    id: "healthcare",
    name: "6. Healthcare Clean",
    tagline: "Clinical teal with outcome stats up front",
    why: "Calm teal gradient cover with the project's key numbers front and center, then soft rounded cards. Mirrors contemporary health-system branding.",
    tags: ["Colorful"],
    component: HealthcareClean,
  },
  {
    id: "editorial",
    name: "7. Editorial Folio",
    tagline: "A proposal told like a magazine feature",
    why: "Thick border, double rules, drop cap, and two-column article text — the proposal as a publication. Memorable in a stack of look-alike submittals.",
    tags: ["Editorial"],
    component: EditorialFolio,
  },
  {
    id: "dark",
    name: "8. Dark Prestige",
    tagline: "Charcoal and gold for a signature-project pitch",
    why: "Near-black pages with thin gold hairlines and letterspaced serif capitals. Positions the tower as a flagship commission, not a commodity job.",
    tags: ["Dark Covers"],
    component: DarkPrestige,
  },
  {
    id: "timeline",
    name: "9. Timeline Phased",
    tagline: "Schedule-led — five phases drive the whole document",
    why: "The five-phase plan appears on the cover and structures the body. Best for clients whose first question is 'how do we get to move-in on time?'",
    tags: ["Schedule First"],
    component: TimelinePhased,
  },
  {
    id: "cards",
    name: "10. Gallery Cards",
    tagline: "Modern rounded cards on a soft gray canvas",
    why: "Every section is a clean white card — app-like, scannable, friendly. Suits a younger review committee and reads beautifully on screens.",
    tags: [],
    component: GalleryCards,
  },
];

const LAYOUTS = [
  ...ORIGINAL_LAYOUTS.map(layout => ({ ...layout, category: "Original proposals" })),
  ...proposalLayouts.map(layout => {
    const experiment = experimentalDesign(layout.id);
    const prepared = { ...layout, experiment, tagline: experiment?.description || layout.tagline };
    return { ...prepared, tags: tagsForLayout(prepared) };
  }),
];
const CATEGORIES = [...new Set(LAYOUTS.map(layout => layout.category))];
const CATEGORY_COUNTS = Object.fromEntries(CATEGORIES.map(category => [
  category, LAYOUTS.filter(layout => layout.category === category).length,
]));

function resolveLayout(id) {
  // Bookmarks created during the initial import still open the same proposal.
  if (id === "career-current-site") return "layout-000";
  const legacy = id?.match(/^career-(rebuild|design)-(\d+)$/);
  if (!legacy) return id;
  const number = Number(legacy[2]) + (legacy[1] === "design" ? 371 : 0);
  return `layout-${String(number).padStart(3, "0")}`;
}

const initialLayout = () => {
  const id = resolveLayout(new URLSearchParams(window.location.search).get("layout"));
  return LAYOUTS.some(layout => layout.id === id) ? id : "mono-cover";
};

export default function App() {
  const [activeId, setActiveId] = useState(initialLayout);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [pageCounts, setPageCounts] = useState({});
  const [zoom, setZoom] = useState(1);

  const adjustZoom = (direction) =>
    setZoom((z) => Math.min(2, Math.max(0.4, Math.round((z + 0.1 * direction) * 10) / 10)));

  const recordPageCount = (layoutId, count) => {
    setPageCounts((current) =>
      current[layoutId] === count ? current : { ...current, [layoutId]: count },
    );
  };

  const active = LAYOUTS.find(layout => layout.id === activeId);
  const Active = active.component;
  const query = search.trim().toLowerCase();
  const collectionLayouts = useMemo(() => LAYOUTS.filter(layout =>
    (!category || layout.category === category) &&
    (!query || `${layout.name} ${layout.tagline} ${layout.category} ${layout.tags.join(" ")}`.toLowerCase().includes(query)),
  ), [category, query]);
  const visibleLayouts = useMemo(() => tag
    ? collectionLayouts.filter(layout => layout.tags.includes(tag))
    : collectionLayouts, [collectionLayouts, tag]);

  const chooseLayout = useCallback((id) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    if (id === "mono-cover") url.searchParams.delete("layout");
    else url.searchParams.set("layout", id);
    if (url.hash.startsWith("#proposal-")) url.hash = "";
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const chooseTag = (nextTag) => {
    setTag(nextTag);
    if (!nextTag) return;
    const matches = collectionLayouts.filter(layout => layout.tags.includes(nextTag));
    if (matches.length && !matches.some(layout => layout.id === activeId)) {
      chooseLayout(matches[0].id);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const original = url.searchParams.get("layout");
    const resolved = resolveLayout(original);
    if (original && original !== resolved && LAYOUTS.some(layout => layout.id === resolved)) {
      url.searchParams.set("layout", resolved);
      window.history.replaceState(window.history.state, "", url);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (event.target.closest?.("input, select, textarea, [contenteditable]")) return;
      if (!visibleLayouts.length) return;
      const index = visibleLayouts.findIndex(layout => layout.id === activeId);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const next = index < 0
        ? (direction > 0 ? 0 : visibleLayouts.length - 1)
        : (index + direction + visibleLayouts.length) % visibleLayouts.length;
      event.preventDefault();
      chooseLayout(visibleLayouts[next].id);
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [activeId, visibleLayouts, chooseLayout]);

  useEffect(() => {
    const selected = document.querySelector(".nav-item.active");
    if (!selected) return;
    const list = selected.closest("nav");
    const item = selected.getBoundingClientRect();
    const viewport = list.getBoundingClientRect();
    if (item.top < viewport.top) list.scrollTop += item.top - viewport.top;
    if (item.bottom > viewport.bottom) list.scrollTop += item.bottom - viewport.bottom;
  }, [activeId, visibleLayouts]);
  return (
    <div className="app">
      <aside className="nav">
        <h1 className="nav-title">Proposal Builder Example</h1>
        <div className="layout-filters">
          <label>
            Collection
            <select value={category} onChange={event => setCategory(event.target.value)}>
              <option value="">All collections ({LAYOUTS.length})</option>
              {CATEGORIES.map(name => <option key={name} value={name}>{name} ({CATEGORY_COUNTS[name]})</option>)}
            </select>
          </label>
          <label>
            Tags
            <select value={tag} onChange={event => chooseTag(event.target.value)}>
              <option value="">All tags</option>
              {LAYOUT_TAGS.map(({ name }) => (
                <option key={name} value={name}>
                  {name} ({collectionLayouts.filter(layout => layout.tags.includes(name)).length})
                </option>
              ))}
            </select>
          </label>
          <label>
            Find a layout
            <input
              type="search"
              placeholder="Search by name or style"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </label>
          <p className="layout-filter-status" aria-live="polite">
            {visibleLayouts.length} {visibleLayouts.length === 1 ? "layout" : "layouts"} · Use ↑ ↓ to preview
          </p>
        </div>
        <nav aria-label="Proposal layouts">
          {CATEGORIES.map(name => {
            const layouts = visibleLayouts.filter(layout => layout.category === name);
            if (!layouts.length) return null;
            return (
              <section key={name} aria-label={name}>
                <h2 className="layout-group-title">{name}</h2>
                {layouts.map(layout => {
                  const count = layout.order ? layout.order.length + 1 : pageCounts[layout.id];
                  return (
                    <button
                      type="button"
                      key={layout.id}
                      className={`nav-item ${layout.id === activeId ? "active" : ""}`}
                      data-layout-id={layout.id}
                      aria-current={layout.id === activeId ? "true" : undefined}
                      onClick={() => chooseLayout(layout.id)}
                    >
                      <span className="nav-name-row">
                        <span className="nav-name">{layout.name}</span>
                        <span className="nav-page-pill">{count ? `${count} ${count === 1 ? "page" : "pages"}` : "…"}</span>
                      </span>
                      <span className="nav-tag-row">
                        {layout.id === "mono-cover" && <span className="nav-default-pill">Default</span>}
                        <span className="nav-tag">{layout.tagline}</span>
                      </span>
                    </button>
                  );
                })}
              </section>
            );
          })}
          {!visibleLayouts.length && <p className="layout-filter-status">No layouts match this search.</p>}
        </nav>
      </aside>

      <main className="stage">
        <div className="stage-info">
          <h2>{active.name}</h2>
          <p>{active.why || active.tagline}</p>
          <button className="print-btn" onClick={() => window.print()}>
            🖨 Print / Save as PDF (US Letter Landscape)
          </button>
        </div>
        <div className="public-download-bar">
          <div className="zoom-controls">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => adjustZoom(-1)}
            >
              −
            </button>
            <button
              type="button"
              className="zoom-readout"
              title="Reset zoom"
              onClick={() => setZoom(1)}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => adjustZoom(1)}
            >
              +
            </button>
          </div>
          <button type="button" onClick={() => window.print()}>
            Download / Save as PDF
          </button>
        </div>
        <div className="stage-paper" style={{ "--sheet-zoom": zoom }}>
          {Active ? (
            <PaperSheets dep={activeId}><Active /></PaperSheets>
          ) : <ProposalDocument layout={active} />}
        </div>
        <div className="page-count-probes" aria-hidden="true">
          {ORIGINAL_LAYOUTS.map((layout) => {
            const Probe = layout.component;
            return (
              <div key={layout.id}>
                <PaperSheets
                  dep={layout.id}
                  onPageCountChange={(count) =>
                    recordPageCount(layout.id, count)
                  }
                >
                  <Probe />
                </PaperSheets>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
