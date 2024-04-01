import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.post('/api/login', userController.loginUserController);
    router.get('/api/get-user', userController.getUserController);
    router.post('/api/create-user', userController.createUserController);
    router.put('/api/update-user', userController.updateUserController);
    router.delete('/api/delete-user', userController.deleteUserController);
    return app.use("/", router);
}

module.exports = initWebRoutes;