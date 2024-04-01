'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('questions', {
            questionid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            examid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'exams',
                    key: 'examid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            content: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('questions');
    }
};