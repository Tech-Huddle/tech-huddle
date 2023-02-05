const connection = require('../../../connection/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { sendMail } = require('../../utility/email')
const { tempPassword } = require('../../utility/common')
exports.userList = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let id = req.params.id
        let query = ''
        if (req.params.id) {
            query = 'select * from users where id =' + id
        } else {
            query = 'select * from users'
        }
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            else {
                //console.log("Task",results)
                resolve({ data: results, status: 200, success: true })
                //console.log("Task")
            }

        });
    })

}

exports.addUser = async (req) => {
    console.log("inside model")
    return new Promise(async (resolve, reject) => {
        let data = req.body;
        let original_password = data.password;
        let salt = await bcrypt.genSalt(saltRounds);
        //let encripted_password = await bcrypt.hash(original_password, salt);
        //data.password = encripted_password;
        let user_email = data.email.trim();
        connection.query(`select * from users where email="${user_email}"`, async (error, results, fields) => {
            if (error) {
                console.log(error);
                reject(error)

            } else {
                if (results.length == 0) {
                    let query = 'insert into users set ?'
                    connection.query(query, data, async function (error, results, fields) {
                        if (error) {
                            reject(error)
                        }
                        else {
                            console.log("Task",results.insertId)
                            let tempPassword_ = tempPassword(8);
                            console.log("tempPassword",tempPassword_);
                            let query = 'insert into user_secret_info set ?';
                            let hash = {};
                            hash["user_id"] = results.insertId;
                            hash["temp_password"] =await bcrypt.hash(tempPassword_, salt);
                            hash["attempt"] = 0;
                            hash["status"] = "force_change_password";
                            connection.query(query, hash, async function (error, results, fields) {
                                if (error) {
                                    reject(error);
                                } else {
                                   // await sendMail(user_email, 'Welcome to to do app', `welcome ${user_email} .your temp password is ${tempPassword_} `)
                                    resolve({ data: results, status: 200, success: true })
                                }

                            })

                            //console.log("Task")
                        }

                    });

                } else {
                    resolve({ success: true, message: "user already exists" })
                }
            }
        })


    })
}

exports.updateUser = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let id = req.params.id
        let data = req.body;
        //console.log("updateTask data: " ,Object.keys(data))
        let where_arr = []
        for (let k of Object.keys(data)) {
            where_arr.push(`${k} = '${data[k]}'`)

        }
        let query = 'update users set ' + where_arr.join(',') + ' where id=' + id
        connection.query(query, data, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            else {
                //console.log("Task",results)
                resolve({ data: results, status: 200, success: true })
                //console.log("Task")

            }
        })
    })
}

exports.deleteUser = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let id = req.params.id
        let query = 'delete from users where id=' + id
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            else {
                //console.log("Task",results)
                resolve({ data: results, status: 200, success: true })
                //console.log("Task")
            }
        })
    })
}