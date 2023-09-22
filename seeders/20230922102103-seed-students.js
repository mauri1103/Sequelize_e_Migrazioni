'use strict';

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

        /*-
        Ciclo usato per creare degli studenti random con un punteggio da 30 a 970
        */
        const students = [];
        for (let i = 0; i < 10; i++) {
            students.push({
                firstName: `Student${i}`,
                lastName: `Student${i}`,
                email: `student${i}@example.com`,
                points: Math.floor(Math.random() * 940) + 30
            });
        }
        await queryInterface.bulkInsert('Students', students, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('Students', null, {});
    }
};
