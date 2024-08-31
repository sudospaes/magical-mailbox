import { DataTypes } from "sequelize";

import database from "database";

const BlockList = database.define("BlockList", {
  senderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

export default BlockList;
