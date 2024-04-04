import bcrypt from "bcryptjs";
import db from '../models/index';


let createQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.content) {
                resolve({
                    errorCode: 1,
                    message: "Missing question's information"
                });
                return;
            }
            await db.Question.create({
                examid: data.examid,
                content: data.content
            });
            resolve({
                errorCode: 0,
                message: "Create question successfully!"
            });
        } catch (error) {
            reject(error);
        }
    })
}


let getQuestionById = (questionid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = null;
            data = await db.Question.findOne({ where: { questionid: questionid } });
            if (data) {
                resolve(data);
            } else {
                resolve({
                    msg: "question not found"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getQuestionByExam = (examid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = null;
            data = await db.Question.findAll({ where: { examid: examid } });
            if (!data || data.length === 0) {
                resolve({
                    msg: "question not found"
                });
            } else {
                resolve(data);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        let id = data.questionid
        try {
            if (!id) {
                resolve({
                    errorCode: 1,
                    message: "Missing some parameters"
                })
            }
            let question = await db.Question.findOne({ where: { questionid: id }, raw: false });
            if (!question) {
                resolve({
                    errorCode: 2,
                    message: "Question not found"
                })
            }
            await question.destroy();
            resolve({
                errorCode: 0,
                message: "Deleted"
            });
        } catch (error) {
            reject(error);
        }
    })
}

let updateQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        let id = data.id
        try {
            if (!id) {
                resolve({
                    errorCode: 1,
                    message: "Missing some parameters",
                    data: data
                })
            }
            let question = await db.Question.findOne({ where: { Questionid: id }, raw: false });
            if (!question) {
                resolve({
                    errorCode: 2,
                    message: "question not found"
                })
            }
            question.content = data.content;
            await question.save();
            resolve({
                errorCode: 0,
                message: "Updated"
            });
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createQuestion: createQuestion,
    getQuestionById: getQuestionById,
    getQuestionByExam: getQuestionByExam,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion,
}