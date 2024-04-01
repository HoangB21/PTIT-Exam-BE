'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Question.belongsTo(models.Exam, { foreignKey: 'examid' });
            Question.hasMany(models.Answer, { foreignKey: 'questionid' });
        }
    };
    Question.init({
        questionid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        examid: DataTypes.INTEGER,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Question',
    });
    return Question;
};