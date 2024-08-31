import { Composer } from "grammy";

import Archive from "models/archive";
import BlockList from "models/block-list";

const commands = new Composer();
const env = process.env;

commands.command("start", (ctx) => {
  ctx.reply("Welcome to my magical mailbox 🪄");
  ctx.reply(`My mailbox does support:
      💬 Text
      🔉 Voice/Audio
      🎞 Video/Video note
      🎆 Sticker/Gif
      📁 Document
      🥰 Reactions`);
});

commands.command("block", async (ctx) => {
  if (ctx.chatId != +env.admin!) return ctx.reply("You are not owner");
  if (!ctx.msg.reply_to_message)
    return ctx.reply("Please reply on a message to block it sender");
  try {
    const record: any = await Archive.findOne({
      where: { msgId: ctx.msg.reply_to_message.message_id },
    });
    if (record.senderId == +env.admin!)
      return ctx.reply("Owner can't block itself");
    const isSenderBlocked = await BlockList.findOne({
      where: { senderId: record.senderId },
    });
    if (!isSenderBlocked) {
      await BlockList.create({ senderId: record.senderId });
      return ctx.reply("The sender has been blocked");
    } else {
      return ctx.reply("The sender blocked before");
    }
  } catch (err) {
    console.log(err);
  }
});

commands.command("unblock", async (ctx) => {
  if (ctx.chatId != +env.admin!) return ctx.reply("You are not owner");
  if (!ctx.msg.reply_to_message)
    return ctx.reply("Please reply on a message to make unblock it sender");
  try {
    const record: any = await Archive.findOne({
      where: { msgId: ctx.msg.reply_to_message.message_id },
    });
    if (record.senderId == +env.admin!)
      return ctx.reply("Owner is free forever");
    const isSenderBlocked = await BlockList.findOne({
      where: { senderId: record.senderId },
    });
    if (isSenderBlocked) {
      await BlockList.destroy({ where: { senderId: record.senderId } });
      return ctx.reply("The sender is a freebird from now");
    } else {
      return ctx.reply("The sender is already free");
    }
  } catch (err) {
    console.log(err);
  }
});

export default commands;
