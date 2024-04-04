'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('userAnswers', {
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
            questionid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Questions',
                    key: 'questionid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            answerid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Answers',
                    key: 'answerid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('UserAnswers');
    }
};
