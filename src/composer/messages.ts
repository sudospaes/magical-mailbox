import { Composer } from "grammy";

import Archive from "models/archive";
import BlockList from "models/block-list";

const messages = new Composer();
const env = process.env;

messages.on("message", async (ctx, next) => {
  try {
    const isSenderBlocked = await BlockList.findOne({
      where: { senderId: ctx.chatId },
    });
    if (isSenderBlocked) {
      return ctx.reply("Sorry, You aren't allowed to send message 💔");
    } else {
      next();
    }
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

// Handle reply messages
messages.on("message", async (ctx, next) => {
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

// Handle messaging
messages.on("message", async (ctx) => {
  try {
    const msg = await ctx.api.copyMessage(env.admin!, ctx.from.id, ctx.msgId);
    await Archive.create({
      msgId: msg.message_id,
      senderId: ctx.from.id,
      senderMsgId: ctx.msgId,
    });
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

// Handle reaction on messages
messages.on("message_reaction", async (ctx) => {
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

export default messages;
