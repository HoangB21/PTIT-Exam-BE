
const db = require('../models');
const Exam = db.Exam;

// Service để tạo một kỳ thi mới
exports.createExam = async (name, type, length, start, end) => {
    try {
        return await Exam.create({ name, type, length, start, end });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service để lấy tất cả các kỳ thi
exports.getAllExams = async () => {
    try {
        return await Exam.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service để lấy một kỳ thi theo id
exports.getExamById = async (id) => {
    try {
        return await Exam.findByPk(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service để cập nhật thông tin của một kỳ thi
exports.updateExam = async (id, name, type, length, start, end) => {
    try {
        const exam = await Exam.findByPk(id);
        if (!exam) {
            throw new Error('Exam not found');
        }
        await exam.update({ name, type, length, start, end });
        return exam;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service để xóa một kỳ thi
exports.deleteExam = async (id) => {
    try {
        const exam = await Exam.findByPk(id);
        if (!exam) {
            throw new Error('Exam not found');
        }
        await exam.destroy();
    } catch (error) {
        throw new Error(error.message);
    }
};

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
    Object.assign(exam, data);
    exam.start = new Date(data.start);
    exam.end = new Date(data.end);
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

