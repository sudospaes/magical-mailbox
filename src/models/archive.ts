import { DataTypes } from "sequelize";

import database from "database";

const Archive = database.define("Archive", {
  msgId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderMsgId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Archive;
