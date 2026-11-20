# Prospect design case study

Written 20 November 2026. This is the reference every design change is checked against.

## Product

Prospect is a calling and pipeline tool for one real estate prospector (Marlowe, Dignam Real Estate, Bulli), used on a desktop and a phone.

- Most frequent actions: log a call result (No answer, Not selling, Call back, Lead, Appraisal), follow up a lead, book a person on a call sheet.
- Highest risk action: marking someone Do not call, and any stage change in the pipeline (Listed, Sold).
- Most valuable action: booking an appraisal.
- Returning user arrives on: the Calls screen, next person ready.
- Rhythm: Monday and Tuesday cold calling (about 100 calls a day), Thursday and Friday call sheets for Saturday open homes.

## Decisions the owner has already made (do not reverse without asking)

1. Dark theme throughout.
2. Professional, not soft or colourful: neutral surfaces, colour only where it means something.
3. Result buttons stay full colour (purple, red, amber, blue, green).
4. Reason boxes on the call screen stay coloured, one colour per kind of reason.
5. Logo: white house in a blue speech bubble.
6. Desktop: collapsible, draggable left sidebar with a Pipeline group (Leads, Appraisals, Listings). Phone: bottom bar.
7. Simplicity first: extras live behind a three dot menu; one primary button per view; progressive disclosure.
8. No photos in lists (Street View cost); photo only on the person being called.
9. Page titles are plain titles, not menus. Pipeline pages are titled Appraisals and Listings.
10. No red notification dots. No overnight job warnings in the app.
11. App copy: plain words, no dashes.
12. Accent stays the current blue, #2563eb (decided 20 November).
13. Dark mode only, no light theme (decided 20 November).
14. Keep today's density; refine it, do not make it more spacious (decided 20 November).

## Foundations as measured (grep, 20 November)

| Foundation | In use now | Notes |
| --- | --- | --- |
| Font sizes | 24 distinct (8px to 44px), incl. 9.5, 12.5, 13.5, 14.5 | 13px used 109 times, 14px 77, 15px 51 |
| Font weights | 400, 500, 600, 700, 800 | Inter loaded only to 700, so 800 is synthesised |
| Colours | 114 distinct hex values | #3b82f6 hard coded 16 times although the token is now #2563eb |
| Radii | 18 distinct (3px to 999px) | |
| Padding values | 154 distinct | |
| Gaps | 15 distinct (1px to 24px) | |
| Control heights | 30, 32, 34, 36, 38, 40, 42, 44, 46 | nine heights for buttons and inputs |
| !important | 428 | sign of layered overrides fighting each other |
| Button classes | b2, pri, primary, ghost, sec, iconbtn, ib2, ib3, lact, cbk, go4, cl3, qc2 and more | at least 13 button looks |
| Overlays | openSheet2 (41 uses), raw #sheet innerHTML (10), uiAsk (15), confirm (2) | four dialog systems |
| Icons | Tabler icon font (101 uses) and custom inline SVG ic2 (74) | two icon sets |
| Breakpoints | 899, 900, 901, 1000, 1250, 760, 640, 600, 380, height 700 | ten breakpoints |
| Code structure | index.html (old UI) with v2.js layered on top through 59 function wrappers | |
| Motion | a few 0.15s transitions; prefers-reduced-motion handled in 3 places | |

## Stack

Static HTML, CSS and vanilla JavaScript on GitHub Pages, Supabase backend. No framework, no build step. Inter from Google Fonts.

## Design system and mockups (20 November)

The tokens, brand book and twelve components live in the Prospect design system: https://claude.ai/artifact/BKsy6wTh6ryg6mxrrmSQY7
Mockups of the call screen, Leads list and lead panel, desktop and phone: https://claude.ai/artifact/YMTPfxcFYqWLVgfmQvA5KS
Both are proposals for approval. The app has not been changed to match them yet.
