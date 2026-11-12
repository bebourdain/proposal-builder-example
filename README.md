# Proposal Builder Example

A React and Vite gallery of print-ready architecture and interior design proposals. Browse layouts by collection, tag, or name; adjust the preview zoom; and print or save proposals as landscape US Letter PDFs.

The sample firm, clients, people, projects, and fees are fictional design content.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5181
```

Open [Blueprint Lab (layout-152)](http://127.0.0.1:5181/?layout=layout-152), or open the home page to browse the full gallery.

## Build

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. No API keys or environment variables are required. The layout-spacing save endpoint runs only in the development server.

## Customize

- `src/data.js`: fictional proposal content.
- `src/layouts/proposal-layouts.json`: layout definitions, including Blueprint Lab.
- `src/layouts/`: proposal components and styles.
- `src/layout-spacing.json`: print spacing settings.

Legacy local snapshots and development history are excluded from this public source release.
