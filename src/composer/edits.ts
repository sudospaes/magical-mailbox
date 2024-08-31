import { Composer } from "grammy";

import Archive from "models/archive";

const edits = new Composer();

edits.on("edit:text", async (ctx) => {
  try {
    const record: any = await Archive.findOne({
      where: { senderMsgId: ctx.msgId },
    });
    const receiverId =
      ctx.chat.id == record.receiverId ? record.senderId : record.receiverId;
    await ctx.api.editMessageText(
      receiverId,
      record.msgId,
      ctx.editedMessage?.text!
    );
  } catch (err) {
    console.log(err);
  }
});

edits.on("edit:caption", async (ctx, next) => {
  try {
    const record: any = await Archive.findOne({
      where: { senderMsgId: ctx.msgId },
    });
    const receiverId =
      ctx.chat.id == record.receiverId ? record.senderId : record.receiverId;
    await ctx.api.editMessageCaption(receiverId, record.msgId, {
      caption: ctx.editedMessage?.caption,
    });
  } catch (err) {
    console.log(err);
  }
});

export default edits;
