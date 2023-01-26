const express = require('express');
const router = express.Router();
const authController=require('../../controllers/user/authController')

router.post('/login',authController.login);
router.patch('/force_change_password',authController.forceChangePassword);

module.exports = router;