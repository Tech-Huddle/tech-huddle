const connection=require('../../../connection/db')
exports.taskList= async(req)=>{
    console.log("inside model")
    return new Promise((resolve, reject)=>{
        console.log("===>",req.params.id)
        let id=req.params.id
        let query =''
        if(req.params.id){
            query='select * from task where id ='+id
        }else{
            query='select * from task'   
        }
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error) 
            }
            else{
                //console.log("Task",results)
                resolve ({data: results,status:200,success:true})
                //console.log("Task")
            }
        
          });
    })

}

exports.addTask= async(req)=>{
    console.log("inside model")
    return new Promise((resolve, reject)=>{
        let data=req.body;
        let query ='insert into task set ?'
        connection.query(query,data ,function (error, results, fields) {
            if (error) {
                reject(error) 
            }
            else{
                //console.log("Task",results)
                resolve ({data: results,status:200,success:true})
                //console.log("Task")
            }
        
          });
        })
}

exports.updateTask= async(req)=>{
    console.log("inside model")
    return new Promise((resolve, reject)=>{
        let id=req.params.id
        let data=req.body;
        console.log("updateTask data: " ,Object.keys(data))
        let where_arr = []
        for (let k of Object.keys(data)){
            where_arr.push(`${k} = '${data[k]}'`)

        }
        let query ='update task set '+where_arr.join(',')+' where id='+id
        connection.query(query,data,function (error, results, fields) {
            if (error) {
                reject(error) 
            }
            else{
                //console.log("Task",results)
                resolve ({data: results,status:200,success:true})
                //console.log("Task")

            }
        })
    })
}

exports.deleteTask= async(req)=>{
    console.log("inside model")
    return new Promise((resolve, reject)=>{
        let id=req.params.id
        let query ='delete from task where id='+id
        connection.query(query,function (error, results, fields) {
            if (error) {
                reject(error) 
            }
            else{
                //console.log("Task",results)
                resolve ({data: results,status:200,success:true})
                //console.log("Task")
            }
        })
    })
}