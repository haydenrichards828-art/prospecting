# Phone setup videos

`media/phone-iphone.mp4` and `media/phone-android.mp4`, plus one still per step (`media/phone-*-N.jpg`) for the
step through version in the app. Every screen is drawn to look like the real iPhone (iOS 26 style) or Android (Pixel
style) screen, with a finger showing each tap and the moves between apps. The first and last scenes are real
screenshots of Prospect.

Remake after changing the steps (film2.js, `scenes`) or Prospect's setup sheet:

    PW=$(npm root -g)/playwright node tools/with_server.js node tools/phone_video/shots.js
    PW=$(npm root -g)/playwright node tools/phone_video/rec2.js iphone $PWD/media/phone-iphone.mp4
    PW=$(npm root -g)/playwright node tools/phone_video/rec2.js android $PWD/media/phone-android.mp4

`rec2.js <kind> x stills` writes the stills to /tmp/g19 to check them first; `rec2.js <kind> x plan` prints the timings.
Each render writes `media/phone-*.json` (total length, step count, where the iPhone automation part starts).
If those change, update `VID` in js/19-phone-link.js and bump its `VER`. Also bump the `?v=` on the media links in phone.html.
The iPhone video ends with the check (tap the shortcut once, Always Allow) and `shots/iphone-connected.png`.

Sources checked 24 Nov 2026: Apple's Shortcuts guide (Message trigger, Message Contains, Run Immediately),
Message487 1.2.0 source and screenshots (github.com/andre487/AndroidMessage487), its APK install guide
(restricted settings on Android 13+, SMS on Android 15+), Google's restricted settings help.
