import questionService from "../services/questionService";
// data=req.body
// data.examid=param


let getQuestionController = async (req, res) => {
    try {
        let questionId = req.query.questionId;
        let examId = req.query.examid;

        if (!questionId || !examId) {
            return res.status(200).json({
                errorCode: 1,
                msg: "Missing parameter",
                question: data
            });
        }

        let data = await questionService.getQuestion(questionId, examId);

        return res.status(200).json({
            errorCode: 0,
            msg: "Get question successful",
            question: data,
            questionId:typeof parseInt(questionId),
            examId: typeof examId
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
    getQuestionController: getQuestionController,
    createQuestionController: createQuestionController,
    updateQuestionController: updateQuestionController,
    deleteQuestionController: deleteQuestionController,
}