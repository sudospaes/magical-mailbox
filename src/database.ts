import { Sequelize } from "sequelize";

import { join } from "path";

import { rootPath } from "utils/utils";

const database = new Sequelize({
  dialect: "sqlite",
  storage: join(rootPath(), "database.sqlite"),
});

export default database;
