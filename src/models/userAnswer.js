'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserAnswer extends Model {
        static associate(models) {
            UserAnswer.belongsTo(models.User, { foreignKey: 'userid' });
            UserAnswer.belongsTo(models.Question, { foreignKey: 'questionid' });
            UserAnswer.belongsTo(models.Answer, { foreignKey: 'answerid' });
            UserAnswer.belongsTo(models.Exam, { foreignKey: 'examid' });
        }
    };
    UserAnswer.init({
        userid: DataTypes.INTEGER,
        questionid: DataTypes.INTEGER,
        answerid: DataTypes.INTEGER,
        examid: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'UserAnswer',
    });
    return UserAnswer;
};
