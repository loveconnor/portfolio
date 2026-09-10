# Room article production notes

This file is excluded from the article collection by its leading underscore.

Article: `a-portfolio-you-can-walk-into.md`.

## Author context

Connor supplied the motivation on September 10, 2026: he wanted to explore a site that felt different from an ordinary website and surprised visitors. He confirmed that the desk is his actual setup and the shelf contains books he has read and learned from.

## Captures

All media in `public/articles/room/` comes from the local `experience` application, captured with Chromium at 1440 by 900 pixels on September 10, 2026. Still images use WebP. The cover is a cropped room capture. The two silent MP4 clips use fresh continuous browser recordings at 960 by 600 pixels and 25 frames per second. They use H.264 with fast-start metadata. Native playback controls provide play, pause, scrubbing, and fullscreen, with no autoplay and no video preload.

- `daylight.webp`: room overview with the built-in date override set to September 10, 2026 at 17:00 UTC.
- `night.webp`: the same scene with blinds closed and the date override set to September 11, 2026 at 03:00 UTC. The article caption identifies this as a fixed-time capture.
- `desktop.webp`: `/desktop.html`, with About Connor open. The article identifies it as the desktop shown directly.
- `entrance.mp4`: continuous capture after activating the actual entrance button. `entrance.webp` is the first frame.
- `book.mp4`: the registered book inspection action followed by a pointer drag that turns The Design of Everyday Things. `book.webp` is the first frame.

The controls pause on the current frame. The videos never autoplay, including when reduced motion is enabled. These recordings replace the initial low-frame-rate GIFs.

## Implementation sources

Technical descriptions were checked against the experience repository's `package.json`, `README.md`, `src/Application/Camera/Camera.ts`, `CameraKeyframes.ts`, `World/PersonalDesk.ts`, `StandingDesk.ts`, `MonitorScreen.ts`, `RoomInteractions.ts`, `PaperPhysics.ts`, `RoomWindow.ts`, `ScreenBar.ts`, `Utils/deviceProfile.ts`, `Utils/shadowBudget.ts`, `src/desktop/Browser.tsx`, the keyboard code, and existing interaction tests.

Imported asset provenance remains in the experience repository's `public/room/ASSETS.md`, `public/room/books/sources.json`, and `public/audio/atmosphere/README.md`. The article does not claim that imported models or book artwork were created by Connor.
