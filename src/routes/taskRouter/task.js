const express = require('express');
const router = express.Router();
let taskController=require('../../controllers/task/taskController');

router.get('/list',taskController.taskList);

module.exports = router;