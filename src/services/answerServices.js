const db = require('../models');
const Answer = db.Answer;

exports.createAnswer = async (questionid, content, istrue) => {
    try {
        return await Answer.create({ questionid, content, istrue });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllAnswers = async () => {
    try {
        return await Answer.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAnswerById = async (id) => {
    try {
        return await Answer.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateAnswer = async (id, questionid, content, istrue) => {
    try {
        const answer = await Answer.findByPk(id);
        if (!answer) {
            throw new Error('Answer not found');
        }
        await answer.update({ questionid, content, istrue });
        return answer;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteAnswer = async (id) => {
    try {
        const answer = await Answer.findByPk(id);
        if (!answer) {
            throw new Error('Answer not found');
        }
        await answer.destroy();
    } catch (error) {
        throw new Error(error.message);
    }
};
