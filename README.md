# Feather Sprint

A 3D endless runner set in a sunny garden. You play a robin. A cat is chasing you.
Flap over the flower pots, tuck under the bird feeders, and go around the stone walls
and scarecrows. Touch anything and the cat has you.

Built with [Three.js](https://threejs.org). No build step, no dependencies to install —
it's one HTML file plus a few small assets.

## Playing it

Open `index.html` in a browser, or visit the published address once it's live.

| Control | Keyboard | Touch |
| --- | --- | --- |
| Change lane | `←` `→` | swipe sideways |
| Flap (press twice to double flap) | `↑` or `Space` | swipe up, or tap |
| Tuck under | `↓` | swipe down |
| Sound and music on/off | — | the ♪ button |

Feathers are worth 10 points. The golden berry pulls every feather to you for 8 seconds.

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | The whole game — markup, styles and code |
| `manifest.webmanifest` | Makes it installable: name, icon, colours, portrait |
| `sw.js` | Service worker, so it works with no internet after the first visit |
| `icon-192.png`, `icon-512.png` | Home screen and Android icons |
| `apple-touch-icon.png` | iPhone home screen icon |

## Putting it online with GitHub Pages

Pages serves over HTTPS, which the offline worker requires. On a free account the
repository has to be **public** for Pages to work.

1. Create an empty repository at <https://github.com/new>, named `feather-sprint`.
   Do not add a README, licence or `.gitignore` — this folder already has what it needs.
2. Back here, connect it and push. Replace `YOUR-USERNAME`:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/feather-sprint.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**. Under *Build and deployment*,
   set **Source** to `Deploy from a branch`, pick branch `main` and folder `/ (root)`,
   then **Save**.
4. Wait a minute or two. The address will be:

   ```
   https://YOUR-USERNAME.github.io/feather-sprint/
   ```

## Installing it on a phone

Open that address on the phone, then:

- **iPhone (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** menu → *Install app* / *Add to Home screen*

It gets a real icon, opens fullscreen with no browser bar, and works offline.
When it's launched from the home screen the page furniture hides itself and the
game fills the screen.

## Changing it later

Edit `index.html`, then:

```bash
git add -A
git commit -m "describe what changed"
git push
```

Pages redeploys on its own within a minute or so.

One gotcha: the service worker caches everything, so a phone that already has the
game installed may keep showing the old version. Bump the `CACHE` name near the top
of `sw.js` (`feather-sprint-v1` → `feather-sprint-v2`) whenever you change the game, and the
next visit will pull the new files.
