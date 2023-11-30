const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "withdraw",
    },
    timastamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });
  const options = {};

  return Address;
};
