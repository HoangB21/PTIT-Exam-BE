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
        }
    };
    UserAnswer.init({
        userid: DataTypes.INTEGER,
        questionid: DataTypes.INTEGER,
        answerid: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'UserAnswer',
    });
    return UserAnswer;
};
