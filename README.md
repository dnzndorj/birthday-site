# Certified Original

A five-page birthday site. Plain HTML, CSS and JS, so there is no build step.

## What to edit

- `js/config.js`: her name, your name, her birthday (for the countdown), an optional secret question for the gift page, and the photo list.
- Counter: set `together` (for example `"2024-02-14"`) and the home page shows a live "Together for" clock.
- Music: put an audio file in `audio/`, then set `music.src` (for example `"audio/song.mp3"`), the title and the artist. A small player appears on every page. Or set `spotifyTrack` to show a Spotify card on the Gift page.
- `images/`: drop your photos here, then put each file name in `js/config.js`.
- `memories.html`: the timeline entries (dates, titles, text).
- `report.html`, `care.html`: the jokes. Change any line.
- `gift.html`: the letter.

## Run it locally

```
npx serve .
```

Then open the address it prints. Any simple local server works, and you can also open `index.html` directly.

## Deploy to Vercel

Option A, from GitHub:
1. Create a new GitHub repo and push this folder to it.
2. Go to vercel.com, sign in, choose Add New > Project and import the repo.
3. Leave every build setting at its default. There is no framework and no build command. Click Deploy.

Option B, from the terminal:
```
npm i -g vercel
vercel
vercel --prod
```

Vercel will show the pages without the `.html` ending (for example `/report`), and the old `.html` links still work. Vercel gives you a `.vercel.app` link. You can change the project name in its settings to something sweeter, or add a custom domain.

## Before you send it

- Open every page on your phone.
- Check the site in both light and dark mode.
- If you set a secret question, remember it only hides the gift button for fun. It is not real security.
