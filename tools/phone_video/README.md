# Phone setup videos
Made from the same drawn screens as the picture guide in js/19-phone-link.js, so they stay in step.
Remake after changing the steps:

    PW=$(npm root -g)/playwright node tools/with_server.js node tools/phone_video/rec.js iphone $PWD/media/phone-iphone.mp4
    PW=$(npm root -g)/playwright node tools/with_server.js node tools/phone_video/rec.js android $PWD/media/phone-android.mp4

If the iPhone steps change, update VSTART in js/19-phone-link.js (the time step 4 starts, printed as "starts").
