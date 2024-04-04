import db from '../models/index';

export const createAnswer = async (questionid, content, istrue) => {
    try {
        return await db.Answer.create({ questionid, content, istrue });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllAnswers = async () => {
    try {
        return await db.Answer.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAnswerById = async (id) => {
    try {
        return await db.Answer.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAnswerByQuestion = async (questionid) => {
    try {
        return await db.Answer.findAll({ where: { questionid: questionid } });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateAnswer = async (id, questionid, content, istrue) => {
    try {
        const answer = await db.Answer.findOne({ where: { answerid: id }, raw: false });
        if (!answer) {
            throw new Error('Answer not found');
        }
        // Cập nhật thuộc tính của đối tượng answer
        answer.questionid = questionid;
        answer.content = content;
        answer.istrue = istrue;

        // Lưu thay đổi vào cơ sở dữ liệu
        await answer.save();
        return {
            msg: "Updated"
        };
    } catch (error) {
        throw new Error(error.message);
    }
};


export const deleteAnswer = async (id) => {
    try {
        const answer = await db.Answer.findOne({ where: { answerid: id }, raw: false });
        if (!answer) {
            throw new Error('Answer not found');
        }
        await answer.destroy();
        return {
            msg: "Deleted"
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
