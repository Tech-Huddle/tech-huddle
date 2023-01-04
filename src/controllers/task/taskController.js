let taskModel=require('../../models/task/taskModel');

exports.taskList = async (req,res) => {
    try{
        console.log("inside controllers")
        let result;
        result=await taskModel.taskList(req);
        console.log("==>>",result);
        if(result.success){
            res.send({data:result});
        }else{
            res.status(500).json({ message: result });
        }
        
    }catch(err){
        res.status(500).json({ message: "internal server error", success: false });
    }
}