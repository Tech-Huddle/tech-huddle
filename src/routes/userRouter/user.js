const express = require('express');
const router = express.Router();
let userController=require('../../controllers/user/userController');
let middleware = require('../../middleware/middleware');

router.get(['/list','/list/:id'],middleware.AuthMiddleware,userController.userList);
router.post('/',userController.userCreate);
router.patch('/:id',middleware.AuthMiddleware,userController.userUpdate);
router.delete('/:id',middleware.AuthMiddleware,userController.userDelete);

module.exports = router;