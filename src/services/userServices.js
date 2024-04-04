import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createUser = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!data.username || !data.email || !data.password || !data.role) {
                resolve({
                    errorCode: 1,
                    message: "Missing user's information"
                })
            }
            else if (await checkEmailExist(data.email)) {
                resolve({
                    errorCode: 2,
                    message: "Email exists"
                })
            }
            else if (await checkUserNameExist(data.username)) {
                resolve({
                    errorCode: 4,
                    message: "Username exists"
                })
            }
            else {
                data.password = await hashPassword(data.password);
                await db.User.create({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: data.role
                })
                resolve({
                    errorCode: 0,
                    message: "Create user sucessfully!"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

  return new Promise(async (resolve, reject) => {
    try {
      if (!data.username || !data.email || !data.password || !data.role) {
        resolve({
          errorCode: 1,
          message: "Missing user's information",
        });
      }
      if (await checkEmailExist(data.email)) {
        resolve({
          errorCode: 2,
          message: "Email exists",
        });
      }
      if (await checkUserNameExist(data.username)) {
        resolve({
          errorCode: 4,
          message: "Username exists",
        });
      }
      data.password = await hashPassword(data.password);
      await db.User.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      resolve({
        errorCode: 0,
        message: "Create user sucessfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};


let checkEmailExist = async (email) => {
  let data = await db.User.findOne({ where: { email: email } });
  if (data) return true;
  return false;
};

let checkUserNameExist = async (username) => {
  let data = await db.User.findOne({ where: { username: username } });
  if (data) return true;
  return false;
};

let loginCheck = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let user = await db.User.findOne({
        where: {
          username: username,
        },
      });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        data = {
          errorCode: 2,
          msg: "Invalid ID or password",
        };
      } else {
        delete user.password;
        data = {
          errorCode: 0,
          msg: "Successful",
          user: user,
        };
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = (username) => {

    return new Promise(async (resolve, reject) => {
        try {
            let data = (username === 'ALL')
                ? await db.User.findAll({ raw: true, attributes: { exclude: ['password'] } })
                : await db.User.findOne({ where: { username: username }, attributes: { exclude: ['password'] } });
            if (data) resolve(data);
            else resolve();
        } catch (error) {
            reject(error)
        }
    })
}

  return new Promise(async (resolve, reject) => {
    try {
      let data =
        username === "ALL"
          ? await db.User.findAll({
              raw: true,
              attributes: { exclude: ["password"] },
            })
          : await db.User.findOne({
              where: { username: username },
              attributes: { exclude: ["password"] },
            });
      if (data) resolve(data);
      else resolve();
    } catch (error) {
      reject(error);
    }
  });
};


let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashedPassword = bcrypt.hashSync(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {

    return new Promise(async (resolve, reject) => {
        let username = data.username
        try {
            if (!username) {
                resolve({
                    errorCode: 1,
                    message: "Missing some parameters"
                })
            }
            let user = await db.User.findOne({ where: { username: username }, raw: false });
            if (!user) {
                resolve({
                    errorCode: 2,
                    message: "User not found"
                })
            }

            user.role = data.role;
            await user.save();
            resolve({
                errorCode: 0,
                message: "Updated"
            });
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let username = data.username
        try {
            if (!username) {
                resolve({
                    errorCode: 1,
                    message: "Missing some parameters"
                })
            }
            let user = await db.User.findOne({ where: { username: username }, raw: false });
            if (!user) {
                resolve({
                    errorCode: 2,
                    message: "User not found"
                })
            }
            await user.destroy();
            resolve({
                errorCode: 0,
                message: "Deleted"
            });
        } catch (error) {
            reject(error);
        }
    })
}

  return new Promise(async (resolve, reject) => {
    let id = data.id;
    try {
      if (!id) {
        resolve({
          errorCode: 1,
          message: "Missing some parameters",
        });
      }
      let user = await db.User.findOne({ where: { id: id }, raw: false });
      if (!user) {
        resolve({
          errorCode: 2,
          message: "User not found",
        });
      }
      user.profileName = data.profileName;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.gender = data.gender;
      user.role = data.role;
      user.dob = data.dob;
      user.image = data.image;
      await user.save();
      resolve({
        errorCode: 0,
        message: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let id = data.id;
    try {
      if (!id) {
        resolve({
          errorCode: 1,
          message: "Missing some parameters",
        });
      }
      let user = await db.User.findOne({ where: { id: id }, raw: false });
      if (!user) {
        resolve({
          errorCode: 2,
          message: "User not found",
        });
      }
      await user.destroy();
      resolve({
        errorCode: 0,
        message: "Deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = {
  loginCheck: loginCheck,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
