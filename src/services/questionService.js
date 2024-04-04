import bcrypt from "bcryptjs";
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

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
            if (await checkContentExist(data.content)) {
                resolve({
                    errorCode: 2,
                    message: "Content already exists"
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
let checkContentExist = async (content) => {
    let data = await db.Question.findOne({ where: { content: content } });
    if (data) return true;
    return false;
}

let getQuestion = (questionid, examid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data;
            if (questionid === 'ALL') {
                data = await db.Question.findAll({ where: { examid: examid } });
            } else {
                data = await db.Question.findOne({ where: { questionid: questionid, examid: examid } });
            }

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

let deleteQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        let id = data.id
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
    getQuestion: getQuestion,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion,
}