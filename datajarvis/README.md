# ⚡ DataJarvis — Analytics Hub

> Internal analytics & reporting platform replacing PowerBI. Custom microservice with real-time data, role-based access control, and 5 specialized reports.

## 🗂 Project Structure

```
datajarvis/
├── index.html                    # Hub — main entry point
├── reports/
│   ├── dashboard.html            # Dashboard Overview
│   ├── daily-report.html         # Daily Performance Report (49 metrics)
│   ├── payment-report.html       # Payment Performance (AR%, TOTAL/FTD/STD)
│   ├── churn-report.html         # Churn Rate Cohort Analysis
│   ├── inout-report.html         # In/Out Transaction Report
│   └── affiliate-report.html     # Affiliate Performance (3-level drill-down)
└── docs/
    ├── index.html                # Documentation Hub
    ├── overview.html             # Project Overview & Requirements
    ├── reports.html              # Reports Specifications
    ├── architecture.html         # Engineering Brief (Part 1 + 2)
    ├── vocabulary.html           # Glossary v1.4
    ├── design-system.html        # UI Design System
    └── changelog.html            # Changelog v2.3
```

## 🚀 Quick Start

Open `index.html` in your browser — no build step, no dependencies.

All pages use Google Fonts (Syne + DM Mono). An internet connection is required for font loading.

## 📊 Reports

| # | Report | Metrics | Key Feature |
|---|--------|---------|-------------|
| 00 | Dashboard | Overview KPIs | Real-time summary |
| 01 | Daily Performance | 49 metrics | Group by Day/Week/Month |
| 02 | Payment Performance | AR%, 20 cols | TOTAL/FTD/STD split |
| 03 | Churn Rate (Cohort) | 8 cohort metrics | D0–D30 / W0–W12 / M0–M12 |
| 04 | In/Out | 19 columns | Risk flags, Hourly heatmap |
| 05 | Affiliate | 21 columns | Drill-down L1→L2→L3 |

## 🎨 Design System

- **Theme:** Dark only
- **Fonts:** Syne (headings) + DM Mono (data)
- **Colors:** `--accent: #3d7fff` · `--green: #22d07a` · `--red: #ff4d6a`
- **CSS Variables:** All colors defined in `:root`, never hardcoded

## 📐 Architecture Highlights

- REST API `/api/v1/` with cursor-based pagination
- Row-Level Security at SQL query level (not API layer)
- All timestamps UTC, per-brand reporting timezone
- Cursor-based pagination (500 rows max, then async export)
- Feature flags for gradual report rollout
- ETL idempotency via `source_id` + `UPSERT ON CONFLICT`

See [`docs/architecture.html`](docs/architecture.html) for the full engineering brief.

## 📋 Notion Workspace

Full project documentation lives at:
https://www.notion.so/321d6e1c654b81de8b01dad3e427dd15

## 🔖 Version

**v2.3** — March 2026

---

*DataJarvis Internal Analytics Platform — confidential, internal use only.*
