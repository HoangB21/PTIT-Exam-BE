import userServices from "../services/userServices";
import jwt from "../middleware/JWTMiddleware"

let loginUserController = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.status(500).json({
            errorCode: 1,
            msg: "Missing ID or password"
        })
    }
    let data = await userServices.loginCheck(username, password);
    if (!data.user) {
        return res.status(500).json({
            errorCode: data.errorCode,
            msg: data.msg
        })
    }
    return res.status(200).json({
        errorCode: data.errorCode,
        msg: data.msg,
        token: jwt.generateToken(data.user)
    })
}

let getUserController = async (req, res) => {

    let username = req.body.username;
    if (!username) {
        return res.status(200).json({
            errorCode: 1,
            msg: "Missing parameter",
            user: null
        })
    }

    let data = await userServices.getUser(username);

    return res.status(200).json({
        errorCode: 0,
        msg: "get ok",
        user: data
    })
}

let createUserController = async (req, res) => {
    let message = await userServices.createUser(req.body);
    return res.status(200).json(message);
}

let updateUserController = async (req, res) => {
    let message = await userServices.updateUser(req.body);
    return res.status(200).json(message);
}

let deleteUserController = async (req, res) => {
    let message = await userServices.deleteUser(req.body);
    return res.status(200).json(message);
}



module.exports = {
    loginUserController: loginUserController,
    getUserController: getUserController,
    createUserController: createUserController,
    updateUserController: updateUserController,
    deleteUserController: deleteUserController,
}