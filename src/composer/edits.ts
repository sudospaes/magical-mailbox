import { Composer } from "grammy";

import Archive from "models/archive";

const edits = new Composer();
const env = process.env;

edits.on("edit:text", async (ctx, next) => {
  try {
    const record: any = await Archive.findOne({
      where: { senderMsgId: ctx.msgId },
    });
    await ctx.api.editMessageText(
      env.admin!,
      record.msgId,
      ctx.editedMessage?.text!
    );
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

edits.on("edit:caption", async (ctx, next) => {
  try {
    const record: any = await Archive.findOne({
      where: { senderMsgId: ctx.msgId },
    });
    await ctx.api.editMessageCaption(env.admin!, record.msgId, {
      caption: ctx.editedMessage?.caption,
    });
  } catch (err) {
    return ctx.reply("Oops, something wrong 😢");
  }
});

export default edits;
