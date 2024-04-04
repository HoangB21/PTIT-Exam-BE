import express from "express";
import userController from "../controllers/userController";
import examController from "../controllers/examController";

let router = express.Router();

let initWebRoutes = (app) => {
    return app.use("/", router);
}

module.exports = initWebRoutes;