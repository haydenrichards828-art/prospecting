# Speed and usability, 22 Nov 2026

How to rerun:
- Real use: `select ux_report(7);` in Supabase (taps that did nothing, repeated tapping, jobs done in panels with time, taps and whether saved, tap response, server time per action).
- Main jobs: `PW=/opt/npm-tools/node_modules/playwright node tools/tasks.js` (also part of `bash tools/check.sh`, which fails if a job needs more steps than `tools/tasks.json` allows).

## Speed: 84 / 100

Four parts, 25 each.

| Part | Measured | Bar used | Score |
|---|---|---|---|
| Tap response | 16 to 32ms in the job scripts (fast computer; real phones will be slower, the tracker now records them) | Google counts under 200ms as good | 24 |
| First open on a slow phone | 1.45s on slow 4G with a 4x slower processor | Google counts under 2.5s as good | 24 |
| Waiting on the server | median 288ms, but 1 in 10 over 2.4s; the call list and today's numbers took about 2.8s | Nielsen: over 1s breaks the flow | 12 |
| Effort per job | logging a call 2 taps, call back 3, appraisal 4, add a lead 4 plus typing | fewest taps that still say what happened | 24 |

The slow server tail lines up with background jobs: agency sync runs about 1,440 times a day at 0.7 to 3s each.

## Usability: 74 / 100

Two parts.
- Walkthrough as a first timer, 70 points: 10 jobs, three questions each (would they know what to do, can they see it, do they understand what happened). 24 of 30 pass, 56 points.
- Real use since 21 Nov, 30 points: 8% of taps hit nothing (20 of 257) with no hot spot, 5 bursts of repeated tapping (3 were map zooms, 1 the search icon that would not close, now fixed). 18 points, scaled so 0% scores 30 and 20% scores 0.

This is a judgement score until two or three new people try it and fill in the System Usability Scale.

| Job | Know what to do | Can see it | Understand the result |
|---|---|---|---|
| Log a no answer | yes | yes | yes, saved with undo, next person shows |
| Log a call with a note | yes | yes | yes |
| Book an appraisal | yes | yes | yes, then offers the confirmation text |
| Book a call back | yes | yes | yes |
| Find someone | yes | yes | yes |
| Add a lead | yes | yes | yes |
| Plan a card drop walk | yes | yes | yes |
| Move a lead to Appraisals | no, only by dragging, nothing on the card says so | no, lead cards have no move button (appraisal and listing cards do) | no, 84% of leads have no house linked and get a message pointing elsewhere |
| Set a follow up on a lead | yes | yes | no, the date needs Save, and closing without it loses it silently |
| First time opening the app | no, nothing says tap the number, then tap what happened | yes | partly, five numbers in the top bar and words like Strong and connected |

## Fix list, biggest first

1. Moving a lead to Appraisals: put a move button on lead cards, and when the lead has no house linked, open the booking with their typed address filled in instead of the dead end message.
2. First time help: a one time three step hint on the first call (tap the number, talk, tap what happened), and empty screens that say what to do.
3. Lead follow up: save the date as soon as it is tapped, with undo.
4. Call screen top bar: cut to calls out of goal and appraisals.
5. Hide the keyboard letters on buttons until someone uses a key, and replace Strong with plain words.
6. Server tail: run agency sync less often and keep the call list ready ahead of time.
7. Keyboard focus outlines.

## After the fixes, 22 Nov afternoon

Speed 84 to 92. Usability 74 to 86.

| Change | What it fixed | Score effect |
|---|---|---|
| Lead cards have a ⋯ menu (Move to Appraisals, Move to Listings, Open lead); dragging works too. With no house linked, the typed address is used and the lead is linked to the new house; with no address, the form opens filled in | the 84% of leads that could not be moved | walkthrough 3 checks pass |
| Lead follow up saves on tap, with undo | dates lost when the panel closed | 1 check passes |
| One time three step help on the first call; top bar cut to calls and appraisals; Strong shown as Strong sign; keyboard letters hidden until a key is used (shown on hover) | first timers not knowing what to do | 2 checks pass |
| Focus ring on every control | keyboard users could not see where they were | (accessibility) |
| Server: big database library loaded only when the list is rebuilt; browsers remember the permission check for 2 hours; one minute ping 7am to 9pm | cold opens took about 2s per request and every request was doubled | server part 12 to 20 |

Walkthrough now 29 of 30. The one left: after moving a lead to Appraisals they show in both columns. That is on purpose (follow ups keep working until they list), but a first timer may read it as a double.
Server timing is from the first minutes after the change (cold runs 1.5 to 2.1s before, pings 0.2 to 0.4s after). Rerun `select ux_report(7);` in a week to confirm with real use, and the real use part of the usability score (still 18 of 30) needs that week of data too.

## Instant loading, 22 Nov evening

Measured with `PW=... node tools/load_time.js 2000 400`: the real app against a pretend server that answers after 2s (cold) or 0.4s (warm). Times are until real content shows.

| | Open (Calls) | Pipeline | Leads | Stats | Appraisals |
|---|---|---|---|---|---|
| Before, warm server | 0.52s first, 0.11s after | 0.43s | 0.02s | 0.43s | 0.42s |
| Before, cold server | 2.1s first | 2.0s | 0.02s | 2.0s | 2.0s |
| After, warm or cold | same as before | 0.02s | 0.02s | 0.02s | 0.02s |

How: every screen's last answer is kept on the phone and shown at once, then swapped for the fresh one (a change made elsewhere shows about half a second later). After any edit the next read waits for the fresh answer, so old data never shows after a change. While Calls is open the Pipeline and Stats answers are fetched in the background. Grey rows show instead of the word Loading.
The first open of a day still waits for the server, because yesterday's call list is not today's. With the server kept warm that is about half a second.
