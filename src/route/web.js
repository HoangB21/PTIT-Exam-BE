import express from "express";
import userController from "../controllers/userController";
import answerController from "../controllers/answerController";
import questionController from "../controllers/questionController"
import { authenticateToken } from "../middleware/JWTMiddleware"
import userAnswerController from "../controllers/userAnswerController"
import submissionController from "../controllers/submissionController"

import {
  createExamController,
  deleteExamController,
  getExamByExamIdController,
  updateExamController,
} from "../controllers/examController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.all('*', authenticateToken);


  // User
  router.post("/login", userController.loginUserController);
  router.get("/get-user", userController.getUserController);
  router.post("/create-user", userController.createUserController);
  router.put("/update-user", userController.updateUserController);
  router.delete("/delete-user", userController.deleteUserController);
  // Exam
  router.get("/exams/:examId", getExamByExamIdController);
  router.post("/exams", createExamController);
  router.put("/exams", updateExamController);
  router.delete("/exams/:examid", deleteExamController);

  // api question
  router.get('/get-question-by-id', questionController.getQuestionByIDController);
  router.get('/get-question-by-exam', questionController.getQuestionByExamController);
  router.post('/create-question', questionController.createQuestionController);
  router.delete('/delete-question', questionController.deleteQuestionController);
  router.put('/update-question', questionController.updateQuestionController);


  // answer
  router.post('/create-answer', answerController.createAnswer);
  router.get('/get-answer-by-id/:id', answerController.getAnswerById);
  router.get('/get-answer-by-question/:questionid', answerController.getAnswerByQuestion);
  router.put('/update-answer/:id', answerController.updateAnswer);
  router.delete('/delete-answer/:id', answerController.deleteAnswer);

  // user answer
  router.post('/create-user-answer', userAnswerController.createUserAnswerController);
  router.get('/get-user-answer-by-question/:questionid', userAnswerController.getUserAnswersByQuestionIdController);
  router.delete('/delete-user-answer/:id', userAnswerController.deleteUserAnswerController);

  // submission
  router.post('/create-submission', submissionController.createSubmissionController);
  router.get('/get-submission-of-exam/:examid', submissionController.getSubmissionOfExamController);
  router.get('/get-submission-of-user/:userid', submissionController.getSubmissionOfUserController);
  router.delete('/delete-submission/:id', submissionController.deleteSubmissionController);
  return app.use("/api/v1", router);

};


module.exports = initWebRoutes;
