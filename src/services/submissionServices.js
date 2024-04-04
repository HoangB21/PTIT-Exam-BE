const db = require('../models/index');

exports.createSubmissionService = async (userid, examid) => {
    try {
        const correctAnswers = await countCorrectAnswer(userid, examid);
        const totalQuestions = await db.Question.count({
            where: {
                examid: examid
            }
        });
        return await db.Submission.create({ userid, examid, correctAnswers, totalQuestions });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

exports.getSubmissionByIdService = async (id) => {
    try {
        return await db.Submission.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getSubmissionOfUserService = async (userid) => {
    try {
        return await db.Submission.findAll({ where: { userid } });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getSubmissionOfExamService = async (examid) => {
    try {
        return await db.Submission.findAll({ where: { examid } });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteSubmissionService = async (id) => {
    try {
        const submission = await db.Submission.findOne({ where: { id }, raw: false });
        if (!submission) {
            throw new Error('Submission not found');
        }
        await submission.destroy();
        return { message: 'Submission deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};

const countCorrectAnswer = async (userid, examid) => {
    const userAnswers = await db.UserAnswer.findAll({ where: { userid: userid, examid: examid } });
    let cnt = 0;
    for (var i = 0; i < userAnswers.length; i++) {
        let answer = await db.Answer.findByPk(userAnswers[i].answerid);
        cnt += answer.istrue;
    }
    return cnt;
}

