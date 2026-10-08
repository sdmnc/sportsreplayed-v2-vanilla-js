# SportsReplayed — v2 (vanilla JS)

The second version of [SportsReplayed](https://sportsreplayed.com), a "Letterboxd for sports" where fans track, rate and review matches they've watched.

A multi-page frontend built with **HTML, CSS and vanilla JavaScript**, talking to a Node.js REST API.

## Features

- Registration, login, email verification and password reset (JWT auth stored in `localStorage`)
- Browse matches by sport, search events, view event pages
- Submit star ratings and reviews
- User profiles, member list and custom lists
- Match data from the [TheSportsDB](https://www.thesportsdb.com) public API
- Shared header/footer loaded as HTML partials
- SEO basics: `sitemap.xml`, `robots.txt`, schema.org markup

## Structure

```
js/config.js     API base URL per environment (localhost vs production)
js/auth.js       token persistence and header UI
js/partials.js   loads partials/header.html and partials/footer.html
css/style.css    shared styles
*.html           pages
```

## Run locally

```bash
npx serve .
```

On `localhost` the frontend points at the production API (see `js/config.js`). Change `API_BASE_URL` there to use your own backend. Analytics IDs are replaced with the placeholder `G-XXXXXXXXXX`.

## Project evolution

1. [v1 — static HTML](https://github.com/sdmnc/sportsreplayed-v1-html)
2. **v2 — vanilla JS** (this repo)
3. [v3 — React](https://github.com/sdmnc/sportsreplayed-v3-react)

The current production site runs on Next.js.
