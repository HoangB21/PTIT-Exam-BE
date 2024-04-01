'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        static associate(models) {
            Answer.belongsTo(models.Question, { foreignKey: 'questionid' });
        }
    };
    Answer.init({
        answerid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        questionid: DataTypes.INTEGER,
        content: DataTypes.STRING,
        istrue: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Answer',
    });
    return Answer;
};
