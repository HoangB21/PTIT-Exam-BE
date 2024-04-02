import express from "express";
import userController from "../controllers/userController";
import {
  createExamController,
  deleteExamController,
  getExamByExamIdController,
  updateExamController,
} from "../controllers/examController";
let router = express.Router();

let initWebRoutes = (app) => {
  // User
  router.post("/api/v1/login", userController.loginUserController);
  router.get("/api/v1/get-user", userController.getUserController);
  router.post("/api/v1/create-user", userController.createUserController);
  router.put("/api/v1/update-user", userController.updateUserController);
  router.delete("/api/v1/delete-user", userController.deleteUserController);
  // Exam
  router.get("/api/v1/exams/:examId", getExamByExamIdController);
  router.post("/api/v1/exams", createExamController);
  router.put("/api/v1/exams", updateExamController);
  router.delete("/api/v1/exams/:examid", deleteExamController);

  return app.use("/", router);
};

module.exports = initWebRoutes;
