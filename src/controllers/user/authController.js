const userModel=require('../../models/user/authModel')

exports.login = async (req, res) => {
    try {
        console.log("inside controllers")
        let result;
        result = await userModel.loginModel(req);
        if (result.success) {
            res.send({ data: result });
        } else {
            res.status(400).json({ message: result.message });
        }

    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}