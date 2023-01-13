var jwt = require('jsonwebtoken');
const connection = require('../../../connection/db')

exports.userAuth = async (params) => {
    try {
        let secret = process.env.JWT_SECRET;
        let token = params.split(" ")[1]
        let user_data = await jwt.verify(token, secret)
        return new Promise(async(resolve, reject) =>{
            //console.log(user_data)
            connection.query('select * from users where email=?', user_data.email,async (error, results, fields) => {
                if(error) {
                    reject("error")
                }else{
                    if(results.length>0){
                        resolve(user_data) ;
                    }else{
                        reject("error")
                    }
                }
            })
        })
        
    } catch(err) {
        console.log("Error: " + JSON.stringify(err))
        return false;
    }

}