import questionService from "../services/questionService";
// data=req.body
// data.examid=param


let getQuestionByIDController = async (req, res) => {
    try {
        let questionId = req.query.questionId;
        if (!questionId) {
            return res.status(200).json({
                errorCode: 1,
                msg: "Missing parameter",
                question: data
            });
        }

        let data = await questionService.getQuestionById(questionId);
        return res.status(200).json({
            data
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 2,
            msg: "Internal server error",
            error: error.message
        });
    }
};

let getQuestionByExamController = async (req, res) => {
    try {
        let examId = req.query.examId;
        if (!examId) {
            return res.status(200).json({
                errorCode: 1,
                msg: "Missing parameter",
                question: data
            });
        }

        let data = await questionService.getQuestionByExam(examId);
        return res.status(200).json({
            data
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 2,
            msg: "Internal server error",
            error: error.message
        });
    }
};

let createQuestionController = async (req, res) => {
    let message = await questionService.createQuestion(req.body);
    return res.status(200).json(message);
}

let updateQuestionController = async (req, res) => {
    let data = req.body;
    data.id = req.query.id;
    let message = await questionService.updateQuestion(data);
    return res.status(200).json(message);
}

let deleteQuestionController = async (req, res) => {
    let message = await questionService.deleteQuestion(req.body);
    return res.status(200).json(message);
}

module.exports = {
    getQuestionByIDController: getQuestionByIDController,
    createQuestionController: createQuestionController,
    updateQuestionController: updateQuestionController,
    deleteQuestionController: deleteQuestionController,
    getQuestionByExamController: getQuestionByExamController,
}