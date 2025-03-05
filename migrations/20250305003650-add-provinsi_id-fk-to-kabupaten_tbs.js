"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Kabupaten_tbs", {
      fields: ["provinsi_id"],
      type: "foreign key",
      name: "fk_provinsi_id_provinsi_tbs",
      references: {
        table: "Provinsi_tbs",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      "Kabupaten_tbs",
      "fk_provinsi_id_provinsi_tbs"
    );
  },
};
