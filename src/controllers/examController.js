import {
  createExam,
  getExamById,
  updateExam,
  deleteExam,
} from "../services/examServices";

const createExamController = async (req, res) => {
  let message = await createExam(req.body);
  return res.status(200).json(message);
};
const getExamByExamIdController = async (req, res) => {
  let message = await getExamById(req.params.examId);
  return res.status(200).json(message);
};
const updateExamController = async (req, res) => {
  let message = await updateExam(req.body);
  return res.status(200).json(message);
};
const deleteExamController = async (req, res) => {
  let message = await deleteExam(+req.params.examid);
  return res.status(200).json(message);
};
export {
  createExamController,
  getExamByExamIdController,
  updateExamController,
  deleteExamController,
};
