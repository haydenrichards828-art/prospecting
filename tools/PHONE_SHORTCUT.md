# The shared "Prospect messages" iPhone shortcut

Make this once on any iPhone. After that every agent installs it with one tap from Prospect.

1. Open Shortcuts, tap +, name it **Prospect messages**.
2. Add **Get Contents of URL**. Leave the URL as a placeholder for now (type x).
3. Tap the arrow on the action: Method **POST**, Request Body **JSON**, then add three Text fields:
   - `from`: Shortcut Input, then tap it and pick **Sender**
   - `text`: Shortcut Input, then pick **Content**
   - `app`: the word `iphone`
4. Tap the (i) at the bottom, **Setup**, **Add Question** on the URL field. Question text: "Paste your Prospect link (it's already copied)".
5. Share, **Copy iCloud Link**.
6. Put the link in `js/19-phone-link.js` as `window.PHONE_SHORTCUT` (top of the file), bump `?v` in index.html and push.

Each agent then: Messages tab, I have an iPhone, Add the shortcut (paste, Add Shortcut), then one automation:
Automation, +, Message, Message Contains one space, Run Immediately, Next, pick Prospect messages. Needs iOS 17 or newer.

What arrives: POST `?p=<their key>` with `{"from": "...", "text": "...", "app": "iphone"}`. The inbox function keeps only
messages from people in Prospect (a lead, an owner on the call list, or someone they messaged from Prospect).

Android: Message487 (F-Droid, MIT). Connection: address = their link, token = their link's key (or the link again).
Sources: SMS on, Notifications for WhatsApp and Messages. The inbox function reads its JSON (sender or title, text, package).
