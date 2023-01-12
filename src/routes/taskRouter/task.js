const express = require('express');
const router = express.Router();
let taskController=require('../../controllers/task/taskController');

router.get(['/list','/list/:id'],taskController.taskList);
router.post('/',taskController.taskCreate);
router.patch('/:id',taskController.taskUpdate);
router.delete('/:id',taskController.taskDelete);

module.exports = router;