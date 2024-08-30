import { Bot } from "grammy";

import { connectToDatabase, setupEnv } from "utils/utils";

import messages from "composer/messages";
import commands from "composer/commands";
import edits from "composer/edits";

await connectToDatabase();
await setupEnv();

const bot = new Bot(process.env.token!);

bot.use(commands);
bot.use(messages);
bot.use(edits);

bot.start({
  allowed_updates: [
    "message",
    "edited_message",
    "message_reaction",
    "message_reaction_count",
  ],
});
