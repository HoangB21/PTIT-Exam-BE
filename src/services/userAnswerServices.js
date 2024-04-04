const db = require('../models/index');

exports.getAllUserAnswersService = async () => {
    try {
        return await db.UserAnswer.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.createUserAnswerService = async (userid, questionid, answerid, examid) => {
    try {
        console.log(examid);
        return await db.UserAnswer.create({ userid, questionid, answerid, examid: examid });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

exports.deleteUserAnswerService = async (id) => {
    try {
        const userAnswer = await db.UserAnswer.findOne({ where: { id: id }, raw: false });
        if (!userAnswer) {
            throw new Error('User answer not found');
        }
        await userAnswer.destroy();
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getUserAnswersByQuestionIdService = async (questionid) => {
    try {
        console.log(questionid);
        return await db.UserAnswer.findAll({ where: { questionid: questionid }, raw: false });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
