# Discord bot v2
 A multifunctional discord bot created using Javascript.

## Dependencies:
- Discordjs/opus (v0.9.0)
- Discordjs/voice (v0.17.0)
- axios (v1.7.7)
- discord.js (v14.16.1)
- genius-lyrics-api (v3.2.1), not used.
- html-entities (v2.5.2)
- node-opus (v0.3.3)
- node-witai-speech (v1.0.2), not used.
- opusscript (v0.0.8)
- prism-media (v1.3.5)
- underscore (v1.13.7), sub-dependency.
- yt-stream (1.7.4), replaced play-dl.

## Commands:
- \[prefix\] **join**
  - The bot joins your voice channel if possible.
- \[prefix\] **leave**
  - The bot leaves your voice channel.
- \[prefix\] **play** \[Youtube Search\]
  - Plays the sound from the first result the Youtube API returns.
- \[prefix\] **play** \[Youtube URL\]
  - Plays the sound from the corresponding Youtube video.
- \[prefix\] **pause**
  - Pauses the sound/song.
- \[prefix\] **resume**
  - Resumes the sound/song.
- \[prefix\] **stop**
  - Stops the current song all together, and deletes the queue elements.
- \[prefix\] **help**
  - Prints out helpful information.
