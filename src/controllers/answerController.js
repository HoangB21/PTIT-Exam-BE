const answerService = require('../services/answerServices');

exports.createAnswer = async (req, res) => {
    try {
        const { questionid, content, istrue } = req.body;
        const answer = await answerService.createAnswer(questionid, content, istrue);
        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAnswers = async (req, res) => {
    try {
        const answers = await answerService.getAllAnswers();
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnswerById = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await answerService.getAnswerById(id);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnswerByQuestion = async (req, res) => {
    try {
        const { questionid } = req.params;
        const answer = await answerService.getAnswerByQuestion(questionid);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionid, content, istrue } = req.body;
        const answer = await answerService.updateAnswer(id, questionid, content, istrue);
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await answerService.deleteAnswer(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
