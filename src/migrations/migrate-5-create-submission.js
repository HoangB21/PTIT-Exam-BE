'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('submissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'userid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            examid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Exams',
                    key: 'examid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            correctAnswers: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalQuestions: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Submissions');
    }
};
