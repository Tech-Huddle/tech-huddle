let taskModel = require('../../models/task/taskModel');

exports.taskList = async (req, res) => {
    try {
        console.log("inside controllers")
        let result;
        result = await taskModel.taskList(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(500).json({ message: result });
        }

    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}

exports.taskCreate = async (req, res) => {
    try {
        console.log("inside controllers")
        result = await taskModel.addTask(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(500).json({ message: result });
        }
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}

exports.taskUpdate = async (req, res) => {
    try {
        console.log("inside controllers update")
        result = await taskModel.updateTask(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(500).json({ message: result });
     }
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
     }
}

exports.taskDelete =async (req,res) => {
    try {
        console.log("inside controllers delete")
        result = await taskModel.deleteTask(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(500).json({ message: result });

        }
    }catch(err){
        res.status(500).json({ message: "internal server error", success: false });

    }
}