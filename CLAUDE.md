# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WinBetix** is an internal analytics and BI platform (replacing PowerBI) for a multi-brand, multi-region iGaming operation. It consists of:
- **Static HTML frontend templates** — 6 report pages + documentation hub, all viewable directly in browser with no build step
- **Planned REST API backend** — fully specified but not yet implemented

## Running the App

No build system. Open any HTML file directly in a browser:

```bash
open datajarvis/index.html
```

Internet connection required for Google Fonts (Syne + DM Mono), loaded via `@import` in `assets/styles.css`.

## Shared Assets

All 6 report pages share two files in `datajarvis/assets/`:

- **`styles.css`** — single source of truth for all CSS: design tokens (`:root`), reset, body, sidebar/nav, topbar, badges, buttons, filter chips, scrollbars. Link with `<link rel="stylesheet" href="../assets/styles.css">`. Page-specific `<style>` tags come *after* this link and override as needed.
- **`nav.js`** — injects the `<aside class="sidebar">` at runtime. Edit this file to change navigation across all reports at once. Add `<script src="../assets/nav.js"></script>` before `</body>`.
- **`logo.png`** — WinBetix logo. Report pages reference it as `../assets/logo.png`; `index.html` as `assets/logo.png`.

## Architecture

### Current State
The repo contains frontend HTML/CSS templates and comprehensive technical specifications. The backend (REST API + PostgreSQL + ETL pipeline) is defined in `datajarvis/docs/architecture.html` but not yet implemented.

### Data Pipeline (planned)
```
Ops DB → ETL/ELT → Analytical Store → WinBetix API → Frontend UI
```

### Critical Architectural Constraints
- **No real-time aggregations** — API returns only pre-computed results (< 3 sec SLA). All aggregations happen in background ETL jobs.
- **RLS at SQL level** — Row-Level Security enforced via `WHERE` clauses in SQL, never at the API layer.
- **Cursor-based pagination only** — offset-based pagination is prohibited (breaks with real-time data). Max 500 rows; larger datasets use async export.
- **UTC storage + per-brand timezone** — all DB timestamps in UTC; timezone applied at query time using `Brand.reporting_timezone`.
- **Idempotent ETL** — `UPSERT ON CONFLICT (source_id)`, never plain `INSERT`.
- **Soft deletes** — `deleted_at` field; no hard deletes.
- **Immutable audit trail** — write-only, 5-year retention.

### Role Hierarchy (RLS)
Super Admin → Admin → Team Lead → Manager → Analyst → View Only. Permissions cascade down; each role sees a subset of data, brands, and metrics.

### Key Data Definitions
- **FTD** — First successful settled deposit *per brand* (no recalculation on chargeback)
- **Global Player ID** — UUID spanning multiple brands
- **NULL vs 0** — `NULL` means no data; `0` is a valid zero result. UI renders NULL as `"—"`, zero as `"0"`
- **Currency** — Rate locked at transaction time. Fields: `original_amount`, `original_currency`, `eur_amount`, `eur_rate`, `rate_date`

### Caching TTLs (planned Redis)
- Today's data: 1–5 min
- Completed days: 1 h
- Cohort data (pre-computed): 24 h
- KPI strip: 5 min

## Frontend Conventions

**Dark theme only.** All colors via CSS variables in `:root` (defined in `assets/styles.css`) — never hardcode hex values.

Key variables:
```css
--bg: #0a0b0d        /* page background */
--surface: #111318   /* card/panel */
--accent: #3d7fff    /* primary blue */
--green: #22d07a     /* positive / success */
--red: #ff4d6a       /* negative / alert */
--text: #e8eaf0      /* primary text */
--muted: #5a6478     /* secondary text */
```

Typography:
- `Syne` — headings, navigation, labels
- `DM Mono` — all numerical data

Layout uses CSS Grid; no external CSS frameworks (no Tailwind, Bootstrap, etc.).

## Documentation

All specs are in `datajarvis/docs/` (written in Russian):
- `architecture.html` — full engineering brief (API contracts, DB schema, ETL, RLS, caching)
- `reports.html` — detailed specs for all 5 reports
- `design-system.html` — complete UI design system
- `vocabulary.html` — glossary v1.4

Additional documentation: https://www.notion.so/321d6e1c654b81de8b01dad3e427dd15
