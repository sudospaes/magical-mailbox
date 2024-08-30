import { Composer } from "grammy";

const commands = new Composer();
const env = process.env;

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
