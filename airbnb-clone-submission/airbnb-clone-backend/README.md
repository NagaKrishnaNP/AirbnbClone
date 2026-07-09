# Airbnb Clone — Backend (Spring Boot)

REST API serving listing data for the Angular frontend. In-memory data source
seeded from `src/main/resources/data/listings.json` — no database required for
this take-home task (see the architecture diagram for how this would scale to
a real database + search index in production).

## Requirements
- Java 17+
- Maven 3.9+ (or use the included wrapper if you add one)

## Run locally

```bash
cd airbnb-clone-backend
mvn spring-boot:run
```

The API starts on `http://localhost:8080`.

## Endpoints

| Method | Path                              | Description                                   |
|--------|-----------------------------------|------------------------------------------------|
| GET    | `/api/listings`                   | All listings                                    |
| GET    | `/api/listings/{id}`              | Full listing detail (photos, host, reviews...)  |
| GET    | `/api/listings/{id}/photos`       | All photos, ordered                             |
| GET    | `/api/listings/{id}/photos/hero`  | Just the 5 hero-grid photos for the listing page|
| GET    | `/api/listings/{id}/reviews`      | Reviews                                         |

Seed listing id: `mirashya-ug10`

Example:
```bash
curl http://localhost:8080/api/listings/mirashya-ug10
```

## CORS
`WebConfig` allows `http://localhost:4200` (the Angular dev server) by default.
Update the allowed origin before deploying.

## Tests
```bash
mvn test
```
