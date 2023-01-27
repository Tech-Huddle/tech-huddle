const connection = require('../../../connection/db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let secret_jwt = process.env.JWT_SECRET;
const saltRounds = 10;
let { userAuth } = require('../middleware/userAuth');
exports.loginModel = async (req) => {
    return new Promise(async (resolve, reject) => {
        let data = req.body;
        let user;
        connection.query(`select * from users where email= '${data.email}' `, async (error, results, fields) => {
            if (error) {
                reject(error);
            } else if (results.length == 0) {
                resolve({ message: "wrong credentials", success: false })
            } else {
                user = JSON.parse(JSON.stringify(results[0]))
                connection.query(`select * from user_secret_info where user_id=?`, user.id, async (error, results, fields) => {
                    let secret = JSON.parse(JSON.stringify(results[0]));
                    if (secret.status == 'confirmed') {
                        let flag = await bcrypt.compare(data.password, secret.password);
                        if (flag) {
                            //delete user.password;
                            let token = jwt.sign(user, secret_jwt);
                            resolve({ id_token: token, message: "login successfully", success: true })
                        } else {
                            resolve({ message: "wrong credentials", success: false })
                        }
                    } else {
                        if (secret.status == 'force_change_password') {
                            let flag = await bcrypt.compare(data.password, secret.temp_password);
                            if (flag) {
                                let token = jwt.sign(user, secret_jwt);
                                resolve({ id_token: token, message: "login successfully", challenge_name: "force_change_password", success: true })
                            } else {
                                resolve({ message: "wrong credentials", success: false })
                            }

                        }
                    }

                })


            }

        })
    })
}

exports.forceChangePasswordModel = async (req) => {
    return new Promise(async (resolve, reject) => {
        let header = req.headers.authorization;
        let body = req.body;
        user_details = await userAuth(header);
        //console.log("==>>",user_details);
        let salt = await bcrypt.genSalt(saltRounds);
        let new_password = await bcrypt.hash(body.password, salt);
        connection.query(`update user_secret_info set password=?,status="confirmed" where user_id=?`, [new_password, user_details.id], async (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve({ "message": "password updated successfully", success: true })
            }
        })
    })

}