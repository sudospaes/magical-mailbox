import fs from "fs/promises";
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

export async function readConfigFile() {
  const path = join(rootPath(), "config.json");
  try {
    const buffer = await fs.readFile(path);
    return JSON.parse(buffer.toString());
  } catch (err) {
    console.log(err);
  }
}
