import db from '../models/index';

const permissionCheck = async (data) => {
    return new Promise(async (resolve, reject) => {
        let username = data.username, role = data.role;
        try {
            if (!username || !role) {
                resolve({
                    errorCode: 1,
                    message: "Missing some parameters"
                })
            }
            const user = await db.User.findOne({ where: { username: data.username, role: data.role } });
            if (!user) {
                resolve({
                    errorCode: 2,
                    message: "Unauthorized user"
                })
            }
            resolve({
                errorCode: 0,
                message: "OK"
            });
        } catch (error) {
            reject(error);
        }
    })

}

module.exports = { permissionCheck }