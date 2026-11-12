function channels(hex) {
  return hex.slice(1).match(/../g).map(value => Number.parseInt(value, 16));
}

function hasStrongColor(hex, minimumSpread) {
  const values = channels(hex);
  const brightest = Math.max(...values);
  return brightest >= 72 && brightest - Math.min(...values) >= minimumSpread;
}

export const LAYOUT_TAGS = [
  {
    name: "Colorful",
    matches: ({ palette }) =>
      hasStrongColor(palette.background, 36) ||
      hasStrongColor(palette.ink, 80) ||
      hasStrongColor(palette.accent, 80),
  },
  {
    name: "Experimental Trendy",
    matches: ({ experiment }) => Boolean(experiment),
  },
  {
    name: "Dark Covers",
    matches: ({ palette }) => Math.max(...channels(palette.background)) < 75,
  },
  {
    name: "Editorial",
    matches: ({ font, name }) => font === "serif" || /\b(editorial|journal|folio)\b/i.test(name),
  },
  {
    name: "Photo-Led",
    matches: ({ artwork, experiment }) => experiment
      ? (experiment.treatment === "Poster" || ["electric", "wall", "comic", "glass", "editorial", "gallery"].includes(experiment.motif)) && experiment.treatment !== "Sentence"
      : artwork === "photo",
  },
  {
    name: "Schedule First",
    matches: ({ order }) => order[0] === "schedule",
  },
  {
    name: "Technical",
    matches: ({ artwork, category, experiment }) => experiment
      ? ["blueprint", "dashboard"].includes(experiment.motif)
      : artwork === "plan" || category.startsWith("Technical /"),
  },
];

export function tagsForLayout(layout) {
  return LAYOUT_TAGS.filter(tag => tag.matches(layout)).map(tag => tag.name);
}
