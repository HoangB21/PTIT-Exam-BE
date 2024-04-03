import express from "express";
import userController from "../controllers/userController";
import questionController from "../controllers/questionController"
let router = express.Router();

let initWebRoutes = (app) => {

    router.post("/api/v1/login", userController.loginUserController);
    router.get("/api/v1/get-user", userController.getUserController);
    router.post("/api/v1/create-user", userController.createUserController);
    router.put("/api/v1/update-user", userController.updateUserController);
    router.delete("/api/v1/delete-user", userController.deleteUserController);
    // api question
    router.get('/api/v1/get-question', questionController.getQuestionController);
    router.post('/api/v1/create-question', questionController.createQuestionController);
    router.delete('/api/v1/delete-question',questionController.deleteQuestionController);
    router.put('/api/v1/update-question',questionController.updateQuestionController);

    return app.use("/", router);
}

module.exports = initWebRoutes;