# Prompt log — AI-assisted development sequence

This documents the actual sequence of prompts used with Claude to build this
submission (Playpower Labs Airbnb-Clone take-home).

## 1. Initial brief
> "I have attached a pdf which contains an assignment and they have told
> that we need to use AI to do it. So help me clone that in the same way
> using angular in the frontend and Java in the backend"
— Uploaded the assignment PDF. Claude read it, then attempted to fetch the
reference URL (`airbnb-clone-umber-two.vercel.app`) directly — blocked by
the site's `robots.txt`, and no live browser/screenshot tool was available.

## 2. Scoping clarification
Claude asked three clarifying questions before writing any code (rather than
guessing and potentially building in the wrong direction):
1. How to source the reference site's exact visuals/behavior, given the
   fetch was blocked → answer: use the PDF's screenshots + general knowledge
   of Airbnb's real listing-page design, approximate rather than pixel-exact.
2. Styling approach → answer: plain hand-written SCSS, no framework.
3. Backend-first or frontend-first → answer: backend first.

## 3. Backend build
> "Sure. Begin with the next process"
Claude built the Spring Boot backend end-to-end: `Listing`/`Photo`/`Host`/
`Review` models, `ListingService` (loads seed JSON at startup, no database),
`ListingController` REST endpoints, CORS config, global exception handling,
seed data matching the PDF's "Mirashya UG10" listing and its 9 named rooms
(Living room 1/2, Full kitchen, Bedroom, Full bathroom, Pool, Jacuzzi, Yard,
Additional photos), MockMvc tests, and a README. Zipped and delivered.

## 4. Frontend build
> "yes" (continuing from "Ready to move to the Angular frontend now...")
Claude built the Angular 17 frontend: standalone components, signal-based
`GalleryStateService` shared between the Photo Tour and Lightbox overlays,
`ListingService` (HttpClient), the three required views (Listing Page, Photo
Tour, Lightbox), an inline SVG icon set, and hand-written SCSS design tokens
mirroring Airbnb's real palette/spacing/motion. Zipped and delivered with a
README documenting the caveat about not being able to browse the live
reference directly.

## 5. Architecture, sub-agent configs, and this log
> "yes" (continuing from "Want me to keep going with those now?")
Claude produced:
- `architecture-diagram.svg` + `architecture-notes.md` — production-scale
  scaling strategy across frontend, backend, storage, search, and
  deployment for a real vacation-rental marketplace (vs. this take-home's
  intentionally simple single-listing, no-database scope).
- `.claude/agents/*.md` — four sub-agent configs (`frontend-builder`,
  `backend-builder`, `accessibility-reviewer`, `code-reviewer`) plus a root
  `CLAUDE.md` describing project conventions, modeling how this build would
  be split across specialized sub-agents in a real Claude Code workflow.
- This prompt log.

## Notable constraint disclosed throughout
Every deliverable's README/log is explicit that the reference site
(`airbnb-clone-umber-two.vercel.app`) could not be fetched or browsed live —
`robots.txt` blocked automated access and no browser/screenshot tool was
available in this environment. The clone was built from the PDF's
screenshots plus general knowledge of Airbnb's real production listing-page
design, not a pixel-diffed match against the live reference. This is called
out so it can be verified/tightened with real DevTools output if needed.
