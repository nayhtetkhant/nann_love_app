# Us 💞 — a little app for Nann

A small [Next.js](https://nextjs.org) app that holds the things that matter:
our anniversary, her birthday, our notes, her wishes and her photos.

## What's inside

| Section | What it does |
| --- | --- |
| **Anniversary** | Live counter from **3 February 2025** — years, months, days, hours, minutes, seconds, plus total days and hours together. |
| **Birthday** | Her birthday (**20 June 2009**) with a live countdown to the next one and the age she'll turn. |
| **Notes** | A timeline of memories, read from `data/notes.json`. |
| **Wishes** | Things we want to do together, read from `data/wishes.json`. Tap a wish to mark it done (kept in the browser only). |
| **Photos** | Her photos in a gallery with a lightbox. |

## Run it

```bash
npm install     # only needed the first time
npm run dev     # http://localhost:3000
```

Other commands: `npm run build`, `npm start`, `npm run lint`.

## Editing your content

Everything lives in three places, no database needed.

### 1. `lib/data.ts` — the two important dates and the photo list

```ts
export const ANNIVERSARY = new Date(2025, 1, 3); // 3 Feb 2025 (month is 0-indexed: 0 = January)
export const BIRTHDAY = new Date(2009, 5, 20);   // 20 June 2009 (5 = June)
```

Also `PHOTOS` — the gallery order and the caption under each photo.

### 2. `data/notes.json` — your memories

```json
[
  {
    "id": 1,
    "date": "2025-02-03",
    "title": "The day we started 💕",
    "body": "Our anniversary day. I still remember how nervous I was."
  }
]
```

`date` must be `YYYY-MM-DD`. Notes show newest first.

### 3. `data/wishes.json` — things you want to do together

```json
[
  {
    "id": 1,
    "title": "Watch the sunrise together",
    "category": "Adventure",
    "done": false
  }
]
```

`done` is the starting state — tapping a wish in the app toggles it for that visit only.

## Adding photos

Drop the image into `public/photos/`, then add it to `PHOTOS` in `lib/data.ts`.
Square-ish photos look best, since the gallery crops to a square.

## Deploying

`npm run build` then push to GitHub and import on [vercel.com](https://vercel.com/new)
— it needs no configuration or environment variables.
# nann_love_app
