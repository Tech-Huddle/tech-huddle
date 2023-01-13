const connection = require('../../../connection/db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.loginModel=async (req) => {
    return new Promise(async (resolve, reject) => {
    let data=req.body;
    let user;
    connection.query(`select * from users where email= '${data.email}' `,async (error, results, fields) => {
        if(error) {
            reject(error);
        }else if(results.length==0){
            resolve({message:"wrong credentials",success:false})
        }else{
            user = JSON.parse(JSON.stringify(results[0]))
            let flag=await bcrypt.compare(data.password, user.password);
            if(flag){
                let secret=process.env.JWT_SECRET
                delete user.password;
                let token=jwt.sign(user,secret);
                resolve({id_token:token,message:"login successfully",success:true})
            }else{
                resolve({message:"wrong credentials",success:false})
            }
        }
       
    })
    })
}