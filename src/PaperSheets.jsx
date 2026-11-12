import { useLayoutEffect, useRef, useState } from "react";

// Paginates any proposal layout onto discrete landscape US Letter sheets.
// The design scale is 75.294px/in (640px = 8.5in), so a landscape page is
// 828.24px wide x 640px tall. At print (zoom 1.275) that becomes precisely
// 1056 x 816px = 11in x 8.5in at 96dpi.
const PX_PER_IN = 640 / 8.5; // design-scale pixels per real inch
const PAGE_H = 8.5 * PX_PER_IN; // landscape: 8.5in tall
const CONT_TOP = 0.75 * PX_PER_IN; // 0.75in top margin on continuation pages
const BOTTOM_GUARD = 0.5 * PX_PER_IN; // 0.5in minimum bottom margin

// Elements treated as unbreakable blocks — a page break may never cut
// through one of these; it lands in the gap above instead.
const BLOCK_SELECTOR = [
  "p",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
  "[class*='avatar']",
  "[class*='logo']",
  "[class*='bar']",
  "[class*='rule']",
  "[class*='dot']",
  "[class*='stat']",
  "[class*='kpi']",
  "[class*='metric']",
  "[class*='chip']",
  "[class*='job-head']",
].join(", ");

export default function PaperSheets({ dep, children, onPageCountChange }) {
  const measureRef = useRef(null);
  const pageCountCallbackRef = useRef(onPageCountChange);
  pageCountCallbackRef.current = onPageCountChange;
  const [pages, setPages] = useState([{ start: 0, height: PAGE_H }]);

  useLayoutEffect(() => {
    const host = measureRef.current;
    const paper = host?.firstElementChild;
    if (!paper) return;

    const paginate = () => {
      const total = paper.scrollHeight;
      const rootTop = paper.getBoundingClientRect().top;
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - rootTop, bottom: r.bottom - rootTop };
      };
      const blocks = Array.from(paper.querySelectorAll(BLOCK_SELECTOR)).map(rect);
      // Headings and job-title lines must never be orphaned at a page
      // bottom — but only when the content they introduce lands on the
      // next page. A compact entry that is *entirely* above the cut is
      // fine, otherwise dense lists cascade the cut way up the page.
      // Section headers (h2 "Experience") keep with whatever follows them;
      // line headers (job titles, role lines) keep with body content only —
      // NOT the next entry's own title, or dense lists cascade the cut up.
      const sectionHeaders = Array.from(
        paper.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).map(rect);
      const lineHeaders = Array.from(
        paper.querySelectorAll(
          "strong, em, [class*='role'], [class*='title-line'], [class*='job-head']"
        )
      ).map(rect);
      const contentBlocks = Array.from(paper.querySelectorAll("p, li"))
        .filter((el) => !el.matches("[class*='role'], [class*='title-line']"))
        .map(rect);
      const KEEP_ZONE = 36; // px a header must clear above a cut
      const MAX_PULL = 360; // hard cap on how far a cut may move up
      const nextBelow = (h, list, win) => {
        let best = null;
        for (const b of list) {
          if (b.top >= h.bottom - 2 && b.top - h.bottom < win) {
            if (!best || b.top < best.top) best = b;
          }
        }
        return best;
      };
      const findOrphans = (cut) => {
        const orphans = [];
        for (const h of sectionHeaders) {
          if (h.bottom > cut || h.bottom <= cut - KEEP_ZONE) continue;
          const nxt = nextBelow(h, blocks, 60);
          if (nxt && nxt.bottom > cut + 1) orphans.push(h);
        }
        for (const h of lineHeaders) {
          if (h.bottom > cut || h.bottom <= cut - KEEP_ZONE) continue;
          const nxt = nextBelow(h, contentBlocks, 40);
          if (nxt && nxt.bottom > cut + 1) orphans.push(h);
        }
        return orphans;
      };

      const result = [];
      let start = 0;
      let first = true;
      while (true) {
        const capacity = first ? PAGE_H : PAGE_H - CONT_TOP - BOTTOM_GUARD;
        if (start + capacity >= total - 1) {
          result.push({ start, height: Math.min(total - start, capacity) });
          break;
        }
        // Pull the cut upward until it neither slices through a block nor
        // strands a heading whose content falls on the next page
        const rawCut = start + capacity;
        let cut = rawCut;
        for (let i = 0; i < 40; i++) {
          const straddlers = blocks.filter(
            (b) => b.top < cut - 1 && b.bottom > cut + 1
          );
          if (straddlers.length > 0) {
            // epsilon must be smaller than the gap between stacked blocks
            // (~2px), or the cut lands inside the block above and cascades
            const next = Math.min(...straddlers.map((b) => b.top)) - 1;
            if (next <= start + 80) break; // safety: never stall the loop
            cut = next;
            continue;
          }
          const orphaned = findOrphans(cut);
          if (orphaned.length > 0) {
            const next = Math.min(...orphaned.map((h) => h.top)) - 1;
            if (next <= start + 80 || rawCut - next > MAX_PULL) break;
            cut = next;
            continue;
          }
          break;
        }
        result.push({ start, height: cut - start });
        start = cut;
        first = false;
      }
      // Snap every rendered slice to whole pixels: fractional translate
      // offsets antialias 1px hairline rules into soft 2px smears.
      const nextPages = result.map((pg, i) => {
          const s = Math.round(pg.start);
          const end =
            i + 1 < result.length
              ? Math.round(result[i + 1].start)
              : Math.round(pg.start + pg.height);
          return { start: s, height: end - s };
        });
      setPages(nextPages);
      pageCountCallbackRef.current?.(nextPages.length);
    };

    paginate();

    // Re-paginate whenever the content itself changes size (data edits,
    // hot reloads, late style application) — not just on layout switch.
    const ro = new ResizeObserver(paginate);
    ro.observe(paper);
    // Fonts settling can shift line wraps by a pixel or two; re-measure
    // once they are fully loaded.
    if (document.fonts?.ready) document.fonts.ready.then(paginate);

    return () => ro.disconnect();
  }, [dep]);

  return (
    <div className="sheets">
      {/* Hidden measuring copy at full natural height. It sits outside the
          zoom wrapper so pagination math is never affected by view zoom. */}
      <div className="sheet-measure" ref={measureRef} aria-hidden="true">
        {children}
      </div>

      <div className="sheet-zoom" style={{ zoom: "var(--sheet-zoom, 1)" }}>
        {pages.map((pg, i) => (
          <div className="sheet-wrap" key={i}>
            <p className="sheet-label">
              Page {i + 1} of {pages.length} — US Letter 11″ × 8.5″ Landscape
            </p>
            <div className="sheet">
              <div
                className="sheet-window"
                style={{
                  top: i === 0 ? 0 : Math.round(CONT_TOP),
                  height: pg.height,
                }}
              >
                <div style={{ transform: `translateY(${-pg.start}px)` }}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
