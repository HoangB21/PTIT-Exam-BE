import express from "express";
import userController from "../controllers/userController";
import examController from "../controllers/examController";
import { authenticateToken } from "../middleware/JWTMiddleware"
let router = express.Router();




const initApiRoutes = (app) => {

    router.all('*', authenticateToken);

    router.post('/login', userController.loginUserController);
    router.get('/get-user', userController.getUserController);
    router.post('/create-user', userController.createUserController);
    router.put('/update-user', userController.updateUserController);
    router.delete('/delete-user', authenticateToken, userController.deleteUserController);




    return app.use("/api/v1", router);

    // router.post('/api/v1/create-exam', examController.createExamController);
}

module.exports = initApiRoutes;