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
     *
     */
    return queryInterface.bulkInsert("Provinsi_tbs", [
      {
        user_id: 1,
        nama: "Sumatera Barat",
        diresmikan: "1945-10-1",
        photo: "/img/sumbar.png",
        pulau: "Sumatera",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        nama: "Jawa Barat",
        diresmikan: "1945-08-17",
        photo: "/img/jabar.png",
        pulau: "Jawa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        nama: "Jawa Tengah",
        diresmikan: "1950-07-4",
        photo: "/img/jateng.png",
        pulau: "Jawa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        nama: "Bali",
        diresmikan: "1958-07-14",
        photo: "/img/bali.png",
        pulau: "Bali",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        nama: "Aceh",
        diresmikan: "1956-12-7",
        photo: "/img/aceh.png",
        pulau: "Sumatera",
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
    return queryInterface.bulkDelete("Provinsi_tbs", null, {});
  },
};
