const express = require('express');
const router = express.Router();
let taskController=require('../../controllers/task/taskController');
let middleware = require('../../middleware/middleware');

router.get(['/list','/list/:id'],middleware.AuthMiddleware,taskController.taskList);
router.post('/',middleware.AuthMiddleware,taskController.taskCreate);
router.patch('/:id',middleware.AuthMiddleware,taskController.taskUpdate);
router.delete('/:id',middleware.AuthMiddleware,taskController.taskDelete);

module.exports = router;