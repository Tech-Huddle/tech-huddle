const express = require('express');

const publicRouter = express.Router();
const authRouter = express.Router();

publicRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Session');
    res.header('Access-Control-Allow-Headers', 'Accesstoken');
    next();
});

authRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization');
    res.header('Access-Control-Allow-Headers', 'Accesstoken');
    next();
});

let task=require('./taskRouter/task')
let user=require('./userRouter/user')
let auth=require('./userRouter/userAuth')
authRouter.use('/task', task);

authRouter.use('/users',user)

publicRouter.use('/auth',auth)


module.exports = { authRouter, publicRouter };