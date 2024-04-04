
import db from "../models/index";

const createExam = async (data) => {
  try {
    await db.Exam.create({
      ...data,
    });
    return {
      errorCode: 0,
      message: "Create exam sucessfully!",
    };
  } catch (error) {
    throw error;
  }
};

const getExamById = async (id) => {
  try {
    if (id == "ALL") {
      const exams = await db.Exam.findAll({
        raw: true,
      });
      return {
        exams,
      };
    } else {
      const exam = await db.Exam.findOne({
        where: { examid: +id },
      });
      return {
        ...exam,
      };
    }
  } catch (error) {
    throw error;
  }
};
const updateExam = async (data) => {
  try {
    let exam = await db.Exam.findOne({
      where: { examid: data.examid },
      raw: false,
    });
    if (!exam) {
      return { errorCode: 404, msg: "Exam not found!" };
    }
    Object.assign(exam, data);
    exam.start = data.start;
    exam.end = data.end;
    await exam.save();
    return {
      ...exam,
    };
  } catch (error) {
    throw error;
  }
};
const deleteExam = async (id) => {
  try {
    let exam = await db.Exam.findOne({
      where: { examid: id },
      raw: false,
    });
    await exam.destroy();
    return {
      errorCode: 0,
      message: "Deleted",
    };
  } catch (error) {
    throw error;
  }
};
export { createExam, getExamById, updateExam, deleteExam };

