# NyayaKosh — India's Law Reference App

> Know your rights. Know the law.

NyayaKosh is a comprehensive Indian law reference app built with Expo (React Native). It covers **50 Acts**, **446 sections**, **bail status for every criminal offence**, bookmarks, and a **live legal news feed** powered by a PostgreSQL backend.

---

## Screenshots

> *(Add your app screenshots here)*

---

## Features

- **50 Indian Acts** across 13 categories — BNS, BNSS, Constitution, POCSO, IT Act, Companies Act, and more
- **446 sections** with plain-language explanations
- **Bail status** for every criminal offence — bailable, non-bailable, cognizable, tried-by court
- **Bookmarks** — save any section offline, no account needed
- **Live legal news** — Supreme Court judgments, Parliament acts, amendments, updated in real time
- **Dark theme** — saffron (#FF9933) on deep navy (#0A0F1E)
- **Offline-first** — all law data is static; only the news feed needs internet

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | Expo SDK 54 / React Native / Expo Router v6 |
| Language | TypeScript 5.9 |
| API | Express 5 + Node.js 24 |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod v4 + drizzle-zod |
| Fonts | Inter (via expo-google-fonts) |
| Icons | @expo/vector-icons (Feather) |
| Storage | AsyncStorage (bookmarks) |
| Build | Expo EAS (cloud builds, OTA updates) |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
artifacts/
  mobile/           # Expo React Native app
    app/            # Expo Router screens
    constants/      # All 50 law data files + bail info + config
    hooks/          # useBookmarks, useColors
    assets/         # Icons, splash screen
  api-server/       # Express 5 API
    src/routes/     # /api/news endpoints

lib/
  db/               # Drizzle ORM schema + migrations
  api-spec/         # OpenAPI spec + codegen
```

---

## Running Locally

**Requirements:** Node.js 20+, pnpm 9+, PostgreSQL

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm --filter @workspace/db run push

# Start the API server (port 8080)
pnpm --filter @workspace/api-server run dev

# Start the Expo app
pnpm --filter @workspace/mobile run dev
```

Then scan the QR code with **Expo Go** on your phone.

---

## Categories Covered

| Category | Acts Included |
|---|---|
| Criminal Law | BNS 2023, BNSS 2023, BSA 2023 |
| Constitutional | Constitution of India, RTI Act, Prevention of Corruption |
| Civil | CPC, Specific Relief, Limitation Act |
| Family | Hindu Marriage, Divorce, Domestic Violence, Guardianship |
| Property | Transfer of Property, Registration, Easements |
| Labour | Factories Act, Payment of Wages, Maternity Benefit |
| Consumer | Consumer Protection Act, Legal Metrology |
| Corporate | Companies Act, SEBI Act, Insolvency Code |
| Cyber & IP | IT Act, Copyright, Patents, Trademarks |
| Tax | Income Tax Act, GST Act |
| Environment | Environment Protection, Wildlife Protection |
| Child Protection | POCSO Act, Juvenile Justice Act |
| Media | Press & Registration, Cable Television |

---

## Live News Feed

The news feed is backed by a PostgreSQL database and served via the Express API. Articles are added directly to the database — no code change or app release needed.

**Admin API** (requires `ADMIN_TOKEN` header):
```
POST /api/news     — add an article
DELETE /api/news/:id — remove an article
GET  /api/news     — list all published articles (public)
```

---

## OTA Updates

The app is configured with Expo Updates. Minor content and UI changes can be pushed to all installed copies **without going through a Play Store or App Store review**:

```bash
eas update --branch production --message "New articles added"
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ADMIN_TOKEN` | Bearer token for POST/DELETE /api/news |
| `SESSION_SECRET` | Express session secret |

---

## Publishing to App Stores

This app is configured for EAS (Expo Application Services). You need:

- **Google Play Developer Account** ($25 one-time) — play.google.com/console
- **Apple Developer Account** ($99/year) — developer.apple.com/programs

```bash
# Build for both stores (runs in Expo cloud, no Xcode needed)
eas build --platform all --profile production

# Submit to stores
eas submit --platform all --profile production
```

---

## License

MIT — feel free to fork, adapt, and build on it.

---

## Author

Built with ❤️ for India's legal community.
