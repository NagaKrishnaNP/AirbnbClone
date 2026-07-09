# Airbnb Clone — project instructions for Claude Code

This repo has two projects:
- `airbnb-clone-frontend/` — Angular 17, standalone components, hand-written SCSS
- `airbnb-clone-backend/` — Spring Boot 3, Java 17, in-memory data source

## Conventions
- Frontend: standalone components only (no NgModules), signals for local/shared
  state, no Angular Material or Tailwind — styling is hand-written SCSS against
  the design tokens in `src/styles.scss`.
- Backend: plain Spring MVC + Jackson DTOs (no Lombok), constructor injection,
  `RestControllerAdvice` for error handling — keep it simple, no database for
  this take-home (see `submission/architecture-notes.md` for how this would
  scale to a real database + search index).
- Every new component ships with its `.ts` / `.html` / `.scss` as three files,
  never inline templates/styles, so diffs stay reviewable.
- Match the reference listing page's real Airbnb interaction patterns (hover
  zoom on gallery photos, sticky booking card, keyboard-navigable overlays)
  rather than inventing new patterns.

## Sub-agents
Use these instead of doing the work in the main thread:

| Agent | When to use it |
|---|---|
| `frontend-builder` | Building or modifying any Angular component, service, or SCSS |
| `backend-builder` | Building or modifying any Spring Boot controller, service, or model |
| `accessibility-reviewer` | After any overlay/interactive component is built or changed (Photo Tour, Lightbox, focus/keyboard behavior) |
| `code-reviewer` | Before considering any feature "done" — checks structure, naming, and consistency against this file |

## How this project was actually built
See `submission/prompt-log.md` for the real sequence of prompts used across
this session, and the diffs each sub-agent would own.
