# NyayaKosh — India's Law Reference App

A comprehensive Indian law reference mobile app (Expo/React Native) with 50 Acts, 446 sections, bail status for every criminal offence, bookmarks, and a live legal news feed backed by a PostgreSQL database.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at /api)
- `pnpm --filter @workspace/mobile run dev` — run the Expo mobile app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo SDK / React Native, Expo Router v6
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/mobile/` — Expo React Native app
- `artifacts/mobile/constants/laws/` — All 50 law data files (13 categories)
- `artifacts/mobile/constants/bail-info.ts` — Bail status lookup for all sections
- `artifacts/mobile/hooks/useBookmarks.ts` — Bookmarks with AsyncStorage
- `artifacts/api-server/src/routes/news.ts` — Live news API (GET/POST/DELETE)
- `lib/db/src/schema/news.ts` — news_articles DB table
- `lib/api-spec/openapi.yaml` — OpenAPI source of truth

## Adding a News Article

Tell the agent: "Add a new article: [title], [summary], [category], [tag]"

The agent inserts directly into the database — no code change or app release needed.

Categories: Supreme Court, Parliament, High Court, SEBI, RBI, Ministry, Tribunal
Tags: Landmark Judgment (red), New Law (green), Amendment (amber), Court Ruling (blue), Regulatory Update (purple)

## API URL (Live Backend)

The standalone Android app connects to:
`https://law-lexicon--159srijitadeysa.replit.app/api`

This is configured in `artifacts/mobile/constants/config.ts`. On web it uses the local `/api` proxy; on Android/iOS it uses the full production URL automatically.

## App Store Publishing (iOS + Android)

### What you need BEFORE building

1. **Apple Developer Account** — $99/year
   - Sign up at https://developer.apple.com/programs/
   - Get your Apple ID email, Team ID, and App Store Connect App ID

2. **Google Play Developer Account** — $25 one-time
   - Sign up at https://play.google.com/console
   - Create a service account key (JSON) for automated submission

3. **Expo Account** — Free
   - Sign up at https://expo.dev
   - Run `npm install -g eas-cli` on your machine
   - Run `eas login`

### First-time EAS project setup (run once)

```bash
# From artifacts/mobile/ directory
eas init --id nyayakosh-app
eas credentials   # set up iOS signing certs & Android keystore
```

### Building for both stores

```bash
# From artifacts/mobile/ directory
eas build --platform all --profile production
```

This builds in Expo's cloud — no Xcode or Android Studio needed.
Takes about 10–20 minutes. You get download links for the .ipa and .aab files.

### Submitting to stores

**Option A — Automated (after configuring eas.json submit section):**
```bash
eas submit --platform all --profile production
```

**Option B — Manual:**
- iOS: Upload the `.ipa` to App Store Connect at appstoreconnect.apple.com
- Android: Upload the `.aab` to Google Play Console

### Before submitting, fill in eas.json

Replace these placeholders in `artifacts/mobile/eas.json`:
- `YOUR_APPLE_ID_EMAIL` — your Apple developer email
- `YOUR_APP_STORE_CONNECT_APP_ID` — found in App Store Connect → App Information
- `YOUR_APPLE_TEAM_ID` — found at developer.apple.com/account
- Put your Google Play service account JSON at `artifacts/mobile/google-play-key.json`

### App Store listing details needed

- **App name**: NyayaKosh
- **Subtitle** (iOS): India's Law Reference
- **Description**: Write a 170-word description for the store page
- **Keywords**: law, India, legal, IPC, BNS, bail, rights, court, acts
- **Screenshots**: Required — 6.7" iPhone and Pixel 8 sizes
- **Privacy Policy URL**: Required for both stores (create a simple page)
- **Category**: Reference (iOS) / Books & Reference (Android)

### Bundle ID / Package name

Both are set to `com.nyayakosh.app` in app.json.
If this ID is already taken, change it to something unique like `com.yourname.nyayakosh`.

## Environment Variables

- `DATABASE_URL` — Postgres connection string (auto-set by Replit)
- `ADMIN_TOKEN` — Bearer token for POST /api/news (set in Replit Secrets)
- `SESSION_SECRET` — Express session secret

## Architecture Decisions

- All law data is static TypeScript — no DB needed for sections (faster offline access)
- Bail info is a pure lookup map keyed by `${lawId}|${sectionNo}` — O(1) lookup
- News feed is the only live-fetched content (needs internet)
- Bookmarks are local-only (AsyncStorage) — no account required
- API server uses Bearer token auth for admin endpoints (no UI admin panel needed)

## User Preferences

- Dark theme only (#0A0F1E background, #FF9933 saffron primary)
- No console.log in server code — use req.log / logger
- Inter font family throughout
