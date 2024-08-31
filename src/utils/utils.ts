import { config } from "dotenv";

import { join } from "path";

import database from "database";

export function rootPath() {
  return process.cwd();
}

export async function connectToDatabase() {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
    await database.sync();
    console.log("Sync has been done successfully.");
  } catch (error) {
    console.error("Unable to use the database:", error);
  }
}

export async function setupEnv() {
  try {
    await config({ path: join(rootPath(), "config.env") });
  } catch (err) {
    console.log(err);
  }
  if (!process.env.token) {
    console.log("Bot token is not exist in the config file.");
    process.exit(1);
  }
  if (!process.env.admin) {
    console.log("Bot admin id is not not exist in the config file.");
    process.exit(1);
  }
}
