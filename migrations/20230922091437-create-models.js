'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.createTable('Courses', {
            courseId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            instructorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Instructors',
                    key: 'instructorId'
                },
                allowNull: true
            }
        });

        await queryInterface.createTable('Students', {
            studentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            points: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });


        await queryInterface.createTable('Enrollments', {
            studentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Students',
                    key: 'studentId'
                }
            },
            courseId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Courses',
                    key: 'courseId'
                }
            }
        });


    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.dropTable('Enrollments');
        await queryInterface.dropTable('Students');
        await queryInterface.dropTable('Instructors');
        await queryInterface.dropTable('Courses');
    }
};
