const connection = require('../../../connection/db')
exports.taskList = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let filters ;
        let filterKeys ;
        let limit = [];
        let condition = '';
        let limitHash = '';
        let user_hash = []
        if (req.query.filters) {
            filters = JSON.parse(req.query.filters);
            filterKeys = Object.keys(filters);
            filterKeys.forEach(key => {
                if (key == 'offset' || key == 'limit') {
                    limit.push(key);
                } else {
                    user_hash.push(key);
                }
            })
            if (limit.length > 0) {
                if (limit.includes('offset')) {
                    limitHash += 'limit ' + filters['offset'] + " , " + filters['limit'];
                } else {
                    limitHash += 'limit ' + filters['limit'];
                }
            }
            let length = user_hash.length;
            user_hash.forEach((Element, i) => {
                if (Element) {
                    if (!(Element == 'offset' || Element == 'limit')) {
                        console.log(Element, filters)
                        condition += Element + ' = ' + filters[Element];
                        condition += (length - 1 != i) ? ' and ' : ' ';
                    }

                    // if((Element == 'offset' || Element == 'limit')){
                    //     limitHash += 'limit = ' + filters['offset'] + " , "+ filters['limit'];
                    // }
                }
            })
        }

        let id = req.params.id
        let query = ''
        if (req.params.id) {
            query = 'select * from task where id =' + id
        } else if (condition.length>0) {
            query = 'select * from task where ' + condition + " " + limitHash;
        }else if(limitHash.length>0){
            query = 'select * from task '+ limitHash;
        }
        else{
            query = 'select * from task';
        }
        console.log("query", query);
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            else {
                let data = results;
                if(condition.length>0){
                    query = 'select * from task where ' + condition;
                }else{
                    query = 'select * from task';
                }
                
                connection.query(query, function (error, results, fields) {
                    resolve({ data: data, total: results.length, status: 200, success: true })
                })
            }

        });
    })

}

exports.addTask = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let data = req.body;
        let query = 'insert into task set ?'
        connection.query(query, data, function (error, results, fields) {
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

exports.updateTask = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let id = req.params.id
        let data = req.body;
        console.log("updateTask data: ", Object.keys(data))
        let where_arr = []
        for (let k of Object.keys(data)) {
            where_arr.push(`${k} = '${data[k]}'`)

        }
        let query = 'update task set ' + where_arr.join(',') + ' where id=' + id
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

exports.deleteTask = async (req) => {
    console.log("inside model")
    return new Promise((resolve, reject) => {
        let id = req.params.id
        let query = 'delete from task where id=' + id
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