"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Kabupaten_tbs", [
      {
        nama: "solok",
        provinsi_id: 1,
        diresmikan: "1945-10-1",
        photo: "/img/sumbar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "bandung",
        provinsi_id: 2,
        diresmikan: "1945-08-17",
        photo: "/img/jabar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Kabupaten_tbs", null, {});
  },
};
