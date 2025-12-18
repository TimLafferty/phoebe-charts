# Phoebe Charts API (Azure Functions)

HTTP API for rendering Phoebe charts on-demand and returning an SVG image.

## Endpoints

- `POST /api/charts/line.svg` → renders a line chart SVG
- `POST /api/charts/heatmap.svg` → renders a heatmap SVG
- `POST /api/charts/kpi-goal-tracker.svg` → renders a KPI goal tracker SVG
- `GET /api/healthz` → health check

All endpoints return `image/svg+xml` (except `healthz` which returns JSON).

## Local Development

Prereqs:
- Node.js 20+
- Azure Functions Core Tools v4 (`func`)

```bash
cd phoebe-charts-api

# one-time
npm install

# create local settings (not committed)
Copy-Item local.settings.json.template local.settings.json

# run locally
npm start
```

## Requests

Notes:
- `line.svg` and `heatmap.svg` accept Angular-style `options.dimensions` (ChartDimensions). If you also send `options.width`/`height`/`margins`, those override `dimensions`.
- `kpi-goal-tracker.svg` accepts the full set of Angular inputs under `data`, but the renderer currently draws only the SVG progress bar; text fields are included in SVG accessibility metadata (`<title>`/`<desc>`).

### Line chart

`POST /api/charts/line.svg`

```json
{
  "data": [{ "x": 0, "y": 30 }, { "x": 1, "y": 45 }],
  "options": {
    "dimensions": {
      "width": 800,
      "height": 400,
      "margins": { "top": 20, "right": 30, "bottom": 40, "left": 50 }
    },
    "xAxisLabel": "X",
    "yAxisLabel": "Y",
    "showGrid": true,
    "animate": true,
    "lineColor": "#3b82f6",
    "strokeWidth": 2
  }
}
```

### Heatmap

`POST /api/charts/heatmap.svg`

```json
{
  "data": {
    "rows": ["A", "B"],
    "columns": ["X", "Y"],
    "cells": [
      { "row": "A", "column": "X", "value": 0.2 },
      { "row": "A", "column": "Y", "value": 0.8 }
    ]
  },
  "options": {
    "dimensions": { "width": 800, "height": 600 },
    "padding": { "top": 20, "right": 20, "bottom": 25, "left": 40 },
    "cellPadding": 0.025
  }
}
```

### KPI goal tracker

`POST /api/charts/kpi-goal-tracker.svg`

```json
{
  "data": {
    "title": "Goal Tracker",
    "currentValue": 62,
    "goalValue": 100,
    "paceValue": 110,
    "paceLabel": "Pace",
    "unit": "%"
  },
  "options": { "width": 600, "theme": "light", "color": "#1a5f9c" }
}
```
