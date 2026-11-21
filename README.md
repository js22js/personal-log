# Personal Log

A small personal app for a daily habit challenge (500 days by default). Each day you log your habits, the app scores the day, and it keeps your streak, a month calendar, a view of the whole challenge and a journal of your "moral of the day".

It is the sister app to Spend Log: same look, and the same rules. Everything is stored on your phone, in the browser. There is no server, no account and no login.

## Files

| File | What it does |
|---|---|
| `index.html` | The app itself |
| `sw.js` | Lets the app open without internet |
| `manifest.webmanifest` | Gives it the app name and full-screen mode on the home screen |
| `icon-192.png`, `icon-512.png` | Home-screen icon |

All five files must be uploaded together.

## Put it online (GitHub Pages, free)

1. Create a new public repository on GitHub, for example `day-log`.
2. Upload the five files to the top level of the repository (not inside a folder).
3. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
4. After a minute or two the page shows your link: `https://<your-username>.github.io/day-log/`.

## Add it to your phone

- **Android (Chrome):** open the link, tap the ⋮ menu, then **Add to Home screen**.
- **iPhone (Safari):** open the link, tap **Share**, then **Add to Home Screen**.

## Using it

- **Today:** the dark card shows Day N of your challenge, today's score (habits hit out of total), the last 7 days and your streak. Below it, type each value as the day goes (minutes, hours, steps, litres, grams, wake-up time) or tap **Done / Missed** for yes-or-no habits. A habit turns purple when you hit its target and red when you miss it. Write your **moral of the day** at the bottom. Everything saves as you type. Use the arrows at the top to fix an earlier day.
- **Progress → Month:** a calendar coloured by score (darker is better), your average, good and perfect days, and the hit rate of each habit. Tap a day to open it.
- **Progress → Challenge:** all days of the challenge as a grid, days left, and the current streak of each habit.
- **Morals:** your own list of morals. Type or paste them (one per line), or upload a `.txt` or `.csv` file with one per line. Each day, Today shows one of them at random. None repeats until every one has been shown, then a new round starts. On Today you can tap **Another one** or **Write my own** for that day. **Export .txt** saves your list.
- **Journal:** every logged day with its score and moral, newest first.
- **Setup:** appearance (**Auto** follows your phone's light or dark mode, or pick **Light** or **Dark**), challenge start date and length, the score a day needs to count toward your streak (80% by default), your habits, and backups.

### Habits

The app starts with the ten habits from the 500-days challenge format: wake up before 6:30 AM, workout 30+ mins, meditation 10+ mins, study 3+ hours, 8,000+ steps, 3+ L water, 80+ g protein, no junk food, screen time max 4 hours, sleep 8+ hours. Change any name, target or unit in **Setup**, reorder with ↑, remove what you don't want, and add your own.

Each habit is one of four types: **Done or not**, **At least** (a number to reach), **At most** (a number to stay under) or **Before a time**. A new habit only counts from the day you add it, so older scores don't drop.

## Backups (important)

Your data lives only in this browser on this phone. It is lost if you clear browser data, uninstall the browser, or lose the phone.

- Tap **Export backup (JSON)** about once a week and keep the file somewhere safe. The Today screen reminds you when your last backup is more than 7 days old.
- **Export CSV** gives a spreadsheet with one row per day and one column per habit. It cannot be imported back.
- **Import backup** reads a JSON backup. If the phone already has data, you can either add only the new days or replace everything.

## Moving to a new phone (Android → iPhone)

1. On the old phone, tap **Export backup (JSON)** and save the file somewhere you can reach from the new phone.
2. On the new phone, open your GitHub Pages link in Safari and add it to the home screen.
3. Open the app, go to **Setup → Import backup**, and choose the file.

## Updating the app

1. Open `sw.js` and raise the version number on the `CACHE` line, for example `daylog-v2` to `daylog-v3`.
2. Upload all changed files to GitHub.
3. On your phone, open the app, close it fully, and open it again.

## Running it next to Spend Log

Both apps live on the same `github.io` address, so their offline caches sit side by side. Day Log only clears its own caches. Spend Log's `sw.js` currently clears every cache that isn't its own, which can wipe Day Log's offline copy whenever Spend Log updates (your data is not affected, only the offline copy, which comes back the next time you open Day Log online). To fix it, change the filter line in Spend Log's `sw.js` to:

```js
.then((keys) => Promise.all(keys.filter((k) => k.startsWith('spendlog-') && k !== CACHE).map((k) => caches.delete(k))))
```
