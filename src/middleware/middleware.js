const {userAuth}=require('../models/middleware/userAuth')
exports.AuthMiddleware = async(req,res,next)=>{
    try{
        if(req.headers.authorization){
            let header=req.headers.authorization;
            let user_data=await userAuth(header);
            if(user_data){
                next()
            }
            else{
                res.send({message:"unauthorized"})
            }
        }else{
            res.send({message:"unauthorized"})
        }
    }catch(err){
        res.status(500).json({ message: "internal server error", success: false });
    }
}