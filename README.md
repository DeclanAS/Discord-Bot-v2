# Discord bot v2
 A multifunctional discord bot created using Javascript.

## Dependencies:
- Discordjs/opus (v0.8.0)
- Discordjs/voice (v0.15.0)
- axios (v1.3.2)
- discord.js (v14.9.0)
- genius-lyrics-api (v3.2.0), not used.
- html-entities (v2.3.3)
- node-opus (v0.3.3)
- node-witai-speech (v1.0.2)
- opusscript (v0.0.8)
- play-dl (v1.9.6), replaced ytdl-core.
- prism-media (v1.3.5)
- underscore (v1.13.6), sub-dependency.

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

## TODO:
- Add more commands.
- Remove some action buttons that may cause issues.
- Add comments
- Refine dependencies.