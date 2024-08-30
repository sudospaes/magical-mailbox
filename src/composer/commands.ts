import { Composer } from "grammy";

import Archive from "models/archive";

const commands = new Composer();

commands.command("start", (ctx) => {
  ctx.reply("Welcome to my magical mailbox 🪄");
  ctx.reply(`My mailbox doese support:
      💬 Text
      🔉 Voice/Audio
      🎞 Video/Video note
      🎆 Sticker/Gif
      📁 Document
      🥰 Reactions`);
});

export default commands;
