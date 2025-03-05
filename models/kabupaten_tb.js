"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kabupaten_tb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kabupaten_tb.belongsTo(models.Provinsi_tb, {
        foreignKey: "provinsi_id",
        as: "provinsi_tb",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      // Kabupaten_tb.belongsTo(models.User_tb, {
      //   foreignKey: "user_id",
      //   as: "user_tb",
      //   onDelete: "SET NULL",
      //   onUpdate: "CASCADE",
      // });
    }
  }
  Kabupaten_tb.init(
    {
      nama: DataTypes.STRING,
      provinsi_id: DataTypes.INTEGER,
      diresmikan: DataTypes.DATE,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Kabupaten_tb",
    }
  );
  return Kabupaten_tb;
};
