# Deploying to Render

This app is two separate services. Deploy them as two separate Render
services too — don't try to run one process that does both.

## 1. Backend — deploy as a Render **Web Service**

- **Environment**: Java (Render auto-detects Maven via `pom.xml`)
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/airbnb-clone-backend-1.0.0.jar`
- **Environment variables**: none required. Render sets `$PORT` automatically,
  and `application.properties` already reads it
  (`server.port=${PORT:8080}`) — no code change needed.

Once deployed, Render gives you a URL like:
```
https://airbnb-clone-backend.onrender.com
```
Copy this — you need it for the frontend config below.

**Set CORS before the frontend can call it.** In the Render dashboard for
this service, add an environment variable:
```
APP_CORS_ALLOWED_ORIGINS = https://your-frontend-url.onrender.com
```
(comma-separate multiple origins if needed, e.g. to also allow
`http://localhost:4200` while testing locally). `WebConfig.java` reads this
automatically — no redeploy of code required, just set the env var and
restart the service.

## 2. Frontend — deploy as a Render **Static Site** (not a Web Service)

This is the important part: **do not use `ng serve` in production** — it's a
development server, not built for hosting. It doesn't bind to Render's
`$PORT`/`0.0.0.0`, and it's memory-heavy enough to exceed a free instance's
512Mi limit, which is exactly what your log showed ("Out of memory", "No
open ports detected").

Instead, build the app into static HTML/CSS/JS and let Render serve those
files directly — no Node process needs to stay running at all:

- **New service type**: "Static Site" (not "Web Service")
- **Build Command**: `npm install && npm run build`
- **Publish directory**: `dist/airbnb-clone-frontend`

Before deploying, update `src/environments/environment.prod.ts` to point at
your actual backend URL from step 1:
```ts
apiUrl: 'https://airbnb-clone-backend.onrender.com/api',
```
(A placeholder is already in that file — just replace it with your real
backend URL and commit before deploying.)

### If you'd rather keep it as a Web Service
Some take-home graders expect a single "Web Service" per repo. If so, use
the `start:prod` script already added to `package.json`:
- **Build Command**: `npm install`
- **Start Command**: `npm run start:prod`

This runs `ng build --configuration production` then serves the compiled
static output with a lightweight static file server (`serve`) bound to
Render's `$PORT` — not `ng serve`. Memory footprint is far lower than the
dev server, but a real Static Site (above) is still the better fit for a
plain Angular app with no server-side rendering.

## Common pitfalls
- Deploying frontend and backend as **one** service: don't — they're
  different runtimes (Node build → static files vs. a long-running JVM).
- Forgetting to update `apiUrl` before building: the frontend will build and
  deploy fine but every API call will fail (wrong host, or CORS-blocked).
- Forgetting to set `APP_CORS_ALLOWED_ORIGINS` on the backend: you'll see
  CORS errors in the browser console even though both services are up.
