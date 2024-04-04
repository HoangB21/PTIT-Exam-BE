import express from "express";
import userController from "../controllers/userController";
import answerController from "../controllers/answerController";
import questionController from "../controllers/questionController"
import { authenticateToken } from "../middleware/JWTMiddleware"

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
  router.get('/get-question', questionController.getQuestionController);
  router.post('/create-question', questionController.createQuestionController);
  router.delete('/delete-question', questionController.deleteQuestionController);
  router.put('/update-question', questionController.updateQuestionController);


  // answer
  router.get('/get-answer', answerController.getAnswerById);
  router.get('/get-answer-by-question', answerController.getAnswerByQuestion);
  router.get('/')
  return app.use("/api/v1", router);

};


module.exports = initWebRoutes;
