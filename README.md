# Live-Stream-Sources

Two browser-source ready La Liga scoreboards for Twitch/Streamlabs overlays, designed with transparent backgrounds for easy placement over your stream.

## Included scoreboards

- `scoreboard-style-a.html`
  - Dark/translucent style inspired by your first reference.
  - League strip + large score/time center.
  - Circular logo bubbles.
  - Built-in match control panel (can be hidden for OBS/browser source).
- `scoreboard-style-b.html`
  - Soft pill style inspired by your second reference.
  - Circular logo bubbles and large center score.

## Local preview

Run any static server from this repo, for example:

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/scoreboard-style-a.html`
- `http://localhost:4173/scoreboard-style-b.html`

## Browser source links (Netlify)

After deploying to Netlify, use links like:

- `https://your-site.netlify.app/scoreboard-style-a.html?controls=0`
- `https://your-site.netlify.app/scoreboard-style-b.html`

`controls=0` hides the control panel so only the overlay is shown in your stream.

## Style A controls

Style A includes these buttons:

- Kickoff (resets score + clock)
- 2nd Half (sets clock to `45:00`)
- Start/Pause timer
- Score Reset
- Home Goal +1 / Away Goal +1
- -1 Min / +1 Min time controls
- HT / FT phase labels

The clock supports football injury-time formatting:

- After `45:00` it displays as `45:00+MM:SS`
- After `90:00` it displays as `90:00+MM:SS`

## Customize from URL params

Both scoreboards support these query params:

- `league` (style A only)
- `home` / `away`
- `homeScore` / `awayScore`
- `time` (examples: `24:16`, `45:00+02:15`)
- `homeLogo` / `awayLogo` (full image URLs)

Example:

```text
scoreboard-style-a.html?league=LA+LIGA&home=FCB&away=SEV&homeScore=1&awayScore=0&time=63:19
```

## Team logos

Place your logo files in `assets/logos/` or pass remote URLs in params.

Default placeholders expected:

- `assets/logos/barcelona.png`
- `assets/logos/villarreal.png`
