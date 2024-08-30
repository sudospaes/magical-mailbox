import { DataTypes } from "sequelize";

import database from "database";

const Archive = database.define("Archive", {
  msgId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderMsgId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Archive;
