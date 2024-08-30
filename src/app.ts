import { Bot } from "grammy";

import { connectToDatabase, readConfigFile } from "utils/utils";

import Archive from "models/archive";

await connectToDatabase();

const conf = await readConfigFile();
const bot = new Bot(conf.token);

bot.command("start", (ctx) => {
  ctx.reply("Welcome to my magical mailbox 🪄");
  ctx.reply(`My mailbox doese support:
    💬 Text
    🔉 Voice/Audio
    🎞 Video/Video note
    🎆 Sticker/Gif
    📁 Document
    🥰 Reactions`);
});

bot.on("message", async (ctx, next) => {
  if (!ctx.msg.reply_to_message) {
    return next();
  }
  try {
    const record: any = await Archive.findOne({
      where: { msgId: ctx.msg.reply_to_message.message_id },
    });
    const msg = await ctx.api.copyMessage(
      record.senderId,
      ctx.from.id,
      ctx.msgId,
      {
        reply_parameters: { message_id: record.senderMsgId },
      }
    );
    await Archive.create({
      msgId: msg.message_id,
      senderId: ctx.from.id,
      senderMsgId: ctx.msgId,
    });
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

bot.on("message", async (ctx) => {
  try {
    const msg = await ctx.api.copyMessage(conf.admin, ctx.from.id, ctx.msgId);
    await Archive.create({
      msgId: msg.message_id,
      senderId: ctx.from.id,
      senderMsgId: ctx.msgId,
    });
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

bot.on("message_reaction", async (ctx) => {
  try {
    const record: any = await Archive.findOne({
      where: { msgId: ctx.msgId },
    });
    await ctx.api.setMessageReaction(
      record.senderId,
      record.senderMsgId,
      ctx.messageReaction.new_reaction
    );
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

bot.start({
  allowed_updates: ["message", "message_reaction", "message_reaction_count"],
});
