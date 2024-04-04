'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submission extends Model {
        static associate(models) {
            Submission.belongsTo(models.User, { foreignKey: 'userid' });
            Submission.belongsTo(models.Exam, { foreignKey: 'examid' });
        }
    };
    Submission.init({
        userid: DataTypes.INTEGER,
        examid: DataTypes.INTEGER,
        correctAnswers: DataTypes.INTEGER,
        totalQuestions: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Submission',
    });
    return Submission;
};
