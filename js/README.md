# The new design, in load order

index.html is the original app. These files load after it, in number order, and change it by wrapping its functions
(`window.f=(function(orig){ ... })(window.f)`). A later file can wrap something from an earlier one, never the other
way round, so keep the order. tools/PATCHES.md lists every wrapper and what it is for.

| File | What is in it |
|---|---|
| 01-base.js | Icons, small helpers, why each person is on the list, photos, the page shell and sheets |
| 02-calls.js | The call screen, the call list and its keyboard keys |
| 03-leads-pipeline-settings.js | Leads, demo data, Appraisals and Listings, Settings, the phone number safeguard |
| 04-people-openhomes.js | Fixing names and numbers, open home call lists, Street View, two owners, reminders |
| 05-messages-sidebar.js | Send info and referrals, closing panels by clicking outside, the side bar |
| 06-fixes-20nov.js | The 20 Nov audit fixes and error and slowness tracking |
| 07-crm-callsheets.js | Leads as a table, the docked lead panel, the pipeline board, call sheets around a home |
| 08-card-drops.js | Card drops: toolbar, map, list, walks |
| 09-tracking-instant.js | Usability tracking, moving leads along, instant screens, one way to message someone |
| 10-feel.js | Micro animations and arrow keys |
| 11-tracking-review.js | Notes that save themselves, Escape and click outside to close, quick note phrases, faster first open |
| 12-needs-number-rail.js | Needs a number, quick notes in the note box, blue lists in the rail |
| 13-stats.js | The Stats page |
| 14-latest.js | No Save button on existing leads, typing without lag |
| 15-inbox.js | Messages: one inbox through BlueBubbles on the Mac, group chats filtered to what needs her, delivery times, focus sessions, and their Settings |

New work goes in a new numbered file (or the end of 14) rather than in the middle of an older one.
