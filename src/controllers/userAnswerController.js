const { getAllUserAnswersService, createUserAnswerService, deleteUserAnswerService, getUserAnswersByQuestionIdService } = require('../services/userAnswerServices');

exports.getAllUserAnswersController = async (req, res) => {
    try {
        const userAnswers = await getAllUserAnswersService();
        return res.status(200).json(userAnswers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.createUserAnswerController = async (req, res) => {
    const { userid, questionid, answerid, examid } = req.body;
    try {
        const userAnswer = await createUserAnswerService(userid, questionid, answerid, examid);
        return res.status(201).json(userAnswer);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteUserAnswerController = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUserAnswerService(id);
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getUserAnswersByQuestionIdController = async (req, res) => {
    const { questionid } = req.params;
    try {
        const userAnswers = await getUserAnswersByQuestionIdService(questionid);
        return res.status(200).json(userAnswers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
