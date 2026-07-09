# Architecture notes — production-scale vacation-rental marketplace

Accompanies `architecture-diagram.svg`. Covers the scaling strategy across
frontend, backend, storage, search, and deployment for a production version
of this app (well beyond the take-home's single-listing scope).

## Frontend
- Server-side rendering / static generation for listing and search pages
  (Angular Universal or a hybrid SSR setup) so listing pages are indexable
  and fast on first paint — critical for SEO-driven organic traffic.
- Every listing page and its photos served through a CDN (CloudFront/Fastly)
  with long cache TTLs; photos pre-resized into a handful of responsive
  variants at upload time rather than resized on request.
- Code-split by route so the booking flow, host dashboard, and messaging
  don't bloat the initial listing-page bundle.
- Feature flags + A/B testing at the edge (e.g. Cloudflare Workers) to ship
  experiments without redeploying.

## Backend
- Split into independently-scalable services by bounded context: **Listings**,
  **Search**, **Booking & payments**, **Messaging** — matches the diagram.
  Booking/payments is the most write-heavy and consistency-sensitive, so it
  scales and is deployed independently from the read-heavy Listings service.
- All services sit behind an API gateway that handles auth, rate limiting,
  and request routing, so individual services stay thin.
- Services are stateless and horizontally autoscaled (Kubernetes HPA) based
  on CPU/request-latency, so traffic spikes (e.g. a destination trending on
  social media) scale out automatically rather than falling over.
- Cross-service communication for anything non-blocking (booking confirmed →
  notify host → update search availability) goes through the event bus
  instead of synchronous calls, so one slow service doesn't cascade.

## Storage
- Postgres as the system of record, with read replicas for read-heavy
  traffic (browsing, listing detail) and eventual sharding by region once a
  single primary can't keep up with write volume (bookings, price changes).
- Redis in front of Postgres for hot paths: listing detail pages, session
  data, and search-result caching for common queries.
- Listing photos and other media go straight to object storage (S3) from
  the client via pre-signed URLs, not through the app servers, and are
  served through the same CDN layer as the rest of the frontend.
- Change-data-capture (e.g. Debezium reading Postgres's write-ahead log)
  keeps the search index and any analytics/data-warehouse copies in sync
  without dual-writing from the application code.

## Search
- A dedicated search index (OpenSearch/Elasticsearch) rather than querying
  Postgres directly for search — needed for geo-radius queries, free-text
  matching, and combined filters (dates, price, amenities) at low latency.
- Indexed asynchronously via CDC from Postgres, so search never blocks a
  write and can be rebuilt from source of truth if the index needs to
  change shape.
- Geo-sharded once listing volume grows past what a single cluster handles
  well, split by region so most queries only hit the shard(s) near the user.

## Deployment
- Multi-region deployment (at least active-passive, active-active for
  larger scale) with DNS-based latency routing (e.g. Route 53) so users hit
  the nearest healthy region.
- CI/CD: GitHub Actions builds and tests each service independently → image
  pushed to a registry → progressive rollout (canary or blue-green) via
  ArgoCD/Kubernetes, so a bad deploy affects a small percentage of traffic
  before it's promoted or rolled back automatically on error-rate alerts.
- Observability as a cross-cutting layer over every tier: metrics
  (Prometheus/Grafana), distributed tracing (OpenTelemetry) so a slow
  booking request can be traced across Gateway → Booking service → Postgres
  → event bus, and centralized logging (ELK) for debugging across services.
