const userModel=require('../../models/user/userModel')

exports.userList = async (req, res) => {
    try {
        console.log("inside controllers")
        let result;
        result = await userModel.userList(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(500).json({ message: result });
        }

    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}

exports.userCreate = async (req, res) => {
    try {
        console.log("inside controllers")
        result = await userModel.addUser(req);
        if (result.success) {
            res.send({ data: result.data,message:result.message });
        } else {
            res.status(500).json({ message: result });
        }
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}

exports.userUpdate = async (req, res) => {
    try {
        console.log("inside controllers update")
        result = await userModel.updateUser(req);
        if (result.success) {
            res.send({ data: result});
        } else {
            res.status(500).json({ message: result });
     }
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
     }
}

exports.userDelete =async (req,res) => {
    try {
        console.log("inside controllers delete")
        result = await userModel.deleteUser(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(500).json({ message: result });

        }
    }catch(err){
        res.status(500).json({ message: "internal server error", success: false });

    }
}