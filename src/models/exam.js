'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Exam.hasMany(models.Question, { foreignKey: 'examid' })
        }
    };
    Exam.init({
        examid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        length: DataTypes.INTEGER,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Exam',
    });
    return Exam;
};