const connection=require('../../../connection/db')
exports.taskList= async(req)=>{
    console.log("inside model")
    return new Promise((resolve, reject)=>{
        connection.query("select * from task", function (error, results, fields) {
            if (error) {
                reject(error) 
            }
            else{
                console.log("Task",results)
                resolve ({data: results,status:200,success:true})
                //console.log("Task")
            }
        
          });
    })

}