# Airbnb-clone submission — Playpower Labs take-home

## What's here
- `airbnb-clone-backend/` — Spring Boot API (see its own README to run)
- `airbnb-clone-frontend/` — Angular 17 app (see its own README to run)
- `architecture-diagram.svg` + `architecture-notes.md` — production-scale
  scaling strategy (frontend, backend, storage, search, deployment)
- `.claude/agents/*.md` + `CLAUDE.md` — sub-agent configs used for this build
- `prompt-log.md` — the actual sequence of prompts used

## Run order
```bash
# 1. backend
cd airbnb-clone-backend && mvn spring-boot:run

# 2. frontend (separate terminal)
cd airbnb-clone-frontend && npm install && npm start
```
Then open `http://localhost:4200`.

## Important disclosure
The reference (`airbnb-clone-umber-two.vercel.app`) could not be fetched or
browsed directly — its `robots.txt` blocks automated access, and this
environment had no live browser/screenshot tool. This clone was built from
the assignment PDF's screenshots plus general knowledge of Airbnb's real
production listing-page design (per user instruction, given the fetch was
blocked), not a pixel-diffed match against the live reference. See
`prompt-log.md` for the full context and each project's README for
component-level notes on where fidelity is approximate.
